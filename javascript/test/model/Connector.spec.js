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
    instance = new quantimodo-api.Connector();
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

  describe('Connector', function() {
    it('should create an instance of Connector', function() {
      // uncomment below and update the code to test Connector
      //var instane = new quantimodo-api.Connector();
      //expect(instance).to.be.a(quantimodo-api.Connector);
    });

    it('should have the property id (base name: "id")', function() {
      // uncomment below and update the code to test the property id
      //var instane = new quantimodo-api.Connector();
      //expect(instance).to.be();
    });

    it('should have the property name (base name: "name")', function() {
      // uncomment below and update the code to test the property name
      //var instane = new quantimodo-api.Connector();
      //expect(instance).to.be();
    });

    it('should have the property displayName (base name: "displayName")', function() {
      // uncomment below and update the code to test the property displayName
      //var instane = new quantimodo-api.Connector();
      //expect(instance).to.be();
    });

    it('should have the property image (base name: "image")', function() {
      // uncomment below and update the code to test the property image
      //var instane = new quantimodo-api.Connector();
      //expect(instance).to.be();
    });

    it('should have the property getItUrl (base name: "getItUrl")', function() {
      // uncomment below and update the code to test the property getItUrl
      //var instane = new quantimodo-api.Connector();
      //expect(instance).to.be();
    });

    it('should have the property connected (base name: "connected")', function() {
      // uncomment below and update the code to test the property connected
      //var instane = new quantimodo-api.Connector();
      //expect(instance).to.be();
    });

    it('should have the property connectInstructions (base name: "connectInstructions")', function() {
      // uncomment below and update the code to test the property connectInstructions
      //var instane = new quantimodo-api.Connector();
      //expect(instance).to.be();
    });

    it('should have the property lastUpdate (base name: "lastUpdate")', function() {
      // uncomment below and update the code to test the property lastUpdate
      //var instane = new quantimodo-api.Connector();
      //expect(instance).to.be();
    });

    it('should have the property totalMeasurementsInLastUpdate (base name: "totalMeasurementsInLastUpdate")', function() {
      // uncomment below and update the code to test the property totalMeasurementsInLastUpdate
      //var instane = new quantimodo-api.Connector();
      //expect(instance).to.be();
    });

  });

}));
