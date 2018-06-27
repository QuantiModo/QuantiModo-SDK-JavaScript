# quantimodo-api.AppSettingsApi

All URIs are relative to *https://app.quantimo.do/api*

Method | HTTP request | Description
------------- | ------------- | -------------
[**getAppSettings**](AppSettingsApi.md#getAppSettings) | **GET** /v3/appSettings | Get client app settings


<a name="getAppSettings"></a>
# **getAppSettings**
> AppSettingsResponse getAppSettings(opts)

Get client app settings

Get the settings for your application configurable at https://build.quantimo.do

### Example
```javascript
import quantimodo-api from 'quantimodo-api';

let apiInstance = new quantimodo-api.AppSettingsApi();

let opts = { 
  'clientId': "clientId_example", // String | Your QuantiModo client id can be obtained by creating an app at https://builder.quantimo.do
  'clientSecret': "clientSecret_example", // String | This is the secret for your obtained clientId. We use this to ensure that only your application uses the clientId.  Obtain this by creating a free application at [https://app.quantimo.do/api/v2/apps](https://app.quantimo.do/api/v2/apps).
  'platform': "platform_example", // String | Ex: chrome, android, ios, web
};

apiInstance.getAppSettings(opts, (error, data, response) => {
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
 **clientId** | **String**| Your QuantiModo client id can be obtained by creating an app at https://builder.quantimo.do | [optional] 
 **clientSecret** | **String**| This is the secret for your obtained clientId. We use this to ensure that only your application uses the clientId.  Obtain this by creating a free application at [https://app.quantimo.do/api/v2/apps](https://app.quantimo.do/api/v2/apps). | [optional] 
 **platform** | **String**| Ex: chrome, android, ios, web | [optional] 

### Return type

[**AppSettingsResponse**](AppSettingsResponse.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json
