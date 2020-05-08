export function formatPathSlash(path: string) {
  path = path.startsWith('/') ? path : '/' + path;
  path = path.endsWith('/') ? path.substr(0, path.length - 1) : path;
  return path;
}
