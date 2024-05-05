import alpine from 'alpinejs';
import './header.ts';
import './article.ts';

Object.assign(window, { Alpine: alpine }).Alpine.start();

import.meta.webpackHot?.accept(console.error);
