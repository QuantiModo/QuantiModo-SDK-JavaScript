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

import * as models from './models';

export interface MeasurementDelete {
    /**
     * Start time of the measurement to be deleted
     */
    "startTime"?: number;
    /**
     * Variable id of the measurement to be deleted
     */
    "variableId"?: number;
    /**
     * Name of the connector for which measurements should be deleted
     */
    "connectorName"?: string;
    /**
     * Your app's client id
     */
    "clientId": string;
}

