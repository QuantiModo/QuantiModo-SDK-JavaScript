/**
 * QuantiModo
 * QuantiModo makes it easy to retrieve normalized user data from a wide array of devices and applications. [Learn about QuantiModo](https://quantimo.do), check out our [docs](https://github.com/QuantiModo/docs) or contact us at [help.quantimo.do](https://help.quantimo.do). 
 *
 * OpenAPI spec version: 2.0
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.2.3
 *
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['quantimodoApi/ApiClient', 'quantimodoApi/quantimodoApi/ConnectorInfoHistoryItem'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./ConnectorInfoHistoryItem'));
  } else {
    // Browser globals (root is window)
    if (!root.quantimodoApi) {
      root.quantimodoApi = {};
    }
    root.quantimodoApi.ConnectorInfo = factory(root.quantimodoApi.ApiClient, root.quantimodoApi.ConnectorInfoHistoryItem);
  }
}(this, function(ApiClient, ConnectorInfoHistoryItem) {
  'use strict';




  /**
   * The ConnectorInfo model module.
   * @module quantimodoApi/quantimodoApi/ConnectorInfo
   * @version 5.8.724
   */

  /**
   * Constructs a new <code>ConnectorInfo</code>.
   * @alias module:quantimodoApi/quantimodoApi/ConnectorInfo
   * @class
   * @param id {Number} Connector ID number
   * @param connected {Boolean} True if the authenticated user has this connector enabled
   * @param error {String} Error message. Empty if connected.
   * @param history {Array.<module:quantimodoApi/quantimodoApi/ConnectorInfoHistoryItem>} 
   */
  var exports = function(id, connected, error, history) {
    var _this = this;

    _this['id'] = id;
    _this['connected'] = connected;
    _this['error'] = error;
    _this['history'] = history;
  };

  /**
   * Constructs a <code>ConnectorInfo</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:quantimodoApi/quantimodoApi/ConnectorInfo} obj Optional instance to populate.
   * @return {module:quantimodoApi/quantimodoApi/ConnectorInfo} The populated <code>ConnectorInfo</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('id')) {
        obj['id'] = ApiClient.convertToType(data['id'], 'Number');
      }
      if (data.hasOwnProperty('connected')) {
        obj['connected'] = ApiClient.convertToType(data['connected'], 'Boolean');
      }
      if (data.hasOwnProperty('error')) {
        obj['error'] = ApiClient.convertToType(data['error'], 'String');
      }
      if (data.hasOwnProperty('history')) {
        obj['history'] = ApiClient.convertToType(data['history'], [ConnectorInfoHistoryItem]);
      }
    }
    return obj;
  }

  /**
   * Connector ID number
   * @member {Number} id
   */
  exports.prototype['id'] = undefined;
  /**
   * True if the authenticated user has this connector enabled
   * @member {Boolean} connected
   */
  exports.prototype['connected'] = undefined;
  /**
   * Error message. Empty if connected.
   * @member {String} error
   */
  exports.prototype['error'] = undefined;
  /**
   * @member {Array.<module:quantimodoApi/quantimodoApi/ConnectorInfoHistoryItem>} history
   */
  exports.prototype['history'] = undefined;



  return exports;
}));


