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
    // AMD. Register as an anonymous module.
    define(['quantimodoApi/ApiClient'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'));
  } else {
    // Browser globals (root is window)
    if (!root.quantimodoApi) {
      root.quantimodoApi = {};
    }
    root.quantimodoApi.Connection = factory(root.quantimodoApi.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The Connection model module.
   * @module quantimodoApi/quantimodoApi/Connection
   * @version 5.8.724
   */

  /**
   * Constructs a new <code>Connection</code>.
   * @alias module:quantimodoApi/quantimodoApi/Connection
   * @class
   * @param connectorId {Number} The id for the connector data source for which the connection is connected
   */
  var exports = function(connectorId) {
    var _this = this;



    _this['connectorId'] = connectorId;








  };

  /**
   * Constructs a <code>Connection</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:quantimodoApi/quantimodoApi/Connection} obj Optional instance to populate.
   * @return {module:quantimodoApi/quantimodoApi/Connection} The populated <code>Connection</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('id')) {
        obj['id'] = ApiClient.convertToType(data['id'], 'Number');
      }
      if (data.hasOwnProperty('userId')) {
        obj['userId'] = ApiClient.convertToType(data['userId'], 'Number');
      }
      if (data.hasOwnProperty('connectorId')) {
        obj['connectorId'] = ApiClient.convertToType(data['connectorId'], 'Number');
      }
      if (data.hasOwnProperty('connectStatus')) {
        obj['connectStatus'] = ApiClient.convertToType(data['connectStatus'], 'String');
      }
      if (data.hasOwnProperty('connectError')) {
        obj['connectError'] = ApiClient.convertToType(data['connectError'], 'String');
      }
      if (data.hasOwnProperty('updateRequestedAt')) {
        obj['updateRequestedAt'] = ApiClient.convertToType(data['updateRequestedAt'], 'Date');
      }
      if (data.hasOwnProperty('updateStatus')) {
        obj['updateStatus'] = ApiClient.convertToType(data['updateStatus'], 'String');
      }
      if (data.hasOwnProperty('updateError')) {
        obj['updateError'] = ApiClient.convertToType(data['updateError'], 'String');
      }
      if (data.hasOwnProperty('lastSuccessfulUpdatedAt')) {
        obj['lastSuccessfulUpdatedAt'] = ApiClient.convertToType(data['lastSuccessfulUpdatedAt'], 'Date');
      }
      if (data.hasOwnProperty('createdAt')) {
        obj['createdAt'] = ApiClient.convertToType(data['createdAt'], 'Date');
      }
      if (data.hasOwnProperty('updatedAt')) {
        obj['updatedAt'] = ApiClient.convertToType(data['updatedAt'], 'Date');
      }
    }
    return obj;
  }

  /**
   * id
   * @member {Number} id
   */
  exports.prototype['id'] = undefined;
  /**
   * ID of user that owns this correlation
   * @member {Number} userId
   */
  exports.prototype['userId'] = undefined;
  /**
   * The id for the connector data source for which the connection is connected
   * @member {Number} connectorId
   */
  exports.prototype['connectorId'] = undefined;
  /**
   * Indicates whether a connector is currently connected to a service for a user.
   * @member {String} connectStatus
   */
  exports.prototype['connectStatus'] = undefined;
  /**
   * Error message if there is a problem with authorizing this connection.
   * @member {String} connectError
   */
  exports.prototype['connectError'] = undefined;
  /**
   * Time at which an update was requested by a user.
   * @member {Date} updateRequestedAt
   */
  exports.prototype['updateRequestedAt'] = undefined;
  /**
   * Indicates whether a connector is currently updated.
   * @member {String} updateStatus
   */
  exports.prototype['updateStatus'] = undefined;
  /**
   * Indicates if there was an error during the update.
   * @member {String} updateError
   */
  exports.prototype['updateError'] = undefined;
  /**
   * The time at which the connector was last successfully updated.
   * @member {Date} lastSuccessfulUpdatedAt
   */
  exports.prototype['lastSuccessfulUpdatedAt'] = undefined;
  /**
   * When the record was first created. Use UTC ISO 8601 \"YYYY-MM-DDThh:mm:ss\"  datetime format
   * @member {Date} createdAt
   */
  exports.prototype['createdAt'] = undefined;
  /**
   * When the record in the database was last updated. Use UTC ISO 8601 \"YYYY-MM-DDThh:mm:ss\"  datetime format
   * @member {Date} updatedAt
   */
  exports.prototype['updatedAt'] = undefined;



  return exports;
}));


