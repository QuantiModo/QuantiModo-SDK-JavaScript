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
    root.Quantimodo.LocalDailyReminderNotificationTime = factory(root.Quantimodo.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The LocalDailyReminderNotificationTime model module.
   * @module model/LocalDailyReminderNotificationTime
   * @version 5.8.1105
   */

  /**
   * Constructs a new <code>LocalDailyReminderNotificationTime</code>.
   * @alias module:model/LocalDailyReminderNotificationTime
   * @class
   */
  var exports = function() {
    var _this = this;


  };

  /**
   * Constructs a <code>LocalDailyReminderNotificationTime</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/LocalDailyReminderNotificationTime} obj Optional instance to populate.
   * @return {module:model/LocalDailyReminderNotificationTime} The populated <code>LocalDailyReminderNotificationTime</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('LocalDailyReminderNotificationTime')) {
        obj['LocalDailyReminderNotificationTime'] = ApiClient.convertToType(data['LocalDailyReminderNotificationTime'], 'Date');
      }
    }
    return obj;
  }

  /**
   * Example: 00:10:00
   * @member {Date} LocalDailyReminderNotificationTime
   */
  exports.prototype['LocalDailyReminderNotificationTime'] = undefined;



  return exports;
}));


