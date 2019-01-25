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
    root.Quantimodo.ConnectInstructions = factory(root.Quantimodo.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The ConnectInstructions model module.
   * @module model/ConnectInstructions
   * @version 5.8.112511
   */

  /**
   * Constructs a new <code>ConnectInstructions</code>.
   * @alias module:model/ConnectInstructions
   * @class
   * @param url {String} URL to open to connect
   */
  var exports = function(url) {
    var _this = this;


    _this['url'] = url;

  };

  /**
   * Constructs a <code>ConnectInstructions</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ConnectInstructions} obj Optional instance to populate.
   * @return {module:model/ConnectInstructions} The populated <code>ConnectInstructions</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('parameters')) {
        obj['parameters'] = ApiClient.convertToType(data['parameters'], [Object]);
      }
      if (data.hasOwnProperty('url')) {
        obj['url'] = ApiClient.convertToType(data['url'], 'String');
      }
      if (data.hasOwnProperty('usePopup')) {
        obj['usePopup'] = ApiClient.convertToType(data['usePopup'], 'Boolean');
      }
    }
    return obj;
  }

  /**
   * Create a form with these fields and post the key and user submitted value to the provided connect url
   * @member {Array.<Object>} parameters
   */
  exports.prototype['parameters'] = undefined;
  /**
   * URL to open to connect
   * @member {String} url
   */
  exports.prototype['url'] = undefined;
  /**
   * True if should open auth window in popup
   * @member {Boolean} usePopup
   */
  exports.prototype['usePopup'] = undefined;



  return exports;
}));


