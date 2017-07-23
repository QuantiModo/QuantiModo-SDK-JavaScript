/**
 * QuantiModo
 * QuantiModo makes it easy to retrieve normalized user data from a wide array of devices and applications. [Learn about QuantiModo](https://quantimo.do), check out our [docs](https://github.com/QuantiModo/docs) or contact us at [help.quantimo.do](https://help.quantimo.do). 
 *
 * OpenAPI spec version: 5.8.5
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
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
    factory(root.expect, root.QuantiModo);
  }
}(this, function(expect, QuantiModo) {
  'use strict';

  var instance;

  beforeEach(function() {
    instance = new QuantiModo.UserVariable();
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
      //var instane = new QuantiModo.UserVariable();
      //expect(instance).to.be.a(QuantiModo.UserVariable);
    });

    it('should have the property parentId (base name: "parentId")', function() {
      // uncomment below and update the code to test the property parentId
      //var instane = new QuantiModo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property userId (base name: "userId")', function() {
      // uncomment below and update the code to test the property userId
      //var instane = new QuantiModo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property clientId (base name: "clientId")', function() {
      // uncomment below and update the code to test the property clientId
      //var instane = new QuantiModo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property variableId (base name: "variableId")', function() {
      // uncomment below and update the code to test the property variableId
      //var instane = new QuantiModo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property defaultUnitId (base name: "defaultUnitId")', function() {
      // uncomment below and update the code to test the property defaultUnitId
      //var instane = new QuantiModo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property minimumAllowedValue (base name: "minimumAllowedValue")', function() {
      // uncomment below and update the code to test the property minimumAllowedValue
      //var instane = new QuantiModo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property maximumAllowedValue (base name: "maximumAllowedValue")', function() {
      // uncomment below and update the code to test the property maximumAllowedValue
      //var instane = new QuantiModo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property fillingValue (base name: "fillingValue")', function() {
      // uncomment below and update the code to test the property fillingValue
      //var instane = new QuantiModo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property joinWith (base name: "joinWith")', function() {
      // uncomment below and update the code to test the property joinWith
      //var instane = new QuantiModo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property onsetDelay (base name: "onsetDelay")', function() {
      // uncomment below and update the code to test the property onsetDelay
      //var instane = new QuantiModo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property durationOfAction (base name: "durationOfAction")', function() {
      // uncomment below and update the code to test the property durationOfAction
      //var instane = new QuantiModo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property variableCategoryId (base name: "variableCategoryId")', function() {
      // uncomment below and update the code to test the property variableCategoryId
      //var instane = new QuantiModo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property updated (base name: "updated")', function() {
      // uncomment below and update the code to test the property updated
      //var instane = new QuantiModo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property _public (base name: "public")', function() {
      // uncomment below and update the code to test the property _public
      //var instane = new QuantiModo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property causeOnly (base name: "causeOnly")', function() {
      // uncomment below and update the code to test the property causeOnly
      //var instane = new QuantiModo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property fillingType (base name: "fillingType")', function() {
      // uncomment below and update the code to test the property fillingType
      //var instane = new QuantiModo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property numberOfMeasurements (base name: "numberOfMeasurements")', function() {
      // uncomment below and update the code to test the property numberOfMeasurements
      //var instane = new QuantiModo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property numberOfProcessedDailyMeasurements (base name: "numberOfProcessedDailyMeasurements")', function() {
      // uncomment below and update the code to test the property numberOfProcessedDailyMeasurements
      //var instane = new QuantiModo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property measurementsAtLastAnalysis (base name: "measurementsAtLastAnalysis")', function() {
      // uncomment below and update the code to test the property measurementsAtLastAnalysis
      //var instane = new QuantiModo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property lastUnitId (base name: "lastUnitId")', function() {
      // uncomment below and update the code to test the property lastUnitId
      //var instane = new QuantiModo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property lastOriginalUnitId (base name: "lastOriginalUnitId")', function() {
      // uncomment below and update the code to test the property lastOriginalUnitId
      //var instane = new QuantiModo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property lastValue (base name: "lastValue")', function() {
      // uncomment below and update the code to test the property lastValue
      //var instane = new QuantiModo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property lastOriginalValue (base name: "lastOriginalValue")', function() {
      // uncomment below and update the code to test the property lastOriginalValue
      //var instane = new QuantiModo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property numberOfCorrelations (base name: "numberOfCorrelations")', function() {
      // uncomment below and update the code to test the property numberOfCorrelations
      //var instane = new QuantiModo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property status (base name: "status")', function() {
      // uncomment below and update the code to test the property status
      //var instane = new QuantiModo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property errorMessage (base name: "errorMessage")', function() {
      // uncomment below and update the code to test the property errorMessage
      //var instane = new QuantiModo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property lastSuccessfulUpdateTime (base name: "lastSuccessfulUpdateTime")', function() {
      // uncomment below and update the code to test the property lastSuccessfulUpdateTime
      //var instane = new QuantiModo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property standardDeviation (base name: "standard_deviation")', function() {
      // uncomment below and update the code to test the property standardDeviation
      //var instane = new QuantiModo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property variance (base name: "variance")', function() {
      // uncomment below and update the code to test the property variance
      //var instane = new QuantiModo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property minimumRecordedValue (base name: "minimumRecordedValue")', function() {
      // uncomment below and update the code to test the property minimumRecordedValue
      //var instane = new QuantiModo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property maximumRecordedDailyValue (base name: "maximumRecordedDailyValue")', function() {
      // uncomment below and update the code to test the property maximumRecordedDailyValue
      //var instane = new QuantiModo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property mean (base name: "mean")', function() {
      // uncomment below and update the code to test the property mean
      //var instane = new QuantiModo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property median (base name: "median")', function() {
      // uncomment below and update the code to test the property median
      //var instane = new QuantiModo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property mostCommonUnitId (base name: "mostCommonUnitId")', function() {
      // uncomment below and update the code to test the property mostCommonUnitId
      //var instane = new QuantiModo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property mostCommonValue (base name: "mostCommonValue")', function() {
      // uncomment below and update the code to test the property mostCommonValue
      //var instane = new QuantiModo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property numberOfUniqueDailyValues (base name: "numberOfUniqueDailyValues")', function() {
      // uncomment below and update the code to test the property numberOfUniqueDailyValues
      //var instane = new QuantiModo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property numberOfChanges (base name: "numberOfChanges")', function() {
      // uncomment below and update the code to test the property numberOfChanges
      //var instane = new QuantiModo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property skewness (base name: "skewness")', function() {
      // uncomment below and update the code to test the property skewness
      //var instane = new QuantiModo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property kurtosis (base name: "kurtosis")', function() {
      // uncomment below and update the code to test the property kurtosis
      //var instane = new QuantiModo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property latitude (base name: "latitude")', function() {
      // uncomment below and update the code to test the property latitude
      //var instane = new QuantiModo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property longitude (base name: "longitude")', function() {
      // uncomment below and update the code to test the property longitude
      //var instane = new QuantiModo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property location (base name: "location")', function() {
      // uncomment below and update the code to test the property location
      //var instane = new QuantiModo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property experimentStartTime (base name: "experimentStartTime")', function() {
      // uncomment below and update the code to test the property experimentStartTime
      //var instane = new QuantiModo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property experimentEndTime (base name: "experimentEndTime")', function() {
      // uncomment below and update the code to test the property experimentEndTime
      //var instane = new QuantiModo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property createdAt (base name: "createdAt")', function() {
      // uncomment below and update the code to test the property createdAt
      //var instane = new QuantiModo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property updatedAt (base name: "updatedAt")', function() {
      // uncomment below and update the code to test the property updatedAt
      //var instane = new QuantiModo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property outcome (base name: "outcome")', function() {
      // uncomment below and update the code to test the property outcome
      //var instane = new QuantiModo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property sources (base name: "sources")', function() {
      // uncomment below and update the code to test the property sources
      //var instane = new QuantiModo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property earliestSourceTime (base name: "earliestSourceTime")', function() {
      // uncomment below and update the code to test the property earliestSourceTime
      //var instane = new QuantiModo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property latestSourceTime (base name: "latestSourceTime")', function() {
      // uncomment below and update the code to test the property latestSourceTime
      //var instane = new QuantiModo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property earliestMeasurementTime (base name: "earliestMeasurementTime")', function() {
      // uncomment below and update the code to test the property earliestMeasurementTime
      //var instane = new QuantiModo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property latestMeasurementTime (base name: "latestMeasurementTime")', function() {
      // uncomment below and update the code to test the property latestMeasurementTime
      //var instane = new QuantiModo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property earliestFillingTime (base name: "earliestFillingTime")', function() {
      // uncomment below and update the code to test the property earliestFillingTime
      //var instane = new QuantiModo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property latestFillingTime (base name: "latestFillingTime")', function() {
      // uncomment below and update the code to test the property latestFillingTime
      //var instane = new QuantiModo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property imageUrl (base name: "imageUrl")', function() {
      // uncomment below and update the code to test the property imageUrl
      //var instane = new QuantiModo.UserVariable();
      //expect(instance).to.be();
    });

    it('should have the property ionIcon (base name: "ionIcon")', function() {
      // uncomment below and update the code to test the property ionIcon
      //var instane = new QuantiModo.UserVariable();
      //expect(instance).to.be();
    });

  });

}));
