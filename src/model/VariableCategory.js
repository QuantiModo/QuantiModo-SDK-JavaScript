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
    root.Quantimodo.VariableCategory = factory(root.Quantimodo.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The VariableCategory model module.
   * @module model/VariableCategory
   * @version 5.8.112511
   */

  /**
   * Constructs a new <code>VariableCategory</code>.
   * @alias module:model/VariableCategory
   * @class
   * @param name {String} Category name
   */
  var exports = function(name) {
    var _this = this;


















    _this['name'] = name;











  };

  /**
   * Constructs a <code>VariableCategory</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/VariableCategory} obj Optional instance to populate.
   * @return {module:model/VariableCategory} The populated <code>VariableCategory</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('appType')) {
        obj['appType'] = ApiClient.convertToType(data['appType'], 'String');
      }
      if (data.hasOwnProperty('causeOnly')) {
        obj['causeOnly'] = ApiClient.convertToType(data['causeOnly'], 'Boolean');
      }
      if (data.hasOwnProperty('combinationOperation')) {
        obj['combinationOperation'] = ApiClient.convertToType(data['combinationOperation'], 'String');
      }
      if (data.hasOwnProperty('createdTime')) {
        obj['createdTime'] = ApiClient.convertToType(data['createdTime'], 'String');
      }
      if (data.hasOwnProperty('unitAbbreviatedName')) {
        obj['unitAbbreviatedName'] = ApiClient.convertToType(data['unitAbbreviatedName'], 'String');
      }
      if (data.hasOwnProperty('unitId')) {
        obj['unitId'] = ApiClient.convertToType(data['unitId'], 'Number');
      }
      if (data.hasOwnProperty('durationOfAction')) {
        obj['durationOfAction'] = ApiClient.convertToType(data['durationOfAction'], 'Number');
      }
      if (data.hasOwnProperty('fillingValue')) {
        obj['fillingValue'] = ApiClient.convertToType(data['fillingValue'], 'Number');
      }
      if (data.hasOwnProperty('helpText')) {
        obj['helpText'] = ApiClient.convertToType(data['helpText'], 'String');
      }
      if (data.hasOwnProperty('id')) {
        obj['id'] = ApiClient.convertToType(data['id'], 'Number');
      }
      if (data.hasOwnProperty('imageUrl')) {
        obj['imageUrl'] = ApiClient.convertToType(data['imageUrl'], 'String');
      }
      if (data.hasOwnProperty('ionIcon')) {
        obj['ionIcon'] = ApiClient.convertToType(data['ionIcon'], 'String');
      }
      if (data.hasOwnProperty('manualTracking')) {
        obj['manualTracking'] = ApiClient.convertToType(data['manualTracking'], 'Boolean');
      }
      if (data.hasOwnProperty('maximumAllowedValue')) {
        obj['maximumAllowedValue'] = ApiClient.convertToType(data['maximumAllowedValue'], 'String');
      }
      if (data.hasOwnProperty('measurementSynonymSingularLowercase')) {
        obj['measurementSynonymSingularLowercase'] = ApiClient.convertToType(data['measurementSynonymSingularLowercase'], 'String');
      }
      if (data.hasOwnProperty('minimumAllowedValue')) {
        obj['minimumAllowedValue'] = ApiClient.convertToType(data['minimumAllowedValue'], 'String');
      }
      if (data.hasOwnProperty('moreInfo')) {
        obj['moreInfo'] = ApiClient.convertToType(data['moreInfo'], 'String');
      }
      if (data.hasOwnProperty('name')) {
        obj['name'] = ApiClient.convertToType(data['name'], 'String');
      }
      if (data.hasOwnProperty('onsetDelay')) {
        obj['onsetDelay'] = ApiClient.convertToType(data['onsetDelay'], 'Number');
      }
      if (data.hasOwnProperty('outcome')) {
        obj['outcome'] = ApiClient.convertToType(data['outcome'], 'Boolean');
      }
      if (data.hasOwnProperty('pngPath')) {
        obj['pngPath'] = ApiClient.convertToType(data['pngPath'], 'String');
      }
      if (data.hasOwnProperty('pngUrl')) {
        obj['pngUrl'] = ApiClient.convertToType(data['pngUrl'], 'String');
      }
      if (data.hasOwnProperty('public')) {
        obj['public'] = ApiClient.convertToType(data['public'], 'Boolean');
      }
      if (data.hasOwnProperty('svgPath')) {
        obj['svgPath'] = ApiClient.convertToType(data['svgPath'], 'String');
      }
      if (data.hasOwnProperty('svgUrl')) {
        obj['svgUrl'] = ApiClient.convertToType(data['svgUrl'], 'String');
      }
      if (data.hasOwnProperty('updated')) {
        obj['updated'] = ApiClient.convertToType(data['updated'], 'Number');
      }
      if (data.hasOwnProperty('updatedTime')) {
        obj['updatedTime'] = ApiClient.convertToType(data['updatedTime'], 'String');
      }
      if (data.hasOwnProperty('variableCategoryName')) {
        obj['variableCategoryName'] = ApiClient.convertToType(data['variableCategoryName'], 'String');
      }
      if (data.hasOwnProperty('variableCategoryNameSingular')) {
        obj['variableCategoryNameSingular'] = ApiClient.convertToType(data['variableCategoryNameSingular'], 'String');
      }
    }
    return obj;
  }

  /**
   * Ex: mood
   * @member {String} appType
   */
  exports.prototype['appType'] = undefined;
  /**
   * Ex: false
   * @member {Boolean} causeOnly
   */
  exports.prototype['causeOnly'] = undefined;
  /**
   * Ex: MEAN
   * @member {String} combinationOperation
   */
  exports.prototype['combinationOperation'] = undefined;
  /**
   * UTC ISO 8601 YYYY-MM-DDThh:mm:ss
   * @member {String} createdTime
   */
  exports.prototype['createdTime'] = undefined;
  /**
   * Ex: /5
   * @member {String} unitAbbreviatedName
   */
  exports.prototype['unitAbbreviatedName'] = undefined;
  /**
   * Ex: 10
   * @member {Number} unitId
   */
  exports.prototype['unitId'] = undefined;
  /**
   * User-Defined Variable Setting: The amount of time over which a predictor/stimulus event can exert an observable influence on an outcome variable value. For instance, aspirin (stimulus/predictor) typically decreases headache severity for approximately four hours (duration of action) following the onset delay.  Unit: Seconds
   * @member {Number} durationOfAction
   */
  exports.prototype['durationOfAction'] = undefined;
  /**
   * Ex: -1. Unit: Variable category default unit.
   * @member {Number} fillingValue
   */
  exports.prototype['fillingValue'] = undefined;
  /**
   * Ex: What emotion do you want to rate?
   * @member {String} helpText
   */
  exports.prototype['helpText'] = undefined;
  /**
   * Ex: 1
   * @member {Number} id
   */
  exports.prototype['id'] = undefined;
  /**
   * Ex: https://maxcdn.icons8.com/Color/PNG/96/Cinema/theatre_mask-96.png
   * @member {String} imageUrl
   */
  exports.prototype['imageUrl'] = undefined;
  /**
   * Ex: ion-happy-outline
   * @member {String} ionIcon
   */
  exports.prototype['ionIcon'] = undefined;
  /**
   * Ex: true
   * @member {Boolean} manualTracking
   */
  exports.prototype['manualTracking'] = undefined;
  /**
   * Unit: Variable category default unit.
   * @member {String} maximumAllowedValue
   */
  exports.prototype['maximumAllowedValue'] = undefined;
  /**
   * Ex: rating
   * @member {String} measurementSynonymSingularLowercase
   */
  exports.prototype['measurementSynonymSingularLowercase'] = undefined;
  /**
   * Unit: Variable category default unit.
   * @member {String} minimumAllowedValue
   */
  exports.prototype['minimumAllowedValue'] = undefined;
  /**
   * Ex: Do you have any emotions that fluctuate regularly?  If so, add them so I can try to determine which factors are influencing them.
   * @member {String} moreInfo
   */
  exports.prototype['moreInfo'] = undefined;
  /**
   * Category name
   * @member {String} name
   */
  exports.prototype['name'] = undefined;
  /**
   * Ex: 0
   * @member {Number} onsetDelay
   */
  exports.prototype['onsetDelay'] = undefined;
  /**
   * Ex: true
   * @member {Boolean} outcome
   */
  exports.prototype['outcome'] = undefined;
  /**
   * Ex: img/variable_categories/emotions.png
   * @member {String} pngPath
   */
  exports.prototype['pngPath'] = undefined;
  /**
   * Ex: https://web.quantimo.do/img/variable_categories/emotions.png
   * @member {String} pngUrl
   */
  exports.prototype['pngUrl'] = undefined;
  /**
   * Ex: true
   * @member {Boolean} public
   */
  exports.prototype['public'] = undefined;
  /**
   * Ex: img/variable_categories/emotions.svg
   * @member {String} svgPath
   */
  exports.prototype['svgPath'] = undefined;
  /**
   * Ex: https://web.quantimo.do/img/variable_categories/emotions.svg
   * @member {String} svgUrl
   */
  exports.prototype['svgUrl'] = undefined;
  /**
   * Ex: 1
   * @member {Number} updated
   */
  exports.prototype['updated'] = undefined;
  /**
   * UTC ISO 8601 YYYY-MM-DDThh:mm:ss
   * @member {String} updatedTime
   */
  exports.prototype['updatedTime'] = undefined;
  /**
   * Ex: Emotions, Treatments, Symptoms...
   * @member {module:model/VariableCategory.VariableCategoryNameEnum} variableCategoryName
   */
  exports.prototype['variableCategoryName'] = undefined;
  /**
   * Ex: Emotion
   * @member {String} variableCategoryNameSingular
   */
  exports.prototype['variableCategoryNameSingular'] = undefined;


  /**
   * Allowed values for the <code>variableCategoryName</code> property.
   * @enum {String}
   * @readonly
   */
  exports.VariableCategoryNameEnum = {
    /**
     * value: "Activity"
     * @const
     */
    "Activity": "Activity",
    /**
     * value: "Books"
     * @const
     */
    "Books": "Books",
    /**
     * value: "Causes of Illness"
     * @const
     */
    "Causes of Illness": "Causes of Illness",
    /**
     * value: "Cognitive Performance"
     * @const
     */
    "Cognitive Performance": "Cognitive Performance",
    /**
     * value: "Conditions"
     * @const
     */
    "Conditions": "Conditions",
    /**
     * value: "Emotions"
     * @const
     */
    "Emotions": "Emotions",
    /**
     * value: "Environment"
     * @const
     */
    "Environment": "Environment",
    /**
     * value: "Foods"
     * @const
     */
    "Foods": "Foods",
    /**
     * value: "Goals"
     * @const
     */
    "Goals": "Goals",
    /**
     * value: "Locations"
     * @const
     */
    "Locations": "Locations",
    /**
     * value: "Miscellaneous"
     * @const
     */
    "Miscellaneous": "Miscellaneous",
    /**
     * value: "Movies and TV"
     * @const
     */
    "Movies and TV": "Movies and TV",
    /**
     * value: "Music"
     * @const
     */
    "Music": "Music",
    /**
     * value: "Nutrients"
     * @const
     */
    "Nutrients": "Nutrients",
    /**
     * value: "Payments"
     * @const
     */
    "Payments": "Payments",
    /**
     * value: "Physical Activities"
     * @const
     */
    "Physical Activities": "Physical Activities",
    /**
     * value: "Physique"
     * @const
     */
    "Physique": "Physique",
    /**
     * value: "Sleep"
     * @const
     */
    "Sleep": "Sleep",
    /**
     * value: "Social Interactions"
     * @const
     */
    "Social Interactions": "Social Interactions",
    /**
     * value: "Software"
     * @const
     */
    "Software": "Software",
    /**
     * value: "Symptoms"
     * @const
     */
    "Symptoms": "Symptoms",
    /**
     * value: "Treatments"
     * @const
     */
    "Treatments": "Treatments",
    /**
     * value: "Vital Signs"
     * @const
     */
    "Vital Signs": "Vital Signs"  };


  return exports;
}));


