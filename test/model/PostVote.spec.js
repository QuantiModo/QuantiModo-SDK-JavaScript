/**
 * QuantiModo
 * QuantiModo makes it easy to retrieve normalized user data from a wide array of devices and applications. [Learn about QuantiModo](https://quantimo.do), check out our [docs](https://github.com/QuantiModo/docs) or contact us at [help.quantimo.do](https://help.quantimo.do). 
 *
 * OpenAPI spec version: 2.0
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
    factory(root.expect, root.quantimodoApi);
  }
}(this, function(expect, quantimodoApi) {
  'use strict';

  var instance;

  beforeEach(function() {
    instance = new quantimodoApi.PostVote();
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

  describe('PostVote', function() {
    it('should create an instance of PostVote', function() {
      // uncomment below and update the code to test PostVote
      //var instane = new quantimodoApi.PostVote();
      //expect(instance).to.be.a(quantimodoApi.PostVote);
    });

    it('should have the property causeVariableId (base name: "causeVariableId")', function() {
      // uncomment below and update the code to test the property causeVariableId
      //var instane = new quantimodoApi.PostVote();
      //expect(instance).to.be();
    });

    it('should have the property effectVariableId (base name: "effectVariableId")', function() {
      // uncomment below and update the code to test the property effectVariableId
      //var instane = new quantimodoApi.PostVote();
      //expect(instance).to.be();
    });

    it('should have the property vote (base name: "vote")', function() {
      // uncomment below and update the code to test the property vote
      //var instane = new quantimodoApi.PostVote();
      //expect(instance).to.be();
    });

  });

}));
