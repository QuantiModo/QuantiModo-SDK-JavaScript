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
    // AMD.
    define(['expect.js', '../../src/index'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    factory(require('expect.js'), require('../../src/index'));
  } else {
    // Browser globals (root is window)
    factory(root.expect, root.Quantimodo);
  }
}(this, function(expect, Quantimodo) {
  'use strict';

  var instance;

  beforeEach(function() {
    instance = new Quantimodo.UserStudy();
  });

  var getProperty = function(object, getter, property) {
    // Use getter method if present; otherwise, get the property directly.
    if (typeof object[getter] === 'function')
      return object[getter]();
    else
      return object[property];
  }

  var setProperty = function(object, setter, property, value) {
    // Use setter method if present; otherwise, set the property directly.
    if (typeof object[setter] === 'function')
      object[setter](value);
    else
      object[property] = value;
  }

  describe('UserStudy', function() {
    it('should create an instance of UserStudy', function() {
      // uncomment below and update the code to test UserStudy
      //var instane = new Quantimodo.UserStudy();
      //expect(instance).to.be.a(Quantimodo.UserStudy);
    });

    it('should have the property allPairsSignificance (base name: "allPairsSignificance")', function() {
      // uncomment below and update the code to test the property allPairsSignificance
      //var instane = new Quantimodo.UserStudy();
      //expect(instance).to.be();
    });

    it('should have the property averageDailyHighCause (base name: "averageDailyHighCause")', function() {
      // uncomment below and update the code to test the property averageDailyHighCause
      //var instane = new Quantimodo.UserStudy();
      //expect(instance).to.be();
    });

    it('should have the property averageDailyLowCause (base name: "averageDailyLowCause")', function() {
      // uncomment below and update the code to test the property averageDailyLowCause
      //var instane = new Quantimodo.UserStudy();
      //expect(instance).to.be();
    });

    it('should have the property averageEffect (base name: "averageEffect")', function() {
      // uncomment below and update the code to test the property averageEffect
      //var instane = new Quantimodo.UserStudy();
      //expect(instance).to.be();
    });

    it('should have the property averageEffectFollowingHighCause (base name: "averageEffectFollowingHighCause")', function() {
      // uncomment below and update the code to test the property averageEffectFollowingHighCause
      //var instane = new Quantimodo.UserStudy();
      //expect(instance).to.be();
    });

    it('should have the property averageEffectFollowingHighCauseExplanation (base name: "averageEffectFollowingHighCauseExplanation")', function() {
      // uncomment below and update the code to test the property averageEffectFollowingHighCauseExplanation
      //var instane = new Quantimodo.UserStudy();
      //expect(instance).to.be();
    });

    it('should have the property averageEffectFollowingLowCause (base name: "averageEffectFollowingLowCause")', function() {
      // uncomment below and update the code to test the property averageEffectFollowingLowCause
      //var instane = new Quantimodo.UserStudy();
      //expect(instance).to.be();
    });

    it('should have the property averageEffectFollowingLowCauseExplanation (base name: "averageEffectFollowingLowCauseExplanation")', function() {
      // uncomment below and update the code to test the property averageEffectFollowingLowCauseExplanation
      //var instane = new Quantimodo.UserStudy();
      //expect(instance).to.be();
    });

    it('should have the property causalityFactor (base name: "causalityFactor")', function() {
      // uncomment below and update the code to test the property causalityFactor
      //var instane = new Quantimodo.UserStudy();
      //expect(instance).to.be();
    });

    it('should have the property causeChanges (base name: "causeChanges")', function() {
      // uncomment below and update the code to test the property causeChanges
      //var instane = new Quantimodo.UserStudy();
      //expect(instance).to.be();
    });

    it('should have the property causeChangesStatisticalSignificance (base name: "causeChangesStatisticalSignificance")', function() {
      // uncomment below and update the code to test the property causeChangesStatisticalSignificance
      //var instane = new Quantimodo.UserStudy();
      //expect(instance).to.be();
    });

    it('should have the property causeDataSource (base name: "causeDataSource")', function() {
      // uncomment below and update the code to test the property causeDataSource
      //var instane = new Quantimodo.UserStudy();
      //expect(instance).to.be();
    });

    it('should have the property causeNumberOfProcessedDailyMeasurements (base name: "causeNumberOfProcessedDailyMeasurements")', function() {
      // uncomment below and update the code to test the property causeNumberOfProcessedDailyMeasurements
      //var instane = new Quantimodo.UserStudy();
      //expect(instance).to.be();
    });

    it('should have the property causeNumberOfRawMeasurements (base name: "causeNumberOfRawMeasurements")', function() {
      // uncomment below and update the code to test the property causeNumberOfRawMeasurements
      //var instane = new Quantimodo.UserStudy();
      //expect(instance).to.be();
    });

    it('should have the property causeValueSpread (base name: "causeValueSpread")', function() {
      // uncomment below and update the code to test the property causeValueSpread
      //var instane = new Quantimodo.UserStudy();
      //expect(instance).to.be();
    });

    it('should have the property causeVariable (base name: "causeVariable")', function() {
      // uncomment below and update the code to test the property causeVariable
      //var instane = new Quantimodo.UserStudy();
      //expect(instance).to.be();
    });

    it('should have the property causeVariableCategoryId (base name: "causeVariableCategoryId")', function() {
      // uncomment below and update the code to test the property causeVariableCategoryId
      //var instane = new Quantimodo.UserStudy();
      //expect(instance).to.be();
    });

    it('should have the property causeVariableCategoryName (base name: "causeVariableCategoryName")', function() {
      // uncomment below and update the code to test the property causeVariableCategoryName
      //var instane = new Quantimodo.UserStudy();
      //expect(instance).to.be();
    });

    it('should have the property causeVariableUnitAbbreviatedName (base name: "causeVariableUnitAbbreviatedName")', function() {
      // uncomment below and update the code to test the property causeVariableUnitAbbreviatedName
      //var instane = new Quantimodo.UserStudy();
      //expect(instance).to.be();
    });

    it('should have the property causeVariableUnitId (base name: "causeVariableUnitId")', function() {
      // uncomment below and update the code to test the property causeVariableUnitId
      //var instane = new Quantimodo.UserStudy();
      //expect(instance).to.be();
    });

    it('should have the property causeVariableId (base name: "causeVariableId")', function() {
      // uncomment below and update the code to test the property causeVariableId
      //var instane = new Quantimodo.UserStudy();
      //expect(instance).to.be();
    });

    it('should have the property causeVariableImageUrl (base name: "causeVariableImageUrl")', function() {
      // uncomment below and update the code to test the property causeVariableImageUrl
      //var instane = new Quantimodo.UserStudy();
      //expect(instance).to.be();
    });

    it('should have the property causeVariableIonIcon (base name: "causeVariableIonIcon")', function() {
      // uncomment below and update the code to test the property causeVariableIonIcon
      //var instane = new Quantimodo.UserStudy();
      //expect(instance).to.be();
    });

    it('should have the property causeVariableMostCommonConnectorId (base name: "causeVariableMostCommonConnectorId")', function() {
      // uncomment below and update the code to test the property causeVariableMostCommonConnectorId
      //var instane = new Quantimodo.UserStudy();
      //expect(instance).to.be();
    });

    it('should have the property causeVariableName (base name: "causeVariableName")', function() {
      // uncomment below and update the code to test the property causeVariableName
      //var instane = new Quantimodo.UserStudy();
      //expect(instance).to.be();
    });

    it('should have the property charts (base name: "charts")', function() {
      // uncomment below and update the code to test the property charts
      //var instane = new Quantimodo.UserStudy();
      //expect(instance).to.be();
    });

    it('should have the property confidenceInterval (base name: "confidenceInterval")', function() {
      // uncomment below and update the code to test the property confidenceInterval
      //var instane = new Quantimodo.UserStudy();
      //expect(instance).to.be();
    });

    it('should have the property confidenceLevel (base name: "confidenceLevel")', function() {
      // uncomment below and update the code to test the property confidenceLevel
      //var instane = new Quantimodo.UserStudy();
      //expect(instance).to.be();
    });

    it('should have the property correlationCoefficient (base name: "correlationCoefficient")', function() {
      // uncomment below and update the code to test the property correlationCoefficient
      //var instane = new Quantimodo.UserStudy();
      //expect(instance).to.be();
    });

    it('should have the property correlationIsContradictoryToOptimalValues (base name: "correlationIsContradictoryToOptimalValues")', function() {
      // uncomment below and update the code to test the property correlationIsContradictoryToOptimalValues
      //var instane = new Quantimodo.UserStudy();
      //expect(instance).to.be();
    });

    it('should have the property criticalTValue (base name: "criticalTValue")', function() {
      // uncomment below and update the code to test the property criticalTValue
      //var instane = new Quantimodo.UserStudy();
      //expect(instance).to.be();
    });

    it('should have the property dataAnalysis (base name: "dataAnalysis")', function() {
      // uncomment below and update the code to test the property dataAnalysis
      //var instane = new Quantimodo.UserStudy();
      //expect(instance).to.be();
    });

    it('should have the property dataSources (base name: "dataSources")', function() {
      // uncomment below and update the code to test the property dataSources
      //var instane = new Quantimodo.UserStudy();
      //expect(instance).to.be();
    });

    it('should have the property dataSourcesParagraphForCause (base name: "dataSourcesParagraphForCause")', function() {
      // uncomment below and update the code to test the property dataSourcesParagraphForCause
      //var instane = new Quantimodo.UserStudy();
      //expect(instance).to.be();
    });

    it('should have the property dataSourcesParagraphForEffect (base name: "dataSourcesParagraphForEffect")', function() {
      // uncomment below and update the code to test the property dataSourcesParagraphForEffect
      //var instane = new Quantimodo.UserStudy();
      //expect(instance).to.be();
    });

    it('should have the property degreesOfFreedom (base name: "degreesOfFreedom")', function() {
      // uncomment below and update the code to test the property degreesOfFreedom
      //var instane = new Quantimodo.UserStudy();
      //expect(instance).to.be();
    });

    it('should have the property direction (base name: "direction")', function() {
      // uncomment below and update the code to test the property direction
      //var instane = new Quantimodo.UserStudy();
      //expect(instance).to.be();
    });

    it('should have the property distanceFromMiddleToBeHightLowEffect (base name: "distanceFromMiddleToBeHightLowEffect")', function() {
      // uncomment below and update the code to test the property distanceFromMiddleToBeHightLowEffect
      //var instane = new Quantimodo.UserStudy();
      //expect(instance).to.be();
    });

    it('should have the property durationOfAction (base name: "durationOfAction")', function() {
      // uncomment below and update the code to test the property durationOfAction
      //var instane = new Quantimodo.UserStudy();
      //expect(instance).to.be();
    });

    it('should have the property durationOfActionInHours (base name: "durationOfActionInHours")', function() {
      // uncomment below and update the code to test the property durationOfActionInHours
      //var instane = new Quantimodo.UserStudy();
      //expect(instance).to.be();
    });

    it('should have the property effectChanges (base name: "effectChanges")', function() {
      // uncomment below and update the code to test the property effectChanges
      //var instane = new Quantimodo.UserStudy();
      //expect(instance).to.be();
    });

    it('should have the property effectDataSource (base name: "effectDataSource")', function() {
      // uncomment below and update the code to test the property effectDataSource
      //var instane = new Quantimodo.UserStudy();
      //expect(instance).to.be();
    });

    it('should have the property effectNumberOfProcessedDailyMeasurements (base name: "effectNumberOfProcessedDailyMeasurements")', function() {
      // uncomment below and update the code to test the property effectNumberOfProcessedDailyMeasurements
      //var instane = new Quantimodo.UserStudy();
      //expect(instance).to.be();
    });

    it('should have the property effectNumberOfRawMeasurements (base name: "effectNumberOfRawMeasurements")', function() {
      // uncomment below and update the code to test the property effectNumberOfRawMeasurements
      //var instane = new Quantimodo.UserStudy();
      //expect(instance).to.be();
    });

    it('should have the property effectSize (base name: "effectSize")', function() {
      // uncomment below and update the code to test the property effectSize
      //var instane = new Quantimodo.UserStudy();
      //expect(instance).to.be();
    });

    it('should have the property effectUnit (base name: "effectUnit")', function() {
      // uncomment below and update the code to test the property effectUnit
      //var instane = new Quantimodo.UserStudy();
      //expect(instance).to.be();
    });

    it('should have the property effectValueSpread (base name: "effectValueSpread")', function() {
      // uncomment below and update the code to test the property effectValueSpread
      //var instane = new Quantimodo.UserStudy();
      //expect(instance).to.be();
    });

    it('should have the property effectVariable (base name: "effectVariable")', function() {
      // uncomment below and update the code to test the property effectVariable
      //var instane = new Quantimodo.UserStudy();
      //expect(instance).to.be();
    });

    it('should have the property effectVariableCategoryId (base name: "effectVariableCategoryId")', function() {
      // uncomment below and update the code to test the property effectVariableCategoryId
      //var instane = new Quantimodo.UserStudy();
      //expect(instance).to.be();
    });

    it('should have the property effectVariableCategoryName (base name: "effectVariableCategoryName")', function() {
      // uncomment below and update the code to test the property effectVariableCategoryName
      //var instane = new Quantimodo.UserStudy();
      //expect(instance).to.be();
    });

    it('should have the property effectVariableUnitAbbreviatedName (base name: "effectVariableUnitAbbreviatedName")', function() {
      // uncomment below and update the code to test the property effectVariableUnitAbbreviatedName
      //var instane = new Quantimodo.UserStudy();
      //expect(instance).to.be();
    });

    it('should have the property effectVariableUnitId (base name: "effectVariableUnitId")', function() {
      // uncomment below and update the code to test the property effectVariableUnitId
      //var instane = new Quantimodo.UserStudy();
      //expect(instance).to.be();
    });

    it('should have the property effectVariableId (base name: "effectVariableId")', function() {
      // uncomment below and update the code to test the property effectVariableId
      //var instane = new Quantimodo.UserStudy();
      //expect(instance).to.be();
    });

    it('should have the property effectVariableImageUrl (base name: "effectVariableImageUrl")', function() {
      // uncomment below and update the code to test the property effectVariableImageUrl
      //var instane = new Quantimodo.UserStudy();
      //expect(instance).to.be();
    });

    it('should have the property effectVariableIonIcon (base name: "effectVariableIonIcon")', function() {
      // uncomment below and update the code to test the property effectVariableIonIcon
      //var instane = new Quantimodo.UserStudy();
      //expect(instance).to.be();
    });

    it('should have the property effectVariableMostCommonConnectorId (base name: "effectVariableMostCommonConnectorId")', function() {
      // uncomment below and update the code to test the property effectVariableMostCommonConnectorId
      //var instane = new Quantimodo.UserStudy();
      //expect(instance).to.be();
    });

    it('should have the property effectVariableName (base name: "effectVariableName")', function() {
      // uncomment below and update the code to test the property effectVariableName
      //var instane = new Quantimodo.UserStudy();
      //expect(instance).to.be();
    });

    it('should have the property error (base name: "error")', function() {
      // uncomment below and update the code to test the property error
      //var instane = new Quantimodo.UserStudy();
      //expect(instance).to.be();
    });

    it('should have the property experimentEndTime (base name: "experimentEndTime")', function() {
      // uncomment below and update the code to test the property experimentEndTime
      //var instane = new Quantimodo.UserStudy();
      //expect(instance).to.be();
    });

    it('should have the property experimentStartTime (base name: "experimentStartTime")', function() {
      // uncomment below and update the code to test the property experimentStartTime
      //var instane = new Quantimodo.UserStudy();
      //expect(instance).to.be();
    });

    it('should have the property forwardSpearmanCorrelationCoefficient (base name: "forwardSpearmanCorrelationCoefficient")', function() {
      // uncomment below and update the code to test the property forwardSpearmanCorrelationCoefficient
      //var instane = new Quantimodo.UserStudy();
      //expect(instance).to.be();
    });

    it('should have the property gaugeImage (base name: "gaugeImage")', function() {
      // uncomment below and update the code to test the property gaugeImage
      //var instane = new Quantimodo.UserStudy();
      //expect(instance).to.be();
    });

    it('should have the property gaugeImageSquare (base name: "gaugeImageSquare")', function() {
      // uncomment below and update the code to test the property gaugeImageSquare
      //var instane = new Quantimodo.UserStudy();
      //expect(instance).to.be();
    });

    it('should have the property imageUrl (base name: "imageUrl")', function() {
      // uncomment below and update the code to test the property imageUrl
      //var instane = new Quantimodo.UserStudy();
      //expect(instance).to.be();
    });

    it('should have the property instructionsForCause (base name: "instructionsForCause")', function() {
      // uncomment below and update the code to test the property instructionsForCause
      //var instane = new Quantimodo.UserStudy();
      //expect(instance).to.be();
    });

    it('should have the property instructionsForEffect (base name: "instructionsForEffect")', function() {
      // uncomment below and update the code to test the property instructionsForEffect
      //var instane = new Quantimodo.UserStudy();
      //expect(instance).to.be();
    });

    it('should have the property maximumCauseValue (base name: "maximumCauseValue")', function() {
      // uncomment below and update the code to test the property maximumCauseValue
      //var instane = new Quantimodo.UserStudy();
      //expect(instance).to.be();
    });

    it('should have the property maximumEffectValue (base name: "maximumEffectValue")', function() {
      // uncomment below and update the code to test the property maximumEffectValue
      //var instane = new Quantimodo.UserStudy();
      //expect(instance).to.be();
    });

    it('should have the property minimumCauseValue (base name: "minimumCauseValue")', function() {
      // uncomment below and update the code to test the property minimumCauseValue
      //var instane = new Quantimodo.UserStudy();
      //expect(instance).to.be();
    });

    it('should have the property minimumEffectValue (base name: "minimumEffectValue")', function() {
      // uncomment below and update the code to test the property minimumEffectValue
      //var instane = new Quantimodo.UserStudy();
      //expect(instance).to.be();
    });

    it('should have the property minimumProbability (base name: "minimumProbability")', function() {
      // uncomment below and update the code to test the property minimumProbability
      //var instane = new Quantimodo.UserStudy();
      //expect(instance).to.be();
    });

    it('should have the property numberOfCauseChangesForOptimalValues (base name: "numberOfCauseChangesForOptimalValues")', function() {
      // uncomment below and update the code to test the property numberOfCauseChangesForOptimalValues
      //var instane = new Quantimodo.UserStudy();
      //expect(instance).to.be();
    });

    it('should have the property numberOfDays (base name: "numberOfDays")', function() {
      // uncomment below and update the code to test the property numberOfDays
      //var instane = new Quantimodo.UserStudy();
      //expect(instance).to.be();
    });

    it('should have the property numberOfDaysSignificance (base name: "numberOfDaysSignificance")', function() {
      // uncomment below and update the code to test the property numberOfDaysSignificance
      //var instane = new Quantimodo.UserStudy();
      //expect(instance).to.be();
    });

    it('should have the property numberOfEffectChangesForOptimalValues (base name: "numberOfEffectChangesForOptimalValues")', function() {
      // uncomment below and update the code to test the property numberOfEffectChangesForOptimalValues
      //var instane = new Quantimodo.UserStudy();
      //expect(instance).to.be();
    });

    it('should have the property numberOfHighEffectPairs (base name: "numberOfHighEffectPairs")', function() {
      // uncomment below and update the code to test the property numberOfHighEffectPairs
      //var instane = new Quantimodo.UserStudy();
      //expect(instance).to.be();
    });

    it('should have the property numberOfLowEffectPairs (base name: "numberOfLowEffectPairs")', function() {
      // uncomment below and update the code to test the property numberOfLowEffectPairs
      //var instane = new Quantimodo.UserStudy();
      //expect(instance).to.be();
    });

    it('should have the property numberOfPairs (base name: "numberOfPairs")', function() {
      // uncomment below and update the code to test the property numberOfPairs
      //var instane = new Quantimodo.UserStudy();
      //expect(instance).to.be();
    });

    it('should have the property numberOfSamples (base name: "numberOfSamples")', function() {
      // uncomment below and update the code to test the property numberOfSamples
      //var instane = new Quantimodo.UserStudy();
      //expect(instance).to.be();
    });

    it('should have the property numberOfUniqueCauseValuesForOptimalValues (base name: "numberOfUniqueCauseValuesForOptimalValues")', function() {
      // uncomment below and update the code to test the property numberOfUniqueCauseValuesForOptimalValues
      //var instane = new Quantimodo.UserStudy();
      //expect(instance).to.be();
    });

    it('should have the property numberOfUniqueEffectValuesForOptimalValues (base name: "numberOfUniqueEffectValuesForOptimalValues")', function() {
      // uncomment below and update the code to test the property numberOfUniqueEffectValuesForOptimalValues
      //var instane = new Quantimodo.UserStudy();
      //expect(instance).to.be();
    });

    it('should have the property onsetDelay (base name: "onsetDelay")', function() {
      // uncomment below and update the code to test the property onsetDelay
      //var instane = new Quantimodo.UserStudy();
      //expect(instance).to.be();
    });

    it('should have the property onsetDelayInHours (base name: "onsetDelayInHours")', function() {
      // uncomment below and update the code to test the property onsetDelayInHours
      //var instane = new Quantimodo.UserStudy();
      //expect(instance).to.be();
    });

    it('should have the property optimalChangeSpread (base name: "optimalChangeSpread")', function() {
      // uncomment below and update the code to test the property optimalChangeSpread
      //var instane = new Quantimodo.UserStudy();
      //expect(instance).to.be();
    });

    it('should have the property optimalChangeSpreadSignificance (base name: "optimalChangeSpreadSignificance")', function() {
      // uncomment below and update the code to test the property optimalChangeSpreadSignificance
      //var instane = new Quantimodo.UserStudy();
      //expect(instance).to.be();
    });

    it('should have the property optimalPearsonProduct (base name: "optimalPearsonProduct")', function() {
      // uncomment below and update the code to test the property optimalPearsonProduct
      //var instane = new Quantimodo.UserStudy();
      //expect(instance).to.be();
    });

    it('should have the property predictivePearsonCorrelationCoefficient (base name: "predictivePearsonCorrelationCoefficient")', function() {
      // uncomment below and update the code to test the property predictivePearsonCorrelationCoefficient
      //var instane = new Quantimodo.UserStudy();
      //expect(instance).to.be();
    });

    it('should have the property predictorExplanation (base name: "predictorExplanation")', function() {
      // uncomment below and update the code to test the property predictorExplanation
      //var instane = new Quantimodo.UserStudy();
      //expect(instance).to.be();
    });

    it('should have the property predictsHighEffectChange (base name: "predictsHighEffectChange")', function() {
      // uncomment below and update the code to test the property predictsHighEffectChange
      //var instane = new Quantimodo.UserStudy();
      //expect(instance).to.be();
    });

    it('should have the property predictsHighEffectChangeSentenceFragment (base name: "predictsHighEffectChangeSentenceFragment")', function() {
      // uncomment below and update the code to test the property predictsHighEffectChangeSentenceFragment
      //var instane = new Quantimodo.UserStudy();
      //expect(instance).to.be();
    });

    it('should have the property predictsLowEffectChange (base name: "predictsLowEffectChange")', function() {
      // uncomment below and update the code to test the property predictsLowEffectChange
      //var instane = new Quantimodo.UserStudy();
      //expect(instance).to.be();
    });

    it('should have the property predictsLowEffectChangeSentenceFragment (base name: "predictsLowEffectChangeSentenceFragment")', function() {
      // uncomment below and update the code to test the property predictsLowEffectChangeSentenceFragment
      //var instane = new Quantimodo.UserStudy();
      //expect(instance).to.be();
    });

    it('should have the property rawCauseMeasurementSignificance (base name: "rawCauseMeasurementSignificance")', function() {
      // uncomment below and update the code to test the property rawCauseMeasurementSignificance
      //var instane = new Quantimodo.UserStudy();
      //expect(instance).to.be();
    });

    it('should have the property rawEffectMeasurementSignificance (base name: "rawEffectMeasurementSignificance")', function() {
      // uncomment below and update the code to test the property rawEffectMeasurementSignificance
      //var instane = new Quantimodo.UserStudy();
      //expect(instance).to.be();
    });

    it('should have the property shareUserMeasurements (base name: "shareUserMeasurements")', function() {
      // uncomment below and update the code to test the property shareUserMeasurements
      //var instane = new Quantimodo.UserStudy();
      //expect(instance).to.be();
    });

    it('should have the property significanceExplanation (base name: "significanceExplanation")', function() {
      // uncomment below and update the code to test the property significanceExplanation
      //var instane = new Quantimodo.UserStudy();
      //expect(instance).to.be();
    });

    it('should have the property significantDifference (base name: "significantDifference")', function() {
      // uncomment below and update the code to test the property significantDifference
      //var instane = new Quantimodo.UserStudy();
      //expect(instance).to.be();
    });

    it('should have the property statisticalSignificance (base name: "statisticalSignificance")', function() {
      // uncomment below and update the code to test the property statisticalSignificance
      //var instane = new Quantimodo.UserStudy();
      //expect(instance).to.be();
    });

    it('should have the property strengthLevel (base name: "strengthLevel")', function() {
      // uncomment below and update the code to test the property strengthLevel
      //var instane = new Quantimodo.UserStudy();
      //expect(instance).to.be();
    });

    it('should have the property studyAbstract (base name: "studyAbstract")', function() {
      // uncomment below and update the code to test the property studyAbstract
      //var instane = new Quantimodo.UserStudy();
      //expect(instance).to.be();
    });

    it('should have the property studyBackground (base name: "studyBackground")', function() {
      // uncomment below and update the code to test the property studyBackground
      //var instane = new Quantimodo.UserStudy();
      //expect(instance).to.be();
    });

    it('should have the property studyDesign (base name: "studyDesign")', function() {
      // uncomment below and update the code to test the property studyDesign
      //var instane = new Quantimodo.UserStudy();
      //expect(instance).to.be();
    });

    it('should have the property studyLimitations (base name: "studyLimitations")', function() {
      // uncomment below and update the code to test the property studyLimitations
      //var instane = new Quantimodo.UserStudy();
      //expect(instance).to.be();
    });

    it('should have the property studyLinkDynamic (base name: "studyLinkDynamic")', function() {
      // uncomment below and update the code to test the property studyLinkDynamic
      //var instane = new Quantimodo.UserStudy();
      //expect(instance).to.be();
    });

    it('should have the property studyLinkEmail (base name: "studyLinkEmail")', function() {
      // uncomment below and update the code to test the property studyLinkEmail
      //var instane = new Quantimodo.UserStudy();
      //expect(instance).to.be();
    });

    it('should have the property studyLinkFacebook (base name: "studyLinkFacebook")', function() {
      // uncomment below and update the code to test the property studyLinkFacebook
      //var instane = new Quantimodo.UserStudy();
      //expect(instance).to.be();
    });

    it('should have the property studyLinkGoogle (base name: "studyLinkGoogle")', function() {
      // uncomment below and update the code to test the property studyLinkGoogle
      //var instane = new Quantimodo.UserStudy();
      //expect(instance).to.be();
    });

    it('should have the property studyLinkStatic (base name: "studyLinkStatic")', function() {
      // uncomment below and update the code to test the property studyLinkStatic
      //var instane = new Quantimodo.UserStudy();
      //expect(instance).to.be();
    });

    it('should have the property studyLinkTwitter (base name: "studyLinkTwitter")', function() {
      // uncomment below and update the code to test the property studyLinkTwitter
      //var instane = new Quantimodo.UserStudy();
      //expect(instance).to.be();
    });

    it('should have the property studyObjective (base name: "studyObjective")', function() {
      // uncomment below and update the code to test the property studyObjective
      //var instane = new Quantimodo.UserStudy();
      //expect(instance).to.be();
    });

    it('should have the property studyResults (base name: "studyResults")', function() {
      // uncomment below and update the code to test the property studyResults
      //var instane = new Quantimodo.UserStudy();
      //expect(instance).to.be();
    });

    it('should have the property studyTitle (base name: "studyTitle")', function() {
      // uncomment below and update the code to test the property studyTitle
      //var instane = new Quantimodo.UserStudy();
      //expect(instance).to.be();
    });

    it('should have the property timestamp (base name: "timestamp")', function() {
      // uncomment below and update the code to test the property timestamp
      //var instane = new Quantimodo.UserStudy();
      //expect(instance).to.be();
    });

    it('should have the property tValue (base name: "tValue")', function() {
      // uncomment below and update the code to test the property tValue
      //var instane = new Quantimodo.UserStudy();
      //expect(instance).to.be();
    });

    it('should have the property userId (base name: "userId")', function() {
      // uncomment below and update the code to test the property userId
      //var instane = new Quantimodo.UserStudy();
      //expect(instance).to.be();
    });

    it('should have the property valuePredictingHighOutcome (base name: "valuePredictingHighOutcome")', function() {
      // uncomment below and update the code to test the property valuePredictingHighOutcome
      //var instane = new Quantimodo.UserStudy();
      //expect(instance).to.be();
    });

    it('should have the property valuePredictingHighOutcomeExplanation (base name: "valuePredictingHighOutcomeExplanation")', function() {
      // uncomment below and update the code to test the property valuePredictingHighOutcomeExplanation
      //var instane = new Quantimodo.UserStudy();
      //expect(instance).to.be();
    });

    it('should have the property valuePredictingLowOutcome (base name: "valuePredictingLowOutcome")', function() {
      // uncomment below and update the code to test the property valuePredictingLowOutcome
      //var instane = new Quantimodo.UserStudy();
      //expect(instance).to.be();
    });

    it('should have the property valuePredictingLowOutcomeExplanation (base name: "valuePredictingLowOutcomeExplanation")', function() {
      // uncomment below and update the code to test the property valuePredictingLowOutcomeExplanation
      //var instane = new Quantimodo.UserStudy();
      //expect(instance).to.be();
    });

    it('should have the property voteStatisticalSignificance (base name: "voteStatisticalSignificance")', function() {
      // uncomment below and update the code to test the property voteStatisticalSignificance
      //var instane = new Quantimodo.UserStudy();
      //expect(instance).to.be();
    });

  });

}));
