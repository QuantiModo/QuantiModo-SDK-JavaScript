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
    define(['ApiClient', 'model/User', 'model/UserTokenFailedResponse', 'model/UserTokenRequest', 'model/UserTokenSuccessfulResponse'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('../model/User'), require('../model/UserTokenFailedResponse'), require('../model/UserTokenRequest'), require('../model/UserTokenSuccessfulResponse'));
  } else {
    // Browser globals (root is window)
    if (!root.QuantiModo) {
      root.QuantiModo = {};
    }
    root.QuantiModo.UserApi = factory(root.QuantiModo.ApiClient, root.QuantiModo.User, root.QuantiModo.UserTokenFailedResponse, root.QuantiModo.UserTokenRequest, root.QuantiModo.UserTokenSuccessfulResponse);
  }
}(this, function(ApiClient, User, UserTokenFailedResponse, UserTokenRequest, UserTokenSuccessfulResponse) {
  'use strict';

  /**
   * User service.
   * @module api/UserApi
   * @version 5.8.5
   */

  /**
   * Constructs a new UserApi. 
   * @alias module:api/UserApi
   * @class
   * @param {module:ApiClient} apiClient Optional API client implementation to use,
   * default to {@link module:ApiClient#instance} if unspecified.
   */
  var exports = function(apiClient) {
    this.apiClient = apiClient || ApiClient.instance;


    /**
     * Callback function to receive the result of the v1OrganizationsOrganizationIdUsersPost operation.
     * @callback module:api/UserApi~v1OrganizationsOrganizationIdUsersPostCallback
     * @param {String} error Error message, if any.
     * @param {module:model/UserTokenSuccessfulResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Get user tokens for existing users, create new users
     * Get user tokens for existing users, create new users
     * @param {Number} organizationId Organization ID
     * @param {module:model/UserTokenRequest} body Provides organization token and user ID
     * @param {Object} opts Optional parameters
     * @param {String} opts.accessToken User&#39;s OAuth2 access token
     * @param {Number} opts.userId User&#39;s id
     * @param {module:api/UserApi~v1OrganizationsOrganizationIdUsersPostCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/UserTokenSuccessfulResponse}
     */
    this.v1OrganizationsOrganizationIdUsersPost = function(organizationId, body, opts, callback) {
      opts = opts || {};
      var postBody = body;

      // verify the required parameter 'organizationId' is set
      if (organizationId == undefined || organizationId == null) {
        throw new Error("Missing the required parameter 'organizationId' when calling v1OrganizationsOrganizationIdUsersPost");
      }

      // verify the required parameter 'body' is set
      if (body == undefined || body == null) {
        throw new Error("Missing the required parameter 'body' when calling v1OrganizationsOrganizationIdUsersPost");
      }


      var pathParams = {
        'organizationId': organizationId
      };
      var queryParams = {
        'access_token': opts['accessToken'],
        'userId': opts['userId']
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = [];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = UserTokenSuccessfulResponse;

      return this.apiClient.callApi(
        '/v1/organizations/{organizationId}/users', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the v1UserMeGet operation.
     * @callback module:api/UserApi~v1UserMeGetCallback
     * @param {String} error Error message, if any.
     * @param {module:model/User} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Get all available units for variableGet authenticated user
     * Returns user info for the currently authenticated user.
     * @param {module:api/UserApi~v1UserMeGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/User}
     */
    this.v1UserMeGet = function(callback) {
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
      var returnType = User;

      return this.apiClient.callApi(
        '/v1/user/me', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
  };

  return exports;
}));
