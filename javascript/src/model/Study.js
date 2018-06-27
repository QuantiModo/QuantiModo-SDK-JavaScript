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
import Correlation from './Correlation';
import ParticipantInstruction from './ParticipantInstruction';
import StudyCharts from './StudyCharts';
import StudyHtml from './StudyHtml';
import StudyImages from './StudyImages';
import StudyLinks from './StudyLinks';
import StudyText from './StudyText';
import Variable from './Variable';





/**
* The Study model module.
* @module model/Study
* @version 2.0
*/
export default class Study {
    /**
    * Constructs a new <code>Study</code>.
    * @alias module:model/Study
    * @class
    * @param type {String} Ex: population, cohort, or individual
    */

    constructor(type) {
        

        
        

        this['type'] = type;

        
    }

    /**
    * Constructs a <code>Study</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:model/Study} obj Optional instance to populate.
    * @return {module:model/Study} The populated <code>Study</code> instance.
    */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new Study();

            
            
            

            if (data.hasOwnProperty('type')) {
                obj['type'] = ApiClient.convertToType(data['type'], 'String');
            }
            if (data.hasOwnProperty('userId')) {
                obj['userId'] = ApiClient.convertToType(data['userId'], 'String');
            }
            if (data.hasOwnProperty('studyId')) {
                obj['studyId'] = ApiClient.convertToType(data['studyId'], 'String');
            }
            if (data.hasOwnProperty('causeVariable')) {
                obj['causeVariable'] = Variable.constructFromObject(data['causeVariable']);
            }
            if (data.hasOwnProperty('studyCharts')) {
                obj['studyCharts'] = StudyCharts.constructFromObject(data['studyCharts']);
            }
            if (data.hasOwnProperty('effectVariable')) {
                obj['effectVariable'] = Variable.constructFromObject(data['effectVariable']);
            }
            if (data.hasOwnProperty('participantInstructions')) {
                obj['participantInstructions'] = ParticipantInstruction.constructFromObject(data['participantInstructions']);
            }
            if (data.hasOwnProperty('statistics')) {
                obj['statistics'] = Correlation.constructFromObject(data['statistics']);
            }
            if (data.hasOwnProperty('studyHtml')) {
                obj['studyHtml'] = StudyHtml.constructFromObject(data['studyHtml']);
            }
            if (data.hasOwnProperty('studyImages')) {
                obj['studyImages'] = StudyImages.constructFromObject(data['studyImages']);
            }
            if (data.hasOwnProperty('studyLinks')) {
                obj['studyLinks'] = StudyLinks.constructFromObject(data['studyLinks']);
            }
            if (data.hasOwnProperty('studyText')) {
                obj['studyText'] = StudyText.constructFromObject(data['studyText']);
            }
        }
        return obj;
    }

    /**
    * Ex: population, cohort, or individual
    * @member {String} type
    */
    type = undefined;
    /**
    * The user id of the principal investigator or subject if an individual studies
    * @member {String} userId
    */
    userId = undefined;
    /**
    * ID of the cohort study which is necessary to allow participants to join
    * @member {String} studyId
    */
    studyId = undefined;
    /**
    * @member {module:model/Variable} causeVariable
    */
    causeVariable = undefined;
    /**
    * @member {module:model/StudyCharts} studyCharts
    */
    studyCharts = undefined;
    /**
    * @member {module:model/Variable} effectVariable
    */
    effectVariable = undefined;
    /**
    * @member {module:model/ParticipantInstruction} participantInstructions
    */
    participantInstructions = undefined;
    /**
    * @member {module:model/Correlation} statistics
    */
    statistics = undefined;
    /**
    * @member {module:model/StudyHtml} studyHtml
    */
    studyHtml = undefined;
    /**
    * @member {module:model/StudyImages} studyImages
    */
    studyImages = undefined;
    /**
    * @member {module:model/StudyLinks} studyLinks
    */
    studyLinks = undefined;
    /**
    * @member {module:model/StudyText} studyText
    */
    studyText = undefined;








}

