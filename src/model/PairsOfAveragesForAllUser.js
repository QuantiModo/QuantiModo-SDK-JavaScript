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
    root.Quantimodo.PairsOfAveragesForAllUser = factory(root.Quantimodo.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The PairsOfAveragesForAllUser model module.
   * @module model/PairsOfAveragesForAllUser
   * @version 5.8.1105
   */

  /**
   * Constructs a new <code>PairsOfAveragesForAllUser</code>.
   * @alias module:model/PairsOfAveragesForAllUser
   * @class
   */
  var exports = function() {
    var _this = this;



  };

  /**
   * Constructs a <code>PairsOfAveragesForAllUser</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/PairsOfAveragesForAllUser} obj Optional instance to populate.
   * @return {module:model/PairsOfAveragesForAllUser} The populated <code>PairsOfAveragesForAllUser</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('causeVariableAverageValue')) {
        obj['causeVariableAverageValue'] = ApiClient.convertToType(data['causeVariableAverageValue'], 'Number');
      }
      if (data.hasOwnProperty('effectVariableAverageValue')) {
        obj['effectVariableAverageValue'] = ApiClient.convertToType(data['effectVariableAverageValue'], 'Number');
      }
    }
    return obj;
  }

  /**
   * Example: 435.73
   * @member {Number} causeVariableAverageValue
   */
  exports.prototype['causeVariableAverageValue'] = undefined;
  /**
   * Example: 3.3705
   * @member {Number} effectVariableAverageValue
   */
  exports.prototype['effectVariableAverageValue'] = undefined;



  return exports;
}));


