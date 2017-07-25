/**
 * QuantiModo
 * QuantiModo makes it easy to retrieve normalized user data from a wide array of devices and applications. [Learn about QuantiModo](https://quantimo.do), check out our [docs](https://github.com/QuantiModo/docs) or contact us at [help.quantimo.do](https://help.quantimo.do). 
 *
 * OpenAPI spec version: 2.0
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
    factory(root.expect, root.quantimodoApi);
  }
}(this, function(expect, quantimodoApi) {
  'use strict';

  var instance;

  beforeEach(function() {
    instance = new quantimodoApi.TrackingReminder();
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

  describe('TrackingReminder', function() {
    it('should create an instance of TrackingReminder', function() {
      // uncomment below and update the code to test TrackingReminder
      //var instane = new quantimodoApi.TrackingReminder();
      //expect(instance).to.be.a(quantimodoApi.TrackingReminder);
    });

    it('should have the property id (base name: "id")', function() {
      // uncomment below and update the code to test the property id
      //var instane = new quantimodoApi.TrackingReminder();
      //expect(instance).to.be();
    });

    it('should have the property clientId (base name: "clientId")', function() {
      // uncomment below and update the code to test the property clientId
      //var instane = new quantimodoApi.TrackingReminder();
      //expect(instance).to.be();
    });

    it('should have the property userId (base name: "userId")', function() {
      // uncomment below and update the code to test the property userId
      //var instane = new quantimodoApi.TrackingReminder();
      //expect(instance).to.be();
    });

    it('should have the property variableId (base name: "variableId")', function() {
      // uncomment below and update the code to test the property variableId
      //var instane = new quantimodoApi.TrackingReminder();
      //expect(instance).to.be();
    });

    it('should have the property defaultValue (base name: "defaultValue")', function() {
      // uncomment below and update the code to test the property defaultValue
      //var instane = new quantimodoApi.TrackingReminder();
      //expect(instance).to.be();
    });

    it('should have the property reminderStartTime (base name: "reminderStartTime")', function() {
      // uncomment below and update the code to test the property reminderStartTime
      //var instane = new quantimodoApi.TrackingReminder();
      //expect(instance).to.be();
    });

    it('should have the property reminderEndTime (base name: "reminderEndTime")', function() {
      // uncomment below and update the code to test the property reminderEndTime
      //var instane = new quantimodoApi.TrackingReminder();
      //expect(instance).to.be();
    });

    it('should have the property reminderSound (base name: "reminderSound")', function() {
      // uncomment below and update the code to test the property reminderSound
      //var instane = new quantimodoApi.TrackingReminder();
      //expect(instance).to.be();
    });

    it('should have the property reminderFrequency (base name: "reminderFrequency")', function() {
      // uncomment below and update the code to test the property reminderFrequency
      //var instane = new quantimodoApi.TrackingReminder();
      //expect(instance).to.be();
    });

    it('should have the property popUp (base name: "popUp")', function() {
      // uncomment below and update the code to test the property popUp
      //var instane = new quantimodoApi.TrackingReminder();
      //expect(instance).to.be();
    });

    it('should have the property sms (base name: "sms")', function() {
      // uncomment below and update the code to test the property sms
      //var instane = new quantimodoApi.TrackingReminder();
      //expect(instance).to.be();
    });

    it('should have the property email (base name: "email")', function() {
      // uncomment below and update the code to test the property email
      //var instane = new quantimodoApi.TrackingReminder();
      //expect(instance).to.be();
    });

    it('should have the property notificationBar (base name: "notificationBar")', function() {
      // uncomment below and update the code to test the property notificationBar
      //var instane = new quantimodoApi.TrackingReminder();
      //expect(instance).to.be();
    });

    it('should have the property latestTrackingReminderNotificationReminderTime (base name: "latestTrackingReminderNotificationReminderTime")', function() {
      // uncomment below and update the code to test the property latestTrackingReminderNotificationReminderTime
      //var instane = new quantimodoApi.TrackingReminder();
      //expect(instance).to.be();
    });

    it('should have the property lastTracked (base name: "lastTracked")', function() {
      // uncomment below and update the code to test the property lastTracked
      //var instane = new quantimodoApi.TrackingReminder();
      //expect(instance).to.be();
    });

    it('should have the property startTrackingDate (base name: "startTrackingDate")', function() {
      // uncomment below and update the code to test the property startTrackingDate
      //var instane = new quantimodoApi.TrackingReminder();
      //expect(instance).to.be();
    });

    it('should have the property stopTrackingDate (base name: "stopTrackingDate")', function() {
      // uncomment below and update the code to test the property stopTrackingDate
      //var instane = new quantimodoApi.TrackingReminder();
      //expect(instance).to.be();
    });

    it('should have the property updatedAt (base name: "updatedAt")', function() {
      // uncomment below and update the code to test the property updatedAt
      //var instane = new quantimodoApi.TrackingReminder();
      //expect(instance).to.be();
    });

    it('should have the property variableName (base name: "variableName")', function() {
      // uncomment below and update the code to test the property variableName
      //var instane = new quantimodoApi.TrackingReminder();
      //expect(instance).to.be();
    });

    it('should have the property variableCategoryName (base name: "variableCategoryName")', function() {
      // uncomment below and update the code to test the property variableCategoryName
      //var instane = new quantimodoApi.TrackingReminder();
      //expect(instance).to.be();
    });

    it('should have the property unitAbbreviatedName (base name: "unitAbbreviatedName")', function() {
      // uncomment below and update the code to test the property unitAbbreviatedName
      //var instane = new quantimodoApi.TrackingReminder();
      //expect(instance).to.be();
    });

    it('should have the property combinationOperation (base name: "combinationOperation")', function() {
      // uncomment below and update the code to test the property combinationOperation
      //var instane = new quantimodoApi.TrackingReminder();
      //expect(instance).to.be();
    });

  });

}));
