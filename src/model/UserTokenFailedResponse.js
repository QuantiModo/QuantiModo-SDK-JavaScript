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
    root.Quantimodo.UserTokenFailedResponse = factory(root.Quantimodo.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The UserTokenFailedResponse model module.
   * @module model/UserTokenFailedResponse
   * @version 5.8.731
   */

  /**
   * Constructs a new <code>UserTokenFailedResponse</code>.
   * @alias module:model/UserTokenFailedResponse
   * @class
   * @param code {Number} Status code
   * @param message {String} Message
   * @param success {Boolean} 
   */
  var exports = function(code, message, success) {
    var _this = this;

    _this['code'] = code;
    _this['message'] = message;
    _this['success'] = success;
  };

  /**
   * Constructs a <code>UserTokenFailedResponse</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/UserTokenFailedResponse} obj Optional instance to populate.
   * @return {module:model/UserTokenFailedResponse} The populated <code>UserTokenFailedResponse</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('code')) {
        obj['code'] = ApiClient.convertToType(data['code'], 'Number');
      }
      if (data.hasOwnProperty('message')) {
        obj['message'] = ApiClient.convertToType(data['message'], 'String');
      }
      if (data.hasOwnProperty('success')) {
        obj['success'] = ApiClient.convertToType(data['success'], 'Boolean');
      }
    }
    return obj;
  }

  /**
   * Status code
   * @member {Number} code
   */
  exports.prototype['code'] = undefined;
  /**
   * Message
   * @member {String} message
   */
  exports.prototype['message'] = undefined;
  /**
   * @member {Boolean} success
   */
  exports.prototype['success'] = undefined;



  return exports;
}));


