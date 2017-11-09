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
    define(['ApiClient', 'model/State'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./State'));
  } else {
    // Browser globals (root is window)
    if (!root.Quantimodo) {
      root.Quantimodo = {};
    }
    root.Quantimodo.Marker = factory(root.Quantimodo.ApiClient, root.Quantimodo.State);
  }
}(this, function(ApiClient, State) {
  'use strict';




  /**
   * The Marker model module.
   * @module model/Marker
   * @version 5.8.1109
   */

  /**
   * Constructs a new <code>Marker</code>.
   * @alias module:model/Marker
   * @class
   * @param enabled {Boolean} Example: false
   * @param radius {Number} Example: 5
   * @param states {module:model/State} 
   */
  var exports = function(enabled, radius, states) {
    var _this = this;

    _this['enabled'] = enabled;
    _this['radius'] = radius;
    _this['states'] = states;
  };

  /**
   * Constructs a <code>Marker</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/Marker} obj Optional instance to populate.
   * @return {module:model/Marker} The populated <code>Marker</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('enabled')) {
        obj['enabled'] = ApiClient.convertToType(data['enabled'], 'Boolean');
      }
      if (data.hasOwnProperty('radius')) {
        obj['radius'] = ApiClient.convertToType(data['radius'], 'Number');
      }
      if (data.hasOwnProperty('states')) {
        obj['states'] = State.constructFromObject(data['states']);
      }
    }
    return obj;
  }

  /**
   * Example: false
   * @member {Boolean} enabled
   */
  exports.prototype['enabled'] = undefined;
  /**
   * Example: 5
   * @member {Number} radius
   */
  exports.prototype['radius'] = undefined;
  /**
   * @member {module:model/State} states
   */
  exports.prototype['states'] = undefined;



  return exports;
}));


