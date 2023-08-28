import fsExtra from 'fs-extra';

export default await fsExtra.readJson(new URL('../../config.json', import.meta.url));
