let lang = require('./api/lang');
let extend = lang.extend;

extend(exports, lang);
extend(exports, require('./api/debug'));
extend(exports, require('./api/options'));
