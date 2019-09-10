import fs from 'fs';
import {promisify} from 'util';
import path from 'path';

import {publicDir} from '../../config';

const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);

async function list(req, res) {
  try {
    const filenames = await readdir(publicDir, 'utf8');
    const files = await Promise.all(
      filenames
        .filter(
          name =>
            true && (req.query.query ? name.includes(req.query.query) : true),
        )
        .map(async filename => {
          const {size} = await stat(path.join(publicDir, filename));
          return {
            name: filename,
            size,
          };
        }),
    );
    return res.json(files);
  } catch (e) {
    console.error(e);
    res.status(500).end();
  }
}

export default async function files(req, res) {
  if (req.method === 'GET') {
    return list(req, res);
  }
  return res.status(404).end();
}

export const config = {
  api: {
    bodyParser: false,
  },
};
