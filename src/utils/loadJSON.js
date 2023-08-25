import fsExtra from 'fs-extra';

export async function loadJSON(path) {
  return await fsExtra.readJson(new URL(path, import.meta.url));
}
