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

import { XprofileDataResponse } from '../model/xprofileDataResponse';
import { XprofileFieldsResponse } from '../model/xprofileFieldsResponse';
import { XprofileGroupsResponse } from '../model/xprofileGroupsResponse';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable()
export class XprofileService {

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
     * Get XprofileData
     * Get XprofileData
     * @param sort Sort by one of the listed field names. If the field name is prefixed with &#x60;-&#x60;, it will sort in descending order.
     * @param limit The LIMIT is used to limit the number of results returned. So if youhave 1000 results, but only want to the first 10, you would set this to 10 and offset to 0. The maximum limit is 200 records.
     * @param offset OFFSET says to skip that many rows before beginning to return rows to the client. OFFSET 0 is the same as omitting the OFFSET clause.If both OFFSET and LIMIT appear, then OFFSET rows are skipped before starting to count the LIMIT rows that are returned.
     * @param updatedAt When the record was last updated. Use UTC ISO 8601 YYYY-MM-DDThh:mm:ss datetime format. Time zone should be UTC and not local.
     * @param userId User&#39;s id
     * @param createdAt When the record was first created. Use UTC ISO 8601 YYYY-MM-DDThh:mm:ss datetime format. Time zone should be UTC and not local.
     * @param id Id
     * @param clientId Your QuantiModo client id can be obtained by creating an app at https://builder.quantimo.do
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getXprofileData(sort?: string, limit?: number, offset?: number, updatedAt?: string, userId?: number, createdAt?: string, id?: number, clientId?: string, observe?: 'body', reportProgress?: boolean): Observable<Array<XprofileDataResponse>>;
    public getXprofileData(sort?: string, limit?: number, offset?: number, updatedAt?: string, userId?: number, createdAt?: string, id?: number, clientId?: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<XprofileDataResponse>>>;
    public getXprofileData(sort?: string, limit?: number, offset?: number, updatedAt?: string, userId?: number, createdAt?: string, id?: number, clientId?: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<XprofileDataResponse>>>;
    public getXprofileData(sort?: string, limit?: number, offset?: number, updatedAt?: string, userId?: number, createdAt?: string, id?: number, clientId?: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {









        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (sort !== undefined && sort !== null) {
            queryParameters = queryParameters.set('sort', <any>sort);
        }
        if (limit !== undefined && limit !== null) {
            queryParameters = queryParameters.set('limit', <any>limit);
        }
        if (offset !== undefined && offset !== null) {
            queryParameters = queryParameters.set('offset', <any>offset);
        }
        if (updatedAt !== undefined && updatedAt !== null) {
            queryParameters = queryParameters.set('updatedAt', <any>updatedAt);
        }
        if (userId !== undefined && userId !== null) {
            queryParameters = queryParameters.set('userId', <any>userId);
        }
        if (createdAt !== undefined && createdAt !== null) {
            queryParameters = queryParameters.set('createdAt', <any>createdAt);
        }
        if (id !== undefined && id !== null) {
            queryParameters = queryParameters.set('id', <any>id);
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

        return this.httpClient.get<Array<XprofileDataResponse>>(`${this.basePath}/v3/xprofileData`,
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
     * Get XprofileFields
     * Get XprofileFields
     * @param sort Sort by one of the listed field names. If the field name is prefixed with &#x60;-&#x60;, it will sort in descending order.
     * @param limit The LIMIT is used to limit the number of results returned. So if youhave 1000 results, but only want to the first 10, you would set this to 10 and offset to 0. The maximum limit is 200 records.
     * @param offset OFFSET says to skip that many rows before beginning to return rows to the client. OFFSET 0 is the same as omitting the OFFSET clause.If both OFFSET and LIMIT appear, then OFFSET rows are skipped before starting to count the LIMIT rows that are returned.
     * @param updatedAt When the record was last updated. Use UTC ISO 8601 YYYY-MM-DDThh:mm:ss datetime format. Time zone should be UTC and not local.
     * @param userId User&#39;s id
     * @param createdAt When the record was first created. Use UTC ISO 8601 YYYY-MM-DDThh:mm:ss datetime format. Time zone should be UTC and not local.
     * @param id Id
     * @param clientId Your QuantiModo client id can be obtained by creating an app at https://builder.quantimo.do
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getXprofileFields(sort?: string, limit?: number, offset?: number, updatedAt?: string, userId?: number, createdAt?: string, id?: number, clientId?: string, observe?: 'body', reportProgress?: boolean): Observable<Array<XprofileFieldsResponse>>;
    public getXprofileFields(sort?: string, limit?: number, offset?: number, updatedAt?: string, userId?: number, createdAt?: string, id?: number, clientId?: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<XprofileFieldsResponse>>>;
    public getXprofileFields(sort?: string, limit?: number, offset?: number, updatedAt?: string, userId?: number, createdAt?: string, id?: number, clientId?: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<XprofileFieldsResponse>>>;
    public getXprofileFields(sort?: string, limit?: number, offset?: number, updatedAt?: string, userId?: number, createdAt?: string, id?: number, clientId?: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {









        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (sort !== undefined && sort !== null) {
            queryParameters = queryParameters.set('sort', <any>sort);
        }
        if (limit !== undefined && limit !== null) {
            queryParameters = queryParameters.set('limit', <any>limit);
        }
        if (offset !== undefined && offset !== null) {
            queryParameters = queryParameters.set('offset', <any>offset);
        }
        if (updatedAt !== undefined && updatedAt !== null) {
            queryParameters = queryParameters.set('updatedAt', <any>updatedAt);
        }
        if (userId !== undefined && userId !== null) {
            queryParameters = queryParameters.set('userId', <any>userId);
        }
        if (createdAt !== undefined && createdAt !== null) {
            queryParameters = queryParameters.set('createdAt', <any>createdAt);
        }
        if (id !== undefined && id !== null) {
            queryParameters = queryParameters.set('id', <any>id);
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

        return this.httpClient.get<Array<XprofileFieldsResponse>>(`${this.basePath}/v3/xprofileFields`,
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
     * Get XprofileGroups
     * Get XprofileGroups
     * @param sort Sort by one of the listed field names. If the field name is prefixed with &#x60;-&#x60;, it will sort in descending order.
     * @param limit The LIMIT is used to limit the number of results returned. So if youhave 1000 results, but only want to the first 10, you would set this to 10 and offset to 0. The maximum limit is 200 records.
     * @param offset OFFSET says to skip that many rows before beginning to return rows to the client. OFFSET 0 is the same as omitting the OFFSET clause.If both OFFSET and LIMIT appear, then OFFSET rows are skipped before starting to count the LIMIT rows that are returned.
     * @param updatedAt When the record was last updated. Use UTC ISO 8601 YYYY-MM-DDThh:mm:ss datetime format. Time zone should be UTC and not local.
     * @param userId User&#39;s id
     * @param createdAt When the record was first created. Use UTC ISO 8601 YYYY-MM-DDThh:mm:ss datetime format. Time zone should be UTC and not local.
     * @param id Id
     * @param clientId Your QuantiModo client id can be obtained by creating an app at https://builder.quantimo.do
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getXprofileGroups(sort?: string, limit?: number, offset?: number, updatedAt?: string, userId?: number, createdAt?: string, id?: number, clientId?: string, observe?: 'body', reportProgress?: boolean): Observable<Array<XprofileGroupsResponse>>;
    public getXprofileGroups(sort?: string, limit?: number, offset?: number, updatedAt?: string, userId?: number, createdAt?: string, id?: number, clientId?: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<XprofileGroupsResponse>>>;
    public getXprofileGroups(sort?: string, limit?: number, offset?: number, updatedAt?: string, userId?: number, createdAt?: string, id?: number, clientId?: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<XprofileGroupsResponse>>>;
    public getXprofileGroups(sort?: string, limit?: number, offset?: number, updatedAt?: string, userId?: number, createdAt?: string, id?: number, clientId?: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {









        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (sort !== undefined && sort !== null) {
            queryParameters = queryParameters.set('sort', <any>sort);
        }
        if (limit !== undefined && limit !== null) {
            queryParameters = queryParameters.set('limit', <any>limit);
        }
        if (offset !== undefined && offset !== null) {
            queryParameters = queryParameters.set('offset', <any>offset);
        }
        if (updatedAt !== undefined && updatedAt !== null) {
            queryParameters = queryParameters.set('updatedAt', <any>updatedAt);
        }
        if (userId !== undefined && userId !== null) {
            queryParameters = queryParameters.set('userId', <any>userId);
        }
        if (createdAt !== undefined && createdAt !== null) {
            queryParameters = queryParameters.set('createdAt', <any>createdAt);
        }
        if (id !== undefined && id !== null) {
            queryParameters = queryParameters.set('id', <any>id);
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

        return this.httpClient.get<Array<XprofileGroupsResponse>>(`${this.basePath}/v3/xprofileGroups`,
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
     * Post XprofileData
     * Post XprofileData
     * @param sort Sort by one of the listed field names. If the field name is prefixed with &#x60;-&#x60;, it will sort in descending order.
     * @param limit The LIMIT is used to limit the number of results returned. So if youhave 1000 results, but only want to the first 10, you would set this to 10 and offset to 0. The maximum limit is 200 records.
     * @param offset OFFSET says to skip that many rows before beginning to return rows to the client. OFFSET 0 is the same as omitting the OFFSET clause.If both OFFSET and LIMIT appear, then OFFSET rows are skipped before starting to count the LIMIT rows that are returned.
     * @param updatedAt When the record was last updated. Use UTC ISO 8601 YYYY-MM-DDThh:mm:ss datetime format. Time zone should be UTC and not local.
     * @param userId User&#39;s id
     * @param createdAt When the record was first created. Use UTC ISO 8601 YYYY-MM-DDThh:mm:ss datetime format. Time zone should be UTC and not local.
     * @param id Id
     * @param clientId Your QuantiModo client id can be obtained by creating an app at https://builder.quantimo.do
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public postXprofileData(sort?: string, limit?: number, offset?: number, updatedAt?: string, userId?: number, createdAt?: string, id?: number, clientId?: string, observe?: 'body', reportProgress?: boolean): Observable<Array<XprofileDataResponse>>;
    public postXprofileData(sort?: string, limit?: number, offset?: number, updatedAt?: string, userId?: number, createdAt?: string, id?: number, clientId?: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<XprofileDataResponse>>>;
    public postXprofileData(sort?: string, limit?: number, offset?: number, updatedAt?: string, userId?: number, createdAt?: string, id?: number, clientId?: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<XprofileDataResponse>>>;
    public postXprofileData(sort?: string, limit?: number, offset?: number, updatedAt?: string, userId?: number, createdAt?: string, id?: number, clientId?: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {









        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (sort !== undefined && sort !== null) {
            queryParameters = queryParameters.set('sort', <any>sort);
        }
        if (limit !== undefined && limit !== null) {
            queryParameters = queryParameters.set('limit', <any>limit);
        }
        if (offset !== undefined && offset !== null) {
            queryParameters = queryParameters.set('offset', <any>offset);
        }
        if (updatedAt !== undefined && updatedAt !== null) {
            queryParameters = queryParameters.set('updatedAt', <any>updatedAt);
        }
        if (userId !== undefined && userId !== null) {
            queryParameters = queryParameters.set('userId', <any>userId);
        }
        if (createdAt !== undefined && createdAt !== null) {
            queryParameters = queryParameters.set('createdAt', <any>createdAt);
        }
        if (id !== undefined && id !== null) {
            queryParameters = queryParameters.set('id', <any>id);
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

        return this.httpClient.post<Array<XprofileDataResponse>>(`${this.basePath}/v3/xprofileData`,
            null,
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
     * Post XprofileFields
     * Post XprofileFields
     * @param sort Sort by one of the listed field names. If the field name is prefixed with &#x60;-&#x60;, it will sort in descending order.
     * @param limit The LIMIT is used to limit the number of results returned. So if youhave 1000 results, but only want to the first 10, you would set this to 10 and offset to 0. The maximum limit is 200 records.
     * @param offset OFFSET says to skip that many rows before beginning to return rows to the client. OFFSET 0 is the same as omitting the OFFSET clause.If both OFFSET and LIMIT appear, then OFFSET rows are skipped before starting to count the LIMIT rows that are returned.
     * @param updatedAt When the record was last updated. Use UTC ISO 8601 YYYY-MM-DDThh:mm:ss datetime format. Time zone should be UTC and not local.
     * @param userId User&#39;s id
     * @param createdAt When the record was first created. Use UTC ISO 8601 YYYY-MM-DDThh:mm:ss datetime format. Time zone should be UTC and not local.
     * @param id Id
     * @param clientId Your QuantiModo client id can be obtained by creating an app at https://builder.quantimo.do
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public postXprofileFields(sort?: string, limit?: number, offset?: number, updatedAt?: string, userId?: number, createdAt?: string, id?: number, clientId?: string, observe?: 'body', reportProgress?: boolean): Observable<Array<XprofileFieldsResponse>>;
    public postXprofileFields(sort?: string, limit?: number, offset?: number, updatedAt?: string, userId?: number, createdAt?: string, id?: number, clientId?: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<XprofileFieldsResponse>>>;
    public postXprofileFields(sort?: string, limit?: number, offset?: number, updatedAt?: string, userId?: number, createdAt?: string, id?: number, clientId?: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<XprofileFieldsResponse>>>;
    public postXprofileFields(sort?: string, limit?: number, offset?: number, updatedAt?: string, userId?: number, createdAt?: string, id?: number, clientId?: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {









        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (sort !== undefined && sort !== null) {
            queryParameters = queryParameters.set('sort', <any>sort);
        }
        if (limit !== undefined && limit !== null) {
            queryParameters = queryParameters.set('limit', <any>limit);
        }
        if (offset !== undefined && offset !== null) {
            queryParameters = queryParameters.set('offset', <any>offset);
        }
        if (updatedAt !== undefined && updatedAt !== null) {
            queryParameters = queryParameters.set('updatedAt', <any>updatedAt);
        }
        if (userId !== undefined && userId !== null) {
            queryParameters = queryParameters.set('userId', <any>userId);
        }
        if (createdAt !== undefined && createdAt !== null) {
            queryParameters = queryParameters.set('createdAt', <any>createdAt);
        }
        if (id !== undefined && id !== null) {
            queryParameters = queryParameters.set('id', <any>id);
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

        return this.httpClient.post<Array<XprofileFieldsResponse>>(`${this.basePath}/v3/xprofileFields`,
            null,
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
     * Post XprofileGroups
     * Post XprofileGroups
     * @param sort Sort by one of the listed field names. If the field name is prefixed with &#x60;-&#x60;, it will sort in descending order.
     * @param limit The LIMIT is used to limit the number of results returned. So if youhave 1000 results, but only want to the first 10, you would set this to 10 and offset to 0. The maximum limit is 200 records.
     * @param offset OFFSET says to skip that many rows before beginning to return rows to the client. OFFSET 0 is the same as omitting the OFFSET clause.If both OFFSET and LIMIT appear, then OFFSET rows are skipped before starting to count the LIMIT rows that are returned.
     * @param updatedAt When the record was last updated. Use UTC ISO 8601 YYYY-MM-DDThh:mm:ss datetime format. Time zone should be UTC and not local.
     * @param userId User&#39;s id
     * @param createdAt When the record was first created. Use UTC ISO 8601 YYYY-MM-DDThh:mm:ss datetime format. Time zone should be UTC and not local.
     * @param id Id
     * @param clientId Your QuantiModo client id can be obtained by creating an app at https://builder.quantimo.do
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public postXprofileGroups(sort?: string, limit?: number, offset?: number, updatedAt?: string, userId?: number, createdAt?: string, id?: number, clientId?: string, observe?: 'body', reportProgress?: boolean): Observable<Array<XprofileGroupsResponse>>;
    public postXprofileGroups(sort?: string, limit?: number, offset?: number, updatedAt?: string, userId?: number, createdAt?: string, id?: number, clientId?: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<XprofileGroupsResponse>>>;
    public postXprofileGroups(sort?: string, limit?: number, offset?: number, updatedAt?: string, userId?: number, createdAt?: string, id?: number, clientId?: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<XprofileGroupsResponse>>>;
    public postXprofileGroups(sort?: string, limit?: number, offset?: number, updatedAt?: string, userId?: number, createdAt?: string, id?: number, clientId?: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {









        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (sort !== undefined && sort !== null) {
            queryParameters = queryParameters.set('sort', <any>sort);
        }
        if (limit !== undefined && limit !== null) {
            queryParameters = queryParameters.set('limit', <any>limit);
        }
        if (offset !== undefined && offset !== null) {
            queryParameters = queryParameters.set('offset', <any>offset);
        }
        if (updatedAt !== undefined && updatedAt !== null) {
            queryParameters = queryParameters.set('updatedAt', <any>updatedAt);
        }
        if (userId !== undefined && userId !== null) {
            queryParameters = queryParameters.set('userId', <any>userId);
        }
        if (createdAt !== undefined && createdAt !== null) {
            queryParameters = queryParameters.set('createdAt', <any>createdAt);
        }
        if (id !== undefined && id !== null) {
            queryParameters = queryParameters.set('id', <any>id);
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

        return this.httpClient.post<Array<XprofileGroupsResponse>>(`${this.basePath}/v3/xprofileGroups`,
            null,
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
