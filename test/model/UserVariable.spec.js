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
    instance = new Quantimodo.UserVariable();
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

  describe('UserVariable', function() {
    it('should create an instance of UserVariable', function() {
      // uncomment below and update the code to test UserVariable
      //var instane = new Quantimodo.UserVariable();
      //expect(instance).to.be.a(Quantimodo.UserVariable);
    });

    it('should have the property parentId (base name: "parentId")', function() {
      // uncomment below and update the code to test the property parentId
      //var instane = new Quantimodo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property userId (base name: "userId")', function() {
      // uncomment below and update the code to test the property userId
      //var instane = new Quantimodo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property clientId (base name: "clientId")', function() {
      // uncomment below and update the code to test the property clientId
      //var instane = new Quantimodo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property variableId (base name: "variableId")', function() {
      // uncomment below and update the code to test the property variableId
      //var instane = new Quantimodo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property defaultUnitId (base name: "defaultUnitId")', function() {
      // uncomment below and update the code to test the property defaultUnitId
      //var instane = new Quantimodo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property minimumAllowedValue (base name: "minimumAllowedValue")', function() {
      // uncomment below and update the code to test the property minimumAllowedValue
      //var instane = new Quantimodo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property maximumAllowedValue (base name: "maximumAllowedValue")', function() {
      // uncomment below and update the code to test the property maximumAllowedValue
      //var instane = new Quantimodo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property fillingValue (base name: "fillingValue")', function() {
      // uncomment below and update the code to test the property fillingValue
      //var instane = new Quantimodo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property joinWith (base name: "joinWith")', function() {
      // uncomment below and update the code to test the property joinWith
      //var instane = new Quantimodo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property onsetDelay (base name: "onsetDelay")', function() {
      // uncomment below and update the code to test the property onsetDelay
      //var instane = new Quantimodo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property durationOfAction (base name: "durationOfAction")', function() {
      // uncomment below and update the code to test the property durationOfAction
      //var instane = new Quantimodo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property variableCategoryId (base name: "variableCategoryId")', function() {
      // uncomment below and update the code to test the property variableCategoryId
      //var instane = new Quantimodo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property updated (base name: "updated")', function() {
      // uncomment below and update the code to test the property updated
      //var instane = new Quantimodo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property _public (base name: "public")', function() {
      // uncomment below and update the code to test the property _public
      //var instane = new Quantimodo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property causeOnly (base name: "causeOnly")', function() {
      // uncomment below and update the code to test the property causeOnly
      //var instane = new Quantimodo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property fillingType (base name: "fillingType")', function() {
      // uncomment below and update the code to test the property fillingType
      //var instane = new Quantimodo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property numberOfMeasurements (base name: "numberOfMeasurements")', function() {
      // uncomment below and update the code to test the property numberOfMeasurements
      //var instane = new Quantimodo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property numberOfProcessedDailyMeasurements (base name: "numberOfProcessedDailyMeasurements")', function() {
      // uncomment below and update the code to test the property numberOfProcessedDailyMeasurements
      //var instane = new Quantimodo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property measurementsAtLastAnalysis (base name: "measurementsAtLastAnalysis")', function() {
      // uncomment below and update the code to test the property measurementsAtLastAnalysis
      //var instane = new Quantimodo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property lastUnitId (base name: "lastUnitId")', function() {
      // uncomment below and update the code to test the property lastUnitId
      //var instane = new Quantimodo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property lastOriginalUnitId (base name: "lastOriginalUnitId")', function() {
      // uncomment below and update the code to test the property lastOriginalUnitId
      //var instane = new Quantimodo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property lastValue (base name: "lastValue")', function() {
      // uncomment below and update the code to test the property lastValue
      //var instane = new Quantimodo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property lastOriginalValue (base name: "lastOriginalValue")', function() {
      // uncomment below and update the code to test the property lastOriginalValue
      //var instane = new Quantimodo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property numberOfCorrelations (base name: "numberOfCorrelations")', function() {
      // uncomment below and update the code to test the property numberOfCorrelations
      //var instane = new Quantimodo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property status (base name: "status")', function() {
      // uncomment below and update the code to test the property status
      //var instane = new Quantimodo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property errorMessage (base name: "errorMessage")', function() {
      // uncomment below and update the code to test the property errorMessage
      //var instane = new Quantimodo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property lastSuccessfulUpdateTime (base name: "lastSuccessfulUpdateTime")', function() {
      // uncomment below and update the code to test the property lastSuccessfulUpdateTime
      //var instane = new Quantimodo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property standardDeviation (base name: "standard_deviation")', function() {
      // uncomment below and update the code to test the property standardDeviation
      //var instane = new Quantimodo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property variance (base name: "variance")', function() {
      // uncomment below and update the code to test the property variance
      //var instane = new Quantimodo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property minimumRecordedValue (base name: "minimumRecordedValue")', function() {
      // uncomment below and update the code to test the property minimumRecordedValue
      //var instane = new Quantimodo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property maximumRecordedDailyValue (base name: "maximumRecordedDailyValue")', function() {
      // uncomment below and update the code to test the property maximumRecordedDailyValue
      //var instane = new Quantimodo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property mean (base name: "mean")', function() {
      // uncomment below and update the code to test the property mean
      //var instane = new Quantimodo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property median (base name: "median")', function() {
      // uncomment below and update the code to test the property median
      //var instane = new Quantimodo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property mostCommonUnitId (base name: "mostCommonUnitId")', function() {
      // uncomment below and update the code to test the property mostCommonUnitId
      //var instane = new Quantimodo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property mostCommonValue (base name: "mostCommonValue")', function() {
      // uncomment below and update the code to test the property mostCommonValue
      //var instane = new Quantimodo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property numberOfUniqueDailyValues (base name: "numberOfUniqueDailyValues")', function() {
      // uncomment below and update the code to test the property numberOfUniqueDailyValues
      //var instane = new Quantimodo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property numberOfChanges (base name: "numberOfChanges")', function() {
      // uncomment below and update the code to test the property numberOfChanges
      //var instane = new Quantimodo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property skewness (base name: "skewness")', function() {
      // uncomment below and update the code to test the property skewness
      //var instane = new Quantimodo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property kurtosis (base name: "kurtosis")', function() {
      // uncomment below and update the code to test the property kurtosis
      //var instane = new Quantimodo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property latitude (base name: "latitude")', function() {
      // uncomment below and update the code to test the property latitude
      //var instane = new Quantimodo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property longitude (base name: "longitude")', function() {
      // uncomment below and update the code to test the property longitude
      //var instane = new Quantimodo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property location (base name: "location")', function() {
      // uncomment below and update the code to test the property location
      //var instane = new Quantimodo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property experimentStartTime (base name: "experimentStartTime")', function() {
      // uncomment below and update the code to test the property experimentStartTime
      //var instane = new Quantimodo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property experimentEndTime (base name: "experimentEndTime")', function() {
      // uncomment below and update the code to test the property experimentEndTime
      //var instane = new Quantimodo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property createdAt (base name: "createdAt")', function() {
      // uncomment below and update the code to test the property createdAt
      //var instane = new Quantimodo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property updatedAt (base name: "updatedAt")', function() {
      // uncomment below and update the code to test the property updatedAt
      //var instane = new Quantimodo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property outcome (base name: "outcome")', function() {
      // uncomment below and update the code to test the property outcome
      //var instane = new Quantimodo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property sources (base name: "sources")', function() {
      // uncomment below and update the code to test the property sources
      //var instane = new Quantimodo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property earliestSourceTime (base name: "earliestSourceTime")', function() {
      // uncomment below and update the code to test the property earliestSourceTime
      //var instane = new Quantimodo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property latestSourceTime (base name: "latestSourceTime")', function() {
      // uncomment below and update the code to test the property latestSourceTime
      //var instane = new Quantimodo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property earliestMeasurementTime (base name: "earliestMeasurementTime")', function() {
      // uncomment below and update the code to test the property earliestMeasurementTime
      //var instane = new Quantimodo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property latestMeasurementTime (base name: "latestMeasurementTime")', function() {
      // uncomment below and update the code to test the property latestMeasurementTime
      //var instane = new Quantimodo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property earliestFillingTime (base name: "earliestFillingTime")', function() {
      // uncomment below and update the code to test the property earliestFillingTime
      //var instane = new Quantimodo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property latestFillingTime (base name: "latestFillingTime")', function() {
      // uncomment below and update the code to test the property latestFillingTime
      //var instane = new Quantimodo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property imageUrl (base name: "imageUrl")', function() {
      // uncomment below and update the code to test the property imageUrl
      //var instane = new Quantimodo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property ionIcon (base name: "ionIcon")', function() {
      // uncomment below and update the code to test the property ionIcon
      //var instane = new Quantimodo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property id (base name: "id")', function() {
      // uncomment below and update the code to test the property id
      //var instane = new Quantimodo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property name (base name: "name")', function() {
      // uncomment below and update the code to test the property name
      //var instane = new Quantimodo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property userVariableDefaultUnitId (base name: "userVariableDefaultUnitId")', function() {
      // uncomment below and update the code to test the property userVariableDefaultUnitId
      //var instane = new Quantimodo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property userVariableFillingValue (base name: "userVariableFillingValue")', function() {
      // uncomment below and update the code to test the property userVariableFillingValue
      //var instane = new Quantimodo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property latestUserMeasurementTime (base name: "latestUserMeasurementTime")', function() {
      // uncomment below and update the code to test the property latestUserMeasurementTime
      //var instane = new Quantimodo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property maximumRecordedValue (base name: "maximumRecordedValue")', function() {
      // uncomment below and update the code to test the property maximumRecordedValue
      //var instane = new Quantimodo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property rawMeasurementsAtLastAnalysis (base name: "rawMeasurementsAtLastAnalysis")', function() {
      // uncomment below and update the code to test the property rawMeasurementsAtLastAnalysis
      //var instane = new Quantimodo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property numberOfRawMeasurements (base name: "numberOfRawMeasurements")', function() {
      // uncomment below and update the code to test the property numberOfRawMeasurements
      //var instane = new Quantimodo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property numberOfUserCorrelationsAsCause (base name: "numberOfUserCorrelationsAsCause")', function() {
      // uncomment below and update the code to test the property numberOfUserCorrelationsAsCause
      //var instane = new Quantimodo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property standardDeviation (base name: "standardDeviation")', function() {
      // uncomment below and update the code to test the property standardDeviation
      //var instane = new Quantimodo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property userVariableVariableCategoryId (base name: "userVariableVariableCategoryId")', function() {
      // uncomment below and update the code to test the property userVariableVariableCategoryId
      //var instane = new Quantimodo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property variableFillingValue (base name: "variableFillingValue")', function() {
      // uncomment below and update the code to test the property variableFillingValue
      //var instane = new Quantimodo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property mostCommonOriginalUnitId (base name: "mostCommonOriginalUnitId")', function() {
      // uncomment below and update the code to test the property mostCommonOriginalUnitId
      //var instane = new Quantimodo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property numberOfAggregateCorrelationsAsCause (base name: "numberOfAggregateCorrelationsAsCause")', function() {
      // uncomment below and update the code to test the property numberOfAggregateCorrelationsAsCause
      //var instane = new Quantimodo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property numberOfUserVariables (base name: "numberOfUserVariables")', function() {
      // uncomment below and update the code to test the property numberOfUserVariables
      //var instane = new Quantimodo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property secondMostCommonValue (base name: "secondMostCommonValue")', function() {
      // uncomment below and update the code to test the property secondMostCommonValue
      //var instane = new Quantimodo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property updatedTime (base name: "updatedTime")', function() {
      // uncomment below and update the code to test the property updatedTime
      //var instane = new Quantimodo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property commonVariableUpdatedAt (base name: "commonVariableUpdatedAt")', function() {
      // uncomment below and update the code to test the property commonVariableUpdatedAt
      //var instane = new Quantimodo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property userVariableUpdatedAt (base name: "userVariableUpdatedAt")', function() {
      // uncomment below and update the code to test the property userVariableUpdatedAt
      //var instane = new Quantimodo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property combinationOperation (base name: "combinationOperation")', function() {
      // uncomment below and update the code to test the property combinationOperation
      //var instane = new Quantimodo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property variableCategoryName (base name: "variableCategoryName")', function() {
      // uncomment below and update the code to test the property variableCategoryName
      //var instane = new Quantimodo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property svgUrl (base name: "svgUrl")', function() {
      // uncomment below and update the code to test the property svgUrl
      //var instane = new Quantimodo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property pngUrl (base name: "pngUrl")', function() {
      // uncomment below and update the code to test the property pngUrl
      //var instane = new Quantimodo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property pngPath (base name: "pngPath")', function() {
      // uncomment below and update the code to test the property pngPath
      //var instane = new Quantimodo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property variableCategoryImageUrl (base name: "variableCategoryImageUrl")', function() {
      // uncomment below and update the code to test the property variableCategoryImageUrl
      //var instane = new Quantimodo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property manualTracking (base name: "manualTracking")', function() {
      // uncomment below and update the code to test the property manualTracking
      //var instane = new Quantimodo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property userVariableVariableCategoryName (base name: "userVariableVariableCategoryName")', function() {
      // uncomment below and update the code to test the property userVariableVariableCategoryName
      //var instane = new Quantimodo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property meanInUserVariableDefaultUnit (base name: "meanInUserVariableDefaultUnit")', function() {
      // uncomment below and update the code to test the property meanInUserVariableDefaultUnit
      //var instane = new Quantimodo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property secondMostCommonValueInUserVariableDefaultUnit (base name: "secondMostCommonValueInUserVariableDefaultUnit")', function() {
      // uncomment below and update the code to test the property secondMostCommonValueInUserVariableDefaultUnit
      //var instane = new Quantimodo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property unitId (base name: "unitId")', function() {
      // uncomment below and update the code to test the property unitId
      //var instane = new Quantimodo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property unitName (base name: "unitName")', function() {
      // uncomment below and update the code to test the property unitName
      //var instane = new Quantimodo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property unitAbbreviatedName (base name: "unitAbbreviatedName")', function() {
      // uncomment below and update the code to test the property unitAbbreviatedName
      //var instane = new Quantimodo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property unitCategoryId (base name: "unitCategoryId")', function() {
      // uncomment below and update the code to test the property unitCategoryId
      //var instane = new Quantimodo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property unitCategoryName (base name: "unitCategoryName")', function() {
      // uncomment below and update the code to test the property unitCategoryName
      //var instane = new Quantimodo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property defaultUnitName (base name: "defaultUnitName")', function() {
      // uncomment below and update the code to test the property defaultUnitName
      //var instane = new Quantimodo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property defaultUnitAbbreviatedName (base name: "defaultUnitAbbreviatedName")', function() {
      // uncomment below and update the code to test the property defaultUnitAbbreviatedName
      //var instane = new Quantimodo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property defaultUnitCategoryId (base name: "defaultUnitCategoryId")', function() {
      // uncomment below and update the code to test the property defaultUnitCategoryId
      //var instane = new Quantimodo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property defaultUnitCategoryName (base name: "defaultUnitCategoryName")', function() {
      // uncomment below and update the code to test the property defaultUnitCategoryName
      //var instane = new Quantimodo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property userVariableDefaultUnitName (base name: "userVariableDefaultUnitName")', function() {
      // uncomment below and update the code to test the property userVariableDefaultUnitName
      //var instane = new Quantimodo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property userVariableDefaultUnitAbbreviatedName (base name: "userVariableDefaultUnitAbbreviatedName")', function() {
      // uncomment below and update the code to test the property userVariableDefaultUnitAbbreviatedName
      //var instane = new Quantimodo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property userVariableDefaultUnitCategoryId (base name: "userVariableDefaultUnitCategoryId")', function() {
      // uncomment below and update the code to test the property userVariableDefaultUnitCategoryId
      //var instane = new Quantimodo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property userVariableDefaultUnitCategoryName (base name: "userVariableDefaultUnitCategoryName")', function() {
      // uncomment below and update the code to test the property userVariableDefaultUnitCategoryName
      //var instane = new Quantimodo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property variableName (base name: "variableName")', function() {
      // uncomment below and update the code to test the property variableName
      //var instane = new Quantimodo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property inputType (base name: "inputType")', function() {
      // uncomment below and update the code to test the property inputType
      //var instane = new Quantimodo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property durationOfActionInHours (base name: "durationOfActionInHours")', function() {
      // uncomment below and update the code to test the property durationOfActionInHours
      //var instane = new Quantimodo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property onsetDelayInHours (base name: "onsetDelayInHours")', function() {
      // uncomment below and update the code to test the property onsetDelayInHours
      //var instane = new Quantimodo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property chartsLinkStatic (base name: "chartsLinkStatic")', function() {
      // uncomment below and update the code to test the property chartsLinkStatic
      //var instane = new Quantimodo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property chartsLinkDynamic (base name: "chartsLinkDynamic")', function() {
      // uncomment below and update the code to test the property chartsLinkDynamic
      //var instane = new Quantimodo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property chartsLinkFacebook (base name: "chartsLinkFacebook")', function() {
      // uncomment below and update the code to test the property chartsLinkFacebook
      //var instane = new Quantimodo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property chartsLinkGoogle (base name: "chartsLinkGoogle")', function() {
      // uncomment below and update the code to test the property chartsLinkGoogle
      //var instane = new Quantimodo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property chartsLinkTwitter (base name: "chartsLinkTwitter")', function() {
      // uncomment below and update the code to test the property chartsLinkTwitter
      //var instane = new Quantimodo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property chartsLinkEmail (base name: "chartsLinkEmail")', function() {
      // uncomment below and update the code to test the property chartsLinkEmail
      //var instane = new Quantimodo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property lastProcessedDailyValue (base name: "lastProcessedDailyValue")', function() {
      // uncomment below and update the code to test the property lastProcessedDailyValue
      //var instane = new Quantimodo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property userVariableMostCommonConnectorId (base name: "userVariableMostCommonConnectorId")', function() {
      // uncomment below and update the code to test the property userVariableMostCommonConnectorId
      //var instane = new Quantimodo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property secondToLastValue (base name: "secondToLastValue")', function() {
      // uncomment below and update the code to test the property secondToLastValue
      //var instane = new Quantimodo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property thirdToLastValue (base name: "thirdToLastValue")', function() {
      // uncomment below and update the code to test the property thirdToLastValue
      //var instane = new Quantimodo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property commonVariableMostCommonConnectorId (base name: "commonVariableMostCommonConnectorId")', function() {
      // uncomment below and update the code to test the property commonVariableMostCommonConnectorId
      //var instane = new Quantimodo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property mostCommonConnectorId (base name: "mostCommonConnectorId")', function() {
      // uncomment below and update the code to test the property mostCommonConnectorId
      //var instane = new Quantimodo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property lastValueInUserVariableDefaultUnit (base name: "lastValueInUserVariableDefaultUnit")', function() {
      // uncomment below and update the code to test the property lastValueInUserVariableDefaultUnit
      //var instane = new Quantimodo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property secondToLastValueInUserVariableDefaultUnit (base name: "secondToLastValueInUserVariableDefaultUnit")', function() {
      // uncomment below and update the code to test the property secondToLastValueInUserVariableDefaultUnit
      //var instane = new Quantimodo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property thirdToLastValueInUserVariableDefaultUnit (base name: "thirdToLastValueInUserVariableDefaultUnit")', function() {
      // uncomment below and update the code to test the property thirdToLastValueInUserVariableDefaultUnit
      //var instane = new Quantimodo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property mostCommonValueInUserVariableDefaultUnit (base name: "mostCommonValueInUserVariableDefaultUnit")', function() {
      // uncomment below and update the code to test the property mostCommonValueInUserVariableDefaultUnit
      //var instane = new Quantimodo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property numberOfUserCorrelationsAsEffect (base name: "numberOfUserCorrelationsAsEffect")', function() {
      // uncomment below and update the code to test the property numberOfUserCorrelationsAsEffect
      //var instane = new Quantimodo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property numberOfAggregateCorrelationsAsEffect (base name: "numberOfAggregateCorrelationsAsEffect")', function() {
      // uncomment below and update the code to test the property numberOfAggregateCorrelationsAsEffect
      //var instane = new Quantimodo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property thirdMostCommonValue (base name: "thirdMostCommonValue")', function() {
      // uncomment below and update the code to test the property thirdMostCommonValue
      //var instane = new Quantimodo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property thirdMostCommonValueInUserVariableDefaultUnit (base name: "thirdMostCommonValueInUserVariableDefaultUnit")', function() {
      // uncomment below and update the code to test the property thirdMostCommonValueInUserVariableDefaultUnit
      //var instane = new Quantimodo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property outcomeOfInterest (base name: "outcomeOfInterest")', function() {
      // uncomment below and update the code to test the property outcomeOfInterest
      //var instane = new Quantimodo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property description (base name: "description")', function() {
      // uncomment below and update the code to test the property description
      //var instane = new Quantimodo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property valence (base name: "valence")', function() {
      // uncomment below and update the code to test the property valence
      //var instane = new Quantimodo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property shareUserMeasurements (base name: "shareUserMeasurements")', function() {
      // uncomment below and update the code to test the property shareUserMeasurements
      //var instane = new Quantimodo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property numberOfUniqueValues (base name: "numberOfUniqueValues")', function() {
      // uncomment below and update the code to test the property numberOfUniqueValues
      //var instane = new Quantimodo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property numberOfTrackingReminders (base name: "numberOfTrackingReminders")', function() {
      // uncomment below and update the code to test the property numberOfTrackingReminders
      //var instane = new Quantimodo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property iconIcon (base name: "iconIcon")', function() {
      // uncomment below and update the code to test the property iconIcon
      //var instane = new Quantimodo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property commonAlias (base name: "commonAlias")', function() {
      // uncomment below and update the code to test the property commonAlias
      //var instane = new Quantimodo.UserVariable();
      //expect(instance).to.be();
    });

  });

}));
