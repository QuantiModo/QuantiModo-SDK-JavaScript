/**
 * quantimodo
 * We make it easy to retrieve and analyze normalized user data from a wide array of devices and applications. Check out our [docs and sdk's](https://github.com/QuantiModo/docs) or [contact us](https://help.quantimo.do).
 *
 * OpenAPI spec version: 5.8.100414
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
    define(['ApiClient'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'));
  } else {
    // Browser globals (root is window)
    if (!root.Quantimodo) {
      root.Quantimodo = {};
    }
    root.Quantimodo.GetPairsResponse = factory(root.Quantimodo.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The GetPairsResponse model module.
   * @module model/GetPairsResponse
   * @version 5.8.1109
   */

  /**
   * Constructs a new <code>GetPairsResponse</code>.
   * @alias module:model/GetPairsResponse
   * @class
   */
  var exports = function() {
    var _this = this;







  };

  /**
   * Constructs a <code>GetPairsResponse</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/GetPairsResponse} obj Optional instance to populate.
   * @return {module:model/GetPairsResponse} The populated <code>GetPairsResponse</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('causeMeasurement')) {
        obj['causeMeasurement'] = ApiClient.convertToType(data['causeMeasurement'], 'Number');
      }
      if (data.hasOwnProperty('causeMeasurementValue')) {
        obj['causeMeasurementValue'] = ApiClient.convertToType(data['causeMeasurementValue'], 'Number');
      }
      if (data.hasOwnProperty('effectMeasurement')) {
        obj['effectMeasurement'] = ApiClient.convertToType(data['effectMeasurement'], 'Number');
      }
      if (data.hasOwnProperty('effectMeasurementValue')) {
        obj['effectMeasurementValue'] = ApiClient.convertToType(data['effectMeasurementValue'], 'Number');
      }
      if (data.hasOwnProperty('startTimeString')) {
        obj['startTimeString'] = ApiClient.convertToType(data['startTimeString'], 'Date');
      }
      if (data.hasOwnProperty('timestamp')) {
        obj['timestamp'] = ApiClient.convertToType(data['timestamp'], 'Number');
      }
    }
    return obj;
  }

  /**
   * Example: 2.0166666666667
   * @member {Number} causeMeasurement
   */
  exports.prototype['causeMeasurement'] = undefined;
  /**
   * Example: 2.0166666666667
   * @member {Number} causeMeasurementValue
   */
  exports.prototype['causeMeasurementValue'] = undefined;
  /**
   * Example: 4
   * @member {Number} effectMeasurement
   */
  exports.prototype['effectMeasurement'] = undefined;
  /**
   * Example: 4
   * @member {Number} effectMeasurementValue
   */
  exports.prototype['effectMeasurementValue'] = undefined;
  /**
   * Example: 2015-08-06 15:49:02
   * @member {Date} startTimeString
   */
  exports.prototype['startTimeString'] = undefined;
  /**
   * Example: 1438876142
   * @member {Number} timestamp
   */
  exports.prototype['timestamp'] = undefined;



  return exports;
}));

