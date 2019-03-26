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
    define(['ApiClient'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'));
  } else {
    // Browser globals (root is window)
    if (!root.Quantimodo) {
      root.Quantimodo = {};
    }
    root.Quantimodo.StudyCreationBody = factory(root.Quantimodo.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The StudyCreationBody model module.
   * @module model/StudyCreationBody
   * @version 5.8.112511
   */

  /**
   * Constructs a new <code>StudyCreationBody</code>.
   * @alias module:model/StudyCreationBody
   * @class
   * @param causeVariableName {String} Name of predictor variable
   * @param effectVariableName {String} Name of the outcome variable
   * @param type {module:model/StudyCreationBody.TypeEnum} Individual studies are based on data of a single user. Group studies are based on data from a specific group of individuals who have joined.  Global studies are based on aggregated and anonymously shared data from all users.
   */
  var exports = function(causeVariableName, effectVariableName, type) {
    var _this = this;

    _this['causeVariableName'] = causeVariableName;
    _this['effectVariableName'] = effectVariableName;

    _this['type'] = type;
  };

  /**
   * Constructs a <code>StudyCreationBody</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/StudyCreationBody} obj Optional instance to populate.
   * @return {module:model/StudyCreationBody} The populated <code>StudyCreationBody</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('causeVariableName')) {
        obj['causeVariableName'] = ApiClient.convertToType(data['causeVariableName'], 'String');
      }
      if (data.hasOwnProperty('effectVariableName')) {
        obj['effectVariableName'] = ApiClient.convertToType(data['effectVariableName'], 'String');
      }
      if (data.hasOwnProperty('studyTitle')) {
        obj['studyTitle'] = ApiClient.convertToType(data['studyTitle'], 'String');
      }
      if (data.hasOwnProperty('type')) {
        obj['type'] = ApiClient.convertToType(data['type'], 'String');
      }
    }
    return obj;
  }

  /**
   * Name of predictor variable
   * @member {String} causeVariableName
   */
  exports.prototype['causeVariableName'] = undefined;
  /**
   * Name of the outcome variable
   * @member {String} effectVariableName
   */
  exports.prototype['effectVariableName'] = undefined;
  /**
   * Title of your study (optional)
   * @member {String} studyTitle
   */
  exports.prototype['studyTitle'] = undefined;
  /**
   * Individual studies are based on data of a single user. Group studies are based on data from a specific group of individuals who have joined.  Global studies are based on aggregated and anonymously shared data from all users.
   * @member {module:model/StudyCreationBody.TypeEnum} type
   */
  exports.prototype['type'] = undefined;


  /**
   * Allowed values for the <code>type</code> property.
   * @enum {String}
   * @readonly
   */
  exports.TypeEnum = {
    /**
     * value: "individual"
     * @const
     */
    "individual": "individual",
    /**
     * value: "group"
     * @const
     */
    "group": "group",
    /**
     * value: "global"
     * @const
     */
    "global": "global"  };


  return exports;
}));


