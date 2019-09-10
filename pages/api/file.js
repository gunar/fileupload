import fs from 'fs';
import multiparty from 'multiparty';
import path from 'path';
import striptags from 'striptags';
import {json} from 'micro';
import {promisify} from 'util';

import {checkPrefix, validateFileType} from '../../utils';
import {tmpDir, publicDir, MAX_FILE_SIZE} from '../../config';

const unlink = promisify(fs.unlink);
const rename = promisify(fs.rename);

const parser = req =>
  new Promise((resolve, reject) => {
    try {
      const form = new multiparty.Form({
        maxFilesSize: MAX_FILE_SIZE,
        autoFiles: true,
        uploadDir: tmpDir,
      });
      // this is required for maxFilesSize to be enforced  ¯\_( )_/¯
      // see https://github.com/pillarjs/multiparty#file-name-file
      form.on('file', () => {});
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        resolve(files);
      });
    } catch (e) {
      reject(e);
    }
  });

async function upload(req, res) {
  try {
    const {files} = await parser(req);
    const {
      originalFilename,
      path: filePath,
      headers: {'content-type': contentType},
    } = files[0];
    try {
      if (validateFileType(contentType)) {
        const destination = path.join(publicDir, striptags(originalFilename));
        if (checkPrefix(publicDir, destination)) {
          await rename(filePath, destination);
          res.end();
        } else {
          throw Error('Invalid file name');
        }
      } else {
        throw Error('Invalid file type');
      }
    } catch (e) {
      unlink(filePath).catch();
      res.status(500).json({});
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({});
  }
}

async function del(req, res) {
  try {
    const {filename} = await json(req);
    const filePath = path.join(publicDir, filename);
    if (checkPrefix(publicDir, filePath)) {
      await unlink(filePath);
      res.end();
    } else {
      throw Error('Invalid file name');
    }
  } catch (e) {
    console.error(e);
    res.status(500).end();
  }
}

export default async function file(req, res) {
  if (req.method === 'PUT') {
    return upload(req, res);
  } else if (req.method === 'DELETE') {
    return del(req, res);
  }
  return res.status(404).end();
}

export const config = {
  api: {
    bodyParser: false,
  },
};
