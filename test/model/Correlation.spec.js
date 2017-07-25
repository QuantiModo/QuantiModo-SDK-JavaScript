/**
 * QuantiModo
 * QuantiModo makes it easy to retrieve normalized user data from a wide array of devices and applications. [Learn about QuantiModo](https://quantimo.do), check out our [docs](https://github.com/QuantiModo/docs) or contact us at [help.quantimo.do](https://help.quantimo.do). 
 *
 * OpenAPI spec version: 5.8.7
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
    factory(root.expect, root.quantimodo);
  }
}(this, function(expect, quantimodo) {
  'use strict';

  var instance;

  beforeEach(function() {
    instance = new quantimodo.Correlation();
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

  describe('Correlation', function() {
    it('should create an instance of Correlation', function() {
      // uncomment below and update the code to test Correlation
      //var instane = new quantimodo.Correlation();
      //expect(instance).to.be.a(quantimodo.Correlation);
    });

    it('should have the property averageDailyLowCause (base name: "averageDailyLowCause")', function() {
      // uncomment below and update the code to test the property averageDailyLowCause
      //var instane = new quantimodo.Correlation();
      //expect(instance).to.be();
    });

    it('should have the property averageDailyHighCause (base name: "averageDailyHighCause")', function() {
      // uncomment below and update the code to test the property averageDailyHighCause
      //var instane = new quantimodo.Correlation();
      //expect(instance).to.be();
    });

    it('should have the property averageEffect (base name: "averageEffect")', function() {
      // uncomment below and update the code to test the property averageEffect
      //var instane = new quantimodo.Correlation();
      //expect(instance).to.be();
    });

    it('should have the property averageEffectFollowingHighCause (base name: "averageEffectFollowingHighCause")', function() {
      // uncomment below and update the code to test the property averageEffectFollowingHighCause
      //var instane = new quantimodo.Correlation();
      //expect(instance).to.be();
    });

    it('should have the property averageEffectFollowingLowCause (base name: "averageEffectFollowingLowCause")', function() {
      // uncomment below and update the code to test the property averageEffectFollowingLowCause
      //var instane = new quantimodo.Correlation();
      //expect(instance).to.be();
    });

    it('should have the property averageEffectFollowingHighCauseExplanation (base name: "averageEffectFollowingHighCauseExplanation")', function() {
      // uncomment below and update the code to test the property averageEffectFollowingHighCauseExplanation
      //var instane = new quantimodo.Correlation();
      //expect(instance).to.be();
    });

    it('should have the property averageEffectFollowingLowCauseExplanation (base name: "averageEffectFollowingLowCauseExplanation")', function() {
      // uncomment below and update the code to test the property averageEffectFollowingLowCauseExplanation
      //var instane = new quantimodo.Correlation();
      //expect(instance).to.be();
    });

    it('should have the property averageVote (base name: "averageVote")', function() {
      // uncomment below and update the code to test the property averageVote
      //var instane = new quantimodo.Correlation();
      //expect(instance).to.be();
    });

    it('should have the property causalityFactor (base name: "causalityFactor")', function() {
      // uncomment below and update the code to test the property causalityFactor
      //var instane = new quantimodo.Correlation();
      //expect(instance).to.be();
    });

    it('should have the property cause (base name: "cause")', function() {
      // uncomment below and update the code to test the property cause
      //var instane = new quantimodo.Correlation();
      //expect(instance).to.be();
    });

    it('should have the property causeVariableCategoryName (base name: "causeVariableCategoryName")', function() {
      // uncomment below and update the code to test the property causeVariableCategoryName
      //var instane = new quantimodo.Correlation();
      //expect(instance).to.be();
    });

    it('should have the property causeChanges (base name: "causeChanges")', function() {
      // uncomment below and update the code to test the property causeChanges
      //var instane = new quantimodo.Correlation();
      //expect(instance).to.be();
    });

    it('should have the property causeVariableCombinationOperation (base name: "causeVariableCombinationOperation")', function() {
      // uncomment below and update the code to test the property causeVariableCombinationOperation
      //var instane = new quantimodo.Correlation();
      //expect(instance).to.be();
    });

    it('should have the property causeVariableImageUrl (base name: "causeVariableImageUrl")', function() {
      // uncomment below and update the code to test the property causeVariableImageUrl
      //var instane = new quantimodo.Correlation();
      //expect(instance).to.be();
    });

    it('should have the property causeVariableIonIcon (base name: "causeVariableIonIcon")', function() {
      // uncomment below and update the code to test the property causeVariableIonIcon
      //var instane = new quantimodo.Correlation();
      //expect(instance).to.be();
    });

    it('should have the property causeUnit (base name: "causeUnit")', function() {
      // uncomment below and update the code to test the property causeUnit
      //var instane = new quantimodo.Correlation();
      //expect(instance).to.be();
    });

    it('should have the property causeVariableDefaultUnitId (base name: "causeVariableDefaultUnitId")', function() {
      // uncomment below and update the code to test the property causeVariableDefaultUnitId
      //var instane = new quantimodo.Correlation();
      //expect(instance).to.be();
    });

    it('should have the property causeVariableId (base name: "causeVariableId")', function() {
      // uncomment below and update the code to test the property causeVariableId
      //var instane = new quantimodo.Correlation();
      //expect(instance).to.be();
    });

    it('should have the property causeVariableName (base name: "causeVariableName")', function() {
      // uncomment below and update the code to test the property causeVariableName
      //var instane = new quantimodo.Correlation();
      //expect(instance).to.be();
    });

    it('should have the property correlationCoefficient (base name: "correlationCoefficient")', function() {
      // uncomment below and update the code to test the property correlationCoefficient
      //var instane = new quantimodo.Correlation();
      //expect(instance).to.be();
    });

    it('should have the property createdAt (base name: "createdAt")', function() {
      // uncomment below and update the code to test the property createdAt
      //var instane = new quantimodo.Correlation();
      //expect(instance).to.be();
    });

    it('should have the property dataAnalysis (base name: "dataAnalysis")', function() {
      // uncomment below and update the code to test the property dataAnalysis
      //var instane = new quantimodo.Correlation();
      //expect(instance).to.be();
    });

    it('should have the property dataSources (base name: "dataSources")', function() {
      // uncomment below and update the code to test the property dataSources
      //var instane = new quantimodo.Correlation();
      //expect(instance).to.be();
    });

    it('should have the property durationOfAction (base name: "durationOfAction")', function() {
      // uncomment below and update the code to test the property durationOfAction
      //var instane = new quantimodo.Correlation();
      //expect(instance).to.be();
    });

    it('should have the property effect (base name: "effect")', function() {
      // uncomment below and update the code to test the property effect
      //var instane = new quantimodo.Correlation();
      //expect(instance).to.be();
    });

    it('should have the property effectVariableCategoryName (base name: "effectVariableCategoryName")', function() {
      // uncomment below and update the code to test the property effectVariableCategoryName
      //var instane = new quantimodo.Correlation();
      //expect(instance).to.be();
    });

    it('should have the property effectVariableImageUrl (base name: "effectVariableImageUrl")', function() {
      // uncomment below and update the code to test the property effectVariableImageUrl
      //var instane = new quantimodo.Correlation();
      //expect(instance).to.be();
    });

    it('should have the property effectVariableIonIcon (base name: "effectVariableIonIcon")', function() {
      // uncomment below and update the code to test the property effectVariableIonIcon
      //var instane = new quantimodo.Correlation();
      //expect(instance).to.be();
    });

    it('should have the property effectSize (base name: "effectSize")', function() {
      // uncomment below and update the code to test the property effectSize
      //var instane = new quantimodo.Correlation();
      //expect(instance).to.be();
    });

    it('should have the property effectVariableId (base name: "effectVariableId")', function() {
      // uncomment below and update the code to test the property effectVariableId
      //var instane = new quantimodo.Correlation();
      //expect(instance).to.be();
    });

    it('should have the property effectVariableName (base name: "effectVariableName")', function() {
      // uncomment below and update the code to test the property effectVariableName
      //var instane = new quantimodo.Correlation();
      //expect(instance).to.be();
    });

    it('should have the property gaugeImage (base name: "gaugeImage")', function() {
      // uncomment below and update the code to test the property gaugeImage
      //var instane = new quantimodo.Correlation();
      //expect(instance).to.be();
    });

    it('should have the property imageUrl (base name: "imageUrl")', function() {
      // uncomment below and update the code to test the property imageUrl
      //var instane = new quantimodo.Correlation();
      //expect(instance).to.be();
    });

    it('should have the property numberOfPairs (base name: "numberOfPairs")', function() {
      // uncomment below and update the code to test the property numberOfPairs
      //var instane = new quantimodo.Correlation();
      //expect(instance).to.be();
    });

    it('should have the property onsetDelay (base name: "onsetDelay")', function() {
      // uncomment below and update the code to test the property onsetDelay
      //var instane = new quantimodo.Correlation();
      //expect(instance).to.be();
    });

    it('should have the property optimalPearsonProduct (base name: "optimalPearsonProduct")', function() {
      // uncomment below and update the code to test the property optimalPearsonProduct
      //var instane = new quantimodo.Correlation();
      //expect(instance).to.be();
    });

    it('should have the property outcomeDataSources (base name: "outcomeDataSources")', function() {
      // uncomment below and update the code to test the property outcomeDataSources
      //var instane = new quantimodo.Correlation();
      //expect(instance).to.be();
    });

    it('should have the property predictorExplanation (base name: "predictorExplanation")', function() {
      // uncomment below and update the code to test the property predictorExplanation
      //var instane = new quantimodo.Correlation();
      //expect(instance).to.be();
    });

    it('should have the property principalInvestigator (base name: "principalInvestigator")', function() {
      // uncomment below and update the code to test the property principalInvestigator
      //var instane = new quantimodo.Correlation();
      //expect(instance).to.be();
    });

    it('should have the property qmScore (base name: "qmScore")', function() {
      // uncomment below and update the code to test the property qmScore
      //var instane = new quantimodo.Correlation();
      //expect(instance).to.be();
    });

    it('should have the property reverseCorrelation (base name: "reverseCorrelation")', function() {
      // uncomment below and update the code to test the property reverseCorrelation
      //var instane = new quantimodo.Correlation();
      //expect(instance).to.be();
    });

    it('should have the property significanceExplanation (base name: "significanceExplanation")', function() {
      // uncomment below and update the code to test the property significanceExplanation
      //var instane = new quantimodo.Correlation();
      //expect(instance).to.be();
    });

    it('should have the property statisticalSignificance (base name: "statisticalSignificance")', function() {
      // uncomment below and update the code to test the property statisticalSignificance
      //var instane = new quantimodo.Correlation();
      //expect(instance).to.be();
    });

    it('should have the property strengthLevel (base name: "strengthLevel")', function() {
      // uncomment below and update the code to test the property strengthLevel
      //var instane = new quantimodo.Correlation();
      //expect(instance).to.be();
    });

    it('should have the property studyAbstract (base name: "studyAbstract")', function() {
      // uncomment below and update the code to test the property studyAbstract
      //var instane = new quantimodo.Correlation();
      //expect(instance).to.be();
    });

    it('should have the property studyBackground (base name: "studyBackground")', function() {
      // uncomment below and update the code to test the property studyBackground
      //var instane = new quantimodo.Correlation();
      //expect(instance).to.be();
    });

    it('should have the property studyDesign (base name: "studyDesign")', function() {
      // uncomment below and update the code to test the property studyDesign
      //var instane = new quantimodo.Correlation();
      //expect(instance).to.be();
    });

    it('should have the property studyLimitations (base name: "studyLimitations")', function() {
      // uncomment below and update the code to test the property studyLimitations
      //var instane = new quantimodo.Correlation();
      //expect(instance).to.be();
    });

    it('should have the property studyLinkDynamic (base name: "studyLinkDynamic")', function() {
      // uncomment below and update the code to test the property studyLinkDynamic
      //var instane = new quantimodo.Correlation();
      //expect(instance).to.be();
    });

    it('should have the property studyLinkFacebook (base name: "studyLinkFacebook")', function() {
      // uncomment below and update the code to test the property studyLinkFacebook
      //var instane = new quantimodo.Correlation();
      //expect(instance).to.be();
    });

    it('should have the property studyLinkGoogle (base name: "studyLinkGoogle")', function() {
      // uncomment below and update the code to test the property studyLinkGoogle
      //var instane = new quantimodo.Correlation();
      //expect(instance).to.be();
    });

    it('should have the property studyLinkTwitter (base name: "studyLinkTwitter")', function() {
      // uncomment below and update the code to test the property studyLinkTwitter
      //var instane = new quantimodo.Correlation();
      //expect(instance).to.be();
    });

    it('should have the property studyLinkStatic (base name: "studyLinkStatic")', function() {
      // uncomment below and update the code to test the property studyLinkStatic
      //var instane = new quantimodo.Correlation();
      //expect(instance).to.be();
    });

    it('should have the property studyObjective (base name: "studyObjective")', function() {
      // uncomment below and update the code to test the property studyObjective
      //var instane = new quantimodo.Correlation();
      //expect(instance).to.be();
    });

    it('should have the property studyResults (base name: "studyResults")', function() {
      // uncomment below and update the code to test the property studyResults
      //var instane = new quantimodo.Correlation();
      //expect(instance).to.be();
    });

    it('should have the property studyTitle (base name: "studyTitle")', function() {
      // uncomment below and update the code to test the property studyTitle
      //var instane = new quantimodo.Correlation();
      //expect(instance).to.be();
    });

    it('should have the property timestamp (base name: "timestamp")', function() {
      // uncomment below and update the code to test the property timestamp
      //var instane = new quantimodo.Correlation();
      //expect(instance).to.be();
    });

    it('should have the property updatedAt (base name: "updatedAt")', function() {
      // uncomment below and update the code to test the property updatedAt
      //var instane = new quantimodo.Correlation();
      //expect(instance).to.be();
    });

    it('should have the property userVote (base name: "userVote")', function() {
      // uncomment below and update the code to test the property userVote
      //var instane = new quantimodo.Correlation();
      //expect(instance).to.be();
    });

    it('should have the property valuePredictingHighOutcome (base name: "valuePredictingHighOutcome")', function() {
      // uncomment below and update the code to test the property valuePredictingHighOutcome
      //var instane = new quantimodo.Correlation();
      //expect(instance).to.be();
    });

    it('should have the property valuePredictingHighOutcomeExplanation (base name: "valuePredictingHighOutcomeExplanation")', function() {
      // uncomment below and update the code to test the property valuePredictingHighOutcomeExplanation
      //var instane = new quantimodo.Correlation();
      //expect(instance).to.be();
    });

    it('should have the property valuePredictingLowOutcome (base name: "valuePredictingLowOutcome")', function() {
      // uncomment below and update the code to test the property valuePredictingLowOutcome
      //var instane = new quantimodo.Correlation();
      //expect(instance).to.be();
    });

    it('should have the property valuePredictingLowOutcomeExplanation (base name: "valuePredictingLowOutcomeExplanation")', function() {
      // uncomment below and update the code to test the property valuePredictingLowOutcomeExplanation
      //var instane = new quantimodo.Correlation();
      //expect(instance).to.be();
    });

  });

}));
