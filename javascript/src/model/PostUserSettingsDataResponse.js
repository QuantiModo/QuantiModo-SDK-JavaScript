/**
 * quantimodo
 * We make it easy to retrieve and analyze normalized user data from a wide array of devices and applications. Check out our [docs and sdk's](https://github.com/QuantiModo/docs) or [contact us](https://help.quantimo.do).
 *
 * OpenAPI spec version: 2.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 *
 */


import ApiClient from '../ApiClient';





/**
* The PostUserSettingsDataResponse model module.
* @module model/PostUserSettingsDataResponse
* @version 2.0
*/
export default class PostUserSettingsDataResponse {
    /**
    * Constructs a new <code>PostUserSettingsDataResponse</code>.
    * @alias module:model/PostUserSettingsDataResponse
    * @class
    */

    constructor() {
        

        
        

        

        
    }

    /**
    * Constructs a <code>PostUserSettingsDataResponse</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:model/PostUserSettingsDataResponse} obj Optional instance to populate.
    * @return {module:model/PostUserSettingsDataResponse} The populated <code>PostUserSettingsDataResponse</code> instance.
    */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new PostUserSettingsDataResponse();

            
            
            

            if (data.hasOwnProperty('purchaseId')) {
                obj['purchaseId'] = ApiClient.convertToType(data['purchaseId'], 'Number');
            }
            if (data.hasOwnProperty('description')) {
                obj['description'] = ApiClient.convertToType(data['description'], 'String');
            }
            if (data.hasOwnProperty('summary')) {
                obj['summary'] = ApiClient.convertToType(data['summary'], 'String');
            }
        }
        return obj;
    }

    /**
    * Ex: 1
    * @member {Number} purchaseId
    */
    purchaseId = undefined;
    /**
    * Can be used as body of help info popup
    * @member {String} description
    */
    description = undefined;
    /**
    * Can be used as title in help info popup
    * @member {String} summary
    */
    summary = undefined;








}

