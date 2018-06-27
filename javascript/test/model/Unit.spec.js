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
    instance = new quantimodo-api.Unit();
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

  describe('Unit', function() {
    it('should create an instance of Unit', function() {
      // uncomment below and update the code to test Unit
      //var instane = new quantimodo-api.Unit();
      //expect(instance).to.be.a(quantimodo-api.Unit);
    });

    it('should have the property abbreviatedName (base name: "abbreviatedName")', function() {
      // uncomment below and update the code to test the property abbreviatedName
      //var instane = new quantimodo-api.Unit();
      //expect(instance).to.be();
    });

    it('should have the property advanced (base name: "advanced")', function() {
      // uncomment below and update the code to test the property advanced
      //var instane = new quantimodo-api.Unit();
      //expect(instance).to.be();
    });

    it('should have the property category (base name: "category")', function() {
      // uncomment below and update the code to test the property category
      //var instane = new quantimodo-api.Unit();
      //expect(instance).to.be();
    });

    it('should have the property categoryId (base name: "categoryId")', function() {
      // uncomment below and update the code to test the property categoryId
      //var instane = new quantimodo-api.Unit();
      //expect(instance).to.be();
    });

    it('should have the property categoryName (base name: "categoryName")', function() {
      // uncomment below and update the code to test the property categoryName
      //var instane = new quantimodo-api.Unit();
      //expect(instance).to.be();
    });

    it('should have the property conversionSteps (base name: "conversionSteps")', function() {
      // uncomment below and update the code to test the property conversionSteps
      //var instane = new quantimodo-api.Unit();
      //expect(instance).to.be();
    });

    it('should have the property id (base name: "id")', function() {
      // uncomment below and update the code to test the property id
      //var instane = new quantimodo-api.Unit();
      //expect(instance).to.be();
    });

    it('should have the property manualTracking (base name: "manualTracking")', function() {
      // uncomment below and update the code to test the property manualTracking
      //var instane = new quantimodo-api.Unit();
      //expect(instance).to.be();
    });

    it('should have the property maximumAllowedValue (base name: "maximumAllowedValue")', function() {
      // uncomment below and update the code to test the property maximumAllowedValue
      //var instane = new quantimodo-api.Unit();
      //expect(instance).to.be();
    });

    it('should have the property maximumValue (base name: "maximumValue")', function() {
      // uncomment below and update the code to test the property maximumValue
      //var instane = new quantimodo-api.Unit();
      //expect(instance).to.be();
    });

    it('should have the property minimumAllowedValue (base name: "minimumAllowedValue")', function() {
      // uncomment below and update the code to test the property minimumAllowedValue
      //var instane = new quantimodo-api.Unit();
      //expect(instance).to.be();
    });

    it('should have the property minimumValue (base name: "minimumValue")', function() {
      // uncomment below and update the code to test the property minimumValue
      //var instane = new quantimodo-api.Unit();
      //expect(instance).to.be();
    });

    it('should have the property name (base name: "name")', function() {
      // uncomment below and update the code to test the property name
      //var instane = new quantimodo-api.Unit();
      //expect(instance).to.be();
    });

    it('should have the property unitCategory (base name: "unitCategory")', function() {
      // uncomment below and update the code to test the property unitCategory
      //var instane = new quantimodo-api.Unit();
      //expect(instance).to.be();
    });

  });

}));