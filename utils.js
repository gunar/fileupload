import path from 'path';

export const validateFileType = mime =>
  mime === 'image/jpeg' || mime === 'image/png';

// https://stackoverflow.com/a/20732091/1456173
export function humanFileSize(size) {
  var i = size == 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024));
  return (
    (size / Math.pow(1024, i)).toFixed(2) * 1 +
    ' ' +
    ['B', 'kB', 'MB', 'GB', 'TB'][i]
  );
}

// https://security.stackexchange.com/a/123723/210331
export function checkPrefix(prefix, candidate) {
  // .resolve() removes trailing slashes
  var absPrefix = path.resolve(prefix) + path.sep;
  var absCandidate = path.resolve(candidate) + path.sep;
  return absCandidate.substring(0, absPrefix.length) === absPrefix;
}
