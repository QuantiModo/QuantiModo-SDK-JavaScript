/**
 * QuantiModo
 * QuantiModo makes it easy to retrieve normalized user data from a wide array of devices and applications. [Learn about QuantiModo](https://quantimo.do), check out our [docs](https://github.com/QuantiModo/docs) or contact us at [help.quantimo.do](https://help.quantimo.do). 
 *
 * OpenAPI spec version: 2.0
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
    factory(root.expect, root.quantimodo-api);
  }
}(this, function(expect, quantimodo-api) {
  'use strict';

  var instance;

  beforeEach(function() {
    instance = new quantimodo-api.Variable();
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

  describe('Variable', function() {
    it('should create an instance of Variable', function() {
      // uncomment below and update the code to test Variable
      //var instane = new quantimodo-api.Variable();
      //expect(instance).to.be.a(quantimodo-api.Variable);
    });

    it('should have the property id (base name: "id")', function() {
      // uncomment below and update the code to test the property id
      //var instane = new quantimodo-api.Variable();
      //expect(instance).to.be();
    });

    it('should have the property name (base name: "name")', function() {
      // uncomment below and update the code to test the property name
      //var instane = new quantimodo-api.Variable();
      //expect(instance).to.be();
    });

    it('should have the property category (base name: "category")', function() {
      // uncomment below and update the code to test the property category
      //var instane = new quantimodo-api.Variable();
      //expect(instance).to.be();
    });

    it('should have the property unitAbbreviatedName (base name: "unitAbbreviatedName")', function() {
      // uncomment below and update the code to test the property unitAbbreviatedName
      //var instane = new quantimodo-api.Variable();
      //expect(instance).to.be();
    });

    it('should have the property abbreviatedUnitId (base name: "abbreviatedUnitId")', function() {
      // uncomment below and update the code to test the property abbreviatedUnitId
      //var instane = new quantimodo-api.Variable();
      //expect(instance).to.be();
    });

    it('should have the property sources (base name: "sources")', function() {
      // uncomment below and update the code to test the property sources
      //var instane = new quantimodo-api.Variable();
      //expect(instance).to.be();
    });

    it('should have the property minimumAllowedValue (base name: "minimumAllowedValue")', function() {
      // uncomment below and update the code to test the property minimumAllowedValue
      //var instane = new quantimodo-api.Variable();
      //expect(instance).to.be();
    });

    it('should have the property maximumAllowedValue (base name: "maximumAllowedValue")', function() {
      // uncomment below and update the code to test the property maximumAllowedValue
      //var instane = new quantimodo-api.Variable();
      //expect(instance).to.be();
    });

    it('should have the property combinationOperation (base name: "combinationOperation")', function() {
      // uncomment below and update the code to test the property combinationOperation
      //var instane = new quantimodo-api.Variable();
      //expect(instance).to.be();
    });

    it('should have the property fillingValue (base name: "fillingValue")', function() {
      // uncomment below and update the code to test the property fillingValue
      //var instane = new quantimodo-api.Variable();
      //expect(instance).to.be();
    });

    it('should have the property joinWith (base name: "joinWith")', function() {
      // uncomment below and update the code to test the property joinWith
      //var instane = new quantimodo-api.Variable();
      //expect(instance).to.be();
    });

    it('should have the property joinedVariables (base name: "joinedVariables")', function() {
      // uncomment below and update the code to test the property joinedVariables
      //var instane = new quantimodo-api.Variable();
      //expect(instance).to.be();
    });

    it('should have the property parent (base name: "parent")', function() {
      // uncomment below and update the code to test the property parent
      //var instane = new quantimodo-api.Variable();
      //expect(instance).to.be();
    });

    it('should have the property subVariables (base name: "subVariables")', function() {
      // uncomment below and update the code to test the property subVariables
      //var instane = new quantimodo-api.Variable();
      //expect(instance).to.be();
    });

    it('should have the property onsetDelay (base name: "onsetDelay")', function() {
      // uncomment below and update the code to test the property onsetDelay
      //var instane = new quantimodo-api.Variable();
      //expect(instance).to.be();
    });

    it('should have the property durationOfAction (base name: "durationOfAction")', function() {
      // uncomment below and update the code to test the property durationOfAction
      //var instane = new quantimodo-api.Variable();
      //expect(instance).to.be();
    });

    it('should have the property earliestMeasurementTime (base name: "earliestMeasurementTime")', function() {
      // uncomment below and update the code to test the property earliestMeasurementTime
      //var instane = new quantimodo-api.Variable();
      //expect(instance).to.be();
    });

    it('should have the property latestMeasurementTime (base name: "latestMeasurementTime")', function() {
      // uncomment below and update the code to test the property latestMeasurementTime
      //var instane = new quantimodo-api.Variable();
      //expect(instance).to.be();
    });

    it('should have the property updated (base name: "updated")', function() {
      // uncomment below and update the code to test the property updated
      //var instane = new quantimodo-api.Variable();
      //expect(instance).to.be();
    });

    it('should have the property causeOnly (base name: "causeOnly")', function() {
      // uncomment below and update the code to test the property causeOnly
      //var instane = new quantimodo-api.Variable();
      //expect(instance).to.be();
    });

    it('should have the property numberOfCorrelations (base name: "numberOfCorrelations")', function() {
      // uncomment below and update the code to test the property numberOfCorrelations
      //var instane = new quantimodo-api.Variable();
      //expect(instance).to.be();
    });

    it('should have the property outcome (base name: "outcome")', function() {
      // uncomment below and update the code to test the property outcome
      //var instane = new quantimodo-api.Variable();
      //expect(instance).to.be();
    });

    it('should have the property rawMeasurementsAtLastAnalysis (base name: "rawMeasurementsAtLastAnalysis")', function() {
      // uncomment below and update the code to test the property rawMeasurementsAtLastAnalysis
      //var instane = new quantimodo-api.Variable();
      //expect(instance).to.be();
    });

    it('should have the property numberOfRawMeasurements (base name: "numberOfRawMeasurements")', function() {
      // uncomment below and update the code to test the property numberOfRawMeasurements
      //var instane = new quantimodo-api.Variable();
      //expect(instance).to.be();
    });

    it('should have the property lastUnit (base name: "lastUnit")', function() {
      // uncomment below and update the code to test the property lastUnit
      //var instane = new quantimodo-api.Variable();
      //expect(instance).to.be();
    });

    it('should have the property lastValue (base name: "lastValue")', function() {
      // uncomment below and update the code to test the property lastValue
      //var instane = new quantimodo-api.Variable();
      //expect(instance).to.be();
    });

    it('should have the property mostCommonValue (base name: "mostCommonValue")', function() {
      // uncomment below and update the code to test the property mostCommonValue
      //var instane = new quantimodo-api.Variable();
      //expect(instance).to.be();
    });

    it('should have the property mostCommonUnit (base name: "mostCommonUnit")', function() {
      // uncomment below and update the code to test the property mostCommonUnit
      //var instane = new quantimodo-api.Variable();
      //expect(instance).to.be();
    });

    it('should have the property lastSource (base name: "lastSource")', function() {
      // uncomment below and update the code to test the property lastSource
      //var instane = new quantimodo-api.Variable();
      //expect(instance).to.be();
    });

    it('should have the property imageUrl (base name: "imageUrl")', function() {
      // uncomment below and update the code to test the property imageUrl
      //var instane = new quantimodo-api.Variable();
      //expect(instance).to.be();
    });

    it('should have the property ionIcon (base name: "ionIcon")', function() {
      // uncomment below and update the code to test the property ionIcon
      //var instane = new quantimodo-api.Variable();
      //expect(instance).to.be();
    });

  });

}));