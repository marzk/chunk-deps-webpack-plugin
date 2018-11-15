import log from './common';

log('Hello World A');

import('./async-a').then(m => m());
