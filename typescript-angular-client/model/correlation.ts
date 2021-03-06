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
import { DataSource } from './dataSource';
import { StudyHtml } from './studyHtml';
import { StudyImages } from './studyImages';
import { StudyLinks } from './studyLinks';
import { StudyText } from './studyText';


export interface Correlation { 
    /**
     * Ex: 4.19
     */
    averageDailyHighCause?: number;
    /**
     * Ex: 1.97
     */
    averageDailyLowCause?: number;
    /**
     * Ex: 3.0791054117396
     */
    averageEffect?: number;
    /**
     * Ex: 3.55
     */
    averageEffectFollowingHighCause?: number;
    /**
     * Ex: 2.65
     */
    averageEffectFollowingLowCause?: number;
    /**
     * Ex: 0.396
     */
    averageForwardPearsonCorrelationOverOnsetDelays?: number;
    /**
     * Ex: 0.453667
     */
    averageReversePearsonCorrelationOverOnsetDelays?: number;
    /**
     * Ex: 0.9855
     */
    averageVote?: number;
    /**
     * Ex: 164
     */
    causeChanges?: number;
    causeDataSource?: DataSource;
    /**
     * Ex: 1
     */
    causeUserVariableShareUserMeasurements?: number;
    /**
     * Ex: 6
     */
    causeVariableCategoryId?: number;
    /**
     * Ex: Sleep
     */
    causeVariableCategoryName?: string;
    /**
     * Ex: MEAN
     */
    causeVariableCombinationOperation?: string;
    /**
     * Ex: /5
     */
    causeVariableUnitAbbreviatedName?: string;
    /**
     * Ex: 1448
     */
    causeVariableId?: number;
    /**
     * Ex: 6
     */
    causeVariableMostCommonConnectorId?: number;
    /**
     * Ex: Sleep Quality
     */
    causeVariableName: string;
    /**
     * Ex: 0.14344467795996
     */
    confidenceInterval?: number;
    /**
     * Ex: high
     */
    confidenceLevel?: string;
    /**
     * Ex: 0.538
     */
    correlationCoefficient?: number;
    /**
     * Ex: false
     */
    correlationIsContradictoryToOptimalValues?: boolean;
    /**
     * Ex: 2016-12-28 20:47:30 UTC ISO 8601 YYYY-MM-DDThh:mm:ss
     */
    createdAt?: string;
    /**
     * Calculated Statistic: Ex: 1.646
     */
    criticalTValue?: number;
    /**
     * Ex: higher
     */
    direction?: string;
    /**
     * User-Defined Variable Setting: The amount of time over which a predictor/stimulus event can exert an observable influence on an outcome variable value. For instance, aspirin (stimulus/predictor) typically decreases headache severity for approximately four hours (duration of action) following the onset delay.  Unit: Seconds
     */
    durationOfAction?: number;
    /**
     * User-Defined Variable Setting: The amount of time over which a predictor/stimulus event can exert an observable influence on an outcome variable value. For instance, aspirin (stimulus/predictor) typically decreases headache severity for approximately four hours (duration of action) following the onset delay.  Unit: Hours
     */
    durationOfActionInHours?: number;
    /**
     * Ex: 200
     */
    degreesOfFreedom?: number;
    /**
     * Ex: 145
     */
    effectNumberOfProcessedDailyMeasurements?: number;
    /**
     * Ex: optimalPearsonProduct is not defined
     */
    error?: string;
    /**
     * Ex: 193
     */
    effectChanges?: number;
    effectDataSource?: DataSource;
    /**
     * Ex: moderately positive
     */
    effectSize?: string;
    /**
     * Ex: /5
     */
    effectUnit?: string;
    /**
     * Ex: 1
     */
    effectUserVariableShareUserMeasurements?: number;
    /**
     * Ex: 1
     */
    effectVariableCategoryId?: number;
    /**
     * Ex: Emotions
     */
    effectVariableCategoryName?: string;
    /**
     * Ex: MEAN
     */
    effectVariableCombinationOperation?: string;
    /**
     * Ex: Mood_(psychology)
     */
    effectVariableCommonAlias?: string;
    /**
     * Ex: /5
     */
    effectVariableUnitAbbreviatedName?: string;
    /**
     * Ex: 10
     */
    effectVariableUnitId?: number;
    /**
     * Ex: 1 to 5 Rating
     */
    effectVariableUnitName?: string;
    /**
     * Ex: 1398
     */
    effectVariableId?: number;
    /**
     * Ex: 10
     */
    effectVariableMostCommonConnectorId?: number;
    /**
     * Ex: Overall Mood
     */
    effectVariableName: string;
    /**
     * Ex: 2014-07-30 12:50:00 UTC ISO 8601 YYYY-MM-DDThh:mm:ss
     */
    experimentEndTime?: string;
    /**
     * Ex: 2012-05-06 21:15:00 UTC ISO 8601 YYYY-MM-DDThh:mm:ss
     */
    experimentStartTime?: string;
    /**
     * Ex: 0.528359
     */
    forwardSpearmanCorrelationCoefficient?: number;
    /**
     * Ex: 298
     */
    numberOfPairs?: number;
    /**
     * Ex: 0
     */
    onsetDelay?: number;
    /**
     * Ex: 0
     */
    onsetDelayInHours?: number;
    /**
     * Ex: -86400
     */
    onsetDelayWithStrongestPearsonCorrelation?: number;
    /**
     * Ex: -24
     */
    onsetDelayWithStrongestPearsonCorrelationInHours?: number;
    /**
     * Ex: 0.68582816186982
     */
    optimalPearsonProduct?: number;
    /**
     * User-Defined Variable Setting: Ex: -1. Unit: User-specified or common.
     */
    outcomeFillingValue?: number;
    /**
     * User-Defined Variable Setting: Ex: 23. Unit: User-specified or common.
     */
    outcomeMaximumAllowedValue?: number;
    /**
     * User-Defined Variable Setting: Ex: 0.1. Unit: User-specified or common.
     */
    outcomeMinimumAllowedValue?: number;
    /**
     * Ex: 0.477
     */
    pearsonCorrelationWithNoOnsetDelay?: number;
    /**
     * Ex: 0.538
     */
    predictivePearsonCorrelation?: number;
    /**
     * Ex: 0.538
     */
    predictivePearsonCorrelationCoefficient?: number;
    /**
     * Ex: RescueTime
     */
    predictorDataSources?: string;
    /**
     * Ex: -1. Unit: User-specified or common.
     */
    predictorFillingValue?: number;
    /**
     * Ex: 200. Unit: User-specified or common.
     */
    predictorMaximumAllowedValue?: number;
    /**
     * Ex: 30. Unit: User-specified or common.
     */
    predictorMinimumAllowedValue?: number;
    /**
     * Ex: 17. Unit: User-specified or common.
     */
    predictsHighEffectChange?: number;
    /**
     * Ex: -11. Unit: User-specified or common.
     */
    predictsLowEffectChange?: number;
    /**
     * Ex: 0.39628900511586
     */
    pValue?: number;
    /**
     * Ex: 0.528
     */
    qmScore?: number;
    /**
     * Ex: 0.01377184270977
     */
    reversePearsonCorrelationCoefficient?: number;
    /**
     * Would you like to make this study publicly visible?
     */
    shareUserMeasurements?: boolean;
    /**
     * Ex: N1 Study: Sleep Quality Predicts Higher Overall Mood
     */
    sharingDescription?: string;
    /**
     * Ex: N1 Study: Sleep Quality Predicts Higher Overall Mood
     */
    sharingTitle?: string;
    /**
     * Ex: 1
     */
    significantDifference?: boolean;
    /**
     * Ex: 0.9813
     */
    statisticalSignificance?: number;
    /**
     * Ex: moderate
     */
    strengthLevel?: string;
    /**
     * Ex: 0.613
     */
    strongestPearsonCorrelationCoefficient?: number;
    studyHtml?: StudyHtml;
    studyImages?: StudyImages;
    studyLinks?: StudyLinks;
    studyText?: StudyText;
    /**
     * Ex: 9.6986079652717
     */
    tValue?: number;
    /**
     * Ex: 2017-05-06 15:40:38 UTC ISO 8601 YYYY-MM-DDThh:mm:ss
     */
    updatedAt?: string;
    /**
     * Ex: 230
     */
    userId?: number;
    /**
     * Ex: 1
     */
    userVote?: number;
    /**
     * Ex: 4.14
     */
    valuePredictingHighOutcome?: number;
    /**
     * Ex: 3.03
     */
    valuePredictingLowOutcome?: number;
    /**
     * Sources used to collect data for the outcome variable
     */
    outcomeDataSources?: string;
    /**
     * Mike Sinn
     */
    principalInvestigator?: string;
    /**
     * Correlation when cause and effect are reversed. For any causal relationship, the forward correlation should exceed the reverse correlation.
     */
    reverseCorrelation?: number;
    /**
     * Ex: 
     */
    averagePearsonCorrelationCoefficientOverOnsetDelays?: number;
    /**
     * Ex: 14764
     */
    causeNumberOfRawMeasurements?: number;
    /**
     * Correlations calculated with various duration of action hyper-parameters
     */
    correlationsOverDurationsOfAction?: Array<Correlation>;
    /**
     * Correlations calculated with various onset delay hyper-parameters
     */
    correlationsOverOnsetDelays?: Array<Correlation>;
    /**
     * Highchart config illustrating correlations calculated with various duration of action hyper-parameters
     */
    correlationsOverDurationsOfActionChartConfig?: any;
    /**
     * Highchart config illustrating correlations calculated with various onset delay hyper-parameters
     */
    correlationsOverOnsetDelaysChartConfig?: any;
    /**
     * Ex: 1
     */
    numberOfUsers?: number;
    /**
     * Ex: 1
     */
    rawCauseMeasurementSignificance?: number;
    /**
     * Ex: 1
     */
    rawEffectMeasurementSignificance?: number;
    /**
     * Ex: 1
     */
    reversePairsCount?: string;
    /**
     * Ex: 1
     */
    voteStatisticalSignificance?: number;
    /**
     * Ex: 0.011598441286655
     */
    aggregateQMScore?: number;
    /**
     * Ex: 0.0333
     */
    forwardPearsonCorrelationCoefficient?: number;
    /**
     * Ex: 6
     */
    numberOfCorrelations?: number;
    /**
     * Ex: 1 or 0
     */
    vote?: number;
}
