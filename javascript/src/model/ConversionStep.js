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
    if (!root.quantimodo-api) {
      root.quantimodo-api = {};
    }
    root.quantimodo-api.ConversionStep = factory(root.quantimodo-api.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The ConversionStep model module.
   * @module model/ConversionStep
   * @version 5.8.5
   */

  /**
   * Constructs a new <code>ConversionStep</code>.
   * @alias module:model/ConversionStep
   * @class
   * @param operation {module:model/ConversionStep.OperationEnum} ADD or MULTIPLY
   * @param value {Number} This specifies the order of conversion steps starting with 0
   */
  var exports = function(operation, value) {
    var _this = this;

    _this['operation'] = operation;
    _this['value'] = value;
  };

  /**
   * Constructs a <code>ConversionStep</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ConversionStep} obj Optional instance to populate.
   * @return {module:model/ConversionStep} The populated <code>ConversionStep</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('operation')) {
        obj['operation'] = ApiClient.convertToType(data['operation'], 'String');
      }
      if (data.hasOwnProperty('value')) {
        obj['value'] = ApiClient.convertToType(data['value'], 'Number');
      }
    }
    return obj;
  }

  /**
   * ADD or MULTIPLY
   * @member {module:model/ConversionStep.OperationEnum} operation
   */
  exports.prototype['operation'] = undefined;
  /**
   * This specifies the order of conversion steps starting with 0
   * @member {Number} value
   */
  exports.prototype['value'] = undefined;


  /**
   * Allowed values for the <code>operation</code> property.
   * @enum {String}
   * @readonly
   */
  exports.OperationEnum = {
    /**
     * value: "MULTIPLY"
     * @const
     */
    "MULTIPLY": "MULTIPLY",
    /**
     * value: "ADD"
     * @const
     */
    "ADD": "ADD"  };


  return exports;
}));


