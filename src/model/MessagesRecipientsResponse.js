/**
 * quantimodo
 * We make it easy to retrieve and analyze normalized user data from a wide array of devices and applications. Check out our [docs and sdk's](https://github.com/QuantiModo/docs) or [contact us](https://help.quantimo.do).
 *
 * OpenAPI spec version: 5.8.112511
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.4.1
 *
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/Image', 'model/MessagesRecipient'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./Image'), require('./MessagesRecipient'));
  } else {
    // Browser globals (root is window)
    if (!root.Quantimodo) {
      root.Quantimodo = {};
    }
    root.Quantimodo.MessagesRecipientsResponse = factory(root.Quantimodo.ApiClient, root.Quantimodo.Image, root.Quantimodo.MessagesRecipient);
  }
}(this, function(ApiClient, Image, MessagesRecipient) {
  'use strict';




  /**
   * The MessagesRecipientsResponse model module.
   * @module model/MessagesRecipientsResponse
   * @version 5.8.112511
   */

  /**
   * Constructs a new <code>MessagesRecipientsResponse</code>.
   * @alias module:model/MessagesRecipientsResponse
   * @class
   * @param messagesRecipients {Array.<module:model/MessagesRecipient>} 
   */
  var exports = function(messagesRecipients) {
    var _this = this;

    _this['messagesRecipients'] = messagesRecipients;






  };

  /**
   * Constructs a <code>MessagesRecipientsResponse</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/MessagesRecipientsResponse} obj Optional instance to populate.
   * @return {module:model/MessagesRecipientsResponse} The populated <code>MessagesRecipientsResponse</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('messagesRecipients')) {
        obj['messagesRecipients'] = ApiClient.convertToType(data['messagesRecipients'], [MessagesRecipient]);
      }
      if (data.hasOwnProperty('description')) {
        obj['description'] = ApiClient.convertToType(data['description'], 'String');
      }
      if (data.hasOwnProperty('summary')) {
        obj['summary'] = ApiClient.convertToType(data['summary'], 'String');
      }
      if (data.hasOwnProperty('image')) {
        obj['image'] = Image.constructFromObject(data['image']);
      }
      if (data.hasOwnProperty('avatar')) {
        obj['avatar'] = ApiClient.convertToType(data['avatar'], 'String');
      }
      if (data.hasOwnProperty('ionIcon')) {
        obj['ionIcon'] = ApiClient.convertToType(data['ionIcon'], 'String');
      }
      if (data.hasOwnProperty('html')) {
        obj['html'] = ApiClient.convertToType(data['html'], 'String');
      }
    }
    return obj;
  }

  /**
   * @member {Array.<module:model/MessagesRecipient>} messagesRecipients
   */
  exports.prototype['messagesRecipients'] = undefined;
  /**
   * MessagesRecipient
   * @member {String} description
   */
  exports.prototype['description'] = undefined;
  /**
   * MessagesRecipient
   * @member {String} summary
   */
  exports.prototype['summary'] = undefined;
  /**
   * @member {module:model/Image} image
   */
  exports.prototype['image'] = undefined;
  /**
   * Square icon png url
   * @member {String} avatar
   */
  exports.prototype['avatar'] = undefined;
  /**
   * Ex: ion-ios-person
   * @member {String} ionIcon
   */
  exports.prototype['ionIcon'] = undefined;
  /**
   * Embeddable list of study summaries with explanation at the top
   * @member {String} html
   */
  exports.prototype['html'] = undefined;



  return exports;
}));


