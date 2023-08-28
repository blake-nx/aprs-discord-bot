import fsExtra from 'fs-extra';

export const config = await fsExtra.readJson(new URL('../../config.json', import.meta.url));
