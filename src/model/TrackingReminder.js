/**
 * quantimodo
 * We make it easy to retrieve and analyze normalized user data from a wide array of devices and applications. Check out our [docs and sdk's](https://github.com/QuantiModo/docs) or [contact us](https://help.quantimo.do).
 *
 * OpenAPI spec version: 5.8.112511
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
    define(['ApiClient', 'model/TrackingReminderNotificationAction', 'model/Unit'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./TrackingReminderNotificationAction'), require('./Unit'));
  } else {
    // Browser globals (root is window)
    if (!root.Quantimodo) {
      root.Quantimodo = {};
    }
    root.Quantimodo.TrackingReminder = factory(root.Quantimodo.ApiClient, root.Quantimodo.TrackingReminderNotificationAction, root.Quantimodo.Unit);
  }
}(this, function(ApiClient, TrackingReminderNotificationAction, Unit) {
  'use strict';




  /**
   * The TrackingReminder model module.
   * @module model/TrackingReminder
   * @version 5.8.112511
   */

  /**
   * Constructs a new <code>TrackingReminder</code>.
   * @alias module:model/TrackingReminder
   * @class
   * @param unitAbbreviatedName {String} Example: /5
   * @param reminderFrequency {Number} Number of seconds between one reminder and the next
   * @param variableCategoryName {String} Name of the variable category to be used when sending measurements
   * @param variableName {String} Name of the variable to be used when sending measurements
   */
  var exports = function(unitAbbreviatedName, reminderFrequency, variableCategoryName, variableName) {
    var _this = this;






    _this['unitAbbreviatedName'] = unitAbbreviatedName;

































    _this['reminderFrequency'] = reminderFrequency;































    _this['variableCategoryName'] = variableCategoryName;


    _this['variableName'] = variableName;
  };

  /**
   * Constructs a <code>TrackingReminder</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/TrackingReminder} obj Optional instance to populate.
   * @return {module:model/TrackingReminder} The populated <code>TrackingReminder</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('actionArray')) {
        obj['actionArray'] = ApiClient.convertToType(data['actionArray'], [TrackingReminderNotificationAction]);
      }
      if (data.hasOwnProperty('availableUnits')) {
        obj['availableUnits'] = ApiClient.convertToType(data['availableUnits'], [Unit]);
      }
      if (data.hasOwnProperty('clientId')) {
        obj['clientId'] = ApiClient.convertToType(data['clientId'], 'String');
      }
      if (data.hasOwnProperty('combinationOperation')) {
        obj['combinationOperation'] = ApiClient.convertToType(data['combinationOperation'], 'String');
      }
      if (data.hasOwnProperty('createdAt')) {
        obj['createdAt'] = ApiClient.convertToType(data['createdAt'], 'Date');
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
      if (data.hasOwnProperty('unitId')) {
        obj['unitId'] = ApiClient.convertToType(data['unitId'], 'Number');
      }
      if (data.hasOwnProperty('unitName')) {
        obj['unitName'] = ApiClient.convertToType(data['unitName'], 'String');
      }
      if (data.hasOwnProperty('defaultValue')) {
        obj['defaultValue'] = ApiClient.convertToType(data['defaultValue'], 'Number');
      }
      if (data.hasOwnProperty('email')) {
        obj['email'] = ApiClient.convertToType(data['email'], 'Boolean');
      }
      if (data.hasOwnProperty('errorMessage')) {
        obj['errorMessage'] = ApiClient.convertToType(data['errorMessage'], 'String');
      }
      if (data.hasOwnProperty('fillingValue')) {
        obj['fillingValue'] = ApiClient.convertToType(data['fillingValue'], 'Number');
      }
      if (data.hasOwnProperty('firstDailyReminderTime')) {
        obj['firstDailyReminderTime'] = ApiClient.convertToType(data['firstDailyReminderTime'], 'Date');
      }
      if (data.hasOwnProperty('frequencyTextDescription')) {
        obj['frequencyTextDescription'] = ApiClient.convertToType(data['frequencyTextDescription'], 'String');
      }
      if (data.hasOwnProperty('frequencyTextDescriptionWithTime')) {
        obj['frequencyTextDescriptionWithTime'] = ApiClient.convertToType(data['frequencyTextDescriptionWithTime'], 'String');
      }
      if (data.hasOwnProperty('id')) {
        obj['id'] = ApiClient.convertToType(data['id'], 'Number');
      }
      if (data.hasOwnProperty('inputType')) {
        obj['inputType'] = ApiClient.convertToType(data['inputType'], 'String');
      }
      if (data.hasOwnProperty('instructions')) {
        obj['instructions'] = ApiClient.convertToType(data['instructions'], 'String');
      }
      if (data.hasOwnProperty('ionIcon')) {
        obj['ionIcon'] = ApiClient.convertToType(data['ionIcon'], 'String');
      }
      if (data.hasOwnProperty('lastTracked')) {
        obj['lastTracked'] = ApiClient.convertToType(data['lastTracked'], 'Date');
      }
      if (data.hasOwnProperty('lastValue')) {
        obj['lastValue'] = ApiClient.convertToType(data['lastValue'], 'Number');
      }
      if (data.hasOwnProperty('latestTrackingReminderNotificationReminderTime')) {
        obj['latestTrackingReminderNotificationReminderTime'] = ApiClient.convertToType(data['latestTrackingReminderNotificationReminderTime'], 'Date');
      }
      if (data.hasOwnProperty('localDailyReminderNotificationTimes')) {
        obj['localDailyReminderNotificationTimes'] = ApiClient.convertToType(data['localDailyReminderNotificationTimes'], ['String']);
      }
      if (data.hasOwnProperty('localDailyReminderNotificationTimesForAllReminders')) {
        obj['localDailyReminderNotificationTimesForAllReminders'] = ApiClient.convertToType(data['localDailyReminderNotificationTimesForAllReminders'], ['String']);
      }
      if (data.hasOwnProperty('manualTracking')) {
        obj['manualTracking'] = ApiClient.convertToType(data['manualTracking'], 'Boolean');
      }
      if (data.hasOwnProperty('maximumAllowedValue')) {
        obj['maximumAllowedValue'] = ApiClient.convertToType(data['maximumAllowedValue'], 'Number');
      }
      if (data.hasOwnProperty('minimumAllowedValue')) {
        obj['minimumAllowedValue'] = ApiClient.convertToType(data['minimumAllowedValue'], 'Number');
      }
      if (data.hasOwnProperty('nextReminderTimeEpochSeconds')) {
        obj['nextReminderTimeEpochSeconds'] = ApiClient.convertToType(data['nextReminderTimeEpochSeconds'], 'Number');
      }
      if (data.hasOwnProperty('notificationBar')) {
        obj['notificationBar'] = ApiClient.convertToType(data['notificationBar'], 'Boolean');
      }
      if (data.hasOwnProperty('numberOfRawMeasurements')) {
        obj['numberOfRawMeasurements'] = ApiClient.convertToType(data['numberOfRawMeasurements'], 'Number');
      }
      if (data.hasOwnProperty('numberOfUniqueValues')) {
        obj['numberOfUniqueValues'] = ApiClient.convertToType(data['numberOfUniqueValues'], 'Number');
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
      if (data.hasOwnProperty('popUp')) {
        obj['popUp'] = ApiClient.convertToType(data['popUp'], 'Boolean');
      }
      if (data.hasOwnProperty('question')) {
        obj['question'] = ApiClient.convertToType(data['question'], 'String');
      }
      if (data.hasOwnProperty('reminderEndTime')) {
        obj['reminderEndTime'] = ApiClient.convertToType(data['reminderEndTime'], 'String');
      }
      if (data.hasOwnProperty('reminderFrequency')) {
        obj['reminderFrequency'] = ApiClient.convertToType(data['reminderFrequency'], 'Number');
      }
      if (data.hasOwnProperty('reminderSound')) {
        obj['reminderSound'] = ApiClient.convertToType(data['reminderSound'], 'String');
      }
      if (data.hasOwnProperty('reminderStartEpochSeconds')) {
        obj['reminderStartEpochSeconds'] = ApiClient.convertToType(data['reminderStartEpochSeconds'], 'Number');
      }
      if (data.hasOwnProperty('reminderStartTime')) {
        obj['reminderStartTime'] = ApiClient.convertToType(data['reminderStartTime'], 'String');
      }
      if (data.hasOwnProperty('reminderStartTimeLocal')) {
        obj['reminderStartTimeLocal'] = ApiClient.convertToType(data['reminderStartTimeLocal'], 'Date');
      }
      if (data.hasOwnProperty('reminderStartTimeLocalHumanFormatted')) {
        obj['reminderStartTimeLocalHumanFormatted'] = ApiClient.convertToType(data['reminderStartTimeLocalHumanFormatted'], 'Date');
      }
      if (data.hasOwnProperty('repeating')) {
        obj['repeating'] = ApiClient.convertToType(data['repeating'], 'Boolean');
      }
      if (data.hasOwnProperty('secondDailyReminderTime')) {
        obj['secondDailyReminderTime'] = ApiClient.convertToType(data['secondDailyReminderTime'], 'Date');
      }
      if (data.hasOwnProperty('secondToLastValue')) {
        obj['secondToLastValue'] = ApiClient.convertToType(data['secondToLastValue'], 'Number');
      }
      if (data.hasOwnProperty('sms')) {
        obj['sms'] = ApiClient.convertToType(data['sms'], 'Boolean');
      }
      if (data.hasOwnProperty('startTrackingDate')) {
        obj['startTrackingDate'] = ApiClient.convertToType(data['startTrackingDate'], 'String');
      }
      if (data.hasOwnProperty('stopTrackingDate')) {
        obj['stopTrackingDate'] = ApiClient.convertToType(data['stopTrackingDate'], 'String');
      }
      if (data.hasOwnProperty('svgUrl')) {
        obj['svgUrl'] = ApiClient.convertToType(data['svgUrl'], 'String');
      }
      if (data.hasOwnProperty('thirdDailyReminderTime')) {
        obj['thirdDailyReminderTime'] = ApiClient.convertToType(data['thirdDailyReminderTime'], 'Date');
      }
      if (data.hasOwnProperty('thirdToLastValue')) {
        obj['thirdToLastValue'] = ApiClient.convertToType(data['thirdToLastValue'], 'Number');
      }
      if (data.hasOwnProperty('trackingReminderId')) {
        obj['trackingReminderId'] = ApiClient.convertToType(data['trackingReminderId'], 'Number');
      }
      if (data.hasOwnProperty('trackingReminderImageUrl')) {
        obj['trackingReminderImageUrl'] = ApiClient.convertToType(data['trackingReminderImageUrl'], 'String');
      }
      if (data.hasOwnProperty('upc')) {
        obj['upc'] = ApiClient.convertToType(data['upc'], 'String');
      }
      if (data.hasOwnProperty('updatedAt')) {
        obj['updatedAt'] = ApiClient.convertToType(data['updatedAt'], 'Date');
      }
      if (data.hasOwnProperty('userId')) {
        obj['userId'] = ApiClient.convertToType(data['userId'], 'Number');
      }
      if (data.hasOwnProperty('userVariableUnitAbbreviatedName')) {
        obj['userVariableUnitAbbreviatedName'] = ApiClient.convertToType(data['userVariableUnitAbbreviatedName'], 'String');
      }
      if (data.hasOwnProperty('userVariableUnitCategoryId')) {
        obj['userVariableUnitCategoryId'] = ApiClient.convertToType(data['userVariableUnitCategoryId'], 'Number');
      }
      if (data.hasOwnProperty('userVariableUnitCategoryName')) {
        obj['userVariableUnitCategoryName'] = ApiClient.convertToType(data['userVariableUnitCategoryName'], 'String');
      }
      if (data.hasOwnProperty('userVariableUnitId')) {
        obj['userVariableUnitId'] = ApiClient.convertToType(data['userVariableUnitId'], 'Number');
      }
      if (data.hasOwnProperty('userVariableUnitName')) {
        obj['userVariableUnitName'] = ApiClient.convertToType(data['userVariableUnitName'], 'String');
      }
      if (data.hasOwnProperty('userVariableVariableCategoryId')) {
        obj['userVariableVariableCategoryId'] = ApiClient.convertToType(data['userVariableVariableCategoryId'], 'Number');
      }
      if (data.hasOwnProperty('userVariableVariableCategoryName')) {
        obj['userVariableVariableCategoryName'] = ApiClient.convertToType(data['userVariableVariableCategoryName'], 'String');
      }
      if (data.hasOwnProperty('valence')) {
        obj['valence'] = ApiClient.convertToType(data['valence'], 'String');
      }
      if (data.hasOwnProperty('valueAndFrequencyTextDescription')) {
        obj['valueAndFrequencyTextDescription'] = ApiClient.convertToType(data['valueAndFrequencyTextDescription'], 'String');
      }
      if (data.hasOwnProperty('valueAndFrequencyTextDescriptionWithTime')) {
        obj['valueAndFrequencyTextDescriptionWithTime'] = ApiClient.convertToType(data['valueAndFrequencyTextDescriptionWithTime'], 'String');
      }
      if (data.hasOwnProperty('variableCategoryId')) {
        obj['variableCategoryId'] = ApiClient.convertToType(data['variableCategoryId'], 'Number');
      }
      if (data.hasOwnProperty('variableCategoryImageUrl')) {
        obj['variableCategoryImageUrl'] = ApiClient.convertToType(data['variableCategoryImageUrl'], 'String');
      }
      if (data.hasOwnProperty('variableCategoryName')) {
        obj['variableCategoryName'] = ApiClient.convertToType(data['variableCategoryName'], 'String');
      }
      if (data.hasOwnProperty('variableDescription')) {
        obj['variableDescription'] = ApiClient.convertToType(data['variableDescription'], 'String');
      }
      if (data.hasOwnProperty('variableId')) {
        obj['variableId'] = ApiClient.convertToType(data['variableId'], 'Number');
      }
      if (data.hasOwnProperty('variableName')) {
        obj['variableName'] = ApiClient.convertToType(data['variableName'], 'String');
      }
    }
    return obj;
  }

  /**
   * @member {Array.<module:model/TrackingReminderNotificationAction>} actionArray
   */
  exports.prototype['actionArray'] = undefined;
  /**
   * @member {Array.<module:model/Unit>} availableUnits
   */
  exports.prototype['availableUnits'] = undefined;
  /**
   * clientId
   * @member {String} clientId
   */
  exports.prototype['clientId'] = undefined;
  /**
   * The way multiple measurements are aggregated over time
   * @member {module:model/TrackingReminder.CombinationOperationEnum} combinationOperation
   */
  exports.prototype['combinationOperation'] = undefined;
  /**
   * Example: 2016-05-18 02:24:08
   * @member {Date} createdAt
   */
  exports.prototype['createdAt'] = undefined;
  /**
   * Example: /5
   * @member {String} unitAbbreviatedName
   */
  exports.prototype['unitAbbreviatedName'] = undefined;
  /**
   * Example: 5
   * @member {Number} unitCategoryId
   */
  exports.prototype['unitCategoryId'] = undefined;
  /**
   * Example: Rating
   * @member {String} unitCategoryName
   */
  exports.prototype['unitCategoryName'] = undefined;
  /**
   * Example: 10
   * @member {Number} unitId
   */
  exports.prototype['unitId'] = undefined;
  /**
   * Example: 1 to 5 Rating
   * @member {String} unitName
   */
  exports.prototype['unitName'] = undefined;
  /**
   * Default value to use for the measurement when tracking
   * @member {Number} defaultValue
   */
  exports.prototype['defaultValue'] = undefined;
  /**
   * True if the reminders should be delivered via email
   * @member {Boolean} email
   */
  exports.prototype['email'] = undefined;
  /**
   * Example: reminderStartTimeLocal is less than $user->earliestReminderTime or greater than  $user->latestReminderTime
   * @member {String} errorMessage
   */
  exports.prototype['errorMessage'] = undefined;
  /**
   * Example: 0
   * @member {Number} fillingValue
   */
  exports.prototype['fillingValue'] = undefined;
  /**
   * Example: 02:45:20
   * @member {Date} firstDailyReminderTime
   */
  exports.prototype['firstDailyReminderTime'] = undefined;
  /**
   * Example: Daily
   * @member {String} frequencyTextDescription
   */
  exports.prototype['frequencyTextDescription'] = undefined;
  /**
   * Example: Daily at 09:45 PM
   * @member {String} frequencyTextDescriptionWithTime
   */
  exports.prototype['frequencyTextDescriptionWithTime'] = undefined;
  /**
   * id
   * @member {Number} id
   */
  exports.prototype['id'] = undefined;
  /**
   * Example: saddestFaceIsFive
   * @member {String} inputType
   */
  exports.prototype['inputType'] = undefined;
  /**
   * Example: I am an instruction!
   * @member {String} instructions
   */
  exports.prototype['instructions'] = undefined;
  /**
   * Example: ion-sad-outline
   * @member {String} ionIcon
   */
  exports.prototype['ionIcon'] = undefined;
  /**
   * UTC ISO 8601 `YYYY-MM-DDThh:mm:ss`  timestamp for the last time a measurement was received for this user and variable
   * @member {Date} lastTracked
   */
  exports.prototype['lastTracked'] = undefined;
  /**
   * Example: 2
   * @member {Number} lastValue
   */
  exports.prototype['lastValue'] = undefined;
  /**
   * UTC ISO 8601 `YYYY-MM-DDThh:mm:ss`  timestamp for the reminder time of the latest tracking reminder notification that has been pre-emptively generated in the database
   * @member {Date} latestTrackingReminderNotificationReminderTime
   */
  exports.prototype['latestTrackingReminderNotificationReminderTime'] = undefined;
  /**
   * @member {Array.<String>} localDailyReminderNotificationTimes
   */
  exports.prototype['localDailyReminderNotificationTimes'] = undefined;
  /**
   * @member {Array.<String>} localDailyReminderNotificationTimesForAllReminders
   */
  exports.prototype['localDailyReminderNotificationTimesForAllReminders'] = undefined;
  /**
   * Example: 1
   * @member {Boolean} manualTracking
   */
  exports.prototype['manualTracking'] = undefined;
  /**
   * Example: 5
   * @member {Number} maximumAllowedValue
   */
  exports.prototype['maximumAllowedValue'] = undefined;
  /**
   * Example: 1
   * @member {Number} minimumAllowedValue
   */
  exports.prototype['minimumAllowedValue'] = undefined;
  /**
   * Example: 1501555520
   * @member {Number} nextReminderTimeEpochSeconds
   */
  exports.prototype['nextReminderTimeEpochSeconds'] = undefined;
  /**
   * True if the reminders should appear in the notification bar
   * @member {Boolean} notificationBar
   */
  exports.prototype['notificationBar'] = undefined;
  /**
   * Example: 445
   * @member {Number} numberOfRawMeasurements
   */
  exports.prototype['numberOfRawMeasurements'] = undefined;
  /**
   * Example: 1
   * @member {Number} numberOfUniqueValues
   */
  exports.prototype['numberOfUniqueValues'] = undefined;
  /**
   * Indicates whether or not the variable is usually an outcome of interest such as a symptom or emotion
   * @member {Boolean} outcome
   */
  exports.prototype['outcome'] = undefined;
  /**
   * Example: img/variable_categories/symptoms.png
   * @member {String} pngPath
   */
  exports.prototype['pngPath'] = undefined;
  /**
   * Example: https://app.quantimo.do/ionic/Modo/www/img/variable_categories/symptoms.png
   * @member {String} pngUrl
   */
  exports.prototype['pngUrl'] = undefined;
  /**
   * True if the reminders should appear as a popup notification
   * @member {Boolean} popUp
   */
  exports.prototype['popUp'] = undefined;
  /**
   * Example: How is your overall mood?
   * @member {String} question
   */
  exports.prototype['question'] = undefined;
  /**
   * Latest time of day at which reminders should appear in UTC HH:MM:SS format
   * @member {String} reminderEndTime
   */
  exports.prototype['reminderEndTime'] = undefined;
  /**
   * Number of seconds between one reminder and the next
   * @member {Number} reminderFrequency
   */
  exports.prototype['reminderFrequency'] = undefined;
  /**
   * String identifier for the sound to accompany the reminder
   * @member {String} reminderSound
   */
  exports.prototype['reminderSound'] = undefined;
  /**
   * Example: 1469760320
   * @member {Number} reminderStartEpochSeconds
   */
  exports.prototype['reminderStartEpochSeconds'] = undefined;
  /**
   * Earliest time of day at which reminders should appear in UTC HH:MM:SS format
   * @member {String} reminderStartTime
   */
  exports.prototype['reminderStartTime'] = undefined;
  /**
   * Example: 21:45:20
   * @member {Date} reminderStartTimeLocal
   */
  exports.prototype['reminderStartTimeLocal'] = undefined;
  /**
   * Example: 09:45 PM
   * @member {Date} reminderStartTimeLocalHumanFormatted
   */
  exports.prototype['reminderStartTimeLocalHumanFormatted'] = undefined;
  /**
   * Example: true
   * @member {Boolean} repeating
   */
  exports.prototype['repeating'] = undefined;
  /**
   * Example: 01:00:00
   * @member {Date} secondDailyReminderTime
   */
  exports.prototype['secondDailyReminderTime'] = undefined;
  /**
   * Example: 1
   * @member {Number} secondToLastValue
   */
  exports.prototype['secondToLastValue'] = undefined;
  /**
   * True if the reminders should be delivered via SMS
   * @member {Boolean} sms
   */
  exports.prototype['sms'] = undefined;
  /**
   * Earliest date on which the user should be reminded to track in YYYY-MM-DD format
   * @member {String} startTrackingDate
   */
  exports.prototype['startTrackingDate'] = undefined;
  /**
   * Latest date on which the user should be reminded to track in YYYY-MM-DD format
   * @member {String} stopTrackingDate
   */
  exports.prototype['stopTrackingDate'] = undefined;
  /**
   * Example: https://app.quantimo.do/ionic/Modo/www/img/variable_categories/symptoms.svg
   * @member {String} svgUrl
   */
  exports.prototype['svgUrl'] = undefined;
  /**
   * Example: 20:00:00
   * @member {Date} thirdDailyReminderTime
   */
  exports.prototype['thirdDailyReminderTime'] = undefined;
  /**
   * Example: 3
   * @member {Number} thirdToLastValue
   */
  exports.prototype['thirdToLastValue'] = undefined;
  /**
   * Example: 11841
   * @member {Number} trackingReminderId
   */
  exports.prototype['trackingReminderId'] = undefined;
  /**
   * Example: Not Found
   * @member {String} trackingReminderImageUrl
   */
  exports.prototype['trackingReminderImageUrl'] = undefined;
  /**
   * UPC or other barcode scan result
   * @member {String} upc
   */
  exports.prototype['upc'] = undefined;
  /**
   * When the record in the database was last updated. Use UTC ISO 8601 `YYYY-MM-DDThh:mm:ss`  datetime format. Time zone should be UTC and not local.
   * @member {Date} updatedAt
   */
  exports.prototype['updatedAt'] = undefined;
  /**
   * ID of User
   * @member {Number} userId
   */
  exports.prototype['userId'] = undefined;
  /**
   * Example: /5
   * @member {String} userVariableUnitAbbreviatedName
   */
  exports.prototype['userVariableUnitAbbreviatedName'] = undefined;
  /**
   * Example: 5
   * @member {Number} userVariableUnitCategoryId
   */
  exports.prototype['userVariableUnitCategoryId'] = undefined;
  /**
   * Example: Rating
   * @member {String} userVariableUnitCategoryName
   */
  exports.prototype['userVariableUnitCategoryName'] = undefined;
  /**
   * Example: 10
   * @member {Number} userVariableUnitId
   */
  exports.prototype['userVariableUnitId'] = undefined;
  /**
   * Example: 1 to 5 Rating
   * @member {String} userVariableUnitName
   */
  exports.prototype['userVariableUnitName'] = undefined;
  /**
   * Example: 10
   * @member {Number} userVariableVariableCategoryId
   */
  exports.prototype['userVariableVariableCategoryId'] = undefined;
  /**
   * Example: Symptoms
   * @member {String} userVariableVariableCategoryName
   */
  exports.prototype['userVariableVariableCategoryName'] = undefined;
  /**
   * Example: negative
   * @member {String} valence
   */
  exports.prototype['valence'] = undefined;
  /**
   * Example: Rate daily
   * @member {String} valueAndFrequencyTextDescription
   */
  exports.prototype['valueAndFrequencyTextDescription'] = undefined;
  /**
   * Example: Rate daily at 09:45 PM
   * @member {String} valueAndFrequencyTextDescriptionWithTime
   */
  exports.prototype['valueAndFrequencyTextDescriptionWithTime'] = undefined;
  /**
   * Example: 10
   * @member {Number} variableCategoryId
   */
  exports.prototype['variableCategoryId'] = undefined;
  /**
   * Example: https://maxcdn.icons8.com/Color/PNG/96/Messaging/sad-96.png
   * @member {String} variableCategoryImageUrl
   */
  exports.prototype['variableCategoryImageUrl'] = undefined;
  /**
   * Name of the variable category to be used when sending measurements
   * @member {String} variableCategoryName
   */
  exports.prototype['variableCategoryName'] = undefined;
  /**
   * Example: negative
   * @member {String} variableDescription
   */
  exports.prototype['variableDescription'] = undefined;
  /**
   * Id for the variable to be tracked
   * @member {Number} variableId
   */
  exports.prototype['variableId'] = undefined;
  /**
   * Name of the variable to be used when sending measurements
   * @member {String} variableName
   */
  exports.prototype['variableName'] = undefined;


  /**
   * Allowed values for the <code>combinationOperation</code> property.
   * @enum {String}
   * @readonly
   */
  exports.CombinationOperationEnum = {
    /**
     * value: "MEAN"
     * @const
     */
    "MEAN": "MEAN",
    /**
     * value: "SUM"
     * @const
     */
    "SUM": "SUM"  };


  return exports;
}));


