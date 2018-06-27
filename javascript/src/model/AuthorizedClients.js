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
import AppSettings from './AppSettings';





/**
* The AuthorizedClients model module.
* @module model/AuthorizedClients
* @version 2.0
*/
export default class AuthorizedClients {
    /**
    * Constructs a new <code>AuthorizedClients</code>.
    * @alias module:model/AuthorizedClients
    * @class
    * @param apps {Array.<module:model/AppSettings>} Applications with access to user measurements for all variables
    * @param individuals {Array.<module:model/AppSettings>} Individuals such as physicians or family members with access to user measurements for all variables
    * @param studies {Array.<module:model/AppSettings>} Studies with access to generally anonymous user measurements for a specific predictor and outcome variable
    */

    constructor(apps, individuals, studies) {
        

        
        

        this['apps'] = apps;this['individuals'] = individuals;this['studies'] = studies;

        
    }

    /**
    * Constructs a <code>AuthorizedClients</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:model/AuthorizedClients} obj Optional instance to populate.
    * @return {module:model/AuthorizedClients} The populated <code>AuthorizedClients</code> instance.
    */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new AuthorizedClients();

            
            
            

            if (data.hasOwnProperty('apps')) {
                obj['apps'] = ApiClient.convertToType(data['apps'], [AppSettings]);
            }
            if (data.hasOwnProperty('individuals')) {
                obj['individuals'] = ApiClient.convertToType(data['individuals'], [AppSettings]);
            }
            if (data.hasOwnProperty('studies')) {
                obj['studies'] = ApiClient.convertToType(data['studies'], [AppSettings]);
            }
        }
        return obj;
    }

    /**
    * Applications with access to user measurements for all variables
    * @member {Array.<module:model/AppSettings>} apps
    */
    apps = undefined;
    /**
    * Individuals such as physicians or family members with access to user measurements for all variables
    * @member {Array.<module:model/AppSettings>} individuals
    */
    individuals = undefined;
    /**
    * Studies with access to generally anonymous user measurements for a specific predictor and outcome variable
    * @member {Array.<module:model/AppSettings>} studies
    */
    studies = undefined;








}

