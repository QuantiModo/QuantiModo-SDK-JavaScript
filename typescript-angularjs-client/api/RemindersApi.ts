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

import * as models from '../model/models';

/* tslint:disable:no-unused-variable member-ordering */

export class RemindersApi {
    protected basePath = 'https://app.quantimo.do/api';
    public defaultHeaders : any = {};

    static $inject: string[] = ['$http', '$httpParamSerializer', 'basePath'];

    constructor(protected $http: ng.IHttpService, protected $httpParamSerializer?: (d: any) => any, basePath?: string) {
        if (basePath !== undefined) {
            this.basePath = basePath;
        }
    }

    /**
     * Stop getting notifications to record data for a variable.  Previously recorded measurements will be preserved.
     * @summary Delete Tracking Reminder
     * @param body Id of reminder to be deleted
     * @param userId User&#39;s id
     */
    public deleteTrackingReminder (body: models.TrackingReminderDelete, userId?: number, extraHttpRequestParams?: any ) : ng.IHttpPromise<models.CommonResponse> {
        const localVarPath = this.basePath + '/v3/trackingReminders/delete';

        let queryParameters: any = {};
        let headerParams: any = (<any>Object).assign({}, this.defaultHeaders);
        // verify required parameter 'body' is not null or undefined
        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling deleteTrackingReminder.');
        }

        if (userId !== undefined) {
            queryParameters['userId'] = userId;
        }

        let httpRequestParams: ng.IRequestConfig = {
            method: 'DELETE',
            url: localVarPath,
            data: body,
            params: queryParameters,
            headers: headerParams
        };

        if (extraHttpRequestParams) {
            httpRequestParams = (<any>Object).assign(httpRequestParams, extraHttpRequestParams);
        }

