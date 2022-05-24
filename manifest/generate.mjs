import { writeFile, readFile, readdir } from 'fs';
import { promisify } from 'util';
import template from './template.mjs';

const promiseRead = promisify(readFile);
const promiseWrite = promisify(writeFile);
const promiseReadDir = promisify(readdir);

(async () => {
  const generatedOutput = {};
  const [packageJson, iconFileNames] = await Promise.all([
    promiseRead('./package.json', 'utf-8'),
    promiseReadDir('./statics/images'),
  ]);

  const parsedPkg = JSON.parse(packageJson);

  const imageConfig = iconFileNames.reduce((config, fileName) => {
    const size = fileName.split('-')[1].split('.')[0];
    config[size] = `statics/images/icon-${size}.png`;
    return config;
  }, {});

  generatedOutput.description = parsedPkg.description;
  generatedOutput.version = parsedPkg.version;
  generatedOutput.icons = imageConfig;

  const combinedTemplate = { ...generatedOutput, ...template };

  await promiseWrite('./build/manifest.json', JSON.stringify(combinedTemplate, null, 2));
})();
