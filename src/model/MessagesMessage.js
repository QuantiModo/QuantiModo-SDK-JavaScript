/**
 * quantimodo
 * We make it easy to retrieve and analyze normalized user data from a wide array of devices and applications. Check out our [docs and sdk's](https://github.com/QuantiModo/docs) or [contact us](https://help.quantimo.do).
 *
 * OpenAPI spec version: 5.8.112511
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.4.4
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
    root.Quantimodo.MessagesMessage = factory(root.Quantimodo.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The MessagesMessage model module.
   * @module model/MessagesMessage
   * @version 5.8.112511
   */

  /**
   * Constructs a new <code>MessagesMessage</code>.
   * @alias module:model/MessagesMessage
   * @class
   * @param id {Number} What do you expect?
   * @param threadId {Number} What do you expect?
   * @param senderId {Number} What do you expect?
   * @param subject {String} What do you expect?
   * @param message {String} What do you expect?
   * @param dateSent {String} What do you expect?
   */
  var exports = function(id, threadId, senderId, subject, message, dateSent) {
    var _this = this;

    _this['id'] = id;
    _this['threadId'] = threadId;
    _this['senderId'] = senderId;
    _this['subject'] = subject;
    _this['message'] = message;
    _this['dateSent'] = dateSent;

  };

  /**
   * Constructs a <code>MessagesMessage</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/MessagesMessage} obj Optional instance to populate.
   * @return {module:model/MessagesMessage} The populated <code>MessagesMessage</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('id')) {
        obj['id'] = ApiClient.convertToType(data['id'], 'Number');
      }
      if (data.hasOwnProperty('threadId')) {
        obj['threadId'] = ApiClient.convertToType(data['threadId'], 'Number');
      }
      if (data.hasOwnProperty('senderId')) {
        obj['senderId'] = ApiClient.convertToType(data['senderId'], 'Number');
      }
      if (data.hasOwnProperty('subject')) {
        obj['subject'] = ApiClient.convertToType(data['subject'], 'String');
      }
      if (data.hasOwnProperty('message')) {
        obj['message'] = ApiClient.convertToType(data['message'], 'String');
      }
      if (data.hasOwnProperty('dateSent')) {
        obj['dateSent'] = ApiClient.convertToType(data['dateSent'], 'String');
      }
      if (data.hasOwnProperty('metaDataArray')) {
        obj['metaDataArray'] = ApiClient.convertToType(data['metaDataArray'], [Object]);
      }
    }
    return obj;
  }

  /**
   * What do you expect?
   * @member {Number} id
   */
  exports.prototype['id'] = undefined;
  /**
   * What do you expect?
   * @member {Number} threadId
   */
  exports.prototype['threadId'] = undefined;
  /**
   * What do you expect?
   * @member {Number} senderId
   */
  exports.prototype['senderId'] = undefined;
  /**
   * What do you expect?
   * @member {String} subject
   */
  exports.prototype['subject'] = undefined;
  /**
   * What do you expect?
   * @member {String} message
   */
  exports.prototype['message'] = undefined;
  /**
   * What do you expect?
   * @member {String} dateSent
   */
  exports.prototype['dateSent'] = undefined;
  /**
   * Additional messagesmessage key-value data
   * @member {Array.<Object>} metaDataArray
   */
  exports.prototype['metaDataArray'] = undefined;



  return exports;
}));


