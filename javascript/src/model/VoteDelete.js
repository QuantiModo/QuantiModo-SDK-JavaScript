/**
 * QuantiModo
 * QuantiModo makes it easy to retrieve normalized user data from a wide array of devices and applications. [Learn about QuantiModo](https://quantimo.do), check out our [docs](https://github.com/QuantiModo/docs) or contact us at [help.quantimo.do](https://help.quantimo.do). 
 *
 * OpenAPI spec version: 2.0
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
    if (!root.QuantiModo) {
      root.QuantiModo = {};
    }
    root.QuantiModo.VoteDelete = factory(root.QuantiModo.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The VoteDelete model module.
   * @module model/VoteDelete
   * @version 2.0
   */

  /**
   * Constructs a new <code>VoteDelete</code>.
   * @alias module:model/VoteDelete
   * @class
   * @param cause {String} Cause variable name for the correlation to which the vote pertains
   * @param effect {String} Effect variable name for the correlation to which the vote pertains
   */
  var exports = function(cause, effect) {
    var _this = this;

    _this['cause'] = cause;
    _this['effect'] = effect;
  };

  /**
   * Constructs a <code>VoteDelete</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/VoteDelete} obj Optional instance to populate.
   * @return {module:model/VoteDelete} The populated <code>VoteDelete</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('cause')) {
        obj['cause'] = ApiClient.convertToType(data['cause'], 'String');
      }
      if (data.hasOwnProperty('effect')) {
        obj['effect'] = ApiClient.convertToType(data['effect'], 'String');
      }
    }
    return obj;
  }

  /**
   * Cause variable name for the correlation to which the vote pertains
   * @member {String} cause
   */
  exports.prototype['cause'] = undefined;
  /**
   * Effect variable name for the correlation to which the vote pertains
   * @member {String} effect
   */
  exports.prototype['effect'] = undefined;



  return exports;
}));


