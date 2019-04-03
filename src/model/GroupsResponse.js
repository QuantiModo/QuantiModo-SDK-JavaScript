/**
 * quantimodo
 * We make it easy to retrieve and analyze normalized user data from a wide array of devices and applications. Check out our [docs and sdk's](https://github.com/QuantiModo/docs) or [contact us](https://help.quantimo.do).
 *
 * OpenAPI spec version: 5.8.112511
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.4.4
 *
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/Card', 'model/Error', 'model/Group', 'model/Image'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./Card'), require('./Error'), require('./Group'), require('./Image'));
  } else {
    // Browser globals (root is window)
    if (!root.Quantimodo) {
      root.Quantimodo = {};
    }
    root.Quantimodo.GroupsResponse = factory(root.Quantimodo.ApiClient, root.Quantimodo.Card, root.Quantimodo.Error, root.Quantimodo.Group, root.Quantimodo.Image);
  }
}(this, function(ApiClient, Card, Error, Group, Image) {
  'use strict';




  /**
   * The GroupsResponse model module.
   * @module model/GroupsResponse
   * @version 5.8.112511
   */

  /**
   * Constructs a new <code>GroupsResponse</code>.
   * @alias module:model/GroupsResponse
   * @class
   * @param groups {Array.<module:model/Group>} 
   */
  var exports = function(groups) {
    var _this = this;

    _this['groups'] = groups;












  };

  /**
   * Constructs a <code>GroupsResponse</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/GroupsResponse} obj Optional instance to populate.
   * @return {module:model/GroupsResponse} The populated <code>GroupsResponse</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('groups')) {
        obj['groups'] = ApiClient.convertToType(data['groups'], [Group]);
      }
      if (data.hasOwnProperty('description')) {
        obj['description'] = ApiClient.convertToType(data['description'], 'String');
      }
      if (data.hasOwnProperty('summary')) {
        obj['summary'] = ApiClient.convertToType(data['summary'], 'String');
      }
      if (data.hasOwnProperty('image')) {
        obj['image'] = Image.constructFromObject(data['image']);
      }
      if (data.hasOwnProperty('avatar')) {
        obj['avatar'] = ApiClient.convertToType(data['avatar'], 'String');
      }
      if (data.hasOwnProperty('ionIcon')) {
        obj['ionIcon'] = ApiClient.convertToType(data['ionIcon'], 'String');
      }
      if (data.hasOwnProperty('html')) {
        obj['html'] = ApiClient.convertToType(data['html'], 'String');
      }
      if (data.hasOwnProperty('errors')) {
        obj['errors'] = ApiClient.convertToType(data['errors'], [Error]);
      }
      if (data.hasOwnProperty('status')) {
        obj['status'] = ApiClient.convertToType(data['status'], 'String');
      }
      if (data.hasOwnProperty('success')) {
        obj['success'] = ApiClient.convertToType(data['success'], 'Boolean');
      }
      if (data.hasOwnProperty('code')) {
        obj['code'] = ApiClient.convertToType(data['code'], 'Number');
      }
      if (data.hasOwnProperty('link')) {
        obj['link'] = ApiClient.convertToType(data['link'], 'String');
      }
      if (data.hasOwnProperty('card')) {
        obj['card'] = Card.constructFromObject(data['card']);
      }
    }
    return obj;
  }

  /**
   * @member {Array.<module:model/Group>} groups
   */
  exports.prototype['groups'] = undefined;
  /**
   * Group
   * @member {String} description
   */
  exports.prototype['description'] = undefined;
  /**
   * Group
   * @member {String} summary
   */
  exports.prototype['summary'] = undefined;
  /**
   * @member {module:model/Image} image
   */
  exports.prototype['image'] = undefined;
  /**
   * Square icon png url
   * @member {String} avatar
   */
  exports.prototype['avatar'] = undefined;
  /**
   * Ex: ion-ios-person
   * @member {String} ionIcon
   */
  exports.prototype['ionIcon'] = undefined;
  /**
   * Embeddable list of study summaries with explanation at the top
   * @member {String} html
   */
  exports.prototype['html'] = undefined;
  /**
   * Array of error objects with message property
   * @member {Array.<module:model/Error>} errors
   */
  exports.prototype['errors'] = undefined;
  /**
   * ex. OK or ERROR
   * @member {String} status
   */
  exports.prototype['status'] = undefined;
  /**
   * true or false
   * @member {Boolean} success
   */
  exports.prototype['success'] = undefined;
  /**
   * Response code such as 200
   * @member {Number} code
   */
  exports.prototype['code'] = undefined;
  /**
   * A super neat url you might want to share with your users!
   * @member {String} link
   */
  exports.prototype['link'] = undefined;
  /**
   * A super neat card with buttons and HTML that you can use in your app!
   * @member {module:model/Card} card
   */
  exports.prototype['card'] = undefined;



  return exports;
}));


