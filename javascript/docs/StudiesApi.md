# quantimodo-api.StudiesApi

All URIs are relative to *https://app.quantimo.do/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**createStudy**](StudiesApi.md#createStudy) | **POST** /v3/study/create | Create a Cohort Study
[**deleteVote**](StudiesApi.md#deleteVote) | **DELETE** /v3/votes/delete | Delete vote
[**getOpenStudies**](StudiesApi.md#getOpenStudies) | **GET** /v3/studies/open | These are open studies that anyone can join
[**getStudiesCreated**](StudiesApi.md#getStudiesCreated) | **GET** /v3/studies/created | Get cohort studies you have created
[**getStudiesJoined**](StudiesApi.md#getStudiesJoined) | **GET** /v3/studies/joined | Studies You Have Joined
[**getStudy**](StudiesApi.md#getStudy) | **GET** /v4/study | Get Study
[**joinStudy**](StudiesApi.md#joinStudy) | **POST** /v3/study/join | Join a Study
[**postVote**](StudiesApi.md#postVote) | **POST** /v3/votes | Post or update vote
[**publishStudy**](StudiesApi.md#publishStudy) | **POST** /v3/study/publish | Publish Your Study


<a name="createStudy"></a>
# **createStudy**
> PostStudyCreateResponse createStudy(opts)

Create a Cohort Study

Create a cohort study examining the relationship between a predictor and outcome variable. You will be given a study id which you can invite participants to join and share their measurements for the specified variables.

### Example
```javascript
import quantimodo-api from 'quantimodo-api';

let apiInstance = new quantimodo-api.StudiesApi();

let opts = { 
  'causeVariableName': "causeVariableName_example", // String | Name of the hypothetical predictor variable.  Ex: Sleep Duration
  'effectVariableName': "effectVariableName_example", // String | Name of the hypothetical outcome variable.  Ex: Overall Mood
  'clientId': "clientId_example", // String | Your QuantiModo client id can be obtained by creating an app at https://builder.quantimo.do
  'platform': "platform_example", // String | Ex: chrome, android, ios, web
};

apiInstance.createStudy(opts, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **causeVariableName** | **String**| Name of the hypothetical predictor variable.  Ex: Sleep Duration | [optional] 
 **effectVariableName** | **String**| Name of the hypothetical outcome variable.  Ex: Overall Mood | [optional] 
 **clientId** | **String**| Your QuantiModo client id can be obtained by creating an app at https://builder.quantimo.do | [optional] 
 **platform** | **String**| Ex: chrome, android, ios, web | [optional] 

### Return type

[**PostStudyCreateResponse**](PostStudyCreateResponse.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="deleteVote"></a>
# **deleteVote**
> CommonResponse deleteVote(body, opts)

Delete vote

Delete previously posted vote

### Example
```javascript
import quantimodo-api from 'quantimodo-api';
let defaultClient = quantimodo-api.ApiClient.instance;

// Configure API key authorization: access_token
let access_token = defaultClient.authentications['access_token'];
access_token.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//access_token.apiKeyPrefix = 'Token';

// Configure OAuth2 access token for authorization: quantimodo_oauth2
let quantimodo_oauth2 = defaultClient.authentications['quantimodo_oauth2'];
quantimodo_oauth2.accessToken = 'YOUR ACCESS TOKEN';

let apiInstance = new quantimodo-api.StudiesApi();

let body = new quantimodo-api.VoteDelete(); // VoteDelete | The cause and effect variable names for the predictor vote to be deleted.

let opts = { 
  'userId': 8.14, // Number | User's id
};

apiInstance.deleteVote(body, opts, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | [**VoteDelete**](VoteDelete.md)| The cause and effect variable names for the predictor vote to be deleted. | 
 **userId** | **Number**| User&#39;s id | [optional] 

### Return type

[**CommonResponse**](CommonResponse.md)

### Authorization

[access_token](../README.md#access_token), [quantimodo_oauth2](../README.md#quantimodo_oauth2)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="getOpenStudies"></a>
# **getOpenStudies**
> GetStudiesResponse getOpenStudies(opts)

These are open studies that anyone can join

These are studies that anyone can join and share their data for the predictor and outcome variables of interest.

### Example
```javascript
import quantimodo-api from 'quantimodo-api';
let defaultClient = quantimodo-api.ApiClient.instance;

// Configure API key authorization: access_token
let access_token = defaultClient.authentications['access_token'];
access_token.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//access_token.apiKeyPrefix = 'Token';

// Configure OAuth2 access token for authorization: quantimodo_oauth2
let quantimodo_oauth2 = defaultClient.authentications['quantimodo_oauth2'];
quantimodo_oauth2.accessToken = 'YOUR ACCESS TOKEN';

let apiInstance = new quantimodo-api.StudiesApi();

let opts = { 
  'causeVariableName': "causeVariableName_example", // String | Name of the hypothetical predictor variable.  Ex: Sleep Duration
  'effectVariableName': "effectVariableName_example", // String | Name of the hypothetical outcome variable.  Ex: Overall Mood
  'userId': 8.14, // Number | User's id
  'clientId': "clientId_example", // String | Your QuantiModo client id can be obtained by creating an app at https://builder.quantimo.do
  'includeCharts': true, // Boolean | Highcharts configs that can be used if you have highcharts.js included on the page.  This only works if the id or name query parameter is also provided.
  'platform': "platform_example", // String | Ex: chrome, android, ios, web
  'recalculate': true, // Boolean | Recalculate instead of using cached analysis
  'studyId': "studyId_example" // String | Client id for the cohort study you want
};

apiInstance.getOpenStudies(opts, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **causeVariableName** | **String**| Name of the hypothetical predictor variable.  Ex: Sleep Duration | [optional] 
 **effectVariableName** | **String**| Name of the hypothetical outcome variable.  Ex: Overall Mood | [optional] 
 **userId** | **Number**| User&#39;s id | [optional] 
 **clientId** | **String**| Your QuantiModo client id can be obtained by creating an app at https://builder.quantimo.do | [optional] 
 **includeCharts** | **Boolean**| Highcharts configs that can be used if you have highcharts.js included on the page.  This only works if the id or name query parameter is also provided. | [optional] 
 **platform** | **String**| Ex: chrome, android, ios, web | [optional] 
 **recalculate** | **Boolean**| Recalculate instead of using cached analysis | [optional] 
 **studyId** | **String**| Client id for the cohort study you want | [optional] 

### Return type

[**GetStudiesResponse**](GetStudiesResponse.md)

### Authorization

[access_token](../README.md#access_token), [quantimodo_oauth2](../README.md#quantimodo_oauth2)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="getStudiesCreated"></a>
# **getStudiesCreated**
> GetStudiesResponse getStudiesCreated(opts)

Get cohort studies you have created

These are cohort studies that you have created.

### Example
```javascript
import quantimodo-api from 'quantimodo-api';
let defaultClient = quantimodo-api.ApiClient.instance;

// Configure API key authorization: access_token
let access_token = defaultClient.authentications['access_token'];
access_token.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//access_token.apiKeyPrefix = 'Token';

// Configure OAuth2 access token for authorization: quantimodo_oauth2
let quantimodo_oauth2 = defaultClient.authentications['quantimodo_oauth2'];
quantimodo_oauth2.accessToken = 'YOUR ACCESS TOKEN';

let apiInstance = new quantimodo-api.StudiesApi();

let opts = { 
  'causeVariableName': "causeVariableName_example", // String | Name of the hypothetical predictor variable.  Ex: Sleep Duration
  'effectVariableName': "effectVariableName_example", // String | Name of the hypothetical outcome variable.  Ex: Overall Mood
  'sort': "sort_example", // String | Sort by one of the listed field names. If the field name is prefixed with `-`, it will sort in descending order.
  'limit': 100, // Number | The LIMIT is used to limit the number of results returned. So if youhave 1000 results, but only want to the first 10, you would set this to 10 and offset to 0. The maximum limit is 200 records.
  'offset': 56, // Number | OFFSET says to skip that many rows before beginning to return rows to the client. OFFSET 0 is the same as omitting the OFFSET clause.If both OFFSET and LIMIT appear, then OFFSET rows are skipped before starting to count the LIMIT rows that are returned.
  'userId': 8.14, // Number | User's id
  'updatedAt': "updatedAt_example", // String | When the record was last updated. Use UTC ISO 8601 YYYY-MM-DDThh:mm:ss datetime format. Time zone should be UTC and not local.
  'clientId': "clientId_example", // String | Your QuantiModo client id can be obtained by creating an app at https://builder.quantimo.do
  'platform': "platform_example", // String | Ex: chrome, android, ios, web
};

apiInstance.getStudiesCreated(opts, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **causeVariableName** | **String**| Name of the hypothetical predictor variable.  Ex: Sleep Duration | [optional] 
 **effectVariableName** | **String**| Name of the hypothetical outcome variable.  Ex: Overall Mood | [optional] 
 **sort** | **String**| Sort by one of the listed field names. If the field name is prefixed with &#x60;-&#x60;, it will sort in descending order. | [optional] 
 **limit** | **Number**| The LIMIT is used to limit the number of results returned. So if youhave 1000 results, but only want to the first 10, you would set this to 10 and offset to 0. The maximum limit is 200 records. | [optional] [default to 100]
 **offset** | **Number**| OFFSET says to skip that many rows before beginning to return rows to the client. OFFSET 0 is the same as omitting the OFFSET clause.If both OFFSET and LIMIT appear, then OFFSET rows are skipped before starting to count the LIMIT rows that are returned. | [optional] 
 **userId** | **Number**| User&#39;s id | [optional] 
 **updatedAt** | **String**| When the record was last updated. Use UTC ISO 8601 YYYY-MM-DDThh:mm:ss datetime format. Time zone should be UTC and not local. | [optional] 
 **clientId** | **String**| Your QuantiModo client id can be obtained by creating an app at https://builder.quantimo.do | [optional] 
 **platform** | **String**| Ex: chrome, android, ios, web | [optional] 

### Return type

[**GetStudiesResponse**](GetStudiesResponse.md)

### Authorization

[access_token](../README.md#access_token), [quantimodo_oauth2](../README.md#quantimodo_oauth2)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="getStudiesJoined"></a>
# **getStudiesJoined**
> GetStudiesResponse getStudiesJoined(opts)

Studies You Have Joined

These are studies that you are currently sharing your data with.

### Example
```javascript
import quantimodo-api from 'quantimodo-api';
let defaultClient = quantimodo-api.ApiClient.instance;

// Configure API key authorization: access_token
let access_token = defaultClient.authentications['access_token'];
access_token.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//access_token.apiKeyPrefix = 'Token';

// Configure OAuth2 access token for authorization: quantimodo_oauth2
let quantimodo_oauth2 = defaultClient.authentications['quantimodo_oauth2'];
quantimodo_oauth2.accessToken = 'YOUR ACCESS TOKEN';

let apiInstance = new quantimodo-api.StudiesApi();

let opts = { 
  'causeVariableName': "causeVariableName_example", // String | Name of the hypothetical predictor variable.  Ex: Sleep Duration
  'effectVariableName': "effectVariableName_example", // String | Name of the hypothetical outcome variable.  Ex: Overall Mood
  'sort': "sort_example", // String | Sort by one of the listed field names. If the field name is prefixed with `-`, it will sort in descending order.
  'limit': 100, // Number | The LIMIT is used to limit the number of results returned. So if youhave 1000 results, but only want to the first 10, you would set this to 10 and offset to 0. The maximum limit is 200 records.
  'offset': 56, // Number | OFFSET says to skip that many rows before beginning to return rows to the client. OFFSET 0 is the same as omitting the OFFSET clause.If both OFFSET and LIMIT appear, then OFFSET rows are skipped before starting to count the LIMIT rows that are returned.
  'userId': 8.14, // Number | User's id
  'correlationCoefficient': "correlationCoefficient_example", // String | Pearson correlation coefficient between cause and effect after lagging by onset delay and grouping by duration of action
  'updatedAt': "updatedAt_example", // String | When the record was last updated. Use UTC ISO 8601 YYYY-MM-DDThh:mm:ss datetime format. Time zone should be UTC and not local.
  'outcomesOfInterest': true, // Boolean | Only include correlations for which the effect is an outcome of interest for the user
  'clientId': "clientId_example", // String | Your QuantiModo client id can be obtained by creating an app at https://builder.quantimo.do
  'platform': "platform_example", // String | Ex: chrome, android, ios, web
};

apiInstance.getStudiesJoined(opts, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **causeVariableName** | **String**| Name of the hypothetical predictor variable.  Ex: Sleep Duration | [optional] 
 **effectVariableName** | **String**| Name of the hypothetical outcome variable.  Ex: Overall Mood | [optional] 
 **sort** | **String**| Sort by one of the listed field names. If the field name is prefixed with &#x60;-&#x60;, it will sort in descending order. | [optional] 
 **limit** | **Number**| The LIMIT is used to limit the number of results returned. So if youhave 1000 results, but only want to the first 10, you would set this to 10 and offset to 0. The maximum limit is 200 records. | [optional] [default to 100]
 **offset** | **Number**| OFFSET says to skip that many rows before beginning to return rows to the client. OFFSET 0 is the same as omitting the OFFSET clause.If both OFFSET and LIMIT appear, then OFFSET rows are skipped before starting to count the LIMIT rows that are returned. | [optional] 
 **userId** | **Number**| User&#39;s id | [optional] 
 **correlationCoefficient** | **String**| Pearson correlation coefficient between cause and effect after lagging by onset delay and grouping by duration of action | [optional] 
 **updatedAt** | **String**| When the record was last updated. Use UTC ISO 8601 YYYY-MM-DDThh:mm:ss datetime format. Time zone should be UTC and not local. | [optional] 
 **outcomesOfInterest** | **Boolean**| Only include correlations for which the effect is an outcome of interest for the user | [optional] 
 **clientId** | **String**| Your QuantiModo client id can be obtained by creating an app at https://builder.quantimo.do | [optional] 
 **platform** | **String**| Ex: chrome, android, ios, web | [optional] 

### Return type

[**GetStudiesResponse**](GetStudiesResponse.md)

### Authorization

[access_token](../README.md#access_token), [quantimodo_oauth2](../README.md#quantimodo_oauth2)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="getStudy"></a>
# **getStudy**
> Study getStudy(opts)

Get Study

Get Study

### Example
```javascript
import quantimodo-api from 'quantimodo-api';
let defaultClient = quantimodo-api.ApiClient.instance;

// Configure API key authorization: access_token
let access_token = defaultClient.authentications['access_token'];
access_token.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//access_token.apiKeyPrefix = 'Token';

// Configure OAuth2 access token for authorization: quantimodo_oauth2
let quantimodo_oauth2 = defaultClient.authentications['quantimodo_oauth2'];
quantimodo_oauth2.accessToken = 'YOUR ACCESS TOKEN';

let apiInstance = new quantimodo-api.StudiesApi();

let opts = { 
  'causeVariableName': "causeVariableName_example", // String | Name of the hypothetical predictor variable.  Ex: Sleep Duration
  'effectVariableName': "effectVariableName_example", // String | Name of the hypothetical outcome variable.  Ex: Overall Mood
  'userId': 8.14, // Number | User's id
  'clientId': "clientId_example", // String | Your QuantiModo client id can be obtained by creating an app at https://builder.quantimo.do
  'includeCharts': true, // Boolean | Highcharts configs that can be used if you have highcharts.js included on the page.  This only works if the id or name query parameter is also provided.
  'platform': "platform_example", // String | Ex: chrome, android, ios, web
  'recalculate': true, // Boolean | Recalculate instead of using cached analysis
  'studyId': "studyId_example" // String | Client id for the cohort study you want
};

apiInstance.getStudy(opts, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **causeVariableName** | **String**| Name of the hypothetical predictor variable.  Ex: Sleep Duration | [optional] 
 **effectVariableName** | **String**| Name of the hypothetical outcome variable.  Ex: Overall Mood | [optional] 
 **userId** | **Number**| User&#39;s id | [optional] 
 **clientId** | **String**| Your QuantiModo client id can be obtained by creating an app at https://builder.quantimo.do | [optional] 
 **includeCharts** | **Boolean**| Highcharts configs that can be used if you have highcharts.js included on the page.  This only works if the id or name query parameter is also provided. | [optional] 
 **platform** | **String**| Ex: chrome, android, ios, web | [optional] 
 **recalculate** | **Boolean**| Recalculate instead of using cached analysis | [optional] 
 **studyId** | **String**| Client id for the cohort study you want | [optional] 

### Return type

[**Study**](Study.md)

### Authorization

[access_token](../README.md#access_token), [quantimodo_oauth2](../README.md#quantimodo_oauth2)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="joinStudy"></a>
# **joinStudy**
> PostStudyPublishResponse joinStudy(opts)

Join a Study

Anonymously share measurements for specified variables

### Example
```javascript
import quantimodo-api from 'quantimodo-api';

let apiInstance = new quantimodo-api.StudiesApi();

let opts = { 
  'studyId': "studyId_example" // String | Client id for the cohort study you want
  'causeVariableName': "causeVariableName_example", // String | Name of the hypothetical predictor variable.  Ex: Sleep Duration
  'effectVariableName': "effectVariableName_example", // String | Name of the hypothetical outcome variable.  Ex: Overall Mood
  'userId': 8.14, // Number | User's id
  'clientId': "clientId_example", // String | Your QuantiModo client id can be obtained by creating an app at https://builder.quantimo.do
  'platform': "platform_example", // String | Ex: chrome, android, ios, web
};

apiInstance.joinStudy(opts, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **studyId** | **String**| Client id for the cohort study you want | [optional] 
 **causeVariableName** | **String**| Name of the hypothetical predictor variable.  Ex: Sleep Duration | [optional] 
 **effectVariableName** | **String**| Name of the hypothetical outcome variable.  Ex: Overall Mood | [optional] 
 **userId** | **Number**| User&#39;s id | [optional] 
 **clientId** | **String**| Your QuantiModo client id can be obtained by creating an app at https://builder.quantimo.do | [optional] 
 **platform** | **String**| Ex: chrome, android, ios, web | [optional] 

### Return type

[**PostStudyPublishResponse**](PostStudyPublishResponse.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="postVote"></a>
# **postVote**
> CommonResponse postVote(body, opts)

Post or update vote

I am really good at finding correlations and even compensating for various onset delays and durations of action. However, you are much better than me at knowing if there&#39;s a way that a given factor could plausibly influence an outcome. You can help me learn and get better at my predictions by pressing the thumbs down button for relationships that you think are coincidences and thumbs up once that make logic sense.

### Example
```javascript
import quantimodo-api from 'quantimodo-api';
let defaultClient = quantimodo-api.ApiClient.instance;

// Configure API key authorization: access_token
let access_token = defaultClient.authentications['access_token'];
access_token.apiKey = 'YOUR API KEY';
// Uncomment the following line to set a prefix for the API key, e.g. "Token" (defaults to null)
//access_token.apiKeyPrefix = 'Token';

// Configure OAuth2 access token for authorization: quantimodo_oauth2
let quantimodo_oauth2 = defaultClient.authentications['quantimodo_oauth2'];
quantimodo_oauth2.accessToken = 'YOUR ACCESS TOKEN';

let apiInstance = new quantimodo-api.StudiesApi();

let body = new quantimodo-api.Vote(); // Vote | Contains the cause variable, effect variable, and vote value.

let opts = { 
  'userId': 8.14, // Number | User's id
};

apiInstance.postVote(body, opts, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **body** | [**Vote**](Vote.md)| Contains the cause variable, effect variable, and vote value. | 
 **userId** | **Number**| User&#39;s id | [optional] 

### Return type

[**CommonResponse**](CommonResponse.md)

### Authorization

[access_token](../README.md#access_token), [quantimodo_oauth2](../README.md#quantimodo_oauth2)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

<a name="publishStudy"></a>
# **publishStudy**
> PostStudyPublishResponse publishStudy(opts)

Publish Your Study

Make a study and all related measurements publicly visible by anyone

### Example
```javascript
import quantimodo-api from 'quantimodo-api';

let apiInstance = new quantimodo-api.StudiesApi();

let opts = { 
  'causeVariableName': "causeVariableName_example", // String | Name of the hypothetical predictor variable.  Ex: Sleep Duration
  'effectVariableName': "effectVariableName_example", // String | Name of the hypothetical outcome variable.  Ex: Overall Mood
  'userId': 8.14, // Number | User's id
  'clientId': "clientId_example", // String | Your QuantiModo client id can be obtained by creating an app at https://builder.quantimo.do
  'includeCharts': true, // Boolean | Highcharts configs that can be used if you have highcharts.js included on the page.  This only works if the id or name query parameter is also provided.
  'platform': "platform_example", // String | Ex: chrome, android, ios, web
  'recalculate': true, // Boolean | Recalculate instead of using cached analysis
  'studyId': "studyId_example" // String | Client id for the cohort study you want
};

apiInstance.publishStudy(opts, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **causeVariableName** | **String**| Name of the hypothetical predictor variable.  Ex: Sleep Duration | [optional] 
 **effectVariableName** | **String**| Name of the hypothetical outcome variable.  Ex: Overall Mood | [optional] 
 **userId** | **Number**| User&#39;s id | [optional] 
 **clientId** | **String**| Your QuantiModo client id can be obtained by creating an app at https://builder.quantimo.do | [optional] 
 **includeCharts** | **Boolean**| Highcharts configs that can be used if you have highcharts.js included on the page.  This only works if the id or name query parameter is also provided. | [optional] 
 **platform** | **String**| Ex: chrome, android, ios, web | [optional] 
 **recalculate** | **Boolean**| Recalculate instead of using cached analysis | [optional] 
 **studyId** | **String**| Client id for the cohort study you want | [optional] 

### Return type

[**PostStudyPublishResponse**](PostStudyPublishResponse.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json
