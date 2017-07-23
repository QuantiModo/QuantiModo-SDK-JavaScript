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
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/Pairs'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('../model/Pairs'));
  } else {
    // Browser globals (root is window)
    if (!root.QuantiModo) {
      root.QuantiModo = {};
    }
    root.QuantiModo.PairsApi = factory(root.QuantiModo.ApiClient, root.QuantiModo.Pairs);
  }
}(this, function(ApiClient, Pairs) {
  'use strict';

  /**
   * Pairs service.
   * @module api/PairsApi
   * @version 2.0
   */

  /**
   * Constructs a new PairsApi. 
   * @alias module:api/PairsApi
   * @class
   * @param {module:ApiClient} apiClient Optional API client implementation to use,
   * default to {@link module:ApiClient#instance} if unspecified.
   */
  var exports = function(apiClient) {
    this.apiClient = apiClient || ApiClient.instance;


    /**
     * Callback function to receive the result of the v1PairsCsvGet operation.
     * @callback module:api/PairsApi~v1PairsCsvGetCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/Pairs>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Get pairs
     * Pairs cause measurements with effect measurements grouped over the duration of action after the onset delay.
     * @param {String} cause Original variable name for the explanatory or independent variable
     * @param {String} effect Original variable name for the outcome or dependent variable
     * @param {Object} opts Optional parameters
     * @param {String} opts.accessToken User&#39;s OAuth2 access token
     * @param {Number} opts.userId User&#39;s id
     * @param {String} opts.causeSource Name of data source that the cause measurements should come from
     * @param {String} opts.causeUnit Abbreviated name for the unit cause measurements to be returned in
     * @param {String} opts.delay The amount of time in seconds that elapses after the predictor/stimulus event before the outcome as perceived by a self-tracker is known as the “onset delay”. For example, the “onset delay” between the time a person takes an aspirin (predictor/stimulus event) and the time a person perceives a change in their headache severity (outcome) is approximately 30 minutes.
     * @param {String} opts.duration The amount of time over which a predictor/stimulus event can exert an observable influence on an outcome variable’s value. For instance, aspirin (stimulus/predictor) typically decreases headache severity for approximately four hours (duration of action) following the onset delay.
     * @param {String} opts.effectSource Name of data source that the effectmeasurements should come from
     * @param {String} opts.effectUnit Abbreviated name for the unit effect measurements to be returned in
     * @param {String} opts.endTime The most recent date (in epoch time) for which we should return measurements
     * @param {String} opts.startTime The earliest date (in epoch time) for which we should return measurements
     * @param {Number} opts.limit The LIMIT is used to limit the number of results returned. So if you have 1000 results, but only want to the first 10, you would set this to 10 and offset to 0.
     * @param {Number} opts.offset Since the maximum limit is 200 records, to get more than that you&#39;ll have to make multiple API calls and page through the results. To retrieve all the data, you can iterate through data by using the &#x60;limit&#x60; and &#x60;offset&#x60; query parameters.  For example, if you want to retrieve data from 61-80 then you can use a query with the following parameters, &#x60;imit&#x3D;20&amp;offset&#x3D;60&#x60;.
     * @param {Number} opts.sort Sort by given field. If the field is prefixed with &#x60;-, it will sort in descending order.
     * @param {module:api/PairsApi~v1PairsCsvGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Array.<module:model/Pairs>}
     */
    this.v1PairsCsvGet = function(cause, effect, opts, callback) {
      opts = opts || {};
      var postBody = null;

      // verify the required parameter 'cause' is set
      if (cause == undefined || cause == null) {
        throw new Error("Missing the required parameter 'cause' when calling v1PairsCsvGet");
      }

      // verify the required parameter 'effect' is set
      if (effect == undefined || effect == null) {
        throw new Error("Missing the required parameter 'effect' when calling v1PairsCsvGet");
      }


      var pathParams = {
      };
      var queryParams = {
        'access_token': opts['accessToken'],
        'userId': opts['userId'],
        'cause': cause,
        'causeSource': opts['causeSource'],
        'causeUnit': opts['causeUnit'],
        'delay': opts['delay'],
        'duration': opts['duration'],
        'effect': effect,
        'effectSource': opts['effectSource'],
        'effectUnit': opts['effectUnit'],
        'endTime': opts['endTime'],
        'startTime': opts['startTime'],
        'limit': opts['limit'],
        'offset': opts['offset'],
        'sort': opts['sort']
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['access_token', 'quantimodo_oauth2'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = [Pairs];

      return this.apiClient.callApi(
        '/v1/pairsCsv', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the v1PairsGet operation.
     * @callback module:api/PairsApi~v1PairsGetCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/Pairs>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Get pairs
     * Pairs cause measurements with effect measurements grouped over the duration of action after the onset delay.
     * @param {String} cause Original variable name for the explanatory or independent variable
     * @param {String} effect Original variable name for the outcome or dependent variable
     * @param {Object} opts Optional parameters
     * @param {String} opts.accessToken User&#39;s OAuth2 access token
     * @param {Number} opts.userId User&#39;s id
     * @param {String} opts.causeSource Name of data source that the cause measurements should come from
     * @param {String} opts.causeUnit Abbreviated name for the unit cause measurements to be returned in
     * @param {String} opts.delay The amount of time in seconds that elapses after the predictor/stimulus event before the outcome as perceived by a self-tracker is known as the “onset delay”. For example, the “onset delay” between the time a person takes an aspirin (predictor/stimulus event) and the time a person perceives a change in their headache severity (outcome) is approximately 30 minutes.
     * @param {String} opts.duration The amount of time over which a predictor/stimulus event can exert an observable influence on an outcome variable’s value. For instance, aspirin (stimulus/predictor) typically decreases headache severity for approximately four hours (duration of action) following the onset delay.
     * @param {String} opts.effectSource Name of data source that the effectmeasurements should come from
     * @param {String} opts.effectUnit Abbreviated name for the unit effect measurements to be returned in
     * @param {String} opts.endTime The most recent date (in epoch time) for which we should return measurements
     * @param {String} opts.startTime The earliest date (in epoch time) for which we should return measurements
     * @param {Number} opts.limit The LIMIT is used to limit the number of results returned. So if you have 1000 results, but only want to the first 10, you would set this to 10 and offset to 0.
     * @param {Number} opts.offset Since the maximum limit is 200 records, to get more than that you&#39;ll have to make multiple API calls and page through the results. To retrieve all the data, you can iterate through data by using the &#x60;limit&#x60; and &#x60;offset&#x60; query parameters.  For example, if you want to retrieve data from 61-80 then you can use a query with the following parameters, &#x60;imit&#x3D;20&amp;offset&#x3D;60&#x60;.
     * @param {Number} opts.sort Sort by given field. If the field is prefixed with &#x60;-, it will sort in descending order.
     * @param {module:api/PairsApi~v1PairsGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Array.<module:model/Pairs>}
     */
    this.v1PairsGet = function(cause, effect, opts, callback) {
      opts = opts || {};
      var postBody = null;

      // verify the required parameter 'cause' is set
      if (cause == undefined || cause == null) {
        throw new Error("Missing the required parameter 'cause' when calling v1PairsGet");
      }

      // verify the required parameter 'effect' is set
      if (effect == undefined || effect == null) {
        throw new Error("Missing the required parameter 'effect' when calling v1PairsGet");
      }


      var pathParams = {
      };
      var queryParams = {
        'access_token': opts['accessToken'],
        'userId': opts['userId'],
        'cause': cause,
        'causeSource': opts['causeSource'],
        'causeUnit': opts['causeUnit'],
        'delay': opts['delay'],
        'duration': opts['duration'],
        'effect': effect,
        'effectSource': opts['effectSource'],
        'effectUnit': opts['effectUnit'],
        'endTime': opts['endTime'],
        'startTime': opts['startTime'],
        'limit': opts['limit'],
        'offset': opts['offset'],
        'sort': opts['sort']
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['access_token', 'quantimodo_oauth2'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = [Pairs];

      return this.apiClient.callApi(
        '/v1/pairs', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
  };

  return exports;
}));
