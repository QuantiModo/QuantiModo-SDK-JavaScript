"use strict";
/**
 * quantimodo
 * We make it easy to retrieve and analyze normalized user data from a wide array of devices and applications. Check out our [docs and sdk's](https://github.com/QuantiModo/docs) or [contact us](https://help.quantimo.do).
 *
 * OpenAPI spec version: 5.8.112511
 *
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable:no-unused-variable member-ordering */
var UserApi = /** @class */ (function () {
    function UserApi($http, $httpParamSerializer, basePath) {
        this.$http = $http;
        this.$httpParamSerializer = $httpParamSerializer;
        this.basePath = 'https://app.quantimo.do/api';
        this.defaultHeaders = {};
        if (basePath !== undefined) {
            this.basePath = basePath;
        }
    }
    /**
     * Delete user account. Only the client app that created a user can delete that user.
     * @summary Delete user
     * @param reason Ex: I hate you!
     * @param clientId Your QuantiModo client id can be obtained by creating an app at https://builder.quantimo.do
     */
    UserApi.prototype.deleteUser = function (reason, clientId, extraHttpRequestParams) {
        var localVarPath = this.basePath + '/v3/user/delete';
        var queryParameters = {};
        var headerParams = Object.assign({}, this.defaultHeaders);
        // verify required parameter 'reason' is not null or undefined
        if (reason === null || reason === undefined) {
            throw new Error('Required parameter reason was null or undefined when calling deleteUser.');
        }
        if (clientId !== undefined) {
            queryParameters['clientId'] = clientId;
        }
        if (reason !== undefined) {
            queryParameters['reason'] = reason;
        }
        var httpRequestParams = {
            method: 'DELETE',
            url: localVarPath,
            params: queryParameters,
            headers: headerParams
        };
        if (extraHttpRequestParams) {
            httpRequestParams = Object.assign(httpRequestParams, extraHttpRequestParams);
        }
        return this.$http(httpRequestParams);
    };
    /**
     * Returns user info.  If no userId is specified, returns info for currently authenticated user
     * @summary Get user info
     * @param userId User&#39;s id
     * @param createdAt When the record was first created. Use UTC ISO 8601 YYYY-MM-DDThh:mm:ss datetime format. Time zone should be UTC and not local.
     * @param updatedAt When the record was last updated. Use UTC ISO 8601 YYYY-MM-DDThh:mm:ss datetime format. Time zone should be UTC and not local.
     * @param limit The LIMIT is used to limit the number of results returned. So if youhave 1000 results, but only want to the first 10, you would set this to 10 and offset to 0. The maximum limit is 200 records.
     * @param offset OFFSET says to skip that many rows before beginning to return rows to the client. OFFSET 0 is the same as omitting the OFFSET clause.If both OFFSET and LIMIT appear, then OFFSET rows are skipped before starting to count the LIMIT rows that are returned.
     * @param sort Sort by one of the listed field names. If the field name is prefixed with &#x60;-&#x60;, it will sort in descending order.
     * @param clientId Your QuantiModo client id can be obtained by creating an app at https://builder.quantimo.do
     * @param appVersion Ex: 2.1.1.0
     * @param clientUserId Ex: 74802
     * @param log Username or email
     * @param pwd User password
     * @param includeAuthorizedClients Return list of apps, studies, and individuals with access to user data
     */
    UserApi.prototype.getUser = function (userId, createdAt, updatedAt, limit, offset, sort, clientId, appVersion, clientUserId, log, pwd, includeAuthorizedClients, extraHttpRequestParams) {
        var localVarPath = this.basePath + '/v3/user';
        var queryParameters = {};
        var headerParams = Object.assign({}, this.defaultHeaders);
        if (userId !== undefined) {
            queryParameters['userId'] = userId;
        }
        if (createdAt !== undefined) {
            queryParameters['createdAt'] = createdAt;
        }
        if (updatedAt !== undefined) {
            queryParameters['updatedAt'] = updatedAt;
        }
        if (limit !== undefined) {
            queryParameters['limit'] = limit;
        }
        if (offset !== undefined) {
            queryParameters['offset'] = offset;
        }
        if (sort !== undefined) {
            queryParameters['sort'] = sort;
        }
        if (clientId !== undefined) {
            queryParameters['clientId'] = clientId;
        }
        if (appVersion !== undefined) {
            queryParameters['appVersion'] = appVersion;
        }
        if (clientUserId !== undefined) {
            queryParameters['clientUserId'] = clientUserId;
        }
        if (log !== undefined) {
            queryParameters['log'] = log;
        }
        if (pwd !== undefined) {
            queryParameters['pwd'] = pwd;
        }
        if (includeAuthorizedClients !== undefined) {
            queryParameters['includeAuthorizedClients'] = includeAuthorizedClients;
        }
        var httpRequestParams = {
            method: 'GET',
            url: localVarPath,
            params: queryParameters,
            headers: headerParams
        };
        if (extraHttpRequestParams) {
            httpRequestParams = Object.assign(httpRequestParams, extraHttpRequestParams);
        }
        return this.$http(httpRequestParams);
    };
    /**
     * Get UserBlogs
     * @summary Get UserBlogs
     * @param sort Sort by one of the listed field names. If the field name is prefixed with &#x60;-&#x60;, it will sort in descending order.
     * @param limit The LIMIT is used to limit the number of results returned. So if youhave 1000 results, but only want to the first 10, you would set this to 10 and offset to 0. The maximum limit is 200 records.
     * @param offset OFFSET says to skip that many rows before beginning to return rows to the client. OFFSET 0 is the same as omitting the OFFSET clause.If both OFFSET and LIMIT appear, then OFFSET rows are skipped before starting to count the LIMIT rows that are returned.
     * @param updatedAt When the record was last updated. Use UTC ISO 8601 YYYY-MM-DDThh:mm:ss datetime format. Time zone should be UTC and not local.
     * @param userId User&#39;s id
     * @param createdAt When the record was first created. Use UTC ISO 8601 YYYY-MM-DDThh:mm:ss datetime format. Time zone should be UTC and not local.
     * @param id Id
     * @param clientId Your QuantiModo client id can be obtained by creating an app at https://builder.quantimo.do
     */
    UserApi.prototype.getUserBlogs = function (sort, limit, offset, updatedAt, userId, createdAt, id, clientId, extraHttpRequestParams) {
        var localVarPath = this.basePath + '/v3/userBlogs';
        var queryParameters = {};
        var headerParams = Object.assign({}, this.defaultHeaders);
        if (sort !== undefined) {
            queryParameters['sort'] = sort;
        }
        if (limit !== undefined) {
            queryParameters['limit'] = limit;
        }
        if (offset !== undefined) {
            queryParameters['offset'] = offset;
        }
        if (updatedAt !== undefined) {
            queryParameters['updatedAt'] = updatedAt;
        }
        if (userId !== undefined) {
            queryParameters['userId'] = userId;
        }
        if (createdAt !== undefined) {
            queryParameters['createdAt'] = createdAt;
        }
        if (id !== undefined) {
            queryParameters['id'] = id;
        }
        if (clientId !== undefined) {
            queryParameters['clientId'] = clientId;
        }
        var httpRequestParams = {
            method: 'GET',
            url: localVarPath,
            params: queryParameters,
            headers: headerParams
        };
        if (extraHttpRequestParams) {
            httpRequestParams = Object.assign(httpRequestParams, extraHttpRequestParams);
        }
        return this.$http(httpRequestParams);
    };
    /**
     * Returns users who have granted access to their data
     * @summary Get users who shared data
     * @param userId User&#39;s id
     * @param createdAt When the record was first created. Use UTC ISO 8601 YYYY-MM-DDThh:mm:ss datetime format. Time zone should be UTC and not local.
     * @param updatedAt When the record was last updated. Use UTC ISO 8601 YYYY-MM-DDThh:mm:ss datetime format. Time zone should be UTC and not local.
     * @param limit The LIMIT is used to limit the number of results returned. So if youhave 1000 results, but only want to the first 10, you would set this to 10 and offset to 0. The maximum limit is 200 records.
     * @param offset OFFSET says to skip that many rows before beginning to return rows to the client. OFFSET 0 is the same as omitting the OFFSET clause.If both OFFSET and LIMIT appear, then OFFSET rows are skipped before starting to count the LIMIT rows that are returned.
     * @param sort Sort by one of the listed field names. If the field name is prefixed with &#x60;-&#x60;, it will sort in descending order.
     * @param clientId Your QuantiModo client id can be obtained by creating an app at https://builder.quantimo.do
     * @param appVersion Ex: 2.1.1.0
     * @param clientUserId Ex: 74802
     * @param log Username or email
     * @param pwd User password
     */
    UserApi.prototype.getUsers = function (userId, createdAt, updatedAt, limit, offset, sort, clientId, appVersion, clientUserId, log, pwd, extraHttpRequestParams) {
        var localVarPath = this.basePath + '/v3/users';
        var queryParameters = {};
        var headerParams = Object.assign({}, this.defaultHeaders);
        if (userId !== undefined) {
            queryParameters['userId'] = userId;
        }
        if (createdAt !== undefined) {
            queryParameters['createdAt'] = createdAt;
        }
        if (updatedAt !== undefined) {
            queryParameters['updatedAt'] = updatedAt;
        }
        if (limit !== undefined) {
            queryParameters['limit'] = limit;
        }
        if (offset !== undefined) {
            queryParameters['offset'] = offset;
        }
        if (sort !== undefined) {
            queryParameters['sort'] = sort;
        }
        if (clientId !== undefined) {
            queryParameters['clientId'] = clientId;
        }
        if (appVersion !== undefined) {
            queryParameters['appVersion'] = appVersion;
        }
        if (clientUserId !== undefined) {
            queryParameters['clientUserId'] = clientUserId;
        }
        if (log !== undefined) {
            queryParameters['log'] = log;
        }
        if (pwd !== undefined) {
            queryParameters['pwd'] = pwd;
        }
        var httpRequestParams = {
            method: 'GET',
            url: localVarPath,
            params: queryParameters,
            headers: headerParams
        };
        if (extraHttpRequestParams) {
            httpRequestParams = Object.assign(httpRequestParams, extraHttpRequestParams);
        }
        return this.$http(httpRequestParams);
    };
    /**
     * Post UserBlogs
     * @summary Post UserBlogs
     * @param sort Sort by one of the listed field names. If the field name is prefixed with &#x60;-&#x60;, it will sort in descending order.
     * @param limit The LIMIT is used to limit the number of results returned. So if youhave 1000 results, but only want to the first 10, you would set this to 10 and offset to 0. The maximum limit is 200 records.
     * @param offset OFFSET says to skip that many rows before beginning to return rows to the client. OFFSET 0 is the same as omitting the OFFSET clause.If both OFFSET and LIMIT appear, then OFFSET rows are skipped before starting to count the LIMIT rows that are returned.
     * @param updatedAt When the record was last updated. Use UTC ISO 8601 YYYY-MM-DDThh:mm:ss datetime format. Time zone should be UTC and not local.
     * @param userId User&#39;s id
     * @param createdAt When the record was first created. Use UTC ISO 8601 YYYY-MM-DDThh:mm:ss datetime format. Time zone should be UTC and not local.
     * @param id Id
     * @param clientId Your QuantiModo client id can be obtained by creating an app at https://builder.quantimo.do
     */
    UserApi.prototype.postUserBlogs = function (sort, limit, offset, updatedAt, userId, createdAt, id, clientId, extraHttpRequestParams) {
        var localVarPath = this.basePath + '/v3/userBlogs';
        var queryParameters = {};
        var headerParams = Object.assign({}, this.defaultHeaders);
        if (sort !== undefined) {
            queryParameters['sort'] = sort;
        }
        if (limit !== undefined) {
            queryParameters['limit'] = limit;
        }
        if (offset !== undefined) {
            queryParameters['offset'] = offset;
        }
        if (updatedAt !== undefined) {
            queryParameters['updatedAt'] = updatedAt;
        }
        if (userId !== undefined) {
            queryParameters['userId'] = userId;
        }
        if (createdAt !== undefined) {
            queryParameters['createdAt'] = createdAt;
        }
        if (id !== undefined) {
            queryParameters['id'] = id;
        }
        if (clientId !== undefined) {
            queryParameters['clientId'] = clientId;
        }
        var httpRequestParams = {
            method: 'POST',
            url: localVarPath,
            params: queryParameters,
            headers: headerParams
        };
        if (extraHttpRequestParams) {
            httpRequestParams = Object.assign(httpRequestParams, extraHttpRequestParams);
        }
        return this.$http(httpRequestParams);
    };
    /**
     * Post UserSettings
     * @summary Post UserSettings
     * @param body User settings to update
     * @param clientId Your QuantiModo client id can be obtained by creating an app at https://builder.quantimo.do
     */
    UserApi.prototype.postUserSettings = function (body, clientId, extraHttpRequestParams) {
        var localVarPath = this.basePath + '/v3/userSettings';
        var queryParameters = {};
        var headerParams = Object.assign({}, this.defaultHeaders);
        // verify required parameter 'body' is not null or undefined
        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling postUserSettings.');
        }
        if (clientId !== undefined) {
            queryParameters['clientId'] = clientId;
        }
        var httpRequestParams = {
            method: 'POST',
            url: localVarPath,
            data: body,
            params: queryParameters,
            headers: headerParams
        };
        if (extraHttpRequestParams) {
            httpRequestParams = Object.assign(httpRequestParams, extraHttpRequestParams);
        }
        return this.$http(httpRequestParams);
    };
    UserApi.$inject = ['$http', '$httpParamSerializer', 'basePath'];
    return UserApi;
}());
exports.UserApi = UserApi;
//# sourceMappingURL=UserApi.js.map