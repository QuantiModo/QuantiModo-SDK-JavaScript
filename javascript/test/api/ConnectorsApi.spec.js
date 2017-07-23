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
    factory(root.expect, root.QuantiModo);
  }
}(this, function(expect, QuantiModo) {
  'use strict';

  var instance;

  beforeEach(function() {
    instance = new QuantiModo.ConnectorsApi();
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

  describe('ConnectorsApi', function() {
    describe('v1ConnectMobileGet', function() {
      it('should call v1ConnectMobileGet successfully', function(done) {
        //uncomment below and update the code to test v1ConnectMobileGet
        //instance.v1ConnectMobileGet(pet, function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('v1ConnectorsConnectorNameConnectGet', function() {
      it('should call v1ConnectorsConnectorNameConnectGet successfully', function(done) {
        //uncomment below and update the code to test v1ConnectorsConnectorNameConnectGet
        //instance.v1ConnectorsConnectorNameConnectGet(pet, function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('v1ConnectorsConnectorNameConnectInstructionsGet', function() {
      it('should call v1ConnectorsConnectorNameConnectInstructionsGet successfully', function(done) {
        //uncomment below and update the code to test v1ConnectorsConnectorNameConnectInstructionsGet
        //instance.v1ConnectorsConnectorNameConnectInstructionsGet(pet, function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('v1ConnectorsConnectorNameConnectParameterGet', function() {
      it('should call v1ConnectorsConnectorNameConnectParameterGet successfully', function(done) {
        //uncomment below and update the code to test v1ConnectorsConnectorNameConnectParameterGet
        //instance.v1ConnectorsConnectorNameConnectParameterGet(pet, function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('v1ConnectorsConnectorNameDisconnectGet', function() {
      it('should call v1ConnectorsConnectorNameDisconnectGet successfully', function(done) {
        //uncomment below and update the code to test v1ConnectorsConnectorNameDisconnectGet
        //instance.v1ConnectorsConnectorNameDisconnectGet(pet, function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('v1ConnectorsConnectorNameInfoGet', function() {
      it('should call v1ConnectorsConnectorNameInfoGet successfully', function(done) {
        //uncomment below and update the code to test v1ConnectorsConnectorNameInfoGet
        //instance.v1ConnectorsConnectorNameInfoGet(pet, function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('v1ConnectorsConnectorNameUpdateGet', function() {
      it('should call v1ConnectorsConnectorNameUpdateGet successfully', function(done) {
        //uncomment below and update the code to test v1ConnectorsConnectorNameUpdateGet
        //instance.v1ConnectorsConnectorNameUpdateGet(pet, function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('v1ConnectorsListGet', function() {
      it('should call v1ConnectorsListGet successfully', function(done) {
        //uncomment below and update the code to test v1ConnectorsListGet
        //instance.v1ConnectorsListGet(pet, function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('v1IntegrationJsGet', function() {
      it('should call v1IntegrationJsGet successfully', function(done) {
        //uncomment below and update the code to test v1IntegrationJsGet
        //instance.v1IntegrationJsGet(pet, function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
  });

}));
