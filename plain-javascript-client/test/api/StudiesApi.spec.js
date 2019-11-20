/**
 * quantimodo
 * We make it easy to retrieve and analyze normalized user data from a wide array of devices and applications. Check out our [docs and sdk's](https://github.com/QuantiModo/docs) or [contact us](https://help.quantimo.do).
 *
 * OpenAPI spec version: 5.8.112511
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.4.8
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
    instance = new Quantimodo.StudiesApi();
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

  describe('StudiesApi', function() {
    describe('createStudy', function() {
      it('should call createStudy successfully', function(done) {
        //uncomment below and update the code to test createStudy
        //instance.createStudy(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('deleteVote', function() {
      it('should call deleteVote successfully', function(done) {
        //uncomment below and update the code to test deleteVote
        //instance.deleteVote(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('getOpenStudies', function() {
      it('should call getOpenStudies successfully', function(done) {
        //uncomment below and update the code to test getOpenStudies
        //instance.getOpenStudies(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('getStudies', function() {
      it('should call getStudies successfully', function(done) {
        //uncomment below and update the code to test getStudies
        //instance.getStudies(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('getStudiesCreated', function() {
      it('should call getStudiesCreated successfully', function(done) {
        //uncomment below and update the code to test getStudiesCreated
        //instance.getStudiesCreated(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('getStudiesJoined', function() {
      it('should call getStudiesJoined successfully', function(done) {
        //uncomment below and update the code to test getStudiesJoined
        //instance.getStudiesJoined(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('getStudy', function() {
      it('should call getStudy successfully', function(done) {
        //uncomment below and update the code to test getStudy
        //instance.getStudy(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('joinStudy', function() {
      it('should call joinStudy successfully', function(done) {
        //uncomment below and update the code to test joinStudy
        //instance.joinStudy(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('postVote', function() {
      it('should call postVote successfully', function(done) {
        //uncomment below and update the code to test postVote
        //instance.postVote(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('publishStudy', function() {
      it('should call publishStudy successfully', function(done) {
        //uncomment below and update the code to test publishStudy
        //instance.publishStudy(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
  });

}));