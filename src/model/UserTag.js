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
    root.Quantimodo.UserTag = factory(root.Quantimodo.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The UserTag model module.
   * @module model/UserTag
   * @version 5.8.731
   */

  /**
   * Constructs a new <code>UserTag</code>.
   * @alias module:model/UserTag
   * @class
   * @param taggedVariableId {Number} This is the id of the variable being tagged with an ingredient or something.
   * @param tagVariableId {Number} This is the id of the ingredient variable whose value is determined based on the value of the tagged variable.
   * @param conversionFactor {Number} Number by which we multiply the tagged variable value to obtain the tag variable (ingredient) value
   */
  var exports = function(taggedVariableId, tagVariableId, conversionFactor) {
    var _this = this;

    _this['taggedVariableId'] = taggedVariableId;
    _this['tagVariableId'] = tagVariableId;
    _this['conversionFactor'] = conversionFactor;
  };

  /**
   * Constructs a <code>UserTag</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/UserTag} obj Optional instance to populate.
   * @return {module:model/UserTag} The populated <code>UserTag</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('taggedVariableId')) {
        obj['taggedVariableId'] = ApiClient.convertToType(data['taggedVariableId'], 'Number');
      }
      if (data.hasOwnProperty('tagVariableId')) {
        obj['tagVariableId'] = ApiClient.convertToType(data['tagVariableId'], 'Number');
      }
      if (data.hasOwnProperty('conversionFactor')) {
        obj['conversionFactor'] = ApiClient.convertToType(data['conversionFactor'], 'Number');
      }
    }
    return obj;
  }

  /**
   * This is the id of the variable being tagged with an ingredient or something.
   * @member {Number} taggedVariableId
   */
  exports.prototype['taggedVariableId'] = undefined;
  /**
   * This is the id of the ingredient variable whose value is determined based on the value of the tagged variable.
   * @member {Number} tagVariableId
   */
  exports.prototype['tagVariableId'] = undefined;
  /**
   * Number by which we multiply the tagged variable value to obtain the tag variable (ingredient) value
   * @member {Number} conversionFactor
   */
  exports.prototype['conversionFactor'] = undefined;



  return exports;
}));


