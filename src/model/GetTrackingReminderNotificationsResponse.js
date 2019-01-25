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
    define(['ApiClient', 'model/TrackingReminderNotification'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./TrackingReminderNotification'));
  } else {
    // Browser globals (root is window)
    if (!root.Quantimodo) {
      root.Quantimodo = {};
    }
    root.Quantimodo.GetTrackingReminderNotificationsResponse = factory(root.Quantimodo.ApiClient, root.Quantimodo.TrackingReminderNotification);
  }
}(this, function(ApiClient, TrackingReminderNotification) {
  'use strict';




  /**
   * The GetTrackingReminderNotificationsResponse model module.
   * @module model/GetTrackingReminderNotificationsResponse
   * @version 5.8.112511
   */

  /**
   * Constructs a new <code>GetTrackingReminderNotificationsResponse</code>.
   * @alias module:model/GetTrackingReminderNotificationsResponse
   * @class
   * @param description {String} Can be used as body of help info popup
   * @param summary {String} Can be used as title in help info popup
   */
  var exports = function(description, summary) {
    var _this = this;


    _this['description'] = description;
    _this['summary'] = summary;
  };

  /**
   * Constructs a <code>GetTrackingReminderNotificationsResponse</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/GetTrackingReminderNotificationsResponse} obj Optional instance to populate.
   * @return {module:model/GetTrackingReminderNotificationsResponse} The populated <code>GetTrackingReminderNotificationsResponse</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('data')) {
        obj['data'] = ApiClient.convertToType(data['data'], [TrackingReminderNotification]);
      }
      if (data.hasOwnProperty('description')) {
        obj['description'] = ApiClient.convertToType(data['description'], 'String');
      }
      if (data.hasOwnProperty('summary')) {
        obj['summary'] = ApiClient.convertToType(data['summary'], 'String');
      }
    }
    return obj;
  }

  /**
   * @member {Array.<module:model/TrackingReminderNotification>} data
   */
  exports.prototype['data'] = undefined;
  /**
   * Can be used as body of help info popup
   * @member {String} description
   */
  exports.prototype['description'] = undefined;
  /**
   * Can be used as title in help info popup
   * @member {String} summary
   */
  exports.prototype['summary'] = undefined;



  return exports;
}));


