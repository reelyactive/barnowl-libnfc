/**
 * Copyright reelyActive 2019
 * We believe in an open Internet of Things
 */


const DEFAULT_RADIO_DECODINGS_PERIOD_MILLISECONDS = 1000;
const TEST_ORIGIN = '00:00:00:00:00:00';


/**
 * TestListener Class
 * Provides a consistent stream of artificially generated HCI data.
 */
class TestListener {

  /**
   * TestListener constructor
   * @param {Object} options The options as a JSON object.
   * @constructor
   */
  constructor(options) {
    options = options || {};

    this.decoder = options.decoder;
    this.radioDecodingPeriod = options.radioDecodingPeriod ||
                               DEFAULT_RADIO_DECODINGS_PERIOD_MILLISECONDS;

    setInterval(emitRadioDecodings, this.radioDecodingPeriod, this);
  }

}


/**
 * Emit simulated radio decoding packets
 * @param {TestListener} instance The given instance.
 */
function emitRadioDecodings(instance) {
  let time = new Date().getTime();
  let simulatedLibnfcData = Buffer.from('', 'hex');
  instance.decoder.handleLibnfcData(simulatedLibnfcData, TEST_ORIGIN, time);
}


module.exports = TestListener;
