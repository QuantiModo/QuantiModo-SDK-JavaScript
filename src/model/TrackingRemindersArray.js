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
    define(['ApiClient', 'model/TrackingReminder'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./TrackingReminder'));
  } else {
    // Browser globals (root is window)
    if (!root.Quantimodo) {
      root.Quantimodo = {};
    }
    root.Quantimodo.TrackingRemindersArray = factory(root.Quantimodo.ApiClient, root.Quantimodo.TrackingReminder);
  }
}(this, function(ApiClient, TrackingReminder) {
  'use strict';




  /**
   * The TrackingRemindersArray model module.
   * @module model/TrackingRemindersArray
   * @version 5.8.1109
   */

  /**
   * Constructs a new <code>TrackingRemindersArray</code>.
   * @alias module:model/TrackingRemindersArray
   * @class
   * @extends Array
   */
  var exports = function() {
    var _this = this;
    _this = new Array();
    Object.setPrototypeOf(_this, exports);

    return _this;
  };

  /**
   * Constructs a <code>TrackingRemindersArray</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/TrackingRemindersArray} obj Optional instance to populate.
   * @return {module:model/TrackingRemindersArray} The populated <code>TrackingRemindersArray</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();
      ApiClient.constructFromObject(data, obj, 'TrackingReminder');

    }
    return obj;
  }




  return exports;
}));


