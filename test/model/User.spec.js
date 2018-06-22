/**
 * quantimodo
 * We make it easy to retrieve and analyze normalized user data from a wide array of devices and applications. Check out our [docs and sdk's](https://github.com/QuantiModo/docs) or [contact us](https://help.quantimo.do).
 *
 * OpenAPI spec version: 5.8.112511
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.3.1
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
    instance = new Quantimodo.User();
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

  describe('User', function() {
    it('should create an instance of User', function() {
      // uncomment below and update the code to test User
      //var instane = new Quantimodo.User();
      //expect(instance).to.be.a(Quantimodo.User);
    });

    it('should have the property accessToken (base name: "accessToken")', function() {
      // uncomment below and update the code to test the property accessToken
      //var instane = new Quantimodo.User();
      //expect(instance).to.be();
    });

    it('should have the property accessTokenExpires (base name: "accessTokenExpires")', function() {
      // uncomment below and update the code to test the property accessTokenExpires
      //var instane = new Quantimodo.User();
      //expect(instance).to.be();
    });

    it('should have the property accessTokenExpiresAtMilliseconds (base name: "accessTokenExpiresAtMilliseconds")', function() {
      // uncomment below and update the code to test the property accessTokenExpiresAtMilliseconds
      //var instane = new Quantimodo.User();
      //expect(instance).to.be();
    });

    it('should have the property administrator (base name: "administrator")', function() {
      // uncomment below and update the code to test the property administrator
      //var instane = new Quantimodo.User();
      //expect(instance).to.be();
    });

    it('should have the property authorizedClients (base name: "authorizedClients")', function() {
      // uncomment below and update the code to test the property authorizedClients
      //var instane = new Quantimodo.User();
      //expect(instance).to.be();
    });

    it('should have the property avatar (base name: "avatar")', function() {
      // uncomment below and update the code to test the property avatar
      //var instane = new Quantimodo.User();
      //expect(instance).to.be();
    });

    it('should have the property avatarImage (base name: "avatarImage")', function() {
      // uncomment below and update the code to test the property avatarImage
      //var instane = new Quantimodo.User();
      //expect(instance).to.be();
    });

    it('should have the property capabilities (base name: "capabilities")', function() {
      // uncomment below and update the code to test the property capabilities
      //var instane = new Quantimodo.User();
      //expect(instance).to.be();
    });

    it('should have the property clientId (base name: "clientId")', function() {
      // uncomment below and update the code to test the property clientId
      //var instane = new Quantimodo.User();
      //expect(instance).to.be();
    });

    it('should have the property clientUserId (base name: "clientUserId")', function() {
      // uncomment below and update the code to test the property clientUserId
      //var instane = new Quantimodo.User();
      //expect(instance).to.be();
    });

    it('should have the property combineNotifications (base name: "combineNotifications")', function() {
      // uncomment below and update the code to test the property combineNotifications
      //var instane = new Quantimodo.User();
      //expect(instance).to.be();
    });

    it('should have the property createdAt (base name: "createdAt")', function() {
      // uncomment below and update the code to test the property createdAt
      //var instane = new Quantimodo.User();
      //expect(instance).to.be();
    });

    it('should have the property displayName (base name: "displayName")', function() {
      // uncomment below and update the code to test the property displayName
      //var instane = new Quantimodo.User();
      //expect(instance).to.be();
    });

    it('should have the property earliestReminderTime (base name: "earliestReminderTime")', function() {
      // uncomment below and update the code to test the property earliestReminderTime
      //var instane = new Quantimodo.User();
      //expect(instance).to.be();
    });

    it('should have the property email (base name: "email")', function() {
      // uncomment below and update the code to test the property email
      //var instane = new Quantimodo.User();
      //expect(instance).to.be();
    });

    it('should have the property firstName (base name: "firstName")', function() {
      // uncomment below and update the code to test the property firstName
      //var instane = new Quantimodo.User();
      //expect(instance).to.be();
    });

    it('should have the property getPreviewBuilds (base name: "getPreviewBuilds")', function() {
      // uncomment below and update the code to test the property getPreviewBuilds
      //var instane = new Quantimodo.User();
      //expect(instance).to.be();
    });

    it('should have the property hasAndroidApp (base name: "hasAndroidApp")', function() {
      // uncomment below and update the code to test the property hasAndroidApp
      //var instane = new Quantimodo.User();
      //expect(instance).to.be();
    });

    it('should have the property hasChromeExtension (base name: "hasChromeExtension")', function() {
      // uncomment below and update the code to test the property hasChromeExtension
      //var instane = new Quantimodo.User();
      //expect(instance).to.be();
    });

    it('should have the property hasIosApp (base name: "hasIosApp")', function() {
      // uncomment below and update the code to test the property hasIosApp
      //var instane = new Quantimodo.User();
      //expect(instance).to.be();
    });

    it('should have the property id (base name: "id")', function() {
      // uncomment below and update the code to test the property id
      //var instane = new Quantimodo.User();
      //expect(instance).to.be();
    });

    it('should have the property lastFour (base name: "lastFour")', function() {
      // uncomment below and update the code to test the property lastFour
      //var instane = new Quantimodo.User();
      //expect(instance).to.be();
    });

    it('should have the property lastName (base name: "lastName")', function() {
      // uncomment below and update the code to test the property lastName
      //var instane = new Quantimodo.User();
      //expect(instance).to.be();
    });

    it('should have the property lastSmsTrackingReminderNotificationId (base name: "lastSmsTrackingReminderNotificationId")', function() {
      // uncomment below and update the code to test the property lastSmsTrackingReminderNotificationId
      //var instane = new Quantimodo.User();
      //expect(instance).to.be();
    });

    it('should have the property latestReminderTime (base name: "latestReminderTime")', function() {
      // uncomment below and update the code to test the property latestReminderTime
      //var instane = new Quantimodo.User();
      //expect(instance).to.be();
    });

    it('should have the property loginName (base name: "loginName")', function() {
      // uncomment below and update the code to test the property loginName
      //var instane = new Quantimodo.User();
      //expect(instance).to.be();
    });

    it('should have the property password (base name: "password")', function() {
      // uncomment below and update the code to test the property password
      //var instane = new Quantimodo.User();
      //expect(instance).to.be();
    });

    it('should have the property phoneNumber (base name: "phoneNumber")', function() {
      // uncomment below and update the code to test the property phoneNumber
      //var instane = new Quantimodo.User();
      //expect(instance).to.be();
    });

    it('should have the property phoneVerificationCode (base name: "phoneVerificationCode")', function() {
      // uncomment below and update the code to test the property phoneVerificationCode
      //var instane = new Quantimodo.User();
      //expect(instance).to.be();
    });

    it('should have the property pushNotificationsEnabled (base name: "pushNotificationsEnabled")', function() {
      // uncomment below and update the code to test the property pushNotificationsEnabled
      //var instane = new Quantimodo.User();
      //expect(instance).to.be();
    });

    it('should have the property refreshToken (base name: "refreshToken")', function() {
      // uncomment below and update the code to test the property refreshToken
      //var instane = new Quantimodo.User();
      //expect(instance).to.be();
    });

    it('should have the property roles (base name: "roles")', function() {
      // uncomment below and update the code to test the property roles
      //var instane = new Quantimodo.User();
      //expect(instance).to.be();
    });

    it('should have the property sendPredictorEmails (base name: "sendPredictorEmails")', function() {
      // uncomment below and update the code to test the property sendPredictorEmails
      //var instane = new Quantimodo.User();
      //expect(instance).to.be();
    });

    it('should have the property sendReminderNotificationEmails (base name: "sendReminderNotificationEmails")', function() {
      // uncomment below and update the code to test the property sendReminderNotificationEmails
      //var instane = new Quantimodo.User();
      //expect(instance).to.be();
    });

    it('should have the property shareAllData (base name: "shareAllData")', function() {
      // uncomment below and update the code to test the property shareAllData
      //var instane = new Quantimodo.User();
      //expect(instance).to.be();
    });

    it('should have the property smsNotificationsEnabled (base name: "smsNotificationsEnabled")', function() {
      // uncomment below and update the code to test the property smsNotificationsEnabled
      //var instane = new Quantimodo.User();
      //expect(instance).to.be();
    });

    it('should have the property stripeActive (base name: "stripeActive")', function() {
      // uncomment below and update the code to test the property stripeActive
      //var instane = new Quantimodo.User();
      //expect(instance).to.be();
    });

    it('should have the property stripeId (base name: "stripeId")', function() {
      // uncomment below and update the code to test the property stripeId
      //var instane = new Quantimodo.User();
      //expect(instance).to.be();
    });

    it('should have the property stripePlan (base name: "stripePlan")', function() {
      // uncomment below and update the code to test the property stripePlan
      //var instane = new Quantimodo.User();
      //expect(instance).to.be();
    });

    it('should have the property stripeSubscription (base name: "stripeSubscription")', function() {
      // uncomment below and update the code to test the property stripeSubscription
      //var instane = new Quantimodo.User();
      //expect(instance).to.be();
    });

    it('should have the property subscriptionEndsAt (base name: "subscriptionEndsAt")', function() {
      // uncomment below and update the code to test the property subscriptionEndsAt
      //var instane = new Quantimodo.User();
      //expect(instance).to.be();
    });

    it('should have the property subscriptionProvider (base name: "subscriptionProvider")', function() {
      // uncomment below and update the code to test the property subscriptionProvider
      //var instane = new Quantimodo.User();
      //expect(instance).to.be();
    });

    it('should have the property timeZoneOffset (base name: "timeZoneOffset")', function() {
      // uncomment below and update the code to test the property timeZoneOffset
      //var instane = new Quantimodo.User();
      //expect(instance).to.be();
    });

    it('should have the property trackLocation (base name: "trackLocation")', function() {
      // uncomment below and update the code to test the property trackLocation
      //var instane = new Quantimodo.User();
      //expect(instance).to.be();
    });

    it('should have the property updatedAt (base name: "updatedAt")', function() {
      // uncomment below and update the code to test the property updatedAt
      //var instane = new Quantimodo.User();
      //expect(instance).to.be();
    });

    it('should have the property userRegistered (base name: "userRegistered")', function() {
      // uncomment below and update the code to test the property userRegistered
      //var instane = new Quantimodo.User();
      //expect(instance).to.be();
    });

    it('should have the property userUrl (base name: "userUrl")', function() {
      // uncomment below and update the code to test the property userUrl
      //var instane = new Quantimodo.User();
      //expect(instance).to.be();
    });

  });

}));
