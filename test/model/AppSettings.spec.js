/**
 * quantimodo
 * We make it easy to retrieve and analyze normalized user data from a wide array of devices and applications. Check out our [docs and sdk's](https://github.com/QuantiModo/docs) or [contact us](https://help.quantimo.do).
 *
 * OpenAPI spec version: 5.8.112511
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.4.5
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
    instance = new Quantimodo.AppSettings();
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

  describe('AppSettings', function() {
    it('should create an instance of AppSettings', function() {
      // uncomment below and update the code to test AppSettings
      //var instance = new Quantimodo.AppSettings();
      //expect(instance).to.be.a(Quantimodo.AppSettings);
    });

    it('should have the property additionalSettings (base name: "additionalSettings")', function() {
      // uncomment below and update the code to test the property additionalSettings
      //var instance = new Quantimodo.AppSettings();
      //expect(instance).to.be();
    });

    it('should have the property appDescription (base name: "appDescription")', function() {
      // uncomment below and update the code to test the property appDescription
      //var instance = new Quantimodo.AppSettings();
      //expect(instance).to.be();
    });

    it('should have the property appDesign (base name: "appDesign")', function() {
      // uncomment below and update the code to test the property appDesign
      //var instance = new Quantimodo.AppSettings();
      //expect(instance).to.be();
    });

    it('should have the property appDisplayName (base name: "appDisplayName")', function() {
      // uncomment below and update the code to test the property appDisplayName
      //var instance = new Quantimodo.AppSettings();
      //expect(instance).to.be();
    });

    it('should have the property appStatus (base name: "appStatus")', function() {
      // uncomment below and update the code to test the property appStatus
      //var instance = new Quantimodo.AppSettings();
      //expect(instance).to.be();
    });

    it('should have the property appType (base name: "appType")', function() {
      // uncomment below and update the code to test the property appType
      //var instance = new Quantimodo.AppSettings();
      //expect(instance).to.be();
    });

    it('should have the property buildEnabled (base name: "buildEnabled")', function() {
      // uncomment below and update the code to test the property buildEnabled
      //var instance = new Quantimodo.AppSettings();
      //expect(instance).to.be();
    });

    it('should have the property clientId (base name: "clientId")', function() {
      // uncomment below and update the code to test the property clientId
      //var instance = new Quantimodo.AppSettings();
      //expect(instance).to.be();
    });

    it('should have the property clientSecret (base name: "clientSecret")', function() {
      // uncomment below and update the code to test the property clientSecret
      //var instance = new Quantimodo.AppSettings();
      //expect(instance).to.be();
    });

    it('should have the property collaborators (base name: "collaborators")', function() {
      // uncomment below and update the code to test the property collaborators
      //var instance = new Quantimodo.AppSettings();
      //expect(instance).to.be();
    });

    it('should have the property createdAt (base name: "createdAt")', function() {
      // uncomment below and update the code to test the property createdAt
      //var instance = new Quantimodo.AppSettings();
      //expect(instance).to.be();
    });

    it('should have the property userId (base name: "userId")', function() {
      // uncomment below and update the code to test the property userId
      //var instance = new Quantimodo.AppSettings();
      //expect(instance).to.be();
    });

    it('should have the property users (base name: "users")', function() {
      // uncomment below and update the code to test the property users
      //var instance = new Quantimodo.AppSettings();
      //expect(instance).to.be();
    });

    it('should have the property redirectUri (base name: "redirectUri")', function() {
      // uncomment below and update the code to test the property redirectUri
      //var instance = new Quantimodo.AppSettings();
      //expect(instance).to.be();
    });

    it('should have the property companyName (base name: "companyName")', function() {
      // uncomment below and update the code to test the property companyName
      //var instance = new Quantimodo.AppSettings();
      //expect(instance).to.be();
    });

    it('should have the property homepageUrl (base name: "homepageUrl")', function() {
      // uncomment below and update the code to test the property homepageUrl
      //var instance = new Quantimodo.AppSettings();
      //expect(instance).to.be();
    });

    it('should have the property iconUrl (base name: "iconUrl")', function() {
      // uncomment below and update the code to test the property iconUrl
      //var instance = new Quantimodo.AppSettings();
      //expect(instance).to.be();
    });

    it('should have the property longDescription (base name: "longDescription")', function() {
      // uncomment below and update the code to test the property longDescription
      //var instance = new Quantimodo.AppSettings();
      //expect(instance).to.be();
    });

    it('should have the property splashScreen (base name: "splashScreen")', function() {
      // uncomment below and update the code to test the property splashScreen
      //var instance = new Quantimodo.AppSettings();
      //expect(instance).to.be();
    });

    it('should have the property textLogo (base name: "textLogo")', function() {
      // uncomment below and update the code to test the property textLogo
      //var instance = new Quantimodo.AppSettings();
      //expect(instance).to.be();
    });

  });

}));
