import path from 'path';

export const MAX_FILE_SIZE = 10 * 1024 * 1024

export const COLOR_BLUE = '#5741d9';
export const SERVER =
  process.NODE_ENV === 'production'
    ? 'https://your_deployment.serve'
    : 'http://localhost:3000';

// https://github.com/zeit/next.js/issues/8251
const rootPath = process.cwd();
export const publicDir = path.join(rootPath, 'public');
export const tmpDir = path.join(rootPath, 'tmp');
