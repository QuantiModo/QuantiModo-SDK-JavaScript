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
    instance = new Quantimodo.VariableCategory();
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

  describe('VariableCategory', function() {
    it('should create an instance of VariableCategory', function() {
      // uncomment below and update the code to test VariableCategory
      //var instance = new Quantimodo.VariableCategory();
      //expect(instance).to.be.a(Quantimodo.VariableCategory);
    });

    it('should have the property appType (base name: "appType")', function() {
      // uncomment below and update the code to test the property appType
      //var instance = new Quantimodo.VariableCategory();
      //expect(instance).to.be();
    });

    it('should have the property causeOnly (base name: "causeOnly")', function() {
      // uncomment below and update the code to test the property causeOnly
      //var instance = new Quantimodo.VariableCategory();
      //expect(instance).to.be();
    });

    it('should have the property combinationOperation (base name: "combinationOperation")', function() {
      // uncomment below and update the code to test the property combinationOperation
      //var instance = new Quantimodo.VariableCategory();
      //expect(instance).to.be();
    });

    it('should have the property createdTime (base name: "createdTime")', function() {
      // uncomment below and update the code to test the property createdTime
      //var instance = new Quantimodo.VariableCategory();
      //expect(instance).to.be();
    });

    it('should have the property unitAbbreviatedName (base name: "unitAbbreviatedName")', function() {
      // uncomment below and update the code to test the property unitAbbreviatedName
      //var instance = new Quantimodo.VariableCategory();
      //expect(instance).to.be();
    });

    it('should have the property unitId (base name: "unitId")', function() {
      // uncomment below and update the code to test the property unitId
      //var instance = new Quantimodo.VariableCategory();
      //expect(instance).to.be();
    });

    it('should have the property durationOfAction (base name: "durationOfAction")', function() {
      // uncomment below and update the code to test the property durationOfAction
      //var instance = new Quantimodo.VariableCategory();
      //expect(instance).to.be();
    });

    it('should have the property fillingValue (base name: "fillingValue")', function() {
      // uncomment below and update the code to test the property fillingValue
      //var instance = new Quantimodo.VariableCategory();
      //expect(instance).to.be();
    });

    it('should have the property helpText (base name: "helpText")', function() {
      // uncomment below and update the code to test the property helpText
      //var instance = new Quantimodo.VariableCategory();
      //expect(instance).to.be();
    });

    it('should have the property id (base name: "id")', function() {
      // uncomment below and update the code to test the property id
      //var instance = new Quantimodo.VariableCategory();
      //expect(instance).to.be();
    });

    it('should have the property imageUrl (base name: "imageUrl")', function() {
      // uncomment below and update the code to test the property imageUrl
      //var instance = new Quantimodo.VariableCategory();
      //expect(instance).to.be();
    });

    it('should have the property ionIcon (base name: "ionIcon")', function() {
      // uncomment below and update the code to test the property ionIcon
      //var instance = new Quantimodo.VariableCategory();
      //expect(instance).to.be();
    });

    it('should have the property manualTracking (base name: "manualTracking")', function() {
      // uncomment below and update the code to test the property manualTracking
      //var instance = new Quantimodo.VariableCategory();
      //expect(instance).to.be();
    });

    it('should have the property maximumAllowedValue (base name: "maximumAllowedValue")', function() {
      // uncomment below and update the code to test the property maximumAllowedValue
      //var instance = new Quantimodo.VariableCategory();
      //expect(instance).to.be();
    });

    it('should have the property measurementSynonymSingularLowercase (base name: "measurementSynonymSingularLowercase")', function() {
      // uncomment below and update the code to test the property measurementSynonymSingularLowercase
      //var instance = new Quantimodo.VariableCategory();
      //expect(instance).to.be();
    });

    it('should have the property minimumAllowedValue (base name: "minimumAllowedValue")', function() {
      // uncomment below and update the code to test the property minimumAllowedValue
      //var instance = new Quantimodo.VariableCategory();
      //expect(instance).to.be();
    });

    it('should have the property moreInfo (base name: "moreInfo")', function() {
      // uncomment below and update the code to test the property moreInfo
      //var instance = new Quantimodo.VariableCategory();
      //expect(instance).to.be();
    });

    it('should have the property name (base name: "name")', function() {
      // uncomment below and update the code to test the property name
      //var instance = new Quantimodo.VariableCategory();
      //expect(instance).to.be();
    });

    it('should have the property onsetDelay (base name: "onsetDelay")', function() {
      // uncomment below and update the code to test the property onsetDelay
      //var instance = new Quantimodo.VariableCategory();
      //expect(instance).to.be();
    });

    it('should have the property outcome (base name: "outcome")', function() {
      // uncomment below and update the code to test the property outcome
      //var instance = new Quantimodo.VariableCategory();
      //expect(instance).to.be();
    });

    it('should have the property pngPath (base name: "pngPath")', function() {
      // uncomment below and update the code to test the property pngPath
      //var instance = new Quantimodo.VariableCategory();
      //expect(instance).to.be();
    });

    it('should have the property pngUrl (base name: "pngUrl")', function() {
      // uncomment below and update the code to test the property pngUrl
      //var instance = new Quantimodo.VariableCategory();
      //expect(instance).to.be();
    });

    it('should have the property _public (base name: "public")', function() {
      // uncomment below and update the code to test the property _public
      //var instance = new Quantimodo.VariableCategory();
      //expect(instance).to.be();
    });

    it('should have the property svgPath (base name: "svgPath")', function() {
      // uncomment below and update the code to test the property svgPath
      //var instance = new Quantimodo.VariableCategory();
      //expect(instance).to.be();
    });

    it('should have the property svgUrl (base name: "svgUrl")', function() {
      // uncomment below and update the code to test the property svgUrl
      //var instance = new Quantimodo.VariableCategory();
      //expect(instance).to.be();
    });

    it('should have the property updated (base name: "updated")', function() {
      // uncomment below and update the code to test the property updated
      //var instance = new Quantimodo.VariableCategory();
      //expect(instance).to.be();
    });

    it('should have the property updatedTime (base name: "updatedTime")', function() {
      // uncomment below and update the code to test the property updatedTime
      //var instance = new Quantimodo.VariableCategory();
      //expect(instance).to.be();
    });

    it('should have the property variableCategoryName (base name: "variableCategoryName")', function() {
      // uncomment below and update the code to test the property variableCategoryName
      //var instance = new Quantimodo.VariableCategory();
      //expect(instance).to.be();
    });

    it('should have the property variableCategoryNameSingular (base name: "variableCategoryNameSingular")', function() {
      // uncomment below and update the code to test the property variableCategoryNameSingular
      //var instance = new Quantimodo.VariableCategory();
      //expect(instance).to.be();
    });

  });

}));
