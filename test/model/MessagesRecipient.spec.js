/**
 * quantimodo
 * We make it easy to retrieve and analyze normalized user data from a wide array of devices and applications. Check out our [docs and sdk's](https://github.com/QuantiModo/docs) or [contact us](https://help.quantimo.do).
 *
 * OpenAPI spec version: 5.8.112511
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.4.4
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
    instance = new Quantimodo.MessagesRecipient();
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

  describe('MessagesRecipient', function() {
    it('should create an instance of MessagesRecipient', function() {
      // uncomment below and update the code to test MessagesRecipient
      //var instance = new Quantimodo.MessagesRecipient();
      //expect(instance).to.be.a(Quantimodo.MessagesRecipient);
    });

    it('should have the property id (base name: "id")', function() {
      // uncomment below and update the code to test the property id
      //var instance = new Quantimodo.MessagesRecipient();
      //expect(instance).to.be();
    });

    it('should have the property userId (base name: "userId")', function() {
      // uncomment below and update the code to test the property userId
      //var instance = new Quantimodo.MessagesRecipient();
      //expect(instance).to.be();
    });

    it('should have the property threadId (base name: "threadId")', function() {
      // uncomment below and update the code to test the property threadId
      //var instance = new Quantimodo.MessagesRecipient();
      //expect(instance).to.be();
    });

    it('should have the property unreadCount (base name: "unreadCount")', function() {
      // uncomment below and update the code to test the property unreadCount
      //var instance = new Quantimodo.MessagesRecipient();
      //expect(instance).to.be();
    });

    it('should have the property senderOnly (base name: "senderOnly")', function() {
      // uncomment below and update the code to test the property senderOnly
      //var instance = new Quantimodo.MessagesRecipient();
      //expect(instance).to.be();
    });

    it('should have the property isDeleted (base name: "isDeleted")', function() {
      // uncomment below and update the code to test the property isDeleted
      //var instance = new Quantimodo.MessagesRecipient();
      //expect(instance).to.be();
    });

    it('should have the property metaDataArray (base name: "metaDataArray")', function() {
      // uncomment below and update the code to test the property metaDataArray
      //var instance = new Quantimodo.MessagesRecipient();
      //expect(instance).to.be();
    });

  });

}));
