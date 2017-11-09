/**
 * quantimodo
 * We make it easy to retrieve and analyze normalized user data from a wide array of devices and applications. Check out our [docs and sdk's](https://github.com/QuantiModo/docs) or [contact us](https://help.quantimo.do).
 *
 * OpenAPI spec version: 5.8.100414
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
    define(['ApiClient', 'model/CommonResponse', 'model/Correlation', 'model/GetCorrelationsResponse', 'model/GetStudyResponse', 'model/JsonErrorResponse', 'model/PostCorrelation', 'model/Vote', 'model/VoteDelete'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('../model/CommonResponse'), require('../model/Correlation'), require('../model/GetCorrelationsResponse'), require('../model/GetStudyResponse'), require('../model/JsonErrorResponse'), require('../model/PostCorrelation'), require('../model/Vote'), require('../model/VoteDelete'));
  } else {
    // Browser globals (root is window)
    if (!root.Quantimodo) {
      root.Quantimodo = {};
    }
    root.Quantimodo.AnalyticsApi = factory(root.Quantimodo.ApiClient, root.Quantimodo.CommonResponse, root.Quantimodo.Correlation, root.Quantimodo.GetCorrelationsResponse, root.Quantimodo.GetStudyResponse, root.Quantimodo.JsonErrorResponse, root.Quantimodo.PostCorrelation, root.Quantimodo.Vote, root.Quantimodo.VoteDelete);
  }
}(this, function(ApiClient, CommonResponse, Correlation, GetCorrelationsResponse, GetStudyResponse, JsonErrorResponse, PostCorrelation, Vote, VoteDelete) {
  'use strict';

  /**
   * Analytics service.
   * @module api/AnalyticsApi
   * @version 5.8.1109
   */

  /**
   * Constructs a new AnalyticsApi. 
   * @alias module:api/AnalyticsApi
   * @class
   * @param {module:ApiClient} apiClient Optional API client implementation to use,
   * default to {@link module:ApiClient#instance} if unspecified.
   */
  var exports = function(apiClient) {
    this.apiClient = apiClient || ApiClient.instance;


    /**
     * Callback function to receive the result of the deleteVote operation.
     * @callback module:api/AnalyticsApi~deleteVoteCallback
     * @param {String} error Error message, if any.
     * @param {module:model/CommonResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Delete vote
     * Delete previously posted vote
     * @param {module:model/VoteDelete} body The cause and effect variable names for the predictor vote to be deleted.
     * @param {Object} opts Optional parameters
     * @param {Number} opts.userId User&#39;s id
     * @param {module:api/AnalyticsApi~deleteVoteCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/CommonResponse}
     */
    this.deleteVote = function(body, opts, callback) {
      opts = opts || {};
      var postBody = body;

      // verify the required parameter 'body' is set
      if (body === undefined || body === null) {
        throw new Error("Missing the required parameter 'body' when calling deleteVote");
      }


      var pathParams = {
      };
      var queryParams = {
        'userId': opts['userId']
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['access_token', 'quantimodo_oauth2'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = CommonResponse;

      return this.apiClient.callApi(
        '/v3/votes/delete', 'DELETE',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the getAggregatedCorrelations operation.
     * @callback module:api/AnalyticsApi~getAggregatedCorrelationsCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/Correlation>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Get aggregated correlations
     * Get correlations based on the anonymized aggregate data from all QuantiModo users.
     * @param {Object} opts Optional parameters
     * @param {String} opts.causeVariableName Variable name of the hypothetical cause variable.  Example: Sleep Duration
     * @param {String} opts.effectVariableName Variable name of the hypothetical effect variable.  Example: Overall Mood
     * @param {String} opts.sort Sort by one of the listed field names. If the field name is prefixed with &#x60;-&#x60;, it will sort in descending order.
     * @param {Number} opts.limit The LIMIT is used to limit the number of results returned. So if youhave 1000 results, but only want to the first 10, you would set this to 10 and offset to 0. The maximum limit is 200 records. (default to 100)
     * @param {Number} opts.offset OFFSET says to skip that many rows before beginning to return rows to the client. OFFSET 0 is the same as omitting the OFFSET clause.If both OFFSET and LIMIT appear, then OFFSET rows are skipped before starting to count the LIMIT rows that are returned.
     * @param {Number} opts.userId User&#39;s id
     * @param {String} opts.correlationCoefficient Pearson correlation coefficient between cause and effect after lagging by onset delay and grouping by duration of action
     * @param {String} opts.updatedAt When the record was last updated. Use UTC ISO 8601 &#x60;YYYY-MM-DDThh:mm:ss&#x60; datetime format. Time zone should be UTC and not local.
     * @param {Boolean} opts.outcomesOfInterest Only include correlations for which the effect is an outcome of interest for the user
     * @param {String} opts.onsetDelay The amount of time in seconds that elapses after the predictor/stimulus event before the outcome as perceived by a self-tracker is known as the onset delay. For example, the onset delay between the time a person takes an aspirin (predictor/stimulus event) and the time a person perceives a change in their headache severity (outcome) is approximately 30 minutes.
     * @param {String} opts.durationOfAction The amount of time over which a predictor/stimulus event can exert an observable influence on an outcome variable value. For instance, aspirin (stimulus/predictor) typically decreases headache severity for approximately four hours (duration of action) following the onset delay.
     * @param {module:api/AnalyticsApi~getAggregatedCorrelationsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Array.<module:model/Correlation>}
     */
    this.getAggregatedCorrelations = function(opts, callback) {
      opts = opts || {};
      var postBody = null;


      var pathParams = {
      };
      var queryParams = {
        'causeVariableName': opts['causeVariableName'],
        'effectVariableName': opts['effectVariableName'],
        'sort': opts['sort'],
        'limit': opts['limit'],
        'offset': opts['offset'],
        'userId': opts['userId'],
        'correlationCoefficient': opts['correlationCoefficient'],
        'updatedAt': opts['updatedAt'],
        'outcomesOfInterest': opts['outcomesOfInterest'],
        'onsetDelay': opts['onsetDelay'],
        'durationOfAction': opts['durationOfAction']
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['access_token', 'quantimodo_oauth2'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = [Correlation];

      return this.apiClient.callApi(
        '/v3/aggregatedCorrelations', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the getStudy operation.
     * @callback module:api/AnalyticsApi~getStudyCallback
     * @param {String} error Error message, if any.
     * @param {module:model/GetStudyResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Get Study
     * Get Study
     * @param {Object} opts Optional parameters
     * @param {String} opts.causeVariableName Variable name of the hypothetical cause variable.  Example: Sleep Duration
     * @param {String} opts.effectVariableName Variable name of the hypothetical effect variable.  Example: Overall Mood
     * @param {String} opts.appName Example: MoodiModo
     * @param {String} opts.clientId Example: oauth_test_client
     * @param {Boolean} opts.includeCharts Example: true
     * @param {module:api/AnalyticsApi~getStudyCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/GetStudyResponse}
     */
    this.getStudy = function(opts, callback) {
      opts = opts || {};
      var postBody = null;


      var pathParams = {
      };
      var queryParams = {
        'causeVariableName': opts['causeVariableName'],
        'effectVariableName': opts['effectVariableName'],
        'appName': opts['appName'],
        'clientId': opts['clientId'],
        'includeCharts': opts['includeCharts']
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['access_token', 'quantimodo_oauth2'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = GetStudyResponse;

      return this.apiClient.callApi(
        '/v4/study', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the getUserCorrelationExplanations operation.
     * @callback module:api/AnalyticsApi~getUserCorrelationExplanationsCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/Correlation>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Get correlation explanations
     * Get explanations of  correlations based on data from a single user.
     * @param {Object} opts Optional parameters
     * @param {String} opts.causeVariableName Variable name of the hypothetical cause variable.  Example: Sleep Duration
     * @param {String} opts.effectVariableName Variable name of the hypothetical effect variable.  Example: Overall Mood
     * @param {module:api/AnalyticsApi~getUserCorrelationExplanationsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Array.<module:model/Correlation>}
     */
    this.getUserCorrelationExplanations = function(opts, callback) {
      opts = opts || {};
      var postBody = null;


      var pathParams = {
      };
      var queryParams = {
        'causeVariableName': opts['causeVariableName'],
        'effectVariableName': opts['effectVariableName']
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['access_token', 'quantimodo_oauth2'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = [Correlation];

      return this.apiClient.callApi(
        '/v3/correlations/explanations', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the getUserCorrelations operation.
     * @callback module:api/AnalyticsApi~getUserCorrelationsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/GetCorrelationsResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Get correlations
     * Get correlations based on data from a single user.
     * @param {Object} opts Optional parameters
     * @param {String} opts.causeVariableName Variable name of the hypothetical cause variable.  Example: Sleep Duration
     * @param {String} opts.effectVariableName Variable name of the hypothetical effect variable.  Example: Overall Mood
     * @param {String} opts.sort Sort by one of the listed field names. If the field name is prefixed with &#x60;-&#x60;, it will sort in descending order.
     * @param {Number} opts.limit The LIMIT is used to limit the number of results returned. So if youhave 1000 results, but only want to the first 10, you would set this to 10 and offset to 0. The maximum limit is 200 records. (default to 100)
     * @param {Number} opts.offset OFFSET says to skip that many rows before beginning to return rows to the client. OFFSET 0 is the same as omitting the OFFSET clause.If both OFFSET and LIMIT appear, then OFFSET rows are skipped before starting to count the LIMIT rows that are returned.
     * @param {Number} opts.userId User&#39;s id
     * @param {String} opts.correlationCoefficient Pearson correlation coefficient between cause and effect after lagging by onset delay and grouping by duration of action
     * @param {String} opts.onsetDelay The amount of time in seconds that elapses after the predictor/stimulus event before the outcome as perceived by a self-tracker is known as the onset delay. For example, the onset delay between the time a person takes an aspirin (predictor/stimulus event) and the time a person perceives a change in their headache severity (outcome) is approximately 30 minutes.
     * @param {String} opts.durationOfAction The amount of time over which a predictor/stimulus event can exert an observable influence on an outcome variable value. For instance, aspirin (stimulus/predictor) typically decreases headache severity for approximately four hours (duration of action) following the onset delay.
     * @param {String} opts.updatedAt When the record was last updated. Use UTC ISO 8601 &#x60;YYYY-MM-DDThh:mm:ss&#x60; datetime format. Time zone should be UTC and not local.
     * @param {Boolean} opts.outcomesOfInterest Only include correlations for which the effect is an outcome of interest for the user
     * @param {String} opts.appName Example: MoodiModo
     * @param {String} opts.clientId Example: oauth_test_client
     * @param {Boolean} opts.fallbackToStudyForCauseAndEffect Example: 1
     * @param {Boolean} opts.fallbackToAggregateCorrelations Example: true
     * @param {module:api/AnalyticsApi~getUserCorrelationsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/GetCorrelationsResponse}
     */
    this.getUserCorrelations = function(opts, callback) {
      opts = opts || {};
      var postBody = null;


      var pathParams = {
      };
      var queryParams = {
        'causeVariableName': opts['causeVariableName'],
        'effectVariableName': opts['effectVariableName'],
        'sort': opts['sort'],
        'limit': opts['limit'],
        'offset': opts['offset'],
        'userId': opts['userId'],
        'correlationCoefficient': opts['correlationCoefficient'],
        'onsetDelay': opts['onsetDelay'],
        'durationOfAction': opts['durationOfAction'],
        'updatedAt': opts['updatedAt'],
        'outcomesOfInterest': opts['outcomesOfInterest'],
        'appName': opts['appName'],
        'clientId': opts['clientId'],
        'fallbackToStudyForCauseAndEffect': opts['fallbackToStudyForCauseAndEffect'],
        'fallbackToAggregateCorrelations': opts['fallbackToAggregateCorrelations']
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['access_token', 'quantimodo_oauth2'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = GetCorrelationsResponse;

      return this.apiClient.callApi(
        '/v3/correlations', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the postAggregatedCorrelations operation.
     * @callback module:api/AnalyticsApi~postAggregatedCorrelationsCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Store or Update a Correlation
     * Add correlation
     * @param {module:model/PostCorrelation} body Provides correlation data
     * @param {Object} opts Optional parameters
     * @param {Number} opts.userId User&#39;s id
     * @param {module:api/AnalyticsApi~postAggregatedCorrelationsCallback} callback The callback function, accepting three arguments: error, data, response
     */
    this.postAggregatedCorrelations = function(body, opts, callback) {
      opts = opts || {};
      var postBody = body;

      // verify the required parameter 'body' is set
      if (body === undefined || body === null) {
        throw new Error("Missing the required parameter 'body' when calling postAggregatedCorrelations");
      }


      var pathParams = {
      };
      var queryParams = {
        'userId': opts['userId']
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['access_token', 'quantimodo_oauth2'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = null;

      return this.apiClient.callApi(
        '/v3/aggregatedCorrelations', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the postVote operation.
     * @callback module:api/AnalyticsApi~postVoteCallback
     * @param {String} error Error message, if any.
     * @param {module:model/CommonResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Post or update vote
     * This is to enable users to indicate their opinion on the plausibility of a causal relationship between a treatment and outcome. We incorporates crowd-sourced plausibility estimations into our algorithm. This is done allowing user to indicate their view of the plausibility of each relationship with thumbs up/down buttons placed next to each prediction.
     * @param {module:model/Vote} body Contains the cause variable, effect variable, and vote value.
     * @param {Object} opts Optional parameters
     * @param {Number} opts.userId User&#39;s id
     * @param {module:api/AnalyticsApi~postVoteCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/CommonResponse}
     */
    this.postVote = function(body, opts, callback) {
      opts = opts || {};
      var postBody = body;

      // verify the required parameter 'body' is set
      if (body === undefined || body === null) {
        throw new Error("Missing the required parameter 'body' when calling postVote");
      }


      var pathParams = {
      };
      var queryParams = {
        'userId': opts['userId']
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['access_token', 'quantimodo_oauth2'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = CommonResponse;

      return this.apiClient.callApi(
        '/v3/votes', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
  };

  return exports;
}));
