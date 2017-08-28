/**
 * quantimodo
 * QuantiModo makes it easy to retrieve normalized user data from a wide array of devices and applications. [Learn about QuantiModo](https://quantimo.do), check out our [docs](https://github.com/QuantiModo/docs) or contact us at [help.quantimo.do](https://help.quantimo.do).
 *
 * OpenAPI spec version: 5.8.728
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
    root.Quantimodo.Tooltip = factory(root.Quantimodo.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The Tooltip model module.
   * @module model/Tooltip
   * @version 5.8.824
   */

  /**
   * Constructs a new <code>Tooltip</code>.
   * @alias module:model/Tooltip
   * @class
   * @param pointFormat {String} Example: {point.x}Pa, {point.y}h
   * @param valueSuffix {String} Example: Pa
   */
  var exports = function(pointFormat, valueSuffix) {
    var _this = this;

    _this['pointFormat'] = pointFormat;
    _this['valueSuffix'] = valueSuffix;
  };

  /**
   * Constructs a <code>Tooltip</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/Tooltip} obj Optional instance to populate.
   * @return {module:model/Tooltip} The populated <code>Tooltip</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('pointFormat')) {
        obj['pointFormat'] = ApiClient.convertToType(data['pointFormat'], 'String');
      }
      if (data.hasOwnProperty('valueSuffix')) {
        obj['valueSuffix'] = ApiClient.convertToType(data['valueSuffix'], 'String');
      }
    }
    return obj;
  }

  /**
   * Example: {point.x}Pa, {point.y}h
   * @member {String} pointFormat
   */
  exports.prototype['pointFormat'] = undefined;
  /**
   * Example: Pa
   * @member {String} valueSuffix
   */
  exports.prototype['valueSuffix'] = undefined;



  return exports;
}));


