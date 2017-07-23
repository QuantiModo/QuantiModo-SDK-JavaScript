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
    define(['ApiClient', 'model/UserTokenSuccessfulResponseInnerUserField'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./UserTokenSuccessfulResponseInnerUserField'));
  } else {
    // Browser globals (root is window)
    if (!root.quantimodo-api) {
      root.quantimodo-api = {};
    }
    root.quantimodo-api.UserTokenSuccessfulResponse = factory(root.quantimodo-api.ApiClient, root.quantimodo-api.UserTokenSuccessfulResponseInnerUserField);
  }
}(this, function(ApiClient, UserTokenSuccessfulResponseInnerUserField) {
  'use strict';




  /**
   * The UserTokenSuccessfulResponse model module.
   * @module model/UserTokenSuccessfulResponse
   * @version 5.8.5
   */

  /**
   * Constructs a new <code>UserTokenSuccessfulResponse</code>.
   * @alias module:model/UserTokenSuccessfulResponse
   * @class
   * @param code {Number} Status code
   * @param message {String} Message
   * @param user {module:model/UserTokenSuccessfulResponseInnerUserField} 
   */
  var exports = function(code, message, user) {
    var _this = this;

    _this['code'] = code;
    _this['message'] = message;
    _this['user'] = user;
  };

  /**
   * Constructs a <code>UserTokenSuccessfulResponse</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/UserTokenSuccessfulResponse} obj Optional instance to populate.
   * @return {module:model/UserTokenSuccessfulResponse} The populated <code>UserTokenSuccessfulResponse</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('code')) {
        obj['code'] = ApiClient.convertToType(data['code'], 'Number');
      }
      if (data.hasOwnProperty('message')) {
        obj['message'] = ApiClient.convertToType(data['message'], 'String');
      }
      if (data.hasOwnProperty('user')) {
        obj['user'] = UserTokenSuccessfulResponseInnerUserField.constructFromObject(data['user']);
      }
    }
    return obj;
  }

  /**
   * Status code
   * @member {Number} code
   */
  exports.prototype['code'] = undefined;
  /**
   * Message
   * @member {String} message
   */
  exports.prototype['message'] = undefined;
  /**
   * @member {module:model/UserTokenSuccessfulResponseInnerUserField} user
   */
  exports.prototype['user'] = undefined;



  return exports;
}));


