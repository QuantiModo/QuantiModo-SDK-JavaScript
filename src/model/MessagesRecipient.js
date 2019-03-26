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
    root.Quantimodo.MessagesRecipient = factory(root.Quantimodo.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The MessagesRecipient model module.
   * @module model/MessagesRecipient
   * @version 5.8.112511
   */

  /**
   * Constructs a new <code>MessagesRecipient</code>.
   * @alias module:model/MessagesRecipient
   * @class
   * @param id {Number} What do you expect?
   * @param userId {Number} What do you expect?
   * @param threadId {Number} What do you expect?
   * @param unreadCount {Number} What do you expect?
   * @param senderOnly {Number} What do you expect?
   * @param isDeleted {Number} What do you expect?
   */
  var exports = function(id, userId, threadId, unreadCount, senderOnly, isDeleted) {
    var _this = this;

    _this['id'] = id;
    _this['userId'] = userId;
    _this['threadId'] = threadId;
    _this['unreadCount'] = unreadCount;
    _this['senderOnly'] = senderOnly;
    _this['isDeleted'] = isDeleted;

  };

  /**
   * Constructs a <code>MessagesRecipient</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/MessagesRecipient} obj Optional instance to populate.
   * @return {module:model/MessagesRecipient} The populated <code>MessagesRecipient</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('id')) {
        obj['id'] = ApiClient.convertToType(data['id'], 'Number');
      }
      if (data.hasOwnProperty('userId')) {
        obj['userId'] = ApiClient.convertToType(data['userId'], 'Number');
      }
      if (data.hasOwnProperty('threadId')) {
        obj['threadId'] = ApiClient.convertToType(data['threadId'], 'Number');
      }
      if (data.hasOwnProperty('unreadCount')) {
        obj['unreadCount'] = ApiClient.convertToType(data['unreadCount'], 'Number');
      }
      if (data.hasOwnProperty('senderOnly')) {
        obj['senderOnly'] = ApiClient.convertToType(data['senderOnly'], 'Number');
      }
      if (data.hasOwnProperty('isDeleted')) {
        obj['isDeleted'] = ApiClient.convertToType(data['isDeleted'], 'Number');
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
   * @member {Number} userId
   */
  exports.prototype['userId'] = undefined;
  /**
   * What do you expect?
   * @member {Number} threadId
   */
  exports.prototype['threadId'] = undefined;
  /**
   * What do you expect?
   * @member {Number} unreadCount
   */
  exports.prototype['unreadCount'] = undefined;
  /**
   * What do you expect?
   * @member {Number} senderOnly
   */
  exports.prototype['senderOnly'] = undefined;
  /**
   * What do you expect?
   * @member {Number} isDeleted
   */
  exports.prototype['isDeleted'] = undefined;
  /**
   * Additional messagesrecipient key-value data
   * @member {Array.<Object>} metaDataArray
   */
  exports.prototype['metaDataArray'] = undefined;



  return exports;
}));


