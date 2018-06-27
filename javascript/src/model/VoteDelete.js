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
* The VoteDelete model module.
* @module model/VoteDelete
* @version 2.0
*/
export default class VoteDelete {
    /**
    * Constructs a new <code>VoteDelete</code>.
    * @alias module:model/VoteDelete
    * @class
    * @param cause {String} Cause variable name for the correlation to which the vote pertains
    * @param effect {String} Effect variable name for the correlation to which the vote pertains
    */

    constructor(cause, effect) {
        

        
        

        this['cause'] = cause;this['effect'] = effect;

        
    }

    /**
    * Constructs a <code>VoteDelete</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:model/VoteDelete} obj Optional instance to populate.
    * @return {module:model/VoteDelete} The populated <code>VoteDelete</code> instance.
    */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new VoteDelete();

            
            
            

            if (data.hasOwnProperty('cause')) {
                obj['cause'] = ApiClient.convertToType(data['cause'], 'String');
            }
            if (data.hasOwnProperty('effect')) {
                obj['effect'] = ApiClient.convertToType(data['effect'], 'String');
            }
        }
        return obj;
    }

    /**
    * Cause variable name for the correlation to which the vote pertains
    * @member {String} cause
    */
    cause = undefined;
    /**
    * Effect variable name for the correlation to which the vote pertains
    * @member {String} effect
    */
    effect = undefined;








}

