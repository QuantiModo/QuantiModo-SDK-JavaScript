/**
 * quantimodo
 * We make it easy to retrieve and analyze normalized user data from a wide array of devices and applications. Check out our [docs and sdk's](https://github.com/QuantiModo/docs) or [contact us](https://help.quantimo.do).
 *
 * OpenAPI spec version: 2.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
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
    factory(root.expect, root.quantimodo-api);
  }
}(this, function(expect, quantimodo-api) {
  'use strict';

  var instance;

  beforeEach(function() {
    instance = new quantimodo-api.ShareInvitationBody();
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

  describe('ShareInvitationBody', function() {
    it('should create an instance of ShareInvitationBody', function() {
      // uncomment below and update the code to test ShareInvitationBody
      //var instane = new quantimodo-api.ShareInvitationBody();
      //expect(instance).to.be.a(quantimodo-api.ShareInvitationBody);
    });

    it('should have the property emailAddress (base name: "emailAddress")', function() {
      // uncomment below and update the code to test the property emailAddress
      //var instane = new quantimodo-api.ShareInvitationBody();
      //expect(instance).to.be();
    });

    it('should have the property name (base name: "name")', function() {
      // uncomment below and update the code to test the property name
      //var instane = new quantimodo-api.ShareInvitationBody();
      //expect(instance).to.be();
    });

    it('should have the property emailSubject (base name: "emailSubject")', function() {
      // uncomment below and update the code to test the property emailSubject
      //var instane = new quantimodo-api.ShareInvitationBody();
      //expect(instance).to.be();
    });

    it('should have the property emailBody (base name: "emailBody")', function() {
      // uncomment below and update the code to test the property emailBody
      //var instane = new quantimodo-api.ShareInvitationBody();
      //expect(instance).to.be();
    });

    it('should have the property scopes (base name: "scopes")', function() {
      // uncomment below and update the code to test the property scopes
      //var instane = new quantimodo-api.ShareInvitationBody();
      //expect(instance).to.be();
    });

  });

}));