/**
 * quantimodo
 * QuantiModo makes it easy to retrieve normalized user data from a wide array of devices and applications. [Learn about QuantiModo](https://quantimo.do), check out our [docs](https://github.com/QuantiModo/docs) or contact us at [help.quantimo.do](https://help.quantimo.do).
 *
 * OpenAPI spec version: 5.8.726
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
    root.Quantimodo.ConnectorInstruction = factory(root.Quantimodo.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The ConnectorInstruction model module.
   * @module model/ConnectorInstruction
   * @version 5.8.726
   */

  /**
   * Constructs a new <code>ConnectorInstruction</code>.
   * @alias module:model/ConnectorInstruction
   * @class
   */
  var exports = function() {
    var _this = this;




  };

  /**
   * Constructs a <code>ConnectorInstruction</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ConnectorInstruction} obj Optional instance to populate.
   * @return {module:model/ConnectorInstruction} The populated <code>ConnectorInstruction</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('url')) {
        obj['url'] = ApiClient.convertToType(data['url'], 'String');
      }
      if (data.hasOwnProperty('parameters')) {
        obj['parameters'] = ApiClient.convertToType(data['parameters'], ['String']);
      }
      if (data.hasOwnProperty('usePopup')) {
        obj['usePopup'] = ApiClient.convertToType(data['usePopup'], 'Boolean');
      }
    }
    return obj;
  }

  /**
   * url
   * @member {String} url
   */
  exports.prototype['url'] = undefined;
  /**
   * parameters array
   * @member {Array.<String>} parameters
   */
  exports.prototype['parameters'] = undefined;
  /**
   * usePopup
   * @member {Boolean} usePopup
   */
  exports.prototype['usePopup'] = undefined;



  return exports;
}));

