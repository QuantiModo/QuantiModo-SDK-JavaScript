/**
 * QuantiModo
 * QuantiModo makes it easy to retrieve normalized user data from a wide array of devices and applications. [Learn about QuantiModo](https://quantimo.do), check out our [docs](https://github.com/QuantiModo/docs) or contact us at [help.quantimo.do](https://help.quantimo.do). 
 *
 * OpenAPI spec version: 5.8.5
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
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
    if (!root.QuantimodoApi) {
      root.QuantimodoApi = {};
    }
    root.QuantimodoApi.User = factory(root.QuantimodoApi.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The User model module.
   * @module model/User
   * @version 5.8.5
   */

  /**
   * Constructs a new <code>User</code>.
   * @alias module:model/User
   * @class
   * @param id {Number} User id
   * @param wpId {Number} Wordpress user id
   * @param displayName {String} User display name
   * @param loginName {String} User login name
   * @param email {String} User email
   * @param token {String} User token
   * @param administrator {Boolean} Is user administrator
   */
  var exports = function(id, wpId, displayName, loginName, email, token, administrator) {
    var _this = this;

    _this['id'] = id;
    _this['wpId'] = wpId;
    _this['displayName'] = displayName;
    _this['loginName'] = loginName;
    _this['email'] = email;
    _this['token'] = token;
    _this['administrator'] = administrator;
  };

  /**
   * Constructs a <code>User</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/User} obj Optional instance to populate.
   * @return {module:model/User} The populated <code>User</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('id')) {
        obj['id'] = ApiClient.convertToType(data['id'], 'Number');
      }
      if (data.hasOwnProperty('wpId')) {
        obj['wpId'] = ApiClient.convertToType(data['wpId'], 'Number');
      }
      if (data.hasOwnProperty('displayName')) {
        obj['displayName'] = ApiClient.convertToType(data['displayName'], 'String');
      }
      if (data.hasOwnProperty('loginName')) {
        obj['loginName'] = ApiClient.convertToType(data['loginName'], 'String');
      }
      if (data.hasOwnProperty('email')) {
        obj['email'] = ApiClient.convertToType(data['email'], 'String');
      }
      if (data.hasOwnProperty('token')) {
        obj['token'] = ApiClient.convertToType(data['token'], 'String');
      }
      if (data.hasOwnProperty('administrator')) {
        obj['administrator'] = ApiClient.convertToType(data['administrator'], 'Boolean');
      }
    }
    return obj;
  }

  /**
   * User id
   * @member {Number} id
   */
  exports.prototype['id'] = undefined;
  /**
   * Wordpress user id
   * @member {Number} wpId
   */
  exports.prototype['wpId'] = undefined;
  /**
   * User display name
   * @member {String} displayName
   */
  exports.prototype['displayName'] = undefined;
  /**
   * User login name
   * @member {String} loginName
   */
  exports.prototype['loginName'] = undefined;
  /**
   * User email
   * @member {String} email
   */
  exports.prototype['email'] = undefined;
  /**
   * User token
   * @member {String} token
   */
  exports.prototype['token'] = undefined;
  /**
   * Is user administrator
   * @member {Boolean} administrator
   */
  exports.prototype['administrator'] = undefined;



  return exports;
}));


