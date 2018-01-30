/**
 * quantimodo
 * We make it easy to retrieve and analyze normalized user data from a wide array of devices and applications. Check out our [docs and sdk's](https://github.com/QuantiModo/docs) or [contact us](https://help.quantimo.do).
 *
 * OpenAPI spec version: 5.8.112511
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
    instance = new Quantimodo.Measurement();
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

  describe('Measurement', function() {
    it('should create an instance of Measurement', function() {
      // uncomment below and update the code to test Measurement
      //var instane = new Quantimodo.Measurement();
      //expect(instance).to.be.a(Quantimodo.Measurement);
    });

    it('should have the property clientId (base name: "clientId")', function() {
      // uncomment below and update the code to test the property clientId
      //var instane = new Quantimodo.Measurement();
      //expect(instance).to.be();
    });

    it('should have the property connectorId (base name: "connectorId")', function() {
      // uncomment below and update the code to test the property connectorId
      //var instane = new Quantimodo.Measurement();
      //expect(instance).to.be();
    });

    it('should have the property createdAt (base name: "createdAt")', function() {
      // uncomment below and update the code to test the property createdAt
      //var instane = new Quantimodo.Measurement();
      //expect(instance).to.be();
    });

    it('should have the property displayValueAndUnitString (base name: "displayValueAndUnitString")', function() {
      // uncomment below and update the code to test the property displayValueAndUnitString
      //var instane = new Quantimodo.Measurement();
      //expect(instance).to.be();
    });

    it('should have the property iconIcon (base name: "iconIcon")', function() {
      // uncomment below and update the code to test the property iconIcon
      //var instane = new Quantimodo.Measurement();
      //expect(instance).to.be();
    });

    it('should have the property id (base name: "id")', function() {
      // uncomment below and update the code to test the property id
      //var instane = new Quantimodo.Measurement();
      //expect(instance).to.be();
    });

    it('should have the property inputType (base name: "inputType")', function() {
      // uncomment below and update the code to test the property inputType
      //var instane = new Quantimodo.Measurement();
      //expect(instance).to.be();
    });

    it('should have the property ionIcon (base name: "ionIcon")', function() {
      // uncomment below and update the code to test the property ionIcon
      //var instane = new Quantimodo.Measurement();
      //expect(instance).to.be();
    });

    it('should have the property manualTracking (base name: "manualTracking")', function() {
      // uncomment below and update the code to test the property manualTracking
      //var instane = new Quantimodo.Measurement();
      //expect(instance).to.be();
    });

    it('should have the property maximumAllowedValue (base name: "maximumAllowedValue")', function() {
      // uncomment below and update the code to test the property maximumAllowedValue
      //var instane = new Quantimodo.Measurement();
      //expect(instance).to.be();
    });

    it('should have the property minimumAllowedValue (base name: "minimumAllowedValue")', function() {
      // uncomment below and update the code to test the property minimumAllowedValue
      //var instane = new Quantimodo.Measurement();
      //expect(instance).to.be();
    });

    it('should have the property note (base name: "note")', function() {
      // uncomment below and update the code to test the property note
      //var instane = new Quantimodo.Measurement();
      //expect(instance).to.be();
    });

    it('should have the property noteObject (base name: "noteObject")', function() {
      // uncomment below and update the code to test the property noteObject
      //var instane = new Quantimodo.Measurement();
      //expect(instance).to.be();
    });

    it('should have the property noteHtml (base name: "noteHtml")', function() {
      // uncomment below and update the code to test the property noteHtml
      //var instane = new Quantimodo.Measurement();
      //expect(instance).to.be();
    });

    it('should have the property originalUnitId (base name: "originalUnitId")', function() {
      // uncomment below and update the code to test the property originalUnitId
      //var instane = new Quantimodo.Measurement();
      //expect(instance).to.be();
    });

    it('should have the property originalValue (base name: "originalValue")', function() {
      // uncomment below and update the code to test the property originalValue
      //var instane = new Quantimodo.Measurement();
      //expect(instance).to.be();
    });

    it('should have the property pngPath (base name: "pngPath")', function() {
      // uncomment below and update the code to test the property pngPath
      //var instane = new Quantimodo.Measurement();
      //expect(instance).to.be();
    });

    it('should have the property pngUrl (base name: "pngUrl")', function() {
      // uncomment below and update the code to test the property pngUrl
      //var instane = new Quantimodo.Measurement();
      //expect(instance).to.be();
    });

    it('should have the property sourceName (base name: "sourceName")', function() {
      // uncomment below and update the code to test the property sourceName
      //var instane = new Quantimodo.Measurement();
      //expect(instance).to.be();
    });

    it('should have the property startDate (base name: "startDate")', function() {
      // uncomment below and update the code to test the property startDate
      //var instane = new Quantimodo.Measurement();
      //expect(instance).to.be();
    });

    it('should have the property startTimeEpoch (base name: "startTimeEpoch")', function() {
      // uncomment below and update the code to test the property startTimeEpoch
      //var instane = new Quantimodo.Measurement();
      //expect(instance).to.be();
    });

    it('should have the property startTimeString (base name: "startTimeString")', function() {
      // uncomment below and update the code to test the property startTimeString
      //var instane = new Quantimodo.Measurement();
      //expect(instance).to.be();
    });

    it('should have the property svgUrl (base name: "svgUrl")', function() {
      // uncomment below and update the code to test the property svgUrl
      //var instane = new Quantimodo.Measurement();
      //expect(instance).to.be();
    });

    it('should have the property unitAbbreviatedName (base name: "unitAbbreviatedName")', function() {
      // uncomment below and update the code to test the property unitAbbreviatedName
      //var instane = new Quantimodo.Measurement();
      //expect(instance).to.be();
    });

    it('should have the property unitCategoryId (base name: "unitCategoryId")', function() {
      // uncomment below and update the code to test the property unitCategoryId
      //var instane = new Quantimodo.Measurement();
      //expect(instance).to.be();
    });

    it('should have the property unitCategoryName (base name: "unitCategoryName")', function() {
      // uncomment below and update the code to test the property unitCategoryName
      //var instane = new Quantimodo.Measurement();
      //expect(instance).to.be();
    });

    it('should have the property unitId (base name: "unitId")', function() {
      // uncomment below and update the code to test the property unitId
      //var instane = new Quantimodo.Measurement();
      //expect(instance).to.be();
    });

    it('should have the property unitName (base name: "unitName")', function() {
      // uncomment below and update the code to test the property unitName
      //var instane = new Quantimodo.Measurement();
      //expect(instance).to.be();
    });

    it('should have the property updatedAt (base name: "updatedAt")', function() {
      // uncomment below and update the code to test the property updatedAt
      //var instane = new Quantimodo.Measurement();
      //expect(instance).to.be();
    });

    it('should have the property url (base name: "url")', function() {
      // uncomment below and update the code to test the property url
      //var instane = new Quantimodo.Measurement();
      //expect(instance).to.be();
    });

    it('should have the property userVariableUnitAbbreviatedName (base name: "userVariableUnitAbbreviatedName")', function() {
      // uncomment below and update the code to test the property userVariableUnitAbbreviatedName
      //var instane = new Quantimodo.Measurement();
      //expect(instance).to.be();
    });

    it('should have the property userVariableUnitCategoryId (base name: "userVariableUnitCategoryId")', function() {
      // uncomment below and update the code to test the property userVariableUnitCategoryId
      //var instane = new Quantimodo.Measurement();
      //expect(instance).to.be();
    });

    it('should have the property userVariableUnitCategoryName (base name: "userVariableUnitCategoryName")', function() {
      // uncomment below and update the code to test the property userVariableUnitCategoryName
      //var instane = new Quantimodo.Measurement();
      //expect(instance).to.be();
    });

    it('should have the property userVariableUnitId (base name: "userVariableUnitId")', function() {
      // uncomment below and update the code to test the property userVariableUnitId
      //var instane = new Quantimodo.Measurement();
      //expect(instance).to.be();
    });

    it('should have the property userVariableUnitName (base name: "userVariableUnitName")', function() {
      // uncomment below and update the code to test the property userVariableUnitName
      //var instane = new Quantimodo.Measurement();
      //expect(instance).to.be();
    });

    it('should have the property userVariableVariableCategoryId (base name: "userVariableVariableCategoryId")', function() {
      // uncomment below and update the code to test the property userVariableVariableCategoryId
      //var instane = new Quantimodo.Measurement();
      //expect(instance).to.be();
    });

    it('should have the property userVariableVariableCategoryName (base name: "userVariableVariableCategoryName")', function() {
      // uncomment below and update the code to test the property userVariableVariableCategoryName
      //var instane = new Quantimodo.Measurement();
      //expect(instance).to.be();
    });

    it('should have the property valence (base name: "valence")', function() {
      // uncomment below and update the code to test the property valence
      //var instane = new Quantimodo.Measurement();
      //expect(instance).to.be();
    });

    it('should have the property value (base name: "value")', function() {
      // uncomment below and update the code to test the property value
      //var instane = new Quantimodo.Measurement();
      //expect(instance).to.be();
    });

    it('should have the property variableCategoryId (base name: "variableCategoryId")', function() {
      // uncomment below and update the code to test the property variableCategoryId
      //var instane = new Quantimodo.Measurement();
      //expect(instance).to.be();
    });

    it('should have the property variableCategoryImageUrl (base name: "variableCategoryImageUrl")', function() {
      // uncomment below and update the code to test the property variableCategoryImageUrl
      //var instane = new Quantimodo.Measurement();
      //expect(instance).to.be();
    });

    it('should have the property variableCategoryName (base name: "variableCategoryName")', function() {
      // uncomment below and update the code to test the property variableCategoryName
      //var instane = new Quantimodo.Measurement();
      //expect(instance).to.be();
    });

    it('should have the property variableDescription (base name: "variableDescription")', function() {
      // uncomment below and update the code to test the property variableDescription
      //var instane = new Quantimodo.Measurement();
      //expect(instance).to.be();
    });

    it('should have the property variableId (base name: "variableId")', function() {
      // uncomment below and update the code to test the property variableId
      //var instane = new Quantimodo.Measurement();
      //expect(instance).to.be();
    });

    it('should have the property variableName (base name: "variableName")', function() {
      // uncomment below and update the code to test the property variableName
      //var instane = new Quantimodo.Measurement();
      //expect(instance).to.be();
    });

  });

}));
