let expect = require('expect'), QuantiModoApi = require('../../dist/index');
  var instance;
  beforeEach(function() {
    instance = new QuantiModoApi.DefaultApi();
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
  describe('DefaultApi', function() {
    describe('deleteAggregateCorrelation', function() {
      it('should call deleteAggregateCorrelation successfully', function(done) {
        //uncomment below and update the code to test deleteAggregateCorrelation
        //instance.deleteAggregateCorrelation(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('deleteApplication', function() {
      it('should call deleteApplication successfully', function(done) {
        //uncomment below and update the code to test deleteApplication
        //instance.deleteApplication(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('deleteCollaborator', function() {
      it('should call deleteCollaborator successfully', function(done) {
        //uncomment below and update the code to test deleteCollaborator
        //instance.deleteCollaborator(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('deleteCommonTag', function() {
      it('should call deleteCommonTag successfully', function(done) {
        //uncomment below and update the code to test deleteCommonTag
        //instance.deleteCommonTag(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('deleteConnection', function() {
      it('should call deleteConnection successfully', function(done) {
        //uncomment below and update the code to test deleteConnection
        //instance.deleteConnection(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('deleteConnector', function() {
      it('should call deleteConnector successfully', function(done) {
        //uncomment below and update the code to test deleteConnector
        //instance.deleteConnector(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('deleteConnectorImport', function() {
      it('should call deleteConnectorImport successfully', function(done) {
        //uncomment below and update the code to test deleteConnectorImport
        //instance.deleteConnectorImport(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('deleteConnectorRequest', function() {
      it('should call deleteConnectorRequest successfully', function(done) {
        //uncomment below and update the code to test deleteConnectorRequest
        //instance.deleteConnectorRequest(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('deleteCorrelation', function() {
      it('should call deleteCorrelation successfully', function(done) {
        //uncomment below and update the code to test deleteCorrelation
        //instance.deleteCorrelation(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('deleteDeviceToken', function() {
      it('should call deleteDeviceToken successfully', function(done) {
        //uncomment below and update the code to test deleteDeviceToken
        //instance.deleteDeviceToken(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('deleteMeasurement', function() {
      it('should call deleteMeasurement successfully', function(done) {
        //uncomment below and update the code to test deleteMeasurement
        //instance.deleteMeasurement(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('deleteMeasurementExport', function() {
      it('should call deleteMeasurementExport successfully', function(done) {
        //uncomment below and update the code to test deleteMeasurementExport
        //instance.deleteMeasurementExport(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('deleteMeasurementImport', function() {
      it('should call deleteMeasurementImport successfully', function(done) {
        //uncomment below and update the code to test deleteMeasurementImport
        //instance.deleteMeasurementImport(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('deleteNotification', function() {
      it('should call deleteNotification successfully', function(done) {
        //uncomment below and update the code to test deleteNotification
        //instance.deleteNotification(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('deleteOAuthAccessToken', function() {
      it('should call deleteOAuthAccessToken successfully', function(done) {
        //uncomment below and update the code to test deleteOAuthAccessToken
        //instance.deleteOAuthAccessToken(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('deleteOAuthClient', function() {
      it('should call deleteOAuthClient successfully', function(done) {
        //uncomment below and update the code to test deleteOAuthClient
        //instance.deleteOAuthClient(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('deletePost', function() {
      it('should call deletePost successfully', function(done) {
        //uncomment below and update the code to test deletePost
        //instance.deletePost(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('deleteSentEmail', function() {
      it('should call deleteSentEmail successfully', function(done) {
        //uncomment below and update the code to test deleteSentEmail
        //instance.deleteSentEmail(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('deleteStudy', function() {
      it('should call deleteStudy successfully', function(done) {
        //uncomment below and update the code to test deleteStudy
        //instance.deleteStudy(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('deleteTrackingReminder', function() {
      it('should call deleteTrackingReminder successfully', function(done) {
        //uncomment below and update the code to test deleteTrackingReminder
        //instance.deleteTrackingReminder(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('deleteTrackingReminderNotification', function() {
      it('should call deleteTrackingReminderNotification successfully', function(done) {
        //uncomment below and update the code to test deleteTrackingReminderNotification
        //instance.deleteTrackingReminderNotification(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('deleteUser', function() {
      it('should call deleteUser successfully', function(done) {
        //uncomment below and update the code to test deleteUser
        //instance.deleteUser(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('deleteUserTag', function() {
      it('should call deleteUserTag successfully', function(done) {
        //uncomment below and update the code to test deleteUserTag
        //instance.deleteUserTag(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('deleteUserVariable', function() {
      it('should call deleteUserVariable successfully', function(done) {
        //uncomment below and update the code to test deleteUserVariable
        //instance.deleteUserVariable(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('deleteVariable', function() {
      it('should call deleteVariable successfully', function(done) {
        //uncomment below and update the code to test deleteVariable
        //instance.deleteVariable(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('deleteVariableCategory', function() {
      it('should call deleteVariableCategory successfully', function(done) {
        //uncomment below and update the code to test deleteVariableCategory
        //instance.deleteVariableCategory(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('deleteVariableUserSource', function() {
      it('should call deleteVariableUserSource successfully', function(done) {
        //uncomment below and update the code to test deleteVariableUserSource
        //instance.deleteVariableUserSource(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('deleteVote', function() {
      it('should call deleteVote successfully', function(done) {
        //uncomment below and update the code to test deleteVote
        //instance.deleteVote(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('getAggregateCorrelation', function() {
      it('should call getAggregateCorrelation successfully', function(done) {
        //uncomment below and update the code to test getAggregateCorrelation
        //instance.getAggregateCorrelation(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('getApplication', function() {
      it('should call getApplication successfully', function(done) {
        //uncomment below and update the code to test getApplication
        //instance.getApplication(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('getCollaborator', function() {
      it('should call getCollaborator successfully', function(done) {
        //uncomment below and update the code to test getCollaborator
        //instance.getCollaborator(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('getCommonTag', function() {
      it('should call getCommonTag successfully', function(done) {
        //uncomment below and update the code to test getCommonTag
        //instance.getCommonTag(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('getConnection', function() {
      it('should call getConnection successfully', function(done) {
        //uncomment below and update the code to test getConnection
        //instance.getConnection(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('getConnector', function() {
      it('should call getConnector successfully', function(done) {
        //uncomment below and update the code to test getConnector
        //instance.getConnector(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('getConnectorImport', function() {
      it('should call getConnectorImport successfully', function(done) {
        //uncomment below and update the code to test getConnectorImport
        //instance.getConnectorImport(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('getConnectorRequest', function() {
      it('should call getConnectorRequest successfully', function(done) {
        //uncomment below and update the code to test getConnectorRequest
        //instance.getConnectorRequest(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('getCorrelation', function() {
      it('should call getCorrelation successfully', function(done) {
        //uncomment below and update the code to test getCorrelation
        //instance.getCorrelation(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('getDeviceToken', function() {
      it('should call getDeviceToken successfully', function(done) {
        //uncomment below and update the code to test getDeviceToken
        //instance.getDeviceToken(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('getMeasurement', function() {
      it('should call getMeasurement successfully', function(done) {
        //uncomment below and update the code to test getMeasurement
        //instance.getMeasurement(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('getMeasurementExport', function() {
      it('should call getMeasurementExport successfully', function(done) {
        //uncomment below and update the code to test getMeasurementExport
        //instance.getMeasurementExport(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('getMeasurementImport', function() {
      it('should call getMeasurementImport successfully', function(done) {
        //uncomment below and update the code to test getMeasurementImport
        //instance.getMeasurementImport(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('getNotification', function() {
      it('should call getNotification successfully', function(done) {
        //uncomment below and update the code to test getNotification
        //instance.getNotification(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('getOAuthAccessToken', function() {
      it('should call getOAuthAccessToken successfully', function(done) {
        //uncomment below and update the code to test getOAuthAccessToken
        //instance.getOAuthAccessToken(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('getOAuthClient', function() {
      it('should call getOAuthClient successfully', function(done) {
        //uncomment below and update the code to test getOAuthClient
        //instance.getOAuthClient(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('getPost', function() {
      it('should call getPost successfully', function(done) {
        //uncomment below and update the code to test getPost
        //instance.getPost(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('getSentEmail', function() {
      it('should call getSentEmail successfully', function(done) {
        //uncomment below and update the code to test getSentEmail
        //instance.getSentEmail(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('getStudy', function() {
      it('should call getStudy successfully', function(done) {
        //uncomment below and update the code to test getStudy
        //instance.getStudy(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('getTrackingReminder', function() {
      it('should call getTrackingReminder successfully', function(done) {
        //uncomment below and update the code to test getTrackingReminder
        //instance.getTrackingReminder(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('getTrackingReminderNotification', function() {
      it('should call getTrackingReminderNotification successfully', function(done) {
        //uncomment below and update the code to test getTrackingReminderNotification
        //instance.getTrackingReminderNotification(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('getUser', function() {
      it('should call getUser successfully', function(done) {
        //uncomment below and update the code to test getUser
        //instance.getUser(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('getUserTag', function() {
      it('should call getUserTag successfully', function(done) {
        //uncomment below and update the code to test getUserTag
        //instance.getUserTag(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('getUserVariable', function() {
      it('should call getUserVariable successfully', function(done) {
        //uncomment below and update the code to test getUserVariable
        //instance.getUserVariable(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('getVariable', function() {
      it('should call getVariable successfully', function(done) {
        //uncomment below and update the code to test getVariable
        //instance.getVariable(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('getVariableCategory', function() {
      it('should call getVariableCategory successfully', function(done) {
        //uncomment below and update the code to test getVariableCategory
        //instance.getVariableCategory(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('getVariableUserSource', function() {
      it('should call getVariableUserSource successfully', function(done) {
        //uncomment below and update the code to test getVariableUserSource
        //instance.getVariableUserSource(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('getVote', function() {
      it('should call getVote successfully', function(done) {
        //uncomment below and update the code to test getVote
        //instance.getVote(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('listAggregateCorrelations', function() {
      it('should call listAggregateCorrelations successfully', function(done) {
        //uncomment below and update the code to test listAggregateCorrelations
        //instance.listAggregateCorrelations(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('listApplications', function() {
      it('should call listApplications successfully', function(done) {
        //uncomment below and update the code to test listApplications
        //instance.listApplications(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('listCollaborators', function() {
      it('should call listCollaborators successfully', function(done) {
        //uncomment below and update the code to test listCollaborators
        //instance.listCollaborators(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('listCommonTags', function() {
      it('should call listCommonTags successfully', function(done) {
        //uncomment below and update the code to test listCommonTags
        //instance.listCommonTags(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('listConnections', function() {
      it('should call listConnections successfully', function(done) {
        //uncomment below and update the code to test listConnections
        //instance.listConnections(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('listConnectorImports', function() {
      it('should call listConnectorImports successfully', function(done) {
        //uncomment below and update the code to test listConnectorImports
        //instance.listConnectorImports(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('listConnectorRequests', function() {
      it('should call listConnectorRequests successfully', function(done) {
        //uncomment below and update the code to test listConnectorRequests
        //instance.listConnectorRequests(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('listConnectors', function() {
      it('should call listConnectors successfully', function(done) {
        //uncomment below and update the code to test listConnectors
        //instance.listConnectors(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('listCorrelations', function() {
      it('should call listCorrelations successfully', function(done) {
        //uncomment below and update the code to test listCorrelations
        //instance.listCorrelations(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('listDeviceTokens', function() {
      it('should call listDeviceTokens successfully', function(done) {
        //uncomment below and update the code to test listDeviceTokens
        //instance.listDeviceTokens(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('listMeasurementExports', function() {
      it('should call listMeasurementExports successfully', function(done) {
        //uncomment below and update the code to test listMeasurementExports
        //instance.listMeasurementExports(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('listMeasurementImports', function() {
      it('should call listMeasurementImports successfully', function(done) {
        //uncomment below and update the code to test listMeasurementImports
        //instance.listMeasurementImports(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('listMeasurements', function() {
      it('should call listMeasurements successfully', function(done) {
        //uncomment below and update the code to test listMeasurements
        //instance.listMeasurements(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('listNotifications', function() {
      it('should call listNotifications successfully', function(done) {
        //uncomment below and update the code to test listNotifications
        //instance.listNotifications(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('listOAuthAccessTokens', function() {
      it('should call listOAuthAccessTokens successfully', function(done) {
        //uncomment below and update the code to test listOAuthAccessTokens
        //instance.listOAuthAccessTokens(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('listOAuthClients', function() {
      it('should call listOAuthClients successfully', function(done) {
        //uncomment below and update the code to test listOAuthClients
        //instance.listOAuthClients(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('listPosts', function() {
      it('should call listPosts successfully', function(done) {
        //uncomment below and update the code to test listPosts
        //instance.listPosts(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('listSentEmails', function() {
      it('should call listSentEmails successfully', function(done) {
        //uncomment below and update the code to test listSentEmails
        //instance.listSentEmails(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('listStudies', function() {
      it('should call listStudies successfully', function(done) {
        //uncomment below and update the code to test listStudies
        //instance.listStudies(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('listTrackingReminderNotifications', function() {
      it('should call listTrackingReminderNotifications successfully', function(done) {
        //uncomment below and update the code to test listTrackingReminderNotifications
        //instance.listTrackingReminderNotifications(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('listTrackingReminders', function() {
      it('should call listTrackingReminders successfully', function(done) {
        //uncomment below and update the code to test listTrackingReminders
        //instance.listTrackingReminders(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('listUserTags', function() {
      it('should call listUserTags successfully', function(done) {
        //uncomment below and update the code to test listUserTags
        //instance.listUserTags(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('listUserVariables', function() {
      it('should call listUserVariables successfully', function(done) {
        //uncomment below and update the code to test listUserVariables
        //instance.listUserVariables(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('listUsers', function() {
      it('should call listUsers successfully', function(done) {
        //uncomment below and update the code to test listUsers
        //instance.listUsers(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('listVariableCategories', function() {
      it('should call listVariableCategories successfully', function(done) {
        //uncomment below and update the code to test listVariableCategories
        //instance.listVariableCategories(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('listVariableUserSources', function() {
      it('should call listVariableUserSources successfully', function(done) {
        //uncomment below and update the code to test listVariableUserSources
        //instance.listVariableUserSources(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('listVariables', function() {
      it('should call listVariables successfully', function(done) {
        //uncomment below and update the code to test listVariables
        //instance.listVariables(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('listVotes', function() {
      it('should call listVotes successfully', function(done) {
        //uncomment below and update the code to test listVotes
        //instance.listVotes(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('storeAggregateCorrelation', function() {
      it('should call storeAggregateCorrelation successfully', function(done) {
        //uncomment below and update the code to test storeAggregateCorrelation
        //instance.storeAggregateCorrelation(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('storeApplication', function() {
      it('should call storeApplication successfully', function(done) {
        //uncomment below and update the code to test storeApplication
        //instance.storeApplication(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('storeCollaborator', function() {
      it('should call storeCollaborator successfully', function(done) {
        //uncomment below and update the code to test storeCollaborator
        //instance.storeCollaborator(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('storeCommonTag', function() {
      it('should call storeCommonTag successfully', function(done) {
        //uncomment below and update the code to test storeCommonTag
        //instance.storeCommonTag(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('storeConnection', function() {
      it('should call storeConnection successfully', function(done) {
        //uncomment below and update the code to test storeConnection
        //instance.storeConnection(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('storeConnector', function() {
      it('should call storeConnector successfully', function(done) {
        //uncomment below and update the code to test storeConnector
        //instance.storeConnector(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('storeConnectorImport', function() {
      it('should call storeConnectorImport successfully', function(done) {
        //uncomment below and update the code to test storeConnectorImport
        //instance.storeConnectorImport(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('storeConnectorRequest', function() {
      it('should call storeConnectorRequest successfully', function(done) {
        //uncomment below and update the code to test storeConnectorRequest
        //instance.storeConnectorRequest(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('storeCorrelation', function() {
      it('should call storeCorrelation successfully', function(done) {
        //uncomment below and update the code to test storeCorrelation
        //instance.storeCorrelation(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('storeDeviceToken', function() {
      it('should call storeDeviceToken successfully', function(done) {
        //uncomment below and update the code to test storeDeviceToken
        //instance.storeDeviceToken(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('storeMeasurement', function() {
      it('should call storeMeasurement successfully', function(done) {
        //uncomment below and update the code to test storeMeasurement
        //instance.storeMeasurement(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('storeMeasurementExport', function() {
      it('should call storeMeasurementExport successfully', function(done) {
        //uncomment below and update the code to test storeMeasurementExport
        //instance.storeMeasurementExport(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('storeMeasurementImport', function() {
      it('should call storeMeasurementImport successfully', function(done) {
        //uncomment below and update the code to test storeMeasurementImport
        //instance.storeMeasurementImport(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('storeNotification', function() {
      it('should call storeNotification successfully', function(done) {
        //uncomment below and update the code to test storeNotification
        //instance.storeNotification(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('storeOAuthAccessToken', function() {
      it('should call storeOAuthAccessToken successfully', function(done) {
        //uncomment below and update the code to test storeOAuthAccessToken
        //instance.storeOAuthAccessToken(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('storeOAuthClient', function() {
      it('should call storeOAuthClient successfully', function(done) {
        //uncomment below and update the code to test storeOAuthClient
        //instance.storeOAuthClient(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('storePost', function() {
      it('should call storePost successfully', function(done) {
        //uncomment below and update the code to test storePost
        //instance.storePost(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('storeSentEmail', function() {
      it('should call storeSentEmail successfully', function(done) {
        //uncomment below and update the code to test storeSentEmail
        //instance.storeSentEmail(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('storeStudy', function() {
      it('should call storeStudy successfully', function(done) {
        //uncomment below and update the code to test storeStudy
        //instance.storeStudy(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('storeTrackingReminder', function() {
      it('should call storeTrackingReminder successfully', function(done) {
        //uncomment below and update the code to test storeTrackingReminder
        //instance.storeTrackingReminder(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('storeTrackingReminderNotification', function() {
      it('should call storeTrackingReminderNotification successfully', function(done) {
        //uncomment below and update the code to test storeTrackingReminderNotification
        //instance.storeTrackingReminderNotification(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('storeUser', function() {
      it('should call storeUser successfully', function(done) {
        //uncomment below and update the code to test storeUser
        //instance.storeUser(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('storeUserTag', function() {
      it('should call storeUserTag successfully', function(done) {
        //uncomment below and update the code to test storeUserTag
        //instance.storeUserTag(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('storeUserVariable', function() {
      it('should call storeUserVariable successfully', function(done) {
        //uncomment below and update the code to test storeUserVariable
        //instance.storeUserVariable(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('storeVariable', function() {
      it('should call storeVariable successfully', function(done) {
        //uncomment below and update the code to test storeVariable
        //instance.storeVariable(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('storeVariableCategory', function() {
      it('should call storeVariableCategory successfully', function(done) {
        //uncomment below and update the code to test storeVariableCategory
        //instance.storeVariableCategory(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('storeVariableUserSource', function() {
      it('should call storeVariableUserSource successfully', function(done) {
        //uncomment below and update the code to test storeVariableUserSource
        //instance.storeVariableUserSource(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('storeVote', function() {
      it('should call storeVote successfully', function(done) {
        //uncomment below and update the code to test storeVote
        //instance.storeVote(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('updateAggregateCorrelation', function() {
      it('should call updateAggregateCorrelation successfully', function(done) {
        //uncomment below and update the code to test updateAggregateCorrelation
        //instance.updateAggregateCorrelation(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('updateApplication', function() {
      it('should call updateApplication successfully', function(done) {
        //uncomment below and update the code to test updateApplication
        //instance.updateApplication(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('updateCollaborator', function() {
      it('should call updateCollaborator successfully', function(done) {
        //uncomment below and update the code to test updateCollaborator
        //instance.updateCollaborator(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('updateCommonTag', function() {
      it('should call updateCommonTag successfully', function(done) {
        //uncomment below and update the code to test updateCommonTag
        //instance.updateCommonTag(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('updateConnection', function() {
      it('should call updateConnection successfully', function(done) {
        //uncomment below and update the code to test updateConnection
        //instance.updateConnection(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('updateConnector', function() {
      it('should call updateConnector successfully', function(done) {
        //uncomment below and update the code to test updateConnector
        //instance.updateConnector(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('updateConnectorImport', function() {
      it('should call updateConnectorImport successfully', function(done) {
        //uncomment below and update the code to test updateConnectorImport
        //instance.updateConnectorImport(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('updateConnectorRequest', function() {
      it('should call updateConnectorRequest successfully', function(done) {
        //uncomment below and update the code to test updateConnectorRequest
        //instance.updateConnectorRequest(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('updateCorrelation', function() {
      it('should call updateCorrelation successfully', function(done) {
        //uncomment below and update the code to test updateCorrelation
        //instance.updateCorrelation(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('updateDeviceToken', function() {
      it('should call updateDeviceToken successfully', function(done) {
        //uncomment below and update the code to test updateDeviceToken
        //instance.updateDeviceToken(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('updateMeasurement', function() {
      it('should call updateMeasurement successfully', function(done) {
        //uncomment below and update the code to test updateMeasurement
        //instance.updateMeasurement(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('updateMeasurementExport', function() {
      it('should call updateMeasurementExport successfully', function(done) {
        //uncomment below and update the code to test updateMeasurementExport
        //instance.updateMeasurementExport(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('updateMeasurementImport', function() {
      it('should call updateMeasurementImport successfully', function(done) {
        //uncomment below and update the code to test updateMeasurementImport
        //instance.updateMeasurementImport(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('updateNotification', function() {
      it('should call updateNotification successfully', function(done) {
        //uncomment below and update the code to test updateNotification
        //instance.updateNotification(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('updateOAuthAccessToken', function() {
      it('should call updateOAuthAccessToken successfully', function(done) {
        //uncomment below and update the code to test updateOAuthAccessToken
        //instance.updateOAuthAccessToken(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('updateOAuthClient', function() {
      it('should call updateOAuthClient successfully', function(done) {
        //uncomment below and update the code to test updateOAuthClient
        //instance.updateOAuthClient(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('updatePost', function() {
      it('should call updatePost successfully', function(done) {
        //uncomment below and update the code to test updatePost
        //instance.updatePost(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('updateSentEmail', function() {
      it('should call updateSentEmail successfully', function(done) {
        //uncomment below and update the code to test updateSentEmail
        //instance.updateSentEmail(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('updateStudy', function() {
      it('should call updateStudy successfully', function(done) {
        //uncomment below and update the code to test updateStudy
        //instance.updateStudy(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('updateTrackingReminder', function() {
      it('should call updateTrackingReminder successfully', function(done) {
        //uncomment below and update the code to test updateTrackingReminder
        //instance.updateTrackingReminder(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('updateTrackingReminderNotification', function() {
      it('should call updateTrackingReminderNotification successfully', function(done) {
        //uncomment below and update the code to test updateTrackingReminderNotification
        //instance.updateTrackingReminderNotification(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('updateUser', function() {
      it('should call updateUser successfully', function(done) {
        //uncomment below and update the code to test updateUser
        //instance.updateUser(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('updateUserTag', function() {
      it('should call updateUserTag successfully', function(done) {
        //uncomment below and update the code to test updateUserTag
        //instance.updateUserTag(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('updateUserVariable', function() {
      it('should call updateUserVariable successfully', function(done) {
        //uncomment below and update the code to test updateUserVariable
        //instance.updateUserVariable(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('updateVariable', function() {
      it('should call updateVariable successfully', function(done) {
        //uncomment below and update the code to test updateVariable
        //instance.updateVariable(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('updateVariableCategory', function() {
      it('should call updateVariableCategory successfully', function(done) {
        //uncomment below and update the code to test updateVariableCategory
        //instance.updateVariableCategory(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('updateVariableUserSource', function() {
      it('should call updateVariableUserSource successfully', function(done) {
        //uncomment below and update the code to test updateVariableUserSource
        //instance.updateVariableUserSource(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('updateVote', function() {
      it('should call updateVote successfully', function(done) {
        //uncomment below and update the code to test updateVote
        //instance.updateVote(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
  });