/**
 * quantimodo
 * We make it easy to retrieve and analyze normalized user data from a wide array of devices and applications. Check out our [docs and sdk's](https://github.com/QuantiModo/docs) or [contact us](https://help.quantimo.do).
 *
 * OpenAPI spec version: 5.8.112511
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.4.5
 *
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/ActivitiesResponse'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('../model/ActivitiesResponse'));
  } else {
    // Browser globals (root is window)
    if (!root.Quantimodo) {
      root.Quantimodo = {};
    }
    root.Quantimodo.ActivitiesApi = factory(root.Quantimodo.ApiClient, root.Quantimodo.ActivitiesResponse);
  }
}(this, function(ApiClient, ActivitiesResponse) {
  'use strict';

  /**
   * Activities service.
   * @module api/ActivitiesApi
   * @version 5.8.112511
   */

  /**
   * Constructs a new ActivitiesApi. 
   * @alias module:api/ActivitiesApi
   * @class
   * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
   * default to {@link module:ApiClient#instance} if unspecified.
   */
  var exports = function(apiClient) {
    this.apiClient = apiClient || ApiClient.instance;


    /**
     * Callback function to receive the result of the getActivities operation.
     * @callback module:api/ActivitiesApi~getActivitiesCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/ActivitiesResponse>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Get Activities
     * Get Activities
     * @param {Object} opts Optional parameters
     * @param {String} opts.sort Sort by one of the listed field names. If the field name is prefixed with &#x60;-&#x60;, it will sort in descending order.
     * @param {Number} opts.limit The LIMIT is used to limit the number of results returned. So if youhave 1000 results, but only want to the first 10, you would set this to 10 and offset to 0. The maximum limit is 200 records. (default to 100)
     * @param {Number} opts.offset OFFSET says to skip that many rows before beginning to return rows to the client. OFFSET 0 is the same as omitting the OFFSET clause.If both OFFSET and LIMIT appear, then OFFSET rows are skipped before starting to count the LIMIT rows that are returned.
     * @param {String} opts.updatedAt When the record was last updated. Use UTC ISO 8601 YYYY-MM-DDThh:mm:ss datetime format. Time zone should be UTC and not local.
     * @param {Number} opts.userId User&#39;s id
     * @param {String} opts.createdAt When the record was first created. Use UTC ISO 8601 YYYY-MM-DDThh:mm:ss datetime format. Time zone should be UTC and not local.
     * @param {Number} opts.id Id
     * @param {String} opts.clientId Your QuantiModo client id can be obtained by creating an app at https://builder.quantimo.do
     * @param {module:model/String} opts.platform Ex: chrome, android, ios, web
     * @param {module:api/ActivitiesApi~getActivitiesCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Array.<module:model/ActivitiesResponse>}
     */
    this.getActivities = function(opts, callback) {
      opts = opts || {};
      var postBody = null;


      var pathParams = {
      };
      var queryParams = {
        'sort': opts['sort'],
        'limit': opts['limit'],
        'offset': opts['offset'],
        'updatedAt': opts['updatedAt'],
        'userId': opts['userId'],
        'createdAt': opts['createdAt'],
        'id': opts['id'],
        'clientId': opts['clientId'],
        'platform': opts['platform'],
      };
      var collectionQueryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['access_token', 'quantimodo_oauth2'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = [ActivitiesResponse];

      return this.apiClient.callApi(
        '/v3/activities', 'GET',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the postActivities operation.
     * @callback module:api/ActivitiesApi~postActivitiesCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/ActivitiesResponse>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Post Activities
     * Post Activities
     * @param {Object} opts Optional parameters
     * @param {String} opts.sort Sort by one of the listed field names. If the field name is prefixed with &#x60;-&#x60;, it will sort in descending order.
     * @param {Number} opts.limit The LIMIT is used to limit the number of results returned. So if youhave 1000 results, but only want to the first 10, you would set this to 10 and offset to 0. The maximum limit is 200 records. (default to 100)
     * @param {Number} opts.offset OFFSET says to skip that many rows before beginning to return rows to the client. OFFSET 0 is the same as omitting the OFFSET clause.If both OFFSET and LIMIT appear, then OFFSET rows are skipped before starting to count the LIMIT rows that are returned.
     * @param {String} opts.updatedAt When the record was last updated. Use UTC ISO 8601 YYYY-MM-DDThh:mm:ss datetime format. Time zone should be UTC and not local.
     * @param {Number} opts.userId User&#39;s id
     * @param {String} opts.createdAt When the record was first created. Use UTC ISO 8601 YYYY-MM-DDThh:mm:ss datetime format. Time zone should be UTC and not local.
     * @param {Number} opts.id Id
     * @param {String} opts.clientId Your QuantiModo client id can be obtained by creating an app at https://builder.quantimo.do
     * @param {module:model/String} opts.platform Ex: chrome, android, ios, web
     * @param {module:api/ActivitiesApi~postActivitiesCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Array.<module:model/ActivitiesResponse>}
     */
    this.postActivities = function(opts, callback) {
      opts = opts || {};
      var postBody = null;


      var pathParams = {
      };
      var queryParams = {
        'sort': opts['sort'],
        'limit': opts['limit'],
        'offset': opts['offset'],
        'updatedAt': opts['updatedAt'],
        'userId': opts['userId'],
        'createdAt': opts['createdAt'],
        'id': opts['id'],
        'clientId': opts['clientId'],
        'platform': opts['platform'],
      };
      var collectionQueryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['access_token', 'quantimodo_oauth2'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = [ActivitiesResponse];

      return this.apiClient.callApi(
        '/v3/activities', 'POST',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
  };

  return exports;
}));
