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
    define(['ApiClient', 'model/Chart', 'model/Credit', 'model/Lang', 'model/Legend', 'model/Loading', 'model/PlotOption', 'model/Title', 'model/XAxi', 'model/YAxi'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./Chart'), require('./Credit'), require('./Lang'), require('./Legend'), require('./Loading'), require('./PlotOption'), require('./Title'), require('./XAxi'), require('./YAxi'));
  } else {
    // Browser globals (root is window)
    if (!root.Quantimodo) {
      root.Quantimodo = {};
    }
    root.Quantimodo.Option = factory(root.Quantimodo.ApiClient, root.Quantimodo.Chart, root.Quantimodo.Credit, root.Quantimodo.Lang, root.Quantimodo.Legend, root.Quantimodo.Loading, root.Quantimodo.PlotOption, root.Quantimodo.Title, root.Quantimodo.XAxi, root.Quantimodo.YAxi);
  }
}(this, function(ApiClient, Chart, Credit, Lang, Legend, Loading, PlotOption, Title, XAxi, YAxi) {
  'use strict';




  /**
   * The Option model module.
   * @module model/Option
   * @version 5.8.1109
   */

  /**
   * Constructs a new <code>Option</code>.
   * @alias module:model/Option
   * @class
   * @param chart {module:model/Chart} 
   * @param colors {Array.<String>} 
   * @param credits {module:model/Credit} 
   * @param lang {module:model/Lang} 
   * @param legend {module:model/Legend} 
   * @param loading {module:model/Loading} 
   * @param plotOptions {module:model/PlotOption} 
   * @param title {module:model/Title} 
   * @param xAxis {module:model/XAxi} 
   * @param yAxis {Array.<module:model/YAxi>} 
   */
  var exports = function(chart, colors, credits, lang, legend, loading, plotOptions, title, xAxis, yAxis) {
    var _this = this;

    _this['chart'] = chart;
    _this['colors'] = colors;
    _this['credits'] = credits;
    _this['lang'] = lang;
    _this['legend'] = legend;
    _this['loading'] = loading;
    _this['plotOptions'] = plotOptions;
    _this['title'] = title;
    _this['xAxis'] = xAxis;
    _this['yAxis'] = yAxis;
  };

  /**
   * Constructs a <code>Option</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/Option} obj Optional instance to populate.
   * @return {module:model/Option} The populated <code>Option</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('chart')) {
        obj['chart'] = Chart.constructFromObject(data['chart']);
      }
      if (data.hasOwnProperty('colors')) {
        obj['colors'] = ApiClient.convertToType(data['colors'], ['String']);
      }
      if (data.hasOwnProperty('credits')) {
        obj['credits'] = Credit.constructFromObject(data['credits']);
      }
      if (data.hasOwnProperty('lang')) {
        obj['lang'] = Lang.constructFromObject(data['lang']);
      }
      if (data.hasOwnProperty('legend')) {
        obj['legend'] = Legend.constructFromObject(data['legend']);
      }
      if (data.hasOwnProperty('loading')) {
        obj['loading'] = Loading.constructFromObject(data['loading']);
      }
      if (data.hasOwnProperty('plotOptions')) {
        obj['plotOptions'] = PlotOption.constructFromObject(data['plotOptions']);
      }
      if (data.hasOwnProperty('title')) {
        obj['title'] = Title.constructFromObject(data['title']);
      }
      if (data.hasOwnProperty('xAxis')) {
        obj['xAxis'] = XAxi.constructFromObject(data['xAxis']);
      }
      if (data.hasOwnProperty('yAxis')) {
        obj['yAxis'] = ApiClient.convertToType(data['yAxis'], [YAxi]);
      }
    }
    return obj;
  }

  /**
   * @member {module:model/Chart} chart
   */
  exports.prototype['chart'] = undefined;
  /**
   * @member {Array.<String>} colors
   */
  exports.prototype['colors'] = undefined;
  /**
   * @member {module:model/Credit} credits
   */
  exports.prototype['credits'] = undefined;
  /**
   * @member {module:model/Lang} lang
   */
  exports.prototype['lang'] = undefined;
  /**
   * @member {module:model/Legend} legend
   */
  exports.prototype['legend'] = undefined;
  /**
   * @member {module:model/Loading} loading
   */
  exports.prototype['loading'] = undefined;
  /**
   * @member {module:model/PlotOption} plotOptions
   */
  exports.prototype['plotOptions'] = undefined;
  /**
   * @member {module:model/Title} title
   */
  exports.prototype['title'] = undefined;
  /**
   * @member {module:model/XAxi} xAxis
   */
  exports.prototype['xAxis'] = undefined;
  /**
   * @member {Array.<module:model/YAxi>} yAxis
   */
  exports.prototype['yAxis'] = undefined;



  return exports;
}));

