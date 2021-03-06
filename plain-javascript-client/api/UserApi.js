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
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/CommonResponse', 'model/PostUserSettingsResponse', 'model/User', 'model/UserBlogsResponse', 'model/UsersResponse'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('../model/CommonResponse'), require('../model/PostUserSettingsResponse'), require('../model/User'), require('../model/UserBlogsResponse'), require('../model/UsersResponse'));
  } else {
    // Browser globals (root is window)
    if (!root.Quantimodo) {
      root.Quantimodo = {};
    }
    root.Quantimodo.UserApi = factory(root.Quantimodo.ApiClient, root.Quantimodo.CommonResponse, root.Quantimodo.PostUserSettingsResponse, root.Quantimodo.User, root.Quantimodo.UserBlogsResponse, root.Quantimodo.UsersResponse);
  }
}(this, function(ApiClient, CommonResponse, PostUserSettingsResponse, User, UserBlogsResponse, UsersResponse) {
  'use strict';

  /**
   * User service.
   * @module api/UserApi
   * @version 5.8.112511
   */

  /**
   * Constructs a new UserApi. 
   * @alias module:api/UserApi
   * @class
   * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
   * default to {@link module:ApiClient#instance} if unspecified.
   */
  var exports = function(apiClient) {
    this.apiClient = apiClient || ApiClient.instance;


    /**
     * Callback function to receive the result of the deleteUser operation.
     * @callback module:api/UserApi~deleteUserCallback
     * @param {String} error Error message, if any.
     * @param {module:model/CommonResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Delete user
     * Delete user account. Only the client app that created a user can delete that user.
     * @param {String} reason Ex: I hate you!
     * @param {Object} opts Optional parameters
     * @param {String} opts.clientId Your QuantiModo client id can be obtained by creating an app at https://builder.quantimo.do
     * @param {module:model/String} opts.platform Ex: chrome, android, ios, web
     * @param {module:api/UserApi~deleteUserCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/CommonResponse}
     */
    this.deleteUser = function(reason, opts, callback) {
      opts = opts || {};
      var postBody = null;

      // verify the required parameter 'reason' is set
      if (reason === undefined || reason === null) {
        throw new Error("Missing the required parameter 'reason' when calling deleteUser");
      }


      var pathParams = {
      };
      var queryParams = {
        'clientId': opts['clientId'],
        'reason': reason,
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
      var returnType = CommonResponse;

      return this.apiClient.callApi(
        '/v3/user/delete', 'DELETE',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the getUser operation.
     * @callback module:api/UserApi~getUserCallback
     * @param {String} error Error message, if any.
     * @param {module:model/User} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Get user info
     * Returns user info.  If no userId is specified, returns info for currently authenticated user
     * @param {Object} opts Optional parameters
     * @param {Number} opts.userId User&#39;s id
     * @param {String} opts.createdAt When the record was first created. Use UTC ISO 8601 YYYY-MM-DDThh:mm:ss datetime format. Time zone should be UTC and not local.
     * @param {String} opts.updatedAt When the record was last updated. Use UTC ISO 8601 YYYY-MM-DDThh:mm:ss datetime format. Time zone should be UTC and not local.
     * @param {Number} opts.limit The LIMIT is used to limit the number of results returned. So if youhave 1000 results, but only want to the first 10, you would set this to 10 and offset to 0. The maximum limit is 200 records. (default to 100)
     * @param {Number} opts.offset OFFSET says to skip that many rows before beginning to return rows to the client. OFFSET 0 is the same as omitting the OFFSET clause.If both OFFSET and LIMIT appear, then OFFSET rows are skipped before starting to count the LIMIT rows that are returned.
     * @param {String} opts.sort Sort by one of the listed field names. If the field name is prefixed with &#x60;-&#x60;, it will sort in descending order.
     * @param {String} opts.clientId Your QuantiModo client id can be obtained by creating an app at https://builder.quantimo.do
     * @param {String} opts.appVersion Ex: 2.1.1.0
     * @param {Number} opts.clientUserId Ex: 74802
     * @param {module:model/String} opts.platform Ex: chrome, android, ios, web
     * @param {String} opts.log Username or email
     * @param {String} opts.pwd User password
     * @param {Boolean} opts.includeAuthorizedClients Return list of apps, studies, and individuals with access to user data
     * @param {module:api/UserApi~getUserCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/User}
     */
    this.getUser = function(opts, callback) {
      opts = opts || {};
      var postBody = null;


      var pathParams = {
      };
      var queryParams = {
        'userId': opts['userId'],
        'createdAt': opts['createdAt'],
        'updatedAt': opts['updatedAt'],
        'limit': opts['limit'],
        'offset': opts['offset'],
        'sort': opts['sort'],
        'clientId': opts['clientId'],
        'appVersion': opts['appVersion'],
        'clientUserId': opts['clientUserId'],
        'platform': opts['platform'],
        'log': opts['log'],
        'pwd': opts['pwd'],
        'includeAuthorizedClients': opts['includeAuthorizedClients'],
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
      var returnType = User;

      return this.apiClient.callApi(
        '/v3/user', 'GET',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the getUserBlogs operation.
     * @callback module:api/UserApi~getUserBlogsCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/UserBlogsResponse>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Get UserBlogs
     * Get UserBlogs
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
     * @param {module:api/UserApi~getUserBlogsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Array.<module:model/UserBlogsResponse>}
     */
    this.getUserBlogs = function(opts, callback) {
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
      var returnType = [UserBlogsResponse];

      return this.apiClient.callApi(
        '/v3/userBlogs', 'GET',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the getUsers operation.
     * @callback module:api/UserApi~getUsersCallback
     * @param {String} error Error message, if any.
     * @param {module:model/UsersResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Get users who shared data
     * Returns users who have granted access to their data
     * @param {Object} opts Optional parameters
     * @param {Number} opts.userId User&#39;s id
     * @param {String} opts.createdAt When the record was first created. Use UTC ISO 8601 YYYY-MM-DDThh:mm:ss datetime format. Time zone should be UTC and not local.
     * @param {String} opts.updatedAt When the record was last updated. Use UTC ISO 8601 YYYY-MM-DDThh:mm:ss datetime format. Time zone should be UTC and not local.
     * @param {Number} opts.limit The LIMIT is used to limit the number of results returned. So if youhave 1000 results, but only want to the first 10, you would set this to 10 and offset to 0. The maximum limit is 200 records. (default to 100)
     * @param {Number} opts.offset OFFSET says to skip that many rows before beginning to return rows to the client. OFFSET 0 is the same as omitting the OFFSET clause.If both OFFSET and LIMIT appear, then OFFSET rows are skipped before starting to count the LIMIT rows that are returned.
     * @param {String} opts.sort Sort by one of the listed field names. If the field name is prefixed with &#x60;-&#x60;, it will sort in descending order.
     * @param {String} opts.clientId Your QuantiModo client id can be obtained by creating an app at https://builder.quantimo.do
     * @param {String} opts.appVersion Ex: 2.1.1.0
     * @param {Number} opts.clientUserId Ex: 74802
     * @param {module:model/String} opts.platform Ex: chrome, android, ios, web
     * @param {String} opts.log Username or email
     * @param {String} opts.pwd User password
     * @param {module:api/UserApi~getUsersCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/UsersResponse}
     */
    this.getUsers = function(opts, callback) {
      opts = opts || {};
      var postBody = null;


      var pathParams = {
      };
      var queryParams = {
        'userId': opts['userId'],
        'createdAt': opts['createdAt'],
        'updatedAt': opts['updatedAt'],
        'limit': opts['limit'],
        'offset': opts['offset'],
        'sort': opts['sort'],
        'clientId': opts['clientId'],
        'appVersion': opts['appVersion'],
        'clientUserId': opts['clientUserId'],
        'platform': opts['platform'],
        'log': opts['log'],
        'pwd': opts['pwd'],
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
      var returnType = UsersResponse;

      return this.apiClient.callApi(
        '/v3/users', 'GET',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the postUserBlogs operation.
     * @callback module:api/UserApi~postUserBlogsCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/UserBlogsResponse>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Post UserBlogs
     * Post UserBlogs
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
     * @param {module:api/UserApi~postUserBlogsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Array.<module:model/UserBlogsResponse>}
     */
    this.postUserBlogs = function(opts, callback) {
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
      var returnType = [UserBlogsResponse];

      return this.apiClient.callApi(
        '/v3/userBlogs', 'POST',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the postUserSettings operation.
     * @callback module:api/UserApi~postUserSettingsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/PostUserSettingsResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Post UserSettings
     * Post UserSettings
     * @param {module:model/User} body User settings to update
     * @param {Object} opts Optional parameters
     * @param {String} opts.clientId Your QuantiModo client id can be obtained by creating an app at https://builder.quantimo.do
     * @param {module:model/String} opts.platform Ex: chrome, android, ios, web
     * @param {module:api/UserApi~postUserSettingsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/PostUserSettingsResponse}
     */
    this.postUserSettings = function(body, opts, callback) {
      opts = opts || {};
      var postBody = body;

      // verify the required parameter 'body' is set
      if (body === undefined || body === null) {
        throw new Error("Missing the required parameter 'body' when calling postUserSettings");
      }


      var pathParams = {
      };
      var queryParams = {
        'clientId': opts['clientId'],
        'platform': opts['platform'],
      };
      var collectionQueryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = [];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = PostUserSettingsResponse;

      return this.apiClient.callApi(
        '/v3/userSettings', 'POST',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
  };

  return exports;
}));
