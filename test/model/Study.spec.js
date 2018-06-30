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
    instance = new Quantimodo.Study();
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

  describe('Study', function() {
    it('should create an instance of Study', function() {
      // uncomment below and update the code to test Study
      //var instane = new Quantimodo.Study();
      //expect(instance).to.be.a(Quantimodo.Study);
    });

    it('should have the property type (base name: "type")', function() {
      // uncomment below and update the code to test the property type
      //var instane = new Quantimodo.Study();
      //expect(instance).to.be();
    });

    it('should have the property userId (base name: "userId")', function() {
      // uncomment below and update the code to test the property userId
      //var instane = new Quantimodo.Study();
      //expect(instance).to.be();
    });

    it('should have the property studyId (base name: "studyId")', function() {
      // uncomment below and update the code to test the property studyId
      //var instane = new Quantimodo.Study();
      //expect(instance).to.be();
    });

    it('should have the property causeVariable (base name: "causeVariable")', function() {
      // uncomment below and update the code to test the property causeVariable
      //var instane = new Quantimodo.Study();
      //expect(instance).to.be();
    });

    it('should have the property studyCharts (base name: "studyCharts")', function() {
      // uncomment below and update the code to test the property studyCharts
      //var instane = new Quantimodo.Study();
      //expect(instance).to.be();
    });

    it('should have the property effectVariable (base name: "effectVariable")', function() {
      // uncomment below and update the code to test the property effectVariable
      //var instane = new Quantimodo.Study();
      //expect(instance).to.be();
    });

    it('should have the property participantInstructions (base name: "participantInstructions")', function() {
      // uncomment below and update the code to test the property participantInstructions
      //var instane = new Quantimodo.Study();
      //expect(instance).to.be();
    });

    it('should have the property statistics (base name: "statistics")', function() {
      // uncomment below and update the code to test the property statistics
      //var instane = new Quantimodo.Study();
      //expect(instance).to.be();
    });

    it('should have the property studyHtml (base name: "studyHtml")', function() {
      // uncomment below and update the code to test the property studyHtml
      //var instane = new Quantimodo.Study();
      //expect(instance).to.be();
    });

    it('should have the property studyImages (base name: "studyImages")', function() {
      // uncomment below and update the code to test the property studyImages
      //var instane = new Quantimodo.Study();
      //expect(instance).to.be();
    });

    it('should have the property studyLinks (base name: "studyLinks")', function() {
      // uncomment below and update the code to test the property studyLinks
      //var instane = new Quantimodo.Study();
      //expect(instance).to.be();
    });

    it('should have the property studyText (base name: "studyText")', function() {
      // uncomment below and update the code to test the property studyText
      //var instane = new Quantimodo.Study();
      //expect(instance).to.be();
    });

    it('should have the property joined (base name: "joined")', function() {
      // uncomment below and update the code to test the property joined
      //var instane = new Quantimodo.Study();
      //expect(instance).to.be();
    });

  });

}));
