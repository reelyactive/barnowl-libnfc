/**
 * Copyright reelyActive 2019
 * We believe in an open Internet of Things
 */


const EventEmitter = require('events').EventEmitter;
const TestListener = require('./testlistener.js');
const LibnfcDecoder = require('./libnfcdecoder.js');
const LibnfcManager = require('./libnfcmanager.js');


/**
 * BarnowlLibnfc Class
 * Converts libnfc output into standard raddec events.
 * @param {Object} options The options as a JSON object.
 * @constructor
 */
class BarnowlLibnfc extends EventEmitter {

  /**
   * BarnowlLibnfc constructor
   * @param {Object} options The options as a JSON object.
   * @constructor
   */
  constructor(options) {
    super();
    options = options || {};

    this.listeners = [];
    this.libnfcManager = new HciManager({ barnowl: this });
    this.libnfcDecoder = new HciDecoder({ hciManager: this.hciManager });
  }

  /**
   * Add a listener to the given interface.
   * @param {Class} ListenerClass The (uninstantiated) listener class.
   * @param {Object} options The options as a JSON object.
   */
  addListener(ListenerClass, options) {
    options = options || {};
    options.decoder = this.libnfcDecoder;

    let listener = new ListenerClass(options);
    this.listeners.push(listener);
  }

  /**
   * Handle and emit the given raddec.
   * @param {Raddec} raddec The given Raddec instance.
   */
  handleRaddec(raddec) {
    // TODO: observe options to normalise raddec
    this.emit("raddec", raddec);
  }

  /**
   * Handle and emit the given infrastructure message.
   * @param {Object} message The given infrastructure message.
   */
  handleInfrastructureMessage(message) {
    this.emit("infrastructureMessage", message);
  }
}


module.exports = BarnowlLibnfc;
module.exports.TestListener = TestListener;
