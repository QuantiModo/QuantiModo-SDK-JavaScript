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
    instance = new Quantimodo.StudyCreationBody();
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

  describe('StudyCreationBody', function() {
    it('should create an instance of StudyCreationBody', function() {
      // uncomment below and update the code to test StudyCreationBody
      //var instance = new Quantimodo.StudyCreationBody();
      //expect(instance).to.be.a(Quantimodo.StudyCreationBody);
    });

    it('should have the property causeVariableName (base name: "causeVariableName")', function() {
      // uncomment below and update the code to test the property causeVariableName
      //var instance = new Quantimodo.StudyCreationBody();
      //expect(instance).to.be();
    });

    it('should have the property effectVariableName (base name: "effectVariableName")', function() {
      // uncomment below and update the code to test the property effectVariableName
      //var instance = new Quantimodo.StudyCreationBody();
      //expect(instance).to.be();
    });

    it('should have the property studyTitle (base name: "studyTitle")', function() {
      // uncomment below and update the code to test the property studyTitle
      //var instance = new Quantimodo.StudyCreationBody();
      //expect(instance).to.be();
    });

    it('should have the property type (base name: "type")', function() {
      // uncomment below and update the code to test the property type
      //var instance = new Quantimodo.StudyCreationBody();
      //expect(instance).to.be();
    });

  });

}));
