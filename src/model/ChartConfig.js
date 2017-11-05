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
    define(['ApiClient', 'model/Option', 'model/Series', 'model/Subtitle', 'model/Title', 'model/XAxi', 'model/YAxi'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./Option'), require('./Series'), require('./Subtitle'), require('./Title'), require('./XAxi'), require('./YAxi'));
  } else {
    // Browser globals (root is window)
    if (!root.Quantimodo) {
      root.Quantimodo = {};
    }
    root.Quantimodo.ChartConfig = factory(root.Quantimodo.ApiClient, root.Quantimodo.Option, root.Quantimodo.Series, root.Quantimodo.Subtitle, root.Quantimodo.Title, root.Quantimodo.XAxi, root.Quantimodo.YAxi);
  }
}(this, function(ApiClient, Option, Series, Subtitle, Title, XAxi, YAxi) {
  'use strict';




  /**
   * The ChartConfig model module.
   * @module model/ChartConfig
   * @version 5.8.1105
   */

  /**
   * Constructs a new <code>ChartConfig</code>.
   * @alias module:model/ChartConfig
   * @class
   * @param loading {Boolean} Example: false
   * @param options {module:model/Option} 
   * @param series {Array.<module:model/Series>} 
   * @param subtitle {module:model/Subtitle} 
   * @param title {module:model/Title} 
   * @param xAxis {module:model/XAxi} 
   * @param yAxis {module:model/YAxi} 
   */
  var exports = function(loading, options, series, subtitle, title, xAxis, yAxis) {
    var _this = this;

    _this['loading'] = loading;
    _this['options'] = options;
    _this['series'] = series;
    _this['subtitle'] = subtitle;
    _this['title'] = title;
    _this['xAxis'] = xAxis;
    _this['yAxis'] = yAxis;
  };

  /**
   * Constructs a <code>ChartConfig</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ChartConfig} obj Optional instance to populate.
   * @return {module:model/ChartConfig} The populated <code>ChartConfig</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('loading')) {
        obj['loading'] = ApiClient.convertToType(data['loading'], 'Boolean');
      }
      if (data.hasOwnProperty('options')) {
        obj['options'] = Option.constructFromObject(data['options']);
      }
      if (data.hasOwnProperty('series')) {
        obj['series'] = ApiClient.convertToType(data['series'], [Series]);
      }
      if (data.hasOwnProperty('subtitle')) {
        obj['subtitle'] = Subtitle.constructFromObject(data['subtitle']);
      }
      if (data.hasOwnProperty('title')) {
        obj['title'] = Title.constructFromObject(data['title']);
      }
      if (data.hasOwnProperty('xAxis')) {
        obj['xAxis'] = XAxi.constructFromObject(data['xAxis']);
      }
      if (data.hasOwnProperty('yAxis')) {
        obj['yAxis'] = YAxi.constructFromObject(data['yAxis']);
      }
    }
    return obj;
  }

  /**
   * Example: false
   * @member {Boolean} loading
   */
  exports.prototype['loading'] = undefined;
  /**
   * @member {module:model/Option} options
   */
  exports.prototype['options'] = undefined;
  /**
   * @member {Array.<module:model/Series>} series
   */
  exports.prototype['series'] = undefined;
  /**
   * @member {module:model/Subtitle} subtitle
   */
  exports.prototype['subtitle'] = undefined;
  /**
   * @member {module:model/Title} title
   */
  exports.prototype['title'] = undefined;
  /**
   * @member {module:model/XAxi} xAxis
   */
  exports.prototype['xAxis'] = undefined;
  /**
   * @member {module:model/YAxi} yAxis
   */
  exports.prototype['yAxis'] = undefined;



  return exports;
}));


