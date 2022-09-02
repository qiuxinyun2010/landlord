// import { URL } from 'url';
import path from 'path';
// const path = require('path');
export let resolveHtmlPath: (htmlFileName: string) => string;
resolveHtmlPath = (htmlFileName: string) => {
    return `file://${path.resolve(__dirname, '../renderer/', htmlFileName)}`;
};