/**
 * quantimodo
 * We make it easy to retrieve and analyze normalized user data from a wide array of devices and applications. Check out our [docs and sdk's](https://github.com/QuantiModo/docs) or [contact us](https://help.quantimo.do).
 *
 * OpenAPI spec version: 5.8.112511
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.4.5
 *
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/AppSettings'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./AppSettings'));
  } else {
    // Browser globals (root is window)
    if (!root.Quantimodo) {
      root.Quantimodo = {};
    }
    root.Quantimodo.AuthorizedClients = factory(root.Quantimodo.ApiClient, root.Quantimodo.AppSettings);
  }
}(this, function(ApiClient, AppSettings) {
  'use strict';




  /**
   * The AuthorizedClients model module.
   * @module model/AuthorizedClients
   * @version 5.8.112511
   */

  /**
   * Constructs a new <code>AuthorizedClients</code>.
   * @alias module:model/AuthorizedClients
   * @class
   * @param apps {Array.<module:model/AppSettings>} Applications with access to user measurements for all variables
   * @param individuals {Array.<module:model/AppSettings>} Individuals such as physicians or family members with access to user measurements for all variables
   * @param studies {Array.<module:model/AppSettings>} Studies with access to generally anonymous user measurements for a specific predictor and outcome variable
   */
  var exports = function(apps, individuals, studies) {
    var _this = this;

    _this['apps'] = apps;
    _this['individuals'] = individuals;
    _this['studies'] = studies;
  };

  /**
   * Constructs a <code>AuthorizedClients</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/AuthorizedClients} obj Optional instance to populate.
   * @return {module:model/AuthorizedClients} The populated <code>AuthorizedClients</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('apps')) {
        obj['apps'] = ApiClient.convertToType(data['apps'], [AppSettings]);
      }
      if (data.hasOwnProperty('individuals')) {
        obj['individuals'] = ApiClient.convertToType(data['individuals'], [AppSettings]);
      }
      if (data.hasOwnProperty('studies')) {
        obj['studies'] = ApiClient.convertToType(data['studies'], [AppSettings]);
      }
    }
    return obj;
  }

  /**
   * Applications with access to user measurements for all variables
   * @member {Array.<module:model/AppSettings>} apps
   */
  exports.prototype['apps'] = undefined;
  /**
   * Individuals such as physicians or family members with access to user measurements for all variables
   * @member {Array.<module:model/AppSettings>} individuals
   */
  exports.prototype['individuals'] = undefined;
  /**
   * Studies with access to generally anonymous user measurements for a specific predictor and outcome variable
   * @member {Array.<module:model/AppSettings>} studies
   */
  exports.prototype['studies'] = undefined;



  return exports;
}));


