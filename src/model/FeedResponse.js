/**
 * quantimodo
 * We make it easy to retrieve and analyze normalized user data from a wide array of devices and applications. Check out our [docs and sdk's](https://github.com/QuantiModo/docs) or [contact us](https://help.quantimo.do).
 *
 * OpenAPI spec version: 5.8.112511
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.3.1
 *
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/Card'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./Card'));
  } else {
    // Browser globals (root is window)
    if (!root.Quantimodo) {
      root.Quantimodo = {};
    }
    root.Quantimodo.FeedResponse = factory(root.Quantimodo.ApiClient, root.Quantimodo.Card);
  }
}(this, function(ApiClient, Card) {
  'use strict';




  /**
   * The FeedResponse model module.
   * @module model/FeedResponse
   * @version 5.8.112511
   */

  /**
   * Constructs a new <code>FeedResponse</code>.
   * @alias module:model/FeedResponse
   * @class
   * @param cards {Array.<module:model/Card>} 
   * @param description {String} Tracking reminder notifications, messages, and study result cards that can be displayed in user feed or stream
   * @param summary {String} Tracking reminder notifications, messages, and study results
   */
  var exports = function(cards, description, summary) {
    var _this = this;

    _this['cards'] = cards;
    _this['description'] = description;
    _this['summary'] = summary;
  };

  /**
   * Constructs a <code>FeedResponse</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/FeedResponse} obj Optional instance to populate.
   * @return {module:model/FeedResponse} The populated <code>FeedResponse</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('cards')) {
        obj['cards'] = ApiClient.convertToType(data['cards'], [Card]);
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
   * @member {Array.<module:model/Card>} cards
   */
  exports.prototype['cards'] = undefined;
  /**
   * Tracking reminder notifications, messages, and study result cards that can be displayed in user feed or stream
   * @member {String} description
   */
  exports.prototype['description'] = undefined;
  /**
   * Tracking reminder notifications, messages, and study results
   * @member {String} summary
   */
  exports.prototype['summary'] = undefined;



  return exports;
}));

