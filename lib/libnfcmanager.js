/**
 * Copyright reelyActive 2019
 * We believe in an open Internet of Things
 */


const Raddec = require('raddec');
const advlib = require('advlib-identifier');


/**
 * LibnfcManager Class
 * Manages the libnfc interfaces.
 */
class LibnfcManager {

  /**
   * LibnfcManager constructor
   * @param {Object} options The options as a JSON object.
   * @constructor
   */
  constructor(options) {
    this.barnowl = options.barnowl;
    this.radiosByOrigin = {};
  }

  /**
   * Handle the given libnfc packet
   * @param {Object} packet The libnfc packet to handle.
   */
  handleLibnfcPacket(packet) {
    handleDecodedRadioSignal(this, packet);
  }

}


/**
 * Translate and produce the given decoded radio signal as a Raddec.
 * @param {LibnfcManager} instance The given HciManager instance.
 * @param {Object} packet The decoded radio signal packet.
 */
function handleDecodedRadioSignal(instance, packet) {
  let isKnownOrigin = instance.radiosByOrigin.hasOwnProperty(packet.origin);

  if(isKnownOrigin) {
    let radio = instance.radiosByOrigin[packet.origin];
    packet.earliestDecodingTime = packet.time;
    packet.rssiSignature.forEach(function(entry) {
      entry.receiverId = radio.receiverId;
      entry.receiverIdType = radio.receiverIdType;
    });

    let raddec = new Raddec(packet);
    instance.barnowl.handleRaddec(raddec);
  }
}


module.exports = LibnfcManager;
