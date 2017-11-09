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
    define(['ApiClient', 'model/ExplanationStartTracking', 'model/Image'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./ExplanationStartTracking'), require('./Image'));
  } else {
    // Browser globals (root is window)
    if (!root.Quantimodo) {
      root.Quantimodo = {};
    }
    root.Quantimodo.Explanation = factory(root.Quantimodo.ApiClient, root.Quantimodo.ExplanationStartTracking, root.Quantimodo.Image);
  }
}(this, function(ApiClient, ExplanationStartTracking, Image) {
  'use strict';




  /**
   * The Explanation model module.
   * @module model/Explanation
   * @version 5.8.1109
   */

  /**
   * Constructs a new <code>Explanation</code>.
   * @alias module:model/Explanation
   * @class
   * @param description {String} Example: These factors are most predictive of Overall Mood based on your own data.
   * @param image {module:model/Image} 
   * @param ionIcon {String} Example: ion-ios-person
   * @param startTracking {module:model/ExplanationStartTracking} 
   * @param title {String} Example: Top Predictors of Overall Mood
   */
  var exports = function(description, image, ionIcon, startTracking, title) {
    var _this = this;

    _this['description'] = description;
    _this['image'] = image;
    _this['ionIcon'] = ionIcon;
    _this['startTracking'] = startTracking;
    _this['title'] = title;
  };

  /**
   * Constructs a <code>Explanation</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/Explanation} obj Optional instance to populate.
   * @return {module:model/Explanation} The populated <code>Explanation</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('description')) {
        obj['description'] = ApiClient.convertToType(data['description'], 'String');
      }
      if (data.hasOwnProperty('image')) {
        obj['image'] = Image.constructFromObject(data['image']);
      }
      if (data.hasOwnProperty('ionIcon')) {
        obj['ionIcon'] = ApiClient.convertToType(data['ionIcon'], 'String');
      }
      if (data.hasOwnProperty('startTracking')) {
        obj['startTracking'] = ExplanationStartTracking.constructFromObject(data['startTracking']);
      }
      if (data.hasOwnProperty('title')) {
        obj['title'] = ApiClient.convertToType(data['title'], 'String');
      }
    }
    return obj;
  }

  /**
   * Example: These factors are most predictive of Overall Mood based on your own data.
   * @member {String} description
   */
  exports.prototype['description'] = undefined;
  /**
   * @member {module:model/Image} image
   */
  exports.prototype['image'] = undefined;
  /**
   * Example: ion-ios-person
   * @member {String} ionIcon
   */
  exports.prototype['ionIcon'] = undefined;
  /**
   * @member {module:model/ExplanationStartTracking} startTracking
   */
  exports.prototype['startTracking'] = undefined;
  /**
   * Example: Top Predictors of Overall Mood
   * @member {String} title
   */
  exports.prototype['title'] = undefined;



  return exports;
}));


