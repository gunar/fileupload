import fetch from 'isomorphic-unfetch';

import {SERVER} from './config';

const listFiles = async query => {
  const res = await fetch(`${SERVER}/api/files?query=${query || ''}`, {});
  const data = await res.json();
  return {files: data};
};

const uploadFile = data =>
  fetch(`${SERVER}/api/file`, {
    method: 'PUT',
    body: data,
  }).then(res => {
    if (!res.ok) {
      throw Error('Error uploading file');
    }
    return undefined;
  });

const deleteFile = async filename => {
  const res = await fetch(`${SERVER}/api/file`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({filename}),
  });
  if (!res.ok) {
    throw Error('Error deleting file');
  }
  return undefined;
};

export {
  listFiles,
  uploadFile,
  deleteFile,
}
