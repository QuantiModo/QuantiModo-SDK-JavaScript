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
    define(['ApiClient'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'));
  } else {
    // Browser globals (root is window)
    if (!root.Quantimodo) {
      root.Quantimodo = {};
    }
    root.Quantimodo.GroupsMember = factory(root.Quantimodo.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The GroupsMember model module.
   * @module model/GroupsMember
   * @version 5.8.112511
   */

  /**
   * Constructs a new <code>GroupsMember</code>.
   * @alias module:model/GroupsMember
   * @class
   * @param id {Number} What do you expect?
   * @param groupId {Number} What do you expect?
   * @param userId {Number} What do you expect?
   * @param inviterId {Number} What do you expect?
   * @param isAdmin {Number} What do you expect?
   * @param isMod {Number} What do you expect?
   * @param userTitle {String} What do you expect?
   * @param dateModified {String} What do you expect?
   * @param comments {String} What do you expect?
   * @param isConfirmed {Number} What do you expect?
   * @param isBanned {Number} What do you expect?
   * @param inviteSent {Number} What do you expect?
   */
  var exports = function(id, groupId, userId, inviterId, isAdmin, isMod, userTitle, dateModified, comments, isConfirmed, isBanned, inviteSent) {
    var _this = this;

    _this['id'] = id;
    _this['groupId'] = groupId;
    _this['userId'] = userId;
    _this['inviterId'] = inviterId;
    _this['isAdmin'] = isAdmin;
    _this['isMod'] = isMod;
    _this['userTitle'] = userTitle;
    _this['dateModified'] = dateModified;
    _this['comments'] = comments;
    _this['isConfirmed'] = isConfirmed;
    _this['isBanned'] = isBanned;
    _this['inviteSent'] = inviteSent;

  };

  /**
   * Constructs a <code>GroupsMember</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/GroupsMember} obj Optional instance to populate.
   * @return {module:model/GroupsMember} The populated <code>GroupsMember</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('id')) {
        obj['id'] = ApiClient.convertToType(data['id'], 'Number');
      }
      if (data.hasOwnProperty('groupId')) {
        obj['groupId'] = ApiClient.convertToType(data['groupId'], 'Number');
      }
      if (data.hasOwnProperty('userId')) {
        obj['userId'] = ApiClient.convertToType(data['userId'], 'Number');
      }
      if (data.hasOwnProperty('inviterId')) {
        obj['inviterId'] = ApiClient.convertToType(data['inviterId'], 'Number');
      }
      if (data.hasOwnProperty('isAdmin')) {
        obj['isAdmin'] = ApiClient.convertToType(data['isAdmin'], 'Number');
      }
      if (data.hasOwnProperty('isMod')) {
        obj['isMod'] = ApiClient.convertToType(data['isMod'], 'Number');
      }
      if (data.hasOwnProperty('userTitle')) {
        obj['userTitle'] = ApiClient.convertToType(data['userTitle'], 'String');
      }
      if (data.hasOwnProperty('dateModified')) {
        obj['dateModified'] = ApiClient.convertToType(data['dateModified'], 'String');
      }
      if (data.hasOwnProperty('comments')) {
        obj['comments'] = ApiClient.convertToType(data['comments'], 'String');
      }
      if (data.hasOwnProperty('isConfirmed')) {
        obj['isConfirmed'] = ApiClient.convertToType(data['isConfirmed'], 'Number');
      }
      if (data.hasOwnProperty('isBanned')) {
        obj['isBanned'] = ApiClient.convertToType(data['isBanned'], 'Number');
      }
      if (data.hasOwnProperty('inviteSent')) {
        obj['inviteSent'] = ApiClient.convertToType(data['inviteSent'], 'Number');
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
   * @member {Number} groupId
   */
  exports.prototype['groupId'] = undefined;
  /**
   * What do you expect?
   * @member {Number} userId
   */
  exports.prototype['userId'] = undefined;
  /**
   * What do you expect?
   * @member {Number} inviterId
   */
  exports.prototype['inviterId'] = undefined;
  /**
   * What do you expect?
   * @member {Number} isAdmin
   */
  exports.prototype['isAdmin'] = undefined;
  /**
   * What do you expect?
   * @member {Number} isMod
   */
  exports.prototype['isMod'] = undefined;
  /**
   * What do you expect?
   * @member {String} userTitle
   */
  exports.prototype['userTitle'] = undefined;
  /**
   * What do you expect?
   * @member {String} dateModified
   */
  exports.prototype['dateModified'] = undefined;
  /**
   * What do you expect?
   * @member {String} comments
   */
  exports.prototype['comments'] = undefined;
  /**
   * What do you expect?
   * @member {Number} isConfirmed
   */
  exports.prototype['isConfirmed'] = undefined;
  /**
   * What do you expect?
   * @member {Number} isBanned
   */
  exports.prototype['isBanned'] = undefined;
  /**
   * What do you expect?
   * @member {Number} inviteSent
   */
  exports.prototype['inviteSent'] = undefined;
  /**
   * Additional groupsmember key-value data
   * @member {Array.<Object>} metaDataArray
   */
  exports.prototype['metaDataArray'] = undefined;



  return exports;
}));


