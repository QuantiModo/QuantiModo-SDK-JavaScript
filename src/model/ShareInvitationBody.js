/**
 * quantimodo
 * We make it easy to retrieve and analyze normalized user data from a wide array of devices and applications. Check out our [docs and sdk's](https://github.com/QuantiModo/docs) or [contact us](https://help.quantimo.do).
 *
 * OpenAPI spec version: 5.8.112511
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.3.1
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
    root.Quantimodo.ShareInvitationBody = factory(root.Quantimodo.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The ShareInvitationBody model module.
   * @module model/ShareInvitationBody
   * @version 5.8.112511
   */

  /**
   * Constructs a new <code>ShareInvitationBody</code>.
   * @alias module:model/ShareInvitationBody
   * @class
   * @param emailAddress {String} Enter the email address of the friend, family member, or health-care provider that you would like to give access to your measurements
   */
  var exports = function(emailAddress) {
    var _this = this;

    _this['emailAddress'] = emailAddress;




  };

  /**
   * Constructs a <code>ShareInvitationBody</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ShareInvitationBody} obj Optional instance to populate.
   * @return {module:model/ShareInvitationBody} The populated <code>ShareInvitationBody</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('emailAddress')) {
        obj['emailAddress'] = ApiClient.convertToType(data['emailAddress'], 'String');
      }
      if (data.hasOwnProperty('name')) {
        obj['name'] = ApiClient.convertToType(data['name'], 'String');
      }
      if (data.hasOwnProperty('emailSubject')) {
        obj['emailSubject'] = ApiClient.convertToType(data['emailSubject'], 'String');
      }
      if (data.hasOwnProperty('emailBody')) {
        obj['emailBody'] = ApiClient.convertToType(data['emailBody'], 'String');
      }
      if (data.hasOwnProperty('scopes')) {
        obj['scopes'] = ApiClient.convertToType(data['scopes'], 'String');
      }
    }
    return obj;
  }

  /**
   * Enter the email address of the friend, family member, or health-care provider that you would like to give access to your measurements
   * @member {String} emailAddress
   */
  exports.prototype['emailAddress'] = undefined;
  /**
   * Name of the individual that the user wishes to have access to their measurements
   * @member {String} name
   */
  exports.prototype['name'] = undefined;
  /**
   * Example: I would like to share my measurements with you!
   * @member {String} emailSubject
   */
  exports.prototype['emailSubject'] = undefined;
  /**
   * Example: I would like to share my data with you so you can help me identify find discover hidden causes of and new treatments for my illness.
   * @member {String} emailBody
   */
  exports.prototype['emailBody'] = undefined;
  /**
   * Space separated list of scopes to grant to the recipient (i.e. readmeasurements, writemeasurements, measurements:read
   * @member {String} scopes
   */
  exports.prototype['scopes'] = undefined;



  return exports;
}));


