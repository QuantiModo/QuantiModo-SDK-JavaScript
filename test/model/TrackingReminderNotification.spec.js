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
    // AMD.
    define(['expect.js', '../../src/index'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    factory(require('expect.js'), require('../../src/index'));
  } else {
    // Browser globals (root is window)
    factory(root.expect, root.Quantimodo);
  }
}(this, function(expect, Quantimodo) {
  'use strict';

  var instance;

  beforeEach(function() {
    instance = new Quantimodo.TrackingReminderNotification();
  });

  var getProperty = function(object, getter, property) {
    // Use getter method if present; otherwise, get the property directly.
    if (typeof object[getter] === 'function')
      return object[getter]();
    else
      return object[property];
  }

  var setProperty = function(object, setter, property, value) {
    // Use setter method if present; otherwise, set the property directly.
    if (typeof object[setter] === 'function')
      object[setter](value);
    else
      object[property] = value;
  }

  describe('TrackingReminderNotification', function() {
    it('should create an instance of TrackingReminderNotification', function() {
      // uncomment below and update the code to test TrackingReminderNotification
      //var instane = new Quantimodo.TrackingReminderNotification();
      //expect(instance).to.be.a(Quantimodo.TrackingReminderNotification);
    });

    it('should have the property id (base name: "id")', function() {
      // uncomment below and update the code to test the property id
      //var instane = new Quantimodo.TrackingReminderNotification();
      //expect(instance).to.be();
    });

    it('should have the property trackingReminderId (base name: "trackingReminderId")', function() {
      // uncomment below and update the code to test the property trackingReminderId
      //var instane = new Quantimodo.TrackingReminderNotification();
      //expect(instance).to.be();
    });

    it('should have the property clientId (base name: "clientId")', function() {
      // uncomment below and update the code to test the property clientId
      //var instane = new Quantimodo.TrackingReminderNotification();
      //expect(instance).to.be();
    });

    it('should have the property userId (base name: "userId")', function() {
      // uncomment below and update the code to test the property userId
      //var instane = new Quantimodo.TrackingReminderNotification();
      //expect(instance).to.be();
    });

    it('should have the property variableId (base name: "variableId")', function() {
      // uncomment below and update the code to test the property variableId
      //var instane = new Quantimodo.TrackingReminderNotification();
      //expect(instance).to.be();
    });

    it('should have the property defaultValue (base name: "defaultValue")', function() {
      // uncomment below and update the code to test the property defaultValue
      //var instane = new Quantimodo.TrackingReminderNotification();
      //expect(instance).to.be();
    });

    it('should have the property reminderSound (base name: "reminderSound")', function() {
      // uncomment below and update the code to test the property reminderSound
      //var instane = new Quantimodo.TrackingReminderNotification();
      //expect(instance).to.be();
    });

    it('should have the property popUp (base name: "popUp")', function() {
      // uncomment below and update the code to test the property popUp
      //var instane = new Quantimodo.TrackingReminderNotification();
      //expect(instance).to.be();
    });

    it('should have the property sms (base name: "sms")', function() {
      // uncomment below and update the code to test the property sms
      //var instane = new Quantimodo.TrackingReminderNotification();
      //expect(instance).to.be();
    });

    it('should have the property email (base name: "email")', function() {
      // uncomment below and update the code to test the property email
      //var instane = new Quantimodo.TrackingReminderNotification();
      //expect(instance).to.be();
    });

    it('should have the property notificationBar (base name: "notificationBar")', function() {
      // uncomment below and update the code to test the property notificationBar
      //var instane = new Quantimodo.TrackingReminderNotification();
      //expect(instance).to.be();
    });

    it('should have the property updatedAt (base name: "updatedAt")', function() {
      // uncomment below and update the code to test the property updatedAt
      //var instane = new Quantimodo.TrackingReminderNotification();
      //expect(instance).to.be();
    });

    it('should have the property variableName (base name: "variableName")', function() {
      // uncomment below and update the code to test the property variableName
      //var instane = new Quantimodo.TrackingReminderNotification();
      //expect(instance).to.be();
    });

    it('should have the property variableCategoryName (base name: "variableCategoryName")', function() {
      // uncomment below and update the code to test the property variableCategoryName
      //var instane = new Quantimodo.TrackingReminderNotification();
      //expect(instance).to.be();
    });

    it('should have the property unitAbbreviatedName (base name: "unitAbbreviatedName")', function() {
      // uncomment below and update the code to test the property unitAbbreviatedName
      //var instane = new Quantimodo.TrackingReminderNotification();
      //expect(instance).to.be();
    });

    it('should have the property combinationOperation (base name: "combinationOperation")', function() {
      // uncomment below and update the code to test the property combinationOperation
      //var instane = new Quantimodo.TrackingReminderNotification();
      //expect(instance).to.be();
    });

    it('should have the property reminderFrequency (base name: "reminderFrequency")', function() {
      // uncomment below and update the code to test the property reminderFrequency
      //var instane = new Quantimodo.TrackingReminderNotification();
      //expect(instance).to.be();
    });

    it('should have the property reminderStartTime (base name: "reminderStartTime")', function() {
      // uncomment below and update the code to test the property reminderStartTime
      //var instane = new Quantimodo.TrackingReminderNotification();
      //expect(instance).to.be();
    });

    it('should have the property createdAt (base name: "createdAt")', function() {
      // uncomment below and update the code to test the property createdAt
      //var instane = new Quantimodo.TrackingReminderNotification();
      //expect(instance).to.be();
    });

    it('should have the property trackingReminderNotificationId (base name: "trackingReminderNotificationId")', function() {
      // uncomment below and update the code to test the property trackingReminderNotificationId
      //var instane = new Quantimodo.TrackingReminderNotification();
      //expect(instance).to.be();
    });

    it('should have the property reminderTime (base name: "reminderTime")', function() {
      // uncomment below and update the code to test the property reminderTime
      //var instane = new Quantimodo.TrackingReminderNotification();
      //expect(instance).to.be();
    });

    it('should have the property trackingReminderNotificationTime (base name: "trackingReminderNotificationTime")', function() {
      // uncomment below and update the code to test the property trackingReminderNotificationTime
      //var instane = new Quantimodo.TrackingReminderNotification();
      //expect(instance).to.be();
    });

    it('should have the property defaultUnitId (base name: "defaultUnitId")', function() {
      // uncomment below and update the code to test the property defaultUnitId
      //var instane = new Quantimodo.TrackingReminderNotification();
      //expect(instance).to.be();
    });

    it('should have the property description (base name: "description")', function() {
      // uncomment below and update the code to test the property description
      //var instane = new Quantimodo.TrackingReminderNotification();
      //expect(instance).to.be();
    });

    it('should have the property variableCategoryId (base name: "variableCategoryId")', function() {
      // uncomment below and update the code to test the property variableCategoryId
      //var instane = new Quantimodo.TrackingReminderNotification();
      //expect(instance).to.be();
    });

    it('should have the property valence (base name: "valence")', function() {
      // uncomment below and update the code to test the property valence
      //var instane = new Quantimodo.TrackingReminderNotification();
      //expect(instance).to.be();
    });

    it('should have the property mostCommonValue (base name: "mostCommonValue")', function() {
      // uncomment below and update the code to test the property mostCommonValue
      //var instane = new Quantimodo.TrackingReminderNotification();
      //expect(instance).to.be();
    });

    it('should have the property secondMostCommonValue (base name: "secondMostCommonValue")', function() {
      // uncomment below and update the code to test the property secondMostCommonValue
      //var instane = new Quantimodo.TrackingReminderNotification();
      //expect(instance).to.be();
    });

    it('should have the property thirdMostCommonValue (base name: "thirdMostCommonValue")', function() {
      // uncomment below and update the code to test the property thirdMostCommonValue
      //var instane = new Quantimodo.TrackingReminderNotification();
      //expect(instance).to.be();
    });

    it('should have the property lastValue (base name: "lastValue")', function() {
      // uncomment below and update the code to test the property lastValue
      //var instane = new Quantimodo.TrackingReminderNotification();
      //expect(instance).to.be();
    });

    it('should have the property secondToLastValue (base name: "secondToLastValue")', function() {
      // uncomment below and update the code to test the property secondToLastValue
      //var instane = new Quantimodo.TrackingReminderNotification();
      //expect(instance).to.be();
    });

    it('should have the property thirdToLastValue (base name: "thirdToLastValue")', function() {
      // uncomment below and update the code to test the property thirdToLastValue
      //var instane = new Quantimodo.TrackingReminderNotification();
      //expect(instance).to.be();
    });

    it('should have the property userVariableDefaultUnitId (base name: "userVariableDefaultUnitId")', function() {
      // uncomment below and update the code to test the property userVariableDefaultUnitId
      //var instane = new Quantimodo.TrackingReminderNotification();
      //expect(instance).to.be();
    });

    it('should have the property userVariableVariableCategoryId (base name: "userVariableVariableCategoryId")', function() {
      // uncomment below and update the code to test the property userVariableVariableCategoryId
      //var instane = new Quantimodo.TrackingReminderNotification();
      //expect(instance).to.be();
    });

    it('should have the property numberOfUniqueValues (base name: "numberOfUniqueValues")', function() {
      // uncomment below and update the code to test the property numberOfUniqueValues
      //var instane = new Quantimodo.TrackingReminderNotification();
      //expect(instance).to.be();
    });

    it('should have the property ionIcon (base name: "ionIcon")', function() {
      // uncomment below and update the code to test the property ionIcon
      //var instane = new Quantimodo.TrackingReminderNotification();
      //expect(instance).to.be();
    });

    it('should have the property svgUrl (base name: "svgUrl")', function() {
      // uncomment below and update the code to test the property svgUrl
      //var instane = new Quantimodo.TrackingReminderNotification();
      //expect(instance).to.be();
    });

    it('should have the property pngUrl (base name: "pngUrl")', function() {
      // uncomment below and update the code to test the property pngUrl
      //var instane = new Quantimodo.TrackingReminderNotification();
      //expect(instance).to.be();
    });

    it('should have the property pngPath (base name: "pngPath")', function() {
      // uncomment below and update the code to test the property pngPath
      //var instane = new Quantimodo.TrackingReminderNotification();
      //expect(instance).to.be();
    });

    it('should have the property variableCategoryImageUrl (base name: "variableCategoryImageUrl")', function() {
      // uncomment below and update the code to test the property variableCategoryImageUrl
      //var instane = new Quantimodo.TrackingReminderNotification();
      //expect(instance).to.be();
    });

    it('should have the property manualTracking (base name: "manualTracking")', function() {
      // uncomment below and update the code to test the property manualTracking
      //var instane = new Quantimodo.TrackingReminderNotification();
      //expect(instance).to.be();
    });

    it('should have the property userVariableVariableCategoryName (base name: "userVariableVariableCategoryName")', function() {
      // uncomment below and update the code to test the property userVariableVariableCategoryName
      //var instane = new Quantimodo.TrackingReminderNotification();
      //expect(instance).to.be();
    });

    it('should have the property trackingReminderNotificationTimeEpoch (base name: "trackingReminderNotificationTimeEpoch")', function() {
      // uncomment below and update the code to test the property trackingReminderNotificationTimeEpoch
      //var instane = new Quantimodo.TrackingReminderNotification();
      //expect(instance).to.be();
    });

    it('should have the property trackingReminderNotificationTimeLocal (base name: "trackingReminderNotificationTimeLocal")', function() {
      // uncomment below and update the code to test the property trackingReminderNotificationTimeLocal
      //var instane = new Quantimodo.TrackingReminderNotification();
      //expect(instance).to.be();
    });

    it('should have the property lastValueInUserVariableDefaultUnit (base name: "lastValueInUserVariableDefaultUnit")', function() {
      // uncomment below and update the code to test the property lastValueInUserVariableDefaultUnit
      //var instane = new Quantimodo.TrackingReminderNotification();
      //expect(instance).to.be();
    });

    it('should have the property secondToLastValueInUserVariableDefaultUnit (base name: "secondToLastValueInUserVariableDefaultUnit")', function() {
      // uncomment below and update the code to test the property secondToLastValueInUserVariableDefaultUnit
      //var instane = new Quantimodo.TrackingReminderNotification();
      //expect(instance).to.be();
    });

    it('should have the property thirdToLastValueInUserVariableDefaultUnit (base name: "thirdToLastValueInUserVariableDefaultUnit")', function() {
      // uncomment below and update the code to test the property thirdToLastValueInUserVariableDefaultUnit
      //var instane = new Quantimodo.TrackingReminderNotification();
      //expect(instance).to.be();
    });

    it('should have the property mostCommonValueInUserVariableDefaultUnit (base name: "mostCommonValueInUserVariableDefaultUnit")', function() {
      // uncomment below and update the code to test the property mostCommonValueInUserVariableDefaultUnit
      //var instane = new Quantimodo.TrackingReminderNotification();
      //expect(instance).to.be();
    });

    it('should have the property secondMostCommonValueInUserVariableDefaultUnit (base name: "secondMostCommonValueInUserVariableDefaultUnit")', function() {
      // uncomment below and update the code to test the property secondMostCommonValueInUserVariableDefaultUnit
      //var instane = new Quantimodo.TrackingReminderNotification();
      //expect(instance).to.be();
    });

    it('should have the property thirdMostCommonValueInUserVariableDefaultUnit (base name: "thirdMostCommonValueInUserVariableDefaultUnit")', function() {
      // uncomment below and update the code to test the property thirdMostCommonValueInUserVariableDefaultUnit
      //var instane = new Quantimodo.TrackingReminderNotification();
      //expect(instance).to.be();
    });

    it('should have the property unitId (base name: "unitId")', function() {
      // uncomment below and update the code to test the property unitId
      //var instane = new Quantimodo.TrackingReminderNotification();
      //expect(instance).to.be();
    });

    it('should have the property unitName (base name: "unitName")', function() {
      // uncomment below and update the code to test the property unitName
      //var instane = new Quantimodo.TrackingReminderNotification();
      //expect(instance).to.be();
    });

    it('should have the property unitCategoryId (base name: "unitCategoryId")', function() {
      // uncomment below and update the code to test the property unitCategoryId
      //var instane = new Quantimodo.TrackingReminderNotification();
      //expect(instance).to.be();
    });

    it('should have the property unitCategoryName (base name: "unitCategoryName")', function() {
      // uncomment below and update the code to test the property unitCategoryName
      //var instane = new Quantimodo.TrackingReminderNotification();
      //expect(instance).to.be();
    });

    it('should have the property defaultUnitName (base name: "defaultUnitName")', function() {
      // uncomment below and update the code to test the property defaultUnitName
      //var instane = new Quantimodo.TrackingReminderNotification();
      //expect(instance).to.be();
    });

    it('should have the property defaultUnitAbbreviatedName (base name: "defaultUnitAbbreviatedName")', function() {
      // uncomment below and update the code to test the property defaultUnitAbbreviatedName
      //var instane = new Quantimodo.TrackingReminderNotification();
      //expect(instance).to.be();
    });

    it('should have the property defaultUnitCategoryId (base name: "defaultUnitCategoryId")', function() {
      // uncomment below and update the code to test the property defaultUnitCategoryId
      //var instane = new Quantimodo.TrackingReminderNotification();
      //expect(instance).to.be();
    });

    it('should have the property defaultUnitCategoryName (base name: "defaultUnitCategoryName")', function() {
      // uncomment below and update the code to test the property defaultUnitCategoryName
      //var instane = new Quantimodo.TrackingReminderNotification();
      //expect(instance).to.be();
    });

    it('should have the property userVariableDefaultUnitName (base name: "userVariableDefaultUnitName")', function() {
      // uncomment below and update the code to test the property userVariableDefaultUnitName
      //var instane = new Quantimodo.TrackingReminderNotification();
      //expect(instance).to.be();
    });

    it('should have the property userVariableDefaultUnitAbbreviatedName (base name: "userVariableDefaultUnitAbbreviatedName")', function() {
      // uncomment below and update the code to test the property userVariableDefaultUnitAbbreviatedName
      //var instane = new Quantimodo.TrackingReminderNotification();
      //expect(instance).to.be();
    });

    it('should have the property userVariableDefaultUnitCategoryId (base name: "userVariableDefaultUnitCategoryId")', function() {
      // uncomment below and update the code to test the property userVariableDefaultUnitCategoryId
      //var instane = new Quantimodo.TrackingReminderNotification();
      //expect(instance).to.be();
    });

    it('should have the property userVariableDefaultUnitCategoryName (base name: "userVariableDefaultUnitCategoryName")', function() {
      // uncomment below and update the code to test the property userVariableDefaultUnitCategoryName
      //var instane = new Quantimodo.TrackingReminderNotification();
      //expect(instance).to.be();
    });

    it('should have the property minimumAllowedValue (base name: "minimumAllowedValue")', function() {
      // uncomment below and update the code to test the property minimumAllowedValue
      //var instane = new Quantimodo.TrackingReminderNotification();
      //expect(instance).to.be();
    });

    it('should have the property maximumAllowedValue (base name: "maximumAllowedValue")', function() {
      // uncomment below and update the code to test the property maximumAllowedValue
      //var instane = new Quantimodo.TrackingReminderNotification();
      //expect(instance).to.be();
    });

    it('should have the property inputType (base name: "inputType")', function() {
      // uncomment below and update the code to test the property inputType
      //var instane = new Quantimodo.TrackingReminderNotification();
      //expect(instance).to.be();
    });

    it('should have the property total (base name: "total")', function() {
      // uncomment below and update the code to test the property total
      //var instane = new Quantimodo.TrackingReminderNotification();
      //expect(instance).to.be();
    });

    it('should have the property title (base name: "title")', function() {
      // uncomment below and update the code to test the property title
      //var instane = new Quantimodo.TrackingReminderNotification();
      //expect(instance).to.be();
    });

    it('should have the property trackingReminderImageUrl (base name: "trackingReminderImageUrl")', function() {
      // uncomment below and update the code to test the property trackingReminderImageUrl
      //var instane = new Quantimodo.TrackingReminderNotification();
      //expect(instance).to.be();
    });

    it('should have the property imageUrl (base name: "imageUrl")', function() {
      // uncomment below and update the code to test the property imageUrl
      //var instane = new Quantimodo.TrackingReminderNotification();
      //expect(instance).to.be();
    });

  });

}));
