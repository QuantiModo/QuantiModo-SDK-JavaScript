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
    if (!root.QuantiModo) {
      root.QuantiModo = {};
    }
    root.QuantiModo.PostVote = factory(root.QuantiModo.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The PostVote model module.
   * @module model/PostVote
   * @version 5.8.5
   */

  /**
   * Constructs a new <code>PostVote</code>.
   * @alias module:model/PostVote
   * @class
   * @param causeVariableId {Number} Cause variable id
   * @param effectVariableId {Number} Effect variable id
   * @param vote {Boolean} Vote: 0 (for implausible) or 1 (for plausible)
   */
  var exports = function(causeVariableId, effectVariableId, vote) {
    var _this = this;

    _this['causeVariableId'] = causeVariableId;
    _this['effectVariableId'] = effectVariableId;
    _this['vote'] = vote;
  };

  /**
   * Constructs a <code>PostVote</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/PostVote} obj Optional instance to populate.
   * @return {module:model/PostVote} The populated <code>PostVote</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('causeVariableId')) {
        obj['causeVariableId'] = ApiClient.convertToType(data['causeVariableId'], 'Number');
      }
      if (data.hasOwnProperty('effectVariableId')) {
        obj['effectVariableId'] = ApiClient.convertToType(data['effectVariableId'], 'Number');
      }
      if (data.hasOwnProperty('vote')) {
        obj['vote'] = ApiClient.convertToType(data['vote'], 'Boolean');
      }
    }
    return obj;
  }

  /**
   * Cause variable id
   * @member {Number} causeVariableId
   */
  exports.prototype['causeVariableId'] = undefined;
  /**
   * Effect variable id
   * @member {Number} effectVariableId
   */
  exports.prototype['effectVariableId'] = undefined;
  /**
   * Vote: 0 (for implausible) or 1 (for plausible)
   * @member {Boolean} vote
   */
  exports.prototype['vote'] = undefined;



  return exports;
}));


