/**
 * QuantiModo
 * QuantiModo makes it easy to retrieve normalized user data from a wide array of devices and applications. [Learn about QuantiModo](https://quantimo.do), check out our [docs](https://github.com/QuantiModo/docs) or contact us at [help.quantimo.do](https://help.quantimo.do). 
 *
 * OpenAPI spec version: 5.8.5
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
    define(['ApiClient', 'model/Connector', 'model/ConnectorInfo', 'model/ConnectorInstruction'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('../model/Connector'), require('../model/ConnectorInfo'), require('../model/ConnectorInstruction'));
  } else {
    // Browser globals (root is window)
    if (!root.QuantiModo) {
      root.QuantiModo = {};
    }
    root.QuantiModo.ConnectorsApi = factory(root.QuantiModo.ApiClient, root.QuantiModo.Connector, root.QuantiModo.ConnectorInfo, root.QuantiModo.ConnectorInstruction);
  }
}(this, function(ApiClient, Connector, ConnectorInfo, ConnectorInstruction) {
  'use strict';

  /**
   * Connectors service.
   * @module api/ConnectorsApi
   * @version 5.8.5
   */

  /**
   * Constructs a new ConnectorsApi. 
   * @alias module:api/ConnectorsApi
   * @class
   * @param {module:ApiClient} apiClient Optional API client implementation to use,
   * default to {@link module:ApiClient#instance} if unspecified.
   */
  var exports = function(apiClient) {
    this.apiClient = apiClient || ApiClient.instance;


    /**
     * Callback function to receive the result of the v1ConnectMobileGet operation.
     * @callback module:api/ConnectorsApi~v1ConnectMobileGetCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Mobile connect page
     * This page is designed to be opened in a webview.  Instead of using popup authentication boxes, it uses redirection. You can include the user&#39;s access_token as a URL parameter like https://app.quantimo.do/api/v1/connect/mobile?access_token&#x3D;123
     * @param {String} accessToken User OAuth access token
     * @param {Object} opts Optional parameters
     * @param {Number} opts.userId User&#39;s id
     * @param {module:api/ConnectorsApi~v1ConnectMobileGetCallback} callback The callback function, accepting three arguments: error, data, response
     */
    this.v1ConnectMobileGet = function(accessToken, opts, callback) {
      opts = opts || {};
      var postBody = null;

      // verify the required parameter 'accessToken' is set
      if (accessToken == undefined || accessToken == null) {
        throw new Error("Missing the required parameter 'accessToken' when calling v1ConnectMobileGet");
      }


      var pathParams = {
      };
      var queryParams = {
        'access_token': accessToken,
        'userId': opts['userId']
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = [];
      var contentTypes = ['application/json'];
      var accepts = ['text/html'];
      var returnType = null;

      return this.apiClient.callApi(
        '/v1/connect/mobile', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the v1ConnectorsConnectorNameConnectGet operation.
     * @callback module:api/ConnectorsApi~v1ConnectorsConnectorNameConnectGetCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Obtain a token from 3rd party data source
     * Attempt to obtain a token from the data provider, store it in the database. With this, the connector to continue to obtain new user data until the token is revoked.
     * @param {String} connectorName Lowercase system name of the source application or device. Get a list of available connectors from the /v1/connectors/list endpoint.
     * @param {Object} opts Optional parameters
     * @param {String} opts.accessToken User&#39;s OAuth2 access token
     * @param {Number} opts.userId User&#39;s id
     * @param {module:api/ConnectorsApi~v1ConnectorsConnectorNameConnectGetCallback} callback The callback function, accepting three arguments: error, data, response
     */
    this.v1ConnectorsConnectorNameConnectGet = function(connectorName, opts, callback) {
      opts = opts || {};
      var postBody = null;

      // verify the required parameter 'connectorName' is set
      if (connectorName == undefined || connectorName == null) {
        throw new Error("Missing the required parameter 'connectorName' when calling v1ConnectorsConnectorNameConnectGet");
      }


      var pathParams = {
        'connectorName': connectorName
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
        '/v1/connectors/{connectorName}/connect', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the v1ConnectorsConnectorNameConnectInstructionsGet operation.
     * @callback module:api/ConnectorsApi~v1ConnectorsConnectorNameConnectInstructionsGetCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Connection Instructions
     * Returns instructions that describe what parameters and endpoint to use to connect to the given data provider.
     * @param {String} connectorName Lowercase system name of the source application or device. Get a list of available connectors from the /v1/connectors/list endpoint.
     * @param {String} parameters JSON Array of Parameters for the request to enable connector.
     * @param {String} url URL which should be used to enable the connector.
     * @param {Boolean} usePopup Should use popup when enabling connector
     * @param {Object} opts Optional parameters
     * @param {String} opts.accessToken User&#39;s OAuth2 access token
     * @param {Number} opts.userId User&#39;s id
     * @param {module:api/ConnectorsApi~v1ConnectorsConnectorNameConnectInstructionsGetCallback} callback The callback function, accepting three arguments: error, data, response
     */
    this.v1ConnectorsConnectorNameConnectInstructionsGet = function(connectorName, parameters, url, usePopup, opts, callback) {
      opts = opts || {};
      var postBody = null;

      // verify the required parameter 'connectorName' is set
      if (connectorName == undefined || connectorName == null) {
        throw new Error("Missing the required parameter 'connectorName' when calling v1ConnectorsConnectorNameConnectInstructionsGet");
      }

      // verify the required parameter 'parameters' is set
      if (parameters == undefined || parameters == null) {
        throw new Error("Missing the required parameter 'parameters' when calling v1ConnectorsConnectorNameConnectInstructionsGet");
      }

      // verify the required parameter 'url' is set
      if (url == undefined || url == null) {
        throw new Error("Missing the required parameter 'url' when calling v1ConnectorsConnectorNameConnectInstructionsGet");
      }

      // verify the required parameter 'usePopup' is set
      if (usePopup == undefined || usePopup == null) {
        throw new Error("Missing the required parameter 'usePopup' when calling v1ConnectorsConnectorNameConnectInstructionsGet");
      }


      var pathParams = {
        'connectorName': connectorName
      };
      var queryParams = {
        'access_token': opts['accessToken'],
        'userId': opts['userId'],
        'parameters': parameters,
        'url': url,
        'usePopup': usePopup
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
        '/v1/connectors/{connectorName}/connectInstructions', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the v1ConnectorsConnectorNameConnectParameterGet operation.
     * @callback module:api/ConnectorsApi~v1ConnectorsConnectorNameConnectParameterGetCallback
     * @param {String} error Error message, if any.
     * @param {module:model/ConnectorInstruction} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Connect Parameter
     * Returns instructions that describe what parameters and endpoint to use to connect to the given data provider.
     * @param {String} connectorName Lowercase system name of the source application or device. Get a list of available connectors from the /v1/connectors/list endpoint.
     * @param {String} displayName Name of the parameter that is user visible in the form
     * @param {String} key Name of the property that the user has to enter such as username or password Connector (used in HTTP request)
     * @param {String} placeholder Placeholder hint value for the parameter input tag.
     * @param {String} type Type of input field such as those found here http://www.w3schools.com/tags/tag_input.asp
     * @param {Boolean} usePopup Should use popup when enabling connector
     * @param {Object} opts Optional parameters
     * @param {String} opts.accessToken User&#39;s OAuth2 access token
     * @param {Number} opts.userId User&#39;s id
     * @param {String} opts.defaultValue Default parameter value
     * @param {module:api/ConnectorsApi~v1ConnectorsConnectorNameConnectParameterGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/ConnectorInstruction}
     */
    this.v1ConnectorsConnectorNameConnectParameterGet = function(connectorName, displayName, key, placeholder, type, usePopup, opts, callback) {
      opts = opts || {};
      var postBody = null;

      // verify the required parameter 'connectorName' is set
      if (connectorName == undefined || connectorName == null) {
        throw new Error("Missing the required parameter 'connectorName' when calling v1ConnectorsConnectorNameConnectParameterGet");
      }

      // verify the required parameter 'displayName' is set
      if (displayName == undefined || displayName == null) {
        throw new Error("Missing the required parameter 'displayName' when calling v1ConnectorsConnectorNameConnectParameterGet");
      }

      // verify the required parameter 'key' is set
      if (key == undefined || key == null) {
        throw new Error("Missing the required parameter 'key' when calling v1ConnectorsConnectorNameConnectParameterGet");
      }

      // verify the required parameter 'placeholder' is set
      if (placeholder == undefined || placeholder == null) {
        throw new Error("Missing the required parameter 'placeholder' when calling v1ConnectorsConnectorNameConnectParameterGet");
      }

      // verify the required parameter 'type' is set
      if (type == undefined || type == null) {
        throw new Error("Missing the required parameter 'type' when calling v1ConnectorsConnectorNameConnectParameterGet");
      }

      // verify the required parameter 'usePopup' is set
      if (usePopup == undefined || usePopup == null) {
        throw new Error("Missing the required parameter 'usePopup' when calling v1ConnectorsConnectorNameConnectParameterGet");
      }


      var pathParams = {
        'connectorName': connectorName
      };
      var queryParams = {
        'access_token': opts['accessToken'],
        'userId': opts['userId'],
        'defaultValue': opts['defaultValue'],
        'displayName': displayName,
        'key': key,
        'placeholder': placeholder,
        'type': type,
        'usePopup': usePopup
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['access_token', 'quantimodo_oauth2'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = ConnectorInstruction;

      return this.apiClient.callApi(
        '/v1/connectors/{connectorName}/connectParameter', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the v1ConnectorsConnectorNameDisconnectGet operation.
     * @callback module:api/ConnectorsApi~v1ConnectorsConnectorNameDisconnectGetCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Delete stored connection info
     * The disconnect method deletes any stored tokens or connection information from the connectors database.
     * @param {String} connectorName Lowercase system name of the source application or device. Get a list of available connectors from the /v1/connectors/list endpoint.
     * @param {module:api/ConnectorsApi~v1ConnectorsConnectorNameDisconnectGetCallback} callback The callback function, accepting three arguments: error, data, response
     */
    this.v1ConnectorsConnectorNameDisconnectGet = function(connectorName, callback) {
      var postBody = null;

      // verify the required parameter 'connectorName' is set
      if (connectorName == undefined || connectorName == null) {
        throw new Error("Missing the required parameter 'connectorName' when calling v1ConnectorsConnectorNameDisconnectGet");
      }


      var pathParams = {
        'connectorName': connectorName
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
        '/v1/connectors/{connectorName}/disconnect', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the v1ConnectorsConnectorNameInfoGet operation.
     * @callback module:api/ConnectorsApi~v1ConnectorsConnectorNameInfoGetCallback
     * @param {String} error Error message, if any.
     * @param {module:model/ConnectorInfo} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Get connector info for user
     * Returns information about the connector such as the connector id, whether or not is connected for this user (i.e. we have a token or credentials), and its update history for the user.
     * @param {String} connectorName Lowercase system name of the source application or device. Get a list of available connectors from the /v1/connectors/list endpoint.
     * @param {Object} opts Optional parameters
     * @param {String} opts.accessToken User&#39;s OAuth2 access token
     * @param {Number} opts.userId User&#39;s id
     * @param {module:api/ConnectorsApi~v1ConnectorsConnectorNameInfoGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/ConnectorInfo}
     */
    this.v1ConnectorsConnectorNameInfoGet = function(connectorName, opts, callback) {
      opts = opts || {};
      var postBody = null;

      // verify the required parameter 'connectorName' is set
      if (connectorName == undefined || connectorName == null) {
        throw new Error("Missing the required parameter 'connectorName' when calling v1ConnectorsConnectorNameInfoGet");
      }


      var pathParams = {
        'connectorName': connectorName
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
      var returnType = ConnectorInfo;

      return this.apiClient.callApi(
        '/v1/connectors/{connectorName}/info', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the v1ConnectorsConnectorNameUpdateGet operation.
     * @callback module:api/ConnectorsApi~v1ConnectorsConnectorNameUpdateGetCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Sync with data source
     * The update method tells the QM Connector Framework to check with the data provider (such as Fitbit or MyFitnessPal) and retrieve any new measurements available.
     * @param {String} connectorName Lowercase system name of the source application or device
     * @param {Object} opts Optional parameters
     * @param {String} opts.accessToken User&#39;s OAuth2 access token
     * @param {Number} opts.userId User&#39;s id
     * @param {module:api/ConnectorsApi~v1ConnectorsConnectorNameUpdateGetCallback} callback The callback function, accepting three arguments: error, data, response
     */
    this.v1ConnectorsConnectorNameUpdateGet = function(connectorName, opts, callback) {
      opts = opts || {};
      var postBody = null;

      // verify the required parameter 'connectorName' is set
      if (connectorName == undefined || connectorName == null) {
        throw new Error("Missing the required parameter 'connectorName' when calling v1ConnectorsConnectorNameUpdateGet");
      }


      var pathParams = {
        'connectorName': connectorName
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
        '/v1/connectors/{connectorName}/update', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the v1ConnectorsListGet operation.
     * @callback module:api/ConnectorsApi~v1ConnectorsListGetCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/Connector>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * List of Connectors
     * A connector pulls data from other data providers using their API or a screenscraper. Returns a list of all available connectors and information about them such as their id, name, whether the user has provided access, logo url, connection instructions, and the update history.
     * @param {module:api/ConnectorsApi~v1ConnectorsListGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Array.<module:model/Connector>}
     */
    this.v1ConnectorsListGet = function(callback) {
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
      var returnType = [Connector];

      return this.apiClient.callApi(
        '/v1/connectors/list', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the v1IntegrationJsGet operation.
     * @callback module:api/ConnectorsApi~v1IntegrationJsGetCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Get embeddable connect javascript
     * Get embeddable connect javascript. Usage:   - Embedding in applications with popups for 3rd-party authentication windows.     Use &#x60;qmSetupInPopup&#x60; function after connecting &#x60;connect.js&#x60;.   - Embedding in applications with popups for 3rd-party authentication windows.     Requires a selector to block. It will be embedded in this block.     Use &#x60;qmSetupOnPage&#x60; function after connecting &#x60;connect.js&#x60;.   - Embedding in mobile applications without popups for 3rd-party authentication.     Use &#x60;qmSetupOnMobile&#x60; function after connecting &#x60;connect.js&#x60;.     If using in a Cordova application call  &#x60;qmSetupOnIonic&#x60; function after connecting &#x60;connect.js&#x60;.
     * @param {Object} opts Optional parameters
     * @param {String} opts.accessToken User&#39;s OAuth2 access token
     * @param {module:api/ConnectorsApi~v1IntegrationJsGetCallback} callback The callback function, accepting three arguments: error, data, response
     */
    this.v1IntegrationJsGet = function(opts, callback) {
      opts = opts || {};
      var postBody = null;


      var pathParams = {
      };
      var queryParams = {
        'access_token': opts['accessToken']
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = [];
      var contentTypes = ['application/json'];
      var accepts = ['application/x-javascript'];
      var returnType = null;

      return this.apiClient.callApi(
        '/v1/integration.js', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
  };

  return exports;
}));
