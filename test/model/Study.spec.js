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
      //var instance = new Quantimodo.Study();
      //expect(instance).to.be.a(Quantimodo.Study);
    });

    it('should have the property type (base name: "type")', function() {
      // uncomment below and update the code to test the property type
      //var instance = new Quantimodo.Study();
      //expect(instance).to.be();
    });

    it('should have the property userId (base name: "userId")', function() {
      // uncomment below and update the code to test the property userId
      //var instance = new Quantimodo.Study();
      //expect(instance).to.be();
    });

    it('should have the property id (base name: "id")', function() {
      // uncomment below and update the code to test the property id
      //var instance = new Quantimodo.Study();
      //expect(instance).to.be();
    });

    it('should have the property causeVariable (base name: "causeVariable")', function() {
      // uncomment below and update the code to test the property causeVariable
      //var instance = new Quantimodo.Study();
      //expect(instance).to.be();
    });

    it('should have the property causeVariableName (base name: "causeVariableName")', function() {
      // uncomment below and update the code to test the property causeVariableName
      //var instance = new Quantimodo.Study();
      //expect(instance).to.be();
    });

    it('should have the property studyCharts (base name: "studyCharts")', function() {
      // uncomment below and update the code to test the property studyCharts
      //var instance = new Quantimodo.Study();
      //expect(instance).to.be();
    });

    it('should have the property effectVariable (base name: "effectVariable")', function() {
      // uncomment below and update the code to test the property effectVariable
      //var instance = new Quantimodo.Study();
      //expect(instance).to.be();
    });

    it('should have the property effectVariableName (base name: "effectVariableName")', function() {
      // uncomment below and update the code to test the property effectVariableName
      //var instance = new Quantimodo.Study();
      //expect(instance).to.be();
    });

    it('should have the property participantInstructions (base name: "participantInstructions")', function() {
      // uncomment below and update the code to test the property participantInstructions
      //var instance = new Quantimodo.Study();
      //expect(instance).to.be();
    });

    it('should have the property statistics (base name: "statistics")', function() {
      // uncomment below and update the code to test the property statistics
      //var instance = new Quantimodo.Study();
      //expect(instance).to.be();
    });

    it('should have the property studyCard (base name: "studyCard")', function() {
      // uncomment below and update the code to test the property studyCard
      //var instance = new Quantimodo.Study();
      //expect(instance).to.be();
    });

    it('should have the property studyHtml (base name: "studyHtml")', function() {
      // uncomment below and update the code to test the property studyHtml
      //var instance = new Quantimodo.Study();
      //expect(instance).to.be();
    });

    it('should have the property studyImages (base name: "studyImages")', function() {
      // uncomment below and update the code to test the property studyImages
      //var instance = new Quantimodo.Study();
      //expect(instance).to.be();
    });

    it('should have the property studyLinks (base name: "studyLinks")', function() {
      // uncomment below and update the code to test the property studyLinks
      //var instance = new Quantimodo.Study();
      //expect(instance).to.be();
    });

    it('should have the property studySharing (base name: "studySharing")', function() {
      // uncomment below and update the code to test the property studySharing
      //var instance = new Quantimodo.Study();
      //expect(instance).to.be();
    });

    it('should have the property studyText (base name: "studyText")', function() {
      // uncomment below and update the code to test the property studyText
      //var instance = new Quantimodo.Study();
      //expect(instance).to.be();
    });

    it('should have the property studyVotes (base name: "studyVotes")', function() {
      // uncomment below and update the code to test the property studyVotes
      //var instance = new Quantimodo.Study();
      //expect(instance).to.be();
    });

    it('should have the property joined (base name: "joined")', function() {
      // uncomment below and update the code to test the property joined
      //var instance = new Quantimodo.Study();
      //expect(instance).to.be();
    });

  });

}));
