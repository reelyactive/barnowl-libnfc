/**
 * Copyright reelyActive 2019
 * We believe in an open Internet of Things
 */


const advlib = require('advlib-identifier');


/**
 * LibnfcDecoder Class
 * Decodes data streams from one or more libnfc streams and forwards the
 * packets to the given LibnfcManager instance.
 */
class LibnfcDecoder {

  /**
   * LibnfcDecoder constructor
   * @param {Object} options The options as a JSON object.
   * @constructor
   */
  constructor(options) {
    options = options || {};

    this.libnfcManager = options.libnfcManager;
    this.queuesByOrigin = {};
  }

  /**
   * Handle data from a libnfc stream, specified by the origin
   * @param {Buffer} data The libnfc data.
   * @param {String} origin The unique origin identifier of the source.
   * @param {Number} time The time of the data capture.
   */
  handleLibnfcData(data, origin, time) {
    let libnfcPacket = null; // TODO: will likely be an instance of a class

    this.libnfcManager.handleLibnfcPacket(libnfcPacket);
  }
}


module.exports = LibnfcDecoder;
