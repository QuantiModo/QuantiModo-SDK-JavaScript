/**
 * quantimodo
 * We make it easy to retrieve and analyze normalized user data from a wide array of devices and applications. Check out our [docs and sdk's](https://github.com/QuantiModo/docs) or [contact us](https://help.quantimo.do).
 *
 * OpenAPI spec version: 2.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
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
    factory(root.expect, root.quantimodo-api);
  }
}(this, function(expect, quantimodo-api) {
  'use strict';

  var instance;

  beforeEach(function() {
    instance = new quantimodo-api.VariablesApi();
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

  describe('VariablesApi', function() {
    describe('deleteUserTag', function() {
      it('should call deleteUserTag successfully', function(done) {
        //uncomment below and update the code to test deleteUserTag
        //instance.deleteUserTag(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('deleteUserVariable', function() {
      it('should call deleteUserVariable successfully', function(done) {
        //uncomment below and update the code to test deleteUserVariable
        //instance.deleteUserVariable(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('getVariableCategories', function() {
      it('should call getVariableCategories successfully', function(done) {
        //uncomment below and update the code to test getVariableCategories
        //instance.getVariableCategories(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('getVariables', function() {
      it('should call getVariables successfully', function(done) {
        //uncomment below and update the code to test getVariables
        //instance.getVariables(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('postUserTags', function() {
      it('should call postUserTags successfully', function(done) {
        //uncomment below and update the code to test postUserTags
        //instance.postUserTags(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('postUserVariables', function() {
      it('should call postUserVariables successfully', function(done) {
        //uncomment below and update the code to test postUserVariables
        //instance.postUserVariables(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('resetUserVariableSettings', function() {
      it('should call resetUserVariableSettings successfully', function(done) {
        //uncomment below and update the code to test resetUserVariableSettings
        //instance.resetUserVariableSettings(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
  });

}));