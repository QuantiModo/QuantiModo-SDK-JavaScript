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

(function(factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/CommonResponse', 'model/Connection', 'model/Connector', 'model/ConnectorInfo', 'model/ConnectorInfoHistoryItem', 'model/ConnectorInstruction', 'model/ConversionStep', 'model/Correlation', 'model/HumanTime', 'model/InlineResponse200', 'model/InlineResponse2001', 'model/InlineResponse2002', 'model/JsonErrorResponse', 'model/Measurement', 'model/MeasurementDelete', 'model/MeasurementRange', 'model/MeasurementSet', 'model/MeasurementSource', 'model/MeasurementUpdate', 'model/Pairs', 'model/Permission', 'model/PostCorrelation', 'model/PostVote', 'model/TrackingReminder', 'model/TrackingReminderDelete', 'model/TrackingReminderNotification', 'model/TrackingReminderNotificationSkip', 'model/TrackingReminderNotificationSnooze', 'model/TrackingReminderNotificationTrack', 'model/Unit', 'model/UnitCategory', 'model/Update', 'model/User', 'model/UserTag', 'model/UserTokenFailedResponse', 'model/UserTokenRequest', 'model/UserTokenRequestInnerUserField', 'model/UserTokenSuccessfulResponse', 'model/UserTokenSuccessfulResponseInnerUserField', 'model/UserVariable', 'model/UserVariableDelete', 'model/UserVariableRelationship', 'model/UserVariables', 'model/ValueObject', 'model/Variable', 'model/VariableCategory', 'model/VariableNew', 'model/VariablesNew', 'model/Vote', 'model/VoteDelete', 'api/AuthenticationApi', 'api/ConnectorsApi', 'api/CorrelationsApi', 'api/MeasurementsApi', 'api/OrganizationsApi', 'api/PairsApi', 'api/RemindersApi', 'api/TagsApi', 'api/UnitsApi', 'api/UserApi', 'api/VariablesApi', 'api/VotesApi'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('./ApiClient'), require('./model/CommonResponse'), require('./model/Connection'), require('./model/Connector'), require('./model/ConnectorInfo'), require('./model/ConnectorInfoHistoryItem'), require('./model/ConnectorInstruction'), require('./model/ConversionStep'), require('./model/Correlation'), require('./model/HumanTime'), require('./model/InlineResponse200'), require('./model/InlineResponse2001'), require('./model/InlineResponse2002'), require('./model/JsonErrorResponse'), require('./model/Measurement'), require('./model/MeasurementDelete'), require('./model/MeasurementRange'), require('./model/MeasurementSet'), require('./model/MeasurementSource'), require('./model/MeasurementUpdate'), require('./model/Pairs'), require('./model/Permission'), require('./model/PostCorrelation'), require('./model/PostVote'), require('./model/TrackingReminder'), require('./model/TrackingReminderDelete'), require('./model/TrackingReminderNotification'), require('./model/TrackingReminderNotificationSkip'), require('./model/TrackingReminderNotificationSnooze'), require('./model/TrackingReminderNotificationTrack'), require('./model/Unit'), require('./model/UnitCategory'), require('./model/Update'), require('./model/User'), require('./model/UserTag'), require('./model/UserTokenFailedResponse'), require('./model/UserTokenRequest'), require('./model/UserTokenRequestInnerUserField'), require('./model/UserTokenSuccessfulResponse'), require('./model/UserTokenSuccessfulResponseInnerUserField'), require('./model/UserVariable'), require('./model/UserVariableDelete'), require('./model/UserVariableRelationship'), require('./model/UserVariables'), require('./model/ValueObject'), require('./model/Variable'), require('./model/VariableCategory'), require('./model/VariableNew'), require('./model/VariablesNew'), require('./model/Vote'), require('./model/VoteDelete'), require('./api/AuthenticationApi'), require('./api/ConnectorsApi'), require('./api/CorrelationsApi'), require('./api/MeasurementsApi'), require('./api/OrganizationsApi'), require('./api/PairsApi'), require('./api/RemindersApi'), require('./api/TagsApi'), require('./api/UnitsApi'), require('./api/UserApi'), require('./api/VariablesApi'), require('./api/VotesApi'));
  }
}(function(ApiClient, CommonResponse, Connection, Connector, ConnectorInfo, ConnectorInfoHistoryItem, ConnectorInstruction, ConversionStep, Correlation, HumanTime, InlineResponse200, InlineResponse2001, InlineResponse2002, JsonErrorResponse, Measurement, MeasurementDelete, MeasurementRange, MeasurementSet, MeasurementSource, MeasurementUpdate, Pairs, Permission, PostCorrelation, PostVote, TrackingReminder, TrackingReminderDelete, TrackingReminderNotification, TrackingReminderNotificationSkip, TrackingReminderNotificationSnooze, TrackingReminderNotificationTrack, Unit, UnitCategory, Update, User, UserTag, UserTokenFailedResponse, UserTokenRequest, UserTokenRequestInnerUserField, UserTokenSuccessfulResponse, UserTokenSuccessfulResponseInnerUserField, UserVariable, UserVariableDelete, UserVariableRelationship, UserVariables, ValueObject, Variable, VariableCategory, VariableNew, VariablesNew, Vote, VoteDelete, AuthenticationApi, ConnectorsApi, CorrelationsApi, MeasurementsApi, OrganizationsApi, PairsApi, RemindersApi, TagsApi, UnitsApi, UserApi, VariablesApi, VotesApi) {
  'use strict';

  /**
   * QuantiModo_makes_it_easy_to_retrieve_normalized_user_data_from_a_wide_array_of_devices_and_applications___Learn_about_QuantiModo_httpsquantimo_do_check_out_our__docs_httpsgithub_comQuantiMododocs_or_contact_us_at__help_quantimo_do_httpshelp_quantimo_do_.<br>
   * The <code>index</code> module provides access to constructors for all the classes which comprise the public API.
   * <p>
   * An AMD (recommended!) or CommonJS application will generally do something equivalent to the following:
   * <pre>
   * var QuantiModo = require('index'); // See note below*.
   * var xxxSvc = new QuantiModo.XxxApi(); // Allocate the API class we're going to use.
   * var yyyModel = new QuantiModo.Yyy(); // Construct a model instance.
   * yyyModel.someProperty = 'someValue';
   * ...
   * var zzz = xxxSvc.doSomething(yyyModel); // Invoke the service.
   * ...
   * </pre>
   * <em>*NOTE: For a top-level AMD script, use require(['index'], function(){...})
   * and put the application logic within the callback function.</em>
   * </p>
   * <p>
   * A non-AMD browser application (discouraged) might do something like this:
   * <pre>
   * var xxxSvc = new QuantiModo.XxxApi(); // Allocate the API class we're going to use.
   * var yyy = new QuantiModo.Yyy(); // Construct a model instance.
   * yyyModel.someProperty = 'someValue';
   * ...
   * var zzz = xxxSvc.doSomething(yyyModel); // Invoke the service.
   * ...
   * </pre>
   * </p>
   * @module index
   * @version 2.0
   */
  var exports = {
    /**
     * The ApiClient constructor.
     * @property {module:ApiClient}
     */
    ApiClient: ApiClient,
    /**
     * The CommonResponse model constructor.
     * @property {module:model/CommonResponse}
     */
    CommonResponse: CommonResponse,
    /**
     * The Connection model constructor.
     * @property {module:model/Connection}
     */
    Connection: Connection,
    /**
     * The Connector model constructor.
     * @property {module:model/Connector}
     */
    Connector: Connector,
    /**
     * The ConnectorInfo model constructor.
     * @property {module:model/ConnectorInfo}
     */
    ConnectorInfo: ConnectorInfo,
    /**
     * The ConnectorInfoHistoryItem model constructor.
     * @property {module:model/ConnectorInfoHistoryItem}
     */
    ConnectorInfoHistoryItem: ConnectorInfoHistoryItem,
    /**
     * The ConnectorInstruction model constructor.
     * @property {module:model/ConnectorInstruction}
     */
    ConnectorInstruction: ConnectorInstruction,
    /**
     * The ConversionStep model constructor.
     * @property {module:model/ConversionStep}
     */
    ConversionStep: ConversionStep,
    /**
     * The Correlation model constructor.
     * @property {module:model/Correlation}
     */
    Correlation: Correlation,
    /**
     * The HumanTime model constructor.
     * @property {module:model/HumanTime}
     */
    HumanTime: HumanTime,
    /**
     * The InlineResponse200 model constructor.
     * @property {module:model/InlineResponse200}
     */
    InlineResponse200: InlineResponse200,
    /**
     * The InlineResponse2001 model constructor.
     * @property {module:model/InlineResponse2001}
     */
    InlineResponse2001: InlineResponse2001,
    /**
     * The InlineResponse2002 model constructor.
     * @property {module:model/InlineResponse2002}
     */
    InlineResponse2002: InlineResponse2002,
    /**
     * The JsonErrorResponse model constructor.
     * @property {module:model/JsonErrorResponse}
     */
    JsonErrorResponse: JsonErrorResponse,
    /**
     * The Measurement model constructor.
     * @property {module:model/Measurement}
     */
    Measurement: Measurement,
    /**
     * The MeasurementDelete model constructor.
     * @property {module:model/MeasurementDelete}
     */
    MeasurementDelete: MeasurementDelete,
    /**
     * The MeasurementRange model constructor.
     * @property {module:model/MeasurementRange}
     */
    MeasurementRange: MeasurementRange,
    /**
     * The MeasurementSet model constructor.
     * @property {module:model/MeasurementSet}
     */
    MeasurementSet: MeasurementSet,
    /**
     * The MeasurementSource model constructor.
     * @property {module:model/MeasurementSource}
     */
    MeasurementSource: MeasurementSource,
    /**
     * The MeasurementUpdate model constructor.
     * @property {module:model/MeasurementUpdate}
     */
    MeasurementUpdate: MeasurementUpdate,
    /**
     * The Pairs model constructor.
     * @property {module:model/Pairs}
     */
    Pairs: Pairs,
    /**
     * The Permission model constructor.
     * @property {module:model/Permission}
     */
    Permission: Permission,
    /**
     * The PostCorrelation model constructor.
     * @property {module:model/PostCorrelation}
     */
    PostCorrelation: PostCorrelation,
    /**
     * The PostVote model constructor.
     * @property {module:model/PostVote}
     */
    PostVote: PostVote,
    /**
     * The TrackingReminder model constructor.
     * @property {module:model/TrackingReminder}
     */
    TrackingReminder: TrackingReminder,
    /**
     * The TrackingReminderDelete model constructor.
     * @property {module:model/TrackingReminderDelete}
     */
    TrackingReminderDelete: TrackingReminderDelete,
    /**
     * The TrackingReminderNotification model constructor.
     * @property {module:model/TrackingReminderNotification}
     */
    TrackingReminderNotification: TrackingReminderNotification,
    /**
     * The TrackingReminderNotificationSkip model constructor.
     * @property {module:model/TrackingReminderNotificationSkip}
     */
    TrackingReminderNotificationSkip: TrackingReminderNotificationSkip,
    /**
     * The TrackingReminderNotificationSnooze model constructor.
     * @property {module:model/TrackingReminderNotificationSnooze}
     */
    TrackingReminderNotificationSnooze: TrackingReminderNotificationSnooze,
    /**
     * The TrackingReminderNotificationTrack model constructor.
     * @property {module:model/TrackingReminderNotificationTrack}
     */
    TrackingReminderNotificationTrack: TrackingReminderNotificationTrack,
    /**
     * The Unit model constructor.
     * @property {module:model/Unit}
     */
    Unit: Unit,
    /**
     * The UnitCategory model constructor.
     * @property {module:model/UnitCategory}
     */
    UnitCategory: UnitCategory,
    /**
     * The Update model constructor.
     * @property {module:model/Update}
     */
    Update: Update,
    /**
     * The User model constructor.
     * @property {module:model/User}
     */
    User: User,
    /**
     * The UserTag model constructor.
     * @property {module:model/UserTag}
     */
    UserTag: UserTag,
    /**
     * The UserTokenFailedResponse model constructor.
     * @property {module:model/UserTokenFailedResponse}
     */
    UserTokenFailedResponse: UserTokenFailedResponse,
    /**
     * The UserTokenRequest model constructor.
     * @property {module:model/UserTokenRequest}
     */
    UserTokenRequest: UserTokenRequest,
    /**
     * The UserTokenRequestInnerUserField model constructor.
     * @property {module:model/UserTokenRequestInnerUserField}
     */
    UserTokenRequestInnerUserField: UserTokenRequestInnerUserField,
    /**
     * The UserTokenSuccessfulResponse model constructor.
     * @property {module:model/UserTokenSuccessfulResponse}
     */
    UserTokenSuccessfulResponse: UserTokenSuccessfulResponse,
    /**
     * The UserTokenSuccessfulResponseInnerUserField model constructor.
     * @property {module:model/UserTokenSuccessfulResponseInnerUserField}
     */
    UserTokenSuccessfulResponseInnerUserField: UserTokenSuccessfulResponseInnerUserField,
    /**
     * The UserVariable model constructor.
     * @property {module:model/UserVariable}
     */
    UserVariable: UserVariable,
    /**
     * The UserVariableDelete model constructor.
     * @property {module:model/UserVariableDelete}
     */
    UserVariableDelete: UserVariableDelete,
    /**
     * The UserVariableRelationship model constructor.
     * @property {module:model/UserVariableRelationship}
     */
    UserVariableRelationship: UserVariableRelationship,
    /**
     * The UserVariables model constructor.
     * @property {module:model/UserVariables}
     */
    UserVariables: UserVariables,
    /**
     * The ValueObject model constructor.
     * @property {module:model/ValueObject}
     */
    ValueObject: ValueObject,
    /**
     * The Variable model constructor.
     * @property {module:model/Variable}
     */
    Variable: Variable,
    /**
     * The VariableCategory model constructor.
     * @property {module:model/VariableCategory}
     */
    VariableCategory: VariableCategory,
    /**
     * The VariableNew model constructor.
     * @property {module:model/VariableNew}
     */
    VariableNew: VariableNew,
    /**
     * The VariablesNew model constructor.
     * @property {module:model/VariablesNew}
     */
    VariablesNew: VariablesNew,
    /**
     * The Vote model constructor.
     * @property {module:model/Vote}
     */
    Vote: Vote,
    /**
     * The VoteDelete model constructor.
     * @property {module:model/VoteDelete}
     */
    VoteDelete: VoteDelete,
    /**
     * The AuthenticationApi service constructor.
     * @property {module:api/AuthenticationApi}
     */
    AuthenticationApi: AuthenticationApi,
    /**
     * The ConnectorsApi service constructor.
     * @property {module:api/ConnectorsApi}
     */
    ConnectorsApi: ConnectorsApi,
    /**
     * The CorrelationsApi service constructor.
     * @property {module:api/CorrelationsApi}
     */
    CorrelationsApi: CorrelationsApi,
    /**
     * The MeasurementsApi service constructor.
     * @property {module:api/MeasurementsApi}
     */
    MeasurementsApi: MeasurementsApi,
    /**
     * The OrganizationsApi service constructor.
     * @property {module:api/OrganizationsApi}
     */
    OrganizationsApi: OrganizationsApi,
    /**
     * The PairsApi service constructor.
     * @property {module:api/PairsApi}
     */
    PairsApi: PairsApi,
    /**
     * The RemindersApi service constructor.
     * @property {module:api/RemindersApi}
     */
    RemindersApi: RemindersApi,
    /**
     * The TagsApi service constructor.
     * @property {module:api/TagsApi}
     */
    TagsApi: TagsApi,
    /**
     * The UnitsApi service constructor.
     * @property {module:api/UnitsApi}
     */
    UnitsApi: UnitsApi,
    /**
     * The UserApi service constructor.
     * @property {module:api/UserApi}
     */
    UserApi: UserApi,
    /**
     * The VariablesApi service constructor.
     * @property {module:api/VariablesApi}
     */
    VariablesApi: VariablesApi,
    /**
     * The VotesApi service constructor.
     * @property {module:api/VotesApi}
     */
    VotesApi: VotesApi
  };

  return exports;
}));
