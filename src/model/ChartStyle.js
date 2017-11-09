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
    root.Quantimodo.ChartStyle = factory(root.Quantimodo.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The ChartStyle model module.
   * @module model/ChartStyle
   * @version 5.8.1109
   */

  /**
   * Constructs a new <code>ChartStyle</code>.
   * @alias module:model/ChartStyle
   * @class
   * @param background {String} Example: url(/res/loading3.gif) no-repeat center
   */
  var exports = function(background) {
    var _this = this;

    _this['background'] = background;
  };

  /**
   * Constructs a <code>ChartStyle</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ChartStyle} obj Optional instance to populate.
   * @return {module:model/ChartStyle} The populated <code>ChartStyle</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('background')) {
        obj['background'] = ApiClient.convertToType(data['background'], 'String');
      }
    }
    return obj;
  }

  /**
   * Example: url(/res/loading3.gif) no-repeat center
   * @member {String} background
   */
  exports.prototype['background'] = undefined;



  return exports;
}));


