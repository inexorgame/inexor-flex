// Configures yargs to use the command directory
const process = require('process');
const argv = require('yargs')
  .commandDir('commands')
  .help()
  .argv

// Pull the dependencies
const express = require('express');

// Set's the executable path for all instances
global.binary_path = require('./util/core_path')

// Returns a logger instance
var log = require('./util/logger')(argv.console, argv.file, argv.level)

// Configures the server to be use-able as a RESTfull API
var app = express();
// app.use(express.static(argv.webdir));

// Require the router from the rest module
var router = require('./rest/v1/');
router.use((err, req, res, next) => {
  log.error(err);
  next(err);
})

// Fire in the hole!
app.use('/api/v1', router);
app.listen(argv.port, () => {
  log.info('Inexor Flex is listening on ' + argv.port)
})
