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
    if (!root.quantimodo-api) {
      root.quantimodo-api = {};
    }
    root.quantimodo-api.UserVariables = factory(root.quantimodo-api.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The UserVariables model module.
   * @module model/UserVariables
   * @version 2.0
   */

  /**
   * Constructs a new <code>UserVariables</code>.
   * @alias module:model/UserVariables
   * @class
   * @param user {Number} User ID
   * @param variableId {Number} Common variable id
   */
  var exports = function(user, variableId) {
    var _this = this;

    _this['user'] = user;
    _this['variableId'] = variableId;









  };

  /**
   * Constructs a <code>UserVariables</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/UserVariables} obj Optional instance to populate.
   * @return {module:model/UserVariables} The populated <code>UserVariables</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('user')) {
        obj['user'] = ApiClient.convertToType(data['user'], 'Number');
      }
      if (data.hasOwnProperty('variableId')) {
        obj['variableId'] = ApiClient.convertToType(data['variableId'], 'Number');
      }
      if (data.hasOwnProperty('durationOfAction')) {
        obj['durationOfAction'] = ApiClient.convertToType(data['durationOfAction'], 'Number');
      }
      if (data.hasOwnProperty('fillingValue')) {
        obj['fillingValue'] = ApiClient.convertToType(data['fillingValue'], 'Number');
      }
      if (data.hasOwnProperty('joinWith')) {
        obj['joinWith'] = ApiClient.convertToType(data['joinWith'], 'String');
      }
      if (data.hasOwnProperty('maximumAllowedValue')) {
        obj['maximumAllowedValue'] = ApiClient.convertToType(data['maximumAllowedValue'], 'Number');
      }
      if (data.hasOwnProperty('minimumAllowedValue')) {
        obj['minimumAllowedValue'] = ApiClient.convertToType(data['minimumAllowedValue'], 'Number');
      }
      if (data.hasOwnProperty('onsetDelay')) {
        obj['onsetDelay'] = ApiClient.convertToType(data['onsetDelay'], 'Number');
      }
      if (data.hasOwnProperty('experimentStartTime')) {
        obj['experimentStartTime'] = ApiClient.convertToType(data['experimentStartTime'], 'String');
      }
      if (data.hasOwnProperty('experimentEndTime')) {
        obj['experimentEndTime'] = ApiClient.convertToType(data['experimentEndTime'], 'String');
      }
      if (data.hasOwnProperty('alias')) {
        obj['alias'] = ApiClient.convertToType(data['alias'], 'String');
      }
    }
    return obj;
  }

  /**
   * User ID
   * @member {Number} user
   */
  exports.prototype['user'] = undefined;
  /**
   * Common variable id
   * @member {Number} variableId
   */
  exports.prototype['variableId'] = undefined;
  /**
   * The amount of time over which a predictor/stimulus event can exert an observable influence on an outcome variable’s value. For instance, aspirin (stimulus/predictor) typically decreases headache severity for approximately four hours (duration of action) following the onset delay.
   * @member {Number} durationOfAction
   */
  exports.prototype['durationOfAction'] = undefined;
  /**
   * When it comes to analysis to determine the effects of this variable, knowing when it did not occur is as important as knowing when it did occur. For example, if you are tracking a medication, it is important to know when you did not take it, but you do not have to log zero values for all the days when you haven't taken it. Hence, you can specify a filling value (typically 0) to insert whenever data is missing.
   * @member {Number} fillingValue
   */
  exports.prototype['fillingValue'] = undefined;
  /**
   * joinWith
   * @member {String} joinWith
   */
  exports.prototype['joinWith'] = undefined;
  /**
   * The maximum allowed value for measurements. While you can record a value above this maximum, it will be excluded from the correlation analysis.
   * @member {Number} maximumAllowedValue
   */
  exports.prototype['maximumAllowedValue'] = undefined;
  /**
   * The minimum allowed value for measurements. While you can record a value below this minimum, it will be excluded from the correlation analysis.
   * @member {Number} minimumAllowedValue
   */
  exports.prototype['minimumAllowedValue'] = undefined;
  /**
   * onsetDelay
   * @member {Number} onsetDelay
   */
  exports.prototype['onsetDelay'] = undefined;
  /**
   * Earliest measurement startTime that should be used in analysis. For instance, the date when you started tracking something.  Helpful in determining when to start 0 filling since we can assume the absence of a treatment measurement, for instance, indicates that the treatment was not applied rathter than simply not recorded.  Uses ISO string format
   * @member {String} experimentStartTime
   */
  exports.prototype['experimentStartTime'] = undefined;
  /**
   * Latest measurement startTime that should be used in analysis. For instance, the date when you stopped tracking something.  Helpful in determining when to stop 0 filling since we can assume the absence of a treatment measurement, for instance, indicates that the treatment was not applied rathter than simply not recorded.   Uses ISO string format
   * @member {String} experimentEndTime
   */
  exports.prototype['experimentEndTime'] = undefined;
  /**
   * User-defined display alias for variable name
   * @member {String} alias
   */
  exports.prototype['alias'] = undefined;



  return exports;
}));