        return this.$http(httpRequestParams);
    }
    /**
     * Specific tracking reminder notification instances that still need to be tracked.
     * @summary Get specific tracking reminder notifications
     * @param sort Sort by one of the listed field names. If the field name is prefixed with &#x60;-&#x60;, it will sort in descending order.
     * @param userId User&#39;s id
     * @param createdAt When the record was first created. Use UTC ISO 8601 YYYY-MM-DDThh:mm:ss datetime format. Time zone should be UTC and not local.
     * @param updatedAt When the record was last updated. Use UTC ISO 8601 YYYY-MM-DDThh:mm:ss datetime format. Time zone should be UTC and not local.
     * @param limit The LIMIT is used to limit the number of results returned. So if youhave 1000 results, but only want to the first 10, you would set this to 10 and offset to 0. The maximum limit is 200 records.
     * @param offset OFFSET says to skip that many rows before beginning to return rows to the client. OFFSET 0 is the same as omitting the OFFSET clause.If both OFFSET and LIMIT appear, then OFFSET rows are skipped before starting to count the LIMIT rows that are returned.
     * @param variableCategoryName Options: Activities, Books, Causes of Illness, Cognitive Performance, Conditions, Emotions, Environment, Foods, Location, Miscellaneous, Movies and TV, Music, Nutrients, Payments, Physical Activity, Physique, Sleep, Social Interactions, Software, Symptoms, Treatments, Vital Signs, Goals
     * @param reminderTime Ex: (lt)2017-07-31 21:43:26
     * @param clientId Your QuantiModo client id can be obtained by creating an app at https://builder.quantimo.do
     * @param onlyPast Ex: 1
     * @param includeDeleted Include deleted variables
     */
    public getTrackingReminderNotifications (sort?: string, userId?: number, createdAt?: string, updatedAt?: string, limit?: number, offset?: number, variableCategoryName?: string, reminderTime?: string, clientId?: string, onlyPast?: boolean, includeDeleted?: boolean, extraHttpRequestParams?: any ) : ng.IHttpPromise<models.GetTrackingReminderNotificationsResponse> {
        const localVarPath = this.basePath + '/v3/trackingReminderNotifications';

        let queryParameters: any = {};
        let headerParams: any = (<any>Object).assign({}, this.defaultHeaders);
        if (sort !== undefined) {
            queryParameters['sort'] = sort;
        }

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

        if (variableCategoryName !== undefined) {
            queryParameters['variableCategoryName'] = variableCategoryName;
        }

        if (reminderTime !== undefined) {
            queryParameters['reminderTime'] = reminderTime;
        }

        if (clientId !== undefined) {
            queryParameters['clientId'] = clientId;
        }

        if (onlyPast !== undefined) {
            queryParameters['onlyPast'] = onlyPast;
        }

        if (includeDeleted !== undefined) {
            queryParameters['includeDeleted'] = includeDeleted;
        }

        let httpRequestParams: ng.IRequestConfig = {
            method: 'GET',
            url: localVarPath,
            params: queryParameters,
            headers: headerParams
        };

        if (extraHttpRequestParams) {
            httpRequestParams = (<any>Object).assign(httpRequestParams, extraHttpRequestParams);
        }

        return this.$http(httpRequestParams);
    }
    /**
     * Users can be reminded to track certain variables at a specified frequency with a default value.
     * @summary Get repeating tracking reminder settings
     * @param userId User&#39;s id
     * @param variableCategoryName Options: Activities, Books, Causes of Illness, Cognitive Performance, Conditions, Emotions, Environment, Foods, Location, Miscellaneous, Movies and TV, Music, Nutrients, Payments, Physical Activity, Physique, Sleep, Social Interactions, Software, Symptoms, Treatments, Vital Signs, Goals
     * @param createdAt When the record was first created. Use UTC ISO 8601 YYYY-MM-DDThh:mm:ss datetime format. Time zone should be UTC and not local.
     * @param updatedAt When the record was last updated. Use UTC ISO 8601 YYYY-MM-DDThh:mm:ss datetime format. Time zone should be UTC and not local.
     * @param limit The LIMIT is used to limit the number of results returned. So if youhave 1000 results, but only want to the first 10, you would set this to 10 and offset to 0. The maximum limit is 200 records.
     * @param offset OFFSET says to skip that many rows before beginning to return rows to the client. OFFSET 0 is the same as omitting the OFFSET clause.If both OFFSET and LIMIT appear, then OFFSET rows are skipped before starting to count the LIMIT rows that are returned.
     * @param sort Sort by one of the listed field names. If the field name is prefixed with &#x60;-&#x60;, it will sort in descending order.
     * @param clientId Your QuantiModo client id can be obtained by creating an app at https://builder.quantimo.do
     * @param appVersion Ex: 2.1.1.0
     */
    public getTrackingReminders (userId?: number, variableCategoryName?: string, createdAt?: string, updatedAt?: string, limit?: number, offset?: number, sort?: string, clientId?: string, appVersion?: string, extraHttpRequestParams?: any ) : ng.IHttpPromise<Array<models.TrackingReminder>> {
        const localVarPath = this.basePath + '/v3/trackingReminders';

        let queryParameters: any = {};
        let headerParams: any = (<any>Object).assign({}, this.defaultHeaders);
        if (userId !== undefined) {
            queryParameters['userId'] = userId;
        }

        if (variableCategoryName !== undefined) {
            queryParameters['variableCategoryName'] = variableCategoryName;
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

        let httpRequestParams: ng.IRequestConfig = {
            method: 'GET',
            url: localVarPath,
            params: queryParameters,
            headers: headerParams
        };

        if (extraHttpRequestParams) {
            httpRequestParams = (<any>Object).assign(httpRequestParams, extraHttpRequestParams);
        }

        return this.$http(httpRequestParams);
    }
    /**
     * Snooze, skip, or track a tracking reminder notification
     * @summary Snooze, skip, or track a tracking reminder notification
     * @param body Id of the tracking reminder notification to be snoozed
     * @param userId User&#39;s id
     * @param clientId Your QuantiModo client id can be obtained by creating an app at https://builder.quantimo.do
     */
    public postTrackingReminderNotifications (body: Array<models.TrackingReminderNotificationPost>, userId?: number, clientId?: string, extraHttpRequestParams?: any ) : ng.IHttpPromise<models.CommonResponse> {
        const localVarPath = this.basePath + '/v3/trackingReminderNotifications';

        let queryParameters: any = {};
        let headerParams: any = (<any>Object).assign({}, this.defaultHeaders);
        // verify required parameter 'body' is not null or undefined
        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling postTrackingReminderNotifications.');
        }

        if (userId !== undefined) {
            queryParameters['userId'] = userId;
        }

        if (clientId !== undefined) {
            queryParameters['clientId'] = clientId;
        }

        let httpRequestParams: ng.IRequestConfig = {
            method: 'POST',
            url: localVarPath,
            data: body,
            params: queryParameters,
            headers: headerParams
        };

        if (extraHttpRequestParams) {
            httpRequestParams = (<any>Object).assign(httpRequestParams, extraHttpRequestParams);
        }

        return this.$http(httpRequestParams);
    }
    /**
     * This is to enable users to create reminders to track a variable with a default value at a specified frequency
     * @summary Store a Tracking Reminder
     * @param body TrackingReminder that should be stored
     */
    public postTrackingReminders (body: Array<models.TrackingReminder>, extraHttpRequestParams?: any ) : ng.IHttpPromise<models.PostTrackingRemindersResponse> {
        const localVarPath = this.basePath + '/v3/trackingReminders';

        let queryParameters: any = {};
        let headerParams: any = (<any>Object).assign({}, this.defaultHeaders);
        // verify required parameter 'body' is not null or undefined
        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling postTrackingReminders.');
        }

        let httpRequestParams: ng.IRequestConfig = {
            method: 'POST',
            url: localVarPath,
            data: body,
            params: queryParameters,
            headers: headerParams
        };

        if (extraHttpRequestParams) {
            httpRequestParams = (<any>Object).assign(httpRequestParams, extraHttpRequestParams);
        }

        return this.$http(httpRequestParams);
    }
}