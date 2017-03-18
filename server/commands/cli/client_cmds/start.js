const TreeClient = require('@inexor-game/treeclient').TreeClient;
const log = require('@inexor-game/logger')();

// Configuration for starting a client instance of Inexor Core
exports.command = 'start <instance> [connect]'
exports.describe = 'Starts a client'

exports.builder = {
  instance: {
    type: 'number',
    describe: 'The instance id.'
  },
  connect: {
    type: 'boolean',
    descibe: 'Also connect to the created instance',
    default: true
  }
}

exports.handler = function(argv) {
  log.info('Starting the client with id ' + argv.instance);
  var client = new TreeClient('localhost', 31416);
  client.flex.instances.start(argv.instance, function(data, response) {
    if (argv.connect) {
      log.info('Connecting to the client with id ' + argv.instance);
      client.flex.instances.connect(argv.instance, function(data, response) {
        if (response.statusCode == 200) {
          log.info('Connection to client with instance id ' + argv.instance + ' established');
        } else if (response.statusCode == 404) {
          log.info('Client with instance id ' + argv.instance + ' does not exist');
        } else {
          log.info('Response: ' + response.statusCode + ' ' + response.statusMessage);
        }
      });
    } else {
      log.warn('The client was started but no connection is established.');
    }
//    if (response.statusCode == 200) {
//      log.info('Client with instance id ' + argv.instance + ' started');
//    } else if (response.statusCode == 404) {
//      log.info('Client with instance id ' + argv.instance + ' does not exist');
//    } else {
//      log.info('Response: ' + response.statusCode + ' ' + response.statusMessage);
//    }
  });
}
