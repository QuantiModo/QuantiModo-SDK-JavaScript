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
    define(['ApiClient', 'model/ChartConfig'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./ChartConfig'));
  } else {
    // Browser globals (root is window)
    if (!root.Quantimodo) {
      root.Quantimodo = {};
    }
    root.Quantimodo.Highchart = factory(root.Quantimodo.ApiClient, root.Quantimodo.ChartConfig);
  }
}(this, function(ApiClient, ChartConfig) {
  'use strict';




  /**
   * The Highchart model module.
   * @module model/Highchart
   * @version 5.8.1105
   */

  /**
   * Constructs a new <code>Highchart</code>.
   * @alias module:model/Highchart
   * @class
   */
  var exports = function() {
    var _this = this;





  };

  /**
   * Constructs a <code>Highchart</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/Highchart} obj Optional instance to populate.
   * @return {module:model/Highchart} The populated <code>Highchart</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('chartConfig')) {
        obj['chartConfig'] = ChartConfig.constructFromObject(data['chartConfig']);
      }
      if (data.hasOwnProperty('chartId')) {
        obj['chartId'] = ApiClient.convertToType(data['chartId'], 'String');
      }
      if (data.hasOwnProperty('chartTitle')) {
        obj['chartTitle'] = ApiClient.convertToType(data['chartTitle'], 'String');
      }
      if (data.hasOwnProperty('explanation')) {
        obj['explanation'] = ApiClient.convertToType(data['explanation'], 'String');
      }
    }
    return obj;
  }

  /**
   * @member {module:model/ChartConfig} chartConfig
   */
  exports.prototype['chartConfig'] = undefined;
  /**
   * Example: correlationScatterPlot
   * @member {String} chartId
   */
  exports.prototype['chartId'] = undefined;
  /**
   * Example: Overall Mood following Sleep Duration (R = -0.173)
   * @member {String} chartTitle
   */
  exports.prototype['chartTitle'] = undefined;
  /**
   * Example: The chart above indicates that an increase in Sleep Duration is usually followed by an decrease in Overall Mood.
   * @member {String} explanation
   */
  exports.prototype['explanation'] = undefined;



  return exports;
}));


