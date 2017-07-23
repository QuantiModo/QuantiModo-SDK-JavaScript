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
    define(['ApiClient'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'));
  } else {
    // Browser globals (root is window)
    if (!root.quantimodo-api) {
      root.quantimodo-api = {};
    }
    root.quantimodo-api.AuthenticationApi = factory(root.quantimodo-api.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';

  /**
   * Authentication service.
   * @module api/AuthenticationApi
   * @version 2.0
   */

  /**
   * Constructs a new AuthenticationApi. 
   * @alias module:api/AuthenticationApi
   * @class
   * @param {module:ApiClient} apiClient Optional API client implementation to use,
   * default to {@link module:ApiClient#instance} if unspecified.
   */
  var exports = function(apiClient) {
    this.apiClient = apiClient || ApiClient.instance;


    /**
     * Callback function to receive the result of the v2AuthSocialAuthorizeCodeGet operation.
     * @callback module:api/AuthenticationApi~v2AuthSocialAuthorizeCodeGetCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Second Step in Social Authentication flow with JWT Token
     *  Here is the flow for how social authentication works with a JWT Token 1.**Client:** The client needs to open popup with social auth url (&#x60;https://app/quantimo.do/api/v2/auth/social/login?provider&#x3D;{provider}&amp;redirectUrl&#x3D;{url}&#x60;) of server with &#x60;provider&#x60; and &#x60;redirectUrl&#x60;. (Url should be registered with our social apps. Facebook is fine with any redirect url with the same domain base url but Google needs exact redirect url.) 2.**Server:** The QM server will redirect user to that provider to get access. 3.**Client:** After successful or failed authentication, it will be redirected to given &#x60;redirectUrl&#x60; with code or error. 4.**Client:** The client needs to get that code and needs to send an Ajax request to server at &#x60;https://app.quantimo.do/api/v2/auth/social/authorizeCode?provider&#x3D;{provider}&amp;code&#x3D;{authorizationCode}&#x60; 5.**Server:** The QM server will authorize that code from the social connection and will authenticate user and will retrieve user info. 6.**Server:** The QM server will try to find existing user by unique identity. If the user already exists then it will login. Otherwise, it will create new user and will then login. 7.**Server:** Once user is found/created, it will return a JWT token for that user in the response.
     * @param {String} code Authorization code obtained from the provider.
     * @param {String} provider The current options are &#x60;google&#x60; and &#x60;facebook&#x60;.
     * @param {module:api/AuthenticationApi~v2AuthSocialAuthorizeCodeGetCallback} callback The callback function, accepting three arguments: error, data, response
     */
    this.v2AuthSocialAuthorizeCodeGet = function(code, provider, callback) {
      var postBody = null;

      // verify the required parameter 'code' is set
      if (code == undefined || code == null) {
        throw new Error("Missing the required parameter 'code' when calling v2AuthSocialAuthorizeCodeGet");
      }

      // verify the required parameter 'provider' is set
      if (provider == undefined || provider == null) {
        throw new Error("Missing the required parameter 'provider' when calling v2AuthSocialAuthorizeCodeGet");
      }


      var pathParams = {
      };
      var queryParams = {
        'code': code,
        'provider': provider
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
        '/v2/auth/social/authorizeCode', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the v2AuthSocialAuthorizeTokenGet operation.
     * @callback module:api/AuthenticationApi~v2AuthSocialAuthorizeTokenGetCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Native Social Authentication
     * If you are using native authentication via Facebook or Google SDKs then you should use the following flow. 1.**Client:** Using native authentication via your native mobile app, get an access token using the instructions provided by the Facebook SDK (https://developers.facebook.com/docs/facebook-login) or Google (https://developers.google.com/identity/protocols/OAuth2) 2.**Client:** Send an Ajax request with provider name and access token on &#x60;https://app.quantimo.do/api/v2/auth/social/authorizeToken?provider&#x3D;{provider}&amp;accessToken&#x3D;{accessToken}&amp;refreshToken&#x3D;{refreshToken}&#x60; (&#x60;refreshToken&#x60; is optional) 3.**Server:** Server will try to get user info and will find existing user by unique identity. If user exist then it will do a login for that or it will create new user and will do login 4.**Server:** Once user is found/created, it will return a JWT token for that user in response 5.**Client:** After getting the JWT token to get a QM access token follow these steps and include your JWT token in them as a header (Authorization: Bearer **{yourJWThere}**) or as a url parameter (https://app.quantimo.do/api/v2/oauth/authorize?token&#x3D;{yourJWThere}).
     * @param {String} accessToken User&#39;s OAuth2 access token obtained from Google or FB native SDK
     * @param {String} provider The current options are &#x60;google&#x60; and &#x60;facebook&#x60;.
     * @param {Object} opts Optional parameters
     * @param {String} opts.refreshToken Optional refresh token obtained from Google or FB native SDK
     * @param {module:api/AuthenticationApi~v2AuthSocialAuthorizeTokenGetCallback} callback The callback function, accepting three arguments: error, data, response
     */
    this.v2AuthSocialAuthorizeTokenGet = function(accessToken, provider, opts, callback) {
      opts = opts || {};
      var postBody = null;

      // verify the required parameter 'accessToken' is set
      if (accessToken == undefined || accessToken == null) {
        throw new Error("Missing the required parameter 'accessToken' when calling v2AuthSocialAuthorizeTokenGet");
      }

      // verify the required parameter 'provider' is set
      if (provider == undefined || provider == null) {
        throw new Error("Missing the required parameter 'provider' when calling v2AuthSocialAuthorizeTokenGet");
      }


      var pathParams = {
      };
      var queryParams = {
        'refreshToken': opts['refreshToken'],
        'accessToken': accessToken,
        'provider': provider
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
        '/v2/auth/social/authorizeToken', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the v2AuthSocialLoginGet operation.
     * @callback module:api/AuthenticationApi~v2AuthSocialLoginGetCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * First Setp in Social Authentication flow with JWT Token
     *  Here is the flow for how social authentication works with a JWT Token 1.**Client:** The client needs to open popup with social auth url (&#x60;https://app/quantimo.do/api/v2/auth/social/login?provider&#x3D;{provider}&amp;redirectUrl&#x3D;{url}&#x60;) of server with &#x60;provider&#x60; and &#x60;redirectUrl&#x60;. (Url should be registered with our social apps. Facebook and Twitter are fine with any redirect url with the same domain base url but Google needs exact redirect url.) 2.**Server:** The QM server will redirect user to that provider to get access. 3.**Client:** After successful or failed authentication, it will be redirected to given &#x60;redirectUrl&#x60; with code or error. 4.**Client:** The client needs to get that code and needs to send an Ajax request to server at &#x60;https://app.quantimo.do/api/v2/auth/social/authorizeCode?provider&#x3D;{provider}&amp;code&#x3D;{authorizationCode}&#x60; 5.**Server:** The QM server will authorize that code from the social connection and will authenticate user and will retrieve user info. 6.**Server:** The QM server will try to find existing user by unique identity. If the user already exists then it will login. Otherwise, it will create new user and will then login. 7.**Server:** Once user is found/created, it will return a JWT token for that user in the response.
     * @param {String} redirectUrl The redirect URI is the URL within your client application that will receive the OAuth2 credentials. Url should be registered with our social apps. Facebook and Twitter are fine with any redirect url with the same domain base url but Google needs exact redirect url.
     * @param {String} provider The current options are &#x60;google&#x60; and &#x60;facebook&#x60;.
     * @param {module:api/AuthenticationApi~v2AuthSocialLoginGetCallback} callback The callback function, accepting three arguments: error, data, response
     */
    this.v2AuthSocialLoginGet = function(redirectUrl, provider, callback) {
      var postBody = null;

      // verify the required parameter 'redirectUrl' is set
      if (redirectUrl == undefined || redirectUrl == null) {
        throw new Error("Missing the required parameter 'redirectUrl' when calling v2AuthSocialLoginGet");
      }

      // verify the required parameter 'provider' is set
      if (provider == undefined || provider == null) {
        throw new Error("Missing the required parameter 'provider' when calling v2AuthSocialLoginGet");
      }


      var pathParams = {
      };
      var queryParams = {
        'redirectUrl': redirectUrl,
        'provider': provider
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
        '/v2/auth/social/login', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the v2Oauth2AccessTokenGet operation.
     * @callback module:api/AuthenticationApi~v2Oauth2AccessTokenGetCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Get a user access token
     * Client provides authorization token obtained from /api/v1/oauth2/authorize to this endpoint and receives an access token. Access token can then be used to query different API endpoints of QuantiModo. ### Request Access Token After user approves your access to the given scope form the https:/app.quantimo.do/v2/oauth2/authorize endpoint, you&#39;ll receive an authorization code to request an access token. This time make a &#x60;POST&#x60; request to &#x60;/api/v2/oauth/access_token&#x60; with parameters including: * &#x60;grant_type&#x60; Can be &#x60;authorization_code&#x60; or &#x60;refresh_token&#x60; since we are getting the &#x60;access_token&#x60; for the first time we don&#39;t have a &#x60;refresh_token&#x60; so this must be &#x60;authorization_code&#x60;. * &#x60;code&#x60; Authorization code you received with the previous request. * &#x60;redirect_uri&#x60; Your application&#39;s redirect url. ### Refreshing Access Token Access tokens expire at some point, to continue using our api you need to refresh them with &#x60;refresh_token&#x60; you received along with the &#x60;access_token&#x60;. To do this make a &#x60;POST&#x60; request to &#x60;/api/v2/oauth/access_token&#x60; with correct parameters, which are: * &#x60;grant_type&#x60; This time grant type must be &#x60;refresh_token&#x60; since we have it. * &#x60;clientId&#x60; Your application&#39;s client id. * &#x60;client_secret&#x60; Your application&#39;s client secret. * &#x60;refresh_token&#x60; The refresh token you received with the &#x60;access_token&#x60;. Every request you make to this endpoint will give you a new refresh token and make the old one expired. So you can keep getting new access tokens with new refresh tokens. ### Using Access Token Currently we support 2 ways for this, you can&#39;t use both at the same time. * Adding access token to the request header as &#x60;Authorization: Bearer {access_token}&#x60; * Adding to the url as a query parameter &#x60;?access_token&#x3D;{access_token}&#x60; You can read more about OAuth2 from [here](http://oauth.net/2/)
     * @param {String} clientId This is the unique ID that QuantiModo uses to identify your application. Obtain a client id by emailing info@quantimo.do.
     * @param {String} clientSecret This is the secret for your obtained clientId. QuantiModo uses this to validate that only your application uses the clientId.
     * @param {String} grantType Grant Type can be &#39;authorization_code&#39; or &#39;refresh_token&#39;
     * @param {String} code Authorization code you received with the previous request.
     * @param {Object} opts Optional parameters
     * @param {String} opts.responseType If the value is code, launches a Basic flow, requiring a POST to the token endpoint to obtain the tokens. If the value is token id_token or id_token token, launches an Implicit flow, requiring the use of Javascript at the redirect URI to retrieve tokens from the URI #fragment.
     * @param {String} opts.scope Scopes include basic, readmeasurements, and writemeasurements. The \&quot;basic\&quot; scope allows you to read user info (displayname, email, etc). The \&quot;readmeasurements\&quot; scope allows one to read a user&#39;s data. The \&quot;writemeasurements\&quot; scope allows you to write user data. Separate multiple scopes by a space.
     * @param {String} opts.redirectUri The redirect URI is the URL within your client application that will receive the OAuth2 credentials.
     * @param {String} opts.state An opaque string that is round-tripped in the protocol; that is to say, it is returned as a URI parameter in the Basic flow, and in the URI
     * @param {module:api/AuthenticationApi~v2Oauth2AccessTokenGetCallback} callback The callback function, accepting three arguments: error, data, response
     */
    this.v2Oauth2AccessTokenGet = function(clientId, clientSecret, grantType, code, opts, callback) {
      opts = opts || {};
      var postBody = null;

      // verify the required parameter 'clientId' is set
      if (clientId == undefined || clientId == null) {
        throw new Error("Missing the required parameter 'clientId' when calling v2Oauth2AccessTokenGet");
      }

      // verify the required parameter 'clientSecret' is set
      if (clientSecret == undefined || clientSecret == null) {
        throw new Error("Missing the required parameter 'clientSecret' when calling v2Oauth2AccessTokenGet");
      }

      // verify the required parameter 'grantType' is set
      if (grantType == undefined || grantType == null) {
        throw new Error("Missing the required parameter 'grantType' when calling v2Oauth2AccessTokenGet");
      }

      // verify the required parameter 'code' is set
      if (code == undefined || code == null) {
        throw new Error("Missing the required parameter 'code' when calling v2Oauth2AccessTokenGet");
      }


      var pathParams = {
      };
      var queryParams = {
        'clientId': clientId,
        'client_secret': clientSecret,
        'grant_type': grantType,
        'code': code,
        'response_type': opts['responseType'],
        'scope': opts['scope'],
        'redirect_uri': opts['redirectUri'],
        'state': opts['state']
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
        '/v2/oauth2/access_token', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the v2OauthAuthorizeGet operation.
     * @callback module:api/AuthenticationApi~v2OauthAuthorizeGetCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Request Authorization Code
     * You can implement OAuth2 authentication to your application using our **OAuth2** endpoints.  You need to redirect users to &#x60;/api/v2/oauth/authorize&#x60; endpoint to get an authorization code and include the parameters below.   This page will ask the user if they want to allow a client&#39;s application to submit or obtain data from their QM account. It will redirect the user to the url provided by the client application with the code as a query parameter or error in case of an error. See the /api/v2/oauth/access_token endpoint for the next steps.
     * @param {String} clientId This is the unique ID that QuantiModo uses to identify your application. Obtain a client id by creating a free application at [https://app.quantimo.do/api/v2/apps](https://app.quantimo.do/api/v2/apps).
     * @param {String} clientSecret This is the secret for your obtained clientId. QuantiModo uses this to validate that only your application uses the clientId.  Obtain this by creating a free application at [https://app.quantimo.do/api/v2/apps](https://app.quantimo.do/api/v2/apps).
     * @param {String} responseType If the value is code, launches a Basic flow, requiring a POST to the token endpoint to obtain the tokens. If the value is token id_token or id_token token, launches an Implicit flow, requiring the use of Javascript at the redirect URI to retrieve tokens from the URI #fragment.
     * @param {String} scope Scopes include basic, readmeasurements, and writemeasurements. The \&quot;basic\&quot; scope allows you to read user info (displayname, email, etc). The \&quot;readmeasurements\&quot; scope allows one to read a user&#39;s data. The \&quot;writemeasurements\&quot; scope allows you to write user data. Separate multiple scopes by a space.
     * @param {Object} opts Optional parameters
     * @param {String} opts.redirectUri The redirect URI is the URL within your client application that will receive the OAuth2 credentials.
     * @param {String} opts.state An opaque string that is round-tripped in the protocol; that is to say, it is returned as a URI parameter in the Basic flow, and in the URI
     * @param {module:api/AuthenticationApi~v2OauthAuthorizeGetCallback} callback The callback function, accepting three arguments: error, data, response
     */
    this.v2OauthAuthorizeGet = function(clientId, clientSecret, responseType, scope, opts, callback) {
      opts = opts || {};
      var postBody = null;

      // verify the required parameter 'clientId' is set
      if (clientId == undefined || clientId == null) {
        throw new Error("Missing the required parameter 'clientId' when calling v2OauthAuthorizeGet");
      }

      // verify the required parameter 'clientSecret' is set
      if (clientSecret == undefined || clientSecret == null) {
        throw new Error("Missing the required parameter 'clientSecret' when calling v2OauthAuthorizeGet");
      }

      // verify the required parameter 'responseType' is set
      if (responseType == undefined || responseType == null) {
        throw new Error("Missing the required parameter 'responseType' when calling v2OauthAuthorizeGet");
      }

      // verify the required parameter 'scope' is set
      if (scope == undefined || scope == null) {
        throw new Error("Missing the required parameter 'scope' when calling v2OauthAuthorizeGet");
      }


      var pathParams = {
      };
      var queryParams = {
        'clientId': clientId,
        'client_secret': clientSecret,
        'response_type': responseType,
        'scope': scope,
        'redirect_uri': opts['redirectUri'],
        'state': opts['state']
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
        '/v2/oauth/authorize', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
  };

  return exports;
}));