import * as path from 'path';
import glob from 'glob';

const files = glob.sync(path.join(__dirname, '..', 'controllers', '**/*.js'));

files.forEach((file) => require(file));
