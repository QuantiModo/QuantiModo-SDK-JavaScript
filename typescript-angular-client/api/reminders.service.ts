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
/* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional }                      from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,
         HttpResponse, HttpEvent }                           from '@angular/common/http';
import { CustomHttpUrlEncodingCodec }                        from '../encoder';

import { Observable }                                        from 'rxjs/Observable';

import { CommonResponse } from '../model/commonResponse';
import { GetTrackingReminderNotificationsResponse } from '../model/getTrackingReminderNotificationsResponse';
import { PostTrackingRemindersResponse } from '../model/postTrackingRemindersResponse';
import { TrackingReminder } from '../model/trackingReminder';
import { TrackingReminderDelete } from '../model/trackingReminderDelete';
import { TrackingReminderNotificationPost } from '../model/trackingReminderNotificationPost';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable()
export class RemindersService {

    protected basePath = 'https://app.quantimo.do/api';
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();

    constructor(protected httpClient: HttpClient, @Optional()@Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
        if (basePath) {
            this.basePath = basePath;
        }
        if (configuration) {
            this.configuration = configuration;
            this.basePath = basePath || configuration.basePath || this.basePath;
        }
    }

    /**
     * @param consumes string[] mime-types
     * @return true: consumes contains 'multipart/form-data', false: otherwise
     */
    private canConsumeForm(consumes: string[]): boolean {
        const form = 'multipart/form-data';
        for (const consume of consumes) {
            if (form === consume) {
                return true;
            }
        }
        return false;
    }


    /**
     * Delete Tracking Reminder
     * Stop getting notifications to record data for a variable.  Previously recorded measurements will be preserved.
     * @param body Id of reminder to be deleted
     * @param userId User&#39;s id
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public deleteTrackingReminder(body: TrackingReminderDelete, userId?: number, observe?: 'body', reportProgress?: boolean): Observable<CommonResponse>;
    public deleteTrackingReminder(body: TrackingReminderDelete, userId?: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<CommonResponse>>;
    public deleteTrackingReminder(body: TrackingReminderDelete, userId?: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<CommonResponse>>;
    public deleteTrackingReminder(body: TrackingReminderDelete, userId?: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling deleteTrackingReminder.');
        }


        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (userId !== undefined && userId !== null) {
            queryParameters = queryParameters.set('userId', <any>userId);
        }

        let headers = this.defaultHeaders;

        // authentication (access_token) required
        if (this.configuration.apiKeys["access_token"]) {
            queryParameters = queryParameters.set('access_token', this.configuration.apiKeys["access_token"]);
        }

        // authentication (quantimodo_oauth2) required
        if (this.configuration.accessToken) {
            const accessToken = typeof this.configuration.accessToken === 'function'
                ? this.configuration.accessToken()
                : this.configuration.accessToken;
            headers = headers.set('Authorization', 'Bearer ' + accessToken);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.delete<CommonResponse>(`${this.basePath}/v3/trackingReminders/delete`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Get specific tracking reminder notifications
     * Specific tracking reminder notification instances that still need to be tracked.
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
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getTrackingReminderNotifications(sort?: string, userId?: number, createdAt?: string, updatedAt?: string, limit?: number, offset?: number, variableCategoryName?: string, reminderTime?: string, clientId?: string, onlyPast?: boolean, includeDeleted?: boolean, observe?: 'body', reportProgress?: boolean): Observable<GetTrackingReminderNotificationsResponse>;
    public getTrackingReminderNotifications(sort?: string, userId?: number, createdAt?: string, updatedAt?: string, limit?: number, offset?: number, variableCategoryName?: string, reminderTime?: string, clientId?: string, onlyPast?: boolean, includeDeleted?: boolean, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<GetTrackingReminderNotificationsResponse>>;
    public getTrackingReminderNotifications(sort?: string, userId?: number, createdAt?: string, updatedAt?: string, limit?: number, offset?: number, variableCategoryName?: string, reminderTime?: string, clientId?: string, onlyPast?: boolean, includeDeleted?: boolean, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<GetTrackingReminderNotificationsResponse>>;
    public getTrackingReminderNotifications(sort?: string, userId?: number, createdAt?: string, updatedAt?: string, limit?: number, offset?: number, variableCategoryName?: string, reminderTime?: string, clientId?: string, onlyPast?: boolean, includeDeleted?: boolean, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {












        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (sort !== undefined && sort !== null) {
            queryParameters = queryParameters.set('sort', <any>sort);
        }
        if (userId !== undefined && userId !== null) {
            queryParameters = queryParameters.set('userId', <any>userId);
        }
        if (createdAt !== undefined && createdAt !== null) {
            queryParameters = queryParameters.set('createdAt', <any>createdAt);
        }
        if (updatedAt !== undefined && updatedAt !== null) {
            queryParameters = queryParameters.set('updatedAt', <any>updatedAt);
        }
        if (limit !== undefined && limit !== null) {
            queryParameters = queryParameters.set('limit', <any>limit);
        }
        if (offset !== undefined && offset !== null) {
            queryParameters = queryParameters.set('offset', <any>offset);
        }
        if (variableCategoryName !== undefined && variableCategoryName !== null) {
            queryParameters = queryParameters.set('variableCategoryName', <any>variableCategoryName);
        }
        if (reminderTime !== undefined && reminderTime !== null) {
            queryParameters = queryParameters.set('reminderTime', <any>reminderTime);
        }
        if (clientId !== undefined && clientId !== null) {
            queryParameters = queryParameters.set('clientId', <any>clientId);
        }
        if (onlyPast !== undefined && onlyPast !== null) {
            queryParameters = queryParameters.set('onlyPast', <any>onlyPast);
        }
        if (includeDeleted !== undefined && includeDeleted !== null) {
            queryParameters = queryParameters.set('includeDeleted', <any>includeDeleted);
        }

        let headers = this.defaultHeaders;

        // authentication (access_token) required
        if (this.configuration.apiKeys["access_token"]) {
            queryParameters = queryParameters.set('access_token', this.configuration.apiKeys["access_token"]);
        }

        // authentication (quantimodo_oauth2) required
        if (this.configuration.accessToken) {
            const accessToken = typeof this.configuration.accessToken === 'function'
                ? this.configuration.accessToken()
                : this.configuration.accessToken;
            headers = headers.set('Authorization', 'Bearer ' + accessToken);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];

        return this.httpClient.get<GetTrackingReminderNotificationsResponse>(`${this.basePath}/v3/trackingReminderNotifications`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Get repeating tracking reminder settings
     * Users can be reminded to track certain variables at a specified frequency with a default value.
     * @param userId User&#39;s id
     * @param variableCategoryName Options: Activities, Books, Causes of Illness, Cognitive Performance, Conditions, Emotions, Environment, Foods, Location, Miscellaneous, Movies and TV, Music, Nutrients, Payments, Physical Activity, Physique, Sleep, Social Interactions, Software, Symptoms, Treatments, Vital Signs, Goals
     * @param createdAt When the record was first created. Use UTC ISO 8601 YYYY-MM-DDThh:mm:ss datetime format. Time zone should be UTC and not local.
     * @param updatedAt When the record was last updated. Use UTC ISO 8601 YYYY-MM-DDThh:mm:ss datetime format. Time zone should be UTC and not local.
     * @param limit The LIMIT is used to limit the number of results returned. So if youhave 1000 results, but only want to the first 10, you would set this to 10 and offset to 0. The maximum limit is 200 records.
     * @param offset OFFSET says to skip that many rows before beginning to return rows to the client. OFFSET 0 is the same as omitting the OFFSET clause.If both OFFSET and LIMIT appear, then OFFSET rows are skipped before starting to count the LIMIT rows that are returned.
     * @param sort Sort by one of the listed field names. If the field name is prefixed with &#x60;-&#x60;, it will sort in descending order.
     * @param clientId Your QuantiModo client id can be obtained by creating an app at https://builder.quantimo.do
     * @param appVersion Ex: 2.1.1.0
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getTrackingReminders(userId?: number, variableCategoryName?: string, createdAt?: string, updatedAt?: string, limit?: number, offset?: number, sort?: string, clientId?: string, appVersion?: string, observe?: 'body', reportProgress?: boolean): Observable<Array<TrackingReminder>>;
    public getTrackingReminders(userId?: number, variableCategoryName?: string, createdAt?: string, updatedAt?: string, limit?: number, offset?: number, sort?: string, clientId?: string, appVersion?: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<TrackingReminder>>>;
    public getTrackingReminders(userId?: number, variableCategoryName?: string, createdAt?: string, updatedAt?: string, limit?: number, offset?: number, sort?: string, clientId?: string, appVersion?: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<TrackingReminder>>>;
    public getTrackingReminders(userId?: number, variableCategoryName?: string, createdAt?: string, updatedAt?: string, limit?: number, offset?: number, sort?: string, clientId?: string, appVersion?: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {










        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (userId !== undefined && userId !== null) {
            queryParameters = queryParameters.set('userId', <any>userId);
        }
        if (variableCategoryName !== undefined && variableCategoryName !== null) {
            queryParameters = queryParameters.set('variableCategoryName', <any>variableCategoryName);
        }
        if (createdAt !== undefined && createdAt !== null) {
            queryParameters = queryParameters.set('createdAt', <any>createdAt);
        }
        if (updatedAt !== undefined && updatedAt !== null) {
            queryParameters = queryParameters.set('updatedAt', <any>updatedAt);
        }
        if (limit !== undefined && limit !== null) {
            queryParameters = queryParameters.set('limit', <any>limit);
        }
        if (offset !== undefined && offset !== null) {
            queryParameters = queryParameters.set('offset', <any>offset);
        }
        if (sort !== undefined && sort !== null) {
            queryParameters = queryParameters.set('sort', <any>sort);
        }
        if (clientId !== undefined && clientId !== null) {
            queryParameters = queryParameters.set('clientId', <any>clientId);
        }
        if (appVersion !== undefined && appVersion !== null) {
            queryParameters = queryParameters.set('appVersion', <any>appVersion);
        }

        let headers = this.defaultHeaders;

        // authentication (access_token) required
        if (this.configuration.apiKeys["access_token"]) {
            queryParameters = queryParameters.set('access_token', this.configuration.apiKeys["access_token"]);
        }

        // authentication (quantimodo_oauth2) required
        if (this.configuration.accessToken) {
            const accessToken = typeof this.configuration.accessToken === 'function'
                ? this.configuration.accessToken()
                : this.configuration.accessToken;
            headers = headers.set('Authorization', 'Bearer ' + accessToken);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];

        return this.httpClient.get<Array<TrackingReminder>>(`${this.basePath}/v3/trackingReminders`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Snooze, skip, or track a tracking reminder notification
     * Snooze, skip, or track a tracking reminder notification
     * @param body Id of the tracking reminder notification to be snoozed
     * @param userId User&#39;s id
     * @param clientId Your QuantiModo client id can be obtained by creating an app at https://builder.quantimo.do
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public postTrackingReminderNotifications(body: Array<TrackingReminderNotificationPost>, userId?: number, clientId?: string, observe?: 'body', reportProgress?: boolean): Observable<CommonResponse>;
    public postTrackingReminderNotifications(body: Array<TrackingReminderNotificationPost>, userId?: number, clientId?: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<CommonResponse>>;
    public postTrackingReminderNotifications(body: Array<TrackingReminderNotificationPost>, userId?: number, clientId?: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<CommonResponse>>;
    public postTrackingReminderNotifications(body: Array<TrackingReminderNotificationPost>, userId?: number, clientId?: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling postTrackingReminderNotifications.');
        }



        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (userId !== undefined && userId !== null) {
            queryParameters = queryParameters.set('userId', <any>userId);
        }
        if (clientId !== undefined && clientId !== null) {
            queryParameters = queryParameters.set('clientId', <any>clientId);
        }

        let headers = this.defaultHeaders;

        // authentication (access_token) required
        if (this.configuration.apiKeys["access_token"]) {
            queryParameters = queryParameters.set('access_token', this.configuration.apiKeys["access_token"]);
        }

        // authentication (quantimodo_oauth2) required
        if (this.configuration.accessToken) {
            const accessToken = typeof this.configuration.accessToken === 'function'
                ? this.configuration.accessToken()
                : this.configuration.accessToken;
            headers = headers.set('Authorization', 'Bearer ' + accessToken);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.post<CommonResponse>(`${this.basePath}/v3/trackingReminderNotifications`,
            body,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Store a Tracking Reminder
     * This is to enable users to create reminders to track a variable with a default value at a specified frequency
     * @param body TrackingReminder that should be stored
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public postTrackingReminders(body: Array<TrackingReminder>, observe?: 'body', reportProgress?: boolean): Observable<PostTrackingRemindersResponse>;
    public postTrackingReminders(body: Array<TrackingReminder>, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<PostTrackingRemindersResponse>>;
    public postTrackingReminders(body: Array<TrackingReminder>, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<PostTrackingRemindersResponse>>;
    public postTrackingReminders(body: Array<TrackingReminder>, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling postTrackingReminders.');
        }

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});

        let headers = this.defaultHeaders;

        // authentication (access_token) required
        if (this.configuration.apiKeys["access_token"]) {
            queryParameters = queryParameters.set('access_token', this.configuration.apiKeys["access_token"]);
        }

        // authentication (quantimodo_oauth2) required
        if (this.configuration.accessToken) {
            const accessToken = typeof this.configuration.accessToken === 'function'
                ? this.configuration.accessToken()
                : this.configuration.accessToken;
            headers = headers.set('Authorization', 'Bearer ' + accessToken);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.post<PostTrackingRemindersResponse>(`${this.basePath}/v3/trackingReminders`,
            body,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
