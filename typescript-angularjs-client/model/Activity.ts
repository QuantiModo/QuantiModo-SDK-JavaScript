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

export interface Activity {
    /**
     * What do you expect?
     */
    "id": number;
    /**
     * What do you expect?
     */
    "userId": number;
    /**
     * What do you expect?
     */
    "component": string;
    /**
     * What do you expect?
     */
    "type": string;
    /**
     * What do you expect?
     */
    "action": string;
    /**
     * What do you expect?
     */
    "content": string;
    /**
     * What do you expect?
     */
    "primaryLink": string;
    /**
     * What do you expect?
     */
    "itemId": number;
    /**
     * What do you expect?
     */
    "secondaryItemId": number;
    /**
     * What do you expect?
     */
    "dateRecorded": string;
    /**
     * What do you expect?
     */
    "hideSitewide": number;
    /**
     * What do you expect?
     */
    "mpttLeft": number;
    /**
     * What do you expect?
     */
    "mpttRight": number;
    /**
     * What do you expect?
     */
    "isSpam": number;
    /**
     * Additional activity key-value data
     */
    "metaDataArray"?: Array<any>;
}

