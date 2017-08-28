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
    instance = new Quantimodo.Text();
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

  describe('Text', function() {
    it('should create an instance of Text', function() {
      // uncomment below and update the code to test Text
      //var instane = new Quantimodo.Text();
      //expect(instance).to.be.a(Quantimodo.Text);
    });

    it('should have the property dataAnalysis (base name: "dataAnalysis")', function() {
      // uncomment below and update the code to test the property dataAnalysis
      //var instane = new Quantimodo.Text();
      //expect(instance).to.be();
    });

    it('should have the property dataSources (base name: "dataSources")', function() {
      // uncomment below and update the code to test the property dataSources
      //var instane = new Quantimodo.Text();
      //expect(instance).to.be();
    });

    it('should have the property significanceExplanation (base name: "significanceExplanation")', function() {
      // uncomment below and update the code to test the property significanceExplanation
      //var instane = new Quantimodo.Text();
      //expect(instance).to.be();
    });

    it('should have the property studyAbstract (base name: "studyAbstract")', function() {
      // uncomment below and update the code to test the property studyAbstract
      //var instane = new Quantimodo.Text();
      //expect(instance).to.be();
    });

    it('should have the property studyDesign (base name: "studyDesign")', function() {
      // uncomment below and update the code to test the property studyDesign
      //var instane = new Quantimodo.Text();
      //expect(instance).to.be();
    });

    it('should have the property studyLimitations (base name: "studyLimitations")', function() {
      // uncomment below and update the code to test the property studyLimitations
      //var instane = new Quantimodo.Text();
      //expect(instance).to.be();
    });

    it('should have the property studyObjective (base name: "studyObjective")', function() {
      // uncomment below and update the code to test the property studyObjective
      //var instane = new Quantimodo.Text();
      //expect(instance).to.be();
    });

    it('should have the property studyResults (base name: "studyResults")', function() {
      // uncomment below and update the code to test the property studyResults
      //var instane = new Quantimodo.Text();
      //expect(instance).to.be();
    });

    it('should have the property studyTitle (base name: "studyTitle")', function() {
      // uncomment below and update the code to test the property studyTitle
      //var instane = new Quantimodo.Text();
      //expect(instance).to.be();
    });

  });

}));
