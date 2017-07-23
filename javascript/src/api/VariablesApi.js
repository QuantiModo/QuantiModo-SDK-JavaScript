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
    define(['ApiClient', 'model/UserVariableDelete', 'model/UserVariables', 'model/Variable', 'model/VariableCategory', 'model/VariablesNew'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('../model/UserVariableDelete'), require('../model/UserVariables'), require('../model/Variable'), require('../model/VariableCategory'), require('../model/VariablesNew'));
  } else {
    // Browser globals (root is window)
    if (!root.QuantiModo) {
      root.QuantiModo = {};
    }
    root.QuantiModo.VariablesApi = factory(root.QuantiModo.ApiClient, root.QuantiModo.UserVariableDelete, root.QuantiModo.UserVariables, root.QuantiModo.Variable, root.QuantiModo.VariableCategory, root.QuantiModo.VariablesNew);
  }
}(this, function(ApiClient, UserVariableDelete, UserVariables, Variable, VariableCategory, VariablesNew) {
  'use strict';

  /**
   * Variables service.
   * @module api/VariablesApi
   * @version 2.0
   */

  /**
   * Constructs a new VariablesApi. 
   * @alias module:api/VariablesApi
   * @class
   * @param {module:ApiClient} apiClient Optional API client implementation to use,
   * default to {@link module:ApiClient#instance} if unspecified.
   */
  var exports = function(apiClient) {
    this.apiClient = apiClient || ApiClient.instance;


    /**
     * Callback function to receive the result of the v1PublicVariablesGet operation.
     * @callback module:api/VariablesApi~v1PublicVariablesGetCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Variable} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Get public variables
     * This endpoint retrieves an array of all public variables. Public variables are things like foods, medications, symptoms, conditions, and anything not unique to a particular user. For instance, a telephone number or name would not be a public variable.
     * @param {Object} opts Optional parameters
     * @param {String} opts.accessToken User&#39;s OAuth2 access token
     * @param {Number} opts.userId User&#39;s id
     * @param {Number} opts.id Common variable id
     * @param {String} opts.category Filter data by category
     * @param {String} opts.name Original name of the variable (supports exact name match only)
     * @param {String} opts.updatedAt Filter by the last time any of the properties of the variable were changed. Uses UTC format \&quot;YYYY-MM-DDThh:mm:ss\&quot;
     * @param {String} opts.source The name of the data source that created the variable (supports exact name match only). So if you have a client application and you only want variables that were last updated by your app, you can include the name of your app here
     * @param {String} opts.latestMeasurementTime Filter variables based on the last time a measurement for them was created or updated in the UTC format \&quot;YYYY-MM-DDThh:mm:ss\&quot;
     * @param {String} opts.numberOfRawMeasurements Filter variables by the total number of measurements that they have. This could be used of you want to filter or sort by popularity.
     * @param {String} opts.lastSource Limit variables to those which measurements were last submitted by a specific source. So if you have a client application and you only want variables that were last updated by your app, you can include the name of your app here. (supports exact name match only)
     * @param {Number} opts.limit The LIMIT is used to limit the number of results returned. So if you have 1000 results, but only want to the first 10, you would set this to 10 and offset to 0.
     * @param {Number} opts.offset Since the maximum limit is 200 records, to get more than that you&#39;ll have to make multiple API calls and page through the results. To retrieve all the data, you can iterate through data by using the &#x60;limit&#x60; and &#x60;offset&#x60; query parameters.  For example, if you want to retrieve data from 61-80 then you can use a query with the following parameters, &#x60;imit&#x3D;20&amp;offset&#x3D;60&#x60;.
     * @param {Number} opts.sort Sort by given field. If the field is prefixed with &#x60;-, it will sort in descending order.
     * @param {module:api/VariablesApi~v1PublicVariablesGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/Variable}
     */
    this.v1PublicVariablesGet = function(opts, callback) {
      opts = opts || {};
      var postBody = null;


      var pathParams = {
      };
      var queryParams = {
        'access_token': opts['accessToken'],
        'userId': opts['userId'],
        'id': opts['id'],
        'category': opts['category'],
        'name': opts['name'],
        'updatedAt': opts['updatedAt'],
        'source': opts['source'],
        'latestMeasurementTime': opts['latestMeasurementTime'],
        'numberOfRawMeasurements': opts['numberOfRawMeasurements'],
        'lastSource': opts['lastSource'],
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
      var returnType = Variable;

      return this.apiClient.callApi(
        '/v1/public/variables', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the v1PublicVariablesSearchSearchGet operation.
     * @callback module:api/VariablesApi~v1PublicVariablesSearchSearchGetCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Variable} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Get top 5 PUBLIC variables with the most correlations
     * Get top 5 PUBLIC variables with the most correlations containing the entered search characters. For example, search for &#39;mood&#39; as an effect. Since &#39;Overall Mood&#39; has a lot of correlations with other variables, it should be in the autocomplete list.Supported filter parameters:&lt;ul&gt;&lt;li&gt;&lt;b&gt;category&lt;/b&gt; - Category of Variable&lt;/li&gt;&lt;/ul&gt;
     * @param {String} search Search query can be some fraction of a variable name.
     * @param {Object} opts Optional parameters
     * @param {String} opts.accessToken User&#39;s OAuth2 access token
     * @param {Number} opts.userId User&#39;s id
     * @param {String} opts.variableCategoryName Filter variables by category name. The variable categories include Activity, Causes of Illness, Cognitive Performance, Conditions, Environment, Foods, Location, Miscellaneous, Mood, Nutrition, Physical Activity, Physique, Sleep, Social Interactions, Symptoms, Treatments, Vital Signs, and Work.
     * @param {String} opts.source Specify a data source name to only return variables from a specific data source.
     * @param {String} opts.effectOrCause Indicate if you only want variables that have user correlations. Possible values are effect and cause.
     * @param {String} opts.publicEffectOrCause Indicate if you only want variables that have aggregated correlations.  Possible values are effect and cause.
     * @param {Number} opts.limit The LIMIT is used to limit the number of results returned. So if you have 1000 results, but only want to the first 10, you would set this to 10 and offset to 0.
     * @param {Number} opts.offset Since the maximum limit is 200 records, to get more than that you&#39;ll have to make multiple API calls and page through the results. To retrieve all the data, you can iterate through data by using the &#x60;limit&#x60; and &#x60;offset&#x60; query parameters.  For example, if you want to retrieve data from 61-80 then you can use a query with the following parameters, &#x60;imit&#x3D;20&amp;offset&#x3D;60&#x60;.
     * @param {Number} opts.sort Sort by given field. If the field is prefixed with &#x60;-, it will sort in descending order.
     * @param {module:api/VariablesApi~v1PublicVariablesSearchSearchGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/Variable}
     */
    this.v1PublicVariablesSearchSearchGet = function(search, opts, callback) {
      opts = opts || {};
      var postBody = null;

      // verify the required parameter 'search' is set
      if (search == undefined || search == null) {
        throw new Error("Missing the required parameter 'search' when calling v1PublicVariablesSearchSearchGet");
      }


      var pathParams = {
        'search': search
      };
      var queryParams = {
        'access_token': opts['accessToken'],
        'userId': opts['userId'],
        'variableCategoryName': opts['variableCategoryName'],
        'source': opts['source'],
        'effectOrCause': opts['effectOrCause'],
        'publicEffectOrCause': opts['publicEffectOrCause'],
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
      var returnType = Variable;

      return this.apiClient.callApi(
        '/v1/public/variables/search/{search}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the v1UserVariablesDeletePost operation.
     * @callback module:api/VariablesApi~v1UserVariablesDeletePostCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Delete All Measurements For Variable
     * Users can delete all of their measurements for a variable
     * @param {module:model/UserVariableDelete} variableId Id of the variable whose measurements should be deleted
     * @param {module:api/VariablesApi~v1UserVariablesDeletePostCallback} callback The callback function, accepting three arguments: error, data, response
     */
    this.v1UserVariablesDeletePost = function(variableId, callback) {
      var postBody = variableId;

      // verify the required parameter 'variableId' is set
      if (variableId == undefined || variableId == null) {
        throw new Error("Missing the required parameter 'variableId' when calling v1UserVariablesDeletePost");
      }


      var pathParams = {
      };
      var queryParams = {
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
        '/v1/userVariables/delete', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the v1UserVariablesPost operation.
     * @callback module:api/VariablesApi~v1UserVariablesPostCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Update User Settings for a Variable
     * Users can change the parameters used in analysis of that variable such as the expected duration of action for a variable to have an effect, the estimated delay before the onset of action. In order to filter out erroneous data, they are able to set the maximum and minimum reasonable daily values for a variable.
     * @param {module:model/UserVariables} userVariables Variable user settings data
     * @param {module:api/VariablesApi~v1UserVariablesPostCallback} callback The callback function, accepting three arguments: error, data, response
     */
    this.v1UserVariablesPost = function(userVariables, callback) {
      var postBody = userVariables;

      // verify the required parameter 'userVariables' is set
      if (userVariables == undefined || userVariables == null) {
        throw new Error("Missing the required parameter 'userVariables' when calling v1UserVariablesPost");
      }


      var pathParams = {
      };
      var queryParams = {
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
        '/v1/userVariables', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the v1UserVariablesResetPost operation.
     * @callback module:api/VariablesApi~v1UserVariablesResetPostCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Reset user settings for a variable to defaults
     * Reset user settings for a variable to defaults
     * @param {module:model/UserVariableDelete} variableId Id of the variable that should be reset
     * @param {module:api/VariablesApi~v1UserVariablesResetPostCallback} callback The callback function, accepting three arguments: error, data, response
     */
    this.v1UserVariablesResetPost = function(variableId, callback) {
      var postBody = variableId;

      // verify the required parameter 'variableId' is set
      if (variableId == undefined || variableId == null) {
        throw new Error("Missing the required parameter 'variableId' when calling v1UserVariablesResetPost");
      }


      var pathParams = {
      };
      var queryParams = {
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
        '/v1/userVariables/reset', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the v1VariableCategoriesGet operation.
     * @callback module:api/VariablesApi~v1VariableCategoriesGetCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/VariableCategory>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Variable categories
     * The variable categories include Activity, Causes of Illness, Cognitive Performance, Conditions, Environment, Foods, Location, Miscellaneous, Mood, Nutrition, Physical Activity, Physique, Sleep, Social Interactions, Symptoms, Treatments, Vital Signs, and Work.
     * @param {module:api/VariablesApi~v1VariableCategoriesGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Array.<module:model/VariableCategory>}
     */
    this.v1VariableCategoriesGet = function(callback) {
      var postBody = null;


      var pathParams = {
      };
      var queryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['access_token', 'quantimodo_oauth2'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = [VariableCategory];

      return this.apiClient.callApi(
        '/v1/variableCategories', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the v1VariablesGet operation.
     * @callback module:api/VariablesApi~v1VariablesGetCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Variable} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Get variables with user&#39;s settings
     * Get variables for which the user has measurements. If the user has specified variable settings, these are provided instead of the common variable defaults.
     * @param {Object} opts Optional parameters
     * @param {String} opts.accessToken User&#39;s OAuth2 access token
     * @param {Number} opts.userId User&#39;s id
     * @param {Number} opts.id Common variable id
     * @param {String} opts.category Filter data by category
     * @param {String} opts.name Original name of the variable (supports exact name match only)
     * @param {String} opts.updatedAt Filter by the last time any of the properties of the variable were changed. Uses UTC format \&quot;YYYY-MM-DDThh:mm:ss\&quot;
     * @param {String} opts.source The name of the data source that created the variable (supports exact name match only). So if you have a client application and you only want variables that were last updated by your app, you can include the name of your app here
     * @param {String} opts.latestMeasurementTime Filter variables based on the last time a measurement for them was created or updated in the UTC format \&quot;YYYY-MM-DDThh:mm:ss\&quot;
     * @param {String} opts.numberOfRawMeasurements Filter variables by the total number of measurements that they have. This could be used of you want to filter or sort by popularity.
     * @param {String} opts.lastSource Limit variables to those which measurements were last submitted by a specific source. So if you have a client application and you only want variables that were last updated by your app, you can include the name of your app here. (supports exact name match only)
     * @param {Number} opts.limit The LIMIT is used to limit the number of results returned. So if you have 1000 results, but only want to the first 10, you would set this to 10 and offset to 0.
     * @param {Number} opts.offset Since the maximum limit is 200 records, to get more than that you&#39;ll have to make multiple API calls and page through the results. To retrieve all the data, you can iterate through data by using the &#x60;limit&#x60; and &#x60;offset&#x60; query parameters.  For example, if you want to retrieve data from 61-80 then you can use a query with the following parameters, &#x60;imit&#x3D;20&amp;offset&#x3D;60&#x60;.
     * @param {Number} opts.sort Sort by given field. If the field is prefixed with &#x60;-, it will sort in descending order.
     * @param {module:api/VariablesApi~v1VariablesGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/Variable}
     */
    this.v1VariablesGet = function(opts, callback) {
      opts = opts || {};
      var postBody = null;


      var pathParams = {
      };
      var queryParams = {
        'access_token': opts['accessToken'],
        'userId': opts['userId'],
        'id': opts['id'],
        'category': opts['category'],
        'name': opts['name'],
        'updatedAt': opts['updatedAt'],
        'source': opts['source'],
        'latestMeasurementTime': opts['latestMeasurementTime'],
        'numberOfRawMeasurements': opts['numberOfRawMeasurements'],
        'lastSource': opts['lastSource'],
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
      var returnType = Variable;

      return this.apiClient.callApi(
        '/v1/variables', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the v1VariablesPost operation.
     * @callback module:api/VariablesApi~v1VariablesPostCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Create Variables
     * Allows the client to create a new variable in the &#x60;variables&#x60; table.
     * @param {module:model/VariablesNew} body Original name for the variable.
     * @param {Object} opts Optional parameters
     * @param {String} opts.accessToken User&#39;s OAuth2 access token
     * @param {Number} opts.userId User&#39;s id
     * @param {module:api/VariablesApi~v1VariablesPostCallback} callback The callback function, accepting three arguments: error, data, response
     */
    this.v1VariablesPost = function(body, opts, callback) {
      opts = opts || {};
      var postBody = body;

      // verify the required parameter 'body' is set
      if (body == undefined || body == null) {
        throw new Error("Missing the required parameter 'body' when calling v1VariablesPost");
      }


      var pathParams = {
      };
      var queryParams = {
        'access_token': opts['accessToken'],
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
        '/v1/variables', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the v1VariablesSearchSearchGet operation.
     * @callback module:api/VariablesApi~v1VariablesSearchSearchGetCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/Variable>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Get variables by search query
     * Get variables containing the search characters for which the currently logged in user has measurements. Used to provide auto-complete function in variable search boxes.
     * @param {String} search Search query which may be an entire variable name or a fragment of one.
     * @param {Object} opts Optional parameters
     * @param {String} opts.accessToken User&#39;s OAuth2 access token
     * @param {Number} opts.userId User&#39;s id
     * @param {String} opts.variableCategoryName Filter variables by category name. The variable categories include Activity, Causes of Illness, Cognitive Performance, Conditions, Environment, Foods, Location, Miscellaneous, Mood, Nutrition, Physical Activity, Physique, Sleep, Social Interactions, Symptoms, Treatments, Vital Signs, and Work.
     * @param {Boolean} opts.includePublic Set to true if you would like to include public variables when no user variables are found.
     * @param {Boolean} opts.manualTracking Set to true if you would like to exlude variables like apps and website names.
     * @param {String} opts.source Specify a data source name to only return variables from a specific data source.
     * @param {String} opts.effectOrCause Indicate if you only want variables that have user correlations. Possible values are effect and cause.
     * @param {String} opts.publicEffectOrCause Indicate if you only want variables that have aggregated correlations.  Possible values are effect and cause.
     * @param {Number} opts.limit The LIMIT is used to limit the number of results returned. So if you have 1000 results, but only want to the first 10, you would set this to 10 and offset to 0.
     * @param {Number} opts.offset Since the maximum limit is 200 records, to get more than that you&#39;ll have to make multiple API calls and page through the results. To retrieve all the data, you can iterate through data by using the &#x60;limit&#x60; and &#x60;offset&#x60; query parameters.  For example, if you want to retrieve data from 61-80 then you can use a query with the following parameters, &#x60;imit&#x3D;20&amp;offset&#x3D;60&#x60;.
     * @param {module:api/VariablesApi~v1VariablesSearchSearchGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Array.<module:model/Variable>}
     */
    this.v1VariablesSearchSearchGet = function(search, opts, callback) {
      opts = opts || {};
      var postBody = null;

      // verify the required parameter 'search' is set
      if (search == undefined || search == null) {
        throw new Error("Missing the required parameter 'search' when calling v1VariablesSearchSearchGet");
      }


      var pathParams = {
        'search': search
      };
      var queryParams = {
        'access_token': opts['accessToken'],
        'userId': opts['userId'],
        'variableCategoryName': opts['variableCategoryName'],
        'includePublic': opts['includePublic'],
        'manualTracking': opts['manualTracking'],
        'source': opts['source'],
        'effectOrCause': opts['effectOrCause'],
        'publicEffectOrCause': opts['publicEffectOrCause'],
        'limit': opts['limit'],
        'offset': opts['offset']
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['access_token', 'quantimodo_oauth2'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = [Variable];

      return this.apiClient.callApi(
        '/v1/variables/search/{search}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the v1VariablesVariableNameGet operation.
     * @callback module:api/VariablesApi~v1VariablesVariableNameGetCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Variable} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Get info about a variable
     * Get all of the settings and information about a variable by its name. If the logged in user has modified the settings for the variable, these will be provided instead of the default settings for that variable.
     * @param {String} variableName Variable name
     * @param {Object} opts Optional parameters
     * @param {String} opts.accessToken User&#39;s OAuth2 access token
     * @param {Number} opts.userId User&#39;s id
     * @param {module:api/VariablesApi~v1VariablesVariableNameGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/Variable}
     */
    this.v1VariablesVariableNameGet = function(variableName, opts, callback) {
      opts = opts || {};
      var postBody = null;

      // verify the required parameter 'variableName' is set
      if (variableName == undefined || variableName == null) {
        throw new Error("Missing the required parameter 'variableName' when calling v1VariablesVariableNameGet");
      }


      var pathParams = {
        'variableName': variableName
      };
      var queryParams = {
        'access_token': opts['accessToken'],
        'userId': opts['userId']
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['access_token', 'quantimodo_oauth2'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = Variable;

      return this.apiClient.callApi(
        '/v1/variables/{variableName}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
  };

  return exports;
}));
