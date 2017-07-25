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
    define(['quantimodoApi/ApiClient'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'));
  } else {
    // Browser globals (root is window)
    if (!root.quantimodoApi) {
      root.quantimodoApi = {};
    }
    root.quantimodoApi.MeasurementSource = factory(root.quantimodoApi.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The MeasurementSource model module.
   * @module quantimodoApi/quantimodoApi/MeasurementSource
   * @version 5.8.724
   */

  /**
   * Constructs a new <code>MeasurementSource</code>.
   * @alias module:quantimodoApi/quantimodoApi/MeasurementSource
   * @class
   * @param name {String} Name of the application or device.
   */
  var exports = function(name) {
    var _this = this;

    _this['name'] = name;
  };

  /**
   * Constructs a <code>MeasurementSource</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:quantimodoApi/quantimodoApi/MeasurementSource} obj Optional instance to populate.
   * @return {module:quantimodoApi/quantimodoApi/MeasurementSource} The populated <code>MeasurementSource</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('name')) {
        obj['name'] = ApiClient.convertToType(data['name'], 'String');
      }
    }
    return obj;
  }

  /**
   * Name of the application or device.
   * @member {String} name
   */
  exports.prototype['name'] = undefined;



  return exports;
}));


