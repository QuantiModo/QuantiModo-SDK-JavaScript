/**
 * QuantiModo
 * QuantiModo makes it easy to retrieve normalized user data from a wide array of devices and applications. [Learn about QuantiModo](https://quantimo.do), check out our [docs](https://github.com/QuantiModo/docs) or contact us at [help.quantimo.do](https://help.quantimo.do). 
 *
 * OpenAPI spec version: 2.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'));
  } else {
    // Browser globals (root is window)
    if (!root.QuantiModo) {
      root.QuantiModo = {};
    }
    root.QuantiModo.UserVariable = factory(root.QuantiModo.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The UserVariable model module.
   * @module model/UserVariable
   * @version 2.0
   */

  /**
   * Constructs a new <code>UserVariable</code>.
   * @alias module:model/UserVariable
   * @class
   * @param variableId {Number} ID of variable
   */
  var exports = function(variableId) {
    var _this = this;




    _this['variableId'] = variableId;




















































  };

  /**
   * Constructs a <code>UserVariable</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/UserVariable} obj Optional instance to populate.
   * @return {module:model/UserVariable} The populated <code>UserVariable</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('parentId')) {
        obj['parentId'] = ApiClient.convertToType(data['parentId'], 'Number');
      }
      if (data.hasOwnProperty('userId')) {
        obj['userId'] = ApiClient.convertToType(data['userId'], 'Number');
      }
      if (data.hasOwnProperty('clientId')) {
        obj['clientId'] = ApiClient.convertToType(data['clientId'], 'String');
      }
      if (data.hasOwnProperty('variableId')) {
        obj['variableId'] = ApiClient.convertToType(data['variableId'], 'Number');
      }
      if (data.hasOwnProperty('defaultUnitId')) {
        obj['defaultUnitId'] = ApiClient.convertToType(data['defaultUnitId'], 'Number');
      }
      if (data.hasOwnProperty('minimumAllowedValue')) {
        obj['minimumAllowedValue'] = ApiClient.convertToType(data['minimumAllowedValue'], 'Number');
      }
      if (data.hasOwnProperty('maximumAllowedValue')) {
        obj['maximumAllowedValue'] = ApiClient.convertToType(data['maximumAllowedValue'], 'Number');
      }
      if (data.hasOwnProperty('fillingValue')) {
        obj['fillingValue'] = ApiClient.convertToType(data['fillingValue'], 'Number');
      }
      if (data.hasOwnProperty('joinWith')) {
        obj['joinWith'] = ApiClient.convertToType(data['joinWith'], 'Number');
      }
      if (data.hasOwnProperty('onsetDelay')) {
        obj['onsetDelay'] = ApiClient.convertToType(data['onsetDelay'], 'Number');
      }
      if (data.hasOwnProperty('durationOfAction')) {
        obj['durationOfAction'] = ApiClient.convertToType(data['durationOfAction'], 'Number');
      }
      if (data.hasOwnProperty('variableCategoryId')) {
        obj['variableCategoryId'] = ApiClient.convertToType(data['variableCategoryId'], 'Number');
      }
      if (data.hasOwnProperty('updated')) {
        obj['updated'] = ApiClient.convertToType(data['updated'], 'Number');
      }
      if (data.hasOwnProperty('public')) {
        obj['public'] = ApiClient.convertToType(data['public'], 'Number');
      }
      if (data.hasOwnProperty('causeOnly')) {
        obj['causeOnly'] = ApiClient.convertToType(data['causeOnly'], 'Boolean');
      }
      if (data.hasOwnProperty('fillingType')) {
        obj['fillingType'] = ApiClient.convertToType(data['fillingType'], 'String');
      }
      if (data.hasOwnProperty('numberOfMeasurements')) {
        obj['numberOfMeasurements'] = ApiClient.convertToType(data['numberOfMeasurements'], 'Number');
      }
      if (data.hasOwnProperty('numberOfProcessedDailyMeasurements')) {
        obj['numberOfProcessedDailyMeasurements'] = ApiClient.convertToType(data['numberOfProcessedDailyMeasurements'], 'Number');
      }
      if (data.hasOwnProperty('measurementsAtLastAnalysis')) {
        obj['measurementsAtLastAnalysis'] = ApiClient.convertToType(data['measurementsAtLastAnalysis'], 'Number');
      }
      if (data.hasOwnProperty('lastUnitId')) {
        obj['lastUnitId'] = ApiClient.convertToType(data['lastUnitId'], 'Number');
      }
      if (data.hasOwnProperty('lastOriginalUnitId')) {
        obj['lastOriginalUnitId'] = ApiClient.convertToType(data['lastOriginalUnitId'], 'Number');
      }
      if (data.hasOwnProperty('lastValue')) {
        obj['lastValue'] = ApiClient.convertToType(data['lastValue'], 'Number');
      }
      if (data.hasOwnProperty('lastOriginalValue')) {
        obj['lastOriginalValue'] = ApiClient.convertToType(data['lastOriginalValue'], 'Number');
      }
      if (data.hasOwnProperty('numberOfCorrelations')) {
        obj['numberOfCorrelations'] = ApiClient.convertToType(data['numberOfCorrelations'], 'Number');
      }
      if (data.hasOwnProperty('status')) {
        obj['status'] = ApiClient.convertToType(data['status'], 'String');
      }
      if (data.hasOwnProperty('errorMessage')) {
        obj['errorMessage'] = ApiClient.convertToType(data['errorMessage'], 'String');
      }
      if (data.hasOwnProperty('lastSuccessfulUpdateTime')) {
        obj['lastSuccessfulUpdateTime'] = ApiClient.convertToType(data['lastSuccessfulUpdateTime'], 'Date');
      }
      if (data.hasOwnProperty('standard_deviation')) {
        obj['standard_deviation'] = ApiClient.convertToType(data['standard_deviation'], 'Number');
      }
      if (data.hasOwnProperty('variance')) {
        obj['variance'] = ApiClient.convertToType(data['variance'], 'Number');
      }
      if (data.hasOwnProperty('minimumRecordedValue')) {
        obj['minimumRecordedValue'] = ApiClient.convertToType(data['minimumRecordedValue'], 'Number');
      }
      if (data.hasOwnProperty('maximumRecordedDailyValue')) {
        obj['maximumRecordedDailyValue'] = ApiClient.convertToType(data['maximumRecordedDailyValue'], 'Number');
      }
      if (data.hasOwnProperty('mean')) {
        obj['mean'] = ApiClient.convertToType(data['mean'], 'Number');
      }
      if (data.hasOwnProperty('median')) {
        obj['median'] = ApiClient.convertToType(data['median'], 'Number');
      }
      if (data.hasOwnProperty('mostCommonUnitId')) {
        obj['mostCommonUnitId'] = ApiClient.convertToType(data['mostCommonUnitId'], 'Number');
      }
      if (data.hasOwnProperty('mostCommonValue')) {
        obj['mostCommonValue'] = ApiClient.convertToType(data['mostCommonValue'], 'Number');
      }
      if (data.hasOwnProperty('numberOfUniqueDailyValues')) {
        obj['numberOfUniqueDailyValues'] = ApiClient.convertToType(data['numberOfUniqueDailyValues'], 'Number');
      }
      if (data.hasOwnProperty('numberOfChanges')) {
        obj['numberOfChanges'] = ApiClient.convertToType(data['numberOfChanges'], 'Number');
      }
      if (data.hasOwnProperty('skewness')) {
        obj['skewness'] = ApiClient.convertToType(data['skewness'], 'Number');
      }
      if (data.hasOwnProperty('kurtosis')) {
        obj['kurtosis'] = ApiClient.convertToType(data['kurtosis'], 'Number');
      }
      if (data.hasOwnProperty('latitude')) {
        obj['latitude'] = ApiClient.convertToType(data['latitude'], 'Number');
      }
      if (data.hasOwnProperty('longitude')) {
        obj['longitude'] = ApiClient.convertToType(data['longitude'], 'Number');
      }
      if (data.hasOwnProperty('location')) {
        obj['location'] = ApiClient.convertToType(data['location'], 'String');
      }
      if (data.hasOwnProperty('experimentStartTime')) {
        obj['experimentStartTime'] = ApiClient.convertToType(data['experimentStartTime'], 'Date');
      }
      if (data.hasOwnProperty('experimentEndTime')) {
        obj['experimentEndTime'] = ApiClient.convertToType(data['experimentEndTime'], 'Date');
      }
      if (data.hasOwnProperty('createdAt')) {
        obj['createdAt'] = ApiClient.convertToType(data['createdAt'], 'Date');
      }
      if (data.hasOwnProperty('updatedAt')) {
        obj['updatedAt'] = ApiClient.convertToType(data['updatedAt'], 'Date');
      }
      if (data.hasOwnProperty('outcome')) {
        obj['outcome'] = ApiClient.convertToType(data['outcome'], 'Boolean');
      }
      if (data.hasOwnProperty('sources')) {
        obj['sources'] = ApiClient.convertToType(data['sources'], 'String');
      }
      if (data.hasOwnProperty('earliestSourceTime')) {
        obj['earliestSourceTime'] = ApiClient.convertToType(data['earliestSourceTime'], 'Number');
      }
      if (data.hasOwnProperty('latestSourceTime')) {
        obj['latestSourceTime'] = ApiClient.convertToType(data['latestSourceTime'], 'Number');
      }
      if (data.hasOwnProperty('earliestMeasurementTime')) {
        obj['earliestMeasurementTime'] = ApiClient.convertToType(data['earliestMeasurementTime'], 'Number');
      }
      if (data.hasOwnProperty('latestMeasurementTime')) {
        obj['latestMeasurementTime'] = ApiClient.convertToType(data['latestMeasurementTime'], 'Number');
      }
      if (data.hasOwnProperty('earliestFillingTime')) {
        obj['earliestFillingTime'] = ApiClient.convertToType(data['earliestFillingTime'], 'Number');
      }
      if (data.hasOwnProperty('latestFillingTime')) {
        obj['latestFillingTime'] = ApiClient.convertToType(data['latestFillingTime'], 'Number');
      }
      if (data.hasOwnProperty('imageUrl')) {
        obj['imageUrl'] = ApiClient.convertToType(data['imageUrl'], 'String');
      }
      if (data.hasOwnProperty('ionIcon')) {
        obj['ionIcon'] = ApiClient.convertToType(data['ionIcon'], 'String');
      }
    }
    return obj;
  }

  /**
   * ID of the parent variable if this variable has any parent
   * @member {Number} parentId
   */
  exports.prototype['parentId'] = undefined;
  /**
   * User ID
   * @member {Number} userId
   */
  exports.prototype['userId'] = undefined;
  /**
   * clientId
   * @member {String} clientId
   */
  exports.prototype['clientId'] = undefined;
  /**
   * ID of variable
   * @member {Number} variableId
   */
  exports.prototype['variableId'] = undefined;
  /**
   * ID of unit to use for this variable
   * @member {Number} defaultUnitId
   */
  exports.prototype['defaultUnitId'] = undefined;
  /**
   * The minimum allowed value for measurements. While you can record a value below this minimum, it will be excluded from the correlation analysis.
   * @member {Number} minimumAllowedValue
   */
  exports.prototype['minimumAllowedValue'] = undefined;
  /**
   * The maximum allowed value for measurements. While you can record a value above this maximum, it will be excluded from the correlation analysis.
   * @member {Number} maximumAllowedValue
   */
  exports.prototype['maximumAllowedValue'] = undefined;
  /**
   * When it comes to analysis to determine the effects of this variable, knowing when it did not occur is as important as knowing when it did occur. For example, if you are tracking a medication, it is important to know when you did not take it, but you do not have to log zero values for all the days when you haven't taken it. Hence, you can specify a filling value (typically 0) to insert whenever data is missing.
   * @member {Number} fillingValue
   */
  exports.prototype['fillingValue'] = undefined;
  /**
   * The Variable this Variable should be joined with. If the variable is joined with some other variable then it is not shown to user in the list of variables
   * @member {Number} joinWith
   */
  exports.prototype['joinWith'] = undefined;
  /**
   * The amount of time in seconds that elapses after the predictor/stimulus event before the outcome as perceived by a self-tracker is known as the “onset delay”. For example, the “onset delay” between the time a person takes an aspirin (predictor/stimulus event) and the time a person perceives a change in their headache severity (outcome) is approximately 30 minutes.
   * @member {Number} onsetDelay
   */
  exports.prototype['onsetDelay'] = undefined;
  /**
   * The amount of time over which a predictor/stimulus event can exert an observable influence on an outcome variable’s value. For instance, aspirin (stimulus/predictor) typically decreases headache severity for approximately four hours (duration of action) following the onset delay.
   * @member {Number} durationOfAction
   */
  exports.prototype['durationOfAction'] = undefined;
  /**
   * ID of variable category
   * @member {Number} variableCategoryId
   */
  exports.prototype['variableCategoryId'] = undefined;
  /**
   * updated
   * @member {Number} updated
   */
  exports.prototype['updated'] = undefined;
  /**
   * Is variable public
   * @member {Number} public
   */
  exports.prototype['public'] = undefined;
  /**
   * A value of 1 indicates that this variable is generally a cause in a causal relationship.  An example of a causeOnly variable would be a variable such as Cloud Cover which would generally not be influenced by the behaviour of the user
   * @member {Boolean} causeOnly
   */
  exports.prototype['causeOnly'] = undefined;
  /**
   * 0 -> No filling, 1 -> Use filling-value
   * @member {String} fillingType
   */
  exports.prototype['fillingType'] = undefined;
  /**
   * Number of measurements
   * @member {Number} numberOfMeasurements
   */
  exports.prototype['numberOfMeasurements'] = undefined;
  /**
   * Number of processed measurements
   * @member {Number} numberOfProcessedDailyMeasurements
   */
  exports.prototype['numberOfProcessedDailyMeasurements'] = undefined;
  /**
   * Number of measurements at last analysis
   * @member {Number} measurementsAtLastAnalysis
   */
  exports.prototype['measurementsAtLastAnalysis'] = undefined;
  /**
   * ID of last Unit
   * @member {Number} lastUnitId
   */
  exports.prototype['lastUnitId'] = undefined;
  /**
   * ID of last original Unit
   * @member {Number} lastOriginalUnitId
   */
  exports.prototype['lastOriginalUnitId'] = undefined;
  /**
   * Last Value
   * @member {Number} lastValue
   */
  exports.prototype['lastValue'] = undefined;
  /**
   * Last original value which is stored
   * @member {Number} lastOriginalValue
   */
  exports.prototype['lastOriginalValue'] = undefined;
  /**
   * Number of correlations for this variable
   * @member {Number} numberOfCorrelations
   */
  exports.prototype['numberOfCorrelations'] = undefined;
  /**
   * status
   * @member {String} status
   */
  exports.prototype['status'] = undefined;
  /**
   * error_message
   * @member {String} errorMessage
   */
  exports.prototype['errorMessage'] = undefined;
  /**
   * When this variable or its settings were last updated
   * @member {Date} lastSuccessfulUpdateTime
   */
  exports.prototype['lastSuccessfulUpdateTime'] = undefined;
  /**
   * Standard deviation
   * @member {Number} standard_deviation
   */
  exports.prototype['standard_deviation'] = undefined;
  /**
   * Variance
   * @member {Number} variance
   */
  exports.prototype['variance'] = undefined;
  /**
   * Minimum recorded value of this variable
   * @member {Number} minimumRecordedValue
   */
  exports.prototype['minimumRecordedValue'] = undefined;
  /**
   * Maximum recorded daily value of this variable
   * @member {Number} maximumRecordedDailyValue
   */
  exports.prototype['maximumRecordedDailyValue'] = undefined;
  /**
   * Mean
   * @member {Number} mean
   */
  exports.prototype['mean'] = undefined;
  /**
   * Median
   * @member {Number} median
   */
  exports.prototype['median'] = undefined;
  /**
   * Most common Unit ID
   * @member {Number} mostCommonUnitId
   */
  exports.prototype['mostCommonUnitId'] = undefined;
  /**
   * Most common value
   * @member {Number} mostCommonValue
   */
  exports.prototype['mostCommonValue'] = undefined;
  /**
   * Number of unique daily values
   * @member {Number} numberOfUniqueDailyValues
   */
  exports.prototype['numberOfUniqueDailyValues'] = undefined;
  /**
   * Number of changes
   * @member {Number} numberOfChanges
   */
  exports.prototype['numberOfChanges'] = undefined;
  /**
   * Skewness
   * @member {Number} skewness
   */
  exports.prototype['skewness'] = undefined;
  /**
   * Kurtosis
   * @member {Number} kurtosis
   */
  exports.prototype['kurtosis'] = undefined;
  /**
   * Latitude
   * @member {Number} latitude
   */
  exports.prototype['latitude'] = undefined;
  /**
   * Longitude
   * @member {Number} longitude
   */
  exports.prototype['longitude'] = undefined;
  /**
   * Location
   * @member {String} location
   */
  exports.prototype['location'] = undefined;
  /**
   * Earliest measurement start_time to be used in analysis. Use UTC ISO 8601 \"YYYY-MM-DDThh:mm:ss\"  datetime format
   * @member {Date} experimentStartTime
   */
  exports.prototype['experimentStartTime'] = undefined;
  /**
   * Latest measurement start_time to be used in analysis. Use UTC ISO 8601 \"YYYY-MM-DDThh:mm:ss\"  datetime format
   * @member {Date} experimentEndTime
   */
  exports.prototype['experimentEndTime'] = undefined;
  /**
   * When the record was first created. Use UTC ISO 8601 \"YYYY-MM-DDThh:mm:ss\"  datetime format
   * @member {Date} createdAt
   */
  exports.prototype['createdAt'] = undefined;
  /**
   * When the record in the database was last updated. Use UTC ISO 8601 \"YYYY-MM-DDThh:mm:ss\"  datetime format
   * @member {Date} updatedAt
   */
  exports.prototype['updatedAt'] = undefined;
  /**
   * Outcome variables (those with `outcome` == 1) are variables for which a human would generally want to identify the influencing factors. These include symptoms of illness, physique, mood, cognitive performance, etc.  Generally correlation calculations are only performed on outcome variables
   * @member {Boolean} outcome
   */
  exports.prototype['outcome'] = undefined;
  /**
   * Comma-separated list of source names to limit variables to those sources
   * @member {String} sources
   */
  exports.prototype['sources'] = undefined;
  /**
   * Earliest source time
   * @member {Number} earliestSourceTime
   */
  exports.prototype['earliestSourceTime'] = undefined;
  /**
   * Latest source time
   * @member {Number} latestSourceTime
   */
  exports.prototype['latestSourceTime'] = undefined;
  /**
   * Earliest measurement time
   * @member {Number} earliestMeasurementTime
   */
  exports.prototype['earliestMeasurementTime'] = undefined;
  /**
   * Latest measurement time
   * @member {Number} latestMeasurementTime
   */
  exports.prototype['latestMeasurementTime'] = undefined;
  /**
   * Earliest filling time
   * @member {Number} earliestFillingTime
   */
  exports.prototype['earliestFillingTime'] = undefined;
  /**
   * Latest filling time
   * @member {Number} latestFillingTime
   */
  exports.prototype['latestFillingTime'] = undefined;
  /**
   * 
   * @member {String} imageUrl
   */
  exports.prototype['imageUrl'] = undefined;
  /**
   * 
   * @member {String} ionIcon
   */
  exports.prototype['ionIcon'] = undefined;



  return exports;
}));


