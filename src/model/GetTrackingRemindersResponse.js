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
    define(['ApiClient', 'model/TrackingRemindersArray', 'model/Unit'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./TrackingRemindersArray'), require('./Unit'));
  } else {
    // Browser globals (root is window)
    if (!root.Quantimodo) {
      root.Quantimodo = {};
    }
    root.Quantimodo.GetTrackingRemindersResponse = factory(root.Quantimodo.ApiClient, root.Quantimodo.TrackingRemindersArray, root.Quantimodo.Unit);
  }
}(this, function(ApiClient, TrackingRemindersArray, Unit) {
  'use strict';




  /**
   * The GetTrackingRemindersResponse model module.
   * @module model/GetTrackingRemindersResponse
   * @version 5.8.824
   */

  /**
   * Constructs a new <code>GetTrackingRemindersResponse</code>.
   * @alias module:model/GetTrackingRemindersResponse
   * @class
   * @param status {Number} Status code
   * @param success {Boolean} 
   */
  var exports = function(status, success) {
    var _this = this;

    _this['status'] = status;

    _this['success'] = success;


































































  };

  /**
   * Constructs a <code>GetTrackingRemindersResponse</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/GetTrackingRemindersResponse} obj Optional instance to populate.
   * @return {module:model/GetTrackingRemindersResponse} The populated <code>GetTrackingRemindersResponse</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('status')) {
        obj['status'] = ApiClient.convertToType(data['status'], 'Number');
      }
      if (data.hasOwnProperty('message')) {
        obj['message'] = ApiClient.convertToType(data['message'], 'String');
      }
      if (data.hasOwnProperty('success')) {
        obj['success'] = ApiClient.convertToType(data['success'], 'Boolean');
      }
      if (data.hasOwnProperty('data')) {
        obj['data'] = TrackingRemindersArray.constructFromObject(data['data']);
      }
      if (data.hasOwnProperty('id')) {
        obj['id'] = ApiClient.convertToType(data['id'], 'Number');
      }
      if (data.hasOwnProperty('variableName')) {
        obj['variableName'] = ApiClient.convertToType(data['variableName'], 'String');
      }
      if (data.hasOwnProperty('reminderFrequency')) {
        obj['reminderFrequency'] = ApiClient.convertToType(data['reminderFrequency'], 'Number');
      }
      if (data.hasOwnProperty('clientId')) {
        obj['clientId'] = ApiClient.convertToType(data['clientId'], 'String');
      }
      if (data.hasOwnProperty('createdAt')) {
        obj['createdAt'] = ApiClient.convertToType(data['createdAt'], 'Date');
      }
      if (data.hasOwnProperty('defaultValue')) {
        obj['defaultValue'] = ApiClient.convertToType(data['defaultValue'], 'Number');
      }
      if (data.hasOwnProperty('trackingReminderId')) {
        obj['trackingReminderId'] = ApiClient.convertToType(data['trackingReminderId'], 'Number');
      }
      if (data.hasOwnProperty('trackingReminderImageUrl')) {
        obj['trackingReminderImageUrl'] = ApiClient.convertToType(data['trackingReminderImageUrl'], 'String');
      }
      if (data.hasOwnProperty('reminderStartTime')) {
        obj['reminderStartTime'] = ApiClient.convertToType(data['reminderStartTime'], 'Date');
      }
      if (data.hasOwnProperty('startTrackingDate')) {
        obj['startTrackingDate'] = ApiClient.convertToType(data['startTrackingDate'], 'String');
      }
      if (data.hasOwnProperty('stopTrackingDate')) {
        obj['stopTrackingDate'] = ApiClient.convertToType(data['stopTrackingDate'], 'String');
      }
      if (data.hasOwnProperty('updatedAt')) {
        obj['updatedAt'] = ApiClient.convertToType(data['updatedAt'], 'Date');
      }
      if (data.hasOwnProperty('userId')) {
        obj['userId'] = ApiClient.convertToType(data['userId'], 'Number');
      }
      if (data.hasOwnProperty('variableId')) {
        obj['variableId'] = ApiClient.convertToType(data['variableId'], 'Number');
      }
      if (data.hasOwnProperty('combinationOperation')) {
        obj['combinationOperation'] = ApiClient.convertToType(data['combinationOperation'], 'String');
      }
      if (data.hasOwnProperty('defaultUnitId')) {
        obj['defaultUnitId'] = ApiClient.convertToType(data['defaultUnitId'], 'Number');
      }
      if (data.hasOwnProperty('ionIcon')) {
        obj['ionIcon'] = ApiClient.convertToType(data['ionIcon'], 'String');
      }
      if (data.hasOwnProperty('variableCategoryId')) {
        obj['variableCategoryId'] = ApiClient.convertToType(data['variableCategoryId'], 'Number');
      }
      if (data.hasOwnProperty('lastValue')) {
        obj['lastValue'] = ApiClient.convertToType(data['lastValue'], 'Number');
      }
      if (data.hasOwnProperty('secondToLastValue')) {
        obj['secondToLastValue'] = ApiClient.convertToType(data['secondToLastValue'], 'Number');
      }
      if (data.hasOwnProperty('thirdToLastValue')) {
        obj['thirdToLastValue'] = ApiClient.convertToType(data['thirdToLastValue'], 'Number');
      }
      if (data.hasOwnProperty('userVariableDefaultUnitId')) {
        obj['userVariableDefaultUnitId'] = ApiClient.convertToType(data['userVariableDefaultUnitId'], 'Number');
      }
      if (data.hasOwnProperty('userVariableVariableCategoryId')) {
        obj['userVariableVariableCategoryId'] = ApiClient.convertToType(data['userVariableVariableCategoryId'], 'Number');
      }
      if (data.hasOwnProperty('numberOfRawMeasurements')) {
        obj['numberOfRawMeasurements'] = ApiClient.convertToType(data['numberOfRawMeasurements'], 'Number');
      }
      if (data.hasOwnProperty('variableCategoryName')) {
        obj['variableCategoryName'] = ApiClient.convertToType(data['variableCategoryName'], 'String');
      }
      if (data.hasOwnProperty('svgUrl')) {
        obj['svgUrl'] = ApiClient.convertToType(data['svgUrl'], 'String');
      }
      if (data.hasOwnProperty('pngUrl')) {
        obj['pngUrl'] = ApiClient.convertToType(data['pngUrl'], 'String');
      }
      if (data.hasOwnProperty('pngPath')) {
        obj['pngPath'] = ApiClient.convertToType(data['pngPath'], 'String');
      }
      if (data.hasOwnProperty('variableCategoryImageUrl')) {
        obj['variableCategoryImageUrl'] = ApiClient.convertToType(data['variableCategoryImageUrl'], 'String');
      }
      if (data.hasOwnProperty('fillingValue')) {
        obj['fillingValue'] = ApiClient.convertToType(data['fillingValue'], 'Number');
      }
      if (data.hasOwnProperty('manualTracking')) {
        obj['manualTracking'] = ApiClient.convertToType(data['manualTracking'], 'Boolean');
      }
      if (data.hasOwnProperty('userVariableVariableCategoryName')) {
        obj['userVariableVariableCategoryName'] = ApiClient.convertToType(data['userVariableVariableCategoryName'], 'String');
      }
      if (data.hasOwnProperty('imageUrl')) {
        obj['imageUrl'] = ApiClient.convertToType(data['imageUrl'], 'String');
      }
      if (data.hasOwnProperty('reminderStartTimeLocal')) {
        obj['reminderStartTimeLocal'] = ApiClient.convertToType(data['reminderStartTimeLocal'], 'Date');
      }
      if (data.hasOwnProperty('reminderStartTimeLocalHumanFormatted')) {
        obj['reminderStartTimeLocalHumanFormatted'] = ApiClient.convertToType(data['reminderStartTimeLocalHumanFormatted'], 'Date');
      }
      if (data.hasOwnProperty('lastValueInUserVariableDefaultUnit')) {
        obj['lastValueInUserVariableDefaultUnit'] = ApiClient.convertToType(data['lastValueInUserVariableDefaultUnit'], 'Number');
      }
      if (data.hasOwnProperty('secondToLastValueInUserVariableDefaultUnit')) {
        obj['secondToLastValueInUserVariableDefaultUnit'] = ApiClient.convertToType(data['secondToLastValueInUserVariableDefaultUnit'], 'Number');
      }
      if (data.hasOwnProperty('thirdToLastValueInUserVariableDefaultUnit')) {
        obj['thirdToLastValueInUserVariableDefaultUnit'] = ApiClient.convertToType(data['thirdToLastValueInUserVariableDefaultUnit'], 'Number');
      }
      if (data.hasOwnProperty('unitId')) {
        obj['unitId'] = ApiClient.convertToType(data['unitId'], 'Number');
      }
      if (data.hasOwnProperty('unitName')) {
        obj['unitName'] = ApiClient.convertToType(data['unitName'], 'String');
      }
      if (data.hasOwnProperty('unitAbbreviatedName')) {
        obj['unitAbbreviatedName'] = ApiClient.convertToType(data['unitAbbreviatedName'], 'String');
      }
      if (data.hasOwnProperty('unitCategoryId')) {
        obj['unitCategoryId'] = ApiClient.convertToType(data['unitCategoryId'], 'Number');
      }
      if (data.hasOwnProperty('unitCategoryName')) {
        obj['unitCategoryName'] = ApiClient.convertToType(data['unitCategoryName'], 'String');
      }
      if (data.hasOwnProperty('defaultUnitName')) {
        obj['defaultUnitName'] = ApiClient.convertToType(data['defaultUnitName'], 'String');
      }
      if (data.hasOwnProperty('defaultUnitAbbreviatedName')) {
        obj['defaultUnitAbbreviatedName'] = ApiClient.convertToType(data['defaultUnitAbbreviatedName'], 'String');
      }
      if (data.hasOwnProperty('defaultUnitCategoryId')) {
        obj['defaultUnitCategoryId'] = ApiClient.convertToType(data['defaultUnitCategoryId'], 'Number');
      }
      if (data.hasOwnProperty('defaultUnitCategoryName')) {
        obj['defaultUnitCategoryName'] = ApiClient.convertToType(data['defaultUnitCategoryName'], 'String');
      }
      if (data.hasOwnProperty('availableDefaultUnits')) {
        obj['availableDefaultUnits'] = ApiClient.convertToType(data['availableDefaultUnits'], [Unit]);
      }
      if (data.hasOwnProperty('userVariableDefaultUnitName')) {
        obj['userVariableDefaultUnitName'] = ApiClient.convertToType(data['userVariableDefaultUnitName'], 'String');
      }
      if (data.hasOwnProperty('userVariableDefaultUnitAbbreviatedName')) {
        obj['userVariableDefaultUnitAbbreviatedName'] = ApiClient.convertToType(data['userVariableDefaultUnitAbbreviatedName'], 'String');
      }
      if (data.hasOwnProperty('userVariableDefaultUnitCategoryId')) {
        obj['userVariableDefaultUnitCategoryId'] = ApiClient.convertToType(data['userVariableDefaultUnitCategoryId'], 'Number');
      }
      if (data.hasOwnProperty('userVariableDefaultUnitCategoryName')) {
        obj['userVariableDefaultUnitCategoryName'] = ApiClient.convertToType(data['userVariableDefaultUnitCategoryName'], 'String');
      }
      if (data.hasOwnProperty('minimumAllowedValue')) {
        obj['minimumAllowedValue'] = ApiClient.convertToType(data['minimumAllowedValue'], 'Number');
      }
      if (data.hasOwnProperty('inputType')) {
        obj['inputType'] = ApiClient.convertToType(data['inputType'], 'String');
      }
      if (data.hasOwnProperty('localDailyReminderNotificationTimes')) {
        obj['localDailyReminderNotificationTimes'] = ApiClient.convertToType(data['localDailyReminderNotificationTimes'], ['String']);
      }
      if (data.hasOwnProperty('localDailyReminderNotificationTimesForAllReminders')) {
        obj['localDailyReminderNotificationTimesForAllReminders'] = ApiClient.convertToType(data['localDailyReminderNotificationTimesForAllReminders'], ['String']);
      }
      if (data.hasOwnProperty('reminderStartEpochSeconds')) {
        obj['reminderStartEpochSeconds'] = ApiClient.convertToType(data['reminderStartEpochSeconds'], 'Number');
      }
      if (data.hasOwnProperty('nextReminderTimeEpochSeconds')) {
        obj['nextReminderTimeEpochSeconds'] = ApiClient.convertToType(data['nextReminderTimeEpochSeconds'], 'Number');
      }
      if (data.hasOwnProperty('firstDailyReminderTime')) {
        obj['firstDailyReminderTime'] = ApiClient.convertToType(data['firstDailyReminderTime'], 'Date');
      }
      if (data.hasOwnProperty('secondDailyReminderTime')) {
        obj['secondDailyReminderTime'] = ApiClient.convertToType(data['secondDailyReminderTime'], 'Date');
      }
      if (data.hasOwnProperty('frequencyTextDescription')) {
        obj['frequencyTextDescription'] = ApiClient.convertToType(data['frequencyTextDescription'], 'String');
      }
      if (data.hasOwnProperty('frequencyTextDescriptionWithTime')) {
        obj['frequencyTextDescriptionWithTime'] = ApiClient.convertToType(data['frequencyTextDescriptionWithTime'], 'Date');
      }
      if (data.hasOwnProperty('valueAndFrequencyTextDescription')) {
        obj['valueAndFrequencyTextDescription'] = ApiClient.convertToType(data['valueAndFrequencyTextDescription'], 'String');
      }
      if (data.hasOwnProperty('valueAndFrequencyTextDescriptionWithTime')) {
        obj['valueAndFrequencyTextDescriptionWithTime'] = ApiClient.convertToType(data['valueAndFrequencyTextDescriptionWithTime'], 'Date');
      }
      if (data.hasOwnProperty('repeating')) {
        obj['repeating'] = ApiClient.convertToType(data['repeating'], 'Boolean');
      }
    }
    return obj;
  }

  /**
   * Status code
   * @member {Number} status
   */
  exports.prototype['status'] = undefined;
  /**
   * Message
   * @member {String} message
   */
  exports.prototype['message'] = undefined;
  /**
   * @member {Boolean} success
   */
  exports.prototype['success'] = undefined;
  /**
   * @member {module:model/TrackingRemindersArray} data
   */
  exports.prototype['data'] = undefined;
  /**
   * Example: 30376
   * @member {Number} id
   */
  exports.prototype['id'] = undefined;
  /**
   * Example: Acetyl L-Carnitine By MRM
   * @member {String} variableName
   */
  exports.prototype['variableName'] = undefined;
  /**
   * Example: 86400
   * @member {Number} reminderFrequency
   */
  exports.prototype['reminderFrequency'] = undefined;
  /**
   * Example: ionic
   * @member {String} clientId
   */
  exports.prototype['clientId'] = undefined;
  /**
   * Example: 2016-12-25 10:28:42
   * @member {Date} createdAt
   */
  exports.prototype['createdAt'] = undefined;
  /**
   * Example: 500
   * @member {Number} defaultValue
   */
  exports.prototype['defaultValue'] = undefined;
  /**
   * Example: 30376
   * @member {Number} trackingReminderId
   */
  exports.prototype['trackingReminderId'] = undefined;
  /**
   * Example: https://rximage.nlm.nih.gov/image/images/gallery/original/55111-0129-60_RXNAVIMAGE10_B051D81E.jpg
   * @member {String} trackingReminderImageUrl
   */
  exports.prototype['trackingReminderImageUrl'] = undefined;
  /**
   * Example: 14:00:00
   * @member {Date} reminderStartTime
   */
  exports.prototype['reminderStartTime'] = undefined;
  /**
   * Example: 2016-12-16
   * @member {String} startTrackingDate
   */
  exports.prototype['startTrackingDate'] = undefined;
  /**
   * Example: 2017-02-02
   * @member {String} stopTrackingDate
   */
  exports.prototype['stopTrackingDate'] = undefined;
  /**
   * Example: 2017-08-09 19:38:05
   * @member {Date} updatedAt
   */
  exports.prototype['updatedAt'] = undefined;
  /**
   * Example: 230
   * @member {Number} userId
   */
  exports.prototype['userId'] = undefined;
  /**
   * Example: 5627291
   * @member {Number} variableId
   */
  exports.prototype['variableId'] = undefined;
  /**
   * Example: MEAN
   * @member {String} combinationOperation
   */
  exports.prototype['combinationOperation'] = undefined;
  /**
   * Example: 7
   * @member {Number} defaultUnitId
   */
  exports.prototype['defaultUnitId'] = undefined;
  /**
   * Example: ion-ios-medkit-outline
   * @member {String} ionIcon
   */
  exports.prototype['ionIcon'] = undefined;
  /**
   * Example: 13
   * @member {Number} variableCategoryId
   */
  exports.prototype['variableCategoryId'] = undefined;
  /**
   * Example: 500
   * @member {Number} lastValue
   */
  exports.prototype['lastValue'] = undefined;
  /**
   * Example: 250
   * @member {Number} secondToLastValue
   */
  exports.prototype['secondToLastValue'] = undefined;
  /**
   * Example: 250
   * @member {Number} thirdToLastValue
   */
  exports.prototype['thirdToLastValue'] = undefined;
  /**
   * Example: 7
   * @member {Number} userVariableDefaultUnitId
   */
  exports.prototype['userVariableDefaultUnitId'] = undefined;
  /**
   * Example: 13
   * @member {Number} userVariableVariableCategoryId
   */
  exports.prototype['userVariableVariableCategoryId'] = undefined;
  /**
   * Example: 791
   * @member {Number} numberOfRawMeasurements
   */
  exports.prototype['numberOfRawMeasurements'] = undefined;
  /**
   * Example: Treatments
   * @member {String} variableCategoryName
   */
  exports.prototype['variableCategoryName'] = undefined;
  /**
   * Example: https://app.quantimo.do/ionic/Modo/www/img/variable_categories/treatments.svg
   * @member {String} svgUrl
   */
  exports.prototype['svgUrl'] = undefined;
  /**
   * Example: https://app.quantimo.do/ionic/Modo/www/img/variable_categories/treatments.png
   * @member {String} pngUrl
   */
  exports.prototype['pngUrl'] = undefined;
  /**
   * Example: img/variable_categories/treatments.png
   * @member {String} pngPath
   */
  exports.prototype['pngPath'] = undefined;
  /**
   * Example: https://maxcdn.icons8.com/Color/PNG/96/Healthcare/pill-96.png
   * @member {String} variableCategoryImageUrl
   */
  exports.prototype['variableCategoryImageUrl'] = undefined;
  /**
   * Example: 0
   * @member {Number} fillingValue
   */
  exports.prototype['fillingValue'] = undefined;
  /**
   * Example: true
   * @member {Boolean} manualTracking
   */
  exports.prototype['manualTracking'] = undefined;
  /**
   * Example: Treatments
   * @member {String} userVariableVariableCategoryName
   */
  exports.prototype['userVariableVariableCategoryName'] = undefined;
  /**
   * Example: https://rximage.nlm.nih.gov/image/images/gallery/original/55111-0129-60_RXNAVIMAGE10_B051D81E.jpg
   * @member {String} imageUrl
   */
  exports.prototype['imageUrl'] = undefined;
  /**
   * Example: 09:00:00
   * @member {Date} reminderStartTimeLocal
   */
  exports.prototype['reminderStartTimeLocal'] = undefined;
  /**
   * Example: 09:00 AM
   * @member {Date} reminderStartTimeLocalHumanFormatted
   */
  exports.prototype['reminderStartTimeLocalHumanFormatted'] = undefined;
  /**
   * Example: 500
   * @member {Number} lastValueInUserVariableDefaultUnit
   */
  exports.prototype['lastValueInUserVariableDefaultUnit'] = undefined;
  /**
   * Example: 250
   * @member {Number} secondToLastValueInUserVariableDefaultUnit
   */
  exports.prototype['secondToLastValueInUserVariableDefaultUnit'] = undefined;
  /**
   * Example: 250
   * @member {Number} thirdToLastValueInUserVariableDefaultUnit
   */
  exports.prototype['thirdToLastValueInUserVariableDefaultUnit'] = undefined;
  /**
   * Example: 7
   * @member {Number} unitId
   */
  exports.prototype['unitId'] = undefined;
  /**
   * Example: Milligrams
   * @member {String} unitName
   */
  exports.prototype['unitName'] = undefined;
  /**
   * Example: mg
   * @member {String} unitAbbreviatedName
   */
  exports.prototype['unitAbbreviatedName'] = undefined;
  /**
   * Example: 3
   * @member {Number} unitCategoryId
   */
  exports.prototype['unitCategoryId'] = undefined;
  /**
   * Example: Weight
   * @member {String} unitCategoryName
   */
  exports.prototype['unitCategoryName'] = undefined;
  /**
   * Example: Milligrams
   * @member {String} defaultUnitName
   */
  exports.prototype['defaultUnitName'] = undefined;
  /**
   * Example: mg
   * @member {String} defaultUnitAbbreviatedName
   */
  exports.prototype['defaultUnitAbbreviatedName'] = undefined;
  /**
   * Example: 3
   * @member {Number} defaultUnitCategoryId
   */
  exports.prototype['defaultUnitCategoryId'] = undefined;
  /**
   * Example: Weight
   * @member {String} defaultUnitCategoryName
   */
  exports.prototype['defaultUnitCategoryName'] = undefined;
  /**
   * @member {Array.<module:model/Unit>} availableDefaultUnits
   */
  exports.prototype['availableDefaultUnits'] = undefined;
  /**
   * Example: Milligrams
   * @member {String} userVariableDefaultUnitName
   */
  exports.prototype['userVariableDefaultUnitName'] = undefined;
  /**
   * Example: mg
   * @member {String} userVariableDefaultUnitAbbreviatedName
   */
  exports.prototype['userVariableDefaultUnitAbbreviatedName'] = undefined;
  /**
   * Example: 3
   * @member {Number} userVariableDefaultUnitCategoryId
   */
  exports.prototype['userVariableDefaultUnitCategoryId'] = undefined;
  /**
   * Example: Weight
   * @member {String} userVariableDefaultUnitCategoryName
   */
  exports.prototype['userVariableDefaultUnitCategoryName'] = undefined;
  /**
   * Example: 0
   * @member {Number} minimumAllowedValue
   */
  exports.prototype['minimumAllowedValue'] = undefined;
  /**
   * Example: value
   * @member {String} inputType
   */
  exports.prototype['inputType'] = undefined;
  /**
   * @member {Array.<String>} localDailyReminderNotificationTimes
   */
  exports.prototype['localDailyReminderNotificationTimes'] = undefined;
  /**
   * @member {Array.<String>} localDailyReminderNotificationTimesForAllReminders
   */
  exports.prototype['localDailyReminderNotificationTimesForAllReminders'] = undefined;
  /**
   * Example: 1481896800
   * @member {Number} reminderStartEpochSeconds
   */
  exports.prototype['reminderStartEpochSeconds'] = undefined;
  /**
   * Example: 1502373600
   * @member {Number} nextReminderTimeEpochSeconds
   */
  exports.prototype['nextReminderTimeEpochSeconds'] = undefined;
  /**
   * Example: 12:00:00
   * @member {Date} firstDailyReminderTime
   */
  exports.prototype['firstDailyReminderTime'] = undefined;
  /**
   * Example: 14:00:00
   * @member {Date} secondDailyReminderTime
   */
  exports.prototype['secondDailyReminderTime'] = undefined;
  /**
   * Example: Daily (ended 2017-02-02)
   * @member {String} frequencyTextDescription
   */
  exports.prototype['frequencyTextDescription'] = undefined;
  /**
   * Example: Daily at 09:00 AM (ended 2017-02-02)
   * @member {Date} frequencyTextDescriptionWithTime
   */
  exports.prototype['frequencyTextDescriptionWithTime'] = undefined;
  /**
   * Example: 500 mg daily (ended 2017-02-02)
   * @member {String} valueAndFrequencyTextDescription
   */
  exports.prototype['valueAndFrequencyTextDescription'] = undefined;
  /**
   * Example: 500 mg daily at 09:00 AM (ended 2017-02-02)
   * @member {Date} valueAndFrequencyTextDescriptionWithTime
   */
  exports.prototype['valueAndFrequencyTextDescriptionWithTime'] = undefined;
  /**
   * Example: true
   * @member {Boolean} repeating
   */
  exports.prototype['repeating'] = undefined;



  return exports;
}));


