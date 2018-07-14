var router = require('express').Router();

require('./register').route(router);
require('./fileUpload').route(router);

module.exports = router;
