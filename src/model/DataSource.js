/**
 * quantimodo
 * QuantiModo makes it easy to retrieve normalized user data from a wide array of devices and applications. [Learn about QuantiModo](https://quantimo.do), check out our [docs](https://github.com/QuantiModo/docs) or contact us at [help.quantimo.do](https://help.quantimo.do).
 *
 * OpenAPI spec version: 5.8.728
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
    root.Quantimodo.DataSource = factory(root.Quantimodo.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The DataSource model module.
   * @module model/DataSource
   * @version 5.8.824
   */

  /**
   * Constructs a new <code>DataSource</code>.
   * @alias module:model/DataSource
   * @class
   * @param id {Number} Example: 72
   * @param name {String} Example: quantimodo
   * @param displayName {String} Example: QuantiModo
   * @param image {String} Example: https://app.quantimo.do/ionic/Modo/www/img/logos/quantimodo-logo-qm-rainbow-200-200.png
   * @param getItUrl {String} Example: https://quantimo.do
   * @param shortDescription {String} Example: Tracks anything
   * @param longDescription {String} Example: QuantiModo is a Chrome extension, Android app, iOS app, and web app that allows you to easily track mood, symptoms, or any outcome you want to optimize in a fraction of a second.  You can also import your data from over 30 other apps and devices like Fitbit, Rescuetime, Jawbone Up, Withings, Facebook, Github, Google Calendar, Runkeeper, MoodPanda, Slice, Google Fit, and more.  QuantiModo then analyzes your data to identify which hidden factors are most likely to be influencing your mood or symptoms and their optimal daily values.
   * @param enabled {Number} Example: 0
   * @param affiliate {Boolean} Example: true
   * @param defaultVariableCategoryName {String} Example: Foods
   * @param imageHtml {String} Example: <a href=\"https://quantimo.do\"><img id=\"quantimodo_image\" title=\"QuantiModo\" src=\"https://app.quantimo.do/ionic/Modo/www/img/logos/quantimodo-logo-qm-rainbow-200-200.png\" alt=\"QuantiModo\"></a>
   * @param linkedDisplayNameHtml {String} Example: <a href=\"https://quantimo.do\">QuantiModo</a>
   * @param connectorClientId {String} Example: ba7d0c12432650e23b3ce924ae2d21e2ff59e7e4e28650759633700af7ed0a30
   */
  var exports = function(id, name, displayName, image, getItUrl, shortDescription, longDescription, enabled, affiliate, defaultVariableCategoryName, imageHtml, linkedDisplayNameHtml, connectorClientId) {
    var _this = this;

    _this['id'] = id;
    _this['name'] = name;
    _this['displayName'] = displayName;
    _this['image'] = image;
    _this['getItUrl'] = getItUrl;
    _this['shortDescription'] = shortDescription;
    _this['longDescription'] = longDescription;
    _this['enabled'] = enabled;
    _this['affiliate'] = affiliate;
    _this['defaultVariableCategoryName'] = defaultVariableCategoryName;
    _this['imageHtml'] = imageHtml;
    _this['linkedDisplayNameHtml'] = linkedDisplayNameHtml;
    _this['connectorClientId'] = connectorClientId;
  };

  /**
   * Constructs a <code>DataSource</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/DataSource} obj Optional instance to populate.
   * @return {module:model/DataSource} The populated <code>DataSource</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('id')) {
        obj['id'] = ApiClient.convertToType(data['id'], 'Number');
      }
      if (data.hasOwnProperty('name')) {
        obj['name'] = ApiClient.convertToType(data['name'], 'String');
      }
      if (data.hasOwnProperty('displayName')) {
        obj['displayName'] = ApiClient.convertToType(data['displayName'], 'String');
      }
      if (data.hasOwnProperty('image')) {
        obj['image'] = ApiClient.convertToType(data['image'], 'String');
      }
      if (data.hasOwnProperty('getItUrl')) {
        obj['getItUrl'] = ApiClient.convertToType(data['getItUrl'], 'String');
      }
      if (data.hasOwnProperty('shortDescription')) {
        obj['shortDescription'] = ApiClient.convertToType(data['shortDescription'], 'String');
      }
      if (data.hasOwnProperty('longDescription')) {
        obj['longDescription'] = ApiClient.convertToType(data['longDescription'], 'String');
      }
      if (data.hasOwnProperty('enabled')) {
        obj['enabled'] = ApiClient.convertToType(data['enabled'], 'Number');
      }
      if (data.hasOwnProperty('affiliate')) {
        obj['affiliate'] = ApiClient.convertToType(data['affiliate'], 'Boolean');
      }
      if (data.hasOwnProperty('defaultVariableCategoryName')) {
        obj['defaultVariableCategoryName'] = ApiClient.convertToType(data['defaultVariableCategoryName'], 'String');
      }
      if (data.hasOwnProperty('imageHtml')) {
        obj['imageHtml'] = ApiClient.convertToType(data['imageHtml'], 'String');
      }
      if (data.hasOwnProperty('linkedDisplayNameHtml')) {
        obj['linkedDisplayNameHtml'] = ApiClient.convertToType(data['linkedDisplayNameHtml'], 'String');
      }
      if (data.hasOwnProperty('connectorClientId')) {
        obj['connectorClientId'] = ApiClient.convertToType(data['connectorClientId'], 'String');
      }
    }
    return obj;
  }

  /**
   * Example: 72
   * @member {Number} id
   */
  exports.prototype['id'] = undefined;
  /**
   * Example: quantimodo
   * @member {String} name
   */
  exports.prototype['name'] = undefined;
  /**
   * Example: QuantiModo
   * @member {String} displayName
   */
  exports.prototype['displayName'] = undefined;
  /**
   * Example: https://app.quantimo.do/ionic/Modo/www/img/logos/quantimodo-logo-qm-rainbow-200-200.png
   * @member {String} image
   */
  exports.prototype['image'] = undefined;
  /**
   * Example: https://quantimo.do
   * @member {String} getItUrl
   */
  exports.prototype['getItUrl'] = undefined;
  /**
   * Example: Tracks anything
   * @member {String} shortDescription
   */
  exports.prototype['shortDescription'] = undefined;
  /**
   * Example: QuantiModo is a Chrome extension, Android app, iOS app, and web app that allows you to easily track mood, symptoms, or any outcome you want to optimize in a fraction of a second.  You can also import your data from over 30 other apps and devices like Fitbit, Rescuetime, Jawbone Up, Withings, Facebook, Github, Google Calendar, Runkeeper, MoodPanda, Slice, Google Fit, and more.  QuantiModo then analyzes your data to identify which hidden factors are most likely to be influencing your mood or symptoms and their optimal daily values.
   * @member {String} longDescription
   */
  exports.prototype['longDescription'] = undefined;
  /**
   * Example: 0
   * @member {Number} enabled
   */
  exports.prototype['enabled'] = undefined;
  /**
   * Example: true
   * @member {Boolean} affiliate
   */
  exports.prototype['affiliate'] = undefined;
  /**
   * Example: Foods
   * @member {String} defaultVariableCategoryName
   */
  exports.prototype['defaultVariableCategoryName'] = undefined;
  /**
   * Example: <a href=\"https://quantimo.do\"><img id=\"quantimodo_image\" title=\"QuantiModo\" src=\"https://app.quantimo.do/ionic/Modo/www/img/logos/quantimodo-logo-qm-rainbow-200-200.png\" alt=\"QuantiModo\"></a>
   * @member {String} imageHtml
   */
  exports.prototype['imageHtml'] = undefined;
  /**
   * Example: <a href=\"https://quantimo.do\">QuantiModo</a>
   * @member {String} linkedDisplayNameHtml
   */
  exports.prototype['linkedDisplayNameHtml'] = undefined;
  /**
   * Example: ba7d0c12432650e23b3ce924ae2d21e2ff59e7e4e28650759633700af7ed0a30
   * @member {String} connectorClientId
   */
  exports.prototype['connectorClientId'] = undefined;



  return exports;
}));


