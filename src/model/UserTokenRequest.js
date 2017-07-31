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
    define(['ApiClient', 'model/UserTokenRequestInnerUserField'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./UserTokenRequestInnerUserField'));
  } else {
    // Browser globals (root is window)
    if (!root.Quantimodo) {
      root.Quantimodo = {};
    }
    root.Quantimodo.UserTokenRequest = factory(root.Quantimodo.ApiClient, root.Quantimodo.UserTokenRequestInnerUserField);
  }
}(this, function(ApiClient, UserTokenRequestInnerUserField) {
  'use strict';




  /**
   * The UserTokenRequest model module.
   * @module model/UserTokenRequest
   * @version 5.8.730
   */

  /**
   * Constructs a new <code>UserTokenRequest</code>.
   * @alias module:model/UserTokenRequest
   * @class
   * @param organizationAccessToken {String} Organization Access token
   */
  var exports = function(organizationAccessToken) {
    var _this = this;


    _this['organizationAccessToken'] = organizationAccessToken;
  };

  /**
   * Constructs a <code>UserTokenRequest</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/UserTokenRequest} obj Optional instance to populate.
   * @return {module:model/UserTokenRequest} The populated <code>UserTokenRequest</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('user')) {
        obj['user'] = UserTokenRequestInnerUserField.constructFromObject(data['user']);
      }
      if (data.hasOwnProperty('organizationAccessToken')) {
        obj['organizationAccessToken'] = ApiClient.convertToType(data['organizationAccessToken'], 'String');
      }
    }
    return obj;
  }

  /**
   * @member {module:model/UserTokenRequestInnerUserField} user
   */
  exports.prototype['user'] = undefined;
  /**
   * Organization Access token
   * @member {String} organizationAccessToken
   */
  exports.prototype['organizationAccessToken'] = undefined;



  return exports;
}));


