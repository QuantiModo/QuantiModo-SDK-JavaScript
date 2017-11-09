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
    define(['ApiClient', 'model/Column', 'model/Scatter'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./Column'), require('./Scatter'));
  } else {
    // Browser globals (root is window)
    if (!root.Quantimodo) {
      root.Quantimodo = {};
    }
    root.Quantimodo.PlotOption = factory(root.Quantimodo.ApiClient, root.Quantimodo.Column, root.Quantimodo.Scatter);
  }
}(this, function(ApiClient, Column, Scatter) {
  'use strict';




  /**
   * The PlotOption model module.
   * @module model/PlotOption
   * @version 5.8.1109
   */

  /**
   * Constructs a new <code>PlotOption</code>.
   * @alias module:model/PlotOption
   * @class
   * @param column {module:model/Column} 
   * @param scatter {module:model/Scatter} 
   */
  var exports = function(column, scatter) {
    var _this = this;

    _this['column'] = column;
    _this['scatter'] = scatter;
  };

  /**
   * Constructs a <code>PlotOption</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/PlotOption} obj Optional instance to populate.
   * @return {module:model/PlotOption} The populated <code>PlotOption</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('column')) {
        obj['column'] = Column.constructFromObject(data['column']);
      }
      if (data.hasOwnProperty('scatter')) {
        obj['scatter'] = Scatter.constructFromObject(data['scatter']);
      }
    }
    return obj;
  }

  /**
   * @member {module:model/Column} column
   */
  exports.prototype['column'] = undefined;
  /**
   * @member {module:model/Scatter} scatter
   */
  exports.prototype['scatter'] = undefined;



  return exports;
}));


