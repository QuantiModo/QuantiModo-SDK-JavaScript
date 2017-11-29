/**
 * quantimodo
 * We make it easy to retrieve and analyze normalized user data from a wide array of devices and applications. Check out our [docs and sdk's](https://github.com/QuantiModo/docs) or [contact us](https://help.quantimo.do).
 *
 * OpenAPI spec version: 5.8.112511
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
    root.Quantimodo.MeasurementDelete = factory(root.Quantimodo.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The MeasurementDelete model module.
   * @module model/MeasurementDelete
   * @version 5.8.1129
   */

  /**
   * Constructs a new <code>MeasurementDelete</code>.
   * @alias module:model/MeasurementDelete
   * @class
   * @param startTime {Number} Start time of the measurement to be deleted
   * @param variableId {Number} Variable id of the measurement to be deleted
   */
  var exports = function(startTime, variableId) {
    var _this = this;

    _this['startTime'] = startTime;
    _this['variableId'] = variableId;
  };

  /**
   * Constructs a <code>MeasurementDelete</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/MeasurementDelete} obj Optional instance to populate.
   * @return {module:model/MeasurementDelete} The populated <code>MeasurementDelete</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('startTime')) {
        obj['startTime'] = ApiClient.convertToType(data['startTime'], 'Number');
      }
      if (data.hasOwnProperty('variableId')) {
        obj['variableId'] = ApiClient.convertToType(data['variableId'], 'Number');
      }
    }
    return obj;
  }

  /**
   * Start time of the measurement to be deleted
   * @member {Number} startTime
   */
  exports.prototype['startTime'] = undefined;
  /**
   * Variable id of the measurement to be deleted
   * @member {Number} variableId
   */
  exports.prototype['variableId'] = undefined;



  return exports;
}));


