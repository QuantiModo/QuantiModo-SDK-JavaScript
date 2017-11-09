/**
 * quantimodo
 * We make it easy to retrieve and analyze normalized user data from a wide array of devices and applications. Check out our [docs and sdk's](https://github.com/QuantiModo/docs) or [contact us](https://help.quantimo.do).
 *
 * OpenAPI spec version: 5.8.100414
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.2.3
 *
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/Correlation', 'model/Highchart', 'model/HighchartArray', 'model/Pair', 'model/ProcessedDailyMeasurement', 'model/UserVariable'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./Correlation'), require('./Highchart'), require('./HighchartArray'), require('./Pair'), require('./ProcessedDailyMeasurement'), require('./UserVariable'));
  } else {
    // Browser globals (root is window)
    if (!root.Quantimodo) {
      root.Quantimodo = {};
    }
    root.Quantimodo.Study = factory(root.Quantimodo.ApiClient, root.Quantimodo.Correlation, root.Quantimodo.Highchart, root.Quantimodo.HighchartArray, root.Quantimodo.Pair, root.Quantimodo.ProcessedDailyMeasurement, root.Quantimodo.UserVariable);
  }
}(this, function(ApiClient, Correlation, Highchart, HighchartArray, Pair, ProcessedDailyMeasurement, UserVariable) {
  'use strict';




  /**
   * The Study model module.
   * @module model/Study
   * @version 5.8.1109
   */

  /**
   * Constructs a new <code>Study</code>.
   * @alias module:model/Study
   * @class
   * @param causeProcessedDailyMeasurements {Array.<module:model/ProcessedDailyMeasurement>} 
   * @param causeVariable {module:model/UserVariable} 
   * @param charts {Array.<module:model/Highchart>} 
   * @param effectProcessedDailyMeasurements {Array.<module:model/ProcessedDailyMeasurement>} 
   * @param effectVariable {module:model/UserVariable} 
   * @param pairs {Array.<module:model/Pair>} 
   * @param statistics {module:model/Correlation} 
   * @param text {String} Example: 
   * @param user {String} Example: 
   */
  var exports = function(causeProcessedDailyMeasurements, causeVariable, charts, effectProcessedDailyMeasurements, effectVariable, pairs, statistics, text, user) {
    var _this = this;

    _this['causeProcessedDailyMeasurements'] = causeProcessedDailyMeasurements;
    _this['causeVariable'] = causeVariable;
    _this['charts'] = charts;
    _this['effectProcessedDailyMeasurements'] = effectProcessedDailyMeasurements;
    _this['effectVariable'] = effectVariable;

    _this['pairs'] = pairs;
    _this['statistics'] = statistics;
    _this['text'] = text;
    _this['user'] = user;

  };

  /**
   * Constructs a <code>Study</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/Study} obj Optional instance to populate.
   * @return {module:model/Study} The populated <code>Study</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('causeProcessedDailyMeasurements')) {
        obj['causeProcessedDailyMeasurements'] = ApiClient.convertToType(data['causeProcessedDailyMeasurements'], [ProcessedDailyMeasurement]);
      }
      if (data.hasOwnProperty('causeVariable')) {
        obj['causeVariable'] = UserVariable.constructFromObject(data['causeVariable']);
      }
      if (data.hasOwnProperty('charts')) {
        obj['charts'] = ApiClient.convertToType(data['charts'], [Highchart]);
      }
      if (data.hasOwnProperty('effectProcessedDailyMeasurements')) {
        obj['effectProcessedDailyMeasurements'] = ApiClient.convertToType(data['effectProcessedDailyMeasurements'], [ProcessedDailyMeasurement]);
      }
      if (data.hasOwnProperty('effectVariable')) {
        obj['effectVariable'] = UserVariable.constructFromObject(data['effectVariable']);
      }
      if (data.hasOwnProperty('highcharts')) {
        obj['highcharts'] = HighchartArray.constructFromObject(data['highcharts']);
      }
      if (data.hasOwnProperty('pairs')) {
        obj['pairs'] = ApiClient.convertToType(data['pairs'], [Pair]);
      }
      if (data.hasOwnProperty('statistics')) {
        obj['statistics'] = Correlation.constructFromObject(data['statistics']);
      }
      if (data.hasOwnProperty('text')) {
        obj['text'] = ApiClient.convertToType(data['text'], 'String');
      }
      if (data.hasOwnProperty('user')) {
        obj['user'] = ApiClient.convertToType(data['user'], 'String');
      }
      if (data.hasOwnProperty('userId')) {
        obj['userId'] = ApiClient.convertToType(data['userId'], 'Number');
      }
    }
    return obj;
  }

  /**
   * @member {Array.<module:model/ProcessedDailyMeasurement>} causeProcessedDailyMeasurements
   */
  exports.prototype['causeProcessedDailyMeasurements'] = undefined;
  /**
   * @member {module:model/UserVariable} causeVariable
   */
  exports.prototype['causeVariable'] = undefined;
  /**
   * @member {Array.<module:model/Highchart>} charts
   */
  exports.prototype['charts'] = undefined;
  /**
   * @member {Array.<module:model/ProcessedDailyMeasurement>} effectProcessedDailyMeasurements
   */
  exports.prototype['effectProcessedDailyMeasurements'] = undefined;
  /**
   * @member {module:model/UserVariable} effectVariable
   */
  exports.prototype['effectVariable'] = undefined;
  /**
   * @member {module:model/HighchartArray} highcharts
   */
  exports.prototype['highcharts'] = undefined;
  /**
   * @member {Array.<module:model/Pair>} pairs
   */
  exports.prototype['pairs'] = undefined;
  /**
   * @member {module:model/Correlation} statistics
   */
  exports.prototype['statistics'] = undefined;
  /**
   * Example: 
   * @member {String} text
   */
  exports.prototype['text'] = undefined;
  /**
   * Example: 
   * @member {String} user
   */
  exports.prototype['user'] = undefined;
  /**
   * Example: 230
   * @member {Number} userId
   */
  exports.prototype['userId'] = undefined;



  return exports;
}));


