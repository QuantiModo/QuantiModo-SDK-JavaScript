(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Quantimodo = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){

/**
 * Expose `Emitter`.
 */

if (typeof module !== 'undefined') {
  module.exports = Emitter;
}

/**
 * Initialize a new `Emitter`.
 *
 * @api public
 */

function Emitter(obj) {
  if (obj) return mixin(obj);
};

/**
 * Mixin the emitter properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */

function mixin(obj) {
  for (var key in Emitter.prototype) {
    obj[key] = Emitter.prototype[key];
  }
  return obj;
}

/**
 * Listen on the given `event` with `fn`.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.on =
Emitter.prototype.addEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};
  (this._callbacks['$' + event] = this._callbacks['$' + event] || [])
    .push(fn);
  return this;
};

/**
 * Adds an `event` listener that will be invoked a single
 * time then automatically removed.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.once = function(event, fn){
  function on() {
    this.off(event, on);
    fn.apply(this, arguments);
  }

  on.fn = fn;
  this.on(event, on);
  return this;
};

/**
 * Remove the given callback for `event` or all
 * registered callbacks.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.off =
Emitter.prototype.removeListener =
Emitter.prototype.removeAllListeners =
Emitter.prototype.removeEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};

  // all
  if (0 == arguments.length) {
    this._callbacks = {};
    return this;
  }

  // specific event
  var callbacks = this._callbacks['$' + event];
  if (!callbacks) return this;

  // remove all handlers
  if (1 == arguments.length) {
    delete this._callbacks['$' + event];
    return this;
  }

  // remove specific handler
  var cb;
  for (var i = 0; i < callbacks.length; i++) {
    cb = callbacks[i];
    if (cb === fn || cb.fn === fn) {
      callbacks.splice(i, 1);
      break;
    }
  }
  return this;
};

/**
 * Emit `event` with the given args.
 *
 * @param {String} event
 * @param {Mixed} ...
 * @return {Emitter}
 */

Emitter.prototype.emit = function(event){
  this._callbacks = this._callbacks || {};
  var args = [].slice.call(arguments, 1)
    , callbacks = this._callbacks['$' + event];

  if (callbacks) {
    callbacks = callbacks.slice(0);
    for (var i = 0, len = callbacks.length; i < len; ++i) {
      callbacks[i].apply(this, args);
    }
  }

  return this;
};

/**
 * Return array of callbacks for `event`.
 *
 * @param {String} event
 * @return {Array}
 * @api public
 */

Emitter.prototype.listeners = function(event){
  this._callbacks = this._callbacks || {};
  return this._callbacks['$' + event] || [];
};

/**
 * Check if this emitter has `event` handlers.
 *
 * @param {String} event
 * @return {Boolean}
 * @api public
 */

Emitter.prototype.hasListeners = function(event){
  return !! this.listeners(event).length;
};

},{}],2:[function(require,module,exports){
/**
 * Root reference for iframes.
 */

var root;
if (typeof window !== 'undefined') { // Browser window
  root = window;
} else if (typeof self !== 'undefined') { // Web Worker
  root = self;
} else { // Other environments
  console.warn("Using browser-only version of superagent in non-browser environment");
  root = this;
}

var Emitter = require('component-emitter');
var RequestBase = require('./request-base');
var isObject = require('./is-object');
var isFunction = require('./is-function');
var ResponseBase = require('./response-base');
var shouldRetry = require('./should-retry');

/**
 * Noop.
 */

function noop(){};

/**
 * Expose `request`.
 */

var request = exports = module.exports = function(method, url) {
  // callback
  if ('function' == typeof url) {
    return new exports.Request('GET', method).end(url);
  }

  // url first
  if (1 == arguments.length) {
    return new exports.Request('GET', method);
  }

  return new exports.Request(method, url);
}

exports.Request = Request;

/**
 * Determine XHR.
 */

request.getXHR = function () {
  if (root.XMLHttpRequest
      && (!root.location || 'file:' != root.location.protocol
          || !root.ActiveXObject)) {
    return new XMLHttpRequest;
  } else {
    try { return new ActiveXObject('Microsoft.XMLHTTP'); } catch(e) {}
    try { return new ActiveXObject('Msxml2.XMLHTTP.6.0'); } catch(e) {}
    try { return new ActiveXObject('Msxml2.XMLHTTP.3.0'); } catch(e) {}
    try { return new ActiveXObject('Msxml2.XMLHTTP'); } catch(e) {}
  }
  throw Error("Browser-only verison of superagent could not find XHR");
};

/**
 * Removes leading and trailing whitespace, added to support IE.
 *
 * @param {String} s
 * @return {String}
 * @api private
 */

var trim = ''.trim
  ? function(s) { return s.trim(); }
  : function(s) { return s.replace(/(^\s*|\s*$)/g, ''); };

/**
 * Serialize the given `obj`.
 *
 * @param {Object} obj
 * @return {String}
 * @api private
 */

function serialize(obj) {
  if (!isObject(obj)) return obj;
  var pairs = [];
  for (var key in obj) {
    pushEncodedKeyValuePair(pairs, key, obj[key]);
  }
  return pairs.join('&');
}

/**
 * Helps 'serialize' with serializing arrays.
 * Mutates the pairs array.
 *
 * @param {Array} pairs
 * @param {String} key
 * @param {Mixed} val
 */

function pushEncodedKeyValuePair(pairs, key, val) {
  if (val != null) {
    if (Array.isArray(val)) {
      val.forEach(function(v) {
        pushEncodedKeyValuePair(pairs, key, v);
      });
    } else if (isObject(val)) {
      for(var subkey in val) {
        pushEncodedKeyValuePair(pairs, key + '[' + subkey + ']', val[subkey]);
      }
    } else {
      pairs.push(encodeURIComponent(key)
        + '=' + encodeURIComponent(val));
    }
  } else if (val === null) {
    pairs.push(encodeURIComponent(key));
  }
}

/**
 * Expose serialization method.
 */

 request.serializeObject = serialize;

 /**
  * Parse the given x-www-form-urlencoded `str`.
  *
  * @param {String} str
  * @return {Object}
  * @api private
  */

function parseString(str) {
  var obj = {};
  var pairs = str.split('&');
  var pair;
  var pos;

  for (var i = 0, len = pairs.length; i < len; ++i) {
    pair = pairs[i];
    pos = pair.indexOf('=');
    if (pos == -1) {
      obj[decodeURIComponent(pair)] = '';
    } else {
      obj[decodeURIComponent(pair.slice(0, pos))] =
        decodeURIComponent(pair.slice(pos + 1));
    }
  }

  return obj;
}

/**
 * Expose parser.
 */

request.parseString = parseString;

/**
 * Default MIME type map.
 *
 *     superagent.types.xml = 'application/xml';
 *
 */

request.types = {
  html: 'text/html',
  json: 'application/json',
  xml: 'application/xml',
  urlencoded: 'application/x-www-form-urlencoded',
  'form': 'application/x-www-form-urlencoded',
  'form-data': 'application/x-www-form-urlencoded'
};

/**
 * Default serialization map.
 *
 *     superagent.serialize['application/xml'] = function(obj){
 *       return 'generated xml here';
 *     };
 *
 */

 request.serialize = {
   'application/x-www-form-urlencoded': serialize,
   'application/json': JSON.stringify
 };

 /**
  * Default parsers.
  *
  *     superagent.parse['application/xml'] = function(str){
  *       return { object parsed from str };
  *     };
  *
  */

request.parse = {
  'application/x-www-form-urlencoded': parseString,
  'application/json': JSON.parse
};

/**
 * Parse the given header `str` into
 * an object containing the mapped fields.
 *
 * @param {String} str
 * @return {Object}
 * @api private
 */

function parseHeader(str) {
  var lines = str.split(/\r?\n/);
  var fields = {};
  var index;
  var line;
  var field;
  var val;

  lines.pop(); // trailing CRLF

  for (var i = 0, len = lines.length; i < len; ++i) {
    line = lines[i];
    index = line.indexOf(':');
    field = line.slice(0, index).toLowerCase();
    val = trim(line.slice(index + 1));
    fields[field] = val;
  }

  return fields;
}

/**
 * Check if `mime` is json or has +json structured syntax suffix.
 *
 * @param {String} mime
 * @return {Boolean}
 * @api private
 */

function isJSON(mime) {
  return /[\/+]json\b/.test(mime);
}

/**
 * Initialize a new `Response` with the given `xhr`.
 *
 *  - set flags (.ok, .error, etc)
 *  - parse header
 *
 * Examples:
 *
 *  Aliasing `superagent` as `request` is nice:
 *
 *      request = superagent;
 *
 *  We can use the promise-like API, or pass callbacks:
 *
 *      request.get('/').end(function(res){});
 *      request.get('/', function(res){});
 *
 *  Sending data can be chained:
 *
 *      request
 *        .post('/user')
 *        .send({ name: 'tj' })
 *        .end(function(res){});
 *
 *  Or passed to `.send()`:
 *
 *      request
 *        .post('/user')
 *        .send({ name: 'tj' }, function(res){});
 *
 *  Or passed to `.post()`:
 *
 *      request
 *        .post('/user', { name: 'tj' })
 *        .end(function(res){});
 *
 * Or further reduced to a single call for simple cases:
 *
 *      request
 *        .post('/user', { name: 'tj' }, function(res){});
 *
 * @param {XMLHTTPRequest} xhr
 * @param {Object} options
 * @api private
 */

function Response(req) {
  this.req = req;
  this.xhr = this.req.xhr;
  // responseText is accessible only if responseType is '' or 'text' and on older browsers
  this.text = ((this.req.method !='HEAD' && (this.xhr.responseType === '' || this.xhr.responseType === 'text')) || typeof this.xhr.responseType === 'undefined')
     ? this.xhr.responseText
     : null;
  this.statusText = this.req.xhr.statusText;
  var status = this.xhr.status;
  // handle IE9 bug: http://stackoverflow.com/questions/10046972/msie-returns-status-code-of-1223-for-ajax-request
  if (status === 1223) {
      status = 204;
  }
  this._setStatusProperties(status);
  this.header = this.headers = parseHeader(this.xhr.getAllResponseHeaders());
  // getAllResponseHeaders sometimes falsely returns "" for CORS requests, but
  // getResponseHeader still works. so we get content-type even if getting
  // other headers fails.
  this.header['content-type'] = this.xhr.getResponseHeader('content-type');
  this._setHeaderProperties(this.header);

  if (null === this.text && req._responseType) {
    this.body = this.xhr.response;
  } else {
    this.body = this.req.method != 'HEAD'
      ? this._parseBody(this.text ? this.text : this.xhr.response)
      : null;
  }
}

ResponseBase(Response.prototype);

/**
 * Parse the given body `str`.
 *
 * Used for auto-parsing of bodies. Parsers
 * are defined on the `superagent.parse` object.
 *
 * @param {String} str
 * @return {Mixed}
 * @api private
 */

Response.prototype._parseBody = function(str){
  var parse = request.parse[this.type];
  if(this.req._parser) {
    return this.req._parser(this, str);
  }
  if (!parse && isJSON(this.type)) {
    parse = request.parse['application/json'];
  }
  return parse && str && (str.length || str instanceof Object)
    ? parse(str)
    : null;
};

/**
 * Return an `Error` representative of this response.
 *
 * @return {Error}
 * @api public
 */

Response.prototype.toError = function(){
  var req = this.req;
  var method = req.method;
  var url = req.url;

  var msg = 'cannot ' + method + ' ' + url + ' (' + this.status + ')';
  var err = new Error(msg);
  err.status = this.status;
  err.method = method;
  err.url = url;

  return err;
};

/**
 * Expose `Response`.
 */

request.Response = Response;

/**
 * Initialize a new `Request` with the given `method` and `url`.
 *
 * @param {String} method
 * @param {String} url
 * @api public
 */

function Request(method, url) {
  var self = this;
  this._query = this._query || [];
  this.method = method;
  this.url = url;
  this.header = {}; // preserves header name case
  this._header = {}; // coerces header names to lowercase
  this.on('end', function(){
    var err = null;
    var res = null;

    try {
      res = new Response(self);
    } catch(e) {
      err = new Error('Parser is unable to parse the response');
      err.parse = true;
      err.original = e;
      // issue #675: return the raw response if the response parsing fails
      if (self.xhr) {
        // ie9 doesn't have 'response' property
        err.rawResponse = typeof self.xhr.responseType == 'undefined' ? self.xhr.responseText : self.xhr.response;
        // issue #876: return the http status code if the response parsing fails
        err.status = self.xhr.status ? self.xhr.status : null;
        err.statusCode = err.status; // backwards-compat only
      } else {
        err.rawResponse = null;
        err.status = null;
      }

      return self.callback(err);
    }

    self.emit('response', res);

    var new_err;
    try {
      if (!self._isResponseOK(res)) {
        new_err = new Error(res.statusText || 'Unsuccessful HTTP response');
        new_err.original = err;
        new_err.response = res;
        new_err.status = res.status;
      }
    } catch(e) {
      new_err = e; // #985 touching res may cause INVALID_STATE_ERR on old Android
    }

    // #1000 don't catch errors from the callback to avoid double calling it
    if (new_err) {
      self.callback(new_err, res);
    } else {
      self.callback(null, res);
    }
  });
}

/**
 * Mixin `Emitter` and `RequestBase`.
 */

Emitter(Request.prototype);
RequestBase(Request.prototype);

/**
 * Set Content-Type to `type`, mapping values from `request.types`.
 *
 * Examples:
 *
 *      superagent.types.xml = 'application/xml';
 *
 *      request.post('/')
 *        .type('xml')
 *        .send(xmlstring)
 *        .end(callback);
 *
 *      request.post('/')
 *        .type('application/xml')
 *        .send(xmlstring)
 *        .end(callback);
 *
 * @param {String} type
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.type = function(type){
  this.set('Content-Type', request.types[type] || type);
  return this;
};

/**
 * Set Accept to `type`, mapping values from `request.types`.
 *
 * Examples:
 *
 *      superagent.types.json = 'application/json';
 *
 *      request.get('/agent')
 *        .accept('json')
 *        .end(callback);
 *
 *      request.get('/agent')
 *        .accept('application/json')
 *        .end(callback);
 *
 * @param {String} accept
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.accept = function(type){
  this.set('Accept', request.types[type] || type);
  return this;
};

/**
 * Set Authorization field value with `user` and `pass`.
 *
 * @param {String} user
 * @param {String} [pass] optional in case of using 'bearer' as type
 * @param {Object} options with 'type' property 'auto', 'basic' or 'bearer' (default 'basic')
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.auth = function(user, pass, options){
  if (typeof pass === 'object' && pass !== null) { // pass is optional and can substitute for options
    options = pass;
  }
  if (!options) {
    options = {
      type: 'function' === typeof btoa ? 'basic' : 'auto',
    }
  }

  switch (options.type) {
    case 'basic':
      this.set('Authorization', 'Basic ' + btoa(user + ':' + pass));
    break;

    case 'auto':
      this.username = user;
      this.password = pass;
    break;
      
    case 'bearer': // usage would be .auth(accessToken, { type: 'bearer' })
      this.set('Authorization', 'Bearer ' + user);
    break;  
  }
  return this;
};

/**
 * Add query-string `val`.
 *
 * Examples:
 *
 *   request.get('/shoes')
 *     .query('size=10')
 *     .query({ color: 'blue' })
 *
 * @param {Object|String} val
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.query = function(val){
  if ('string' != typeof val) val = serialize(val);
  if (val) this._query.push(val);
  return this;
};

/**
 * Queue the given `file` as an attachment to the specified `field`,
 * with optional `options` (or filename).
 *
 * ``` js
 * request.post('/upload')
 *   .attach('content', new Blob(['<a id="a"><b id="b">hey!</b></a>'], { type: "text/html"}))
 *   .end(callback);
 * ```
 *
 * @param {String} field
 * @param {Blob|File} file
 * @param {String|Object} options
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.attach = function(field, file, options){
  if (file) {
    if (this._data) {
      throw Error("superagent can't mix .send() and .attach()");
    }

    this._getFormData().append(field, file, options || file.name);
  }
  return this;
};

Request.prototype._getFormData = function(){
  if (!this._formData) {
    this._formData = new root.FormData();
  }
  return this._formData;
};

/**
 * Invoke the callback with `err` and `res`
 * and handle arity check.
 *
 * @param {Error} err
 * @param {Response} res
 * @api private
 */

Request.prototype.callback = function(err, res){
  // console.log(this._retries, this._maxRetries)
  if (this._maxRetries && this._retries++ < this._maxRetries && shouldRetry(err, res)) {
    return this._retry();
  }

  var fn = this._callback;
  this.clearTimeout();

  if (err) {
    if (this._maxRetries) err.retries = this._retries - 1;
    this.emit('error', err);
  }

  fn(err, res);
};

/**
 * Invoke callback with x-domain error.
 *
 * @api private
 */

Request.prototype.crossDomainError = function(){
  var err = new Error('Request has been terminated\nPossible causes: the network is offline, Origin is not allowed by Access-Control-Allow-Origin, the page is being unloaded, etc.');
  err.crossDomain = true;

  err.status = this.status;
  err.method = this.method;
  err.url = this.url;

  this.callback(err);
};

// This only warns, because the request is still likely to work
Request.prototype.buffer = Request.prototype.ca = Request.prototype.agent = function(){
  console.warn("This is not supported in browser version of superagent");
  return this;
};

// This throws, because it can't send/receive data as expected
Request.prototype.pipe = Request.prototype.write = function(){
  throw Error("Streaming is not supported in browser version of superagent");
};

/**
 * Compose querystring to append to req.url
 *
 * @api private
 */

Request.prototype._appendQueryString = function(){
  var query = this._query.join('&');
  if (query) {
    this.url += (this.url.indexOf('?') >= 0 ? '&' : '?') + query;
  }

  if (this._sort) {
    var index = this.url.indexOf('?');
    if (index >= 0) {
      var queryArr = this.url.substring(index + 1).split('&');
      if (isFunction(this._sort)) {
        queryArr.sort(this._sort);
      } else {
        queryArr.sort();
      }
      this.url = this.url.substring(0, index) + '?' + queryArr.join('&');
    }
  }
};

/**
 * Check if `obj` is a host object,
 * we don't want to serialize these :)
 *
 * @param {Object} obj
 * @return {Boolean}
 * @api private
 */
Request.prototype._isHost = function _isHost(obj) {
  // Native objects stringify to [object File], [object Blob], [object FormData], etc.
  return obj && 'object' === typeof obj && !Array.isArray(obj) && Object.prototype.toString.call(obj) !== '[object Object]';
}

/**
 * Initiate request, invoking callback `fn(res)`
 * with an instanceof `Response`.
 *
 * @param {Function} fn
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.end = function(fn){
  if (this._endCalled) {
    console.warn("Warning: .end() was called twice. This is not supported in superagent");
  }
  this._endCalled = true;

  // store callback
  this._callback = fn || noop;

  // querystring
  this._appendQueryString();

  return this._end();
};

Request.prototype._end = function() {
  var self = this;
  var xhr = this.xhr = request.getXHR();
  var data = this._formData || this._data;

  this._setTimeouts();

  // state change
  xhr.onreadystatechange = function(){
    var readyState = xhr.readyState;
    if (readyState >= 2 && self._responseTimeoutTimer) {
      clearTimeout(self._responseTimeoutTimer);
    }
    if (4 != readyState) {
      return;
    }

    // In IE9, reads to any property (e.g. status) off of an aborted XHR will
    // result in the error "Could not complete the operation due to error c00c023f"
    var status;
    try { status = xhr.status } catch(e) { status = 0; }

    if (!status) {
      if (self.timedout || self._aborted) return;
      return self.crossDomainError();
    }
    self.emit('end');
  };

  // progress
  var handleProgress = function(direction, e) {
    if (e.total > 0) {
      e.percent = e.loaded / e.total * 100;
    }
    e.direction = direction;
    self.emit('progress', e);
  }
  if (this.hasListeners('progress')) {
    try {
      xhr.onprogress = handleProgress.bind(null, 'download');
      if (xhr.upload) {
        xhr.upload.onprogress = handleProgress.bind(null, 'upload');
      }
    } catch(e) {
      // Accessing xhr.upload fails in IE from a web worker, so just pretend it doesn't exist.
      // Reported here:
      // https://connect.microsoft.com/IE/feedback/details/837245/xmlhttprequest-upload-throws-invalid-argument-when-used-from-web-worker-context
    }
  }

  // initiate request
  try {
    if (this.username && this.password) {
      xhr.open(this.method, this.url, true, this.username, this.password);
    } else {
      xhr.open(this.method, this.url, true);
    }
  } catch (err) {
    // see #1149
    return this.callback(err);
  }

  // CORS
  if (this._withCredentials) xhr.withCredentials = true;

  // body
  if (!this._formData && 'GET' != this.method && 'HEAD' != this.method && 'string' != typeof data && !this._isHost(data)) {
    // serialize stuff
    var contentType = this._header['content-type'];
    var serialize = this._serializer || request.serialize[contentType ? contentType.split(';')[0] : ''];
    if (!serialize && isJSON(contentType)) {
      serialize = request.serialize['application/json'];
    }
    if (serialize) data = serialize(data);
  }

  // set header fields
  for (var field in this.header) {
    if (null == this.header[field]) continue;

    if (this.header.hasOwnProperty(field))
      xhr.setRequestHeader(field, this.header[field]);
  }

  if (this._responseType) {
    xhr.responseType = this._responseType;
  }

  // send stuff
  this.emit('request', this);

  // IE11 xhr.send(undefined) sends 'undefined' string as POST payload (instead of nothing)
  // We need null here if data is undefined
  xhr.send(typeof data !== 'undefined' ? data : null);
  return this;
};

/**
 * GET `url` with optional callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed|Function} [data] or fn
 * @param {Function} [fn]
 * @return {Request}
 * @api public
 */

request.get = function(url, data, fn){
  var req = request('GET', url);
  if ('function' == typeof data) fn = data, data = null;
  if (data) req.query(data);
  if (fn) req.end(fn);
  return req;
};

/**
 * HEAD `url` with optional callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed|Function} [data] or fn
 * @param {Function} [fn]
 * @return {Request}
 * @api public
 */

request.head = function(url, data, fn){
  var req = request('HEAD', url);
  if ('function' == typeof data) fn = data, data = null;
  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};

/**
 * OPTIONS query to `url` with optional callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed|Function} [data] or fn
 * @param {Function} [fn]
 * @return {Request}
 * @api public
 */

request.options = function(url, data, fn){
  var req = request('OPTIONS', url);
  if ('function' == typeof data) fn = data, data = null;
  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};

/**
 * DELETE `url` with optional `data` and callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed} [data]
 * @param {Function} [fn]
 * @return {Request}
 * @api public
 */

function del(url, data, fn){
  var req = request('DELETE', url);
  if ('function' == typeof data) fn = data, data = null;
  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};

request['del'] = del;
request['delete'] = del;

/**
 * PATCH `url` with optional `data` and callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed} [data]
 * @param {Function} [fn]
 * @return {Request}
 * @api public
 */

request.patch = function(url, data, fn){
  var req = request('PATCH', url);
  if ('function' == typeof data) fn = data, data = null;
  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};

/**
 * POST `url` with optional `data` and callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed} [data]
 * @param {Function} [fn]
 * @return {Request}
 * @api public
 */

request.post = function(url, data, fn){
  var req = request('POST', url);
  if ('function' == typeof data) fn = data, data = null;
  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};

/**
 * PUT `url` with optional `data` and callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed|Function} [data] or fn
 * @param {Function} [fn]
 * @return {Request}
 * @api public
 */

request.put = function(url, data, fn){
  var req = request('PUT', url);
  if ('function' == typeof data) fn = data, data = null;
  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};

},{"./is-function":3,"./is-object":4,"./request-base":5,"./response-base":6,"./should-retry":7,"component-emitter":1}],3:[function(require,module,exports){
/**
 * Check if `fn` is a function.
 *
 * @param {Function} fn
 * @return {Boolean}
 * @api private
 */
var isObject = require('./is-object');

function isFunction(fn) {
  var tag = isObject(fn) ? Object.prototype.toString.call(fn) : '';
  return tag === '[object Function]';
}

module.exports = isFunction;

},{"./is-object":4}],4:[function(require,module,exports){
/**
 * Check if `obj` is an object.
 *
 * @param {Object} obj
 * @return {Boolean}
 * @api private
 */

function isObject(obj) {
  return null !== obj && 'object' === typeof obj;
}

module.exports = isObject;

},{}],5:[function(require,module,exports){
/**
 * Module of mixed-in functions shared between node and client code
 */
var isObject = require('./is-object');

/**
 * Expose `RequestBase`.
 */

module.exports = RequestBase;

/**
 * Initialize a new `RequestBase`.
 *
 * @api public
 */

function RequestBase(obj) {
  if (obj) return mixin(obj);
}

/**
 * Mixin the prototype properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */

function mixin(obj) {
  for (var key in RequestBase.prototype) {
    obj[key] = RequestBase.prototype[key];
  }
  return obj;
}

/**
 * Clear previous timeout.
 *
 * @return {Request} for chaining
 * @api public
 */

RequestBase.prototype.clearTimeout = function _clearTimeout(){
  clearTimeout(this._timer);
  clearTimeout(this._responseTimeoutTimer);
  delete this._timer;
  delete this._responseTimeoutTimer;
  return this;
};

/**
 * Override default response body parser
 *
 * This function will be called to convert incoming data into request.body
 *
 * @param {Function}
 * @api public
 */

RequestBase.prototype.parse = function parse(fn){
  this._parser = fn;
  return this;
};

/**
 * Set format of binary response body.
 * In browser valid formats are 'blob' and 'arraybuffer',
 * which return Blob and ArrayBuffer, respectively.
 *
 * In Node all values result in Buffer.
 *
 * Examples:
 *
 *      req.get('/')
 *        .responseType('blob')
 *        .end(callback);
 *
 * @param {String} val
 * @return {Request} for chaining
 * @api public
 */

RequestBase.prototype.responseType = function(val){
  this._responseType = val;
  return this;
};

/**
 * Override default request body serializer
 *
 * This function will be called to convert data set via .send or .attach into payload to send
 *
 * @param {Function}
 * @api public
 */

RequestBase.prototype.serialize = function serialize(fn){
  this._serializer = fn;
  return this;
};

/**
 * Set timeouts.
 *
 * - response timeout is time between sending request and receiving the first byte of the response. Includes DNS and connection time.
 * - deadline is the time from start of the request to receiving response body in full. If the deadline is too short large files may not load at all on slow connections.
 *
 * Value of 0 or false means no timeout.
 *
 * @param {Number|Object} ms or {response, read, deadline}
 * @return {Request} for chaining
 * @api public
 */

RequestBase.prototype.timeout = function timeout(options){
  if (!options || 'object' !== typeof options) {
    this._timeout = options;
    this._responseTimeout = 0;
    return this;
  }

  for(var option in options) {
    switch(option) {
      case 'deadline':
        this._timeout = options.deadline;
        break;
      case 'response':
        this._responseTimeout = options.response;
        break;
      default:
        console.warn("Unknown timeout option", option);
    }
  }
  return this;
};

/**
 * Set number of retry attempts on error.
 *
 * Failed requests will be retried 'count' times if timeout or err.code >= 500.
 *
 * @param {Number} count
 * @return {Request} for chaining
 * @api public
 */

RequestBase.prototype.retry = function retry(count){
  // Default to 1 if no count passed or true
  if (arguments.length === 0 || count === true) count = 1;
  if (count <= 0) count = 0;
  this._maxRetries = count;
  this._retries = 0;
  return this;
};

/**
 * Retry request
 *
 * @return {Request} for chaining
 * @api private
 */

RequestBase.prototype._retry = function() {
  this.clearTimeout();

  // node
  if (this.req) {
    this.req = null;
    this.req = this.request();
  }

  this._aborted = false;
  this.timedout = false;

  return this._end();
};

/**
 * Promise support
 *
 * @param {Function} resolve
 * @param {Function} [reject]
 * @return {Request}
 */

RequestBase.prototype.then = function then(resolve, reject) {
  if (!this._fullfilledPromise) {
    var self = this;
    if (this._endCalled) {
      console.warn("Warning: superagent request was sent twice, because both .end() and .then() were called. Never call .end() if you use promises");
    }
    this._fullfilledPromise = new Promise(function(innerResolve, innerReject){
      self.end(function(err, res){
        if (err) innerReject(err); else innerResolve(res);
      });
    });
  }
  return this._fullfilledPromise.then(resolve, reject);
}

RequestBase.prototype.catch = function(cb) {
  return this.then(undefined, cb);
};

/**
 * Allow for extension
 */

RequestBase.prototype.use = function use(fn) {
  fn(this);
  return this;
}

RequestBase.prototype.ok = function(cb) {
  if ('function' !== typeof cb) throw Error("Callback required");
  this._okCallback = cb;
  return this;
};

RequestBase.prototype._isResponseOK = function(res) {
  if (!res) {
    return false;
  }

  if (this._okCallback) {
    return this._okCallback(res);
  }

  return res.status >= 200 && res.status < 300;
};


/**
 * Get request header `field`.
 * Case-insensitive.
 *
 * @param {String} field
 * @return {String}
 * @api public
 */

RequestBase.prototype.get = function(field){
  return this._header[field.toLowerCase()];
};

/**
 * Get case-insensitive header `field` value.
 * This is a deprecated internal API. Use `.get(field)` instead.
 *
 * (getHeader is no longer used internally by the superagent code base)
 *
 * @param {String} field
 * @return {String}
 * @api private
 * @deprecated
 */

RequestBase.prototype.getHeader = RequestBase.prototype.get;

/**
 * Set header `field` to `val`, or multiple fields with one object.
 * Case-insensitive.
 *
 * Examples:
 *
 *      req.get('/')
 *        .set('Accept', 'application/json')
 *        .set('X-API-Key', 'foobar')
 *        .end(callback);
 *
 *      req.get('/')
 *        .set({ Accept: 'application/json', 'X-API-Key': 'foobar' })
 *        .end(callback);
 *
 * @param {String|Object} field
 * @param {String} val
 * @return {Request} for chaining
 * @api public
 */

RequestBase.prototype.set = function(field, val){
  if (isObject(field)) {
    for (var key in field) {
      this.set(key, field[key]);
    }
    return this;
  }
  this._header[field.toLowerCase()] = val;
  this.header[field] = val;
  return this;
};

/**
 * Remove header `field`.
 * Case-insensitive.
 *
 * Example:
 *
 *      req.get('/')
 *        .unset('User-Agent')
 *        .end(callback);
 *
 * @param {String} field
 */
RequestBase.prototype.unset = function(field){
  delete this._header[field.toLowerCase()];
  delete this.header[field];
  return this;
};

/**
 * Write the field `name` and `val`, or multiple fields with one object
 * for "multipart/form-data" request bodies.
 *
 * ``` js
 * request.post('/upload')
 *   .field('foo', 'bar')
 *   .end(callback);
 *
 * request.post('/upload')
 *   .field({ foo: 'bar', baz: 'qux' })
 *   .end(callback);
 * ```
 *
 * @param {String|Object} name
 * @param {String|Blob|File|Buffer|fs.ReadStream} val
 * @return {Request} for chaining
 * @api public
 */
RequestBase.prototype.field = function(name, val) {

  // name should be either a string or an object.
  if (null === name ||  undefined === name) {
    throw new Error('.field(name, val) name can not be empty');
  }

  if (this._data) {
    console.error(".field() can't be used if .send() is used. Please use only .send() or only .field() & .attach()");
  }

  if (isObject(name)) {
    for (var key in name) {
      this.field(key, name[key]);
    }
    return this;
  }

  if (Array.isArray(val)) {
    for (var i in val) {
      this.field(name, val[i]);
    }
    return this;
  }

  // val should be defined now
  if (null === val || undefined === val) {
    throw new Error('.field(name, val) val can not be empty');
  }
  if ('boolean' === typeof val) {
    val = '' + val;
  }
  this._getFormData().append(name, val);
  return this;
};

/**
 * Abort the request, and clear potential timeout.
 *
 * @return {Request}
 * @api public
 */
RequestBase.prototype.abort = function(){
  if (this._aborted) {
    return this;
  }
  this._aborted = true;
  this.xhr && this.xhr.abort(); // browser
  this.req && this.req.abort(); // node
  this.clearTimeout();
  this.emit('abort');
  return this;
};

/**
 * Enable transmission of cookies with x-domain requests.
 *
 * Note that for this to work the origin must not be
 * using "Access-Control-Allow-Origin" with a wildcard,
 * and also must set "Access-Control-Allow-Credentials"
 * to "true".
 *
 * @api public
 */

RequestBase.prototype.withCredentials = function(on){
  // This is browser-only functionality. Node side is no-op.
  if(on==undefined) on = true;
  this._withCredentials = on;
  return this;
};

/**
 * Set the max redirects to `n`. Does noting in browser XHR implementation.
 *
 * @param {Number} n
 * @return {Request} for chaining
 * @api public
 */

RequestBase.prototype.redirects = function(n){
  this._maxRedirects = n;
  return this;
};

/**
 * Convert to a plain javascript object (not JSON string) of scalar properties.
 * Note as this method is designed to return a useful non-this value,
 * it cannot be chained.
 *
 * @return {Object} describing method, url, and data of this request
 * @api public
 */

RequestBase.prototype.toJSON = function(){
  return {
    method: this.method,
    url: this.url,
    data: this._data,
    headers: this._header
  };
};


/**
 * Send `data` as the request body, defaulting the `.type()` to "json" when
 * an object is given.
 *
 * Examples:
 *
 *       // manual json
 *       request.post('/user')
 *         .type('json')
 *         .send('{"name":"tj"}')
 *         .end(callback)
 *
 *       // auto json
 *       request.post('/user')
 *         .send({ name: 'tj' })
 *         .end(callback)
 *
 *       // manual x-www-form-urlencoded
 *       request.post('/user')
 *         .type('form')
 *         .send('name=tj')
 *         .end(callback)
 *
 *       // auto x-www-form-urlencoded
 *       request.post('/user')
 *         .type('form')
 *         .send({ name: 'tj' })
 *         .end(callback)
 *
 *       // defaults to x-www-form-urlencoded
 *      request.post('/user')
 *        .send('name=tobi')
 *        .send('species=ferret')
 *        .end(callback)
 *
 * @param {String|Object} data
 * @return {Request} for chaining
 * @api public
 */

RequestBase.prototype.send = function(data){
  var isObj = isObject(data);
  var type = this._header['content-type'];

  if (this._formData) {
    console.error(".send() can't be used if .attach() or .field() is used. Please use only .send() or only .field() & .attach()");
  }

  if (isObj && !this._data) {
    if (Array.isArray(data)) {
      this._data = [];
    } else if (!this._isHost(data)) {
      this._data = {};
    }
  } else if (data && this._data && this._isHost(this._data)) {
    throw Error("Can't merge these send calls");
  }

  // merge
  if (isObj && isObject(this._data)) {
    for (var key in data) {
      this._data[key] = data[key];
    }
  } else if ('string' == typeof data) {
    // default to x-www-form-urlencoded
    if (!type) this.type('form');
    type = this._header['content-type'];
    if ('application/x-www-form-urlencoded' == type) {
      this._data = this._data
        ? this._data + '&' + data
        : data;
    } else {
      this._data = (this._data || '') + data;
    }
  } else {
    this._data = data;
  }

  if (!isObj || this._isHost(data)) {
    return this;
  }

  // default to json
  if (!type) this.type('json');
  return this;
};


/**
 * Sort `querystring` by the sort function
 *
 *
 * Examples:
 *
 *       // default order
 *       request.get('/user')
 *         .query('name=Nick')
 *         .query('search=Manny')
 *         .sortQuery()
 *         .end(callback)
 *
 *       // customized sort function
 *       request.get('/user')
 *         .query('name=Nick')
 *         .query('search=Manny')
 *         .sortQuery(function(a, b){
 *           return a.length - b.length;
 *         })
 *         .end(callback)
 *
 *
 * @param {Function} sort
 * @return {Request} for chaining
 * @api public
 */

RequestBase.prototype.sortQuery = function(sort) {
  // _sort default to true but otherwise can be a function or boolean
  this._sort = typeof sort === 'undefined' ? true : sort;
  return this;
};

/**
 * Invoke callback with timeout error.
 *
 * @api private
 */

RequestBase.prototype._timeoutError = function(reason, timeout, errno){
  if (this._aborted) {
    return;
  }
  var err = new Error(reason + timeout + 'ms exceeded');
  err.timeout = timeout;
  err.code = 'ECONNABORTED';
  err.errno = errno;
  this.timedout = true;
  this.abort();
  this.callback(err);
};

RequestBase.prototype._setTimeouts = function() {
  var self = this;

  // deadline
  if (this._timeout && !this._timer) {
    this._timer = setTimeout(function(){
      self._timeoutError('Timeout of ', self._timeout, 'ETIME');
    }, this._timeout);
  }
  // response timeout
  if (this._responseTimeout && !this._responseTimeoutTimer) {
    this._responseTimeoutTimer = setTimeout(function(){
      self._timeoutError('Response timeout of ', self._responseTimeout, 'ETIMEDOUT');
    }, this._responseTimeout);
  }
}

},{"./is-object":4}],6:[function(require,module,exports){

/**
 * Module dependencies.
 */

var utils = require('./utils');

/**
 * Expose `ResponseBase`.
 */

module.exports = ResponseBase;

/**
 * Initialize a new `ResponseBase`.
 *
 * @api public
 */

function ResponseBase(obj) {
  if (obj) return mixin(obj);
}

/**
 * Mixin the prototype properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */

function mixin(obj) {
  for (var key in ResponseBase.prototype) {
    obj[key] = ResponseBase.prototype[key];
  }
  return obj;
}

/**
 * Get case-insensitive `field` value.
 *
 * @param {String} field
 * @return {String}
 * @api public
 */

ResponseBase.prototype.get = function(field){
    return this.header[field.toLowerCase()];
};

/**
 * Set header related properties:
 *
 *   - `.type` the content type without params
 *
 * A response of "Content-Type: text/plain; charset=utf-8"
 * will provide you with a `.type` of "text/plain".
 *
 * @param {Object} header
 * @api private
 */

ResponseBase.prototype._setHeaderProperties = function(header){
    // TODO: moar!
    // TODO: make this a util

    // content-type
    var ct = header['content-type'] || '';
    this.type = utils.type(ct);

    // params
    var params = utils.params(ct);
    for (var key in params) this[key] = params[key];

    this.links = {};

    // links
    try {
        if (header.link) {
            this.links = utils.parseLinks(header.link);
        }
    } catch (err) {
        // ignore
    }
};

/**
 * Set flags such as `.ok` based on `status`.
 *
 * For example a 2xx response will give you a `.ok` of __true__
 * whereas 5xx will be __false__ and `.error` will be __true__. The
 * `.clientError` and `.serverError` are also available to be more
 * specific, and `.statusType` is the class of error ranging from 1..5
 * sometimes useful for mapping respond colors etc.
 *
 * "sugar" properties are also defined for common cases. Currently providing:
 *
 *   - .noContent
 *   - .badRequest
 *   - .unauthorized
 *   - .notAcceptable
 *   - .notFound
 *
 * @param {Number} status
 * @api private
 */

ResponseBase.prototype._setStatusProperties = function(status){
    var type = status / 100 | 0;

    // status / class
    this.status = this.statusCode = status;
    this.statusType = type;

    // basics
    this.info = 1 == type;
    this.ok = 2 == type;
    this.redirect = 3 == type;
    this.clientError = 4 == type;
    this.serverError = 5 == type;
    this.error = (4 == type || 5 == type)
        ? this.toError()
        : false;

    // sugar
    this.accepted = 202 == status;
    this.noContent = 204 == status;
    this.badRequest = 400 == status;
    this.unauthorized = 401 == status;
    this.notAcceptable = 406 == status;
    this.forbidden = 403 == status;
    this.notFound = 404 == status;
};

},{"./utils":8}],7:[function(require,module,exports){
var ERROR_CODES = [
  'ECONNRESET',
  'ETIMEDOUT',
  'EADDRINFO',
  'ESOCKETTIMEDOUT'
];

/**
 * Determine if a request should be retried.
 * (Borrowed from segmentio/superagent-retry)
 *
 * @param {Error} err
 * @param {Response} [res]
 * @returns {Boolean}
 */
module.exports = function shouldRetry(err, res) {
  if (err && err.code && ~ERROR_CODES.indexOf(err.code)) return true;
  if (res && res.status && res.status >= 500) return true;
  // Superagent timeout
  if (err && 'timeout' in err && err.code == 'ECONNABORTED') return true;
  if (err && 'crossDomain' in err) return true;
  return false;
};

},{}],8:[function(require,module,exports){

/**
 * Return the mime type for the given `str`.
 *
 * @param {String} str
 * @return {String}
 * @api private
 */

exports.type = function(str){
  return str.split(/ *; */).shift();
};

/**
 * Return header field parameters.
 *
 * @param {String} str
 * @return {Object}
 * @api private
 */

exports.params = function(str){
  return str.split(/ *; */).reduce(function(obj, str){
    var parts = str.split(/ *= */);
    var key = parts.shift();
    var val = parts.shift();

    if (key && val) obj[key] = val;
    return obj;
  }, {});
};

/**
 * Parse Link header fields.
 *
 * @param {String} str
 * @return {Object}
 * @api private
 */

exports.parseLinks = function(str){
  return str.split(/ *, */).reduce(function(obj, str){
    var parts = str.split(/ *; */);
    var url = parts[0].slice(1, -1);
    var rel = parts[1].split(/ *= */)[1].slice(1, -1);
    obj[rel] = url;
    return obj;
  }, {});
};

/**
 * Strip content related fields from `header`.
 *
 * @param {Object} header
 * @return {Object} header
 * @api private
 */

exports.cleanHeader = function(header, shouldStripCookie){
  delete header['content-type'];
  delete header['content-length'];
  delete header['transfer-encoding'];
  delete header['host'];
  if (shouldStripCookie) {
    delete header['cookie'];
  }
  return header;
};
},{}],9:[function(require,module,exports){
(function (Buffer){
/**
 * quantimodo
 * We make it easy to retrieve and analyze normalized user data from a wide array of devices and applications. Check out our [docs and sdk's](https://github.com/QuantiModo/docs) or [contact us](https://help.quantimo.do).
 *
 * OpenAPI spec version: 5.8.112511
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.3.1
 *
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['superagent', 'querystring'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('superagent'), require('querystring'));
  } else {
    // Browser globals (root is window)
    if (!root.Quantimodo) {
      root.Quantimodo = {};
    }
    root.Quantimodo.ApiClient = factory(root.superagent, root.querystring);
  }
}(this, function(superagent, querystring) {
  'use strict';

  /**
   * @module ApiClient
   * @version 5.8.112511
   */

  /**
   * Manages low level client-server communications, parameter marshalling, etc. There should not be any need for an
   * application to use this class directly - the *Api and model classes provide the public API for the service. The
   * contents of this file should be regarded as internal but are documented for completeness.
   * @alias module:ApiClient
   * @class
   */
  var exports = function() {
    /**
     * The base URL against which to resolve every API call's (relative) path.
     * @type {String}
     * @default https://app.quantimo.do/api
     */
    this.basePath = 'https://app.quantimo.do/api'.replace(/\/+$/, '');

    /**
     * The authentication methods to be included for all API calls.
     * @type {Array.<String>}
     */
    this.authentications = {
      'access_token': {type: 'apiKey', 'in': 'query', name: 'access_token'},
      'client_id': {type: 'apiKey', 'in': 'query', name: 'clientId'},
      'quantimodo_oauth2': {type: 'oauth2'}
    };
    /**
     * The default HTTP headers to be included for all API calls.
     * @type {Array.<String>}
     * @default {}
     */
    this.defaultHeaders = {};

    /**
     * The default HTTP timeout for all API calls.
     * @type {Number}
     * @default 60000
     */
    this.timeout = 60000;

    /**
     * If set to false an additional timestamp parameter is added to all API GET calls to
     * prevent browser caching
     * @type {Boolean}
     * @default true
     */
    this.cache = true;

    /**
     * If set to true, the client will save the cookies from each server
     * response, and return them in the next request.
     * @default false
     */
    this.enableCookies = false;

    /*
     * Used to save and return cookies in a node.js (non-browser) setting,
     * if this.enableCookies is set to true.
     */
    if (typeof window === 'undefined') {
      this.agent = new superagent.agent();
    }

    /*
     * Allow user to override superagent agent
     */
    this.requestAgent = null;
  };

  /**
   * Returns a string representation for an actual parameter.
   * @param param The actual parameter.
   * @returns {String} The string representation of <code>param</code>.
   */
  exports.prototype.paramToString = function(param) {
    if (param == undefined || param == null) {
      return '';
    }
    if (param instanceof Date) {
      return param.toJSON();
    }
    return param.toString();
  };

  /**
   * Builds full URL by appending the given path to the base URL and replacing path parameter place-holders with parameter values.
   * NOTE: query parameters are not handled here.
   * @param {String} path The path to append to the base URL.
   * @param {Object} pathParams The parameter values to append.
   * @returns {String} The encoded path with parameter values substituted.
   */
  exports.prototype.buildUrl = function(path, pathParams) {
    if (!path.match(/^\//)) {
      path = '/' + path;
    }
    var url = this.basePath + path;
    var _this = this;
    url = url.replace(/\{([\w-]+)\}/g, function(fullMatch, key) {
      var value;
      if (pathParams.hasOwnProperty(key)) {
        value = _this.paramToString(pathParams[key]);
      } else {
        value = fullMatch;
      }
      return encodeURIComponent(value);
    });
    return url;
  };

  /**
   * Checks whether the given content type represents JSON.<br>
   * JSON content type examples:<br>
   * <ul>
   * <li>application/json</li>
   * <li>application/json; charset=UTF8</li>
   * <li>APPLICATION/JSON</li>
   * </ul>
   * @param {String} contentType The MIME content type to check.
   * @returns {Boolean} <code>true</code> if <code>contentType</code> represents JSON, otherwise <code>false</code>.
   */
  exports.prototype.isJsonMime = function(contentType) {
    return Boolean(contentType != null && contentType.match(/^application\/json(;.*)?$/i));
  };

  /**
   * Chooses a content type from the given array, with JSON preferred; i.e. return JSON if included, otherwise return the first.
   * @param {Array.<String>} contentTypes
   * @returns {String} The chosen content type, preferring JSON.
   */
  exports.prototype.jsonPreferredMime = function(contentTypes) {
    for (var i = 0; i < contentTypes.length; i++) {
      if (this.isJsonMime(contentTypes[i])) {
        return contentTypes[i];
      }
    }
    return contentTypes[0];
  };

  /**
   * Checks whether the given parameter value represents file-like content.
   * @param param The parameter to check.
   * @returns {Boolean} <code>true</code> if <code>param</code> represents a file.
   */
  exports.prototype.isFileParam = function(param) {
    // fs.ReadStream in Node.js and Electron (but not in runtime like browserify)
    if (typeof require === 'function') {
      var fs;
      try {
        fs = require('fs');
      } catch (err) {}
      if (fs && fs.ReadStream && param instanceof fs.ReadStream) {
        return true;
      }
    }
    // Buffer in Node.js
    if (typeof Buffer === 'function' && param instanceof Buffer) {
      return true;
    }
    // Blob in browser
    if (typeof Blob === 'function' && param instanceof Blob) {
      return true;
    }
    // File in browser (it seems File object is also instance of Blob, but keep this for safe)
    if (typeof File === 'function' && param instanceof File) {
      return true;
    }
    return false;
  };

  /**
   * Normalizes parameter values:
   * <ul>
   * <li>remove nils</li>
   * <li>keep files and arrays</li>
   * <li>format to string with `paramToString` for other cases</li>
   * </ul>
   * @param {Object.<String, Object>} params The parameters as object properties.
   * @returns {Object.<String, Object>} normalized parameters.
   */
  exports.prototype.normalizeParams = function(params) {
    var newParams = {};
    for (var key in params) {
      if (params.hasOwnProperty(key) && params[key] != undefined && params[key] != null) {
        var value = params[key];
        if (this.isFileParam(value) || Array.isArray(value)) {
          newParams[key] = value;
        } else {
          newParams[key] = this.paramToString(value);
        }
      }
    }
    return newParams;
  };

  /**
   * Enumeration of collection format separator strategies.
   * @enum {String}
   * @readonly
   */
  exports.CollectionFormatEnum = {
    /**
     * Comma-separated values. Value: <code>csv</code>
     * @const
     */
    CSV: ',',
    /**
     * Space-separated values. Value: <code>ssv</code>
     * @const
     */
    SSV: ' ',
    /**
     * Tab-separated values. Value: <code>tsv</code>
     * @const
     */
    TSV: '\t',
    /**
     * Pipe(|)-separated values. Value: <code>pipes</code>
     * @const
     */
    PIPES: '|',
    /**
     * Native array. Value: <code>multi</code>
     * @const
     */
    MULTI: 'multi'
  };

  /**
   * Builds a string representation of an array-type actual parameter, according to the given collection format.
   * @param {Array} param An array parameter.
   * @param {module:ApiClient.CollectionFormatEnum} collectionFormat The array element separator strategy.
   * @returns {String|Array} A string representation of the supplied collection, using the specified delimiter. Returns
   * <code>param</code> as is if <code>collectionFormat</code> is <code>multi</code>.
   */
  exports.prototype.buildCollectionParam = function buildCollectionParam(param, collectionFormat) {
    if (param == null) {
      return null;
    }
    switch (collectionFormat) {
      case 'csv':
        return param.map(this.paramToString).join(',');
      case 'ssv':
        return param.map(this.paramToString).join(' ');
      case 'tsv':
        return param.map(this.paramToString).join('\t');
      case 'pipes':
        return param.map(this.paramToString).join('|');
      case 'multi':
        // return the array directly as SuperAgent will handle it as expected
        return param.map(this.paramToString);
      default:
        throw new Error('Unknown collection format: ' + collectionFormat);
    }
  };

  /**
   * Applies authentication headers to the request.
   * @param {Object} request The request object created by a <code>superagent()</code> call.
   * @param {Array.<String>} authNames An array of authentication method names.
   */
  exports.prototype.applyAuthToRequest = function(request, authNames) {
    var _this = this;
    authNames.forEach(function(authName) {
      var auth = _this.authentications[authName];
      switch (auth.type) {
        case 'basic':
          if (auth.username || auth.password) {
            request.auth(auth.username || '', auth.password || '');
          }
          break;
        case 'apiKey':
          if (auth.apiKey) {
            var data = {};
            if (auth.apiKeyPrefix) {
              data[auth.name] = auth.apiKeyPrefix + ' ' + auth.apiKey;
            } else {
              data[auth.name] = auth.apiKey;
            }
            if (auth['in'] === 'header') {
              request.set(data);
            } else {
              request.query(data);
            }
          }
          break;
        case 'oauth2':
          if (auth.accessToken) {
            request.set({'Authorization': 'Bearer ' + auth.accessToken});
          }
          break;
        default:
          throw new Error('Unknown authentication type: ' + auth.type);
      }
    });
  };

  /**
   * Deserializes an HTTP response body into a value of the specified type.
   * @param {Object} response A SuperAgent response object.
   * @param {(String|Array.<String>|Object.<String, Object>|Function)} returnType The type to return. Pass a string for simple types
   * or the constructor function for a complex type. Pass an array containing the type name to return an array of that type. To
   * return an object, pass an object with one property whose name is the key type and whose value is the corresponding value type:
   * all properties on <code>data<code> will be converted to this type.
   * @returns A value of the specified type.
   */
  exports.prototype.deserialize = function deserialize(response, returnType) {
    if (response == null || returnType == null || response.status == 204) {
      return null;
    }
    // Rely on SuperAgent for parsing response body.
    // See http://visionmedia.github.io/superagent/#parsing-response-bodies
    var data = response.body;
    if (data == null || (typeof data === 'object' && typeof data.length === 'undefined' && !Object.keys(data).length)) {
      // SuperAgent does not always produce a body; use the unparsed response as a fallback
      data = response.text;
    }
    return exports.convertToType(data, returnType);
  };

  /**
   * Callback function to receive the result of the operation.
   * @callback module:ApiClient~callApiCallback
   * @param {String} error Error message, if any.
   * @param data The data returned by the service call.
   * @param {String} response The complete HTTP response.
   */

  /**
   * Invokes the REST service using the supplied settings and parameters.
   * @param {String} path The base URL to invoke.
   * @param {String} httpMethod The HTTP method to use.
   * @param {Object.<String, String>} pathParams A map of path parameters and their values.
   * @param {Object.<String, Object>} queryParams A map of query parameters and their values.
   * @param {Object.<String, Object>} collectionQueryParams A map of collection query parameters and their values.
   * @param {Object.<String, Object>} headerParams A map of header parameters and their values.
   * @param {Object.<String, Object>} formParams A map of form parameters and their values.
   * @param {Object} bodyParam The value to pass as the request body.
   * @param {Array.<String>} authNames An array of authentication type names.
   * @param {Array.<String>} contentTypes An array of request MIME types.
   * @param {Array.<String>} accepts An array of acceptable response MIME types.
   * @param {(String|Array|ObjectFunction)} returnType The required type to return; can be a string for simple types or the
   * constructor for a complex type.
   * @param {module:ApiClient~callApiCallback} callback The callback function.
   * @returns {Object} The SuperAgent request object.
   */
  exports.prototype.callApi = function callApi(path, httpMethod, pathParams,
      queryParams, collectionQueryParams, headerParams, formParams, bodyParam, authNames, contentTypes, accepts,
      returnType, callback) {

    var _this = this;
    var url = this.buildUrl(path, pathParams);
    var request = superagent(httpMethod, url);

    // apply authentications
    this.applyAuthToRequest(request, authNames);

    // set collection query parameters
    for (var key in collectionQueryParams) {
      if (collectionQueryParams.hasOwnProperty(key)) {
        var param = collectionQueryParams[key];
        if (param.collectionFormat === 'csv') {
          // SuperAgent normally percent-encodes all reserved characters in a query parameter. However,
          // commas are used as delimiters for the 'csv' collectionFormat so they must not be encoded. We
          // must therefore construct and encode 'csv' collection query parameters manually.
          if (param.value != null) {
            var value = param.value.map(this.paramToString).map(encodeURIComponent).join(',');
            request.query(encodeURIComponent(key) + "=" + value);
          }
        } else {
          // All other collection query parameters should be treated as ordinary query parameters.
          queryParams[key] = this.buildCollectionParam(param.value, param.collectionFormat);
        }
      }
    }

    // set query parameters
    if (httpMethod.toUpperCase() === 'GET' && this.cache === false) {
        queryParams['_'] = new Date().getTime();
    }
    request.query(this.normalizeParams(queryParams));

    // set header parameters
    request.set(this.defaultHeaders).set(this.normalizeParams(headerParams));


    // set requestAgent if it is set by user
    if (this.requestAgent) {
      request.agent(this.requestAgent);
    }

    // set request timeout
    request.timeout(this.timeout);

    var contentType = this.jsonPreferredMime(contentTypes);
    if (contentType) {
      // Issue with superagent and multipart/form-data (https://github.com/visionmedia/superagent/issues/746)
      if(contentType != 'multipart/form-data') {
        request.type(contentType);
      }
    } else if (!request.header['Content-Type']) {
      request.type('application/json');
    }

    if (contentType === 'application/x-www-form-urlencoded') {
      request.send(querystring.stringify(this.normalizeParams(formParams)));
    } else if (contentType == 'multipart/form-data') {
      var _formParams = this.normalizeParams(formParams);
      for (var key in _formParams) {
        if (_formParams.hasOwnProperty(key)) {
          if (this.isFileParam(_formParams[key])) {
            // file field
            request.attach(key, _formParams[key]);
          } else {
            request.field(key, _formParams[key]);
          }
        }
      }
    } else if (bodyParam) {
      request.send(bodyParam);
    }

    var accept = this.jsonPreferredMime(accepts);
    if (accept) {
      request.accept(accept);
    }

    if (returnType === 'Blob') {
      request.responseType('blob');
    } else if (returnType === 'String') {
      request.responseType('string');
    }

    // Attach previously saved cookies, if enabled
    if (this.enableCookies){
      if (typeof window === 'undefined') {
        this.agent.attachCookies(request);
      }
      else {
        request.withCredentials();
      }
    }


    request.end(function(error, response) {
      if (callback) {
        var data = null;
        if (!error) {
          try {
            data = _this.deserialize(response, returnType);
            if (_this.enableCookies && typeof window === 'undefined'){
              _this.agent.saveCookies(response);
            }
          } catch (err) {
            error = err;
          }
        }
        callback(error, data, response);
      }
    });

    return request;
  };

  /**
   * Parses an ISO-8601 string representation of a date value.
   * @param {String} str The date value as a string.
   * @returns {Date} The parsed date object.
   */
  exports.parseDate = function(str) {
    return new Date(str.replace(/T/i, ' '));
  };

  /**
   * Converts a value to the specified type.
   * @param {(String|Object)} data The data to convert, as a string or object.
   * @param {(String|Array.<String>|Object.<String, Object>|Function)} type The type to return. Pass a string for simple types
   * or the constructor function for a complex type. Pass an array containing the type name to return an array of that type. To
   * return an object, pass an object with one property whose name is the key type and whose value is the corresponding value type:
   * all properties on <code>data<code> will be converted to this type.
   * @returns An instance of the specified type or null or undefined if data is null or undefined.
   */
  exports.convertToType = function(data, type) {
    if (data === null || data === undefined)
      return data

    switch (type) {
      case 'Boolean':
        return Boolean(data);
      case 'Integer':
        return parseInt(data, 10);
      case 'Number':
        return parseFloat(data);
      case 'String':
        return String(data);
      case 'Date':
        return this.parseDate(String(data));
      case 'Blob':
      	return data;
      default:
        if (type === Object) {
          // generic object, return directly
          return data;
        } else if (typeof type === 'function') {
          // for model type like: User
          return type.constructFromObject(data);
        } else if (Array.isArray(type)) {
          // for array type like: ['String']
          var itemType = type[0];
          return data.map(function(item) {
            return exports.convertToType(item, itemType);
          });
        } else if (typeof type === 'object') {
          // for plain object type like: {'String': 'Integer'}
          var keyType, valueType;
          for (var k in type) {
            if (type.hasOwnProperty(k)) {
              keyType = k;
              valueType = type[k];
              break;
            }
          }
          var result = {};
          for (var k in data) {
            if (data.hasOwnProperty(k)) {
              var key = exports.convertToType(k, keyType);
              var value = exports.convertToType(data[k], valueType);
              result[key] = value;
            }
          }
          return result;
        } else {
          // for unknown type, return the data directly
          return data;
        }
    }
  };

  /**
   * Constructs a new map or array model from REST data.
   * @param data {Object|Array} The REST data.
   * @param obj {Object|Array} The target object or array.
   */
  exports.constructFromObject = function(data, obj, itemType) {
    if (Array.isArray(data)) {
      for (var i = 0; i < data.length; i++) {
        if (data.hasOwnProperty(i))
          obj[i] = exports.convertToType(data[i], itemType);
      }
    } else {
      for (var k in data) {
        if (data.hasOwnProperty(k))
          obj[k] = exports.convertToType(data[k], itemType);
      }
    }
  };

  /**
   * The default API client implementation.
   * @type {module:ApiClient}
   */
  exports.instance = new exports();

  return exports;
}));

}).call(this,require("buffer").Buffer)
},{"buffer":81,"fs":80,"querystring":85,"superagent":2}],10:[function(require,module,exports){
/**
 * quantimodo
 * We make it easy to retrieve and analyze normalized user data from a wide array of devices and applications. Check out our [docs and sdk's](https://github.com/QuantiModo/docs) or [contact us](https://help.quantimo.do).
 *
 * OpenAPI spec version: 5.8.112511
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.3.1
 *
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/CommonResponse', 'model/Correlation', 'model/GetCorrelationsResponse', 'model/JsonErrorResponse', 'model/Study', 'model/Vote', 'model/VoteDelete'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('../model/CommonResponse'), require('../model/Correlation'), require('../model/GetCorrelationsResponse'), require('../model/JsonErrorResponse'), require('../model/Study'), require('../model/Vote'), require('../model/VoteDelete'));
  } else {
    // Browser globals (root is window)
    if (!root.Quantimodo) {
      root.Quantimodo = {};
    }
    root.Quantimodo.AnalyticsApi = factory(root.Quantimodo.ApiClient, root.Quantimodo.CommonResponse, root.Quantimodo.Correlation, root.Quantimodo.GetCorrelationsResponse, root.Quantimodo.JsonErrorResponse, root.Quantimodo.Study, root.Quantimodo.Vote, root.Quantimodo.VoteDelete);
  }
}(this, function(ApiClient, CommonResponse, Correlation, GetCorrelationsResponse, JsonErrorResponse, Study, Vote, VoteDelete) {
  'use strict';

  /**
   * Analytics service.
   * @module api/AnalyticsApi
   * @version 5.8.112511
   */

  /**
   * Constructs a new AnalyticsApi. 
   * @alias module:api/AnalyticsApi
   * @class
   * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
   * default to {@link module:ApiClient#instance} if unspecified.
   */
  var exports = function(apiClient) {
    this.apiClient = apiClient || ApiClient.instance;


    /**
     * Callback function to receive the result of the deleteVote operation.
     * @callback module:api/AnalyticsApi~deleteVoteCallback
     * @param {String} error Error message, if any.
     * @param {module:model/CommonResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Delete vote
     * Delete previously posted vote
     * @param {module:model/VoteDelete} body The cause and effect variable names for the predictor vote to be deleted.
     * @param {Object} opts Optional parameters
     * @param {Number} opts.userId User&#39;s id
     * @param {module:api/AnalyticsApi~deleteVoteCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/CommonResponse}
     */
    this.deleteVote = function(body, opts, callback) {
      opts = opts || {};
      var postBody = body;

      // verify the required parameter 'body' is set
      if (body === undefined || body === null) {
        throw new Error("Missing the required parameter 'body' when calling deleteVote");
      }


      var pathParams = {
      };
      var queryParams = {
        'userId': opts['userId'],
      };
      var collectionQueryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['access_token', 'quantimodo_oauth2'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = CommonResponse;

      return this.apiClient.callApi(
        '/v3/votes/delete', 'DELETE',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the getCorrelationExplanations operation.
     * @callback module:api/AnalyticsApi~getCorrelationExplanationsCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/Correlation>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Get correlation explanations
     * Get explanations of  correlations based on data from a single user.
     * @param {Object} opts Optional parameters
     * @param {String} opts.causeVariableName Variable name of the hypothetical cause variable.  Example: Sleep Duration
     * @param {String} opts.effectVariableName Variable name of the hypothetical effect variable.  Example: Overall Mood
     * @param {module:api/AnalyticsApi~getCorrelationExplanationsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Array.<module:model/Correlation>}
     */
    this.getCorrelationExplanations = function(opts, callback) {
      opts = opts || {};
      var postBody = null;


      var pathParams = {
      };
      var queryParams = {
        'causeVariableName': opts['causeVariableName'],
        'effectVariableName': opts['effectVariableName'],
      };
      var collectionQueryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['access_token', 'quantimodo_oauth2'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = [Correlation];

      return this.apiClient.callApi(
        '/v3/correlations/explanations', 'GET',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the getCorrelations operation.
     * @callback module:api/AnalyticsApi~getCorrelationsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/GetCorrelationsResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Get correlations
     * Get a list of correlations that can be used to display top predictors of a given outcome like mood, for instance.
     * @param {Object} opts Optional parameters
     * @param {String} opts.causeVariableName Variable name of the hypothetical cause variable.  Example: Sleep Duration
     * @param {String} opts.effectVariableName Variable name of the hypothetical effect variable.  Example: Overall Mood
     * @param {String} opts.sort Sort by one of the listed field names. If the field name is prefixed with &#x60;-&#x60;, it will sort in descending order.
     * @param {Number} opts.limit The LIMIT is used to limit the number of results returned. So if youhave 1000 results, but only want to the first 10, you would set this to 10 and offset to 0. The maximum limit is 200 records. (default to 100)
     * @param {Number} opts.offset OFFSET says to skip that many rows before beginning to return rows to the client. OFFSET 0 is the same as omitting the OFFSET clause.If both OFFSET and LIMIT appear, then OFFSET rows are skipped before starting to count the LIMIT rows that are returned.
     * @param {Number} opts.userId User&#39;s id
     * @param {String} opts.correlationCoefficient Pearson correlation coefficient between cause and effect after lagging by onset delay and grouping by duration of action
     * @param {String} opts.updatedAt When the record was last updated. Use UTC ISO 8601 YYYY-MM-DDThh:mm:ss datetime format. Time zone should be UTC and not local.
     * @param {Boolean} opts.outcomesOfInterest Only include correlations for which the effect is an outcome of interest for the user
     * @param {String} opts.clientId Example: oauth_test_client
     * @param {Boolean} opts.commonOnly Return only public, anonymized and aggregated population data instead of user-specific variables
     * @param {module:model/String} opts.platform Example: chrome, android, ios, web
     * @param {module:api/AnalyticsApi~getCorrelationsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/GetCorrelationsResponse}
     */
    this.getCorrelations = function(opts, callback) {
      opts = opts || {};
      var postBody = null;


      var pathParams = {
      };
      var queryParams = {
        'causeVariableName': opts['causeVariableName'],
        'effectVariableName': opts['effectVariableName'],
        'sort': opts['sort'],
        'limit': opts['limit'],
        'offset': opts['offset'],
        'userId': opts['userId'],
        'correlationCoefficient': opts['correlationCoefficient'],
        'updatedAt': opts['updatedAt'],
        'outcomesOfInterest': opts['outcomesOfInterest'],
        'clientId': opts['clientId'],
        'commonOnly': opts['commonOnly'],
        'platform': opts['platform'],
      };
      var collectionQueryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['access_token', 'quantimodo_oauth2'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = GetCorrelationsResponse;

      return this.apiClient.callApi(
        '/v3/correlations', 'GET',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the getStudy operation.
     * @callback module:api/AnalyticsApi~getStudyCallback
     * @param {String} error Error message, if any.
     * @param {module:model/Study} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Get Study
     * Get Study
     * @param {Object} opts Optional parameters
     * @param {String} opts.causeVariableName Variable name of the hypothetical cause variable.  Example: Sleep Duration
     * @param {String} opts.effectVariableName Variable name of the hypothetical effect variable.  Example: Overall Mood
     * @param {Number} opts.userId User&#39;s id
     * @param {String} opts.appName Example: MoodiModo
     * @param {String} opts.clientId Example: oauth_test_client
     * @param {Boolean} opts.includeCharts Highcharts configs that can be used if you have highcharts.js included on the page.  This only works if the id or name query parameter is also provided.
     * @param {module:model/String} opts.platform Example: chrome, android, ios, web
     * @param {Boolean} opts.recalculate Recalculate instead of using cached analysis
     * @param {module:api/AnalyticsApi~getStudyCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/Study}
     */
    this.getStudy = function(opts, callback) {
      opts = opts || {};
      var postBody = null;


      var pathParams = {
      };
      var queryParams = {
        'causeVariableName': opts['causeVariableName'],
        'effectVariableName': opts['effectVariableName'],
        'userId': opts['userId'],
        'appName': opts['appName'],
        'clientId': opts['clientId'],
        'includeCharts': opts['includeCharts'],
        'platform': opts['platform'],
        'recalculate': opts['recalculate'],
      };
      var collectionQueryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['access_token', 'quantimodo_oauth2'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = Study;

      return this.apiClient.callApi(
        '/v4/study', 'GET',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the postVote operation.
     * @callback module:api/AnalyticsApi~postVoteCallback
     * @param {String} error Error message, if any.
     * @param {module:model/CommonResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Post or update vote
     * This is to enable users to indicate their opinion on the plausibility of a causal relationship between a treatment and outcome. We incorporates crowd-sourced plausibility estimations into our algorithm. This is done allowing user to indicate their view of the plausibility of each relationship with thumbs up/down buttons placed next to each prediction.
     * @param {module:model/Vote} body Contains the cause variable, effect variable, and vote value.
     * @param {Object} opts Optional parameters
     * @param {Number} opts.userId User&#39;s id
     * @param {module:api/AnalyticsApi~postVoteCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/CommonResponse}
     */
    this.postVote = function(body, opts, callback) {
      opts = opts || {};
      var postBody = body;

      // verify the required parameter 'body' is set
      if (body === undefined || body === null) {
        throw new Error("Missing the required parameter 'body' when calling postVote");
      }


      var pathParams = {
      };
      var queryParams = {
        'userId': opts['userId'],
      };
      var collectionQueryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['access_token', 'quantimodo_oauth2'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = CommonResponse;

      return this.apiClient.callApi(
        '/v3/votes', 'POST',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
  };

  return exports;
}));

},{"../ApiClient":9,"../model/CommonResponse":26,"../model/Correlation":30,"../model/GetCorrelationsResponse":37,"../model/JsonErrorResponse":40,"../model/Study":57,"../model/Vote":77,"../model/VoteDelete":78}],11:[function(require,module,exports){
/**
 * quantimodo
 * We make it easy to retrieve and analyze normalized user data from a wide array of devices and applications. Check out our [docs and sdk's](https://github.com/QuantiModo/docs) or [contact us](https://help.quantimo.do).
 *
 * OpenAPI spec version: 5.8.112511
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.3.1
 *
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/AppSettingsResponse', 'model/JsonErrorResponse'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('../model/AppSettingsResponse'), require('../model/JsonErrorResponse'));
  } else {
    // Browser globals (root is window)
    if (!root.Quantimodo) {
      root.Quantimodo = {};
    }
    root.Quantimodo.AppSettingsApi = factory(root.Quantimodo.ApiClient, root.Quantimodo.AppSettingsResponse, root.Quantimodo.JsonErrorResponse);
  }
}(this, function(ApiClient, AppSettingsResponse, JsonErrorResponse) {
  'use strict';

  /**
   * AppSettings service.
   * @module api/AppSettingsApi
   * @version 5.8.112511
   */

  /**
   * Constructs a new AppSettingsApi. 
   * @alias module:api/AppSettingsApi
   * @class
   * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
   * default to {@link module:ApiClient#instance} if unspecified.
   */
  var exports = function(apiClient) {
    this.apiClient = apiClient || ApiClient.instance;


    /**
     * Callback function to receive the result of the getAppSettings operation.
     * @callback module:api/AppSettingsApi~getAppSettingsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/AppSettingsResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Get client app Settings
     * Get QuantiModo client app settings
     * @param {Object} opts Optional parameters
     * @param {String} opts.clientId Example: oauth_test_client
     * @param {String} opts.clientSecret This is the secret for your obtained clientId. We use this to ensure that only your application uses the clientId.  Obtain this by creating a free application at [https://app.quantimo.do/api/v2/apps](https://app.quantimo.do/api/v2/apps).
     * @param {module:model/String} opts.platform Example: chrome, android, ios, web
     * @param {module:api/AppSettingsApi~getAppSettingsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/AppSettingsResponse}
     */
    this.getAppSettings = function(opts, callback) {
      opts = opts || {};
      var postBody = null;


      var pathParams = {
      };
      var queryParams = {
        'clientId': opts['clientId'],
        'client_secret': opts['clientSecret'],
        'platform': opts['platform'],
      };
      var collectionQueryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = [];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = AppSettingsResponse;

      return this.apiClient.callApi(
        '/v3/appSettings', 'GET',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
  };

  return exports;
}));

},{"../ApiClient":9,"../model/AppSettingsResponse":23,"../model/JsonErrorResponse":40}],12:[function(require,module,exports){
/**
 * quantimodo
 * We make it easy to retrieve and analyze normalized user data from a wide array of devices and applications. Check out our [docs and sdk's](https://github.com/QuantiModo/docs) or [contact us](https://help.quantimo.do).
 *
 * OpenAPI spec version: 5.8.112511
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.3.1
 *
 * Do not edit the class manually.
 *
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
    if (!root.Quantimodo) {
      root.Quantimodo = {};
    }
    root.Quantimodo.AuthenticationApi = factory(root.Quantimodo.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';

  /**
   * Authentication service.
   * @module api/AuthenticationApi
   * @version 5.8.112511
   */

  /**
   * Constructs a new AuthenticationApi. 
   * @alias module:api/AuthenticationApi
   * @class
   * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
   * default to {@link module:ApiClient#instance} if unspecified.
   */
  var exports = function(apiClient) {
    this.apiClient = apiClient || ApiClient.instance;


    /**
     * Callback function to receive the result of the getAccessToken operation.
     * @callback module:api/AuthenticationApi~getAccessTokenCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Get a user access token
     * Client provides authorization token obtained from /api/v3/oauth2/authorize to this endpoint and receives an access token. Access token can then be used to query API endpoints. ### Request Access Token After user approves your access to the given scope form the https:/app.quantimo.do/v2/oauth2/authorize endpoint, you&#39;ll receive an authorization code to request an access token. This time make a &#x60;POST&#x60; request to &#x60;/api/v2/oauth/access_token&#x60; with parameters including: * &#x60;grant_type&#x60; Can be &#x60;authorization_code&#x60; or &#x60;refresh_token&#x60; since we are getting the &#x60;access_token&#x60; for the first time we don&#39;t have a &#x60;refresh_token&#x60; so this must be &#x60;authorization_code&#x60;. * &#x60;code&#x60; Authorization code you received with the previous request. * &#x60;redirect_uri&#x60; Your application&#39;s redirect url. ### Refreshing Access Token Access tokens expire at some point, to continue using our api you need to refresh them with &#x60;refresh_token&#x60; you received along with the &#x60;access_token&#x60;. To do this make a &#x60;POST&#x60; request to &#x60;/api/v2/oauth/access_token&#x60; with correct parameters, which are: * &#x60;grant_type&#x60; This time grant type must be &#x60;refresh_token&#x60; since we have it. * &#x60;clientId&#x60; Your application&#39;s client id. * &#x60;client_secret&#x60; Your application&#39;s client secret. * &#x60;refresh_token&#x60; The refresh token you received with the &#x60;access_token&#x60;. Every request you make to this endpoint will give you a new refresh token and make the old one expired. So you can keep getting new access tokens with new refresh tokens. ### Using Access Token Currently we support 2 ways for this, you can&#39;t use both at the same time. * Adding access token to the request header as &#x60;Authorization: Bearer {access_token}&#x60; * Adding to the url as a query parameter &#x60;?access_token&#x3D;{access_token}&#x60; You can read more about OAuth2 from [here](http://oauth.net/2/)
     * @param {String} grantType Grant Type can be &#39;authorization_code&#39; or &#39;refresh_token&#39;
     * @param {String} code Authorization code you received with the previous request.
     * @param {String} responseType If the value is code, launches a Basic flow, requiring a POST to the token endpoint to obtain the tokens. If the value is token id_token or id_token token, launches an Implicit flow, requiring the use of Javascript at the redirect URI to retrieve tokens from the URI #fragment.
     * @param {String} scope Scopes include basic, readmeasurements, and writemeasurements. The &#x60;basic&#x60; scope allows you to read user info (displayName, email, etc). The &#x60;readmeasurements&#x60; scope allows one to read a user&#39;s data. The &#x60;writemeasurements&#x60; scope allows you to write user data. Separate multiple scopes by a space.
     * @param {Object} opts Optional parameters
     * @param {String} opts.clientId Example: oauth_test_client
     * @param {String} opts.clientSecret This is the secret for your obtained clientId. We use this to ensure that only your application uses the clientId.  Obtain this by creating a free application at [https://app.quantimo.do/api/v2/apps](https://app.quantimo.do/api/v2/apps).
     * @param {String} opts.redirectUri The redirect URI is the URL within your client application that will receive the OAuth2 credentials.
     * @param {String} opts.state An opaque string that is round-tripped in the protocol; that is to say, it is returned as a URI parameter in the Basic flow, and in the URI
     * @param {module:model/String} opts.platform Example: chrome, android, ios, web
     * @param {module:api/AuthenticationApi~getAccessTokenCallback} callback The callback function, accepting three arguments: error, data, response
     */
    this.getAccessToken = function(grantType, code, responseType, scope, opts, callback) {
      opts = opts || {};
      var postBody = null;

      // verify the required parameter 'grantType' is set
      if (grantType === undefined || grantType === null) {
        throw new Error("Missing the required parameter 'grantType' when calling getAccessToken");
      }

      // verify the required parameter 'code' is set
      if (code === undefined || code === null) {
        throw new Error("Missing the required parameter 'code' when calling getAccessToken");
      }

      // verify the required parameter 'responseType' is set
      if (responseType === undefined || responseType === null) {
        throw new Error("Missing the required parameter 'responseType' when calling getAccessToken");
      }

      // verify the required parameter 'scope' is set
      if (scope === undefined || scope === null) {
        throw new Error("Missing the required parameter 'scope' when calling getAccessToken");
      }


      var pathParams = {
      };
      var queryParams = {
        'clientId': opts['clientId'],
        'client_secret': opts['clientSecret'],
        'grant_type': grantType,
        'code': code,
        'response_type': responseType,
        'scope': scope,
        'redirect_uri': opts['redirectUri'],
        'state': opts['state'],
        'platform': opts['platform'],
      };
      var collectionQueryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['access_token', 'quantimodo_oauth2'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = null;

      return this.apiClient.callApi(
        '/v3/oauth2/token', 'GET',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the getOauthAuthorizationCode operation.
     * @callback module:api/AuthenticationApi~getOauthAuthorizationCodeCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Request Authorization Code
     * You can implement OAuth2 authentication to your application using our **OAuth2** endpoints.  You need to redirect users to &#x60;/api/v3/oauth2/authorize&#x60; endpoint to get an authorization code and include the parameters below.   This page will ask the user if they want to allow a client&#39;s application to submit or obtain data from their QM account. It will redirect the user to the url provided by the client application with the code as a query parameter or error in case of an error. See the /api/v2/oauth/access_token endpoint for the next steps.
     * @param {String} responseType If the value is code, launches a Basic flow, requiring a POST to the token endpoint to obtain the tokens. If the value is token id_token or id_token token, launches an Implicit flow, requiring the use of Javascript at the redirect URI to retrieve tokens from the URI #fragment.
     * @param {String} scope Scopes include basic, readmeasurements, and writemeasurements. The &#x60;basic&#x60; scope allows you to read user info (displayName, email, etc). The &#x60;readmeasurements&#x60; scope allows one to read a user&#39;s data. The &#x60;writemeasurements&#x60; scope allows you to write user data. Separate multiple scopes by a space.
     * @param {Object} opts Optional parameters
     * @param {String} opts.clientId Example: oauth_test_client
     * @param {String} opts.clientSecret This is the secret for your obtained clientId. We use this to ensure that only your application uses the clientId.  Obtain this by creating a free application at [https://app.quantimo.do/api/v2/apps](https://app.quantimo.do/api/v2/apps).
     * @param {String} opts.redirectUri The redirect URI is the URL within your client application that will receive the OAuth2 credentials.
     * @param {String} opts.state An opaque string that is round-tripped in the protocol; that is to say, it is returned as a URI parameter in the Basic flow, and in the URI
     * @param {module:model/String} opts.platform Example: chrome, android, ios, web
     * @param {module:api/AuthenticationApi~getOauthAuthorizationCodeCallback} callback The callback function, accepting three arguments: error, data, response
     */
    this.getOauthAuthorizationCode = function(responseType, scope, opts, callback) {
      opts = opts || {};
      var postBody = null;

      // verify the required parameter 'responseType' is set
      if (responseType === undefined || responseType === null) {
        throw new Error("Missing the required parameter 'responseType' when calling getOauthAuthorizationCode");
      }

      // verify the required parameter 'scope' is set
      if (scope === undefined || scope === null) {
        throw new Error("Missing the required parameter 'scope' when calling getOauthAuthorizationCode");
      }


      var pathParams = {
      };
      var queryParams = {
        'clientId': opts['clientId'],
        'client_secret': opts['clientSecret'],
        'response_type': responseType,
        'scope': scope,
        'redirect_uri': opts['redirectUri'],
        'state': opts['state'],
        'platform': opts['platform'],
      };
      var collectionQueryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['access_token', 'quantimodo_oauth2'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = null;

      return this.apiClient.callApi(
        '/v3/oauth2/authorize', 'GET',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the postGoogleIdToken operation.
     * @callback module:api/AuthenticationApi~postGoogleIdTokenCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Post GoogleIdToken
     * Post GoogleIdToken
     * @param {module:api/AuthenticationApi~postGoogleIdTokenCallback} callback The callback function, accepting three arguments: error, data, response
     */
    this.postGoogleIdToken = function(callback) {
      var postBody = null;


      var pathParams = {
      };
      var queryParams = {
      };
      var collectionQueryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = [];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = null;

      return this.apiClient.callApi(
        '/v3/googleIdToken', 'POST',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
  };

  return exports;
}));

},{"../ApiClient":9}],13:[function(require,module,exports){
/**
 * quantimodo
 * We make it easy to retrieve and analyze normalized user data from a wide array of devices and applications. Check out our [docs and sdk's](https://github.com/QuantiModo/docs) or [contact us](https://help.quantimo.do).
 *
 * OpenAPI spec version: 5.8.112511
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.3.1
 *
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/GetConnectorsResponse'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('../model/GetConnectorsResponse'));
  } else {
    // Browser globals (root is window)
    if (!root.Quantimodo) {
      root.Quantimodo = {};
    }
    root.Quantimodo.ConnectorsApi = factory(root.Quantimodo.ApiClient, root.Quantimodo.GetConnectorsResponse);
  }
}(this, function(ApiClient, GetConnectorsResponse) {
  'use strict';

  /**
   * Connectors service.
   * @module api/ConnectorsApi
   * @version 5.8.112511
   */

  /**
   * Constructs a new ConnectorsApi. 
   * @alias module:api/ConnectorsApi
   * @class
   * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
   * default to {@link module:ApiClient#instance} if unspecified.
   */
  var exports = function(apiClient) {
    this.apiClient = apiClient || ApiClient.instance;


    /**
     * Callback function to receive the result of the connectConnector operation.
     * @callback module:api/ConnectorsApi~connectConnectorCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Obtain a token from 3rd party data source
     * Attempt to obtain a token from the data provider, store it in the database. With this, the connector to continue to obtain new user data until the token is revoked.
     * @param {module:model/String} connectorName Lowercase system name of the source application or device. Get a list of available connectors from the /v3/connectors/list endpoint.
     * @param {Object} opts Optional parameters
     * @param {Number} opts.userId User&#39;s id
     * @param {module:api/ConnectorsApi~connectConnectorCallback} callback The callback function, accepting three arguments: error, data, response
     */
    this.connectConnector = function(connectorName, opts, callback) {
      opts = opts || {};
      var postBody = null;

      // verify the required parameter 'connectorName' is set
      if (connectorName === undefined || connectorName === null) {
        throw new Error("Missing the required parameter 'connectorName' when calling connectConnector");
      }


      var pathParams = {
        'connectorName': connectorName
      };
      var queryParams = {
        'userId': opts['userId'],
      };
      var collectionQueryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['access_token', 'quantimodo_oauth2'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = null;

      return this.apiClient.callApi(
        '/v3/connectors/{connectorName}/connect', 'GET',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the disconnectConnector operation.
     * @callback module:api/ConnectorsApi~disconnectConnectorCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Delete stored connection info
     * The disconnect method deletes any stored tokens or connection information from the connectors database.
     * @param {module:model/String} connectorName Lowercase system name of the source application or device. Get a list of available connectors from the /v3/connectors/list endpoint.
     * @param {module:api/ConnectorsApi~disconnectConnectorCallback} callback The callback function, accepting three arguments: error, data, response
     */
    this.disconnectConnector = function(connectorName, callback) {
      var postBody = null;

      // verify the required parameter 'connectorName' is set
      if (connectorName === undefined || connectorName === null) {
        throw new Error("Missing the required parameter 'connectorName' when calling disconnectConnector");
      }


      var pathParams = {
        'connectorName': connectorName
      };
      var queryParams = {
      };
      var collectionQueryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['access_token', 'quantimodo_oauth2'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = null;

      return this.apiClient.callApi(
        '/v3/connectors/{connectorName}/disconnect', 'GET',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the getConnectors operation.
     * @callback module:api/ConnectorsApi~getConnectorsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/GetConnectorsResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * List of Connectors
     * A connector pulls data from other data providers using their API or a screenscraper. Returns a list of all available connectors and information about them such as their id, name, whether the user has provided access, logo url, connection instructions, and the update history.
     * @param {Object} opts Optional parameters
     * @param {String} opts.appName Example: MoodiModo
     * @param {String} opts.clientId Example: oauth_test_client
     * @param {module:model/String} opts.platform Example: chrome, android, ios, web
     * @param {module:api/ConnectorsApi~getConnectorsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/GetConnectorsResponse}
     */
    this.getConnectors = function(opts, callback) {
      opts = opts || {};
      var postBody = null;


      var pathParams = {
      };
      var queryParams = {
        'appName': opts['appName'],
        'clientId': opts['clientId'],
        'platform': opts['platform'],
      };
      var collectionQueryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['access_token', 'quantimodo_oauth2'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = GetConnectorsResponse;

      return this.apiClient.callApi(
        '/v3/connectors/list', 'GET',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the getIntegrationJs operation.
     * @callback module:api/ConnectorsApi~getIntegrationJsCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Get embeddable connect javascript
     * Get embeddable connect javascript. Usage:   - Embedding in applications with popups for 3rd-party authentication windows.     Use &#x60;qmSetupInPopup&#x60; function after connecting &#x60;connect.js&#x60;.   - Embedding in applications with popups for 3rd-party authentication windows.     Requires a selector to block. It will be embedded in this block.     Use &#x60;qmSetupOnPage&#x60; function after connecting &#x60;connect.js&#x60;.   - Embedding in mobile applications without popups for 3rd-party authentication.     Use &#x60;qmSetupOnMobile&#x60; function after connecting &#x60;connect.js&#x60;.     If using in a Cordova application call  &#x60;qmSetupOnIonic&#x60; function after connecting &#x60;connect.js&#x60;.
     * @param {Object} opts Optional parameters
     * @param {String} opts.clientId Example: oauth_test_client
     * @param {module:model/String} opts.platform Example: chrome, android, ios, web
     * @param {module:api/ConnectorsApi~getIntegrationJsCallback} callback The callback function, accepting three arguments: error, data, response
     */
    this.getIntegrationJs = function(opts, callback) {
      opts = opts || {};
      var postBody = null;


      var pathParams = {
      };
      var queryParams = {
        'clientId': opts['clientId'],
        'platform': opts['platform'],
      };
      var collectionQueryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = [];
      var contentTypes = ['application/json'];
      var accepts = ['application/x-javascript'];
      var returnType = null;

      return this.apiClient.callApi(
        '/v3/integration.js', 'GET',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the getMobileConnectPage operation.
     * @callback module:api/ConnectorsApi~getMobileConnectPageCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Mobile connect page
     * This page is designed to be opened in a webview.  Instead of using popup authentication boxes, it uses redirection. You can include the user&#39;s access_token as a URL parameter like https://app.quantimo.do/api/v3/connect/mobile?access_token&#x3D;123
     * @param {Object} opts Optional parameters
     * @param {Number} opts.userId User&#39;s id
     * @param {module:api/ConnectorsApi~getMobileConnectPageCallback} callback The callback function, accepting three arguments: error, data, response
     */
    this.getMobileConnectPage = function(opts, callback) {
      opts = opts || {};
      var postBody = null;


      var pathParams = {
      };
      var queryParams = {
        'userId': opts['userId'],
      };
      var collectionQueryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = [];
      var contentTypes = ['application/json'];
      var accepts = ['text/html'];
      var returnType = null;

      return this.apiClient.callApi(
        '/v3/connect/mobile', 'GET',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the updateConnector operation.
     * @callback module:api/ConnectorsApi~updateConnectorCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Sync with data source
     * The update method tells the QM Connector Framework to check with the data provider (such as Fitbit or MyFitnessPal) and retrieve any new measurements available.
     * @param {module:model/String} connectorName Lowercase system name of the source application or device. Get a list of available connectors from the /v3/connectors/list endpoint.
     * @param {Object} opts Optional parameters
     * @param {Number} opts.userId User&#39;s id
     * @param {module:api/ConnectorsApi~updateConnectorCallback} callback The callback function, accepting three arguments: error, data, response
     */
    this.updateConnector = function(connectorName, opts, callback) {
      opts = opts || {};
      var postBody = null;

      // verify the required parameter 'connectorName' is set
      if (connectorName === undefined || connectorName === null) {
        throw new Error("Missing the required parameter 'connectorName' when calling updateConnector");
      }


      var pathParams = {
        'connectorName': connectorName
      };
      var queryParams = {
        'userId': opts['userId'],
      };
      var collectionQueryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['access_token', 'quantimodo_oauth2'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = null;

      return this.apiClient.callApi(
        '/v3/connectors/{connectorName}/update', 'GET',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
  };

  return exports;
}));

},{"../ApiClient":9,"../model/GetConnectorsResponse":35}],14:[function(require,module,exports){
/**
 * quantimodo
 * We make it easy to retrieve and analyze normalized user data from a wide array of devices and applications. Check out our [docs and sdk's](https://github.com/QuantiModo/docs) or [contact us](https://help.quantimo.do).
 *
 * OpenAPI spec version: 5.8.112511
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.3.1
 *
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/CommonResponse', 'model/Measurement', 'model/MeasurementDelete', 'model/MeasurementSet', 'model/MeasurementUpdate', 'model/Pair', 'model/PostMeasurementsResponse'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('../model/CommonResponse'), require('../model/Measurement'), require('../model/MeasurementDelete'), require('../model/MeasurementSet'), require('../model/MeasurementUpdate'), require('../model/Pair'), require('../model/PostMeasurementsResponse'));
  } else {
    // Browser globals (root is window)
    if (!root.Quantimodo) {
      root.Quantimodo = {};
    }
    root.Quantimodo.MeasurementsApi = factory(root.Quantimodo.ApiClient, root.Quantimodo.CommonResponse, root.Quantimodo.Measurement, root.Quantimodo.MeasurementDelete, root.Quantimodo.MeasurementSet, root.Quantimodo.MeasurementUpdate, root.Quantimodo.Pair, root.Quantimodo.PostMeasurementsResponse);
  }
}(this, function(ApiClient, CommonResponse, Measurement, MeasurementDelete, MeasurementSet, MeasurementUpdate, Pair, PostMeasurementsResponse) {
  'use strict';

  /**
   * Measurements service.
   * @module api/MeasurementsApi
   * @version 5.8.112511
   */

  /**
   * Constructs a new MeasurementsApi. 
   * @alias module:api/MeasurementsApi
   * @class
   * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
   * default to {@link module:ApiClient#instance} if unspecified.
   */
  var exports = function(apiClient) {
    this.apiClient = apiClient || ApiClient.instance;


    /**
     * Callback function to receive the result of the deleteMeasurement operation.
     * @callback module:api/MeasurementsApi~deleteMeasurementCallback
     * @param {String} error Error message, if any.
     * @param {module:model/CommonResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Delete a measurement
     * Delete a previously submitted measurement
     * @param {module:model/MeasurementDelete} body The startTime and variableId of the measurement to be deleted.
     * @param {module:api/MeasurementsApi~deleteMeasurementCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/CommonResponse}
     */
    this.deleteMeasurement = function(body, callback) {
      var postBody = body;

      // verify the required parameter 'body' is set
      if (body === undefined || body === null) {
        throw new Error("Missing the required parameter 'body' when calling deleteMeasurement");
      }


      var pathParams = {
      };
      var queryParams = {
      };
      var collectionQueryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['access_token', 'quantimodo_oauth2'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = CommonResponse;

      return this.apiClient.callApi(
        '/v3/measurements/delete', 'DELETE',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the getMeasurements operation.
     * @callback module:api/MeasurementsApi~getMeasurementsCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/Measurement>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Get measurements for this user
     * Measurements are any value that can be recorded like daily steps, a mood rating, or apples eaten.
     * @param {Object} opts Optional parameters
     * @param {String} opts.variableName Name of the variable you want measurements for
     * @param {String} opts.sort Sort by one of the listed field names. If the field name is prefixed with &#x60;-&#x60;, it will sort in descending order.
     * @param {Number} opts.limit The LIMIT is used to limit the number of results returned. So if youhave 1000 results, but only want to the first 10, you would set this to 10 and offset to 0. The maximum limit is 200 records. (default to 100)
     * @param {Number} opts.offset OFFSET says to skip that many rows before beginning to return rows to the client. OFFSET 0 is the same as omitting the OFFSET clause.If both OFFSET and LIMIT appear, then OFFSET rows are skipped before starting to count the LIMIT rows that are returned.
     * @param {module:model/String} opts.variableCategoryName Limit results to a specific variable category
     * @param {String} opts.updatedAt When the record was last updated. Use UTC ISO 8601 YYYY-MM-DDThh:mm:ss datetime format. Time zone should be UTC and not local.
     * @param {Number} opts.userId User&#39;s id
     * @param {String} opts.sourceName ID of the source you want measurements for (supports exact name match only)
     * @param {String} opts.connectorName Example: facebook
     * @param {String} opts.value Value of measurement
     * @param {module:model/String} opts.unitName Example: Milligrams
     * @param {String} opts.earliestMeasurementTime Excluded records with measurement times earlier than this value. Use UTC ISO 8601 YYYY-MM-DDThh:mm:ss  datetime format. Time zone should be UTC and not local.
     * @param {String} opts.latestMeasurementTime Excluded records with measurement times later than this value. Use UTC ISO 8601 YYYY-MM-DDThh:mm:ss  datetime format. Time zone should be UTC and not local.
     * @param {String} opts.createdAt When the record was first created. Use UTC ISO 8601 YYYY-MM-DDThh:mm:ss datetime format. Time zone should be UTC and not local.
     * @param {Number} opts.id Measurement id
     * @param {Number} opts.groupingWidth The time (in seconds) over which measurements are grouped together
     * @param {String} opts.groupingTimezone The time (in seconds) over which measurements are grouped together
     * @param {Boolean} opts.doNotProcess Example: true
     * @param {String} opts.appName Example: MoodiModo
     * @param {String} opts.clientId Example: oauth_test_client
     * @param {Boolean} opts.doNotConvert Example: 1
     * @param {Boolean} opts.minMaxFilter Example: 1
     * @param {module:model/String} opts.platform Example: chrome, android, ios, web
     * @param {module:api/MeasurementsApi~getMeasurementsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Array.<module:model/Measurement>}
     */
    this.getMeasurements = function(opts, callback) {
      opts = opts || {};
      var postBody = null;


      var pathParams = {
      };
      var queryParams = {
        'variableName': opts['variableName'],
        'sort': opts['sort'],
        'limit': opts['limit'],
        'offset': opts['offset'],
        'variableCategoryName': opts['variableCategoryName'],
        'updatedAt': opts['updatedAt'],
        'userId': opts['userId'],
        'sourceName': opts['sourceName'],
        'connectorName': opts['connectorName'],
        'value': opts['value'],
        'unitName': opts['unitName'],
        'earliestMeasurementTime': opts['earliestMeasurementTime'],
        'latestMeasurementTime': opts['latestMeasurementTime'],
        'createdAt': opts['createdAt'],
        'id': opts['id'],
        'groupingWidth': opts['groupingWidth'],
        'groupingTimezone': opts['groupingTimezone'],
        'doNotProcess': opts['doNotProcess'],
        'appName': opts['appName'],
        'clientId': opts['clientId'],
        'doNotConvert': opts['doNotConvert'],
        'minMaxFilter': opts['minMaxFilter'],
        'platform': opts['platform'],
      };
      var collectionQueryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['access_token', 'quantimodo_oauth2'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = [Measurement];

      return this.apiClient.callApi(
        '/v3/measurements', 'GET',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the getPairs operation.
     * @callback module:api/MeasurementsApi~getPairsCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/Pair>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Get pairs of measurements for correlational analysis
     * Pairs cause measurements with effect measurements grouped over the duration of action after the onset delay.
     * @param {Object} opts Optional parameters
     * @param {String} opts.causeVariableName Variable name of the hypothetical cause variable.  Example: Sleep Duration
     * @param {String} opts.effectVariableName Variable name of the hypothetical effect variable.  Example: Overall Mood
     * @param {String} opts.effectUnitName Name for the unit effect measurements to be returned in
     * @param {Number} opts.userId User&#39;s id
     * @param {String} opts.causeUnitName Name for the unit cause measurements to be returned in
     * @param {String} opts.onsetDelay The amount of time in seconds that elapses after the predictor/stimulus event before the outcome as perceived by a self-tracker is known as the onset delay. For example, the onset delay between the time a person takes an aspirin (predictor/stimulus event) and the time a person perceives a change in their headache severity (outcome) is approximately 30 minutes.
     * @param {String} opts.durationOfAction The amount of time over which a predictor/stimulus event can exert an observable influence on an outcome variable value. For instance, aspirin (stimulus/predictor) typically decreases headache severity for approximately four hours (duration of action) following the onset delay.
     * @param {String} opts.earliestMeasurementTime Excluded records with measurement times earlier than this value. Use UTC ISO 8601 YYYY-MM-DDThh:mm:ss  datetime format. Time zone should be UTC and not local.
     * @param {String} opts.latestMeasurementTime Excluded records with measurement times later than this value. Use UTC ISO 8601 YYYY-MM-DDThh:mm:ss  datetime format. Time zone should be UTC and not local.
     * @param {Number} opts.limit The LIMIT is used to limit the number of results returned. So if youhave 1000 results, but only want to the first 10, you would set this to 10 and offset to 0. The maximum limit is 200 records. (default to 100)
     * @param {Number} opts.offset OFFSET says to skip that many rows before beginning to return rows to the client. OFFSET 0 is the same as omitting the OFFSET clause.If both OFFSET and LIMIT appear, then OFFSET rows are skipped before starting to count the LIMIT rows that are returned.
     * @param {String} opts.sort Sort by one of the listed field names. If the field name is prefixed with &#x60;-&#x60;, it will sort in descending order.
     * @param {module:api/MeasurementsApi~getPairsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Array.<module:model/Pair>}
     */
    this.getPairs = function(opts, callback) {
      opts = opts || {};
      var postBody = null;


      var pathParams = {
      };
      var queryParams = {
        'causeVariableName': opts['causeVariableName'],
        'effectVariableName': opts['effectVariableName'],
        'effectUnitName': opts['effectUnitName'],
        'userId': opts['userId'],
        'causeUnitName': opts['causeUnitName'],
        'onsetDelay': opts['onsetDelay'],
        'durationOfAction': opts['durationOfAction'],
        'earliestMeasurementTime': opts['earliestMeasurementTime'],
        'latestMeasurementTime': opts['latestMeasurementTime'],
        'limit': opts['limit'],
        'offset': opts['offset'],
        'sort': opts['sort'],
      };
      var collectionQueryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['access_token', 'quantimodo_oauth2'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = [Pair];

      return this.apiClient.callApi(
        '/v3/pairs', 'GET',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the measurementExportRequest operation.
     * @callback module:api/MeasurementsApi~measurementExportRequestCallback
     * @param {String} error Error message, if any.
     * @param {'Number'} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Post Request for Measurements CSV
     * Use this endpoint to schedule a CSV export containing all user measurements to be emailed to the user within 24 hours.
     * @param {Object} opts Optional parameters
     * @param {Number} opts.userId User&#39;s id
     * @param {module:api/MeasurementsApi~measurementExportRequestCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link 'Number'}
     */
    this.measurementExportRequest = function(opts, callback) {
      opts = opts || {};
      var postBody = null;


      var pathParams = {
      };
      var queryParams = {
        'userId': opts['userId'],
      };
      var collectionQueryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['access_token', 'quantimodo_oauth2'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = 'Number';

      return this.apiClient.callApi(
        '/v2/measurements/exportRequest', 'POST',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the postMeasurements operation.
     * @callback module:api/MeasurementsApi~postMeasurementsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/PostMeasurementsResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Post a new set or update existing measurements to the database
     * You can submit or update multiple measurements in a \&quot;measurements\&quot; sub-array.  If the variable these measurements correspond to does not already exist in the database, it will be automatically added.
     * @param {Array.<module:model/MeasurementSet>} body An array of measurement sets containing measurement items you want to insert.
     * @param {Object} opts Optional parameters
     * @param {Number} opts.userId User&#39;s id
     * @param {module:api/MeasurementsApi~postMeasurementsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/PostMeasurementsResponse}
     */
    this.postMeasurements = function(body, opts, callback) {
      opts = opts || {};
      var postBody = body;

      // verify the required parameter 'body' is set
      if (body === undefined || body === null) {
        throw new Error("Missing the required parameter 'body' when calling postMeasurements");
      }


      var pathParams = {
      };
      var queryParams = {
        'userId': opts['userId'],
      };
      var collectionQueryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['access_token', 'quantimodo_oauth2'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = PostMeasurementsResponse;

      return this.apiClient.callApi(
        '/v3/measurements/post', 'POST',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the updateMeasurement operation.
     * @callback module:api/MeasurementsApi~updateMeasurementCallback
     * @param {String} error Error message, if any.
     * @param {module:model/CommonResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Update a measurement
     * Update a previously submitted measurement
     * @param {module:model/MeasurementUpdate} body The id as well as the new startTime, note, and/or value of the measurement to be updated
     * @param {module:api/MeasurementsApi~updateMeasurementCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/CommonResponse}
     */
    this.updateMeasurement = function(body, callback) {
      var postBody = body;

      // verify the required parameter 'body' is set
      if (body === undefined || body === null) {
        throw new Error("Missing the required parameter 'body' when calling updateMeasurement");
      }


      var pathParams = {
      };
      var queryParams = {
      };
      var collectionQueryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['access_token', 'quantimodo_oauth2'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = CommonResponse;

      return this.apiClient.callApi(
        '/v3/measurements/update', 'POST',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
  };

  return exports;
}));

},{"../ApiClient":9,"../model/CommonResponse":26,"../model/Measurement":41,"../model/MeasurementDelete":42,"../model/MeasurementSet":44,"../model/MeasurementUpdate":45,"../model/Pair":46,"../model/PostMeasurementsResponse":50}],15:[function(require,module,exports){
/**
 * quantimodo
 * We make it easy to retrieve and analyze normalized user data from a wide array of devices and applications. Check out our [docs and sdk's](https://github.com/QuantiModo/docs) or [contact us](https://help.quantimo.do).
 *
 * OpenAPI spec version: 5.8.112511
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.3.1
 *
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/DeviceToken'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('../model/DeviceToken'));
  } else {
    // Browser globals (root is window)
    if (!root.Quantimodo) {
      root.Quantimodo = {};
    }
    root.Quantimodo.NotificationsApi = factory(root.Quantimodo.ApiClient, root.Quantimodo.DeviceToken);
  }
}(this, function(ApiClient, DeviceToken) {
  'use strict';

  /**
   * Notifications service.
   * @module api/NotificationsApi
   * @version 5.8.112511
   */

  /**
   * Constructs a new NotificationsApi. 
   * @alias module:api/NotificationsApi
   * @class
   * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
   * default to {@link module:ApiClient#instance} if unspecified.
   */
  var exports = function(apiClient) {
    this.apiClient = apiClient || ApiClient.instance;


    /**
     * Callback function to receive the result of the getNotificationPreferences operation.
     * @callback module:api/NotificationsApi~getNotificationPreferencesCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Get NotificationPreferences
     * Get NotificationPreferences
     * @param {module:api/NotificationsApi~getNotificationPreferencesCallback} callback The callback function, accepting three arguments: error, data, response
     */
    this.getNotificationPreferences = function(callback) {
      var postBody = null;


      var pathParams = {
      };
      var queryParams = {
      };
      var collectionQueryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = [];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = null;

      return this.apiClient.callApi(
        '/v3/notificationPreferences', 'GET',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the postDeviceToken operation.
     * @callback module:api/NotificationsApi~postDeviceTokenCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Post DeviceTokens
     * Post user token for Android, iOS, or web push notifications
     * @param {module:model/DeviceToken} body The platform and token
     * @param {module:api/NotificationsApi~postDeviceTokenCallback} callback The callback function, accepting three arguments: error, data, response
     */
    this.postDeviceToken = function(body, callback) {
      var postBody = body;

      // verify the required parameter 'body' is set
      if (body === undefined || body === null) {
        throw new Error("Missing the required parameter 'body' when calling postDeviceToken");
      }


      var pathParams = {
      };
      var queryParams = {
      };
      var collectionQueryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = [];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = null;

      return this.apiClient.callApi(
        '/v3/deviceTokens', 'POST',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
  };

  return exports;
}));

},{"../ApiClient":9,"../model/DeviceToken":32}],16:[function(require,module,exports){
/**
 * quantimodo
 * We make it easy to retrieve and analyze normalized user data from a wide array of devices and applications. Check out our [docs and sdk's](https://github.com/QuantiModo/docs) or [contact us](https://help.quantimo.do).
 *
 * OpenAPI spec version: 5.8.112511
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.3.1
 *
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/CommonResponse', 'model/GetTrackingReminderNotificationsResponse', 'model/PostTrackingRemindersResponse', 'model/TrackingReminder', 'model/TrackingReminderDelete', 'model/TrackingReminderNotificationPost'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('../model/CommonResponse'), require('../model/GetTrackingReminderNotificationsResponse'), require('../model/PostTrackingRemindersResponse'), require('../model/TrackingReminder'), require('../model/TrackingReminderDelete'), require('../model/TrackingReminderNotificationPost'));
  } else {
    // Browser globals (root is window)
    if (!root.Quantimodo) {
      root.Quantimodo = {};
    }
    root.Quantimodo.RemindersApi = factory(root.Quantimodo.ApiClient, root.Quantimodo.CommonResponse, root.Quantimodo.GetTrackingReminderNotificationsResponse, root.Quantimodo.PostTrackingRemindersResponse, root.Quantimodo.TrackingReminder, root.Quantimodo.TrackingReminderDelete, root.Quantimodo.TrackingReminderNotificationPost);
  }
}(this, function(ApiClient, CommonResponse, GetTrackingReminderNotificationsResponse, PostTrackingRemindersResponse, TrackingReminder, TrackingReminderDelete, TrackingReminderNotificationPost) {
  'use strict';

  /**
   * Reminders service.
   * @module api/RemindersApi
   * @version 5.8.112511
   */

  /**
   * Constructs a new RemindersApi. 
   * @alias module:api/RemindersApi
   * @class
   * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
   * default to {@link module:ApiClient#instance} if unspecified.
   */
  var exports = function(apiClient) {
    this.apiClient = apiClient || ApiClient.instance;


    /**
     * Callback function to receive the result of the deleteTrackingReminder operation.
     * @callback module:api/RemindersApi~deleteTrackingReminderCallback
     * @param {String} error Error message, if any.
     * @param {module:model/CommonResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Delete tracking reminder
     * Delete previously created tracking reminder
     * @param {module:model/TrackingReminderDelete} body Id of reminder to be deleted
     * @param {Object} opts Optional parameters
     * @param {Number} opts.userId User&#39;s id
     * @param {module:api/RemindersApi~deleteTrackingReminderCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/CommonResponse}
     */
    this.deleteTrackingReminder = function(body, opts, callback) {
      opts = opts || {};
      var postBody = body;

      // verify the required parameter 'body' is set
      if (body === undefined || body === null) {
        throw new Error("Missing the required parameter 'body' when calling deleteTrackingReminder");
      }


      var pathParams = {
      };
      var queryParams = {
        'userId': opts['userId'],
      };
      var collectionQueryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['access_token', 'quantimodo_oauth2'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = CommonResponse;

      return this.apiClient.callApi(
        '/v3/trackingReminders/delete', 'DELETE',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the getTrackingReminderNotifications operation.
     * @callback module:api/RemindersApi~getTrackingReminderNotificationsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/GetTrackingReminderNotificationsResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Get specific tracking reminder notifications
     * Specific tracking reminder notification instances that still need to be tracked.
     * @param {Object} opts Optional parameters
     * @param {String} opts.sort Sort by one of the listed field names. If the field name is prefixed with &#x60;-&#x60;, it will sort in descending order.
     * @param {Number} opts.userId User&#39;s id
     * @param {String} opts.createdAt When the record was first created. Use UTC ISO 8601 YYYY-MM-DDThh:mm:ss datetime format. Time zone should be UTC and not local.
     * @param {String} opts.updatedAt When the record was last updated. Use UTC ISO 8601 YYYY-MM-DDThh:mm:ss datetime format. Time zone should be UTC and not local.
     * @param {Number} opts.limit The LIMIT is used to limit the number of results returned. So if youhave 1000 results, but only want to the first 10, you would set this to 10 and offset to 0. The maximum limit is 200 records. (default to 100)
     * @param {Number} opts.offset OFFSET says to skip that many rows before beginning to return rows to the client. OFFSET 0 is the same as omitting the OFFSET clause.If both OFFSET and LIMIT appear, then OFFSET rows are skipped before starting to count the LIMIT rows that are returned.
     * @param {module:model/String} opts.variableCategoryName Limit results to a specific variable category
     * @param {String} opts.reminderTime Example: (lt)2017-07-31 21:43:26
     * @param {String} opts.appName Example: MoodiModo
     * @param {String} opts.clientId Example: oauth_test_client
     * @param {Boolean} opts.onlyPast Example: 1
     * @param {Boolean} opts.includeDeleted Include deleted variables
     * @param {module:model/String} opts.platform Example: chrome, android, ios, web
     * @param {module:api/RemindersApi~getTrackingReminderNotificationsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/GetTrackingReminderNotificationsResponse}
     */
    this.getTrackingReminderNotifications = function(opts, callback) {
      opts = opts || {};
      var postBody = null;


      var pathParams = {
      };
      var queryParams = {
        'sort': opts['sort'],
        'userId': opts['userId'],
        'createdAt': opts['createdAt'],
        'updatedAt': opts['updatedAt'],
        'limit': opts['limit'],
        'offset': opts['offset'],
        'variableCategoryName': opts['variableCategoryName'],
        'reminderTime': opts['reminderTime'],
        'appName': opts['appName'],
        'clientId': opts['clientId'],
        'onlyPast': opts['onlyPast'],
        'includeDeleted': opts['includeDeleted'],
        'platform': opts['platform'],
      };
      var collectionQueryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['access_token', 'quantimodo_oauth2'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = GetTrackingReminderNotificationsResponse;

      return this.apiClient.callApi(
        '/v3/trackingReminderNotifications', 'GET',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the getTrackingReminders operation.
     * @callback module:api/RemindersApi~getTrackingRemindersCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/TrackingReminder>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Get repeating tracking reminder settings
     * Users can be reminded to track certain variables at a specified frequency with a default value.
     * @param {Object} opts Optional parameters
     * @param {Number} opts.userId User&#39;s id
     * @param {module:model/String} opts.variableCategoryName Limit results to a specific variable category
     * @param {String} opts.createdAt When the record was first created. Use UTC ISO 8601 YYYY-MM-DDThh:mm:ss datetime format. Time zone should be UTC and not local.
     * @param {String} opts.updatedAt When the record was last updated. Use UTC ISO 8601 YYYY-MM-DDThh:mm:ss datetime format. Time zone should be UTC and not local.
     * @param {Number} opts.limit The LIMIT is used to limit the number of results returned. So if youhave 1000 results, but only want to the first 10, you would set this to 10 and offset to 0. The maximum limit is 200 records. (default to 100)
     * @param {Number} opts.offset OFFSET says to skip that many rows before beginning to return rows to the client. OFFSET 0 is the same as omitting the OFFSET clause.If both OFFSET and LIMIT appear, then OFFSET rows are skipped before starting to count the LIMIT rows that are returned.
     * @param {String} opts.sort Sort by one of the listed field names. If the field name is prefixed with &#x60;-&#x60;, it will sort in descending order.
     * @param {String} opts.appName Example: MoodiModo
     * @param {String} opts.clientId Example: oauth_test_client
     * @param {String} opts.appVersion Example: 2.1.1.0
     * @param {module:model/String} opts.platform Example: chrome, android, ios, web
     * @param {module:api/RemindersApi~getTrackingRemindersCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Array.<module:model/TrackingReminder>}
     */
    this.getTrackingReminders = function(opts, callback) {
      opts = opts || {};
      var postBody = null;


      var pathParams = {
      };
      var queryParams = {
        'userId': opts['userId'],
        'variableCategoryName': opts['variableCategoryName'],
        'createdAt': opts['createdAt'],
        'updatedAt': opts['updatedAt'],
        'limit': opts['limit'],
        'offset': opts['offset'],
        'sort': opts['sort'],
        'appName': opts['appName'],
        'clientId': opts['clientId'],
        'appVersion': opts['appVersion'],
        'platform': opts['platform'],
      };
      var collectionQueryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['access_token', 'quantimodo_oauth2'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = [TrackingReminder];

      return this.apiClient.callApi(
        '/v3/trackingReminders', 'GET',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the postTrackingReminderNotifications operation.
     * @callback module:api/RemindersApi~postTrackingReminderNotificationsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/CommonResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Snooze, skip, or track a tracking reminder notification
     * Snooze, skip, or track a tracking reminder notification
     * @param {Array.<module:model/TrackingReminderNotificationPost>} body Id of the tracking reminder notification to be snoozed
     * @param {Object} opts Optional parameters
     * @param {Number} opts.userId User&#39;s id
     * @param {String} opts.appName Example: MoodiModo
     * @param {String} opts.clientId Example: oauth_test_client
     * @param {module:model/String} opts.platform Example: chrome, android, ios, web
     * @param {module:api/RemindersApi~postTrackingReminderNotificationsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/CommonResponse}
     */
    this.postTrackingReminderNotifications = function(body, opts, callback) {
      opts = opts || {};
      var postBody = body;

      // verify the required parameter 'body' is set
      if (body === undefined || body === null) {
        throw new Error("Missing the required parameter 'body' when calling postTrackingReminderNotifications");
      }


      var pathParams = {
      };
      var queryParams = {
        'userId': opts['userId'],
        'appName': opts['appName'],
        'clientId': opts['clientId'],
        'platform': opts['platform'],
      };
      var collectionQueryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['access_token', 'quantimodo_oauth2'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = CommonResponse;

      return this.apiClient.callApi(
        '/v3/trackingReminderNotifications', 'POST',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the postTrackingReminders operation.
     * @callback module:api/RemindersApi~postTrackingRemindersCallback
     * @param {String} error Error message, if any.
     * @param {module:model/PostTrackingRemindersResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Store a Tracking Reminder
     * This is to enable users to create reminders to track a variable with a default value at a specified frequency
     * @param {Array.<module:model/TrackingReminder>} body TrackingReminder that should be stored
     * @param {module:api/RemindersApi~postTrackingRemindersCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/PostTrackingRemindersResponse}
     */
    this.postTrackingReminders = function(body, callback) {
      var postBody = body;

      // verify the required parameter 'body' is set
      if (body === undefined || body === null) {
        throw new Error("Missing the required parameter 'body' when calling postTrackingReminders");
      }


      var pathParams = {
      };
      var queryParams = {
      };
      var collectionQueryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['access_token', 'quantimodo_oauth2'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = PostTrackingRemindersResponse;

      return this.apiClient.callApi(
        '/v3/trackingReminders', 'POST',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
  };

  return exports;
}));

},{"../ApiClient":9,"../model/CommonResponse":26,"../model/GetTrackingReminderNotificationsResponse":38,"../model/PostTrackingRemindersResponse":53,"../model/TrackingReminder":63,"../model/TrackingReminderDelete":64,"../model/TrackingReminderNotificationPost":67}],17:[function(require,module,exports){
/**
 * quantimodo
 * We make it easy to retrieve and analyze normalized user data from a wide array of devices and applications. Check out our [docs and sdk's](https://github.com/QuantiModo/docs) or [contact us](https://help.quantimo.do).
 *
 * OpenAPI spec version: 5.8.112511
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.3.1
 *
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/PostStudyPublishResponse'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('../model/PostStudyPublishResponse'));
  } else {
    // Browser globals (root is window)
    if (!root.Quantimodo) {
      root.Quantimodo = {};
    }
    root.Quantimodo.StudyApi = factory(root.Quantimodo.ApiClient, root.Quantimodo.PostStudyPublishResponse);
  }
}(this, function(ApiClient, PostStudyPublishResponse) {
  'use strict';

  /**
   * Study service.
   * @module api/StudyApi
   * @version 5.8.112511
   */

  /**
   * Constructs a new StudyApi. 
   * @alias module:api/StudyApi
   * @class
   * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
   * default to {@link module:ApiClient#instance} if unspecified.
   */
  var exports = function(apiClient) {
    this.apiClient = apiClient || ApiClient.instance;


    /**
     * Callback function to receive the result of the postStudyPublish operation.
     * @callback module:api/StudyApi~postStudyPublishCallback
     * @param {String} error Error message, if any.
     * @param {module:model/PostStudyPublishResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Post Study Publish
     * Post Study Publish
     * @param {module:api/StudyApi~postStudyPublishCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/PostStudyPublishResponse}
     */
    this.postStudyPublish = function(callback) {
      var postBody = null;


      var pathParams = {
      };
      var queryParams = {
      };
      var collectionQueryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = [];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = PostStudyPublishResponse;

      return this.apiClient.callApi(
        '/v3/study/publish', 'POST',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
  };

  return exports;
}));

},{"../ApiClient":9,"../model/PostStudyPublishResponse":51}],18:[function(require,module,exports){
/**
 * quantimodo
 * We make it easy to retrieve and analyze normalized user data from a wide array of devices and applications. Check out our [docs and sdk's](https://github.com/QuantiModo/docs) or [contact us](https://help.quantimo.do).
 *
 * OpenAPI spec version: 5.8.112511
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.3.1
 *
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/Unit', 'model/UnitCategory'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('../model/Unit'), require('../model/UnitCategory'));
  } else {
    // Browser globals (root is window)
    if (!root.Quantimodo) {
      root.Quantimodo = {};
    }
    root.Quantimodo.UnitsApi = factory(root.Quantimodo.ApiClient, root.Quantimodo.Unit, root.Quantimodo.UnitCategory);
  }
}(this, function(ApiClient, Unit, UnitCategory) {
  'use strict';

  /**
   * Units service.
   * @module api/UnitsApi
   * @version 5.8.112511
   */

  /**
   * Constructs a new UnitsApi. 
   * @alias module:api/UnitsApi
   * @class
   * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
   * default to {@link module:ApiClient#instance} if unspecified.
   */
  var exports = function(apiClient) {
    this.apiClient = apiClient || ApiClient.instance;


    /**
     * Callback function to receive the result of the getUnitCategories operation.
     * @callback module:api/UnitsApi~getUnitCategoriesCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/UnitCategory>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Get unit categories
     * Get a list of the categories of measurement units such as &#39;Distance&#39;, &#39;Duration&#39;, &#39;Energy&#39;, &#39;Frequency&#39;, &#39;Miscellany&#39;, &#39;Pressure&#39;, &#39;Proportion&#39;, &#39;Rating&#39;, &#39;Temperature&#39;, &#39;Volume&#39;, and &#39;Weight&#39;.
     * @param {module:api/UnitsApi~getUnitCategoriesCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Array.<module:model/UnitCategory>}
     */
    this.getUnitCategories = function(callback) {
      var postBody = null;


      var pathParams = {
      };
      var queryParams = {
      };
      var collectionQueryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['access_token', 'quantimodo_oauth2'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = [UnitCategory];

      return this.apiClient.callApi(
        '/v3/unitCategories', 'GET',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the getUnits operation.
     * @callback module:api/UnitsApi~getUnitsCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/Unit>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Get units
     * Get a list of the available measurement units
     * @param {module:api/UnitsApi~getUnitsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Array.<module:model/Unit>}
     */
    this.getUnits = function(callback) {
      var postBody = null;


      var pathParams = {
      };
      var queryParams = {
      };
      var collectionQueryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['access_token', 'quantimodo_oauth2'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = [Unit];

      return this.apiClient.callApi(
        '/v3/units', 'GET',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
  };

  return exports;
}));

},{"../ApiClient":9,"../model/Unit":69,"../model/UnitCategory":70}],19:[function(require,module,exports){
/**
 * quantimodo
 * We make it easy to retrieve and analyze normalized user data from a wide array of devices and applications. Check out our [docs and sdk's](https://github.com/QuantiModo/docs) or [contact us](https://help.quantimo.do).
 *
 * OpenAPI spec version: 5.8.112511
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.3.1
 *
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/CommonResponse', 'model/PostUserSettingsResponse', 'model/User'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('../model/CommonResponse'), require('../model/PostUserSettingsResponse'), require('../model/User'));
  } else {
    // Browser globals (root is window)
    if (!root.Quantimodo) {
      root.Quantimodo = {};
    }
    root.Quantimodo.UserApi = factory(root.Quantimodo.ApiClient, root.Quantimodo.CommonResponse, root.Quantimodo.PostUserSettingsResponse, root.Quantimodo.User);
  }
}(this, function(ApiClient, CommonResponse, PostUserSettingsResponse, User) {
  'use strict';

  /**
   * User service.
   * @module api/UserApi
   * @version 5.8.112511
   */

  /**
   * Constructs a new UserApi. 
   * @alias module:api/UserApi
   * @class
   * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
   * default to {@link module:ApiClient#instance} if unspecified.
   */
  var exports = function(apiClient) {
    this.apiClient = apiClient || ApiClient.instance;


    /**
     * Callback function to receive the result of the deleteUser operation.
     * @callback module:api/UserApi~deleteUserCallback
     * @param {String} error Error message, if any.
     * @param {module:model/CommonResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Delete user
     * Delete user account. Only the client app that created a user can delete that user.
     * @param {String} reason Example: I hate you!
     * @param {Object} opts Optional parameters
     * @param {String} opts.clientId Example: oauth_test_client
     * @param {module:model/String} opts.platform Example: chrome, android, ios, web
     * @param {module:api/UserApi~deleteUserCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/CommonResponse}
     */
    this.deleteUser = function(reason, opts, callback) {
      opts = opts || {};
      var postBody = null;

      // verify the required parameter 'reason' is set
      if (reason === undefined || reason === null) {
        throw new Error("Missing the required parameter 'reason' when calling deleteUser");
      }


      var pathParams = {
      };
      var queryParams = {
        'clientId': opts['clientId'],
        'reason': reason,
        'platform': opts['platform'],
      };
      var collectionQueryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['access_token', 'quantimodo_oauth2'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = CommonResponse;

      return this.apiClient.callApi(
        '/v3/user/delete', 'DELETE',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the getUser operation.
     * @callback module:api/UserApi~getUserCallback
     * @param {String} error Error message, if any.
     * @param {module:model/User} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Get user info
     * Returns user info.  If no userId is specified, returns info for currently authenticated user
     * @param {Object} opts Optional parameters
     * @param {Number} opts.userId User&#39;s id
     * @param {String} opts.createdAt When the record was first created. Use UTC ISO 8601 YYYY-MM-DDThh:mm:ss datetime format. Time zone should be UTC and not local.
     * @param {String} opts.updatedAt When the record was last updated. Use UTC ISO 8601 YYYY-MM-DDThh:mm:ss datetime format. Time zone should be UTC and not local.
     * @param {Number} opts.limit The LIMIT is used to limit the number of results returned. So if youhave 1000 results, but only want to the first 10, you would set this to 10 and offset to 0. The maximum limit is 200 records. (default to 100)
     * @param {Number} opts.offset OFFSET says to skip that many rows before beginning to return rows to the client. OFFSET 0 is the same as omitting the OFFSET clause.If both OFFSET and LIMIT appear, then OFFSET rows are skipped before starting to count the LIMIT rows that are returned.
     * @param {String} opts.sort Sort by one of the listed field names. If the field name is prefixed with &#x60;-&#x60;, it will sort in descending order.
     * @param {String} opts.clientId Example: oauth_test_client
     * @param {String} opts.appName Example: MoodiModo
     * @param {String} opts.appVersion Example: 2.1.1.0
     * @param {Number} opts.clientUserId Example: 74802
     * @param {module:model/String} opts.platform Example: chrome, android, ios, web
     * @param {String} opts.log Username or email
     * @param {String} opts.pwd User password
     * @param {module:api/UserApi~getUserCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/User}
     */
    this.getUser = function(opts, callback) {
      opts = opts || {};
      var postBody = null;


      var pathParams = {
      };
      var queryParams = {
        'userId': opts['userId'],
        'createdAt': opts['createdAt'],
        'updatedAt': opts['updatedAt'],
        'limit': opts['limit'],
        'offset': opts['offset'],
        'sort': opts['sort'],
        'clientId': opts['clientId'],
        'appName': opts['appName'],
        'appVersion': opts['appVersion'],
        'clientUserId': opts['clientUserId'],
        'platform': opts['platform'],
        'log': opts['log'],
        'pwd': opts['pwd'],
      };
      var collectionQueryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['access_token', 'quantimodo_oauth2'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = User;

      return this.apiClient.callApi(
        '/v3/user', 'GET',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the postUserSettings operation.
     * @callback module:api/UserApi~postUserSettingsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/PostUserSettingsResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Post UserSettings
     * Post UserSettings
     * @param {module:model/User} body User settings to update
     * @param {Object} opts Optional parameters
     * @param {String} opts.appName Example: MoodiModo
     * @param {String} opts.clientId Example: oauth_test_client
     * @param {module:model/String} opts.platform Example: chrome, android, ios, web
     * @param {module:api/UserApi~postUserSettingsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/PostUserSettingsResponse}
     */
    this.postUserSettings = function(body, opts, callback) {
      opts = opts || {};
      var postBody = body;

      // verify the required parameter 'body' is set
      if (body === undefined || body === null) {
        throw new Error("Missing the required parameter 'body' when calling postUserSettings");
      }


      var pathParams = {
      };
      var queryParams = {
        'appName': opts['appName'],
        'clientId': opts['clientId'],
        'platform': opts['platform'],
      };
      var collectionQueryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = [];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = PostUserSettingsResponse;

      return this.apiClient.callApi(
        '/v3/userSettings', 'POST',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
  };

  return exports;
}));

},{"../ApiClient":9,"../model/CommonResponse":26,"../model/PostUserSettingsResponse":55,"../model/User":71}],20:[function(require,module,exports){
/**
 * quantimodo
 * We make it easy to retrieve and analyze normalized user data from a wide array of devices and applications. Check out our [docs and sdk's](https://github.com/QuantiModo/docs) or [contact us](https://help.quantimo.do).
 *
 * OpenAPI spec version: 5.8.112511
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.3.1
 *
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/CommonResponse', 'model/UserTag', 'model/UserVariableDelete', 'model/Variable', 'model/VariableCategory'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('../model/CommonResponse'), require('../model/UserTag'), require('../model/UserVariableDelete'), require('../model/Variable'), require('../model/VariableCategory'));
  } else {
    // Browser globals (root is window)
    if (!root.Quantimodo) {
      root.Quantimodo = {};
    }
    root.Quantimodo.VariablesApi = factory(root.Quantimodo.ApiClient, root.Quantimodo.CommonResponse, root.Quantimodo.UserTag, root.Quantimodo.UserVariableDelete, root.Quantimodo.Variable, root.Quantimodo.VariableCategory);
  }
}(this, function(ApiClient, CommonResponse, UserTag, UserVariableDelete, Variable, VariableCategory) {
  'use strict';

  /**
   * Variables service.
   * @module api/VariablesApi
   * @version 5.8.112511
   */

  /**
   * Constructs a new VariablesApi. 
   * @alias module:api/VariablesApi
   * @class
   * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
   * default to {@link module:ApiClient#instance} if unspecified.
   */
  var exports = function(apiClient) {
    this.apiClient = apiClient || ApiClient.instance;


    /**
     * Callback function to receive the result of the deleteUserTag operation.
     * @callback module:api/VariablesApi~deleteUserTagCallback
     * @param {String} error Error message, if any.
     * @param {module:model/CommonResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Delete user tag or ingredient
     * Delete previously created user tags or ingredients.
     * @param {Object} opts Optional parameters
     * @param {Number} opts.taggedVariableId Id of the tagged variable (i.e. Lollipop) you would like to get variables it can be tagged with (i.e. Sugar).  Converted measurements of the tagged variable are included in analysis of the tag variable (i.e. ingredient).
     * @param {Number} opts.tagVariableId Id of the tag variable (i.e. Sugar) you would like to get variables it can be tagged to (i.e. Lollipop).  Converted measurements of the tagged variable are included in analysis of the tag variable (i.e. ingredient).
     * @param {module:api/VariablesApi~deleteUserTagCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/CommonResponse}
     */
    this.deleteUserTag = function(opts, callback) {
      opts = opts || {};
      var postBody = null;


      var pathParams = {
      };
      var queryParams = {
        'taggedVariableId': opts['taggedVariableId'],
        'tagVariableId': opts['tagVariableId'],
      };
      var collectionQueryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['access_token', 'quantimodo_oauth2'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = CommonResponse;

      return this.apiClient.callApi(
        '/v3/userTags/delete', 'DELETE',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the deleteUserVariable operation.
     * @callback module:api/VariablesApi~deleteUserVariableCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Delete All Measurements For Variable
     * Users can delete all of their measurements for a variable
     * @param {module:model/UserVariableDelete} variableId Id of the variable whose measurements should be deleted
     * @param {module:api/VariablesApi~deleteUserVariableCallback} callback The callback function, accepting three arguments: error, data, response
     */
    this.deleteUserVariable = function(variableId, callback) {
      var postBody = variableId;

      // verify the required parameter 'variableId' is set
      if (variableId === undefined || variableId === null) {
        throw new Error("Missing the required parameter 'variableId' when calling deleteUserVariable");
      }


      var pathParams = {
      };
      var queryParams = {
      };
      var collectionQueryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['access_token', 'quantimodo_oauth2'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = null;

      return this.apiClient.callApi(
        '/v3/userVariables/delete', 'DELETE',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the getVariableCategories operation.
     * @callback module:api/VariablesApi~getVariableCategoriesCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/VariableCategory>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Variable categories
     * The variable categories include Activity, Causes of Illness, Cognitive Performance, Conditions, Environment, Foods, Location, Miscellaneous, Mood, Nutrition, Physical Activity, Physique, Sleep, Social Interactions, Symptoms, Treatments, Vital Signs, and Work.
     * @param {module:api/VariablesApi~getVariableCategoriesCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Array.<module:model/VariableCategory>}
     */
    this.getVariableCategories = function(callback) {
      var postBody = null;


      var pathParams = {
      };
      var queryParams = {
      };
      var collectionQueryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['access_token', 'quantimodo_oauth2'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = [VariableCategory];

      return this.apiClient.callApi(
        '/v3/variableCategories', 'GET',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the getVariables operation.
     * @callback module:api/VariablesApi~getVariablesCallback
     * @param {String} error Error message, if any.
     * @param {Array.<module:model/Variable>} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Get variables along with related user-specific analysis settings and statistics
     * Get variables. If the user has specified variable settings, these are provided instead of the common variable defaults.
     * @param {Object} opts Optional parameters
     * @param {Boolean} opts.includeCharts Highcharts configs that can be used if you have highcharts.js included on the page.  This only works if the id or name query parameter is also provided.
     * @param {String} opts.numberOfRawMeasurements Filter variables by the total number of measurements that they have. This could be used of you want to filter or sort by popularity.
     * @param {Number} opts.userId User&#39;s id
     * @param {module:model/String} opts.variableCategoryName Limit results to a specific variable category
     * @param {String} opts.name Name of the variable. To get results matching a substring, add % as a wildcard as the first and/or last character of a query string parameter. In order to get variables that contain &#x60;Mood&#x60;, the following query should be used: ?variableName&#x3D;%Mood%
     * @param {String} opts.updatedAt When the record was last updated. Use UTC ISO 8601 YYYY-MM-DDThh:mm:ss datetime format. Time zone should be UTC and not local.
     * @param {String} opts.sourceName ID of the source you want measurements for (supports exact name match only)
     * @param {String} opts.earliestMeasurementTime Excluded records with measurement times earlier than this value. Use UTC ISO 8601 YYYY-MM-DDThh:mm:ss  datetime format. Time zone should be UTC and not local.
     * @param {String} opts.latestMeasurementTime Excluded records with measurement times later than this value. Use UTC ISO 8601 YYYY-MM-DDThh:mm:ss  datetime format. Time zone should be UTC and not local.
     * @param {Number} opts.id Common variable id
     * @param {String} opts.lastSourceName Limit variables to those which measurements were last submitted by a specific source. So if you have a client application and you only want variables that were last updated by your app, you can include the name of your app here
     * @param {Number} opts.limit The LIMIT is used to limit the number of results returned. So if youhave 1000 results, but only want to the first 10, you would set this to 10 and offset to 0. The maximum limit is 200 records. (default to 100)
     * @param {Number} opts.offset OFFSET says to skip that many rows before beginning to return rows to the client. OFFSET 0 is the same as omitting the OFFSET clause.If both OFFSET and LIMIT appear, then OFFSET rows are skipped before starting to count the LIMIT rows that are returned.
     * @param {String} opts.sort Sort by one of the listed field names. If the field name is prefixed with &#x60;-&#x60;, it will sort in descending order.
     * @param {Boolean} opts.includePublic Include variables the user has no measurements for
     * @param {Boolean} opts.manualTracking Only include variables tracked manually by the user
     * @param {String} opts.appName Example: MoodiModo
     * @param {String} opts.clientId Example: oauth_test_client
     * @param {String} opts.upc UPC or other barcode scan result
     * @param {String} opts.effectOrCause Provided variable is the effect or cause
     * @param {String} opts.publicEffectOrCause Example: 
     * @param {Boolean} opts.exactMatch Require exact match
     * @param {Number} opts.variableCategoryId Example: 13
     * @param {Boolean} opts.includePrivate Include user-specific variables in results
     * @param {String} opts.searchPhrase Example: %Body Fat%
     * @param {String} opts.synonyms Example: %McDonalds hotcake%
     * @param {Number} opts.taggedVariableId Id of the tagged variable (i.e. Lollipop) you would like to get variables it can be tagged with (i.e. Sugar).  Converted measurements of the tagged variable are included in analysis of the tag variable (i.e. ingredient).
     * @param {Number} opts.tagVariableId Id of the tag variable (i.e. Sugar) you would like to get variables it can be tagged to (i.e. Lollipop).  Converted measurements of the tagged variable are included in analysis of the tag variable (i.e. ingredient).
     * @param {Number} opts.joinVariableId Id of the variable you would like to get variables that can be joined to.  This is used to merge duplicate variables.   If joinVariableId is specified, this returns only variables eligible to be joined to the variable specified by the joinVariableId.
     * @param {Number} opts.parentUserTagVariableId Id of the parent category variable (i.e. Fruit) you would like to get eligible child sub-type variables (i.e. Apple) for.  Child variable measurements will be included in analysis of the parent variable.  For instance, a child sub-type of the parent category Fruit could be Apple.  When Apple is tagged with the parent category Fruit, Apple measurements will be included when Fruit is analyzed.
     * @param {Number} opts.childUserTagVariableId Id of the child sub-type variable (i.e. Apple) you would like to get eligible parent variables (i.e. Fruit) for.  Child variable measurements will be included in analysis of the parent variable.  For instance, a child sub-type of the parent category Fruit could be Apple. When Apple is tagged with the parent category Fruit, Apple measurements will be included when Fruit is analyzed.
     * @param {Number} opts.ingredientUserTagVariableId Id of the ingredient variable (i.e. Fructose)  you would like to get eligible ingredientOf variables (i.e. Apple) for.  IngredientOf variable measurements will be included in analysis of the ingredient variable.  For instance, a ingredientOf of variable Fruit could be Apple.
     * @param {Number} opts.ingredientOfUserTagVariableId Id of the ingredientOf variable (i.e. Apple) you would like to get eligible ingredient variables (i.e. Fructose) for.  IngredientOf variable measurements will be included in analysis of the ingredient variable.  For instance, a ingredientOf of variable Fruit could be Apple.
     * @param {Boolean} opts.commonOnly Return only public and aggregated common variable data instead of user-specific variables
     * @param {Boolean} opts.userOnly Return only user-specific variables and data, excluding common aggregated variable data
     * @param {module:model/String} opts.platform Example: chrome, android, ios, web
     * @param {Boolean} opts.includeTags Return parent, child, duplicate, and ingredient variables
     * @param {Boolean} opts.recalculate Recalculate instead of using cached analysis
     * @param {Number} opts.variableId Example: 13
     * @param {module:api/VariablesApi~getVariablesCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link Array.<module:model/Variable>}
     */
    this.getVariables = function(opts, callback) {
      opts = opts || {};
      var postBody = null;


      var pathParams = {
      };
      var queryParams = {
        'includeCharts': opts['includeCharts'],
        'numberOfRawMeasurements': opts['numberOfRawMeasurements'],
        'userId': opts['userId'],
        'variableCategoryName': opts['variableCategoryName'],
        'name': opts['name'],
        'updatedAt': opts['updatedAt'],
        'sourceName': opts['sourceName'],
        'earliestMeasurementTime': opts['earliestMeasurementTime'],
        'latestMeasurementTime': opts['latestMeasurementTime'],
        'id': opts['id'],
        'lastSourceName': opts['lastSourceName'],
        'limit': opts['limit'],
        'offset': opts['offset'],
        'sort': opts['sort'],
        'includePublic': opts['includePublic'],
        'manualTracking': opts['manualTracking'],
        'appName': opts['appName'],
        'clientId': opts['clientId'],
        'upc': opts['upc'],
        'effectOrCause': opts['effectOrCause'],
        'publicEffectOrCause': opts['publicEffectOrCause'],
        'exactMatch': opts['exactMatch'],
        'variableCategoryId': opts['variableCategoryId'],
        'includePrivate': opts['includePrivate'],
        'searchPhrase': opts['searchPhrase'],
        'synonyms': opts['synonyms'],
        'taggedVariableId': opts['taggedVariableId'],
        'tagVariableId': opts['tagVariableId'],
        'joinVariableId': opts['joinVariableId'],
        'parentUserTagVariableId': opts['parentUserTagVariableId'],
        'childUserTagVariableId': opts['childUserTagVariableId'],
        'ingredientUserTagVariableId': opts['ingredientUserTagVariableId'],
        'ingredientOfUserTagVariableId': opts['ingredientOfUserTagVariableId'],
        'commonOnly': opts['commonOnly'],
        'userOnly': opts['userOnly'],
        'platform': opts['platform'],
        'includeTags': opts['includeTags'],
        'recalculate': opts['recalculate'],
        'variableId': opts['variableId'],
      };
      var collectionQueryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['access_token', 'quantimodo_oauth2'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = [Variable];

      return this.apiClient.callApi(
        '/v3/variables', 'GET',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the postUserTags operation.
     * @callback module:api/VariablesApi~postUserTagsCallback
     * @param {String} error Error message, if any.
     * @param {module:model/CommonResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Post or update user tags or ingredients
     * This endpoint allows users to tag foods with their ingredients.  This information will then be used to infer the user intake of the different ingredients by just entering the foods. The inferred intake levels will then be used to determine the effects of different nutrients on the user during analysis.
     * @param {module:model/UserTag} body Contains the new user tag data
     * @param {Object} opts Optional parameters
     * @param {Number} opts.userId User&#39;s id
     * @param {module:api/VariablesApi~postUserTagsCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/CommonResponse}
     */
    this.postUserTags = function(body, opts, callback) {
      opts = opts || {};
      var postBody = body;

      // verify the required parameter 'body' is set
      if (body === undefined || body === null) {
        throw new Error("Missing the required parameter 'body' when calling postUserTags");
      }


      var pathParams = {
      };
      var queryParams = {
        'userId': opts['userId'],
      };
      var collectionQueryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['access_token', 'quantimodo_oauth2'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = CommonResponse;

      return this.apiClient.callApi(
        '/v3/userTags', 'POST',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the postUserVariables operation.
     * @callback module:api/VariablesApi~postUserVariablesCallback
     * @param {String} error Error message, if any.
     * @param {module:model/CommonResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Update User Settings for a Variable
     * Users can change the parameters used in analysis of that variable such as the expected duration of action for a variable to have an effect, the estimated delay before the onset of action. In order to filter out erroneous data, they are able to set the maximum and minimum reasonable daily values for a variable.
     * @param {Array.<module:model/Variable>} userVariables Variable user settings data
     * @param {Object} opts Optional parameters
     * @param {Boolean} opts.includePrivate Include user-specific variables in results
     * @param {String} opts.clientId Example: oauth_test_client
     * @param {Boolean} opts.includePublic Include variables the user has no measurements for
     * @param {String} opts.searchPhrase Example: %Body Fat%
     * @param {String} opts.appName Example: MoodiModo
     * @param {Boolean} opts.exactMatch Require exact match
     * @param {Boolean} opts.manualTracking Only include variables tracked manually by the user
     * @param {module:model/String} opts.variableCategoryName Limit results to a specific variable category
     * @param {Number} opts.variableCategoryId Example: 13
     * @param {String} opts.synonyms Example: %McDonalds hotcake%
     * @param {module:model/String} opts.platform Example: chrome, android, ios, web
     * @param {module:api/VariablesApi~postUserVariablesCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/CommonResponse}
     */
    this.postUserVariables = function(userVariables, opts, callback) {
      opts = opts || {};
      var postBody = userVariables;

      // verify the required parameter 'userVariables' is set
      if (userVariables === undefined || userVariables === null) {
        throw new Error("Missing the required parameter 'userVariables' when calling postUserVariables");
      }


      var pathParams = {
      };
      var queryParams = {
        'includePrivate': opts['includePrivate'],
        'clientId': opts['clientId'],
        'includePublic': opts['includePublic'],
        'searchPhrase': opts['searchPhrase'],
        'appName': opts['appName'],
        'exactMatch': opts['exactMatch'],
        'manualTracking': opts['manualTracking'],
        'variableCategoryName': opts['variableCategoryName'],
        'variableCategoryId': opts['variableCategoryId'],
        'synonyms': opts['synonyms'],
        'platform': opts['platform'],
      };
      var collectionQueryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['access_token', 'quantimodo_oauth2'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = CommonResponse;

      return this.apiClient.callApi(
        '/v3/variables', 'POST',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }

    /**
     * Callback function to receive the result of the resetUserVariableSettings operation.
     * @callback module:api/VariablesApi~resetUserVariableSettingsCallback
     * @param {String} error Error message, if any.
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Reset user settings for a variable to defaults
     * Reset user settings for a variable to defaults
     * @param {module:model/UserVariableDelete} variableId Id of the variable whose measurements should be deleted
     * @param {module:api/VariablesApi~resetUserVariableSettingsCallback} callback The callback function, accepting three arguments: error, data, response
     */
    this.resetUserVariableSettings = function(variableId, callback) {
      var postBody = variableId;

      // verify the required parameter 'variableId' is set
      if (variableId === undefined || variableId === null) {
        throw new Error("Missing the required parameter 'variableId' when calling resetUserVariableSettings");
      }


      var pathParams = {
      };
      var queryParams = {
      };
      var collectionQueryParams = {
      };
      var headerParams = {
      };
      var formParams = {
      };

      var authNames = ['access_token', 'quantimodo_oauth2'];
      var contentTypes = ['application/json'];
      var accepts = ['application/json'];
      var returnType = null;

      return this.apiClient.callApi(
        '/v3/userVariables/reset', 'POST',
        pathParams, queryParams, collectionQueryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, callback
      );
    }
  };

  return exports;
}));

},{"../ApiClient":9,"../model/CommonResponse":26,"../model/UserTag":72,"../model/UserVariableDelete":73,"../model/Variable":74,"../model/VariableCategory":75}],21:[function(require,module,exports){
/**
 * quantimodo
 * We make it easy to retrieve and analyze normalized user data from a wide array of devices and applications. Check out our [docs and sdk's](https://github.com/QuantiModo/docs) or [contact us](https://help.quantimo.do).
 *
 * OpenAPI spec version: 5.8.112511
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.3.1
 *
 * Do not edit the class manually.
 *
 */

(function(factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/AppSettings', 'model/AppSettingsResponse', 'model/Button', 'model/Chart', 'model/CommonResponse', 'model/ConnectInstructions', 'model/Connector', 'model/ConversionStep', 'model/Correlation', 'model/DataSource', 'model/DeviceToken', 'model/Explanation', 'model/ExplanationStartTracking', 'model/GetConnectorsResponse', 'model/GetCorrelationsDataResponse', 'model/GetCorrelationsResponse', 'model/GetTrackingReminderNotificationsResponse', 'model/Image', 'model/JsonErrorResponse', 'model/Measurement', 'model/MeasurementDelete', 'model/MeasurementItem', 'model/MeasurementSet', 'model/MeasurementUpdate', 'model/Pair', 'model/ParticipantInstruction', 'model/PostCorrelation', 'model/PostMeasurementsDataResponse', 'model/PostMeasurementsResponse', 'model/PostStudyPublishResponse', 'model/PostTrackingRemindersDataResponse', 'model/PostTrackingRemindersResponse', 'model/PostUserSettingsDataResponse', 'model/PostUserSettingsResponse', 'model/Scope', 'model/Study', 'model/StudyCharts', 'model/StudyHtml', 'model/StudyImages', 'model/StudyLinks', 'model/StudyText', 'model/TrackingReminder', 'model/TrackingReminderDelete', 'model/TrackingReminderNotification', 'model/TrackingReminderNotificationAction', 'model/TrackingReminderNotificationPost', 'model/TrackingReminderNotificationTrackAllAction', 'model/Unit', 'model/UnitCategory', 'model/User', 'model/UserTag', 'model/UserVariableDelete', 'model/Variable', 'model/VariableCategory', 'model/VariableCharts', 'model/Vote', 'model/VoteDelete', 'api/AnalyticsApi', 'api/AppSettingsApi', 'api/AuthenticationApi', 'api/ConnectorsApi', 'api/MeasurementsApi', 'api/NotificationsApi', 'api/RemindersApi', 'api/StudyApi', 'api/UnitsApi', 'api/UserApi', 'api/VariablesApi'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('./ApiClient'), require('./model/AppSettings'), require('./model/AppSettingsResponse'), require('./model/Button'), require('./model/Chart'), require('./model/CommonResponse'), require('./model/ConnectInstructions'), require('./model/Connector'), require('./model/ConversionStep'), require('./model/Correlation'), require('./model/DataSource'), require('./model/DeviceToken'), require('./model/Explanation'), require('./model/ExplanationStartTracking'), require('./model/GetConnectorsResponse'), require('./model/GetCorrelationsDataResponse'), require('./model/GetCorrelationsResponse'), require('./model/GetTrackingReminderNotificationsResponse'), require('./model/Image'), require('./model/JsonErrorResponse'), require('./model/Measurement'), require('./model/MeasurementDelete'), require('./model/MeasurementItem'), require('./model/MeasurementSet'), require('./model/MeasurementUpdate'), require('./model/Pair'), require('./model/ParticipantInstruction'), require('./model/PostCorrelation'), require('./model/PostMeasurementsDataResponse'), require('./model/PostMeasurementsResponse'), require('./model/PostStudyPublishResponse'), require('./model/PostTrackingRemindersDataResponse'), require('./model/PostTrackingRemindersResponse'), require('./model/PostUserSettingsDataResponse'), require('./model/PostUserSettingsResponse'), require('./model/Scope'), require('./model/Study'), require('./model/StudyCharts'), require('./model/StudyHtml'), require('./model/StudyImages'), require('./model/StudyLinks'), require('./model/StudyText'), require('./model/TrackingReminder'), require('./model/TrackingReminderDelete'), require('./model/TrackingReminderNotification'), require('./model/TrackingReminderNotificationAction'), require('./model/TrackingReminderNotificationPost'), require('./model/TrackingReminderNotificationTrackAllAction'), require('./model/Unit'), require('./model/UnitCategory'), require('./model/User'), require('./model/UserTag'), require('./model/UserVariableDelete'), require('./model/Variable'), require('./model/VariableCategory'), require('./model/VariableCharts'), require('./model/Vote'), require('./model/VoteDelete'), require('./api/AnalyticsApi'), require('./api/AppSettingsApi'), require('./api/AuthenticationApi'), require('./api/ConnectorsApi'), require('./api/MeasurementsApi'), require('./api/NotificationsApi'), require('./api/RemindersApi'), require('./api/StudyApi'), require('./api/UnitsApi'), require('./api/UserApi'), require('./api/VariablesApi'));
  }
}(function(ApiClient, AppSettings, AppSettingsResponse, Button, Chart, CommonResponse, ConnectInstructions, Connector, ConversionStep, Correlation, DataSource, DeviceToken, Explanation, ExplanationStartTracking, GetConnectorsResponse, GetCorrelationsDataResponse, GetCorrelationsResponse, GetTrackingReminderNotificationsResponse, Image, JsonErrorResponse, Measurement, MeasurementDelete, MeasurementItem, MeasurementSet, MeasurementUpdate, Pair, ParticipantInstruction, PostCorrelation, PostMeasurementsDataResponse, PostMeasurementsResponse, PostStudyPublishResponse, PostTrackingRemindersDataResponse, PostTrackingRemindersResponse, PostUserSettingsDataResponse, PostUserSettingsResponse, Scope, Study, StudyCharts, StudyHtml, StudyImages, StudyLinks, StudyText, TrackingReminder, TrackingReminderDelete, TrackingReminderNotification, TrackingReminderNotificationAction, TrackingReminderNotificationPost, TrackingReminderNotificationTrackAllAction, Unit, UnitCategory, User, UserTag, UserVariableDelete, Variable, VariableCategory, VariableCharts, Vote, VoteDelete, AnalyticsApi, AppSettingsApi, AuthenticationApi, ConnectorsApi, MeasurementsApi, NotificationsApi, RemindersApi, StudyApi, UnitsApi, UserApi, VariablesApi) {
  'use strict';

  /**
   * We make it easy to retrieve and analyze normalized user data from a wide array of devices and applications. Check out our [docs and sdk&#39;s](https://github.com/QuantiModo/docs) or [contact us](https://help.quantimo.do)..<br>
   * The <code>index</code> module provides access to constructors for all the classes which comprise the public API.
   * <p>
   * An AMD (recommended!) or CommonJS application will generally do something equivalent to the following:
   * <pre>
   * var Quantimodo = require('index'); // See note below*.
   * var xxxSvc = new Quantimodo.XxxApi(); // Allocate the API class we're going to use.
   * var yyyModel = new Quantimodo.Yyy(); // Construct a model instance.
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
   * var xxxSvc = new Quantimodo.XxxApi(); // Allocate the API class we're going to use.
   * var yyy = new Quantimodo.Yyy(); // Construct a model instance.
   * yyyModel.someProperty = 'someValue';
   * ...
   * var zzz = xxxSvc.doSomething(yyyModel); // Invoke the service.
   * ...
   * </pre>
   * </p>
   * @module index
   * @version 5.8.112511
   */
  var exports = {
    /**
     * The ApiClient constructor.
     * @property {module:ApiClient}
     */
    ApiClient: ApiClient,
    /**
     * The AppSettings model constructor.
     * @property {module:model/AppSettings}
     */
    AppSettings: AppSettings,
    /**
     * The AppSettingsResponse model constructor.
     * @property {module:model/AppSettingsResponse}
     */
    AppSettingsResponse: AppSettingsResponse,
    /**
     * The Button model constructor.
     * @property {module:model/Button}
     */
    Button: Button,
    /**
     * The Chart model constructor.
     * @property {module:model/Chart}
     */
    Chart: Chart,
    /**
     * The CommonResponse model constructor.
     * @property {module:model/CommonResponse}
     */
    CommonResponse: CommonResponse,
    /**
     * The ConnectInstructions model constructor.
     * @property {module:model/ConnectInstructions}
     */
    ConnectInstructions: ConnectInstructions,
    /**
     * The Connector model constructor.
     * @property {module:model/Connector}
     */
    Connector: Connector,
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
     * The DataSource model constructor.
     * @property {module:model/DataSource}
     */
    DataSource: DataSource,
    /**
     * The DeviceToken model constructor.
     * @property {module:model/DeviceToken}
     */
    DeviceToken: DeviceToken,
    /**
     * The Explanation model constructor.
     * @property {module:model/Explanation}
     */
    Explanation: Explanation,
    /**
     * The ExplanationStartTracking model constructor.
     * @property {module:model/ExplanationStartTracking}
     */
    ExplanationStartTracking: ExplanationStartTracking,
    /**
     * The GetConnectorsResponse model constructor.
     * @property {module:model/GetConnectorsResponse}
     */
    GetConnectorsResponse: GetConnectorsResponse,
    /**
     * The GetCorrelationsDataResponse model constructor.
     * @property {module:model/GetCorrelationsDataResponse}
     */
    GetCorrelationsDataResponse: GetCorrelationsDataResponse,
    /**
     * The GetCorrelationsResponse model constructor.
     * @property {module:model/GetCorrelationsResponse}
     */
    GetCorrelationsResponse: GetCorrelationsResponse,
    /**
     * The GetTrackingReminderNotificationsResponse model constructor.
     * @property {module:model/GetTrackingReminderNotificationsResponse}
     */
    GetTrackingReminderNotificationsResponse: GetTrackingReminderNotificationsResponse,
    /**
     * The Image model constructor.
     * @property {module:model/Image}
     */
    Image: Image,
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
     * The MeasurementItem model constructor.
     * @property {module:model/MeasurementItem}
     */
    MeasurementItem: MeasurementItem,
    /**
     * The MeasurementSet model constructor.
     * @property {module:model/MeasurementSet}
     */
    MeasurementSet: MeasurementSet,
    /**
     * The MeasurementUpdate model constructor.
     * @property {module:model/MeasurementUpdate}
     */
    MeasurementUpdate: MeasurementUpdate,
    /**
     * The Pair model constructor.
     * @property {module:model/Pair}
     */
    Pair: Pair,
    /**
     * The ParticipantInstruction model constructor.
     * @property {module:model/ParticipantInstruction}
     */
    ParticipantInstruction: ParticipantInstruction,
    /**
     * The PostCorrelation model constructor.
     * @property {module:model/PostCorrelation}
     */
    PostCorrelation: PostCorrelation,
    /**
     * The PostMeasurementsDataResponse model constructor.
     * @property {module:model/PostMeasurementsDataResponse}
     */
    PostMeasurementsDataResponse: PostMeasurementsDataResponse,
    /**
     * The PostMeasurementsResponse model constructor.
     * @property {module:model/PostMeasurementsResponse}
     */
    PostMeasurementsResponse: PostMeasurementsResponse,
    /**
     * The PostStudyPublishResponse model constructor.
     * @property {module:model/PostStudyPublishResponse}
     */
    PostStudyPublishResponse: PostStudyPublishResponse,
    /**
     * The PostTrackingRemindersDataResponse model constructor.
     * @property {module:model/PostTrackingRemindersDataResponse}
     */
    PostTrackingRemindersDataResponse: PostTrackingRemindersDataResponse,
    /**
     * The PostTrackingRemindersResponse model constructor.
     * @property {module:model/PostTrackingRemindersResponse}
     */
    PostTrackingRemindersResponse: PostTrackingRemindersResponse,
    /**
     * The PostUserSettingsDataResponse model constructor.
     * @property {module:model/PostUserSettingsDataResponse}
     */
    PostUserSettingsDataResponse: PostUserSettingsDataResponse,
    /**
     * The PostUserSettingsResponse model constructor.
     * @property {module:model/PostUserSettingsResponse}
     */
    PostUserSettingsResponse: PostUserSettingsResponse,
    /**
     * The Scope model constructor.
     * @property {module:model/Scope}
     */
    Scope: Scope,
    /**
     * The Study model constructor.
     * @property {module:model/Study}
     */
    Study: Study,
    /**
     * The StudyCharts model constructor.
     * @property {module:model/StudyCharts}
     */
    StudyCharts: StudyCharts,
    /**
     * The StudyHtml model constructor.
     * @property {module:model/StudyHtml}
     */
    StudyHtml: StudyHtml,
    /**
     * The StudyImages model constructor.
     * @property {module:model/StudyImages}
     */
    StudyImages: StudyImages,
    /**
     * The StudyLinks model constructor.
     * @property {module:model/StudyLinks}
     */
    StudyLinks: StudyLinks,
    /**
     * The StudyText model constructor.
     * @property {module:model/StudyText}
     */
    StudyText: StudyText,
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
     * The TrackingReminderNotificationAction model constructor.
     * @property {module:model/TrackingReminderNotificationAction}
     */
    TrackingReminderNotificationAction: TrackingReminderNotificationAction,
    /**
     * The TrackingReminderNotificationPost model constructor.
     * @property {module:model/TrackingReminderNotificationPost}
     */
    TrackingReminderNotificationPost: TrackingReminderNotificationPost,
    /**
     * The TrackingReminderNotificationTrackAllAction model constructor.
     * @property {module:model/TrackingReminderNotificationTrackAllAction}
     */
    TrackingReminderNotificationTrackAllAction: TrackingReminderNotificationTrackAllAction,
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
     * The UserVariableDelete model constructor.
     * @property {module:model/UserVariableDelete}
     */
    UserVariableDelete: UserVariableDelete,
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
     * The VariableCharts model constructor.
     * @property {module:model/VariableCharts}
     */
    VariableCharts: VariableCharts,
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
     * The AnalyticsApi service constructor.
     * @property {module:api/AnalyticsApi}
     */
    AnalyticsApi: AnalyticsApi,
    /**
     * The AppSettingsApi service constructor.
     * @property {module:api/AppSettingsApi}
     */
    AppSettingsApi: AppSettingsApi,
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
     * The MeasurementsApi service constructor.
     * @property {module:api/MeasurementsApi}
     */
    MeasurementsApi: MeasurementsApi,
    /**
     * The NotificationsApi service constructor.
     * @property {module:api/NotificationsApi}
     */
    NotificationsApi: NotificationsApi,
    /**
     * The RemindersApi service constructor.
     * @property {module:api/RemindersApi}
     */
    RemindersApi: RemindersApi,
    /**
     * The StudyApi service constructor.
     * @property {module:api/StudyApi}
     */
    StudyApi: StudyApi,
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
    VariablesApi: VariablesApi
  };

  return exports;
}));

},{"./ApiClient":9,"./api/AnalyticsApi":10,"./api/AppSettingsApi":11,"./api/AuthenticationApi":12,"./api/ConnectorsApi":13,"./api/MeasurementsApi":14,"./api/NotificationsApi":15,"./api/RemindersApi":16,"./api/StudyApi":17,"./api/UnitsApi":18,"./api/UserApi":19,"./api/VariablesApi":20,"./model/AppSettings":22,"./model/AppSettingsResponse":23,"./model/Button":24,"./model/Chart":25,"./model/CommonResponse":26,"./model/ConnectInstructions":27,"./model/Connector":28,"./model/ConversionStep":29,"./model/Correlation":30,"./model/DataSource":31,"./model/DeviceToken":32,"./model/Explanation":33,"./model/ExplanationStartTracking":34,"./model/GetConnectorsResponse":35,"./model/GetCorrelationsDataResponse":36,"./model/GetCorrelationsResponse":37,"./model/GetTrackingReminderNotificationsResponse":38,"./model/Image":39,"./model/JsonErrorResponse":40,"./model/Measurement":41,"./model/MeasurementDelete":42,"./model/MeasurementItem":43,"./model/MeasurementSet":44,"./model/MeasurementUpdate":45,"./model/Pair":46,"./model/ParticipantInstruction":47,"./model/PostCorrelation":48,"./model/PostMeasurementsDataResponse":49,"./model/PostMeasurementsResponse":50,"./model/PostStudyPublishResponse":51,"./model/PostTrackingRemindersDataResponse":52,"./model/PostTrackingRemindersResponse":53,"./model/PostUserSettingsDataResponse":54,"./model/PostUserSettingsResponse":55,"./model/Scope":56,"./model/Study":57,"./model/StudyCharts":58,"./model/StudyHtml":59,"./model/StudyImages":60,"./model/StudyLinks":61,"./model/StudyText":62,"./model/TrackingReminder":63,"./model/TrackingReminderDelete":64,"./model/TrackingReminderNotification":65,"./model/TrackingReminderNotificationAction":66,"./model/TrackingReminderNotificationPost":67,"./model/TrackingReminderNotificationTrackAllAction":68,"./model/Unit":69,"./model/UnitCategory":70,"./model/User":71,"./model/UserTag":72,"./model/UserVariableDelete":73,"./model/Variable":74,"./model/VariableCategory":75,"./model/VariableCharts":76,"./model/Vote":77,"./model/VoteDelete":78}],22:[function(require,module,exports){
/**
 * quantimodo
 * We make it easy to retrieve and analyze normalized user data from a wide array of devices and applications. Check out our [docs and sdk's](https://github.com/QuantiModo/docs) or [contact us](https://help.quantimo.do).
 *
 * OpenAPI spec version: 5.8.112511
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.3.1
 *
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/User'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./User'));
  } else {
    // Browser globals (root is window)
    if (!root.Quantimodo) {
      root.Quantimodo = {};
    }
    root.Quantimodo.AppSettings = factory(root.Quantimodo.ApiClient, root.Quantimodo.User);
  }
}(this, function(ApiClient, User) {
  'use strict';




  /**
   * The AppSettings model module.
   * @module model/AppSettings
   * @version 5.8.112511
   */

  /**
   * Constructs a new <code>AppSettings</code>.
   * @alias module:model/AppSettings
   * @class
   * @param clientId {String} 
   */
  var exports = function(clientId) {
    var _this = this;








    _this['clientId'] = clientId;












  };

  /**
   * Constructs a <code>AppSettings</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/AppSettings} obj Optional instance to populate.
   * @return {module:model/AppSettings} The populated <code>AppSettings</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('additionalSettings')) {
        obj['additionalSettings'] = ApiClient.convertToType(data['additionalSettings'], Object);
      }
      if (data.hasOwnProperty('appDescription')) {
        obj['appDescription'] = ApiClient.convertToType(data['appDescription'], 'String');
      }
      if (data.hasOwnProperty('appDesign')) {
        obj['appDesign'] = ApiClient.convertToType(data['appDesign'], Object);
      }
      if (data.hasOwnProperty('appDisplayName')) {
        obj['appDisplayName'] = ApiClient.convertToType(data['appDisplayName'], 'String');
      }
      if (data.hasOwnProperty('appStatus')) {
        obj['appStatus'] = ApiClient.convertToType(data['appStatus'], Object);
      }
      if (data.hasOwnProperty('appType')) {
        obj['appType'] = ApiClient.convertToType(data['appType'], 'String');
      }
      if (data.hasOwnProperty('buildEnabled')) {
        obj['buildEnabled'] = ApiClient.convertToType(data['buildEnabled'], 'String');
      }
      if (data.hasOwnProperty('clientId')) {
        obj['clientId'] = ApiClient.convertToType(data['clientId'], 'String');
      }
      if (data.hasOwnProperty('clientSecret')) {
        obj['clientSecret'] = ApiClient.convertToType(data['clientSecret'], 'String');
      }
      if (data.hasOwnProperty('collaborators')) {
        obj['collaborators'] = ApiClient.convertToType(data['collaborators'], [User]);
      }
      if (data.hasOwnProperty('createdAt')) {
        obj['createdAt'] = ApiClient.convertToType(data['createdAt'], 'String');
      }
      if (data.hasOwnProperty('userId')) {
        obj['userId'] = ApiClient.convertToType(data['userId'], 'String');
      }
      if (data.hasOwnProperty('users')) {
        obj['users'] = ApiClient.convertToType(data['users'], [User]);
      }
      if (data.hasOwnProperty('redirectUri')) {
        obj['redirectUri'] = ApiClient.convertToType(data['redirectUri'], 'String');
      }
      if (data.hasOwnProperty('companyName')) {
        obj['companyName'] = ApiClient.convertToType(data['companyName'], 'String');
      }
      if (data.hasOwnProperty('homepageUrl')) {
        obj['homepageUrl'] = ApiClient.convertToType(data['homepageUrl'], 'String');
      }
      if (data.hasOwnProperty('iconUrl')) {
        obj['iconUrl'] = ApiClient.convertToType(data['iconUrl'], 'String');
      }
      if (data.hasOwnProperty('longDescription')) {
        obj['longDescription'] = ApiClient.convertToType(data['longDescription'], 'String');
      }
      if (data.hasOwnProperty('splashScreen')) {
        obj['splashScreen'] = ApiClient.convertToType(data['splashScreen'], 'String');
      }
      if (data.hasOwnProperty('textLogo')) {
        obj['textLogo'] = ApiClient.convertToType(data['textLogo'], 'String');
      }
    }
    return obj;
  }

  /**
   * 
   * @member {Object} additionalSettings
   */
  exports.prototype['additionalSettings'] = undefined;
  /**
   * 
   * @member {String} appDescription
   */
  exports.prototype['appDescription'] = undefined;
  /**
   * 
   * @member {Object} appDesign
   */
  exports.prototype['appDesign'] = undefined;
  /**
   * 
   * @member {String} appDisplayName
   */
  exports.prototype['appDisplayName'] = undefined;
  /**
   * 
   * @member {Object} appStatus
   */
  exports.prototype['appStatus'] = undefined;
  /**
   * 
   * @member {String} appType
   */
  exports.prototype['appType'] = undefined;
  /**
   * 
   * @member {String} buildEnabled
   */
  exports.prototype['buildEnabled'] = undefined;
  /**
   * 
   * @member {String} clientId
   */
  exports.prototype['clientId'] = undefined;
  /**
   * 
   * @member {String} clientSecret
   */
  exports.prototype['clientSecret'] = undefined;
  /**
   * 
   * @member {Array.<module:model/User>} collaborators
   */
  exports.prototype['collaborators'] = undefined;
  /**
   * 
   * @member {String} createdAt
   */
  exports.prototype['createdAt'] = undefined;
  /**
   * 
   * @member {String} userId
   */
  exports.prototype['userId'] = undefined;
  /**
   * 
   * @member {Array.<module:model/User>} users
   */
  exports.prototype['users'] = undefined;
  /**
   * 
   * @member {String} redirectUri
   */
  exports.prototype['redirectUri'] = undefined;
  /**
   * 
   * @member {String} companyName
   */
  exports.prototype['companyName'] = undefined;
  /**
   * 
   * @member {String} homepageUrl
   */
  exports.prototype['homepageUrl'] = undefined;
  /**
   * 
   * @member {String} iconUrl
   */
  exports.prototype['iconUrl'] = undefined;
  /**
   * 
   * @member {String} longDescription
   */
  exports.prototype['longDescription'] = undefined;
  /**
   * 
   * @member {String} splashScreen
   */
  exports.prototype['splashScreen'] = undefined;
  /**
   * 
   * @member {String} textLogo
   */
  exports.prototype['textLogo'] = undefined;



  return exports;
}));



},{"../ApiClient":9,"./User":71}],23:[function(require,module,exports){
/**
 * quantimodo
 * We make it easy to retrieve and analyze normalized user data from a wide array of devices and applications. Check out our [docs and sdk's](https://github.com/QuantiModo/docs) or [contact us](https://help.quantimo.do).
 *
 * OpenAPI spec version: 5.8.112511
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.3.1
 *
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/AppSettings'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./AppSettings'));
  } else {
    // Browser globals (root is window)
    if (!root.Quantimodo) {
      root.Quantimodo = {};
    }
    root.Quantimodo.AppSettingsResponse = factory(root.Quantimodo.ApiClient, root.Quantimodo.AppSettings);
  }
}(this, function(ApiClient, AppSettings) {
  'use strict';




  /**
   * The AppSettingsResponse model module.
   * @module model/AppSettingsResponse
   * @version 5.8.112511
   */

  /**
   * Constructs a new <code>AppSettingsResponse</code>.
   * @alias module:model/AppSettingsResponse
   * @class
   * @param status {Number} Status code
   */
  var exports = function(status) {
    var _this = this;



    _this['status'] = status;

  };

  /**
   * Constructs a <code>AppSettingsResponse</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/AppSettingsResponse} obj Optional instance to populate.
   * @return {module:model/AppSettingsResponse} The populated <code>AppSettingsResponse</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('appSettings')) {
        obj['appSettings'] = AppSettings.constructFromObject(data['appSettings']);
      }
      if (data.hasOwnProperty('message')) {
        obj['message'] = ApiClient.convertToType(data['message'], 'String');
      }
      if (data.hasOwnProperty('status')) {
        obj['status'] = ApiClient.convertToType(data['status'], 'Number');
      }
      if (data.hasOwnProperty('success')) {
        obj['success'] = ApiClient.convertToType(data['success'], 'Boolean');
      }
    }
    return obj;
  }

  /**
   * @member {module:model/AppSettings} appSettings
   */
  exports.prototype['appSettings'] = undefined;
  /**
   * Message
   * @member {String} message
   */
  exports.prototype['message'] = undefined;
  /**
   * Status code
   * @member {Number} status
   */
  exports.prototype['status'] = undefined;
  /**
   * @member {Boolean} success
   */
  exports.prototype['success'] = undefined;



  return exports;
}));



},{"../ApiClient":9,"./AppSettings":22}],24:[function(require,module,exports){
/**
 * quantimodo
 * We make it easy to retrieve and analyze normalized user data from a wide array of devices and applications. Check out our [docs and sdk's](https://github.com/QuantiModo/docs) or [contact us](https://help.quantimo.do).
 *
 * OpenAPI spec version: 5.8.112511
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.3.1
 *
 * Do not edit the class manually.
 *
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
    if (!root.Quantimodo) {
      root.Quantimodo = {};
    }
    root.Quantimodo.Button = factory(root.Quantimodo.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The Button model module.
   * @module model/Button
   * @version 5.8.112511
   */

  /**
   * Constructs a new <code>Button</code>.
   * @alias module:model/Button
   * @class
   * @param link {String} Example: https://local.quantimo.do
   * @param text {String} Example: Connect
   */
  var exports = function(link, text) {
    var _this = this;

    _this['link'] = link;
    _this['text'] = text;



  };

  /**
   * Constructs a <code>Button</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/Button} obj Optional instance to populate.
   * @return {module:model/Button} The populated <code>Button</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('link')) {
        obj['link'] = ApiClient.convertToType(data['link'], 'String');
      }
      if (data.hasOwnProperty('text')) {
        obj['text'] = ApiClient.convertToType(data['text'], 'String');
      }
      if (data.hasOwnProperty('ionIcon')) {
        obj['ionIcon'] = ApiClient.convertToType(data['ionIcon'], 'String');
      }
      if (data.hasOwnProperty('color')) {
        obj['color'] = ApiClient.convertToType(data['color'], 'String');
      }
      if (data.hasOwnProperty('additionalInformation')) {
        obj['additionalInformation'] = ApiClient.convertToType(data['additionalInformation'], 'String');
      }
    }
    return obj;
  }

  /**
   * Example: https://local.quantimo.do
   * @member {String} link
   */
  exports.prototype['link'] = undefined;
  /**
   * Example: Connect
   * @member {String} text
   */
  exports.prototype['text'] = undefined;
  /**
   * Example: ion-refresh
   * @member {String} ionIcon
   */
  exports.prototype['ionIcon'] = undefined;
  /**
   * Example: #f2f2f2
   * @member {String} color
   */
  exports.prototype['color'] = undefined;
  /**
   * Example: connect
   * @member {String} additionalInformation
   */
  exports.prototype['additionalInformation'] = undefined;



  return exports;
}));



},{"../ApiClient":9}],25:[function(require,module,exports){
/**
 * quantimodo
 * We make it easy to retrieve and analyze normalized user data from a wide array of devices and applications. Check out our [docs and sdk's](https://github.com/QuantiModo/docs) or [contact us](https://help.quantimo.do).
 *
 * OpenAPI spec version: 5.8.112511
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.3.1
 *
 * Do not edit the class manually.
 *
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
    if (!root.Quantimodo) {
      root.Quantimodo = {};
    }
    root.Quantimodo.Chart = factory(root.Quantimodo.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The Chart model module.
   * @module model/Chart
   * @version 5.8.112511
   */

  /**
   * Constructs a new <code>Chart</code>.
   * @alias module:model/Chart
   * @class
   */
  var exports = function() {
    var _this = this;







  };

  /**
   * Constructs a <code>Chart</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/Chart} obj Optional instance to populate.
   * @return {module:model/Chart} The populated <code>Chart</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('highchartConfig')) {
        obj['highchartConfig'] = ApiClient.convertToType(data['highchartConfig'], Object);
      }
      if (data.hasOwnProperty('chartId')) {
        obj['chartId'] = ApiClient.convertToType(data['chartId'], 'String');
      }
      if (data.hasOwnProperty('chartTitle')) {
        obj['chartTitle'] = ApiClient.convertToType(data['chartTitle'], 'String');
      }
      if (data.hasOwnProperty('explanation')) {
        obj['explanation'] = ApiClient.convertToType(data['explanation'], 'String');
      }
      if (data.hasOwnProperty('svgUrl')) {
        obj['svgUrl'] = ApiClient.convertToType(data['svgUrl'], 'String');
      }
      if (data.hasOwnProperty('svg')) {
        obj['svg'] = ApiClient.convertToType(data['svg'], 'String');
      }
    }
    return obj;
  }

  /**
   *  Highcharts config that can be used if you have highcharts.js included on the page
   * @member {Object} highchartConfig
   */
  exports.prototype['highchartConfig'] = undefined;
  /**
   * Example: correlationScatterPlot
   * @member {String} chartId
   */
  exports.prototype['chartId'] = undefined;
  /**
   * Example: Overall Mood following Sleep Duration (R = -0.173)
   * @member {String} chartTitle
   */
  exports.prototype['chartTitle'] = undefined;
  /**
   * Example: The chart above indicates that an increase in Sleep Duration is usually followed by an decrease in Overall Mood.
   * @member {String} explanation
   */
  exports.prototype['explanation'] = undefined;
  /**
   * Url to a static svg of the chart
   * @member {String} svgUrl
   */
  exports.prototype['svgUrl'] = undefined;
  /**
   * SVG string than can be embedded directly in HTML
   * @member {String} svg
   */
  exports.prototype['svg'] = undefined;



  return exports;
}));



},{"../ApiClient":9}],26:[function(require,module,exports){
/**
 * quantimodo
 * We make it easy to retrieve and analyze normalized user data from a wide array of devices and applications. Check out our [docs and sdk's](https://github.com/QuantiModo/docs) or [contact us](https://help.quantimo.do).
 *
 * OpenAPI spec version: 5.8.112511
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.3.1
 *
 * Do not edit the class manually.
 *
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
    if (!root.Quantimodo) {
      root.Quantimodo = {};
    }
    root.Quantimodo.CommonResponse = factory(root.Quantimodo.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The CommonResponse model module.
   * @module model/CommonResponse
   * @version 5.8.112511
   */

  /**
   * Constructs a new <code>CommonResponse</code>.
   * @alias module:model/CommonResponse
   * @class
   * @param status {Number} Status code
   * @param success {Boolean} 
   */
  var exports = function(status, success) {
    var _this = this;


    _this['status'] = status;
    _this['success'] = success;
  };

  /**
   * Constructs a <code>CommonResponse</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/CommonResponse} obj Optional instance to populate.
   * @return {module:model/CommonResponse} The populated <code>CommonResponse</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('message')) {
        obj['message'] = ApiClient.convertToType(data['message'], 'String');
      }
      if (data.hasOwnProperty('status')) {
        obj['status'] = ApiClient.convertToType(data['status'], 'Number');
      }
      if (data.hasOwnProperty('success')) {
        obj['success'] = ApiClient.convertToType(data['success'], 'Boolean');
      }
    }
    return obj;
  }

  /**
   * Message
   * @member {String} message
   */
  exports.prototype['message'] = undefined;
  /**
   * Status code
   * @member {Number} status
   */
  exports.prototype['status'] = undefined;
  /**
   * @member {Boolean} success
   */
  exports.prototype['success'] = undefined;



  return exports;
}));



},{"../ApiClient":9}],27:[function(require,module,exports){
/**
 * quantimodo
 * We make it easy to retrieve and analyze normalized user data from a wide array of devices and applications. Check out our [docs and sdk's](https://github.com/QuantiModo/docs) or [contact us](https://help.quantimo.do).
 *
 * OpenAPI spec version: 5.8.112511
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.3.1
 *
 * Do not edit the class manually.
 *
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
    if (!root.Quantimodo) {
      root.Quantimodo = {};
    }
    root.Quantimodo.ConnectInstructions = factory(root.Quantimodo.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The ConnectInstructions model module.
   * @module model/ConnectInstructions
   * @version 5.8.112511
   */

  /**
   * Constructs a new <code>ConnectInstructions</code>.
   * @alias module:model/ConnectInstructions
   * @class
   * @param url {String} URL to open to connect
   */
  var exports = function(url) {
    var _this = this;


    _this['url'] = url;

  };

  /**
   * Constructs a <code>ConnectInstructions</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ConnectInstructions} obj Optional instance to populate.
   * @return {module:model/ConnectInstructions} The populated <code>ConnectInstructions</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('parameters')) {
        obj['parameters'] = ApiClient.convertToType(data['parameters'], [Object]);
      }
      if (data.hasOwnProperty('url')) {
        obj['url'] = ApiClient.convertToType(data['url'], 'String');
      }
      if (data.hasOwnProperty('usePopup')) {
        obj['usePopup'] = ApiClient.convertToType(data['usePopup'], 'Boolean');
      }
    }
    return obj;
  }

  /**
   * Create a form with these fields and post the key and user submitted value to the provided connect url
   * @member {Array.<Object>} parameters
   */
  exports.prototype['parameters'] = undefined;
  /**
   * URL to open to connect
   * @member {String} url
   */
  exports.prototype['url'] = undefined;
  /**
   * True if should open auth window in popup
   * @member {Boolean} usePopup
   */
  exports.prototype['usePopup'] = undefined;



  return exports;
}));



},{"../ApiClient":9}],28:[function(require,module,exports){
/**
 * quantimodo
 * We make it easy to retrieve and analyze normalized user data from a wide array of devices and applications. Check out our [docs and sdk's](https://github.com/QuantiModo/docs) or [contact us](https://help.quantimo.do).
 *
 * OpenAPI spec version: 5.8.112511
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.3.1
 *
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/Button', 'model/ConnectInstructions'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./Button'), require('./ConnectInstructions'));
  } else {
    // Browser globals (root is window)
    if (!root.Quantimodo) {
      root.Quantimodo = {};
    }
    root.Quantimodo.Connector = factory(root.Quantimodo.ApiClient, root.Quantimodo.Button, root.Quantimodo.ConnectInstructions);
  }
}(this, function(ApiClient, Button, ConnectInstructions) {
  'use strict';




  /**
   * The Connector model module.
   * @module model/Connector
   * @version 5.8.112511
   */

  /**
   * Constructs a new <code>Connector</code>.
   * @alias module:model/Connector
   * @class
   * @param connected {Boolean} True if the authenticated user has this connector enabled
   * @param connectInstructions {module:model/ConnectInstructions} URL and parameters used when connecting to a service
   * @param displayName {String} Connector pretty display name
   * @param getItUrl {String} URL to a site where one can get this device or application
   * @param id {Number} Connector ID number
   * @param image {String} URL to the image of the connector logo
   * @param lastUpdate {Number} Epoch timestamp of last sync
   * @param name {String} Connector lowercase system name
   * @param totalMeasurementsInLastUpdate {Number} Number of measurements obtained during latest update
   */
  var exports = function(connected, connectInstructions, displayName, getItUrl, id, image, lastUpdate, name, totalMeasurementsInLastUpdate) {
    var _this = this;





    _this['connected'] = connected;

    _this['connectInstructions'] = connectInstructions;





    _this['displayName'] = displayName;

    _this['getItUrl'] = getItUrl;
    _this['id'] = id;
    _this['image'] = image;


    _this['lastUpdate'] = lastUpdate;




    _this['name'] = name;





    _this['totalMeasurementsInLastUpdate'] = totalMeasurementsInLastUpdate;




  };

  /**
   * Constructs a <code>Connector</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/Connector} obj Optional instance to populate.
   * @return {module:model/Connector} The populated <code>Connector</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('affiliate')) {
        obj['affiliate'] = ApiClient.convertToType(data['affiliate'], 'Boolean');
      }
      if (data.hasOwnProperty('backgroundColor')) {
        obj['backgroundColor'] = ApiClient.convertToType(data['backgroundColor'], 'String');
      }
      if (data.hasOwnProperty('buttons')) {
        obj['buttons'] = ApiClient.convertToType(data['buttons'], [Button]);
      }
      if (data.hasOwnProperty('clientId')) {
        obj['clientId'] = ApiClient.convertToType(data['clientId'], 'String');
      }
      if (data.hasOwnProperty('connected')) {
        obj['connected'] = ApiClient.convertToType(data['connected'], 'Boolean');
      }
      if (data.hasOwnProperty('connectError')) {
        obj['connectError'] = ApiClient.convertToType(data['connectError'], 'String');
      }
      if (data.hasOwnProperty('connectInstructions')) {
        obj['connectInstructions'] = ConnectInstructions.constructFromObject(data['connectInstructions']);
      }
      if (data.hasOwnProperty('connectorClientId')) {
        obj['connectorClientId'] = ApiClient.convertToType(data['connectorClientId'], 'String');
      }
      if (data.hasOwnProperty('connectorId')) {
        obj['connectorId'] = ApiClient.convertToType(data['connectorId'], 'Number');
      }
      if (data.hasOwnProperty('connectStatus')) {
        obj['connectStatus'] = ApiClient.convertToType(data['connectStatus'], 'String');
      }
      if (data.hasOwnProperty('createdAt')) {
        obj['createdAt'] = ApiClient.convertToType(data['createdAt'], 'String');
      }
      if (data.hasOwnProperty('defaultVariableCategoryName')) {
        obj['defaultVariableCategoryName'] = ApiClient.convertToType(data['defaultVariableCategoryName'], 'String');
      }
      if (data.hasOwnProperty('displayName')) {
        obj['displayName'] = ApiClient.convertToType(data['displayName'], 'String');
      }
      if (data.hasOwnProperty('enabled')) {
        obj['enabled'] = ApiClient.convertToType(data['enabled'], 'Number');
      }
      if (data.hasOwnProperty('getItUrl')) {
        obj['getItUrl'] = ApiClient.convertToType(data['getItUrl'], 'String');
      }
      if (data.hasOwnProperty('id')) {
        obj['id'] = ApiClient.convertToType(data['id'], 'Number');
      }
      if (data.hasOwnProperty('image')) {
        obj['image'] = ApiClient.convertToType(data['image'], 'String');
      }
      if (data.hasOwnProperty('imageHtml')) {
        obj['imageHtml'] = ApiClient.convertToType(data['imageHtml'], 'String');
      }
      if (data.hasOwnProperty('lastSuccessfulUpdatedAt')) {
        obj['lastSuccessfulUpdatedAt'] = ApiClient.convertToType(data['lastSuccessfulUpdatedAt'], 'String');
      }
      if (data.hasOwnProperty('lastUpdate')) {
        obj['lastUpdate'] = ApiClient.convertToType(data['lastUpdate'], 'Number');
      }
      if (data.hasOwnProperty('linkedDisplayNameHtml')) {
        obj['linkedDisplayNameHtml'] = ApiClient.convertToType(data['linkedDisplayNameHtml'], 'String');
      }
      if (data.hasOwnProperty('longDescription')) {
        obj['longDescription'] = ApiClient.convertToType(data['longDescription'], 'String');
      }
      if (data.hasOwnProperty('message')) {
        obj['message'] = ApiClient.convertToType(data['message'], 'String');
      }
      if (data.hasOwnProperty('mobileConnectMethod')) {
        obj['mobileConnectMethod'] = ApiClient.convertToType(data['mobileConnectMethod'], 'String');
      }
      if (data.hasOwnProperty('name')) {
        obj['name'] = ApiClient.convertToType(data['name'], 'String');
      }
      if (data.hasOwnProperty('platforms')) {
        obj['platforms'] = ApiClient.convertToType(data['platforms'], ['String']);
      }
      if (data.hasOwnProperty('premium')) {
        obj['premium'] = ApiClient.convertToType(data['premium'], 'Boolean');
      }
      if (data.hasOwnProperty('scopes')) {
        obj['scopes'] = ApiClient.convertToType(data['scopes'], ['String']);
      }
      if (data.hasOwnProperty('shortDescription')) {
        obj['shortDescription'] = ApiClient.convertToType(data['shortDescription'], 'String');
      }
      if (data.hasOwnProperty('spreadsheetUpload')) {
        obj['spreadsheetUpload'] = ApiClient.convertToType(data['spreadsheetUpload'], 'Boolean');
      }
      if (data.hasOwnProperty('totalMeasurementsInLastUpdate')) {
        obj['totalMeasurementsInLastUpdate'] = ApiClient.convertToType(data['totalMeasurementsInLastUpdate'], 'Number');
      }
      if (data.hasOwnProperty('updatedAt')) {
        obj['updatedAt'] = ApiClient.convertToType(data['updatedAt'], 'String');
      }
      if (data.hasOwnProperty('updateRequestedAt')) {
        obj['updateRequestedAt'] = ApiClient.convertToType(data['updateRequestedAt'], 'String');
      }
      if (data.hasOwnProperty('updateStatus')) {
        obj['updateStatus'] = ApiClient.convertToType(data['updateStatus'], 'String');
      }
      if (data.hasOwnProperty('userId')) {
        obj['userId'] = ApiClient.convertToType(data['userId'], 'Number');
      }
    }
    return obj;
  }

  /**
   * Example: false
   * @member {Boolean} affiliate
   */
  exports.prototype['affiliate'] = undefined;
  /**
   * Background color HEX code that matches the icon
   * @member {String} backgroundColor
   */
  exports.prototype['backgroundColor'] = undefined;
  /**
   * @member {Array.<module:model/Button>} buttons
   */
  exports.prototype['buttons'] = undefined;
  /**
   * Example: ghostInspector
   * @member {String} clientId
   */
  exports.prototype['clientId'] = undefined;
  /**
   * True if the authenticated user has this connector enabled
   * @member {Boolean} connected
   */
  exports.prototype['connected'] = undefined;
  /**
   * Example: Your token is expired. Please re-connect
   * @member {String} connectError
   */
  exports.prototype['connectError'] = undefined;
  /**
   * URL and parameters used when connecting to a service
   * @member {module:model/ConnectInstructions} connectInstructions
   */
  exports.prototype['connectInstructions'] = undefined;
  /**
   * Example: 225078261031461
   * @member {String} connectorClientId
   */
  exports.prototype['connectorClientId'] = undefined;
  /**
   * Example: 8
   * @member {Number} connectorId
   */
  exports.prototype['connectorId'] = undefined;
  /**
   * Example: CONNECTED
   * @member {String} connectStatus
   */
  exports.prototype['connectStatus'] = undefined;
  /**
   * Example: 2000-01-01 00:00:00 UTC ISO 8601 YYYY-MM-DDThh:mm:ss
   * @member {String} createdAt
   */
  exports.prototype['createdAt'] = undefined;
  /**
   * Example: Social Interactions
   * @member {String} defaultVariableCategoryName
   */
  exports.prototype['defaultVariableCategoryName'] = undefined;
  /**
   * Connector pretty display name
   * @member {String} displayName
   */
  exports.prototype['displayName'] = undefined;
  /**
   * Example: 1
   * @member {Number} enabled
   */
  exports.prototype['enabled'] = undefined;
  /**
   * URL to a site where one can get this device or application
   * @member {String} getItUrl
   */
  exports.prototype['getItUrl'] = undefined;
  /**
   * Connector ID number
   * @member {Number} id
   */
  exports.prototype['id'] = undefined;
  /**
   * URL to the image of the connector logo
   * @member {String} image
   */
  exports.prototype['image'] = undefined;
  /**
   * Example: <a href=\"http://www.facebook.com\"><img id=\"facebook_image\" title=\"Facebook\" src=\"https://i.imgur.com/GhwqK4f.png\" alt=\"Facebook\"></a>
   * @member {String} imageHtml
   */
  exports.prototype['imageHtml'] = undefined;
  /**
   * Example: 2017-07-31 10:10:34 UTC ISO 8601 YYYY-MM-DDThh:mm:ss
   * @member {String} lastSuccessfulUpdatedAt
   */
  exports.prototype['lastSuccessfulUpdatedAt'] = undefined;
  /**
   * Epoch timestamp of last sync
   * @member {Number} lastUpdate
   */
  exports.prototype['lastUpdate'] = undefined;
  /**
   * Example: <a href=\"http://www.facebook.com\">Facebook</a>
   * @member {String} linkedDisplayNameHtml
   */
  exports.prototype['linkedDisplayNameHtml'] = undefined;
  /**
   * Example: Facebook is a social networking website where users may create a personal profile, add other users as friends, and exchange messages.
   * @member {String} longDescription
   */
  exports.prototype['longDescription'] = undefined;
  /**
   * Example: Got 412 new measurements on 2017-07-31 10:10:34
   * @member {String} message
   */
  exports.prototype['message'] = undefined;
  /**
   * Mobile connect method: webview, cordova, google, spreadsheet, or ip
   * @member {String} mobileConnectMethod
   */
  exports.prototype['mobileConnectMethod'] = undefined;
  /**
   * Connector lowercase system name
   * @member {String} name
   */
  exports.prototype['name'] = undefined;
  /**
   * Platforms (chrome, android, ios, web) that you can connect on.
   * @member {Array.<String>} platforms
   */
  exports.prototype['platforms'] = undefined;
  /**
   * True if connection requires upgrade
   * @member {Boolean} premium
   */
  exports.prototype['premium'] = undefined;
  /**
   * Required connector scopes
   * @member {Array.<String>} scopes
   */
  exports.prototype['scopes'] = undefined;
  /**
   * Example: Tracks social interaction. QuantiModo requires permission to access your Facebook \"user likes\" and \"user posts\".
   * @member {String} shortDescription
   */
  exports.prototype['shortDescription'] = undefined;
  /**
   * True if the user must upload a spreadsheet.  Post the uploaded spreadsheet with your clientId and user accessToken to https://app.quantimo.do/api/v2/spreadsheetUpload
   * @member {Boolean} spreadsheetUpload
   */
  exports.prototype['spreadsheetUpload'] = undefined;
  /**
   * Number of measurements obtained during latest update
   * @member {Number} totalMeasurementsInLastUpdate
   */
  exports.prototype['totalMeasurementsInLastUpdate'] = undefined;
  /**
   * Example: 2017-07-31 10:10:34 UTC ISO 8601 YYYY-MM-DDThh:mm:ss
   * @member {String} updatedAt
   */
  exports.prototype['updatedAt'] = undefined;
  /**
   * Example: 2017-07-18 05:16:31 UTC ISO 8601 YYYY-MM-DDThh:mm:ss
   * @member {String} updateRequestedAt
   */
  exports.prototype['updateRequestedAt'] = undefined;
  /**
   * Example: UPDATED
   * @member {String} updateStatus
   */
  exports.prototype['updateStatus'] = undefined;
  /**
   * Example: 230
   * @member {Number} userId
   */
  exports.prototype['userId'] = undefined;



  return exports;
}));



},{"../ApiClient":9,"./Button":24,"./ConnectInstructions":27}],29:[function(require,module,exports){
/**
 * quantimodo
 * We make it easy to retrieve and analyze normalized user data from a wide array of devices and applications. Check out our [docs and sdk's](https://github.com/QuantiModo/docs) or [contact us](https://help.quantimo.do).
 *
 * OpenAPI spec version: 5.8.112511
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.3.1
 *
 * Do not edit the class manually.
 *
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
    if (!root.Quantimodo) {
      root.Quantimodo = {};
    }
    root.Quantimodo.ConversionStep = factory(root.Quantimodo.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The ConversionStep model module.
   * @module model/ConversionStep
   * @version 5.8.112511
   */

  /**
   * Constructs a new <code>ConversionStep</code>.
   * @alias module:model/ConversionStep
   * @class
   * @param operation {module:model/ConversionStep.OperationEnum} ADD or MULTIPLY
   * @param value {Number} This specifies the order of conversion steps starting with 0
   */
  var exports = function(operation, value) {
    var _this = this;

    _this['operation'] = operation;
    _this['value'] = value;
  };

  /**
   * Constructs a <code>ConversionStep</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ConversionStep} obj Optional instance to populate.
   * @return {module:model/ConversionStep} The populated <code>ConversionStep</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('operation')) {
        obj['operation'] = ApiClient.convertToType(data['operation'], 'String');
      }
      if (data.hasOwnProperty('value')) {
        obj['value'] = ApiClient.convertToType(data['value'], 'Number');
      }
    }
    return obj;
  }

  /**
   * ADD or MULTIPLY
   * @member {module:model/ConversionStep.OperationEnum} operation
   */
  exports.prototype['operation'] = undefined;
  /**
   * This specifies the order of conversion steps starting with 0
   * @member {Number} value
   */
  exports.prototype['value'] = undefined;


  /**
   * Allowed values for the <code>operation</code> property.
   * @enum {String}
   * @readonly
   */
  exports.OperationEnum = {
    /**
     * value: "ADD"
     * @const
     */
    "ADD": "ADD",
    /**
     * value: "MULTIPLY"
     * @const
     */
    "MULTIPLY": "MULTIPLY"  };


  return exports;
}));



},{"../ApiClient":9}],30:[function(require,module,exports){
/**
 * quantimodo
 * We make it easy to retrieve and analyze normalized user data from a wide array of devices and applications. Check out our [docs and sdk's](https://github.com/QuantiModo/docs) or [contact us](https://help.quantimo.do).
 *
 * OpenAPI spec version: 5.8.112511
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.3.1
 *
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/DataSource', 'model/StudyHtml', 'model/StudyImages', 'model/StudyLinks', 'model/StudyText'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./DataSource'), require('./StudyHtml'), require('./StudyImages'), require('./StudyLinks'), require('./StudyText'));
  } else {
    // Browser globals (root is window)
    if (!root.Quantimodo) {
      root.Quantimodo = {};
    }
    root.Quantimodo.Correlation = factory(root.Quantimodo.ApiClient, root.Quantimodo.DataSource, root.Quantimodo.StudyHtml, root.Quantimodo.StudyImages, root.Quantimodo.StudyLinks, root.Quantimodo.StudyText);
  }
}(this, function(ApiClient, DataSource, StudyHtml, StudyImages, StudyLinks, StudyText) {
  'use strict';




  /**
   * The Correlation model module.
   * @module model/Correlation
   * @version 5.8.112511
   */

  /**
   * Constructs a new <code>Correlation</code>.
   * @alias module:model/Correlation
   * @class
   * @param averageDailyHighCause {Number} Example: 4.19
   * @param averageDailyLowCause {Number} Example: 1.97
   * @param averageEffect {Number} Example: 3.0791054117396
   * @param averageEffectFollowingHighCause {Number} Example: 3.55
   * @param averageEffectFollowingLowCause {Number} Example: 2.65
   * @param averageForwardPearsonCorrelationOverOnsetDelays {Number} Example: 0.396
   * @param averageReversePearsonCorrelationOverOnsetDelays {Number} Example: 0.453667
   * @param averageVote {Number} Example: 0.9855
   * @param causeChanges {Number} Example: 164
   * @param causeUserVariableShareUserMeasurements {Number} Example: 1
   * @param causeVariableName {String} Example: Sleep Quality
   * @param confidenceInterval {Number} Example: 0.14344467795996
   * @param confidenceLevel {String} Example: high
   * @param correlationCoefficient {Number} Example: 0.538
   * @param createdAt {String} Example: 2016-12-28 20:47:30 UTC ISO 8601 YYYY-MM-DDThh:mm:ss
   * @param criticalTValue {Number} Example: 1.646
   * @param direction {String} Example: higher
   * @param durationOfAction {Number} Example: 604800
   * @param durationOfActionInHours {Number} Example: 168
   * @param effectChanges {Number} Example: 193
   * @param effectSize {String} Example: moderately positive
   * @param effectUnit {String} Example: /5
   * @param effectVariableName {String} Example: Overall Mood
   * @param experimentEndTime {String} Example: 2014-07-30 12:50:00 UTC ISO 8601 YYYY-MM-DDThh:mm:ss
   * @param experimentStartTime {String} Example: 2012-05-06 21:15:00 UTC ISO 8601 YYYY-MM-DDThh:mm:ss
   * @param forwardSpearmanCorrelationCoefficient {Number} Example: 0.528359
   * @param numberOfPairs {Number} Example: 298
   * @param onsetDelay {Number} Example: 0
   * @param onsetDelayInHours {Number} Example: 0
   * @param onsetDelayWithStrongestPearsonCorrelation {Number} Example: -86400
   * @param onsetDelayWithStrongestPearsonCorrelationInHours {Number} Example: -24
   * @param optimalPearsonProduct {Number} Example: 0.68582816186982
   * @param outcomeFillingValue {Number} Example: -1
   * @param pearsonCorrelationWithNoOnsetDelay {Number} Example: 0.477
   * @param predictivePearsonCorrelation {Number} Example: 0.538
   * @param predictivePearsonCorrelationCoefficient {Number} Example: 0.538
   * @param predictorDataSources {String} Example: RescueTime
   * @param predictorFillingValue {Number} Example: -1
   * @param predictorMaximumAllowedValue {Number} Example: 200
   * @param predictorMinimumAllowedValue {Number} Example: 30
   * @param predictsHighEffectChange {Number} Example: 17
   * @param predictsLowEffectChange {Number} Example: -11
   * @param qmScore {Number} Example: 0.528
   * @param reversePearsonCorrelationCoefficient {Number} Example: 0.01377184270977
   * @param shareUserMeasurements {Boolean} Example: 1
   * @param significantDifference {Boolean} Example: 1
   * @param statisticalSignificance {Number} Example: 0.9813
   * @param strengthLevel {String} Example: moderate
   * @param strongestPearsonCorrelationCoefficient {Number} Example: 0.613
   * @param tValue {Number} Example: 9.6986079652717
   * @param updatedAt {String} Example: 2017-05-06 15:40:38 UTC ISO 8601 YYYY-MM-DDThh:mm:ss
   * @param userId {Number} Example: 230
   * @param userVote {Number} Example: 1
   * @param valuePredictingHighOutcome {Number} Example: 4.14
   * @param valuePredictingLowOutcome {Number} Example: 3.03
   */
  var exports = function(averageDailyHighCause, averageDailyLowCause, averageEffect, averageEffectFollowingHighCause, averageEffectFollowingLowCause, averageForwardPearsonCorrelationOverOnsetDelays, averageReversePearsonCorrelationOverOnsetDelays, averageVote, causeChanges, causeUserVariableShareUserMeasurements, causeVariableName, confidenceInterval, confidenceLevel, correlationCoefficient, createdAt, criticalTValue, direction, durationOfAction, durationOfActionInHours, effectChanges, effectSize, effectUnit, effectVariableName, experimentEndTime, experimentStartTime, forwardSpearmanCorrelationCoefficient, numberOfPairs, onsetDelay, onsetDelayInHours, onsetDelayWithStrongestPearsonCorrelation, onsetDelayWithStrongestPearsonCorrelationInHours, optimalPearsonProduct, outcomeFillingValue, pearsonCorrelationWithNoOnsetDelay, predictivePearsonCorrelation, predictivePearsonCorrelationCoefficient, predictorDataSources, predictorFillingValue, predictorMaximumAllowedValue, predictorMinimumAllowedValue, predictsHighEffectChange, predictsLowEffectChange, qmScore, reversePearsonCorrelationCoefficient, shareUserMeasurements, significantDifference, statisticalSignificance, strengthLevel, strongestPearsonCorrelationCoefficient, tValue, updatedAt, userId, userVote, valuePredictingHighOutcome, valuePredictingLowOutcome) {
    var _this = this;

    _this['averageDailyHighCause'] = averageDailyHighCause;
    _this['averageDailyLowCause'] = averageDailyLowCause;
    _this['averageEffect'] = averageEffect;
    _this['averageEffectFollowingHighCause'] = averageEffectFollowingHighCause;
    _this['averageEffectFollowingLowCause'] = averageEffectFollowingLowCause;
    _this['averageForwardPearsonCorrelationOverOnsetDelays'] = averageForwardPearsonCorrelationOverOnsetDelays;
    _this['averageReversePearsonCorrelationOverOnsetDelays'] = averageReversePearsonCorrelationOverOnsetDelays;
    _this['averageVote'] = averageVote;
    _this['causeChanges'] = causeChanges;

    _this['causeUserVariableShareUserMeasurements'] = causeUserVariableShareUserMeasurements;






    _this['causeVariableName'] = causeVariableName;
    _this['confidenceInterval'] = confidenceInterval;
    _this['confidenceLevel'] = confidenceLevel;
    _this['correlationCoefficient'] = correlationCoefficient;

    _this['createdAt'] = createdAt;
    _this['criticalTValue'] = criticalTValue;
    _this['direction'] = direction;
    _this['durationOfAction'] = durationOfAction;
    _this['durationOfActionInHours'] = durationOfActionInHours;



    _this['effectChanges'] = effectChanges;

    _this['effectSize'] = effectSize;
    _this['effectUnit'] = effectUnit;










    _this['effectVariableName'] = effectVariableName;
    _this['experimentEndTime'] = experimentEndTime;
    _this['experimentStartTime'] = experimentStartTime;
    _this['forwardSpearmanCorrelationCoefficient'] = forwardSpearmanCorrelationCoefficient;
    _this['numberOfPairs'] = numberOfPairs;
    _this['onsetDelay'] = onsetDelay;
    _this['onsetDelayInHours'] = onsetDelayInHours;
    _this['onsetDelayWithStrongestPearsonCorrelation'] = onsetDelayWithStrongestPearsonCorrelation;
    _this['onsetDelayWithStrongestPearsonCorrelationInHours'] = onsetDelayWithStrongestPearsonCorrelationInHours;
    _this['optimalPearsonProduct'] = optimalPearsonProduct;
    _this['outcomeFillingValue'] = outcomeFillingValue;


    _this['pearsonCorrelationWithNoOnsetDelay'] = pearsonCorrelationWithNoOnsetDelay;
    _this['predictivePearsonCorrelation'] = predictivePearsonCorrelation;
    _this['predictivePearsonCorrelationCoefficient'] = predictivePearsonCorrelationCoefficient;
    _this['predictorDataSources'] = predictorDataSources;
    _this['predictorFillingValue'] = predictorFillingValue;
    _this['predictorMaximumAllowedValue'] = predictorMaximumAllowedValue;
    _this['predictorMinimumAllowedValue'] = predictorMinimumAllowedValue;
    _this['predictsHighEffectChange'] = predictsHighEffectChange;
    _this['predictsLowEffectChange'] = predictsLowEffectChange;

    _this['qmScore'] = qmScore;
    _this['reversePearsonCorrelationCoefficient'] = reversePearsonCorrelationCoefficient;
    _this['shareUserMeasurements'] = shareUserMeasurements;


    _this['significantDifference'] = significantDifference;
    _this['statisticalSignificance'] = statisticalSignificance;
    _this['strengthLevel'] = strengthLevel;
    _this['strongestPearsonCorrelationCoefficient'] = strongestPearsonCorrelationCoefficient;




    _this['tValue'] = tValue;
    _this['updatedAt'] = updatedAt;
    _this['userId'] = userId;
    _this['userVote'] = userVote;
    _this['valuePredictingHighOutcome'] = valuePredictingHighOutcome;
    _this['valuePredictingLowOutcome'] = valuePredictingLowOutcome;

















  };

  /**
   * Constructs a <code>Correlation</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/Correlation} obj Optional instance to populate.
   * @return {module:model/Correlation} The populated <code>Correlation</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('averageDailyHighCause')) {
        obj['averageDailyHighCause'] = ApiClient.convertToType(data['averageDailyHighCause'], 'Number');
      }
      if (data.hasOwnProperty('averageDailyLowCause')) {
        obj['averageDailyLowCause'] = ApiClient.convertToType(data['averageDailyLowCause'], 'Number');
      }
      if (data.hasOwnProperty('averageEffect')) {
        obj['averageEffect'] = ApiClient.convertToType(data['averageEffect'], 'Number');
      }
      if (data.hasOwnProperty('averageEffectFollowingHighCause')) {
        obj['averageEffectFollowingHighCause'] = ApiClient.convertToType(data['averageEffectFollowingHighCause'], 'Number');
      }
      if (data.hasOwnProperty('averageEffectFollowingLowCause')) {
        obj['averageEffectFollowingLowCause'] = ApiClient.convertToType(data['averageEffectFollowingLowCause'], 'Number');
      }
      if (data.hasOwnProperty('averageForwardPearsonCorrelationOverOnsetDelays')) {
        obj['averageForwardPearsonCorrelationOverOnsetDelays'] = ApiClient.convertToType(data['averageForwardPearsonCorrelationOverOnsetDelays'], 'Number');
      }
      if (data.hasOwnProperty('averageReversePearsonCorrelationOverOnsetDelays')) {
        obj['averageReversePearsonCorrelationOverOnsetDelays'] = ApiClient.convertToType(data['averageReversePearsonCorrelationOverOnsetDelays'], 'Number');
      }
      if (data.hasOwnProperty('averageVote')) {
        obj['averageVote'] = ApiClient.convertToType(data['averageVote'], 'Number');
      }
      if (data.hasOwnProperty('causeChanges')) {
        obj['causeChanges'] = ApiClient.convertToType(data['causeChanges'], 'Number');
      }
      if (data.hasOwnProperty('causeDataSource')) {
        obj['causeDataSource'] = DataSource.constructFromObject(data['causeDataSource']);
      }
      if (data.hasOwnProperty('causeUserVariableShareUserMeasurements')) {
        obj['causeUserVariableShareUserMeasurements'] = ApiClient.convertToType(data['causeUserVariableShareUserMeasurements'], 'Number');
      }
      if (data.hasOwnProperty('causeVariableCategoryId')) {
        obj['causeVariableCategoryId'] = ApiClient.convertToType(data['causeVariableCategoryId'], 'Number');
      }
      if (data.hasOwnProperty('causeVariableCategoryName')) {
        obj['causeVariableCategoryName'] = ApiClient.convertToType(data['causeVariableCategoryName'], 'String');
      }
      if (data.hasOwnProperty('causeVariableCombinationOperation')) {
        obj['causeVariableCombinationOperation'] = ApiClient.convertToType(data['causeVariableCombinationOperation'], 'String');
      }
      if (data.hasOwnProperty('causeVariableUnitAbbreviatedName')) {
        obj['causeVariableUnitAbbreviatedName'] = ApiClient.convertToType(data['causeVariableUnitAbbreviatedName'], 'String');
      }
      if (data.hasOwnProperty('causeVariableId')) {
        obj['causeVariableId'] = ApiClient.convertToType(data['causeVariableId'], 'Number');
      }
      if (data.hasOwnProperty('causeVariableMostCommonConnectorId')) {
        obj['causeVariableMostCommonConnectorId'] = ApiClient.convertToType(data['causeVariableMostCommonConnectorId'], 'Number');
      }
      if (data.hasOwnProperty('causeVariableName')) {
        obj['causeVariableName'] = ApiClient.convertToType(data['causeVariableName'], 'String');
      }
      if (data.hasOwnProperty('confidenceInterval')) {
        obj['confidenceInterval'] = ApiClient.convertToType(data['confidenceInterval'], 'Number');
      }
      if (data.hasOwnProperty('confidenceLevel')) {
        obj['confidenceLevel'] = ApiClient.convertToType(data['confidenceLevel'], 'String');
      }
      if (data.hasOwnProperty('correlationCoefficient')) {
        obj['correlationCoefficient'] = ApiClient.convertToType(data['correlationCoefficient'], 'Number');
      }
      if (data.hasOwnProperty('correlationIsContradictoryToOptimalValues')) {
        obj['correlationIsContradictoryToOptimalValues'] = ApiClient.convertToType(data['correlationIsContradictoryToOptimalValues'], 'Boolean');
      }
      if (data.hasOwnProperty('createdAt')) {
        obj['createdAt'] = ApiClient.convertToType(data['createdAt'], 'String');
      }
      if (data.hasOwnProperty('criticalTValue')) {
        obj['criticalTValue'] = ApiClient.convertToType(data['criticalTValue'], 'Number');
      }
      if (data.hasOwnProperty('direction')) {
        obj['direction'] = ApiClient.convertToType(data['direction'], 'String');
      }
      if (data.hasOwnProperty('durationOfAction')) {
        obj['durationOfAction'] = ApiClient.convertToType(data['durationOfAction'], 'Number');
      }
      if (data.hasOwnProperty('durationOfActionInHours')) {
        obj['durationOfActionInHours'] = ApiClient.convertToType(data['durationOfActionInHours'], 'Number');
      }
      if (data.hasOwnProperty('degreesOfFreedom')) {
        obj['degreesOfFreedom'] = ApiClient.convertToType(data['degreesOfFreedom'], 'Number');
      }
      if (data.hasOwnProperty('effectNumberOfProcessedDailyMeasurements')) {
        obj['effectNumberOfProcessedDailyMeasurements'] = ApiClient.convertToType(data['effectNumberOfProcessedDailyMeasurements'], 'Number');
      }
      if (data.hasOwnProperty('error')) {
        obj['error'] = ApiClient.convertToType(data['error'], 'String');
      }
      if (data.hasOwnProperty('effectChanges')) {
        obj['effectChanges'] = ApiClient.convertToType(data['effectChanges'], 'Number');
      }
      if (data.hasOwnProperty('effectDataSource')) {
        obj['effectDataSource'] = DataSource.constructFromObject(data['effectDataSource']);
      }
      if (data.hasOwnProperty('effectSize')) {
        obj['effectSize'] = ApiClient.convertToType(data['effectSize'], 'String');
      }
      if (data.hasOwnProperty('effectUnit')) {
        obj['effectUnit'] = ApiClient.convertToType(data['effectUnit'], 'String');
      }
      if (data.hasOwnProperty('effectUserVariableShareUserMeasurements')) {
        obj['effectUserVariableShareUserMeasurements'] = ApiClient.convertToType(data['effectUserVariableShareUserMeasurements'], 'Number');
      }
      if (data.hasOwnProperty('effectVariableCategoryId')) {
        obj['effectVariableCategoryId'] = ApiClient.convertToType(data['effectVariableCategoryId'], 'Number');
      }
      if (data.hasOwnProperty('effectVariableCategoryName')) {
        obj['effectVariableCategoryName'] = ApiClient.convertToType(data['effectVariableCategoryName'], 'String');
      }
      if (data.hasOwnProperty('effectVariableCombinationOperation')) {
        obj['effectVariableCombinationOperation'] = ApiClient.convertToType(data['effectVariableCombinationOperation'], 'String');
      }
      if (data.hasOwnProperty('effectVariableCommonAlias')) {
        obj['effectVariableCommonAlias'] = ApiClient.convertToType(data['effectVariableCommonAlias'], 'String');
      }
      if (data.hasOwnProperty('effectVariableUnitAbbreviatedName')) {
        obj['effectVariableUnitAbbreviatedName'] = ApiClient.convertToType(data['effectVariableUnitAbbreviatedName'], 'String');
      }
      if (data.hasOwnProperty('effectVariableUnitId')) {
        obj['effectVariableUnitId'] = ApiClient.convertToType(data['effectVariableUnitId'], 'Number');
      }
      if (data.hasOwnProperty('effectVariableUnitName')) {
        obj['effectVariableUnitName'] = ApiClient.convertToType(data['effectVariableUnitName'], 'String');
      }
      if (data.hasOwnProperty('effectVariableId')) {
        obj['effectVariableId'] = ApiClient.convertToType(data['effectVariableId'], 'Number');
      }
      if (data.hasOwnProperty('effectVariableMostCommonConnectorId')) {
        obj['effectVariableMostCommonConnectorId'] = ApiClient.convertToType(data['effectVariableMostCommonConnectorId'], 'Number');
      }
      if (data.hasOwnProperty('effectVariableName')) {
        obj['effectVariableName'] = ApiClient.convertToType(data['effectVariableName'], 'String');
      }
      if (data.hasOwnProperty('experimentEndTime')) {
        obj['experimentEndTime'] = ApiClient.convertToType(data['experimentEndTime'], 'String');
      }
      if (data.hasOwnProperty('experimentStartTime')) {
        obj['experimentStartTime'] = ApiClient.convertToType(data['experimentStartTime'], 'String');
      }
      if (data.hasOwnProperty('forwardSpearmanCorrelationCoefficient')) {
        obj['forwardSpearmanCorrelationCoefficient'] = ApiClient.convertToType(data['forwardSpearmanCorrelationCoefficient'], 'Number');
      }
      if (data.hasOwnProperty('numberOfPairs')) {
        obj['numberOfPairs'] = ApiClient.convertToType(data['numberOfPairs'], 'Number');
      }
      if (data.hasOwnProperty('onsetDelay')) {
        obj['onsetDelay'] = ApiClient.convertToType(data['onsetDelay'], 'Number');
      }
      if (data.hasOwnProperty('onsetDelayInHours')) {
        obj['onsetDelayInHours'] = ApiClient.convertToType(data['onsetDelayInHours'], 'Number');
      }
      if (data.hasOwnProperty('onsetDelayWithStrongestPearsonCorrelation')) {
        obj['onsetDelayWithStrongestPearsonCorrelation'] = ApiClient.convertToType(data['onsetDelayWithStrongestPearsonCorrelation'], 'Number');
      }
      if (data.hasOwnProperty('onsetDelayWithStrongestPearsonCorrelationInHours')) {
        obj['onsetDelayWithStrongestPearsonCorrelationInHours'] = ApiClient.convertToType(data['onsetDelayWithStrongestPearsonCorrelationInHours'], 'Number');
      }
      if (data.hasOwnProperty('optimalPearsonProduct')) {
        obj['optimalPearsonProduct'] = ApiClient.convertToType(data['optimalPearsonProduct'], 'Number');
      }
      if (data.hasOwnProperty('outcomeFillingValue')) {
        obj['outcomeFillingValue'] = ApiClient.convertToType(data['outcomeFillingValue'], 'Number');
      }
      if (data.hasOwnProperty('outcomeMaximumAllowedValue')) {
        obj['outcomeMaximumAllowedValue'] = ApiClient.convertToType(data['outcomeMaximumAllowedValue'], 'Number');
      }
      if (data.hasOwnProperty('outcomeMinimumAllowedValue')) {
        obj['outcomeMinimumAllowedValue'] = ApiClient.convertToType(data['outcomeMinimumAllowedValue'], 'Number');
      }
      if (data.hasOwnProperty('pearsonCorrelationWithNoOnsetDelay')) {
        obj['pearsonCorrelationWithNoOnsetDelay'] = ApiClient.convertToType(data['pearsonCorrelationWithNoOnsetDelay'], 'Number');
      }
      if (data.hasOwnProperty('predictivePearsonCorrelation')) {
        obj['predictivePearsonCorrelation'] = ApiClient.convertToType(data['predictivePearsonCorrelation'], 'Number');
      }
      if (data.hasOwnProperty('predictivePearsonCorrelationCoefficient')) {
        obj['predictivePearsonCorrelationCoefficient'] = ApiClient.convertToType(data['predictivePearsonCorrelationCoefficient'], 'Number');
      }
      if (data.hasOwnProperty('predictorDataSources')) {
        obj['predictorDataSources'] = ApiClient.convertToType(data['predictorDataSources'], 'String');
      }
      if (data.hasOwnProperty('predictorFillingValue')) {
        obj['predictorFillingValue'] = ApiClient.convertToType(data['predictorFillingValue'], 'Number');
      }
      if (data.hasOwnProperty('predictorMaximumAllowedValue')) {
        obj['predictorMaximumAllowedValue'] = ApiClient.convertToType(data['predictorMaximumAllowedValue'], 'Number');
      }
      if (data.hasOwnProperty('predictorMinimumAllowedValue')) {
        obj['predictorMinimumAllowedValue'] = ApiClient.convertToType(data['predictorMinimumAllowedValue'], 'Number');
      }
      if (data.hasOwnProperty('predictsHighEffectChange')) {
        obj['predictsHighEffectChange'] = ApiClient.convertToType(data['predictsHighEffectChange'], 'Number');
      }
      if (data.hasOwnProperty('predictsLowEffectChange')) {
        obj['predictsLowEffectChange'] = ApiClient.convertToType(data['predictsLowEffectChange'], 'Number');
      }
      if (data.hasOwnProperty('pValue')) {
        obj['pValue'] = ApiClient.convertToType(data['pValue'], 'Number');
      }
      if (data.hasOwnProperty('qmScore')) {
        obj['qmScore'] = ApiClient.convertToType(data['qmScore'], 'Number');
      }
      if (data.hasOwnProperty('reversePearsonCorrelationCoefficient')) {
        obj['reversePearsonCorrelationCoefficient'] = ApiClient.convertToType(data['reversePearsonCorrelationCoefficient'], 'Number');
      }
      if (data.hasOwnProperty('shareUserMeasurements')) {
        obj['shareUserMeasurements'] = ApiClient.convertToType(data['shareUserMeasurements'], 'Boolean');
      }
      if (data.hasOwnProperty('sharingDescription')) {
        obj['sharingDescription'] = ApiClient.convertToType(data['sharingDescription'], 'String');
      }
      if (data.hasOwnProperty('sharingTitle')) {
        obj['sharingTitle'] = ApiClient.convertToType(data['sharingTitle'], 'String');
      }
      if (data.hasOwnProperty('significantDifference')) {
        obj['significantDifference'] = ApiClient.convertToType(data['significantDifference'], 'Boolean');
      }
      if (data.hasOwnProperty('statisticalSignificance')) {
        obj['statisticalSignificance'] = ApiClient.convertToType(data['statisticalSignificance'], 'Number');
      }
      if (data.hasOwnProperty('strengthLevel')) {
        obj['strengthLevel'] = ApiClient.convertToType(data['strengthLevel'], 'String');
      }
      if (data.hasOwnProperty('strongestPearsonCorrelationCoefficient')) {
        obj['strongestPearsonCorrelationCoefficient'] = ApiClient.convertToType(data['strongestPearsonCorrelationCoefficient'], 'Number');
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
      if (data.hasOwnProperty('tValue')) {
        obj['tValue'] = ApiClient.convertToType(data['tValue'], 'Number');
      }
      if (data.hasOwnProperty('updatedAt')) {
        obj['updatedAt'] = ApiClient.convertToType(data['updatedAt'], 'String');
      }
      if (data.hasOwnProperty('userId')) {
        obj['userId'] = ApiClient.convertToType(data['userId'], 'Number');
      }
      if (data.hasOwnProperty('userVote')) {
        obj['userVote'] = ApiClient.convertToType(data['userVote'], 'Number');
      }
      if (data.hasOwnProperty('valuePredictingHighOutcome')) {
        obj['valuePredictingHighOutcome'] = ApiClient.convertToType(data['valuePredictingHighOutcome'], 'Number');
      }
      if (data.hasOwnProperty('valuePredictingLowOutcome')) {
        obj['valuePredictingLowOutcome'] = ApiClient.convertToType(data['valuePredictingLowOutcome'], 'Number');
      }
      if (data.hasOwnProperty('outcomeDataSources')) {
        obj['outcomeDataSources'] = ApiClient.convertToType(data['outcomeDataSources'], 'String');
      }
      if (data.hasOwnProperty('principalInvestigator')) {
        obj['principalInvestigator'] = ApiClient.convertToType(data['principalInvestigator'], 'String');
      }
      if (data.hasOwnProperty('reverseCorrelation')) {
        obj['reverseCorrelation'] = ApiClient.convertToType(data['reverseCorrelation'], 'Number');
      }
      if (data.hasOwnProperty('averagePearsonCorrelationCoefficientOverOnsetDelays')) {
        obj['averagePearsonCorrelationCoefficientOverOnsetDelays'] = ApiClient.convertToType(data['averagePearsonCorrelationCoefficientOverOnsetDelays'], 'String');
      }
      if (data.hasOwnProperty('causeNumberOfRawMeasurements')) {
        obj['causeNumberOfRawMeasurements'] = ApiClient.convertToType(data['causeNumberOfRawMeasurements'], 'Number');
      }
      if (data.hasOwnProperty('correlationsOverDurationsOfAction')) {
        obj['correlationsOverDurationsOfAction'] = ApiClient.convertToType(data['correlationsOverDurationsOfAction'], 'String');
      }
      if (data.hasOwnProperty('correlationsOverDurationsOfActionChartConfig')) {
        obj['correlationsOverDurationsOfActionChartConfig'] = ApiClient.convertToType(data['correlationsOverDurationsOfActionChartConfig'], 'String');
      }
      if (data.hasOwnProperty('correlationsOverOnsetDelaysChartConfig')) {
        obj['correlationsOverOnsetDelaysChartConfig'] = ApiClient.convertToType(data['correlationsOverOnsetDelaysChartConfig'], 'String');
      }
      if (data.hasOwnProperty('numberOfUsers')) {
        obj['numberOfUsers'] = ApiClient.convertToType(data['numberOfUsers'], 'Number');
      }
      if (data.hasOwnProperty('rawCauseMeasurementSignificance')) {
        obj['rawCauseMeasurementSignificance'] = ApiClient.convertToType(data['rawCauseMeasurementSignificance'], 'Number');
      }
      if (data.hasOwnProperty('rawEffectMeasurementSignificance')) {
        obj['rawEffectMeasurementSignificance'] = ApiClient.convertToType(data['rawEffectMeasurementSignificance'], 'Number');
      }
      if (data.hasOwnProperty('reversePairsCount')) {
        obj['reversePairsCount'] = ApiClient.convertToType(data['reversePairsCount'], 'String');
      }
      if (data.hasOwnProperty('voteStatisticalSignificance')) {
        obj['voteStatisticalSignificance'] = ApiClient.convertToType(data['voteStatisticalSignificance'], 'Number');
      }
      if (data.hasOwnProperty('aggregateQMScore')) {
        obj['aggregateQMScore'] = ApiClient.convertToType(data['aggregateQMScore'], 'Number');
      }
      if (data.hasOwnProperty('forwardPearsonCorrelationCoefficient')) {
        obj['forwardPearsonCorrelationCoefficient'] = ApiClient.convertToType(data['forwardPearsonCorrelationCoefficient'], 'Number');
      }
      if (data.hasOwnProperty('numberOfCorrelations')) {
        obj['numberOfCorrelations'] = ApiClient.convertToType(data['numberOfCorrelations'], 'Number');
      }
      if (data.hasOwnProperty('vote')) {
        obj['vote'] = ApiClient.convertToType(data['vote'], 'Number');
      }
    }
    return obj;
  }

  /**
   * Example: 4.19
   * @member {Number} averageDailyHighCause
   */
  exports.prototype['averageDailyHighCause'] = undefined;
  /**
   * Example: 1.97
   * @member {Number} averageDailyLowCause
   */
  exports.prototype['averageDailyLowCause'] = undefined;
  /**
   * Example: 3.0791054117396
   * @member {Number} averageEffect
   */
  exports.prototype['averageEffect'] = undefined;
  /**
   * Example: 3.55
   * @member {Number} averageEffectFollowingHighCause
   */
  exports.prototype['averageEffectFollowingHighCause'] = undefined;
  /**
   * Example: 2.65
   * @member {Number} averageEffectFollowingLowCause
   */
  exports.prototype['averageEffectFollowingLowCause'] = undefined;
  /**
   * Example: 0.396
   * @member {Number} averageForwardPearsonCorrelationOverOnsetDelays
   */
  exports.prototype['averageForwardPearsonCorrelationOverOnsetDelays'] = undefined;
  /**
   * Example: 0.453667
   * @member {Number} averageReversePearsonCorrelationOverOnsetDelays
   */
  exports.prototype['averageReversePearsonCorrelationOverOnsetDelays'] = undefined;
  /**
   * Example: 0.9855
   * @member {Number} averageVote
   */
  exports.prototype['averageVote'] = undefined;
  /**
   * Example: 164
   * @member {Number} causeChanges
   */
  exports.prototype['causeChanges'] = undefined;
  /**
   * @member {module:model/DataSource} causeDataSource
   */
  exports.prototype['causeDataSource'] = undefined;
  /**
   * Example: 1
   * @member {Number} causeUserVariableShareUserMeasurements
   */
  exports.prototype['causeUserVariableShareUserMeasurements'] = undefined;
  /**
   * Example: 6
   * @member {Number} causeVariableCategoryId
   */
  exports.prototype['causeVariableCategoryId'] = undefined;
  /**
   * Example: Sleep
   * @member {String} causeVariableCategoryName
   */
  exports.prototype['causeVariableCategoryName'] = undefined;
  /**
   * Example: MEAN
   * @member {String} causeVariableCombinationOperation
   */
  exports.prototype['causeVariableCombinationOperation'] = undefined;
  /**
   * Example: /5
   * @member {String} causeVariableUnitAbbreviatedName
   */
  exports.prototype['causeVariableUnitAbbreviatedName'] = undefined;
  /**
   * Example: 1448
   * @member {Number} causeVariableId
   */
  exports.prototype['causeVariableId'] = undefined;
  /**
   * Example: 6
   * @member {Number} causeVariableMostCommonConnectorId
   */
  exports.prototype['causeVariableMostCommonConnectorId'] = undefined;
  /**
   * Example: Sleep Quality
   * @member {String} causeVariableName
   */
  exports.prototype['causeVariableName'] = undefined;
  /**
   * Example: 0.14344467795996
   * @member {Number} confidenceInterval
   */
  exports.prototype['confidenceInterval'] = undefined;
  /**
   * Example: high
   * @member {String} confidenceLevel
   */
  exports.prototype['confidenceLevel'] = undefined;
  /**
   * Example: 0.538
   * @member {Number} correlationCoefficient
   */
  exports.prototype['correlationCoefficient'] = undefined;
  /**
   * Example: false
   * @member {Boolean} correlationIsContradictoryToOptimalValues
   */
  exports.prototype['correlationIsContradictoryToOptimalValues'] = undefined;
  /**
   * Example: 2016-12-28 20:47:30 UTC ISO 8601 YYYY-MM-DDThh:mm:ss
   * @member {String} createdAt
   */
  exports.prototype['createdAt'] = undefined;
  /**
   * Example: 1.646
   * @member {Number} criticalTValue
   */
  exports.prototype['criticalTValue'] = undefined;
  /**
   * Example: higher
   * @member {String} direction
   */
  exports.prototype['direction'] = undefined;
  /**
   * Example: 604800
   * @member {Number} durationOfAction
   */
  exports.prototype['durationOfAction'] = undefined;
  /**
   * Example: 168
   * @member {Number} durationOfActionInHours
   */
  exports.prototype['durationOfActionInHours'] = undefined;
  /**
   * Example: 200
   * @member {Number} degreesOfFreedom
   */
  exports.prototype['degreesOfFreedom'] = undefined;
  /**
   * Example: 145
   * @member {Number} effectNumberOfProcessedDailyMeasurements
   */
  exports.prototype['effectNumberOfProcessedDailyMeasurements'] = undefined;
  /**
   * Example: optimalPearsonProduct is not defined
   * @member {String} error
   */
  exports.prototype['error'] = undefined;
  /**
   * Example: 193
   * @member {Number} effectChanges
   */
  exports.prototype['effectChanges'] = undefined;
  /**
   * @member {module:model/DataSource} effectDataSource
   */
  exports.prototype['effectDataSource'] = undefined;
  /**
   * Example: moderately positive
   * @member {String} effectSize
   */
  exports.prototype['effectSize'] = undefined;
  /**
   * Example: /5
   * @member {String} effectUnit
   */
  exports.prototype['effectUnit'] = undefined;
  /**
   * Example: 1
   * @member {Number} effectUserVariableShareUserMeasurements
   */
  exports.prototype['effectUserVariableShareUserMeasurements'] = undefined;
  /**
   * Example: 1
   * @member {Number} effectVariableCategoryId
   */
  exports.prototype['effectVariableCategoryId'] = undefined;
  /**
   * Example: Emotions
   * @member {String} effectVariableCategoryName
   */
  exports.prototype['effectVariableCategoryName'] = undefined;
  /**
   * Example: MEAN
   * @member {String} effectVariableCombinationOperation
   */
  exports.prototype['effectVariableCombinationOperation'] = undefined;
  /**
   * Example: Mood_(psychology)
   * @member {String} effectVariableCommonAlias
   */
  exports.prototype['effectVariableCommonAlias'] = undefined;
  /**
   * Example: /5
   * @member {String} effectVariableUnitAbbreviatedName
   */
  exports.prototype['effectVariableUnitAbbreviatedName'] = undefined;
  /**
   * Example: 10
   * @member {Number} effectVariableUnitId
   */
  exports.prototype['effectVariableUnitId'] = undefined;
  /**
   * Example: 1 to 5 Rating
   * @member {String} effectVariableUnitName
   */
  exports.prototype['effectVariableUnitName'] = undefined;
  /**
   * Example: 1398
   * @member {Number} effectVariableId
   */
  exports.prototype['effectVariableId'] = undefined;
  /**
   * Example: 10
   * @member {Number} effectVariableMostCommonConnectorId
   */
  exports.prototype['effectVariableMostCommonConnectorId'] = undefined;
  /**
   * Example: Overall Mood
   * @member {String} effectVariableName
   */
  exports.prototype['effectVariableName'] = undefined;
  /**
   * Example: 2014-07-30 12:50:00 UTC ISO 8601 YYYY-MM-DDThh:mm:ss
   * @member {String} experimentEndTime
   */
  exports.prototype['experimentEndTime'] = undefined;
  /**
   * Example: 2012-05-06 21:15:00 UTC ISO 8601 YYYY-MM-DDThh:mm:ss
   * @member {String} experimentStartTime
   */
  exports.prototype['experimentStartTime'] = undefined;
  /**
   * Example: 0.528359
   * @member {Number} forwardSpearmanCorrelationCoefficient
   */
  exports.prototype['forwardSpearmanCorrelationCoefficient'] = undefined;
  /**
   * Example: 298
   * @member {Number} numberOfPairs
   */
  exports.prototype['numberOfPairs'] = undefined;
  /**
   * Example: 0
   * @member {Number} onsetDelay
   */
  exports.prototype['onsetDelay'] = undefined;
  /**
   * Example: 0
   * @member {Number} onsetDelayInHours
   */
  exports.prototype['onsetDelayInHours'] = undefined;
  /**
   * Example: -86400
   * @member {Number} onsetDelayWithStrongestPearsonCorrelation
   */
  exports.prototype['onsetDelayWithStrongestPearsonCorrelation'] = undefined;
  /**
   * Example: -24
   * @member {Number} onsetDelayWithStrongestPearsonCorrelationInHours
   */
  exports.prototype['onsetDelayWithStrongestPearsonCorrelationInHours'] = undefined;
  /**
   * Example: 0.68582816186982
   * @member {Number} optimalPearsonProduct
   */
  exports.prototype['optimalPearsonProduct'] = undefined;
  /**
   * Example: -1
   * @member {Number} outcomeFillingValue
   */
  exports.prototype['outcomeFillingValue'] = undefined;
  /**
   * Example: 23
   * @member {Number} outcomeMaximumAllowedValue
   */
  exports.prototype['outcomeMaximumAllowedValue'] = undefined;
  /**
   * Example: 0.1
   * @member {Number} outcomeMinimumAllowedValue
   */
  exports.prototype['outcomeMinimumAllowedValue'] = undefined;
  /**
   * Example: 0.477
   * @member {Number} pearsonCorrelationWithNoOnsetDelay
   */
  exports.prototype['pearsonCorrelationWithNoOnsetDelay'] = undefined;
  /**
   * Example: 0.538
   * @member {Number} predictivePearsonCorrelation
   */
  exports.prototype['predictivePearsonCorrelation'] = undefined;
  /**
   * Example: 0.538
   * @member {Number} predictivePearsonCorrelationCoefficient
   */
  exports.prototype['predictivePearsonCorrelationCoefficient'] = undefined;
  /**
   * Example: RescueTime
   * @member {String} predictorDataSources
   */
  exports.prototype['predictorDataSources'] = undefined;
  /**
   * Example: -1
   * @member {Number} predictorFillingValue
   */
  exports.prototype['predictorFillingValue'] = undefined;
  /**
   * Example: 200
   * @member {Number} predictorMaximumAllowedValue
   */
  exports.prototype['predictorMaximumAllowedValue'] = undefined;
  /**
   * Example: 30
   * @member {Number} predictorMinimumAllowedValue
   */
  exports.prototype['predictorMinimumAllowedValue'] = undefined;
  /**
   * Example: 17
   * @member {Number} predictsHighEffectChange
   */
  exports.prototype['predictsHighEffectChange'] = undefined;
  /**
   * Example: -11
   * @member {Number} predictsLowEffectChange
   */
  exports.prototype['predictsLowEffectChange'] = undefined;
  /**
   * Example: 0.39628900511586
   * @member {Number} pValue
   */
  exports.prototype['pValue'] = undefined;
  /**
   * Example: 0.528
   * @member {Number} qmScore
   */
  exports.prototype['qmScore'] = undefined;
  /**
   * Example: 0.01377184270977
   * @member {Number} reversePearsonCorrelationCoefficient
   */
  exports.prototype['reversePearsonCorrelationCoefficient'] = undefined;
  /**
   * Example: 1
   * @member {Boolean} shareUserMeasurements
   */
  exports.prototype['shareUserMeasurements'] = undefined;
  /**
   * Example: N1 Study: Sleep Quality Predicts Higher Overall Mood
   * @member {String} sharingDescription
   */
  exports.prototype['sharingDescription'] = undefined;
  /**
   * Example: N1 Study: Sleep Quality Predicts Higher Overall Mood
   * @member {String} sharingTitle
   */
  exports.prototype['sharingTitle'] = undefined;
  /**
   * Example: 1
   * @member {Boolean} significantDifference
   */
  exports.prototype['significantDifference'] = undefined;
  /**
   * Example: 0.9813
   * @member {Number} statisticalSignificance
   */
  exports.prototype['statisticalSignificance'] = undefined;
  /**
   * Example: moderate
   * @member {String} strengthLevel
   */
  exports.prototype['strengthLevel'] = undefined;
  /**
   * Example: 0.613
   * @member {Number} strongestPearsonCorrelationCoefficient
   */
  exports.prototype['strongestPearsonCorrelationCoefficient'] = undefined;
  /**
   * @member {module:model/StudyHtml} studyHtml
   */
  exports.prototype['studyHtml'] = undefined;
  /**
   * @member {module:model/StudyImages} studyImages
   */
  exports.prototype['studyImages'] = undefined;
  /**
   * @member {module:model/StudyLinks} studyLinks
   */
  exports.prototype['studyLinks'] = undefined;
  /**
   * @member {module:model/StudyText} studyText
   */
  exports.prototype['studyText'] = undefined;
  /**
   * Example: 9.6986079652717
   * @member {Number} tValue
   */
  exports.prototype['tValue'] = undefined;
  /**
   * Example: 2017-05-06 15:40:38 UTC ISO 8601 YYYY-MM-DDThh:mm:ss
   * @member {String} updatedAt
   */
  exports.prototype['updatedAt'] = undefined;
  /**
   * Example: 230
   * @member {Number} userId
   */
  exports.prototype['userId'] = undefined;
  /**
   * Example: 1
   * @member {Number} userVote
   */
  exports.prototype['userVote'] = undefined;
  /**
   * Example: 4.14
   * @member {Number} valuePredictingHighOutcome
   */
  exports.prototype['valuePredictingHighOutcome'] = undefined;
  /**
   * Example: 3.03
   * @member {Number} valuePredictingLowOutcome
   */
  exports.prototype['valuePredictingLowOutcome'] = undefined;
  /**
   * original name of the cause.
   * @member {String} outcomeDataSources
   */
  exports.prototype['outcomeDataSources'] = undefined;
  /**
   * Mike Sinn
   * @member {String} principalInvestigator
   */
  exports.prototype['principalInvestigator'] = undefined;
  /**
   * Correlation when cause and effect are reversed. For any causal relationship, the forward correlation should exceed the reverse correlation.
   * @member {Number} reverseCorrelation
   */
  exports.prototype['reverseCorrelation'] = undefined;
  /**
   * Example: 
   * @member {String} averagePearsonCorrelationCoefficientOverOnsetDelays
   */
  exports.prototype['averagePearsonCorrelationCoefficientOverOnsetDelays'] = undefined;
  /**
   * Example: 14764
   * @member {Number} causeNumberOfRawMeasurements
   */
  exports.prototype['causeNumberOfRawMeasurements'] = undefined;
  /**
   * Example: 
   * @member {String} correlationsOverDurationsOfAction
   */
  exports.prototype['correlationsOverDurationsOfAction'] = undefined;
  /**
   * Example: 
   * @member {String} correlationsOverDurationsOfActionChartConfig
   */
  exports.prototype['correlationsOverDurationsOfActionChartConfig'] = undefined;
  /**
   * Example: 
   * @member {String} correlationsOverOnsetDelaysChartConfig
   */
  exports.prototype['correlationsOverOnsetDelaysChartConfig'] = undefined;
  /**
   * Example: 1
   * @member {Number} numberOfUsers
   */
  exports.prototype['numberOfUsers'] = undefined;
  /**
   * Example: 1
   * @member {Number} rawCauseMeasurementSignificance
   */
  exports.prototype['rawCauseMeasurementSignificance'] = undefined;
  /**
   * Example: 1
   * @member {Number} rawEffectMeasurementSignificance
   */
  exports.prototype['rawEffectMeasurementSignificance'] = undefined;
  /**
   * Example: 1
   * @member {String} reversePairsCount
   */
  exports.prototype['reversePairsCount'] = undefined;
  /**
   * Example: 1
   * @member {Number} voteStatisticalSignificance
   */
  exports.prototype['voteStatisticalSignificance'] = undefined;
  /**
   * Example: 0.011598441286655
   * @member {Number} aggregateQMScore
   */
  exports.prototype['aggregateQMScore'] = undefined;
  /**
   * Example: 0.0333
   * @member {Number} forwardPearsonCorrelationCoefficient
   */
  exports.prototype['forwardPearsonCorrelationCoefficient'] = undefined;
  /**
   * Example: 6
   * @member {Number} numberOfCorrelations
   */
  exports.prototype['numberOfCorrelations'] = undefined;
  /**
   * Example: 1 or 0
   * @member {Number} vote
   */
  exports.prototype['vote'] = undefined;



  return exports;
}));



},{"../ApiClient":9,"./DataSource":31,"./StudyHtml":59,"./StudyImages":60,"./StudyLinks":61,"./StudyText":62}],31:[function(require,module,exports){
/**
 * quantimodo
 * We make it easy to retrieve and analyze normalized user data from a wide array of devices and applications. Check out our [docs and sdk's](https://github.com/QuantiModo/docs) or [contact us](https://help.quantimo.do).
 *
 * OpenAPI spec version: 5.8.112511
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.3.1
 *
 * Do not edit the class manually.
 *
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
    if (!root.Quantimodo) {
      root.Quantimodo = {};
    }
    root.Quantimodo.DataSource = factory(root.Quantimodo.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The DataSource model module.
   * @module model/DataSource
   * @version 5.8.112511
   */

  /**
   * Constructs a new <code>DataSource</code>.
   * @alias module:model/DataSource
   * @class
   * @param affiliate {Boolean} Example: true
   * @param connectorClientId {String} Example: ba7d0c12432650e23b3ce924ae2d21e2ff59e7e4e28650759633700af7ed0a30
   * @param defaultVariableCategoryName {String} Example: Foods
   * @param displayName {String} Example: QuantiModo
   * @param enabled {Number} Example: 0
   * @param getItUrl {String} Example: https://quantimo.do
   * @param id {Number} Example: 72
   * @param image {String} Example: https://app.quantimo.do/ionic/Modo/www/img/logos/quantimodo-logo-qm-rainbow-200-200.png
   * @param imageHtml {String} Example: <a href=\"https://quantimo.do\"><img id=\"quantimodo_image\" title=\"QuantiModo\" src=\"https://app.quantimo.do/ionic/Modo/www/img/logos/quantimodo-logo-qm-rainbow-200-200.png\" alt=\"QuantiModo\"></a>
   * @param linkedDisplayNameHtml {String} Example: <a href=\"https://quantimo.do\">QuantiModo</a>
   * @param longDescription {String} Example: QuantiModo is a Chrome extension, Android app, iOS app, and web app that allows you to easily track mood, symptoms, or any outcome you want to optimize in a fraction of a second.  You can also import your data from over 30 other apps and devices like Fitbit, Rescuetime, Jawbone Up, Withings, Facebook, Github, Google Calendar, Runkeeper, MoodPanda, Slice, Google Fit, and more.  QuantiModo then analyzes your data to identify which hidden factors are most likely to be influencing your mood or symptoms and their optimal daily values.
   * @param name {String} Example: quantimodo
   * @param shortDescription {String} Example: Tracks anything
   */
  var exports = function(affiliate, connectorClientId, defaultVariableCategoryName, displayName, enabled, getItUrl, id, image, imageHtml, linkedDisplayNameHtml, longDescription, name, shortDescription) {
    var _this = this;

    _this['affiliate'] = affiliate;
    _this['connectorClientId'] = connectorClientId;
    _this['defaultVariableCategoryName'] = defaultVariableCategoryName;
    _this['displayName'] = displayName;
    _this['enabled'] = enabled;
    _this['getItUrl'] = getItUrl;
    _this['id'] = id;
    _this['image'] = image;
    _this['imageHtml'] = imageHtml;
    _this['linkedDisplayNameHtml'] = linkedDisplayNameHtml;
    _this['longDescription'] = longDescription;
    _this['name'] = name;
    _this['shortDescription'] = shortDescription;
  };

  /**
   * Constructs a <code>DataSource</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/DataSource} obj Optional instance to populate.
   * @return {module:model/DataSource} The populated <code>DataSource</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('affiliate')) {
        obj['affiliate'] = ApiClient.convertToType(data['affiliate'], 'Boolean');
      }
      if (data.hasOwnProperty('connectorClientId')) {
        obj['connectorClientId'] = ApiClient.convertToType(data['connectorClientId'], 'String');
      }
      if (data.hasOwnProperty('defaultVariableCategoryName')) {
        obj['defaultVariableCategoryName'] = ApiClient.convertToType(data['defaultVariableCategoryName'], 'String');
      }
      if (data.hasOwnProperty('displayName')) {
        obj['displayName'] = ApiClient.convertToType(data['displayName'], 'String');
      }
      if (data.hasOwnProperty('enabled')) {
        obj['enabled'] = ApiClient.convertToType(data['enabled'], 'Number');
      }
      if (data.hasOwnProperty('getItUrl')) {
        obj['getItUrl'] = ApiClient.convertToType(data['getItUrl'], 'String');
      }
      if (data.hasOwnProperty('id')) {
        obj['id'] = ApiClient.convertToType(data['id'], 'Number');
      }
      if (data.hasOwnProperty('image')) {
        obj['image'] = ApiClient.convertToType(data['image'], 'String');
      }
      if (data.hasOwnProperty('imageHtml')) {
        obj['imageHtml'] = ApiClient.convertToType(data['imageHtml'], 'String');
      }
      if (data.hasOwnProperty('linkedDisplayNameHtml')) {
        obj['linkedDisplayNameHtml'] = ApiClient.convertToType(data['linkedDisplayNameHtml'], 'String');
      }
      if (data.hasOwnProperty('longDescription')) {
        obj['longDescription'] = ApiClient.convertToType(data['longDescription'], 'String');
      }
      if (data.hasOwnProperty('name')) {
        obj['name'] = ApiClient.convertToType(data['name'], 'String');
      }
      if (data.hasOwnProperty('shortDescription')) {
        obj['shortDescription'] = ApiClient.convertToType(data['shortDescription'], 'String');
      }
    }
    return obj;
  }

  /**
   * Example: true
   * @member {Boolean} affiliate
   */
  exports.prototype['affiliate'] = undefined;
  /**
   * Example: ba7d0c12432650e23b3ce924ae2d21e2ff59e7e4e28650759633700af7ed0a30
   * @member {String} connectorClientId
   */
  exports.prototype['connectorClientId'] = undefined;
  /**
   * Example: Foods
   * @member {String} defaultVariableCategoryName
   */
  exports.prototype['defaultVariableCategoryName'] = undefined;
  /**
   * Example: QuantiModo
   * @member {String} displayName
   */
  exports.prototype['displayName'] = undefined;
  /**
   * Example: 0
   * @member {Number} enabled
   */
  exports.prototype['enabled'] = undefined;
  /**
   * Example: https://quantimo.do
   * @member {String} getItUrl
   */
  exports.prototype['getItUrl'] = undefined;
  /**
   * Example: 72
   * @member {Number} id
   */
  exports.prototype['id'] = undefined;
  /**
   * Example: https://app.quantimo.do/ionic/Modo/www/img/logos/quantimodo-logo-qm-rainbow-200-200.png
   * @member {String} image
   */
  exports.prototype['image'] = undefined;
  /**
   * Example: <a href=\"https://quantimo.do\"><img id=\"quantimodo_image\" title=\"QuantiModo\" src=\"https://app.quantimo.do/ionic/Modo/www/img/logos/quantimodo-logo-qm-rainbow-200-200.png\" alt=\"QuantiModo\"></a>
   * @member {String} imageHtml
   */
  exports.prototype['imageHtml'] = undefined;
  /**
   * Example: <a href=\"https://quantimo.do\">QuantiModo</a>
   * @member {String} linkedDisplayNameHtml
   */
  exports.prototype['linkedDisplayNameHtml'] = undefined;
  /**
   * Example: QuantiModo is a Chrome extension, Android app, iOS app, and web app that allows you to easily track mood, symptoms, or any outcome you want to optimize in a fraction of a second.  You can also import your data from over 30 other apps and devices like Fitbit, Rescuetime, Jawbone Up, Withings, Facebook, Github, Google Calendar, Runkeeper, MoodPanda, Slice, Google Fit, and more.  QuantiModo then analyzes your data to identify which hidden factors are most likely to be influencing your mood or symptoms and their optimal daily values.
   * @member {String} longDescription
   */
  exports.prototype['longDescription'] = undefined;
  /**
   * Example: quantimodo
   * @member {String} name
   */
  exports.prototype['name'] = undefined;
  /**
   * Example: Tracks anything
   * @member {String} shortDescription
   */
  exports.prototype['shortDescription'] = undefined;



  return exports;
}));



},{"../ApiClient":9}],32:[function(require,module,exports){
/**
 * quantimodo
 * We make it easy to retrieve and analyze normalized user data from a wide array of devices and applications. Check out our [docs and sdk's](https://github.com/QuantiModo/docs) or [contact us](https://help.quantimo.do).
 *
 * OpenAPI spec version: 5.8.112511
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.3.1
 *
 * Do not edit the class manually.
 *
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
    if (!root.Quantimodo) {
      root.Quantimodo = {};
    }
    root.Quantimodo.DeviceToken = factory(root.Quantimodo.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The DeviceToken model module.
   * @module model/DeviceToken
   * @version 5.8.112511
   */

  /**
   * Constructs a new <code>DeviceToken</code>.
   * @alias module:model/DeviceToken
   * @class
   * @param platform {String} ios, android, or web
   * @param deviceToken {String} The device token
   */
  var exports = function(platform, deviceToken) {
    var _this = this;


    _this['platform'] = platform;
    _this['deviceToken'] = deviceToken;
  };

  /**
   * Constructs a <code>DeviceToken</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/DeviceToken} obj Optional instance to populate.
   * @return {module:model/DeviceToken} The populated <code>DeviceToken</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('clientId')) {
        obj['clientId'] = ApiClient.convertToType(data['clientId'], 'String');
      }
      if (data.hasOwnProperty('platform')) {
        obj['platform'] = ApiClient.convertToType(data['platform'], 'String');
      }
      if (data.hasOwnProperty('deviceToken')) {
        obj['deviceToken'] = ApiClient.convertToType(data['deviceToken'], 'String');
      }
    }
    return obj;
  }

  /**
   * Client id
   * @member {String} clientId
   */
  exports.prototype['clientId'] = undefined;
  /**
   * ios, android, or web
   * @member {String} platform
   */
  exports.prototype['platform'] = undefined;
  /**
   * The device token
   * @member {String} deviceToken
   */
  exports.prototype['deviceToken'] = undefined;



  return exports;
}));



},{"../ApiClient":9}],33:[function(require,module,exports){
/**
 * quantimodo
 * We make it easy to retrieve and analyze normalized user data from a wide array of devices and applications. Check out our [docs and sdk's](https://github.com/QuantiModo/docs) or [contact us](https://help.quantimo.do).
 *
 * OpenAPI spec version: 5.8.112511
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.3.1
 *
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/ExplanationStartTracking', 'model/Image'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./ExplanationStartTracking'), require('./Image'));
  } else {
    // Browser globals (root is window)
    if (!root.Quantimodo) {
      root.Quantimodo = {};
    }
    root.Quantimodo.Explanation = factory(root.Quantimodo.ApiClient, root.Quantimodo.ExplanationStartTracking, root.Quantimodo.Image);
  }
}(this, function(ApiClient, ExplanationStartTracking, Image) {
  'use strict';




  /**
   * The Explanation model module.
   * @module model/Explanation
   * @version 5.8.112511
   */

  /**
   * Constructs a new <code>Explanation</code>.
   * @alias module:model/Explanation
   * @class
   * @param description {String} Example: These factors are most predictive of Overall Mood based on your own data.
   * @param image {module:model/Image} 
   * @param ionIcon {String} Example: ion-ios-person
   * @param startTracking {module:model/ExplanationStartTracking} 
   * @param title {String} Example: Top Predictors of Overall Mood
   */
  var exports = function(description, image, ionIcon, startTracking, title) {
    var _this = this;

    _this['description'] = description;
    _this['image'] = image;
    _this['ionIcon'] = ionIcon;
    _this['startTracking'] = startTracking;
    _this['title'] = title;

  };

  /**
   * Constructs a <code>Explanation</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/Explanation} obj Optional instance to populate.
   * @return {module:model/Explanation} The populated <code>Explanation</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('description')) {
        obj['description'] = ApiClient.convertToType(data['description'], 'String');
      }
      if (data.hasOwnProperty('image')) {
        obj['image'] = Image.constructFromObject(data['image']);
      }
      if (data.hasOwnProperty('ionIcon')) {
        obj['ionIcon'] = ApiClient.convertToType(data['ionIcon'], 'String');
      }
      if (data.hasOwnProperty('startTracking')) {
        obj['startTracking'] = ExplanationStartTracking.constructFromObject(data['startTracking']);
      }
      if (data.hasOwnProperty('title')) {
        obj['title'] = ApiClient.convertToType(data['title'], 'String');
      }
      if (data.hasOwnProperty('html')) {
        obj['html'] = ApiClient.convertToType(data['html'], 'String');
      }
    }
    return obj;
  }

  /**
   * Example: These factors are most predictive of Overall Mood based on your own data.
   * @member {String} description
   */
  exports.prototype['description'] = undefined;
  /**
   * @member {module:model/Image} image
   */
  exports.prototype['image'] = undefined;
  /**
   * Example: ion-ios-person
   * @member {String} ionIcon
   */
  exports.prototype['ionIcon'] = undefined;
  /**
   * @member {module:model/ExplanationStartTracking} startTracking
   */
  exports.prototype['startTracking'] = undefined;
  /**
   * Example: Top Predictors of Overall Mood
   * @member {String} title
   */
  exports.prototype['title'] = undefined;
  /**
   * Embeddable list of study summaries with explanation at the top
   * @member {String} html
   */
  exports.prototype['html'] = undefined;



  return exports;
}));



},{"../ApiClient":9,"./ExplanationStartTracking":34,"./Image":39}],34:[function(require,module,exports){
/**
 * quantimodo
 * We make it easy to retrieve and analyze normalized user data from a wide array of devices and applications. Check out our [docs and sdk's](https://github.com/QuantiModo/docs) or [contact us](https://help.quantimo.do).
 *
 * OpenAPI spec version: 5.8.112511
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.3.1
 *
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/Button'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./Button'));
  } else {
    // Browser globals (root is window)
    if (!root.Quantimodo) {
      root.Quantimodo = {};
    }
    root.Quantimodo.ExplanationStartTracking = factory(root.Quantimodo.ApiClient, root.Quantimodo.Button);
  }
}(this, function(ApiClient, Button) {
  'use strict';




  /**
   * The ExplanationStartTracking model module.
   * @module model/ExplanationStartTracking
   * @version 5.8.112511
   */

  /**
   * Constructs a new <code>ExplanationStartTracking</code>.
   * @alias module:model/ExplanationStartTracking
   * @class
   * @param button {module:model/Button} 
   * @param description {String} Example: The more data I have the more accurate your results will be so track regularly!
   * @param title {String} Example: Improve Accuracy
   */
  var exports = function(button, description, title) {
    var _this = this;

    _this['button'] = button;
    _this['description'] = description;
    _this['title'] = title;
  };

  /**
   * Constructs a <code>ExplanationStartTracking</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ExplanationStartTracking} obj Optional instance to populate.
   * @return {module:model/ExplanationStartTracking} The populated <code>ExplanationStartTracking</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('button')) {
        obj['button'] = Button.constructFromObject(data['button']);
      }
      if (data.hasOwnProperty('description')) {
        obj['description'] = ApiClient.convertToType(data['description'], 'String');
      }
      if (data.hasOwnProperty('title')) {
        obj['title'] = ApiClient.convertToType(data['title'], 'String');
      }
    }
    return obj;
  }

  /**
   * @member {module:model/Button} button
   */
  exports.prototype['button'] = undefined;
  /**
   * Example: The more data I have the more accurate your results will be so track regularly!
   * @member {String} description
   */
  exports.prototype['description'] = undefined;
  /**
   * Example: Improve Accuracy
   * @member {String} title
   */
  exports.prototype['title'] = undefined;



  return exports;
}));



},{"../ApiClient":9,"./Button":24}],35:[function(require,module,exports){
/**
 * quantimodo
 * We make it easy to retrieve and analyze normalized user data from a wide array of devices and applications. Check out our [docs and sdk's](https://github.com/QuantiModo/docs) or [contact us](https://help.quantimo.do).
 *
 * OpenAPI spec version: 5.8.112511
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.3.1
 *
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/Connector'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./Connector'));
  } else {
    // Browser globals (root is window)
    if (!root.Quantimodo) {
      root.Quantimodo = {};
    }
    root.Quantimodo.GetConnectorsResponse = factory(root.Quantimodo.ApiClient, root.Quantimodo.Connector);
  }
}(this, function(ApiClient, Connector) {
  'use strict';




  /**
   * The GetConnectorsResponse model module.
   * @module model/GetConnectorsResponse
   * @version 5.8.112511
   */

  /**
   * Constructs a new <code>GetConnectorsResponse</code>.
   * @alias module:model/GetConnectorsResponse
   * @class
   * @param status {Number} Status code
   * @param success {Boolean} 
   */
  var exports = function(status, success) {
    var _this = this;



    _this['status'] = status;
    _this['success'] = success;
  };

  /**
   * Constructs a <code>GetConnectorsResponse</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/GetConnectorsResponse} obj Optional instance to populate.
   * @return {module:model/GetConnectorsResponse} The populated <code>GetConnectorsResponse</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('connectors')) {
        obj['connectors'] = ApiClient.convertToType(data['connectors'], [Connector]);
      }
      if (data.hasOwnProperty('message')) {
        obj['message'] = ApiClient.convertToType(data['message'], 'String');
      }
      if (data.hasOwnProperty('status')) {
        obj['status'] = ApiClient.convertToType(data['status'], 'Number');
      }
      if (data.hasOwnProperty('success')) {
        obj['success'] = ApiClient.convertToType(data['success'], 'Boolean');
      }
    }
    return obj;
  }

  /**
   * @member {Array.<module:model/Connector>} connectors
   */
  exports.prototype['connectors'] = undefined;
  /**
   * Message
   * @member {String} message
   */
  exports.prototype['message'] = undefined;
  /**
   * Status code
   * @member {Number} status
   */
  exports.prototype['status'] = undefined;
  /**
   * @member {Boolean} success
   */
  exports.prototype['success'] = undefined;



  return exports;
}));



},{"../ApiClient":9,"./Connector":28}],36:[function(require,module,exports){
/**
 * quantimodo
 * We make it easy to retrieve and analyze normalized user data from a wide array of devices and applications. Check out our [docs and sdk's](https://github.com/QuantiModo/docs) or [contact us](https://help.quantimo.do).
 *
 * OpenAPI spec version: 5.8.112511
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.3.1
 *
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/Correlation', 'model/Explanation'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./Correlation'), require('./Explanation'));
  } else {
    // Browser globals (root is window)
    if (!root.Quantimodo) {
      root.Quantimodo = {};
    }
    root.Quantimodo.GetCorrelationsDataResponse = factory(root.Quantimodo.ApiClient, root.Quantimodo.Correlation, root.Quantimodo.Explanation);
  }
}(this, function(ApiClient, Correlation, Explanation) {
  'use strict';




  /**
   * The GetCorrelationsDataResponse model module.
   * @module model/GetCorrelationsDataResponse
   * @version 5.8.112511
   */

  /**
   * Constructs a new <code>GetCorrelationsDataResponse</code>.
   * @alias module:model/GetCorrelationsDataResponse
   * @class
   * @param correlations {Array.<module:model/Correlation>} 
   * @param explanation {module:model/Explanation} 
   */
  var exports = function(correlations, explanation) {
    var _this = this;

    _this['correlations'] = correlations;
    _this['explanation'] = explanation;
  };

  /**
   * Constructs a <code>GetCorrelationsDataResponse</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/GetCorrelationsDataResponse} obj Optional instance to populate.
   * @return {module:model/GetCorrelationsDataResponse} The populated <code>GetCorrelationsDataResponse</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('correlations')) {
        obj['correlations'] = ApiClient.convertToType(data['correlations'], [Correlation]);
      }
      if (data.hasOwnProperty('explanation')) {
        obj['explanation'] = Explanation.constructFromObject(data['explanation']);
      }
    }
    return obj;
  }

  /**
   * @member {Array.<module:model/Correlation>} correlations
   */
  exports.prototype['correlations'] = undefined;
  /**
   * @member {module:model/Explanation} explanation
   */
  exports.prototype['explanation'] = undefined;



  return exports;
}));



},{"../ApiClient":9,"./Correlation":30,"./Explanation":33}],37:[function(require,module,exports){
/**
 * quantimodo
 * We make it easy to retrieve and analyze normalized user data from a wide array of devices and applications. Check out our [docs and sdk's](https://github.com/QuantiModo/docs) or [contact us](https://help.quantimo.do).
 *
 * OpenAPI spec version: 5.8.112511
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.3.1
 *
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/GetCorrelationsDataResponse'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./GetCorrelationsDataResponse'));
  } else {
    // Browser globals (root is window)
    if (!root.Quantimodo) {
      root.Quantimodo = {};
    }
    root.Quantimodo.GetCorrelationsResponse = factory(root.Quantimodo.ApiClient, root.Quantimodo.GetCorrelationsDataResponse);
  }
}(this, function(ApiClient, GetCorrelationsDataResponse) {
  'use strict';




  /**
   * The GetCorrelationsResponse model module.
   * @module model/GetCorrelationsResponse
   * @version 5.8.112511
   */

  /**
   * Constructs a new <code>GetCorrelationsResponse</code>.
   * @alias module:model/GetCorrelationsResponse
   * @class
   * @param status {Number} Status code
   * @param success {Boolean} 
   */
  var exports = function(status, success) {
    var _this = this;



    _this['status'] = status;
    _this['success'] = success;
  };

  /**
   * Constructs a <code>GetCorrelationsResponse</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/GetCorrelationsResponse} obj Optional instance to populate.
   * @return {module:model/GetCorrelationsResponse} The populated <code>GetCorrelationsResponse</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('data')) {
        obj['data'] = GetCorrelationsDataResponse.constructFromObject(data['data']);
      }
      if (data.hasOwnProperty('message')) {
        obj['message'] = ApiClient.convertToType(data['message'], 'String');
      }
      if (data.hasOwnProperty('status')) {
        obj['status'] = ApiClient.convertToType(data['status'], 'Number');
      }
      if (data.hasOwnProperty('success')) {
        obj['success'] = ApiClient.convertToType(data['success'], 'Boolean');
      }
    }
    return obj;
  }

  /**
   * @member {module:model/GetCorrelationsDataResponse} data
   */
  exports.prototype['data'] = undefined;
  /**
   * Message
   * @member {String} message
   */
  exports.prototype['message'] = undefined;
  /**
   * Status code
   * @member {Number} status
   */
  exports.prototype['status'] = undefined;
  /**
   * @member {Boolean} success
   */
  exports.prototype['success'] = undefined;



  return exports;
}));



},{"../ApiClient":9,"./GetCorrelationsDataResponse":36}],38:[function(require,module,exports){
/**
 * quantimodo
 * We make it easy to retrieve and analyze normalized user data from a wide array of devices and applications. Check out our [docs and sdk's](https://github.com/QuantiModo/docs) or [contact us](https://help.quantimo.do).
 *
 * OpenAPI spec version: 5.8.112511
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.3.1
 *
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/TrackingReminderNotification'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./TrackingReminderNotification'));
  } else {
    // Browser globals (root is window)
    if (!root.Quantimodo) {
      root.Quantimodo = {};
    }
    root.Quantimodo.GetTrackingReminderNotificationsResponse = factory(root.Quantimodo.ApiClient, root.Quantimodo.TrackingReminderNotification);
  }
}(this, function(ApiClient, TrackingReminderNotification) {
  'use strict';




  /**
   * The GetTrackingReminderNotificationsResponse model module.
   * @module model/GetTrackingReminderNotificationsResponse
   * @version 5.8.112511
   */

  /**
   * Constructs a new <code>GetTrackingReminderNotificationsResponse</code>.
   * @alias module:model/GetTrackingReminderNotificationsResponse
   * @class
   * @param status {Number} Status code
   * @param success {Boolean} 
   */
  var exports = function(status, success) {
    var _this = this;



    _this['status'] = status;
    _this['success'] = success;
  };

  /**
   * Constructs a <code>GetTrackingReminderNotificationsResponse</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/GetTrackingReminderNotificationsResponse} obj Optional instance to populate.
   * @return {module:model/GetTrackingReminderNotificationsResponse} The populated <code>GetTrackingReminderNotificationsResponse</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('data')) {
        obj['data'] = ApiClient.convertToType(data['data'], [TrackingReminderNotification]);
      }
      if (data.hasOwnProperty('message')) {
        obj['message'] = ApiClient.convertToType(data['message'], 'String');
      }
      if (data.hasOwnProperty('status')) {
        obj['status'] = ApiClient.convertToType(data['status'], 'Number');
      }
      if (data.hasOwnProperty('success')) {
        obj['success'] = ApiClient.convertToType(data['success'], 'Boolean');
      }
    }
    return obj;
  }

  /**
   * @member {Array.<module:model/TrackingReminderNotification>} data
   */
  exports.prototype['data'] = undefined;
  /**
   * Message
   * @member {String} message
   */
  exports.prototype['message'] = undefined;
  /**
   * Status code
   * @member {Number} status
   */
  exports.prototype['status'] = undefined;
  /**
   * @member {Boolean} success
   */
  exports.prototype['success'] = undefined;



  return exports;
}));



},{"../ApiClient":9,"./TrackingReminderNotification":65}],39:[function(require,module,exports){
/**
 * quantimodo
 * We make it easy to retrieve and analyze normalized user data from a wide array of devices and applications. Check out our [docs and sdk's](https://github.com/QuantiModo/docs) or [contact us](https://help.quantimo.do).
 *
 * OpenAPI spec version: 5.8.112511
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.3.1
 *
 * Do not edit the class manually.
 *
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
    if (!root.Quantimodo) {
      root.Quantimodo = {};
    }
    root.Quantimodo.Image = factory(root.Quantimodo.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The Image model module.
   * @module model/Image
   * @version 5.8.112511
   */

  /**
   * Constructs a new <code>Image</code>.
   * @alias module:model/Image
   * @class
   * @param height {String} Example: 240
   * @param imageUrl {String} Example: https://www.filepicker.io/api/file/TjmeNWS5Q2SFmtJlUGLf
   * @param width {String} Example: 224
   */
  var exports = function(height, imageUrl, width) {
    var _this = this;

    _this['height'] = height;
    _this['imageUrl'] = imageUrl;
    _this['width'] = width;
  };

  /**
   * Constructs a <code>Image</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/Image} obj Optional instance to populate.
   * @return {module:model/Image} The populated <code>Image</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('height')) {
        obj['height'] = ApiClient.convertToType(data['height'], 'String');
      }
      if (data.hasOwnProperty('imageUrl')) {
        obj['imageUrl'] = ApiClient.convertToType(data['imageUrl'], 'String');
      }
      if (data.hasOwnProperty('width')) {
        obj['width'] = ApiClient.convertToType(data['width'], 'String');
      }
    }
    return obj;
  }

  /**
   * Example: 240
   * @member {String} height
   */
  exports.prototype['height'] = undefined;
  /**
   * Example: https://www.filepicker.io/api/file/TjmeNWS5Q2SFmtJlUGLf
   * @member {String} imageUrl
   */
  exports.prototype['imageUrl'] = undefined;
  /**
   * Example: 224
   * @member {String} width
   */
  exports.prototype['width'] = undefined;



  return exports;
}));



},{"../ApiClient":9}],40:[function(require,module,exports){
/**
 * quantimodo
 * We make it easy to retrieve and analyze normalized user data from a wide array of devices and applications. Check out our [docs and sdk's](https://github.com/QuantiModo/docs) or [contact us](https://help.quantimo.do).
 *
 * OpenAPI spec version: 5.8.112511
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.3.1
 *
 * Do not edit the class manually.
 *
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
    if (!root.Quantimodo) {
      root.Quantimodo = {};
    }
    root.Quantimodo.JsonErrorResponse = factory(root.Quantimodo.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The JsonErrorResponse model module.
   * @module model/JsonErrorResponse
   * @version 5.8.112511
   */

  /**
   * Constructs a new <code>JsonErrorResponse</code>.
   * @alias module:model/JsonErrorResponse
   * @class
   * @param status {String} Status: \"ok\" or \"error\"
   */
  var exports = function(status) {
    var _this = this;


    _this['status'] = status;
  };

  /**
   * Constructs a <code>JsonErrorResponse</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/JsonErrorResponse} obj Optional instance to populate.
   * @return {module:model/JsonErrorResponse} The populated <code>JsonErrorResponse</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('message')) {
        obj['message'] = ApiClient.convertToType(data['message'], 'String');
      }
      if (data.hasOwnProperty('status')) {
        obj['status'] = ApiClient.convertToType(data['status'], 'String');
      }
    }
    return obj;
  }

  /**
   * Error message
   * @member {String} message
   */
  exports.prototype['message'] = undefined;
  /**
   * Status: \"ok\" or \"error\"
   * @member {String} status
   */
  exports.prototype['status'] = undefined;



  return exports;
}));



},{"../ApiClient":9}],41:[function(require,module,exports){
/**
 * quantimodo
 * We make it easy to retrieve and analyze normalized user data from a wide array of devices and applications. Check out our [docs and sdk's](https://github.com/QuantiModo/docs) or [contact us](https://help.quantimo.do).
 *
 * OpenAPI spec version: 5.8.112511
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.3.1
 *
 * Do not edit the class manually.
 *
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
    if (!root.Quantimodo) {
      root.Quantimodo = {};
    }
    root.Quantimodo.Measurement = factory(root.Quantimodo.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The Measurement model module.
   * @module model/Measurement
   * @version 5.8.112511
   */

  /**
   * Constructs a new <code>Measurement</code>.
   * @alias module:model/Measurement
   * @class
   * @param sourceName {String} Application or device used to record the measurement values
   * @param startTimeString {String} Start Time for the measurement event in UTC ISO 8601 YYYY-MM-DDThh:mm:ss
   * @param unitAbbreviatedName {String} Abbreviated name for the unit of measurement
   * @param value {Number} Converted measurement value in requested unit
   * @param variableName {String} Name of the variable for which we are creating the measurement records
   */
  var exports = function(sourceName, startTimeString, unitAbbreviatedName, value, variableName) {
    var _this = this;




















    _this['sourceName'] = sourceName;


    _this['startTimeString'] = startTimeString;

    _this['unitAbbreviatedName'] = unitAbbreviatedName;














    _this['value'] = value;





    _this['variableName'] = variableName;

  };

  /**
   * Constructs a <code>Measurement</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/Measurement} obj Optional instance to populate.
   * @return {module:model/Measurement} The populated <code>Measurement</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('clientId')) {
        obj['clientId'] = ApiClient.convertToType(data['clientId'], 'String');
      }
      if (data.hasOwnProperty('connectorId')) {
        obj['connectorId'] = ApiClient.convertToType(data['connectorId'], 'Number');
      }
      if (data.hasOwnProperty('createdAt')) {
        obj['createdAt'] = ApiClient.convertToType(data['createdAt'], 'String');
      }
      if (data.hasOwnProperty('displayValueAndUnitString')) {
        obj['displayValueAndUnitString'] = ApiClient.convertToType(data['displayValueAndUnitString'], 'String');
      }
      if (data.hasOwnProperty('iconIcon')) {
        obj['iconIcon'] = ApiClient.convertToType(data['iconIcon'], 'String');
      }
      if (data.hasOwnProperty('id')) {
        obj['id'] = ApiClient.convertToType(data['id'], 'Number');
      }
      if (data.hasOwnProperty('inputType')) {
        obj['inputType'] = ApiClient.convertToType(data['inputType'], 'String');
      }
      if (data.hasOwnProperty('ionIcon')) {
        obj['ionIcon'] = ApiClient.convertToType(data['ionIcon'], 'String');
      }
      if (data.hasOwnProperty('manualTracking')) {
        obj['manualTracking'] = ApiClient.convertToType(data['manualTracking'], 'Boolean');
      }
      if (data.hasOwnProperty('maximumAllowedValue')) {
        obj['maximumAllowedValue'] = ApiClient.convertToType(data['maximumAllowedValue'], 'Number');
      }
      if (data.hasOwnProperty('minimumAllowedValue')) {
        obj['minimumAllowedValue'] = ApiClient.convertToType(data['minimumAllowedValue'], 'Number');
      }
      if (data.hasOwnProperty('note')) {
        obj['note'] = ApiClient.convertToType(data['note'], 'String');
      }
      if (data.hasOwnProperty('noteObject')) {
        obj['noteObject'] = ApiClient.convertToType(data['noteObject'], Object);
      }
      if (data.hasOwnProperty('noteHtml')) {
        obj['noteHtml'] = ApiClient.convertToType(data['noteHtml'], Object);
      }
      if (data.hasOwnProperty('originalUnitId')) {
        obj['originalUnitId'] = ApiClient.convertToType(data['originalUnitId'], 'Number');
      }
      if (data.hasOwnProperty('originalValue')) {
        obj['originalValue'] = ApiClient.convertToType(data['originalValue'], 'Number');
      }
      if (data.hasOwnProperty('pngPath')) {
        obj['pngPath'] = ApiClient.convertToType(data['pngPath'], 'String');
      }
      if (data.hasOwnProperty('pngUrl')) {
        obj['pngUrl'] = ApiClient.convertToType(data['pngUrl'], 'String');
      }
      if (data.hasOwnProperty('productUrl')) {
        obj['productUrl'] = ApiClient.convertToType(data['productUrl'], 'String');
      }
      if (data.hasOwnProperty('sourceName')) {
        obj['sourceName'] = ApiClient.convertToType(data['sourceName'], 'String');
      }
      if (data.hasOwnProperty('startDate')) {
        obj['startDate'] = ApiClient.convertToType(data['startDate'], 'String');
      }
      if (data.hasOwnProperty('startTimeEpoch')) {
        obj['startTimeEpoch'] = ApiClient.convertToType(data['startTimeEpoch'], 'Number');
      }
      if (data.hasOwnProperty('startTimeString')) {
        obj['startTimeString'] = ApiClient.convertToType(data['startTimeString'], 'String');
      }
      if (data.hasOwnProperty('svgUrl')) {
        obj['svgUrl'] = ApiClient.convertToType(data['svgUrl'], 'String');
      }
      if (data.hasOwnProperty('unitAbbreviatedName')) {
        obj['unitAbbreviatedName'] = ApiClient.convertToType(data['unitAbbreviatedName'], 'String');
      }
      if (data.hasOwnProperty('unitCategoryId')) {
        obj['unitCategoryId'] = ApiClient.convertToType(data['unitCategoryId'], 'Number');
      }
      if (data.hasOwnProperty('unitCategoryName')) {
        obj['unitCategoryName'] = ApiClient.convertToType(data['unitCategoryName'], 'String');
      }
      if (data.hasOwnProperty('unitId')) {
        obj['unitId'] = ApiClient.convertToType(data['unitId'], 'Number');
      }
      if (data.hasOwnProperty('unitName')) {
        obj['unitName'] = ApiClient.convertToType(data['unitName'], 'String');
      }
      if (data.hasOwnProperty('updatedAt')) {
        obj['updatedAt'] = ApiClient.convertToType(data['updatedAt'], 'String');
      }
      if (data.hasOwnProperty('url')) {
        obj['url'] = ApiClient.convertToType(data['url'], 'String');
      }
      if (data.hasOwnProperty('userVariableUnitAbbreviatedName')) {
        obj['userVariableUnitAbbreviatedName'] = ApiClient.convertToType(data['userVariableUnitAbbreviatedName'], 'String');
      }
      if (data.hasOwnProperty('userVariableUnitCategoryId')) {
        obj['userVariableUnitCategoryId'] = ApiClient.convertToType(data['userVariableUnitCategoryId'], 'Number');
      }
      if (data.hasOwnProperty('userVariableUnitCategoryName')) {
        obj['userVariableUnitCategoryName'] = ApiClient.convertToType(data['userVariableUnitCategoryName'], 'String');
      }
      if (data.hasOwnProperty('userVariableUnitId')) {
        obj['userVariableUnitId'] = ApiClient.convertToType(data['userVariableUnitId'], 'Number');
      }
      if (data.hasOwnProperty('userVariableUnitName')) {
        obj['userVariableUnitName'] = ApiClient.convertToType(data['userVariableUnitName'], 'String');
      }
      if (data.hasOwnProperty('userVariableVariableCategoryId')) {
        obj['userVariableVariableCategoryId'] = ApiClient.convertToType(data['userVariableVariableCategoryId'], 'Number');
      }
      if (data.hasOwnProperty('userVariableVariableCategoryName')) {
        obj['userVariableVariableCategoryName'] = ApiClient.convertToType(data['userVariableVariableCategoryName'], 'String');
      }
      if (data.hasOwnProperty('valence')) {
        obj['valence'] = ApiClient.convertToType(data['valence'], 'String');
      }
      if (data.hasOwnProperty('value')) {
        obj['value'] = ApiClient.convertToType(data['value'], 'Number');
      }
      if (data.hasOwnProperty('variableCategoryId')) {
        obj['variableCategoryId'] = ApiClient.convertToType(data['variableCategoryId'], 'Number');
      }
      if (data.hasOwnProperty('variableCategoryImageUrl')) {
        obj['variableCategoryImageUrl'] = ApiClient.convertToType(data['variableCategoryImageUrl'], 'String');
      }
      if (data.hasOwnProperty('variableCategoryName')) {
        obj['variableCategoryName'] = ApiClient.convertToType(data['variableCategoryName'], 'String');
      }
      if (data.hasOwnProperty('variableDescription')) {
        obj['variableDescription'] = ApiClient.convertToType(data['variableDescription'], 'String');
      }
      if (data.hasOwnProperty('variableId')) {
        obj['variableId'] = ApiClient.convertToType(data['variableId'], 'Number');
      }
      if (data.hasOwnProperty('variableName')) {
        obj['variableName'] = ApiClient.convertToType(data['variableName'], 'String');
      }
      if (data.hasOwnProperty('displayName')) {
        obj['displayName'] = ApiClient.convertToType(data['displayName'], 'String');
      }
    }
    return obj;
  }

  /**
   * Example: quantimodo
   * @member {String} clientId
   */
  exports.prototype['clientId'] = undefined;
  /**
   * Example: 13
   * @member {Number} connectorId
   */
  exports.prototype['connectorId'] = undefined;
  /**
   * Example: 2017-07-30 21:08:36
   * @member {String} createdAt
   */
  exports.prototype['createdAt'] = undefined;
  /**
   * Examples: 3/5, $10, or 1 count
   * @member {String} displayValueAndUnitString
   */
  exports.prototype['displayValueAndUnitString'] = undefined;
  /**
   * Example: ion-sad-outline
   * @member {String} iconIcon
   */
  exports.prototype['iconIcon'] = undefined;
  /**
   * Example: 1051466127
   * @member {Number} id
   */
  exports.prototype['id'] = undefined;
  /**
   * Example: value
   * @member {String} inputType
   */
  exports.prototype['inputType'] = undefined;
  /**
   * Example: ion-ios-medkit-outline
   * @member {String} ionIcon
   */
  exports.prototype['ionIcon'] = undefined;
  /**
   * Example: 1
   * @member {Boolean} manualTracking
   */
  exports.prototype['manualTracking'] = undefined;
  /**
   * Example: 5
   * @member {Number} maximumAllowedValue
   */
  exports.prototype['maximumAllowedValue'] = undefined;
  /**
   * Example: 1
   * @member {Number} minimumAllowedValue
   */
  exports.prototype['minimumAllowedValue'] = undefined;
  /**
   * Note of measurement
   * @member {String} note
   */
  exports.prototype['note'] = undefined;
  /**
   * Additional meta data for the measurement
   * @member {Object} noteObject
   */
  exports.prototype['noteObject'] = undefined;
  /**
   * Embeddable HTML with message hyperlinked with associated url
   * @member {Object} noteHtml
   */
  exports.prototype['noteHtml'] = undefined;
  /**
   * Example: 23
   * @member {Number} originalUnitId
   */
  exports.prototype['originalUnitId'] = undefined;
  /**
   * Original value as originally submitted
   * @member {Number} originalValue
   */
  exports.prototype['originalValue'] = undefined;
  /**
   * Example: img/variable_categories/treatments.png
   * @member {String} pngPath
   */
  exports.prototype['pngPath'] = undefined;
  /**
   * Example: https://app.quantimo.do/ionic/Modo/www/img/variable_categories/treatments.png
   * @member {String} pngUrl
   */
  exports.prototype['pngUrl'] = undefined;
  /**
   * Link to associated product for purchase
   * @member {String} productUrl
   */
  exports.prototype['productUrl'] = undefined;
  /**
   * Application or device used to record the measurement values
   * @member {String} sourceName
   */
  exports.prototype['sourceName'] = undefined;
  /**
   * Example: 2014-08-27
   * @member {String} startDate
   */
  exports.prototype['startDate'] = undefined;
  /**
   * Seconds between the start of the event measured and 1970 (Unix timestamp)
   * @member {Number} startTimeEpoch
   */
  exports.prototype['startTimeEpoch'] = undefined;
  /**
   * Start Time for the measurement event in UTC ISO 8601 YYYY-MM-DDThh:mm:ss
   * @member {String} startTimeString
   */
  exports.prototype['startTimeString'] = undefined;
  /**
   * Example: https://app.quantimo.do/ionic/Modo/www/img/variable_categories/treatments.svg
   * @member {String} svgUrl
   */
  exports.prototype['svgUrl'] = undefined;
  /**
   * Abbreviated name for the unit of measurement
   * @member {String} unitAbbreviatedName
   */
  exports.prototype['unitAbbreviatedName'] = undefined;
  /**
   * Example: 6
   * @member {Number} unitCategoryId
   */
  exports.prototype['unitCategoryId'] = undefined;
  /**
   * Example: Miscellany
   * @member {String} unitCategoryName
   */
  exports.prototype['unitCategoryName'] = undefined;
  /**
   * Example: 23
   * @member {Number} unitId
   */
  exports.prototype['unitId'] = undefined;
  /**
   * Example: Count
   * @member {String} unitName
   */
  exports.prototype['unitName'] = undefined;
  /**
   * Example: 2017-07-30 21:08:36
   * @member {String} updatedAt
   */
  exports.prototype['updatedAt'] = undefined;
  /**
   * Link to associated Facebook like or Github commit, for instance
   * @member {String} url
   */
  exports.prototype['url'] = undefined;
  /**
   * Example: count
   * @member {String} userVariableUnitAbbreviatedName
   */
  exports.prototype['userVariableUnitAbbreviatedName'] = undefined;
  /**
   * Example: 6
   * @member {Number} userVariableUnitCategoryId
   */
  exports.prototype['userVariableUnitCategoryId'] = undefined;
  /**
   * Example: Miscellany
   * @member {String} userVariableUnitCategoryName
   */
  exports.prototype['userVariableUnitCategoryName'] = undefined;
  /**
   * Example: 23
   * @member {Number} userVariableUnitId
   */
  exports.prototype['userVariableUnitId'] = undefined;
  /**
   * Example: Count
   * @member {String} userVariableUnitName
   */
  exports.prototype['userVariableUnitName'] = undefined;
  /**
   * Example: 13
   * @member {Number} userVariableVariableCategoryId
   */
  exports.prototype['userVariableVariableCategoryId'] = undefined;
  /**
   * Example: Treatments
   * @member {String} userVariableVariableCategoryName
   */
  exports.prototype['userVariableVariableCategoryName'] = undefined;
  /**
   * Example: negative
   * @member {String} valence
   */
  exports.prototype['valence'] = undefined;
  /**
   * Converted measurement value in requested unit
   * @member {Number} value
   */
  exports.prototype['value'] = undefined;
  /**
   * Example: 13
   * @member {Number} variableCategoryId
   */
  exports.prototype['variableCategoryId'] = undefined;
  /**
   * Example: https://maxcdn.icons8.com/Color/PNG/96/Healthcare/pill-96.png
   * @member {String} variableCategoryImageUrl
   */
  exports.prototype['variableCategoryImageUrl'] = undefined;
  /**
   * Example: Treatments
   * @member {String} variableCategoryName
   */
  exports.prototype['variableCategoryName'] = undefined;
  /**
   * Example: negative
   * @member {String} variableDescription
   */
  exports.prototype['variableDescription'] = undefined;
  /**
   * Example: 5956846
   * @member {Number} variableId
   */
  exports.prototype['variableId'] = undefined;
  /**
   * Name of the variable for which we are creating the measurement records
   * @member {String} variableName
   */
  exports.prototype['variableName'] = undefined;
  /**
   * Example: Trader Joe's Bedtime Tea
   * @member {String} displayName
   */
  exports.prototype['displayName'] = undefined;



  return exports;
}));



},{"../ApiClient":9}],42:[function(require,module,exports){
/**
 * quantimodo
 * We make it easy to retrieve and analyze normalized user data from a wide array of devices and applications. Check out our [docs and sdk's](https://github.com/QuantiModo/docs) or [contact us](https://help.quantimo.do).
 *
 * OpenAPI spec version: 5.8.112511
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.3.1
 *
 * Do not edit the class manually.
 *
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
    if (!root.Quantimodo) {
      root.Quantimodo = {};
    }
    root.Quantimodo.MeasurementDelete = factory(root.Quantimodo.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The MeasurementDelete model module.
   * @module model/MeasurementDelete
   * @version 5.8.112511
   */

  /**
   * Constructs a new <code>MeasurementDelete</code>.
   * @alias module:model/MeasurementDelete
   * @class
   * @param clientId {String} Your app's client id
   */
  var exports = function(clientId) {
    var _this = this;




    _this['clientId'] = clientId;
  };

  /**
   * Constructs a <code>MeasurementDelete</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/MeasurementDelete} obj Optional instance to populate.
   * @return {module:model/MeasurementDelete} The populated <code>MeasurementDelete</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('startTime')) {
        obj['startTime'] = ApiClient.convertToType(data['startTime'], 'Number');
      }
      if (data.hasOwnProperty('variableId')) {
        obj['variableId'] = ApiClient.convertToType(data['variableId'], 'Number');
      }
      if (data.hasOwnProperty('connectorName')) {
        obj['connectorName'] = ApiClient.convertToType(data['connectorName'], 'String');
      }
      if (data.hasOwnProperty('clientId')) {
        obj['clientId'] = ApiClient.convertToType(data['clientId'], 'String');
      }
    }
    return obj;
  }

  /**
   * Start time of the measurement to be deleted
   * @member {Number} startTime
   */
  exports.prototype['startTime'] = undefined;
  /**
   * Variable id of the measurement to be deleted
   * @member {Number} variableId
   */
  exports.prototype['variableId'] = undefined;
  /**
   * Name of the connector for which measurements should be deleted
   * @member {String} connectorName
   */
  exports.prototype['connectorName'] = undefined;
  /**
   * Your app's client id
   * @member {String} clientId
   */
  exports.prototype['clientId'] = undefined;



  return exports;
}));



},{"../ApiClient":9}],43:[function(require,module,exports){
/**
 * quantimodo
 * We make it easy to retrieve and analyze normalized user data from a wide array of devices and applications. Check out our [docs and sdk's](https://github.com/QuantiModo/docs) or [contact us](https://help.quantimo.do).
 *
 * OpenAPI spec version: 5.8.112511
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.3.1
 *
 * Do not edit the class manually.
 *
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
    if (!root.Quantimodo) {
      root.Quantimodo = {};
    }
    root.Quantimodo.MeasurementItem = factory(root.Quantimodo.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The MeasurementItem model module.
   * @module model/MeasurementItem
   * @version 5.8.112511
   */

  /**
   * Constructs a new <code>MeasurementItem</code>.
   * @alias module:model/MeasurementItem
   * @class
   * @param timestamp {Number} Timestamp for the measurement event in epoch time (unixtime)
   * @param value {Number} Measurement value
   */
  var exports = function(timestamp, value) {
    var _this = this;


    _this['timestamp'] = timestamp;
    _this['value'] = value;
  };

  /**
   * Constructs a <code>MeasurementItem</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/MeasurementItem} obj Optional instance to populate.
   * @return {module:model/MeasurementItem} The populated <code>MeasurementItem</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('note')) {
        obj['note'] = ApiClient.convertToType(data['note'], 'String');
      }
      if (data.hasOwnProperty('timestamp')) {
        obj['timestamp'] = ApiClient.convertToType(data['timestamp'], 'Number');
      }
      if (data.hasOwnProperty('value')) {
        obj['value'] = ApiClient.convertToType(data['value'], 'Number');
      }
    }
    return obj;
  }

  /**
   * Optional note to include with the measurement
   * @member {String} note
   */
  exports.prototype['note'] = undefined;
  /**
   * Timestamp for the measurement event in epoch time (unixtime)
   * @member {Number} timestamp
   */
  exports.prototype['timestamp'] = undefined;
  /**
   * Measurement value
   * @member {Number} value
   */
  exports.prototype['value'] = undefined;



  return exports;
}));



},{"../ApiClient":9}],44:[function(require,module,exports){
/**
 * quantimodo
 * We make it easy to retrieve and analyze normalized user data from a wide array of devices and applications. Check out our [docs and sdk's](https://github.com/QuantiModo/docs) or [contact us](https://help.quantimo.do).
 *
 * OpenAPI spec version: 5.8.112511
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.3.1
 *
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/MeasurementItem'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./MeasurementItem'));
  } else {
    // Browser globals (root is window)
    if (!root.Quantimodo) {
      root.Quantimodo = {};
    }
    root.Quantimodo.MeasurementSet = factory(root.Quantimodo.ApiClient, root.Quantimodo.MeasurementItem);
  }
}(this, function(ApiClient, MeasurementItem) {
  'use strict';




  /**
   * The MeasurementSet model module.
   * @module model/MeasurementSet
   * @version 5.8.112511
   */

  /**
   * Constructs a new <code>MeasurementSet</code>.
   * @alias module:model/MeasurementSet
   * @class
   * @param measurementItems {Array.<module:model/MeasurementItem>} Array of timestamps, values, and optional notes
   * @param sourceName {String} Name of the application or device used to record the measurement values
   * @param unitAbbreviatedName {String} Unit of measurement
   * @param variableName {String} ORIGINAL name of the variable for which we are creating the measurement records
   */
  var exports = function(measurementItems, sourceName, unitAbbreviatedName, variableName) {
    var _this = this;


    _this['measurementItems'] = measurementItems;
    _this['sourceName'] = sourceName;
    _this['unitAbbreviatedName'] = unitAbbreviatedName;

    _this['variableName'] = variableName;

  };

  /**
   * Constructs a <code>MeasurementSet</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/MeasurementSet} obj Optional instance to populate.
   * @return {module:model/MeasurementSet} The populated <code>MeasurementSet</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('combinationOperation')) {
        obj['combinationOperation'] = ApiClient.convertToType(data['combinationOperation'], 'String');
      }
      if (data.hasOwnProperty('measurementItems')) {
        obj['measurementItems'] = ApiClient.convertToType(data['measurementItems'], [MeasurementItem]);
      }
      if (data.hasOwnProperty('sourceName')) {
        obj['sourceName'] = ApiClient.convertToType(data['sourceName'], 'String');
      }
      if (data.hasOwnProperty('unitAbbreviatedName')) {
        obj['unitAbbreviatedName'] = ApiClient.convertToType(data['unitAbbreviatedName'], 'String');
      }
      if (data.hasOwnProperty('variableCategoryName')) {
        obj['variableCategoryName'] = ApiClient.convertToType(data['variableCategoryName'], 'String');
      }
      if (data.hasOwnProperty('variableName')) {
        obj['variableName'] = ApiClient.convertToType(data['variableName'], 'String');
      }
      if (data.hasOwnProperty('upc')) {
        obj['upc'] = ApiClient.convertToType(data['upc'], 'String');
      }
    }
    return obj;
  }

  /**
   * Way to aggregate measurements over time. Options are \"MEAN\" or \"SUM\". SUM should be used for things like minutes of exercise.  If you use MEAN for exercise, then a person might exercise more minutes in one day but add separate measurements that were smaller.  So when we are doing correlational analysis, we would think that the person exercised less that day even though they exercised more.  Conversely, we must use MEAN for things such as ratings which cannot be SUMMED.
   * @member {module:model/MeasurementSet.CombinationOperationEnum} combinationOperation
   */
  exports.prototype['combinationOperation'] = undefined;
  /**
   * Array of timestamps, values, and optional notes
   * @member {Array.<module:model/MeasurementItem>} measurementItems
   */
  exports.prototype['measurementItems'] = undefined;
  /**
   * Name of the application or device used to record the measurement values
   * @member {String} sourceName
   */
  exports.prototype['sourceName'] = undefined;
  /**
   * Unit of measurement
   * @member {String} unitAbbreviatedName
   */
  exports.prototype['unitAbbreviatedName'] = undefined;
  /**
   * Variable category name
   * @member {String} variableCategoryName
   */
  exports.prototype['variableCategoryName'] = undefined;
  /**
   * ORIGINAL name of the variable for which we are creating the measurement records
   * @member {String} variableName
   */
  exports.prototype['variableName'] = undefined;
  /**
   * UPC or other barcode scan result
   * @member {String} upc
   */
  exports.prototype['upc'] = undefined;


  /**
   * Allowed values for the <code>combinationOperation</code> property.
   * @enum {String}
   * @readonly
   */
  exports.CombinationOperationEnum = {
    /**
     * value: "MEAN"
     * @const
     */
    "MEAN": "MEAN",
    /**
     * value: "SUM"
     * @const
     */
    "SUM": "SUM"  };


  return exports;
}));



},{"../ApiClient":9,"./MeasurementItem":43}],45:[function(require,module,exports){
/**
 * quantimodo
 * We make it easy to retrieve and analyze normalized user data from a wide array of devices and applications. Check out our [docs and sdk's](https://github.com/QuantiModo/docs) or [contact us](https://help.quantimo.do).
 *
 * OpenAPI spec version: 5.8.112511
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.3.1
 *
 * Do not edit the class manually.
 *
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
    if (!root.Quantimodo) {
      root.Quantimodo = {};
    }
    root.Quantimodo.MeasurementUpdate = factory(root.Quantimodo.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The MeasurementUpdate model module.
   * @module model/MeasurementUpdate
   * @version 5.8.112511
   */

  /**
   * Constructs a new <code>MeasurementUpdate</code>.
   * @alias module:model/MeasurementUpdate
   * @class
   * @param id {Number} Variable id of the measurement to be updated
   */
  var exports = function(id) {
    var _this = this;

    _this['id'] = id;



  };

  /**
   * Constructs a <code>MeasurementUpdate</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/MeasurementUpdate} obj Optional instance to populate.
   * @return {module:model/MeasurementUpdate} The populated <code>MeasurementUpdate</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('id')) {
        obj['id'] = ApiClient.convertToType(data['id'], 'Number');
      }
      if (data.hasOwnProperty('note')) {
        obj['note'] = ApiClient.convertToType(data['note'], 'String');
      }
      if (data.hasOwnProperty('startTime')) {
        obj['startTime'] = ApiClient.convertToType(data['startTime'], 'Number');
      }
      if (data.hasOwnProperty('value')) {
        obj['value'] = ApiClient.convertToType(data['value'], 'Number');
      }
    }
    return obj;
  }

  /**
   * Variable id of the measurement to be updated
   * @member {Number} id
   */
  exports.prototype['id'] = undefined;
  /**
   * The new note for the measurement (optional)
   * @member {String} note
   */
  exports.prototype['note'] = undefined;
  /**
   * The new timestamp for the the event in epoch seconds (optional)
   * @member {Number} startTime
   */
  exports.prototype['startTime'] = undefined;
  /**
   * The new value of for the measurement (optional)
   * @member {Number} value
   */
  exports.prototype['value'] = undefined;



  return exports;
}));



},{"../ApiClient":9}],46:[function(require,module,exports){
/**
 * quantimodo
 * We make it easy to retrieve and analyze normalized user data from a wide array of devices and applications. Check out our [docs and sdk's](https://github.com/QuantiModo/docs) or [contact us](https://help.quantimo.do).
 *
 * OpenAPI spec version: 5.8.112511
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.3.1
 *
 * Do not edit the class manually.
 *
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
    if (!root.Quantimodo) {
      root.Quantimodo = {};
    }
    root.Quantimodo.Pair = factory(root.Quantimodo.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The Pair model module.
   * @module model/Pair
   * @version 5.8.112511
   */

  /**
   * Constructs a new <code>Pair</code>.
   * @alias module:model/Pair
   * @class
   * @param causeMeasurement {Number} Example: 101341.66666667
   * @param causeMeasurementValue {Number} Example: 101341.66666667
   * @param causeVariableUnitAbbreviatedName {String} Example: mg
   * @param effectMeasurement {Number} Example: 7.98
   * @param effectMeasurementValue {Number} Example: 7.98
   * @param effectVariableUnitAbbreviatedName {String} Example: %
   * @param timestamp {Number} Example: 1464937200
   */
  var exports = function(causeMeasurement, causeMeasurementValue, causeVariableUnitAbbreviatedName, effectMeasurement, effectMeasurementValue, effectVariableUnitAbbreviatedName, timestamp) {
    var _this = this;

    _this['causeMeasurement'] = causeMeasurement;
    _this['causeMeasurementValue'] = causeMeasurementValue;
    _this['causeVariableUnitAbbreviatedName'] = causeVariableUnitAbbreviatedName;
    _this['effectMeasurement'] = effectMeasurement;
    _this['effectMeasurementValue'] = effectMeasurementValue;
    _this['effectVariableUnitAbbreviatedName'] = effectVariableUnitAbbreviatedName;



    _this['timestamp'] = timestamp;
  };

  /**
   * Constructs a <code>Pair</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/Pair} obj Optional instance to populate.
   * @return {module:model/Pair} The populated <code>Pair</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('causeMeasurement')) {
        obj['causeMeasurement'] = ApiClient.convertToType(data['causeMeasurement'], 'Number');
      }
      if (data.hasOwnProperty('causeMeasurementValue')) {
        obj['causeMeasurementValue'] = ApiClient.convertToType(data['causeMeasurementValue'], 'Number');
      }
      if (data.hasOwnProperty('causeVariableUnitAbbreviatedName')) {
        obj['causeVariableUnitAbbreviatedName'] = ApiClient.convertToType(data['causeVariableUnitAbbreviatedName'], 'String');
      }
      if (data.hasOwnProperty('effectMeasurement')) {
        obj['effectMeasurement'] = ApiClient.convertToType(data['effectMeasurement'], 'Number');
      }
      if (data.hasOwnProperty('effectMeasurementValue')) {
        obj['effectMeasurementValue'] = ApiClient.convertToType(data['effectMeasurementValue'], 'Number');
      }
      if (data.hasOwnProperty('effectVariableUnitAbbreviatedName')) {
        obj['effectVariableUnitAbbreviatedName'] = ApiClient.convertToType(data['effectVariableUnitAbbreviatedName'], 'String');
      }
      if (data.hasOwnProperty('eventAt')) {
        obj['eventAt'] = ApiClient.convertToType(data['eventAt'], 'String');
      }
      if (data.hasOwnProperty('eventAtUnixTime')) {
        obj['eventAtUnixTime'] = ApiClient.convertToType(data['eventAtUnixTime'], 'Number');
      }
      if (data.hasOwnProperty('startTimeString')) {
        obj['startTimeString'] = ApiClient.convertToType(data['startTimeString'], 'String');
      }
      if (data.hasOwnProperty('timestamp')) {
        obj['timestamp'] = ApiClient.convertToType(data['timestamp'], 'Number');
      }
    }
    return obj;
  }

  /**
   * Example: 101341.66666667
   * @member {Number} causeMeasurement
   */
  exports.prototype['causeMeasurement'] = undefined;
  /**
   * Example: 101341.66666667
   * @member {Number} causeMeasurementValue
   */
  exports.prototype['causeMeasurementValue'] = undefined;
  /**
   * Example: mg
   * @member {String} causeVariableUnitAbbreviatedName
   */
  exports.prototype['causeVariableUnitAbbreviatedName'] = undefined;
  /**
   * Example: 7.98
   * @member {Number} effectMeasurement
   */
  exports.prototype['effectMeasurement'] = undefined;
  /**
   * Example: 7.98
   * @member {Number} effectMeasurementValue
   */
  exports.prototype['effectMeasurementValue'] = undefined;
  /**
   * Example: %
   * @member {String} effectVariableUnitAbbreviatedName
   */
  exports.prototype['effectVariableUnitAbbreviatedName'] = undefined;
  /**
   * Example: 2015-08-06 15:49:02 UTC ISO 8601 YYYY-MM-DDThh:mm:ss
   * @member {String} eventAt
   */
  exports.prototype['eventAt'] = undefined;
  /**
   * Example: 1438876142
   * @member {Number} eventAtUnixTime
   */
  exports.prototype['eventAtUnixTime'] = undefined;
  /**
   * Example: 2015-08-06 15:49:02 UTC ISO 8601 YYYY-MM-DDThh:mm:ss
   * @member {String} startTimeString
   */
  exports.prototype['startTimeString'] = undefined;
  /**
   * Example: 1464937200
   * @member {Number} timestamp
   */
  exports.prototype['timestamp'] = undefined;



  return exports;
}));



},{"../ApiClient":9}],47:[function(require,module,exports){
/**
 * quantimodo
 * We make it easy to retrieve and analyze normalized user data from a wide array of devices and applications. Check out our [docs and sdk's](https://github.com/QuantiModo/docs) or [contact us](https://help.quantimo.do).
 *
 * OpenAPI spec version: 5.8.112511
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.3.1
 *
 * Do not edit the class manually.
 *
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
    if (!root.Quantimodo) {
      root.Quantimodo = {};
    }
    root.Quantimodo.ParticipantInstruction = factory(root.Quantimodo.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The ParticipantInstruction model module.
   * @module model/ParticipantInstruction
   * @version 5.8.112511
   */

  /**
   * Constructs a new <code>ParticipantInstruction</code>.
   * @alias module:model/ParticipantInstruction
   * @class
   */
  var exports = function() {
    var _this = this;



  };

  /**
   * Constructs a <code>ParticipantInstruction</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/ParticipantInstruction} obj Optional instance to populate.
   * @return {module:model/ParticipantInstruction} The populated <code>ParticipantInstruction</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('instructionsForCauseVariable')) {
        obj['instructionsForCauseVariable'] = ApiClient.convertToType(data['instructionsForCauseVariable'], 'String');
      }
      if (data.hasOwnProperty('instructionsForEffectVariable')) {
        obj['instructionsForEffectVariable'] = ApiClient.convertToType(data['instructionsForEffectVariable'], 'String');
      }
    }
    return obj;
  }

  /**
   * Example: <a href=\"https://www.amazon.com/Fitbit-Charge-Heart-Fitness-Wristband/dp/B01K9S260E/ref=as_li_ss_tl?ie=UTF8&qid=1493518902&sr=8-3&keywords=fitbit&th=1&linkCode=ll1&tag=quant08-20&linkId=b357b0833de73b0c4e935fd7c13a079e\">Obtain Fitbit</a> and use it to record your Sleep Duration. Once you have a <a href=\"https://www.amazon.com/Fitbit-Charge-Heart-Fitness-Wristband/dp/B01K9S260E/ref=as_li_ss_tl?ie=UTF8&qid=1493518902&sr=8-3&keywords=fitbit&th=1&linkCode=ll1&tag=quant08-20&linkId=b357b0833de73b0c4e935fd7c13a079e\">Fitbit</a> account, <a href=\"https://app.quantimo.do/ionic/Modo/www/#/app/import\">connect your  Fitbit account at QuantiModo</a> to automatically import and analyze your data.
   * @member {String} instructionsForCauseVariable
   */
  exports.prototype['instructionsForCauseVariable'] = undefined;
  /**
   * Example: <a href=\"https://quantimo.do\">Obtain QuantiModo</a> and use it to record your Overall Mood. Once you have a <a href=\"https://quantimo.do\">QuantiModo</a> account, <a href=\"https://app.quantimo.do/ionic/Modo/www/#/app/import\">connect your  QuantiModo account at QuantiModo</a> to automatically import and analyze your data.
   * @member {String} instructionsForEffectVariable
   */
  exports.prototype['instructionsForEffectVariable'] = undefined;



  return exports;
}));



},{"../ApiClient":9}],48:[function(require,module,exports){
/**
 * quantimodo
 * We make it easy to retrieve and analyze normalized user data from a wide array of devices and applications. Check out our [docs and sdk's](https://github.com/QuantiModo/docs) or [contact us](https://help.quantimo.do).
 *
 * OpenAPI spec version: 5.8.112511
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.3.1
 *
 * Do not edit the class manually.
 *
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
    if (!root.Quantimodo) {
      root.Quantimodo = {};
    }
    root.Quantimodo.PostCorrelation = factory(root.Quantimodo.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The PostCorrelation model module.
   * @module model/PostCorrelation
   * @version 5.8.112511
   */

  /**
   * Constructs a new <code>PostCorrelation</code>.
   * @alias module:model/PostCorrelation
   * @class
   * @param causeVariableName {String} Cause variable name
   * @param correlation {Number} Correlation value
   * @param effectVariableName {String} Effect variable name
   */
  var exports = function(causeVariableName, correlation, effectVariableName) {
    var _this = this;

    _this['causeVariableName'] = causeVariableName;
    _this['correlation'] = correlation;
    _this['effectVariableName'] = effectVariableName;

  };

  /**
   * Constructs a <code>PostCorrelation</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/PostCorrelation} obj Optional instance to populate.
   * @return {module:model/PostCorrelation} The populated <code>PostCorrelation</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('causeVariableName')) {
        obj['causeVariableName'] = ApiClient.convertToType(data['causeVariableName'], 'String');
      }
      if (data.hasOwnProperty('correlation')) {
        obj['correlation'] = ApiClient.convertToType(data['correlation'], 'Number');
      }
      if (data.hasOwnProperty('effectVariableName')) {
        obj['effectVariableName'] = ApiClient.convertToType(data['effectVariableName'], 'String');
      }
      if (data.hasOwnProperty('vote')) {
        obj['vote'] = ApiClient.convertToType(data['vote'], 'Number');
      }
    }
    return obj;
  }

  /**
   * Cause variable name
   * @member {String} causeVariableName
   */
  exports.prototype['causeVariableName'] = undefined;
  /**
   * Correlation value
   * @member {Number} correlation
   */
  exports.prototype['correlation'] = undefined;
  /**
   * Effect variable name
   * @member {String} effectVariableName
   */
  exports.prototype['effectVariableName'] = undefined;
  /**
   * Vote: 0 or 1
   * @member {Number} vote
   */
  exports.prototype['vote'] = undefined;



  return exports;
}));



},{"../ApiClient":9}],49:[function(require,module,exports){
/**
 * quantimodo
 * We make it easy to retrieve and analyze normalized user data from a wide array of devices and applications. Check out our [docs and sdk's](https://github.com/QuantiModo/docs) or [contact us](https://help.quantimo.do).
 *
 * OpenAPI spec version: 5.8.112511
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.3.1
 *
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/Variable'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./Variable'));
  } else {
    // Browser globals (root is window)
    if (!root.Quantimodo) {
      root.Quantimodo = {};
    }
    root.Quantimodo.PostMeasurementsDataResponse = factory(root.Quantimodo.ApiClient, root.Quantimodo.Variable);
  }
}(this, function(ApiClient, Variable) {
  'use strict';




  /**
   * The PostMeasurementsDataResponse model module.
   * @module model/PostMeasurementsDataResponse
   * @version 5.8.112511
   */

  /**
   * Constructs a new <code>PostMeasurementsDataResponse</code>.
   * @alias module:model/PostMeasurementsDataResponse
   * @class
   */
  var exports = function() {
    var _this = this;


  };

  /**
   * Constructs a <code>PostMeasurementsDataResponse</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/PostMeasurementsDataResponse} obj Optional instance to populate.
   * @return {module:model/PostMeasurementsDataResponse} The populated <code>PostMeasurementsDataResponse</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('userVariables')) {
        obj['userVariables'] = ApiClient.convertToType(data['userVariables'], [Variable]);
      }
    }
    return obj;
  }

  /**
   * @member {Array.<module:model/Variable>} userVariables
   */
  exports.prototype['userVariables'] = undefined;



  return exports;
}));



},{"../ApiClient":9,"./Variable":74}],50:[function(require,module,exports){
/**
 * quantimodo
 * We make it easy to retrieve and analyze normalized user data from a wide array of devices and applications. Check out our [docs and sdk's](https://github.com/QuantiModo/docs) or [contact us](https://help.quantimo.do).
 *
 * OpenAPI spec version: 5.8.112511
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.3.1
 *
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/PostMeasurementsDataResponse'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./PostMeasurementsDataResponse'));
  } else {
    // Browser globals (root is window)
    if (!root.Quantimodo) {
      root.Quantimodo = {};
    }
    root.Quantimodo.PostMeasurementsResponse = factory(root.Quantimodo.ApiClient, root.Quantimodo.PostMeasurementsDataResponse);
  }
}(this, function(ApiClient, PostMeasurementsDataResponse) {
  'use strict';




  /**
   * The PostMeasurementsResponse model module.
   * @module model/PostMeasurementsResponse
   * @version 5.8.112511
   */

  /**
   * Constructs a new <code>PostMeasurementsResponse</code>.
   * @alias module:model/PostMeasurementsResponse
   * @class
   * @param status {Number} Status code
   * @param success {Boolean} 
   */
  var exports = function(status, success) {
    var _this = this;



    _this['status'] = status;
    _this['success'] = success;
  };

  /**
   * Constructs a <code>PostMeasurementsResponse</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/PostMeasurementsResponse} obj Optional instance to populate.
   * @return {module:model/PostMeasurementsResponse} The populated <code>PostMeasurementsResponse</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('data')) {
        obj['data'] = PostMeasurementsDataResponse.constructFromObject(data['data']);
      }
      if (data.hasOwnProperty('message')) {
        obj['message'] = ApiClient.convertToType(data['message'], 'String');
      }
      if (data.hasOwnProperty('status')) {
        obj['status'] = ApiClient.convertToType(data['status'], 'Number');
      }
      if (data.hasOwnProperty('success')) {
        obj['success'] = ApiClient.convertToType(data['success'], 'Boolean');
      }
    }
    return obj;
  }

  /**
   * @member {module:model/PostMeasurementsDataResponse} data
   */
  exports.prototype['data'] = undefined;
  /**
   * Message
   * @member {String} message
   */
  exports.prototype['message'] = undefined;
  /**
   * Status code
   * @member {Number} status
   */
  exports.prototype['status'] = undefined;
  /**
   * @member {Boolean} success
   */
  exports.prototype['success'] = undefined;



  return exports;
}));



},{"../ApiClient":9,"./PostMeasurementsDataResponse":49}],51:[function(require,module,exports){
/**
 * quantimodo
 * We make it easy to retrieve and analyze normalized user data from a wide array of devices and applications. Check out our [docs and sdk's](https://github.com/QuantiModo/docs) or [contact us](https://help.quantimo.do).
 *
 * OpenAPI spec version: 5.8.112511
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.3.1
 *
 * Do not edit the class manually.
 *
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
    if (!root.Quantimodo) {
      root.Quantimodo = {};
    }
    root.Quantimodo.PostStudyPublishResponse = factory(root.Quantimodo.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The PostStudyPublishResponse model module.
   * @module model/PostStudyPublishResponse
   * @version 5.8.112511
   */

  /**
   * Constructs a new <code>PostStudyPublishResponse</code>.
   * @alias module:model/PostStudyPublishResponse
   * @class
   */
  var exports = function() {
    var _this = this;



  };

  /**
   * Constructs a <code>PostStudyPublishResponse</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/PostStudyPublishResponse} obj Optional instance to populate.
   * @return {module:model/PostStudyPublishResponse} The populated <code>PostStudyPublishResponse</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('status')) {
        obj['status'] = ApiClient.convertToType(data['status'], 'String');
      }
      if (data.hasOwnProperty('success')) {
        obj['success'] = ApiClient.convertToType(data['success'], 'Boolean');
      }
    }
    return obj;
  }

  /**
   * Example: ok
   * @member {String} status
   */
  exports.prototype['status'] = undefined;
  /**
   * Example: true
   * @member {Boolean} success
   */
  exports.prototype['success'] = undefined;



  return exports;
}));



},{"../ApiClient":9}],52:[function(require,module,exports){
/**
 * quantimodo
 * We make it easy to retrieve and analyze normalized user data from a wide array of devices and applications. Check out our [docs and sdk's](https://github.com/QuantiModo/docs) or [contact us](https://help.quantimo.do).
 *
 * OpenAPI spec version: 5.8.112511
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.3.1
 *
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/TrackingReminder', 'model/TrackingReminderNotification', 'model/Variable'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./TrackingReminder'), require('./TrackingReminderNotification'), require('./Variable'));
  } else {
    // Browser globals (root is window)
    if (!root.Quantimodo) {
      root.Quantimodo = {};
    }
    root.Quantimodo.PostTrackingRemindersDataResponse = factory(root.Quantimodo.ApiClient, root.Quantimodo.TrackingReminder, root.Quantimodo.TrackingReminderNotification, root.Quantimodo.Variable);
  }
}(this, function(ApiClient, TrackingReminder, TrackingReminderNotification, Variable) {
  'use strict';




  /**
   * The PostTrackingRemindersDataResponse model module.
   * @module model/PostTrackingRemindersDataResponse
   * @version 5.8.112511
   */

  /**
   * Constructs a new <code>PostTrackingRemindersDataResponse</code>.
   * @alias module:model/PostTrackingRemindersDataResponse
   * @class
   */
  var exports = function() {
    var _this = this;




  };

  /**
   * Constructs a <code>PostTrackingRemindersDataResponse</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/PostTrackingRemindersDataResponse} obj Optional instance to populate.
   * @return {module:model/PostTrackingRemindersDataResponse} The populated <code>PostTrackingRemindersDataResponse</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('trackingReminderNotifications')) {
        obj['trackingReminderNotifications'] = ApiClient.convertToType(data['trackingReminderNotifications'], [TrackingReminderNotification]);
      }
      if (data.hasOwnProperty('trackingReminders')) {
        obj['trackingReminders'] = ApiClient.convertToType(data['trackingReminders'], [TrackingReminder]);
      }
      if (data.hasOwnProperty('userVariables')) {
        obj['userVariables'] = ApiClient.convertToType(data['userVariables'], [Variable]);
      }
    }
    return obj;
  }

  /**
   * @member {Array.<module:model/TrackingReminderNotification>} trackingReminderNotifications
   */
  exports.prototype['trackingReminderNotifications'] = undefined;
  /**
   * @member {Array.<module:model/TrackingReminder>} trackingReminders
   */
  exports.prototype['trackingReminders'] = undefined;
  /**
   * @member {Array.<module:model/Variable>} userVariables
   */
  exports.prototype['userVariables'] = undefined;



  return exports;
}));



},{"../ApiClient":9,"./TrackingReminder":63,"./TrackingReminderNotification":65,"./Variable":74}],53:[function(require,module,exports){
/**
 * quantimodo
 * We make it easy to retrieve and analyze normalized user data from a wide array of devices and applications. Check out our [docs and sdk's](https://github.com/QuantiModo/docs) or [contact us](https://help.quantimo.do).
 *
 * OpenAPI spec version: 5.8.112511
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.3.1
 *
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/PostTrackingRemindersDataResponse'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./PostTrackingRemindersDataResponse'));
  } else {
    // Browser globals (root is window)
    if (!root.Quantimodo) {
      root.Quantimodo = {};
    }
    root.Quantimodo.PostTrackingRemindersResponse = factory(root.Quantimodo.ApiClient, root.Quantimodo.PostTrackingRemindersDataResponse);
  }
}(this, function(ApiClient, PostTrackingRemindersDataResponse) {
  'use strict';




  /**
   * The PostTrackingRemindersResponse model module.
   * @module model/PostTrackingRemindersResponse
   * @version 5.8.112511
   */

  /**
   * Constructs a new <code>PostTrackingRemindersResponse</code>.
   * @alias module:model/PostTrackingRemindersResponse
   * @class
   * @param status {Number} Status code
   * @param success {Boolean} 
   */
  var exports = function(status, success) {
    var _this = this;



    _this['status'] = status;
    _this['success'] = success;
  };

  /**
   * Constructs a <code>PostTrackingRemindersResponse</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/PostTrackingRemindersResponse} obj Optional instance to populate.
   * @return {module:model/PostTrackingRemindersResponse} The populated <code>PostTrackingRemindersResponse</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('data')) {
        obj['data'] = PostTrackingRemindersDataResponse.constructFromObject(data['data']);
      }
      if (data.hasOwnProperty('message')) {
        obj['message'] = ApiClient.convertToType(data['message'], 'String');
      }
      if (data.hasOwnProperty('status')) {
        obj['status'] = ApiClient.convertToType(data['status'], 'Number');
      }
      if (data.hasOwnProperty('success')) {
        obj['success'] = ApiClient.convertToType(data['success'], 'Boolean');
      }
    }
    return obj;
  }

  /**
   * @member {module:model/PostTrackingRemindersDataResponse} data
   */
  exports.prototype['data'] = undefined;
  /**
   * Message
   * @member {String} message
   */
  exports.prototype['message'] = undefined;
  /**
   * Status code
   * @member {Number} status
   */
  exports.prototype['status'] = undefined;
  /**
   * @member {Boolean} success
   */
  exports.prototype['success'] = undefined;



  return exports;
}));



},{"../ApiClient":9,"./PostTrackingRemindersDataResponse":52}],54:[function(require,module,exports){
/**
 * quantimodo
 * We make it easy to retrieve and analyze normalized user data from a wide array of devices and applications. Check out our [docs and sdk's](https://github.com/QuantiModo/docs) or [contact us](https://help.quantimo.do).
 *
 * OpenAPI spec version: 5.8.112511
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.3.1
 *
 * Do not edit the class manually.
 *
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
    if (!root.Quantimodo) {
      root.Quantimodo = {};
    }
    root.Quantimodo.PostUserSettingsDataResponse = factory(root.Quantimodo.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The PostUserSettingsDataResponse model module.
   * @module model/PostUserSettingsDataResponse
   * @version 5.8.112511
   */

  /**
   * Constructs a new <code>PostUserSettingsDataResponse</code>.
   * @alias module:model/PostUserSettingsDataResponse
   * @class
   */
  var exports = function() {
    var _this = this;


  };

  /**
   * Constructs a <code>PostUserSettingsDataResponse</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/PostUserSettingsDataResponse} obj Optional instance to populate.
   * @return {module:model/PostUserSettingsDataResponse} The populated <code>PostUserSettingsDataResponse</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('purchaseId')) {
        obj['purchaseId'] = ApiClient.convertToType(data['purchaseId'], 'Number');
      }
    }
    return obj;
  }

  /**
   * Example: 1
   * @member {Number} purchaseId
   */
  exports.prototype['purchaseId'] = undefined;



  return exports;
}));



},{"../ApiClient":9}],55:[function(require,module,exports){
/**
 * quantimodo
 * We make it easy to retrieve and analyze normalized user data from a wide array of devices and applications. Check out our [docs and sdk's](https://github.com/QuantiModo/docs) or [contact us](https://help.quantimo.do).
 *
 * OpenAPI spec version: 5.8.112511
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.3.1
 *
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/PostUserSettingsDataResponse'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./PostUserSettingsDataResponse'));
  } else {
    // Browser globals (root is window)
    if (!root.Quantimodo) {
      root.Quantimodo = {};
    }
    root.Quantimodo.PostUserSettingsResponse = factory(root.Quantimodo.ApiClient, root.Quantimodo.PostUserSettingsDataResponse);
  }
}(this, function(ApiClient, PostUserSettingsDataResponse) {
  'use strict';




  /**
   * The PostUserSettingsResponse model module.
   * @module model/PostUserSettingsResponse
   * @version 5.8.112511
   */

  /**
   * Constructs a new <code>PostUserSettingsResponse</code>.
   * @alias module:model/PostUserSettingsResponse
   * @class
   * @param status {Number} Status code
   * @param success {Boolean} 
   */
  var exports = function(status, success) {
    var _this = this;



    _this['status'] = status;
    _this['success'] = success;
  };

  /**
   * Constructs a <code>PostUserSettingsResponse</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/PostUserSettingsResponse} obj Optional instance to populate.
   * @return {module:model/PostUserSettingsResponse} The populated <code>PostUserSettingsResponse</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('data')) {
        obj['data'] = PostUserSettingsDataResponse.constructFromObject(data['data']);
      }
      if (data.hasOwnProperty('message')) {
        obj['message'] = ApiClient.convertToType(data['message'], 'String');
      }
      if (data.hasOwnProperty('status')) {
        obj['status'] = ApiClient.convertToType(data['status'], 'Number');
      }
      if (data.hasOwnProperty('success')) {
        obj['success'] = ApiClient.convertToType(data['success'], 'Boolean');
      }
    }
    return obj;
  }

  /**
   * @member {module:model/PostUserSettingsDataResponse} data
   */
  exports.prototype['data'] = undefined;
  /**
   * Message
   * @member {String} message
   */
  exports.prototype['message'] = undefined;
  /**
   * Status code
   * @member {Number} status
   */
  exports.prototype['status'] = undefined;
  /**
   * @member {Boolean} success
   */
  exports.prototype['success'] = undefined;



  return exports;
}));



},{"../ApiClient":9,"./PostUserSettingsDataResponse":54}],56:[function(require,module,exports){
/**
 * quantimodo
 * We make it easy to retrieve and analyze normalized user data from a wide array of devices and applications. Check out our [docs and sdk's](https://github.com/QuantiModo/docs) or [contact us](https://help.quantimo.do).
 *
 * OpenAPI spec version: 5.8.112511
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.3.1
 *
 * Do not edit the class manually.
 *
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
    if (!root.Quantimodo) {
      root.Quantimodo = {};
    }
    root.Quantimodo.Scope = factory(root.Quantimodo.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The Scope model module.
   * @module model/Scope
   * @version 5.8.112511
   */

  /**
   * Constructs a new <code>Scope</code>.
   * @alias module:model/Scope
   * @class
   */
  var exports = function() {
    var _this = this;


  };

  /**
   * Constructs a <code>Scope</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/Scope} obj Optional instance to populate.
   * @return {module:model/Scope} The populated <code>Scope</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('scalar')) {
        obj['scalar'] = ApiClient.convertToType(data['scalar'], 'String');
      }
    }
    return obj;
  }

  /**
   * Example: user_likes
   * @member {String} scalar
   */
  exports.prototype['scalar'] = undefined;



  return exports;
}));



},{"../ApiClient":9}],57:[function(require,module,exports){
/**
 * quantimodo
 * We make it easy to retrieve and analyze normalized user data from a wide array of devices and applications. Check out our [docs and sdk's](https://github.com/QuantiModo/docs) or [contact us](https://help.quantimo.do).
 *
 * OpenAPI spec version: 5.8.112511
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.3.1
 *
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/Chart', 'model/Correlation', 'model/ParticipantInstruction', 'model/StudyCharts', 'model/StudyHtml', 'model/StudyImages', 'model/StudyLinks', 'model/StudyText', 'model/Variable'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./Chart'), require('./Correlation'), require('./ParticipantInstruction'), require('./StudyCharts'), require('./StudyHtml'), require('./StudyImages'), require('./StudyLinks'), require('./StudyText'), require('./Variable'));
  } else {
    // Browser globals (root is window)
    if (!root.Quantimodo) {
      root.Quantimodo = {};
    }
    root.Quantimodo.Study = factory(root.Quantimodo.ApiClient, root.Quantimodo.Chart, root.Quantimodo.Correlation, root.Quantimodo.ParticipantInstruction, root.Quantimodo.StudyCharts, root.Quantimodo.StudyHtml, root.Quantimodo.StudyImages, root.Quantimodo.StudyLinks, root.Quantimodo.StudyText, root.Quantimodo.Variable);
  }
}(this, function(ApiClient, Chart, Correlation, ParticipantInstruction, StudyCharts, StudyHtml, StudyImages, StudyLinks, StudyText, Variable) {
  'use strict';




  /**
   * The Study model module.
   * @module model/Study
   * @version 5.8.112511
   */

  /**
   * Constructs a new <code>Study</code>.
   * @alias module:model/Study
   * @class
   * @param type {String} Example: population
   */
  var exports = function(type) {
    var _this = this;











    _this['type'] = type;

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

      if (data.hasOwnProperty('causeVariable')) {
        obj['causeVariable'] = Variable.constructFromObject(data['causeVariable']);
      }
      if (data.hasOwnProperty('charts')) {
        obj['charts'] = ApiClient.convertToType(data['charts'], [Chart]);
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
      if (data.hasOwnProperty('type')) {
        obj['type'] = ApiClient.convertToType(data['type'], 'String');
      }
      if (data.hasOwnProperty('userId')) {
        obj['userId'] = ApiClient.convertToType(data['userId'], 'String');
      }
    }
    return obj;
  }

  /**
   * @member {module:model/Variable} causeVariable
   */
  exports.prototype['causeVariable'] = undefined;
  /**
   * @member {Array.<module:model/Chart>} charts
   */
  exports.prototype['charts'] = undefined;
  /**
   * @member {module:model/StudyCharts} studyCharts
   */
  exports.prototype['studyCharts'] = undefined;
  /**
   * @member {module:model/Variable} effectVariable
   */
  exports.prototype['effectVariable'] = undefined;
  /**
   * @member {module:model/ParticipantInstruction} participantInstructions
   */
  exports.prototype['participantInstructions'] = undefined;
  /**
   * @member {module:model/Correlation} statistics
   */
  exports.prototype['statistics'] = undefined;
  /**
   * @member {module:model/StudyHtml} studyHtml
   */
  exports.prototype['studyHtml'] = undefined;
  /**
   * @member {module:model/StudyImages} studyImages
   */
  exports.prototype['studyImages'] = undefined;
  /**
   * @member {module:model/StudyLinks} studyLinks
   */
  exports.prototype['studyLinks'] = undefined;
  /**
   * @member {module:model/StudyText} studyText
   */
  exports.prototype['studyText'] = undefined;
  /**
   * Example: population
   * @member {String} type
   */
  exports.prototype['type'] = undefined;
  /**
   * The user id if an individual study
   * @member {String} userId
   */
  exports.prototype['userId'] = undefined;



  return exports;
}));



},{"../ApiClient":9,"./Chart":25,"./Correlation":30,"./ParticipantInstruction":47,"./StudyCharts":58,"./StudyHtml":59,"./StudyImages":60,"./StudyLinks":61,"./StudyText":62,"./Variable":74}],58:[function(require,module,exports){
/**
 * quantimodo
 * We make it easy to retrieve and analyze normalized user data from a wide array of devices and applications. Check out our [docs and sdk's](https://github.com/QuantiModo/docs) or [contact us](https://help.quantimo.do).
 *
 * OpenAPI spec version: 5.8.112511
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.3.1
 *
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/Chart'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./Chart'));
  } else {
    // Browser globals (root is window)
    if (!root.Quantimodo) {
      root.Quantimodo = {};
    }
    root.Quantimodo.StudyCharts = factory(root.Quantimodo.ApiClient, root.Quantimodo.Chart);
  }
}(this, function(ApiClient, Chart) {
  'use strict';




  /**
   * The StudyCharts model module.
   * @module model/StudyCharts
   * @version 5.8.112511
   */

  /**
   * Constructs a new <code>StudyCharts</code>.
   * An object with various chart properties each property contain and svg and Highcharts configuration
   * @alias module:model/StudyCharts
   * @class
   */
  var exports = function() {
    var _this = this;






  };

  /**
   * Constructs a <code>StudyCharts</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/StudyCharts} obj Optional instance to populate.
   * @return {module:model/StudyCharts} The populated <code>StudyCharts</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('populationTraitScatterPlot')) {
        obj['populationTraitScatterPlot'] = Chart.constructFromObject(data['populationTraitScatterPlot']);
      }
      if (data.hasOwnProperty('outcomeDistributionColumnChart')) {
        obj['outcomeDistributionColumnChart'] = Chart.constructFromObject(data['outcomeDistributionColumnChart']);
      }
      if (data.hasOwnProperty('predictorDistributionColumnChart')) {
        obj['predictorDistributionColumnChart'] = Chart.constructFromObject(data['predictorDistributionColumnChart']);
      }
      if (data.hasOwnProperty('correlationScatterPlot')) {
        obj['correlationScatterPlot'] = Chart.constructFromObject(data['correlationScatterPlot']);
      }
      if (data.hasOwnProperty('pairsOverTimeLineChart')) {
        obj['pairsOverTimeLineChart'] = Chart.constructFromObject(data['pairsOverTimeLineChart']);
      }
    }
    return obj;
  }

  /**
   * @member {module:model/Chart} populationTraitScatterPlot
   */
  exports.prototype['populationTraitScatterPlot'] = undefined;
  /**
   * @member {module:model/Chart} outcomeDistributionColumnChart
   */
  exports.prototype['outcomeDistributionColumnChart'] = undefined;
  /**
   * @member {module:model/Chart} predictorDistributionColumnChart
   */
  exports.prototype['predictorDistributionColumnChart'] = undefined;
  /**
   * @member {module:model/Chart} correlationScatterPlot
   */
  exports.prototype['correlationScatterPlot'] = undefined;
  /**
   * @member {module:model/Chart} pairsOverTimeLineChart
   */
  exports.prototype['pairsOverTimeLineChart'] = undefined;



  return exports;
}));



},{"../ApiClient":9,"./Chart":25}],59:[function(require,module,exports){
/**
 * quantimodo
 * We make it easy to retrieve and analyze normalized user data from a wide array of devices and applications. Check out our [docs and sdk's](https://github.com/QuantiModo/docs) or [contact us](https://help.quantimo.do).
 *
 * OpenAPI spec version: 5.8.112511
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.3.1
 *
 * Do not edit the class manually.
 *
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
    if (!root.Quantimodo) {
      root.Quantimodo = {};
    }
    root.Quantimodo.StudyHtml = factory(root.Quantimodo.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The StudyHtml model module.
   * @module model/StudyHtml
   * @version 5.8.112511
   */

  /**
   * Constructs a new <code>StudyHtml</code>.
   * @alias module:model/StudyHtml
   * @class
   * @param chartHtml {String} Embeddable chart html
   * @param fullStudyHtml {String} Embeddable study text html including charts.  Modifiable css classes are study-title, study-section-header, study-section-body
   */
  var exports = function(chartHtml, fullStudyHtml) {
    var _this = this;

    _this['chartHtml'] = chartHtml;


    _this['fullStudyHtml'] = fullStudyHtml;









  };

  /**
   * Constructs a <code>StudyHtml</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/StudyHtml} obj Optional instance to populate.
   * @return {module:model/StudyHtml} The populated <code>StudyHtml</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('chartHtml')) {
        obj['chartHtml'] = ApiClient.convertToType(data['chartHtml'], 'String');
      }
      if (data.hasOwnProperty('downloadButtonsHtml')) {
        obj['downloadButtonsHtml'] = ApiClient.convertToType(data['downloadButtonsHtml'], 'String');
      }
      if (data.hasOwnProperty('fullPageWithHead')) {
        obj['fullPageWithHead'] = ApiClient.convertToType(data['fullPageWithHead'], 'String');
      }
      if (data.hasOwnProperty('fullStudyHtml')) {
        obj['fullStudyHtml'] = ApiClient.convertToType(data['fullStudyHtml'], 'String');
      }
      if (data.hasOwnProperty('fullStudyHtmlWithCssStyles')) {
        obj['fullStudyHtmlWithCssStyles'] = ApiClient.convertToType(data['fullStudyHtmlWithCssStyles'], 'String');
      }
      if (data.hasOwnProperty('statisticsTableHtml')) {
        obj['statisticsTableHtml'] = ApiClient.convertToType(data['statisticsTableHtml'], 'String');
      }
      if (data.hasOwnProperty('studyAbstractHtml')) {
        obj['studyAbstractHtml'] = ApiClient.convertToType(data['studyAbstractHtml'], 'String');
      }
      if (data.hasOwnProperty('studyHeaderHtml')) {
        obj['studyHeaderHtml'] = ApiClient.convertToType(data['studyHeaderHtml'], 'String');
      }
      if (data.hasOwnProperty('studyImageHtml')) {
        obj['studyImageHtml'] = ApiClient.convertToType(data['studyImageHtml'], 'String');
      }
      if (data.hasOwnProperty('studyMetaHtml')) {
        obj['studyMetaHtml'] = ApiClient.convertToType(data['studyMetaHtml'], 'String');
      }
      if (data.hasOwnProperty('studyTextHtml')) {
        obj['studyTextHtml'] = ApiClient.convertToType(data['studyTextHtml'], 'String');
      }
      if (data.hasOwnProperty('socialSharingButtonHtml')) {
        obj['socialSharingButtonHtml'] = ApiClient.convertToType(data['socialSharingButtonHtml'], 'String');
      }
      if (data.hasOwnProperty('studySummaryBoxHtml')) {
        obj['studySummaryBoxHtml'] = ApiClient.convertToType(data['studySummaryBoxHtml'], 'String');
      }
    }
    return obj;
  }

  /**
   * Embeddable chart html
   * @member {String} chartHtml
   */
  exports.prototype['chartHtml'] = undefined;
  /**
   * Play Store, App Store, Chrome Web Store
   * @member {String} downloadButtonsHtml
   */
  exports.prototype['downloadButtonsHtml'] = undefined;
  /**
   * Embeddable study including HTML head section charts.  Modifiable css classes are study-title, study-section-header, study-section-body
   * @member {String} fullPageWithHead
   */
  exports.prototype['fullPageWithHead'] = undefined;
  /**
   * Embeddable study text html including charts.  Modifiable css classes are study-title, study-section-header, study-section-body
   * @member {String} fullStudyHtml
   */
  exports.prototype['fullStudyHtml'] = undefined;
  /**
   * Embeddable study html including charts and css styling
   * @member {String} fullStudyHtmlWithCssStyles
   */
  exports.prototype['fullStudyHtmlWithCssStyles'] = undefined;
  /**
   * Embeddable table with statistics
   * @member {String} statisticsTableHtml
   */
  exports.prototype['statisticsTableHtml'] = undefined;
  /**
   * Text summary
   * @member {String} studyAbstractHtml
   */
  exports.prototype['studyAbstractHtml'] = undefined;
  /**
   * Title, study image, abstract with CSS styling
   * @member {String} studyHeaderHtml
   */
  exports.prototype['studyHeaderHtml'] = undefined;
  /**
   * PNG image
   * @member {String} studyImageHtml
   */
  exports.prototype['studyImageHtml'] = undefined;
  /**
   * Facebook, Twitter, Google+
   * @member {String} studyMetaHtml
   */
  exports.prototype['studyMetaHtml'] = undefined;
  /**
   * Formatted study text sections
   * @member {String} studyTextHtml
   */
  exports.prototype['studyTextHtml'] = undefined;
  /**
   * 
   * @member {String} socialSharingButtonHtml
   */
  exports.prototype['socialSharingButtonHtml'] = undefined;
  /**
   * 
   * @member {String} studySummaryBoxHtml
   */
  exports.prototype['studySummaryBoxHtml'] = undefined;



  return exports;
}));



},{"../ApiClient":9}],60:[function(require,module,exports){
/**
 * quantimodo
 * We make it easy to retrieve and analyze normalized user data from a wide array of devices and applications. Check out our [docs and sdk's](https://github.com/QuantiModo/docs) or [contact us](https://help.quantimo.do).
 *
 * OpenAPI spec version: 5.8.112511
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.3.1
 *
 * Do not edit the class manually.
 *
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
    if (!root.Quantimodo) {
      root.Quantimodo = {};
    }
    root.Quantimodo.StudyImages = factory(root.Quantimodo.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The StudyImages model module.
   * @module model/StudyImages
   * @version 5.8.112511
   */

  /**
   * Constructs a new <code>StudyImages</code>.
   * @alias module:model/StudyImages
   * @class
   * @param gaugeImage {String} Example: https://s3.amazonaws.com/quantimodo-docs/images/gauge-moderately-positive-relationship.png
   * @param gaugeImageSquare {String} Example: https://s3.amazonaws.com/quantimodo-docs/images/gauge-moderately-positive-relationship-200-200.png
   * @param imageUrl {String} Example: https://s3-us-west-1.amazonaws.com/qmimages/variable_categories_gauges_logo_background/gauge-moderately-positive-relationship_sleep_emotions_logo_background.png
   */
  var exports = function(gaugeImage, gaugeImageSquare, imageUrl) {
    var _this = this;





    _this['gaugeImage'] = gaugeImage;
    _this['gaugeImageSquare'] = gaugeImageSquare;

    _this['imageUrl'] = imageUrl;

  };

  /**
   * Constructs a <code>StudyImages</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/StudyImages} obj Optional instance to populate.
   * @return {module:model/StudyImages} The populated <code>StudyImages</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('causeVariableImageUrl')) {
        obj['causeVariableImageUrl'] = ApiClient.convertToType(data['causeVariableImageUrl'], 'String');
      }
      if (data.hasOwnProperty('causeVariableIonIcon')) {
        obj['causeVariableIonIcon'] = ApiClient.convertToType(data['causeVariableIonIcon'], 'String');
      }
      if (data.hasOwnProperty('effectVariableImageUrl')) {
        obj['effectVariableImageUrl'] = ApiClient.convertToType(data['effectVariableImageUrl'], 'String');
      }
      if (data.hasOwnProperty('effectVariableIonIcon')) {
        obj['effectVariableIonIcon'] = ApiClient.convertToType(data['effectVariableIonIcon'], 'String');
      }
      if (data.hasOwnProperty('gaugeImage')) {
        obj['gaugeImage'] = ApiClient.convertToType(data['gaugeImage'], 'String');
      }
      if (data.hasOwnProperty('gaugeImageSquare')) {
        obj['gaugeImageSquare'] = ApiClient.convertToType(data['gaugeImageSquare'], 'String');
      }
      if (data.hasOwnProperty('gaugeSharingImageUrl')) {
        obj['gaugeSharingImageUrl'] = ApiClient.convertToType(data['gaugeSharingImageUrl'], 'String');
      }
      if (data.hasOwnProperty('imageUrl')) {
        obj['imageUrl'] = ApiClient.convertToType(data['imageUrl'], 'String');
      }
      if (data.hasOwnProperty('robotSharingImageUrl')) {
        obj['robotSharingImageUrl'] = ApiClient.convertToType(data['robotSharingImageUrl'], 'String');
      }
    }
    return obj;
  }

  /**
   * Example: https://maxcdn.icons8.com/Color/PNG/96/Household/sleeping_in_bed-96.png
   * @member {String} causeVariableImageUrl
   */
  exports.prototype['causeVariableImageUrl'] = undefined;
  /**
   * Example: ion-ios-cloudy-night-outline
   * @member {String} causeVariableIonIcon
   */
  exports.prototype['causeVariableIonIcon'] = undefined;
  /**
   * Example: https://maxcdn.icons8.com/Color/PNG/96/Cinema/theatre_mask-96.png
   * @member {String} effectVariableImageUrl
   */
  exports.prototype['effectVariableImageUrl'] = undefined;
  /**
   * Example: ion-happy-outline
   * @member {String} effectVariableIonIcon
   */
  exports.prototype['effectVariableIonIcon'] = undefined;
  /**
   * Example: https://s3.amazonaws.com/quantimodo-docs/images/gauge-moderately-positive-relationship.png
   * @member {String} gaugeImage
   */
  exports.prototype['gaugeImage'] = undefined;
  /**
   * Example: https://s3.amazonaws.com/quantimodo-docs/images/gauge-moderately-positive-relationship-200-200.png
   * @member {String} gaugeImageSquare
   */
  exports.prototype['gaugeImageSquare'] = undefined;
  /**
   * Image with gauge and category images
   * @member {String} gaugeSharingImageUrl
   */
  exports.prototype['gaugeSharingImageUrl'] = undefined;
  /**
   * Example: https://s3-us-west-1.amazonaws.com/qmimages/variable_categories_gauges_logo_background/gauge-moderately-positive-relationship_sleep_emotions_logo_background.png
   * @member {String} imageUrl
   */
  exports.prototype['imageUrl'] = undefined;
  /**
   * Image with robot and category images
   * @member {String} robotSharingImageUrl
   */
  exports.prototype['robotSharingImageUrl'] = undefined;



  return exports;
}));



},{"../ApiClient":9}],61:[function(require,module,exports){
/**
 * quantimodo
 * We make it easy to retrieve and analyze normalized user data from a wide array of devices and applications. Check out our [docs and sdk's](https://github.com/QuantiModo/docs) or [contact us](https://help.quantimo.do).
 *
 * OpenAPI spec version: 5.8.112511
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.3.1
 *
 * Do not edit the class manually.
 *
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
    if (!root.Quantimodo) {
      root.Quantimodo = {};
    }
    root.Quantimodo.StudyLinks = factory(root.Quantimodo.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The StudyLinks model module.
   * @module model/StudyLinks
   * @version 5.8.112511
   */

  /**
   * Constructs a new <code>StudyLinks</code>.
   * @alias module:model/StudyLinks
   * @class
   * @param studyLinkEmail {String} Example: mailto:?subject=N1%20Study%3A%20Sleep%20Quality%20Predicts%20Higher%20Overall%20Mood&body=Check%20out%20my%20study%20at%20https%3A%2F%2Flocal.quantimo.do%2Fapi%2Fv2%2Fstudy%3FcauseVariableName%3DSleep%2520Quality%26effectVariableName%3DOverall%2520Mood%26userId%3D230%0A%0AHave%20a%20great%20day!
   * @param studyLinkFacebook {String} Example: https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Flocal.quantimo.do%2Fapi%2Fv2%2Fstudy%3FcauseVariableName%3DSleep%2520Quality%26effectVariableName%3DOverall%2520Mood%26userId%3D230
   * @param studyLinkGoogle {String} Example: https://plus.google.com/share?url=https%3A%2F%2Flocal.quantimo.do%2Fapi%2Fv2%2Fstudy%3FcauseVariableName%3DSleep%2520Quality%26effectVariableName%3DOverall%2520Mood%26userId%3D230
   * @param studyLinkStatic {String} Example: https://local.quantimo.do/api/v2/study?causeVariableName=Sleep%20Quality&effectVariableName=Overall%20Mood&userId=230
   * @param studyLinkDynamic {String} Example: https://local.quantimo.do/ionic/Modo/www/index.html#/app/study?causeVariableName=Sleep%20Quality&effectVariableName=Overall%20Mood&userId=230
   * @param studyLinkTwitter {String} Example: https://twitter.com/home?status=Sleep%20Quality%20Predicts%20Higher%20Overall%20Mood%20https%3A%2F%2Flocal.quantimo.do%2Fapi%2Fv2%2Fstudy%3FcauseVariableName%3DSleep%2520Quality%26effectVariableName%3DOverall%2520Mood%26userId%3D230%20%40quantimodo
   */
  var exports = function(studyLinkEmail, studyLinkFacebook, studyLinkGoogle, studyLinkStatic, studyLinkDynamic, studyLinkTwitter) {
    var _this = this;

    _this['studyLinkEmail'] = studyLinkEmail;
    _this['studyLinkFacebook'] = studyLinkFacebook;
    _this['studyLinkGoogle'] = studyLinkGoogle;
    _this['studyLinkStatic'] = studyLinkStatic;
    _this['studyLinkDynamic'] = studyLinkDynamic;
    _this['studyLinkTwitter'] = studyLinkTwitter;
  };

  /**
   * Constructs a <code>StudyLinks</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/StudyLinks} obj Optional instance to populate.
   * @return {module:model/StudyLinks} The populated <code>StudyLinks</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('studyLinkEmail')) {
        obj['studyLinkEmail'] = ApiClient.convertToType(data['studyLinkEmail'], 'String');
      }
      if (data.hasOwnProperty('studyLinkFacebook')) {
        obj['studyLinkFacebook'] = ApiClient.convertToType(data['studyLinkFacebook'], 'String');
      }
      if (data.hasOwnProperty('studyLinkGoogle')) {
        obj['studyLinkGoogle'] = ApiClient.convertToType(data['studyLinkGoogle'], 'String');
      }
      if (data.hasOwnProperty('studyLinkStatic')) {
        obj['studyLinkStatic'] = ApiClient.convertToType(data['studyLinkStatic'], 'String');
      }
      if (data.hasOwnProperty('studyLinkDynamic')) {
        obj['studyLinkDynamic'] = ApiClient.convertToType(data['studyLinkDynamic'], 'String');
      }
      if (data.hasOwnProperty('studyLinkTwitter')) {
        obj['studyLinkTwitter'] = ApiClient.convertToType(data['studyLinkTwitter'], 'String');
      }
    }
    return obj;
  }

  /**
   * Example: mailto:?subject=N1%20Study%3A%20Sleep%20Quality%20Predicts%20Higher%20Overall%20Mood&body=Check%20out%20my%20study%20at%20https%3A%2F%2Flocal.quantimo.do%2Fapi%2Fv2%2Fstudy%3FcauseVariableName%3DSleep%2520Quality%26effectVariableName%3DOverall%2520Mood%26userId%3D230%0A%0AHave%20a%20great%20day!
   * @member {String} studyLinkEmail
   */
  exports.prototype['studyLinkEmail'] = undefined;
  /**
   * Example: https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Flocal.quantimo.do%2Fapi%2Fv2%2Fstudy%3FcauseVariableName%3DSleep%2520Quality%26effectVariableName%3DOverall%2520Mood%26userId%3D230
   * @member {String} studyLinkFacebook
   */
  exports.prototype['studyLinkFacebook'] = undefined;
  /**
   * Example: https://plus.google.com/share?url=https%3A%2F%2Flocal.quantimo.do%2Fapi%2Fv2%2Fstudy%3FcauseVariableName%3DSleep%2520Quality%26effectVariableName%3DOverall%2520Mood%26userId%3D230
   * @member {String} studyLinkGoogle
   */
  exports.prototype['studyLinkGoogle'] = undefined;
  /**
   * Example: https://local.quantimo.do/api/v2/study?causeVariableName=Sleep%20Quality&effectVariableName=Overall%20Mood&userId=230
   * @member {String} studyLinkStatic
   */
  exports.prototype['studyLinkStatic'] = undefined;
  /**
   * Example: https://local.quantimo.do/ionic/Modo/www/index.html#/app/study?causeVariableName=Sleep%20Quality&effectVariableName=Overall%20Mood&userId=230
   * @member {String} studyLinkDynamic
   */
  exports.prototype['studyLinkDynamic'] = undefined;
  /**
   * Example: https://twitter.com/home?status=Sleep%20Quality%20Predicts%20Higher%20Overall%20Mood%20https%3A%2F%2Flocal.quantimo.do%2Fapi%2Fv2%2Fstudy%3FcauseVariableName%3DSleep%2520Quality%26effectVariableName%3DOverall%2520Mood%26userId%3D230%20%40quantimodo
   * @member {String} studyLinkTwitter
   */
  exports.prototype['studyLinkTwitter'] = undefined;



  return exports;
}));



},{"../ApiClient":9}],62:[function(require,module,exports){
/**
 * quantimodo
 * We make it easy to retrieve and analyze normalized user data from a wide array of devices and applications. Check out our [docs and sdk's](https://github.com/QuantiModo/docs) or [contact us](https://help.quantimo.do).
 *
 * OpenAPI spec version: 5.8.112511
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.3.1
 *
 * Do not edit the class manually.
 *
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
    if (!root.Quantimodo) {
      root.Quantimodo = {};
    }
    root.Quantimodo.StudyText = factory(root.Quantimodo.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The StudyText model module.
   * @module model/StudyText
   * @version 5.8.112511
   */

  /**
   * Constructs a new <code>StudyText</code>.
   * @alias module:model/StudyText
   * @class
   * @param studyAbstract {String} Example: Aggregated data from 21 suggests with a low degree of confidence (p=0.097) that Very Distracting Time (Work) has a moderately positive predictive relationship (R=0.354) with Video Activities  (Activity).  The highest quartile of Video Activities measurements were observed following an average 2.03h Very Distracting Timeper day.  The lowest quartile of Video Activities  measurements were observed following an average 1.04h Very Distracting Timeper day.
   * @param studyDesign {String} Example: This study is based on data donated by  21 QuantiModo users. Thus, the study design is equivalent to the aggregation of 21 separate n=1 observational natural experiments.
   * @param studyLimitations {String} Example: As with any human experiment, it was impossible to control for all potentially confounding variables.             Correlation does not necessarily imply correlation.  We can never know for sure if one factor is definitely the cause of an outcome.             However, lack of correlation definitely implies the lack of a causal relationship.  Hence, we can with great             confidence rule out non-existent relationships. For instance, if we discover no relationship between mood             and an antidepressant this information is just as or even more valuable than the discovery that there is a relationship.             <br>             <br>             We can also take advantage of several characteristics of time series data from many subjects  to infer the likelihood of a causal relationship if we do find a correlational relationship.             The criteria for causation are a group of minimal conditions necessary to provide adequate evidence of a causal relationship between an incidence and a possible consequence.             The list of the criteria is as follows:             <br>             1. Strength (effect size): A small association does not mean that there is not a causal effect, though the larger the association, the more likely that it is causal.             <br>             2. Consistency (reproducibility): Consistent findings observed by different persons in different places with different samples strengthens the likelihood of an effect.             <br>             3. Specificity: Causation is likely if a very specific population at a specific site and disease with no other likely explanation. The more specific an association between a factor and an effect is, the bigger the probability of a causal relationship.             <br>             4. Temporality: The effect has to occur after the cause (and if there is an expected delay between the cause and expected effect, then the effect must occur after that delay).             <br>             5. Biological gradient: Greater exposure should generally lead to greater incidence of the effect. However, in some cases, the mere presence of the factor can trigger the effect. In other cases, an inverse proportion is observed: greater exposure leads to lower incidence.             <br>             6. Plausibility: A plausible mechanism between cause and effect is helpful.             <br>             7. Coherence: Coherence between epidemiological and laboratory findings increases the likelihood of an effect.             <br>             8. Experiment: \"Occasionally it is possible to appeal to experimental evidence\".             <br>             9. Analogy: The effect of similar factors may be considered.             <br>             <br>              The confidence in a causal relationship is bolstered by the fact that time-precedence was taken into account in all calculations. Furthermore, in accordance with the law of large numbers (LLN), the predictive power and accuracy of these results will continually grow over time.  146 paired data points were used in this analysis.   Assuming that the relationship is merely coincidental, as the participant independently modifies their Very Distracting Time values, the observed strength of the relationship will decline until it is below the threshold of significance.  To it another way, in the case that we do find a spurious correlation, suggesting that banana intake improves mood for instance,             one will likely increase their banana intake.  Due to the fact that this correlation is spurious, it is unlikely             that you will see a continued and persistent corresponding increase in mood.  So over time, the spurious correlation will             naturally dissipate.Furthermore, it will be very enlightening to aggregate this data with the data from other participants  with similar genetic, diseasomic, environmentomic, and demographic profiles.
   * @param studyObjective {String} Example: The objective of this study is to determine the nature of the relationship (if any) between the Very Distracting Time and the Video Activities. Additionally, we attempt to determine the Very Distracting Time values most likely to produce optimal Video Activities values.
   * @param studyResults {String} Example: This analysis suggests that higher Very Distracting Time (Work) generally predicts negative Video Activities (p = 0.097). Video Activities is, on average, 36%  higher after around 2.03 Very Distracting Time.  After an onset delay of 168 hours, Video Activities is, on average, 16%  lower than its average over the 168 hours following around 1.04 Very Distracting Time.  146 data points were used in this analysis.  The value for Very Distracting Time changed 2984 times, effectively running 1492 separate natural experiments. The top quartile outcome values are preceded by an average 2.03 h of Very Distracting Time.  The bottom quartile outcome values are preceded by an average 1.04 h of Very Distracting Time.  Forward Pearson Correlation Coefficient was 0.354 (p=0.097, 95% CI -0.437 to 1.144 onset delay = 0 hours, duration of action = 168 hours) .  The Reverse Pearson Correlation Coefficient was 0.208 (P=0.097, 95% CI -0.583 to 0.998, onset delay = -0 hours, duration of action = -168 hours). When the Very Distracting Time value is closer to 2.03 h than 1.04 h, the Video Activities value which follows is, on average, 36% percent higher than its typical value.  When the Very Distracting Time value is closer to 1.04 h than 2.03 h, the Video Activities value which follows is 0% lower than its typical value.  Video Activities is 5 h (67% higher) on average after days with around 5 h Very Distracting Time
   * @param studyTitle {String} Example: N1 Study: Very Distracting Time Predicts Negative Video Activities
   */
  var exports = function(studyAbstract, studyDesign, studyLimitations, studyObjective, studyResults, studyTitle) {
    var _this = this;















    _this['studyAbstract'] = studyAbstract;
    _this['studyDesign'] = studyDesign;
    _this['studyLimitations'] = studyLimitations;
    _this['studyObjective'] = studyObjective;
    _this['studyResults'] = studyResults;
    _this['studyTitle'] = studyTitle;



  };

  /**
   * Constructs a <code>StudyText</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/StudyText} obj Optional instance to populate.
   * @return {module:model/StudyText} The populated <code>StudyText</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('averageEffectFollowingHighCauseExplanation')) {
        obj['averageEffectFollowingHighCauseExplanation'] = ApiClient.convertToType(data['averageEffectFollowingHighCauseExplanation'], 'String');
      }
      if (data.hasOwnProperty('averageEffectFollowingLowCauseExplanation')) {
        obj['averageEffectFollowingLowCauseExplanation'] = ApiClient.convertToType(data['averageEffectFollowingLowCauseExplanation'], 'String');
      }
      if (data.hasOwnProperty('valuePredictingHighOutcomeExplanation')) {
        obj['valuePredictingHighOutcomeExplanation'] = ApiClient.convertToType(data['valuePredictingHighOutcomeExplanation'], 'String');
      }
      if (data.hasOwnProperty('valuePredictingLowOutcomeExplanation')) {
        obj['valuePredictingLowOutcomeExplanation'] = ApiClient.convertToType(data['valuePredictingLowOutcomeExplanation'], 'String');
      }
      if (data.hasOwnProperty('dataAnalysis')) {
        obj['dataAnalysis'] = ApiClient.convertToType(data['dataAnalysis'], 'String');
      }
      if (data.hasOwnProperty('dataSources')) {
        obj['dataSources'] = ApiClient.convertToType(data['dataSources'], 'String');
      }
      if (data.hasOwnProperty('dataSourcesParagraphForCause')) {
        obj['dataSourcesParagraphForCause'] = ApiClient.convertToType(data['dataSourcesParagraphForCause'], 'String');
      }
      if (data.hasOwnProperty('dataSourcesParagraphForEffect')) {
        obj['dataSourcesParagraphForEffect'] = ApiClient.convertToType(data['dataSourcesParagraphForEffect'], 'String');
      }
      if (data.hasOwnProperty('lastCauseDailyValueSentenceExtended')) {
        obj['lastCauseDailyValueSentenceExtended'] = ApiClient.convertToType(data['lastCauseDailyValueSentenceExtended'], 'String');
      }
      if (data.hasOwnProperty('lastCauseAndOptimalValueSentence')) {
        obj['lastCauseAndOptimalValueSentence'] = ApiClient.convertToType(data['lastCauseAndOptimalValueSentence'], 'String');
      }
      if (data.hasOwnProperty('lastCauseDailyValueSentence')) {
        obj['lastCauseDailyValueSentence'] = ApiClient.convertToType(data['lastCauseDailyValueSentence'], 'String');
      }
      if (data.hasOwnProperty('optimalDailyValueSentence')) {
        obj['optimalDailyValueSentence'] = ApiClient.convertToType(data['optimalDailyValueSentence'], 'String');
      }
      if (data.hasOwnProperty('predictorExplanation')) {
        obj['predictorExplanation'] = ApiClient.convertToType(data['predictorExplanation'], 'String');
      }
      if (data.hasOwnProperty('significanceExplanation')) {
        obj['significanceExplanation'] = ApiClient.convertToType(data['significanceExplanation'], 'String');
      }
      if (data.hasOwnProperty('studyAbstract')) {
        obj['studyAbstract'] = ApiClient.convertToType(data['studyAbstract'], 'String');
      }
      if (data.hasOwnProperty('studyDesign')) {
        obj['studyDesign'] = ApiClient.convertToType(data['studyDesign'], 'String');
      }
      if (data.hasOwnProperty('studyLimitations')) {
        obj['studyLimitations'] = ApiClient.convertToType(data['studyLimitations'], 'String');
      }
      if (data.hasOwnProperty('studyObjective')) {
        obj['studyObjective'] = ApiClient.convertToType(data['studyObjective'], 'String');
      }
      if (data.hasOwnProperty('studyResults')) {
        obj['studyResults'] = ApiClient.convertToType(data['studyResults'], 'String');
      }
      if (data.hasOwnProperty('studyTitle')) {
        obj['studyTitle'] = ApiClient.convertToType(data['studyTitle'], 'String');
      }
      if (data.hasOwnProperty('studyInvitation')) {
        obj['studyInvitation'] = ApiClient.convertToType(data['studyInvitation'], 'String');
      }
      if (data.hasOwnProperty('studyQuestion')) {
        obj['studyQuestion'] = ApiClient.convertToType(data['studyQuestion'], 'String');
      }
      if (data.hasOwnProperty('studyBackground')) {
        obj['studyBackground'] = ApiClient.convertToType(data['studyBackground'], 'String');
      }
    }
    return obj;
  }

  /**
   * Example: Overall Mood is 3.55/5 (15% higher) on average after days with around 4.19/5 Sleep Quality
   * @member {String} averageEffectFollowingHighCauseExplanation
   */
  exports.prototype['averageEffectFollowingHighCauseExplanation'] = undefined;
  /**
   * Example: Overall Mood is 2.65/5 (14% lower) on average after days with around 1.97/5 Sleep Quality
   * @member {String} averageEffectFollowingLowCauseExplanation
   */
  exports.prototype['averageEffectFollowingLowCauseExplanation'] = undefined;
  /**
   * Example: Overall Mood, on average, 17% higher after around 4.14/5 Sleep Quality
   * @member {String} valuePredictingHighOutcomeExplanation
   */
  exports.prototype['valuePredictingHighOutcomeExplanation'] = undefined;
  /**
   * Example: Overall Mood, on average, 11% lower after around 3.03/5 Sleep Quality
   * @member {String} valuePredictingLowOutcomeExplanation
   */
  exports.prototype['valuePredictingLowOutcomeExplanation'] = undefined;
  /**
   * Example: It was assumed that 0 hours would pass before a change in Very Distracting Time would produce an observable change in Video Activities.  It was assumed that Very Distracting Time could produce an observable change in Video Activities for as much as 7 days after the stimulus event.
   * @member {String} dataAnalysis
   */
  exports.prototype['dataAnalysis'] = undefined;
  /**
   * Example: Very Distracting Time data was primarily collected using <a href=\"https://www.rescuetime.com/rp/quantimodo/plans\">RescueTime</a>. Detailed reports show which applications and websites you spent time on. Activities are automatically grouped into pre-defined categories with built-in productivity scores covering thousands of websites and applications. You can customize categories and productivity scores to meet your needs.<br>Video Activities data was primarily collected using <a href=\"https://www.rescuetime.com/rp/quantimodo/plans\">RescueTime</a>. Detailed reports show which applications and websites you spent time on. Activities are automatically grouped into pre-defined categories with built-in productivity scores covering thousands of websites and applications. You can customize categories and productivity scores to meet your needs.
   * @member {String} dataSources
   */
  exports.prototype['dataSources'] = undefined;
  /**
   * Example: Very Distracting Time data was primarily collected using <a href=\"https://www.rescuetime.com/rp/quantimodo/plans\">RescueTime</a>. Detailed reports show which applications and websites you spent time on. Activities are automatically grouped into pre-defined categories with built-in productivity scores covering thousands of websites and applications. You can customize categories and productivity scores to meet your needs.<br>Video Activities data was primarily collected using <a href=\"https://www.rescuetime.com/rp/quantimodo/plans\">RescueTime</a>. Detailed reports show which applications and websites you spent time on. Activities are automatically grouped into pre-defined categories with built-in productivity scores covering thousands of websites and applications. You can customize categories and productivity scores to meet your needs.
   * @member {String} dataSourcesParagraphForCause
   */
  exports.prototype['dataSourcesParagraphForCause'] = undefined;
  /**
   * Example: Very Distracting Time data was primarily collected using <a href=\"https://www.rescuetime.com/rp/quantimodo/plans\">RescueTime</a>. Detailed reports show which applications and websites you spent time on. Activities are automatically grouped into pre-defined categories with built-in productivity scores covering thousands of websites and applications. You can customize categories and productivity scores to meet your needs.<br>Video Activities data was primarily collected using <a href=\"https://www.rescuetime.com/rp/quantimodo/plans\">RescueTime</a>. Detailed reports show which applications and websites you spent time on. Activities are automatically grouped into pre-defined categories with built-in productivity scores covering thousands of websites and applications. You can customize categories and productivity scores to meet your needs.
   * @member {String} dataSourcesParagraphForEffect
   */
  exports.prototype['dataSourcesParagraphForEffect'] = undefined;
  /**
   * Example: Sleep Quality Predicts Higher Overall Mood
   * @member {String} lastCauseDailyValueSentenceExtended
   */
  exports.prototype['lastCauseDailyValueSentenceExtended'] = undefined;
  /**
   * Example: Sleep Quality Predicts Higher Overall Mood
   * @member {String} lastCauseAndOptimalValueSentence
   */
  exports.prototype['lastCauseAndOptimalValueSentence'] = undefined;
  /**
   * Example: Sleep Quality Predicts Higher Overall Mood
   * @member {String} lastCauseDailyValueSentence
   */
  exports.prototype['lastCauseDailyValueSentence'] = undefined;
  /**
   * Example: Sleep Quality Predicts Higher Overall Mood
   * @member {String} optimalDailyValueSentence
   */
  exports.prototype['optimalDailyValueSentence'] = undefined;
  /**
   * Example: Sleep Quality Predicts Higher Overall Mood
   * @member {String} predictorExplanation
   */
  exports.prototype['predictorExplanation'] = undefined;
  /**
   * Example: Using a two-tailed t-test with alpha = 0.05, it was determined that the change in Video Activities is statistically significant at 95% confidence interval.
   * @member {String} significanceExplanation
   */
  exports.prototype['significanceExplanation'] = undefined;
  /**
   * Example: Aggregated data from 21 suggests with a low degree of confidence (p=0.097) that Very Distracting Time (Work) has a moderately positive predictive relationship (R=0.354) with Video Activities  (Activity).  The highest quartile of Video Activities measurements were observed following an average 2.03h Very Distracting Timeper day.  The lowest quartile of Video Activities  measurements were observed following an average 1.04h Very Distracting Timeper day.
   * @member {String} studyAbstract
   */
  exports.prototype['studyAbstract'] = undefined;
  /**
   * Example: This study is based on data donated by  21 QuantiModo users. Thus, the study design is equivalent to the aggregation of 21 separate n=1 observational natural experiments.
   * @member {String} studyDesign
   */
  exports.prototype['studyDesign'] = undefined;
  /**
   * Example: As with any human experiment, it was impossible to control for all potentially confounding variables.             Correlation does not necessarily imply correlation.  We can never know for sure if one factor is definitely the cause of an outcome.             However, lack of correlation definitely implies the lack of a causal relationship.  Hence, we can with great             confidence rule out non-existent relationships. For instance, if we discover no relationship between mood             and an antidepressant this information is just as or even more valuable than the discovery that there is a relationship.             <br>             <br>             We can also take advantage of several characteristics of time series data from many subjects  to infer the likelihood of a causal relationship if we do find a correlational relationship.             The criteria for causation are a group of minimal conditions necessary to provide adequate evidence of a causal relationship between an incidence and a possible consequence.             The list of the criteria is as follows:             <br>             1. Strength (effect size): A small association does not mean that there is not a causal effect, though the larger the association, the more likely that it is causal.             <br>             2. Consistency (reproducibility): Consistent findings observed by different persons in different places with different samples strengthens the likelihood of an effect.             <br>             3. Specificity: Causation is likely if a very specific population at a specific site and disease with no other likely explanation. The more specific an association between a factor and an effect is, the bigger the probability of a causal relationship.             <br>             4. Temporality: The effect has to occur after the cause (and if there is an expected delay between the cause and expected effect, then the effect must occur after that delay).             <br>             5. Biological gradient: Greater exposure should generally lead to greater incidence of the effect. However, in some cases, the mere presence of the factor can trigger the effect. In other cases, an inverse proportion is observed: greater exposure leads to lower incidence.             <br>             6. Plausibility: A plausible mechanism between cause and effect is helpful.             <br>             7. Coherence: Coherence between epidemiological and laboratory findings increases the likelihood of an effect.             <br>             8. Experiment: \"Occasionally it is possible to appeal to experimental evidence\".             <br>             9. Analogy: The effect of similar factors may be considered.             <br>             <br>              The confidence in a causal relationship is bolstered by the fact that time-precedence was taken into account in all calculations. Furthermore, in accordance with the law of large numbers (LLN), the predictive power and accuracy of these results will continually grow over time.  146 paired data points were used in this analysis.   Assuming that the relationship is merely coincidental, as the participant independently modifies their Very Distracting Time values, the observed strength of the relationship will decline until it is below the threshold of significance.  To it another way, in the case that we do find a spurious correlation, suggesting that banana intake improves mood for instance,             one will likely increase their banana intake.  Due to the fact that this correlation is spurious, it is unlikely             that you will see a continued and persistent corresponding increase in mood.  So over time, the spurious correlation will             naturally dissipate.Furthermore, it will be very enlightening to aggregate this data with the data from other participants  with similar genetic, diseasomic, environmentomic, and demographic profiles.
   * @member {String} studyLimitations
   */
  exports.prototype['studyLimitations'] = undefined;
  /**
   * Example: The objective of this study is to determine the nature of the relationship (if any) between the Very Distracting Time and the Video Activities. Additionally, we attempt to determine the Very Distracting Time values most likely to produce optimal Video Activities values.
   * @member {String} studyObjective
   */
  exports.prototype['studyObjective'] = undefined;
  /**
   * Example: This analysis suggests that higher Very Distracting Time (Work) generally predicts negative Video Activities (p = 0.097). Video Activities is, on average, 36%  higher after around 2.03 Very Distracting Time.  After an onset delay of 168 hours, Video Activities is, on average, 16%  lower than its average over the 168 hours following around 1.04 Very Distracting Time.  146 data points were used in this analysis.  The value for Very Distracting Time changed 2984 times, effectively running 1492 separate natural experiments. The top quartile outcome values are preceded by an average 2.03 h of Very Distracting Time.  The bottom quartile outcome values are preceded by an average 1.04 h of Very Distracting Time.  Forward Pearson Correlation Coefficient was 0.354 (p=0.097, 95% CI -0.437 to 1.144 onset delay = 0 hours, duration of action = 168 hours) .  The Reverse Pearson Correlation Coefficient was 0.208 (P=0.097, 95% CI -0.583 to 0.998, onset delay = -0 hours, duration of action = -168 hours). When the Very Distracting Time value is closer to 2.03 h than 1.04 h, the Video Activities value which follows is, on average, 36% percent higher than its typical value.  When the Very Distracting Time value is closer to 1.04 h than 2.03 h, the Video Activities value which follows is 0% lower than its typical value.  Video Activities is 5 h (67% higher) on average after days with around 5 h Very Distracting Time
   * @member {String} studyResults
   */
  exports.prototype['studyResults'] = undefined;
  /**
   * Example: N1 Study: Very Distracting Time Predicts Negative Video Activities
   * @member {String} studyTitle
   */
  exports.prototype['studyTitle'] = undefined;
  /**
   * Help us determine if Remeron affects Overall Mood!
   * @member {String} studyInvitation
   */
  exports.prototype['studyInvitation'] = undefined;
  /**
   * Does Remeron affect Overall Mood?
   * @member {String} studyQuestion
   */
  exports.prototype['studyQuestion'] = undefined;
  /**
   * In order to reduce suffering through the advancement of human knowledge...
   * @member {String} studyBackground
   */
  exports.prototype['studyBackground'] = undefined;



  return exports;
}));



},{"../ApiClient":9}],63:[function(require,module,exports){
/**
 * quantimodo
 * We make it easy to retrieve and analyze normalized user data from a wide array of devices and applications. Check out our [docs and sdk's](https://github.com/QuantiModo/docs) or [contact us](https://help.quantimo.do).
 *
 * OpenAPI spec version: 5.8.112511
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.3.1
 *
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/TrackingReminderNotificationAction', 'model/Unit'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./TrackingReminderNotificationAction'), require('./Unit'));
  } else {
    // Browser globals (root is window)
    if (!root.Quantimodo) {
      root.Quantimodo = {};
    }
    root.Quantimodo.TrackingReminder = factory(root.Quantimodo.ApiClient, root.Quantimodo.TrackingReminderNotificationAction, root.Quantimodo.Unit);
  }
}(this, function(ApiClient, TrackingReminderNotificationAction, Unit) {
  'use strict';




  /**
   * The TrackingReminder model module.
   * @module model/TrackingReminder
   * @version 5.8.112511
   */

  /**
   * Constructs a new <code>TrackingReminder</code>.
   * @alias module:model/TrackingReminder
   * @class
   * @param unitAbbreviatedName {String} Example: /5
   * @param reminderFrequency {Number} Number of seconds between one reminder and the next
   * @param variableCategoryName {String} Name of the variable category to be used when sending measurements
   * @param variableName {String} Name of the variable to be used when sending measurements
   */
  var exports = function(unitAbbreviatedName, reminderFrequency, variableCategoryName, variableName) {
    var _this = this;







    _this['unitAbbreviatedName'] = unitAbbreviatedName;


































    _this['reminderFrequency'] = reminderFrequency;































    _this['variableCategoryName'] = variableCategoryName;


    _this['variableName'] = variableName;
  };

  /**
   * Constructs a <code>TrackingReminder</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/TrackingReminder} obj Optional instance to populate.
   * @return {module:model/TrackingReminder} The populated <code>TrackingReminder</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('actionArray')) {
        obj['actionArray'] = ApiClient.convertToType(data['actionArray'], [TrackingReminderNotificationAction]);
      }
      if (data.hasOwnProperty('availableUnits')) {
        obj['availableUnits'] = ApiClient.convertToType(data['availableUnits'], [Unit]);
      }
      if (data.hasOwnProperty('clientId')) {
        obj['clientId'] = ApiClient.convertToType(data['clientId'], 'String');
      }
      if (data.hasOwnProperty('combinationOperation')) {
        obj['combinationOperation'] = ApiClient.convertToType(data['combinationOperation'], 'String');
      }
      if (data.hasOwnProperty('createdAt')) {
        obj['createdAt'] = ApiClient.convertToType(data['createdAt'], 'String');
      }
      if (data.hasOwnProperty('displayName')) {
        obj['displayName'] = ApiClient.convertToType(data['displayName'], 'String');
      }
      if (data.hasOwnProperty('unitAbbreviatedName')) {
        obj['unitAbbreviatedName'] = ApiClient.convertToType(data['unitAbbreviatedName'], 'String');
      }
      if (data.hasOwnProperty('unitCategoryId')) {
        obj['unitCategoryId'] = ApiClient.convertToType(data['unitCategoryId'], 'Number');
      }
      if (data.hasOwnProperty('unitCategoryName')) {
        obj['unitCategoryName'] = ApiClient.convertToType(data['unitCategoryName'], 'String');
      }
      if (data.hasOwnProperty('unitId')) {
        obj['unitId'] = ApiClient.convertToType(data['unitId'], 'Number');
      }
      if (data.hasOwnProperty('unitName')) {
        obj['unitName'] = ApiClient.convertToType(data['unitName'], 'String');
      }
      if (data.hasOwnProperty('defaultValue')) {
        obj['defaultValue'] = ApiClient.convertToType(data['defaultValue'], 'Number');
      }
      if (data.hasOwnProperty('email')) {
        obj['email'] = ApiClient.convertToType(data['email'], 'Boolean');
      }
      if (data.hasOwnProperty('errorMessage')) {
        obj['errorMessage'] = ApiClient.convertToType(data['errorMessage'], 'String');
      }
      if (data.hasOwnProperty('fillingValue')) {
        obj['fillingValue'] = ApiClient.convertToType(data['fillingValue'], 'Number');
      }
      if (data.hasOwnProperty('firstDailyReminderTime')) {
        obj['firstDailyReminderTime'] = ApiClient.convertToType(data['firstDailyReminderTime'], 'String');
      }
      if (data.hasOwnProperty('frequencyTextDescription')) {
        obj['frequencyTextDescription'] = ApiClient.convertToType(data['frequencyTextDescription'], 'String');
      }
      if (data.hasOwnProperty('frequencyTextDescriptionWithTime')) {
        obj['frequencyTextDescriptionWithTime'] = ApiClient.convertToType(data['frequencyTextDescriptionWithTime'], 'String');
      }
      if (data.hasOwnProperty('id')) {
        obj['id'] = ApiClient.convertToType(data['id'], 'Number');
      }
      if (data.hasOwnProperty('inputType')) {
        obj['inputType'] = ApiClient.convertToType(data['inputType'], 'String');
      }
      if (data.hasOwnProperty('instructions')) {
        obj['instructions'] = ApiClient.convertToType(data['instructions'], 'String');
      }
      if (data.hasOwnProperty('ionIcon')) {
        obj['ionIcon'] = ApiClient.convertToType(data['ionIcon'], 'String');
      }
      if (data.hasOwnProperty('lastTracked')) {
        obj['lastTracked'] = ApiClient.convertToType(data['lastTracked'], 'String');
      }
      if (data.hasOwnProperty('lastValue')) {
        obj['lastValue'] = ApiClient.convertToType(data['lastValue'], 'Number');
      }
      if (data.hasOwnProperty('latestTrackingReminderNotificationReminderTime')) {
        obj['latestTrackingReminderNotificationReminderTime'] = ApiClient.convertToType(data['latestTrackingReminderNotificationReminderTime'], 'String');
      }
      if (data.hasOwnProperty('localDailyReminderNotificationTimes')) {
        obj['localDailyReminderNotificationTimes'] = ApiClient.convertToType(data['localDailyReminderNotificationTimes'], ['String']);
      }
      if (data.hasOwnProperty('localDailyReminderNotificationTimesForAllReminders')) {
        obj['localDailyReminderNotificationTimesForAllReminders'] = ApiClient.convertToType(data['localDailyReminderNotificationTimesForAllReminders'], ['String']);
      }
      if (data.hasOwnProperty('manualTracking')) {
        obj['manualTracking'] = ApiClient.convertToType(data['manualTracking'], 'Boolean');
      }
      if (data.hasOwnProperty('maximumAllowedValue')) {
        obj['maximumAllowedValue'] = ApiClient.convertToType(data['maximumAllowedValue'], 'Number');
      }
      if (data.hasOwnProperty('minimumAllowedValue')) {
        obj['minimumAllowedValue'] = ApiClient.convertToType(data['minimumAllowedValue'], 'Number');
      }
      if (data.hasOwnProperty('nextReminderTimeEpochSeconds')) {
        obj['nextReminderTimeEpochSeconds'] = ApiClient.convertToType(data['nextReminderTimeEpochSeconds'], 'Number');
      }
      if (data.hasOwnProperty('notificationBar')) {
        obj['notificationBar'] = ApiClient.convertToType(data['notificationBar'], 'Boolean');
      }
      if (data.hasOwnProperty('numberOfRawMeasurements')) {
        obj['numberOfRawMeasurements'] = ApiClient.convertToType(data['numberOfRawMeasurements'], 'Number');
      }
      if (data.hasOwnProperty('numberOfUniqueValues')) {
        obj['numberOfUniqueValues'] = ApiClient.convertToType(data['numberOfUniqueValues'], 'Number');
      }
      if (data.hasOwnProperty('outcome')) {
        obj['outcome'] = ApiClient.convertToType(data['outcome'], 'Boolean');
      }
      if (data.hasOwnProperty('pngPath')) {
        obj['pngPath'] = ApiClient.convertToType(data['pngPath'], 'String');
      }
      if (data.hasOwnProperty('pngUrl')) {
        obj['pngUrl'] = ApiClient.convertToType(data['pngUrl'], 'String');
      }
      if (data.hasOwnProperty('productUrl')) {
        obj['productUrl'] = ApiClient.convertToType(data['productUrl'], 'String');
      }
      if (data.hasOwnProperty('popUp')) {
        obj['popUp'] = ApiClient.convertToType(data['popUp'], 'Boolean');
      }
      if (data.hasOwnProperty('question')) {
        obj['question'] = ApiClient.convertToType(data['question'], 'String');
      }
      if (data.hasOwnProperty('reminderEndTime')) {
        obj['reminderEndTime'] = ApiClient.convertToType(data['reminderEndTime'], 'String');
      }
      if (data.hasOwnProperty('reminderFrequency')) {
        obj['reminderFrequency'] = ApiClient.convertToType(data['reminderFrequency'], 'Number');
      }
      if (data.hasOwnProperty('reminderSound')) {
        obj['reminderSound'] = ApiClient.convertToType(data['reminderSound'], 'String');
      }
      if (data.hasOwnProperty('reminderStartEpochSeconds')) {
        obj['reminderStartEpochSeconds'] = ApiClient.convertToType(data['reminderStartEpochSeconds'], 'Number');
      }
      if (data.hasOwnProperty('reminderStartTime')) {
        obj['reminderStartTime'] = ApiClient.convertToType(data['reminderStartTime'], 'String');
      }
      if (data.hasOwnProperty('reminderStartTimeLocal')) {
        obj['reminderStartTimeLocal'] = ApiClient.convertToType(data['reminderStartTimeLocal'], 'String');
      }
      if (data.hasOwnProperty('reminderStartTimeLocalHumanFormatted')) {
        obj['reminderStartTimeLocalHumanFormatted'] = ApiClient.convertToType(data['reminderStartTimeLocalHumanFormatted'], 'String');
      }
      if (data.hasOwnProperty('repeating')) {
        obj['repeating'] = ApiClient.convertToType(data['repeating'], 'Boolean');
      }
      if (data.hasOwnProperty('secondDailyReminderTime')) {
        obj['secondDailyReminderTime'] = ApiClient.convertToType(data['secondDailyReminderTime'], 'String');
      }
      if (data.hasOwnProperty('secondToLastValue')) {
        obj['secondToLastValue'] = ApiClient.convertToType(data['secondToLastValue'], 'Number');
      }
      if (data.hasOwnProperty('sms')) {
        obj['sms'] = ApiClient.convertToType(data['sms'], 'Boolean');
      }
      if (data.hasOwnProperty('startTrackingDate')) {
        obj['startTrackingDate'] = ApiClient.convertToType(data['startTrackingDate'], 'String');
      }
      if (data.hasOwnProperty('stopTrackingDate')) {
        obj['stopTrackingDate'] = ApiClient.convertToType(data['stopTrackingDate'], 'String');
      }
      if (data.hasOwnProperty('svgUrl')) {
        obj['svgUrl'] = ApiClient.convertToType(data['svgUrl'], 'String');
      }
      if (data.hasOwnProperty('thirdDailyReminderTime')) {
        obj['thirdDailyReminderTime'] = ApiClient.convertToType(data['thirdDailyReminderTime'], 'String');
      }
      if (data.hasOwnProperty('thirdToLastValue')) {
        obj['thirdToLastValue'] = ApiClient.convertToType(data['thirdToLastValue'], 'Number');
      }
      if (data.hasOwnProperty('trackingReminderId')) {
        obj['trackingReminderId'] = ApiClient.convertToType(data['trackingReminderId'], 'Number');
      }
      if (data.hasOwnProperty('trackingReminderImageUrl')) {
        obj['trackingReminderImageUrl'] = ApiClient.convertToType(data['trackingReminderImageUrl'], 'String');
      }
      if (data.hasOwnProperty('upc')) {
        obj['upc'] = ApiClient.convertToType(data['upc'], 'String');
      }
      if (data.hasOwnProperty('updatedAt')) {
        obj['updatedAt'] = ApiClient.convertToType(data['updatedAt'], 'String');
      }
      if (data.hasOwnProperty('userId')) {
        obj['userId'] = ApiClient.convertToType(data['userId'], 'Number');
      }
      if (data.hasOwnProperty('userVariableUnitAbbreviatedName')) {
        obj['userVariableUnitAbbreviatedName'] = ApiClient.convertToType(data['userVariableUnitAbbreviatedName'], 'String');
      }
      if (data.hasOwnProperty('userVariableUnitCategoryId')) {
        obj['userVariableUnitCategoryId'] = ApiClient.convertToType(data['userVariableUnitCategoryId'], 'Number');
      }
      if (data.hasOwnProperty('userVariableUnitCategoryName')) {
        obj['userVariableUnitCategoryName'] = ApiClient.convertToType(data['userVariableUnitCategoryName'], 'String');
      }
      if (data.hasOwnProperty('userVariableUnitId')) {
        obj['userVariableUnitId'] = ApiClient.convertToType(data['userVariableUnitId'], 'Number');
      }
      if (data.hasOwnProperty('userVariableUnitName')) {
        obj['userVariableUnitName'] = ApiClient.convertToType(data['userVariableUnitName'], 'String');
      }
      if (data.hasOwnProperty('userVariableVariableCategoryId')) {
        obj['userVariableVariableCategoryId'] = ApiClient.convertToType(data['userVariableVariableCategoryId'], 'Number');
      }
      if (data.hasOwnProperty('userVariableVariableCategoryName')) {
        obj['userVariableVariableCategoryName'] = ApiClient.convertToType(data['userVariableVariableCategoryName'], 'String');
      }
      if (data.hasOwnProperty('valence')) {
        obj['valence'] = ApiClient.convertToType(data['valence'], 'String');
      }
      if (data.hasOwnProperty('valueAndFrequencyTextDescription')) {
        obj['valueAndFrequencyTextDescription'] = ApiClient.convertToType(data['valueAndFrequencyTextDescription'], 'String');
      }
      if (data.hasOwnProperty('valueAndFrequencyTextDescriptionWithTime')) {
        obj['valueAndFrequencyTextDescriptionWithTime'] = ApiClient.convertToType(data['valueAndFrequencyTextDescriptionWithTime'], 'String');
      }
      if (data.hasOwnProperty('variableCategoryId')) {
        obj['variableCategoryId'] = ApiClient.convertToType(data['variableCategoryId'], 'Number');
      }
      if (data.hasOwnProperty('variableCategoryImageUrl')) {
        obj['variableCategoryImageUrl'] = ApiClient.convertToType(data['variableCategoryImageUrl'], 'String');
      }
      if (data.hasOwnProperty('variableCategoryName')) {
        obj['variableCategoryName'] = ApiClient.convertToType(data['variableCategoryName'], 'String');
      }
      if (data.hasOwnProperty('variableDescription')) {
        obj['variableDescription'] = ApiClient.convertToType(data['variableDescription'], 'String');
      }
      if (data.hasOwnProperty('variableId')) {
        obj['variableId'] = ApiClient.convertToType(data['variableId'], 'Number');
      }
      if (data.hasOwnProperty('variableName')) {
        obj['variableName'] = ApiClient.convertToType(data['variableName'], 'String');
      }
    }
    return obj;
  }

  /**
   * @member {Array.<module:model/TrackingReminderNotificationAction>} actionArray
   */
  exports.prototype['actionArray'] = undefined;
  /**
   * @member {Array.<module:model/Unit>} availableUnits
   */
  exports.prototype['availableUnits'] = undefined;
  /**
   * clientId
   * @member {String} clientId
   */
  exports.prototype['clientId'] = undefined;
  /**
   * The way multiple measurements are aggregated over time
   * @member {module:model/TrackingReminder.CombinationOperationEnum} combinationOperation
   */
  exports.prototype['combinationOperation'] = undefined;
  /**
   * Example: 2016-05-18 02:24:08 UTC ISO 8601 YYYY-MM-DDThh:mm:ss
   * @member {String} createdAt
   */
  exports.prototype['createdAt'] = undefined;
  /**
   * Example: Trader Joe's Bedtime Tea
   * @member {String} displayName
   */
  exports.prototype['displayName'] = undefined;
  /**
   * Example: /5
   * @member {String} unitAbbreviatedName
   */
  exports.prototype['unitAbbreviatedName'] = undefined;
  /**
   * Example: 5
   * @member {Number} unitCategoryId
   */
  exports.prototype['unitCategoryId'] = undefined;
  /**
   * Example: Rating
   * @member {String} unitCategoryName
   */
  exports.prototype['unitCategoryName'] = undefined;
  /**
   * Example: 10
   * @member {Number} unitId
   */
  exports.prototype['unitId'] = undefined;
  /**
   * Example: 1 to 5 Rating
   * @member {String} unitName
   */
  exports.prototype['unitName'] = undefined;
  /**
   * Default value to use for the measurement when tracking
   * @member {Number} defaultValue
   */
  exports.prototype['defaultValue'] = undefined;
  /**
   * True if the reminders should be delivered via email
   * @member {Boolean} email
   */
  exports.prototype['email'] = undefined;
  /**
   * Example: reminderStartTimeLocal is less than $user->earliestReminderTime or greater than  $user->latestReminderTime
   * @member {String} errorMessage
   */
  exports.prototype['errorMessage'] = undefined;
  /**
   * Example: 0
   * @member {Number} fillingValue
   */
  exports.prototype['fillingValue'] = undefined;
  /**
   * Example: 02:45:20 in UTC timezone
   * @member {String} firstDailyReminderTime
   */
  exports.prototype['firstDailyReminderTime'] = undefined;
  /**
   * Example: Daily
   * @member {String} frequencyTextDescription
   */
  exports.prototype['frequencyTextDescription'] = undefined;
  /**
   * Example: Daily at 09:45 PM
   * @member {String} frequencyTextDescriptionWithTime
   */
  exports.prototype['frequencyTextDescriptionWithTime'] = undefined;
  /**
   * id
   * @member {Number} id
   */
  exports.prototype['id'] = undefined;
  /**
   * Example: saddestFaceIsFive
   * @member {String} inputType
   */
  exports.prototype['inputType'] = undefined;
  /**
   * Example: I am an instruction!
   * @member {String} instructions
   */
  exports.prototype['instructions'] = undefined;
  /**
   * Example: ion-sad-outline
   * @member {String} ionIcon
   */
  exports.prototype['ionIcon'] = undefined;
  /**
   * UTC ISO 8601 YYYY-MM-DDThh:mm:ss timestamp for the last time a measurement was received for this user and variable
   * @member {String} lastTracked
   */
  exports.prototype['lastTracked'] = undefined;
  /**
   * Example: 2
   * @member {Number} lastValue
   */
  exports.prototype['lastValue'] = undefined;
  /**
   * UTC ISO 8601 YYYY-MM-DDThh:mm:ss  timestamp for the reminder time of the latest tracking reminder notification that has been pre-emptively generated in the database
   * @member {String} latestTrackingReminderNotificationReminderTime
   */
  exports.prototype['latestTrackingReminderNotificationReminderTime'] = undefined;
  /**
   * @member {Array.<String>} localDailyReminderNotificationTimes
   */
  exports.prototype['localDailyReminderNotificationTimes'] = undefined;
  /**
   * @member {Array.<String>} localDailyReminderNotificationTimesForAllReminders
   */
  exports.prototype['localDailyReminderNotificationTimesForAllReminders'] = undefined;
  /**
   * Example: 1
   * @member {Boolean} manualTracking
   */
  exports.prototype['manualTracking'] = undefined;
  /**
   * Example: 5
   * @member {Number} maximumAllowedValue
   */
  exports.prototype['maximumAllowedValue'] = undefined;
  /**
   * Example: 1
   * @member {Number} minimumAllowedValue
   */
  exports.prototype['minimumAllowedValue'] = undefined;
  /**
   * Example: 1501555520
   * @member {Number} nextReminderTimeEpochSeconds
   */
  exports.prototype['nextReminderTimeEpochSeconds'] = undefined;
  /**
   * True if the reminders should appear in the notification bar
   * @member {Boolean} notificationBar
   */
  exports.prototype['notificationBar'] = undefined;
  /**
   * Example: 445
   * @member {Number} numberOfRawMeasurements
   */
  exports.prototype['numberOfRawMeasurements'] = undefined;
  /**
   * Example: 1
   * @member {Number} numberOfUniqueValues
   */
  exports.prototype['numberOfUniqueValues'] = undefined;
  /**
   * Indicates whether or not the variable is usually an outcome of interest such as a symptom or emotion
   * @member {Boolean} outcome
   */
  exports.prototype['outcome'] = undefined;
  /**
   * Example: img/variable_categories/symptoms.png
   * @member {String} pngPath
   */
  exports.prototype['pngPath'] = undefined;
  /**
   * Example: https://app.quantimo.do/ionic/Modo/www/img/variable_categories/symptoms.png
   * @member {String} pngUrl
   */
  exports.prototype['pngUrl'] = undefined;
  /**
   * Link to associated product for purchase
   * @member {String} productUrl
   */
  exports.prototype['productUrl'] = undefined;
  /**
   * True if the reminders should appear as a popup notification
   * @member {Boolean} popUp
   */
  exports.prototype['popUp'] = undefined;
  /**
   * Example: How is your overall mood?
   * @member {String} question
   */
  exports.prototype['question'] = undefined;
  /**
   * Latest time of day at which reminders should appear in UTC HH:MM:SS format
   * @member {String} reminderEndTime
   */
  exports.prototype['reminderEndTime'] = undefined;
  /**
   * Number of seconds between one reminder and the next
   * @member {Number} reminderFrequency
   */
  exports.prototype['reminderFrequency'] = undefined;
  /**
   * String identifier for the sound to accompany the reminder
   * @member {String} reminderSound
   */
  exports.prototype['reminderSound'] = undefined;
  /**
   * Example: 1469760320
   * @member {Number} reminderStartEpochSeconds
   */
  exports.prototype['reminderStartEpochSeconds'] = undefined;
  /**
   * Earliest time of day at which reminders should appear in UTC HH:MM:SS format
   * @member {String} reminderStartTime
   */
  exports.prototype['reminderStartTime'] = undefined;
  /**
   * Example: 21:45:20
   * @member {String} reminderStartTimeLocal
   */
  exports.prototype['reminderStartTimeLocal'] = undefined;
  /**
   * Example: 09:45 PM
   * @member {String} reminderStartTimeLocalHumanFormatted
   */
  exports.prototype['reminderStartTimeLocalHumanFormatted'] = undefined;
  /**
   * Example: true
   * @member {Boolean} repeating
   */
  exports.prototype['repeating'] = undefined;
  /**
   * Example: 01:00:00
   * @member {String} secondDailyReminderTime
   */
  exports.prototype['secondDailyReminderTime'] = undefined;
  /**
   * Example: 1
   * @member {Number} secondToLastValue
   */
  exports.prototype['secondToLastValue'] = undefined;
  /**
   * True if the reminders should be delivered via SMS
   * @member {Boolean} sms
   */
  exports.prototype['sms'] = undefined;
  /**
   * Earliest date on which the user should be reminded to track in YYYY-MM-DD format
   * @member {String} startTrackingDate
   */
  exports.prototype['startTrackingDate'] = undefined;
  /**
   * Latest date on which the user should be reminded to track in YYYY-MM-DD format
   * @member {String} stopTrackingDate
   */
  exports.prototype['stopTrackingDate'] = undefined;
  /**
   * Example: https://app.quantimo.do/ionic/Modo/www/img/variable_categories/symptoms.svg
   * @member {String} svgUrl
   */
  exports.prototype['svgUrl'] = undefined;
  /**
   * Example: 20:00:00
   * @member {String} thirdDailyReminderTime
   */
  exports.prototype['thirdDailyReminderTime'] = undefined;
  /**
   * Example: 3
   * @member {Number} thirdToLastValue
   */
  exports.prototype['thirdToLastValue'] = undefined;
  /**
   * Example: 11841
   * @member {Number} trackingReminderId
   */
  exports.prototype['trackingReminderId'] = undefined;
  /**
   * Example: Not Found
   * @member {String} trackingReminderImageUrl
   */
  exports.prototype['trackingReminderImageUrl'] = undefined;
  /**
   * UPC or other barcode scan result
   * @member {String} upc
   */
  exports.prototype['upc'] = undefined;
  /**
   * When the record in the database was last updated. Use UTC ISO 8601 YYYY-MM-DDThh:mm:ss  datetime format. Time zone should be UTC and not local.
   * @member {String} updatedAt
   */
  exports.prototype['updatedAt'] = undefined;
  /**
   * ID of User
   * @member {Number} userId
   */
  exports.prototype['userId'] = undefined;
  /**
   * Example: /5
   * @member {String} userVariableUnitAbbreviatedName
   */
  exports.prototype['userVariableUnitAbbreviatedName'] = undefined;
  /**
   * Example: 5
   * @member {Number} userVariableUnitCategoryId
   */
  exports.prototype['userVariableUnitCategoryId'] = undefined;
  /**
   * Example: Rating
   * @member {String} userVariableUnitCategoryName
   */
  exports.prototype['userVariableUnitCategoryName'] = undefined;
  /**
   * Example: 10
   * @member {Number} userVariableUnitId
   */
  exports.prototype['userVariableUnitId'] = undefined;
  /**
   * Example: 1 to 5 Rating
   * @member {String} userVariableUnitName
   */
  exports.prototype['userVariableUnitName'] = undefined;
  /**
   * Example: 10
   * @member {Number} userVariableVariableCategoryId
   */
  exports.prototype['userVariableVariableCategoryId'] = undefined;
  /**
   * Example: Symptoms
   * @member {String} userVariableVariableCategoryName
   */
  exports.prototype['userVariableVariableCategoryName'] = undefined;
  /**
   * Example: negative
   * @member {String} valence
   */
  exports.prototype['valence'] = undefined;
  /**
   * Example: Rate daily
   * @member {String} valueAndFrequencyTextDescription
   */
  exports.prototype['valueAndFrequencyTextDescription'] = undefined;
  /**
   * Example: Rate daily at 09:45 PM
   * @member {String} valueAndFrequencyTextDescriptionWithTime
   */
  exports.prototype['valueAndFrequencyTextDescriptionWithTime'] = undefined;
  /**
   * Example: 10
   * @member {Number} variableCategoryId
   */
  exports.prototype['variableCategoryId'] = undefined;
  /**
   * Example: https://maxcdn.icons8.com/Color/PNG/96/Messaging/sad-96.png
   * @member {String} variableCategoryImageUrl
   */
  exports.prototype['variableCategoryImageUrl'] = undefined;
  /**
   * Name of the variable category to be used when sending measurements
   * @member {String} variableCategoryName
   */
  exports.prototype['variableCategoryName'] = undefined;
  /**
   * Example: negative
   * @member {String} variableDescription
   */
  exports.prototype['variableDescription'] = undefined;
  /**
   * Id for the variable to be tracked
   * @member {Number} variableId
   */
  exports.prototype['variableId'] = undefined;
  /**
   * Name of the variable to be used when sending measurements
   * @member {String} variableName
   */
  exports.prototype['variableName'] = undefined;


  /**
   * Allowed values for the <code>combinationOperation</code> property.
   * @enum {String}
   * @readonly
   */
  exports.CombinationOperationEnum = {
    /**
     * value: "MEAN"
     * @const
     */
    "MEAN": "MEAN",
    /**
     * value: "SUM"
     * @const
     */
    "SUM": "SUM"  };


  return exports;
}));



},{"../ApiClient":9,"./TrackingReminderNotificationAction":66,"./Unit":69}],64:[function(require,module,exports){
/**
 * quantimodo
 * We make it easy to retrieve and analyze normalized user data from a wide array of devices and applications. Check out our [docs and sdk's](https://github.com/QuantiModo/docs) or [contact us](https://help.quantimo.do).
 *
 * OpenAPI spec version: 5.8.112511
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.3.1
 *
 * Do not edit the class manually.
 *
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
    if (!root.Quantimodo) {
      root.Quantimodo = {};
    }
    root.Quantimodo.TrackingReminderDelete = factory(root.Quantimodo.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The TrackingReminderDelete model module.
   * @module model/TrackingReminderDelete
   * @version 5.8.112511
   */

  /**
   * Constructs a new <code>TrackingReminderDelete</code>.
   * @alias module:model/TrackingReminderDelete
   * @class
   * @param id {Number} Id of the TrackingReminder to be deleted
   */
  var exports = function(id) {
    var _this = this;

    _this['id'] = id;
  };

  /**
   * Constructs a <code>TrackingReminderDelete</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/TrackingReminderDelete} obj Optional instance to populate.
   * @return {module:model/TrackingReminderDelete} The populated <code>TrackingReminderDelete</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('id')) {
        obj['id'] = ApiClient.convertToType(data['id'], 'Number');
      }
    }
    return obj;
  }

  /**
   * Id of the TrackingReminder to be deleted
   * @member {Number} id
   */
  exports.prototype['id'] = undefined;



  return exports;
}));



},{"../ApiClient":9}],65:[function(require,module,exports){
/**
 * quantimodo
 * We make it easy to retrieve and analyze normalized user data from a wide array of devices and applications. Check out our [docs and sdk's](https://github.com/QuantiModo/docs) or [contact us](https://help.quantimo.do).
 *
 * OpenAPI spec version: 5.8.112511
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.3.1
 *
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/TrackingReminderNotificationAction', 'model/TrackingReminderNotificationTrackAllAction', 'model/Unit'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./TrackingReminderNotificationAction'), require('./TrackingReminderNotificationTrackAllAction'), require('./Unit'));
  } else {
    // Browser globals (root is window)
    if (!root.Quantimodo) {
      root.Quantimodo = {};
    }
    root.Quantimodo.TrackingReminderNotification = factory(root.Quantimodo.ApiClient, root.Quantimodo.TrackingReminderNotificationAction, root.Quantimodo.TrackingReminderNotificationTrackAllAction, root.Quantimodo.Unit);
  }
}(this, function(ApiClient, TrackingReminderNotificationAction, TrackingReminderNotificationTrackAllAction, Unit) {
  'use strict';




  /**
   * The TrackingReminderNotification model module.
   * @module model/TrackingReminderNotification
   * @version 5.8.112511
   */

  /**
   * Constructs a new <code>TrackingReminderNotification</code>.
   * @alias module:model/TrackingReminderNotification
   * @class
   * @param actionArray {Array.<module:model/TrackingReminderNotificationAction>} 
   * @param availableUnits {Array.<module:model/Unit>} 
   * @param fillingValue {Number} Example: 0
   * @param id {Number} id for the specific PENDING tracking remidner
   * @param trackAllActions {Array.<module:model/TrackingReminderNotificationTrackAllAction>} 
   */
  var exports = function(actionArray, availableUnits, fillingValue, id, trackAllActions) {
    var _this = this;

    _this['actionArray'] = actionArray;
    _this['availableUnits'] = availableUnits;













    _this['fillingValue'] = fillingValue;

    _this['id'] = id;






























    _this['trackAllActions'] = trackAllActions;























  };

  /**
   * Constructs a <code>TrackingReminderNotification</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/TrackingReminderNotification} obj Optional instance to populate.
   * @return {module:model/TrackingReminderNotification} The populated <code>TrackingReminderNotification</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('actionArray')) {
        obj['actionArray'] = ApiClient.convertToType(data['actionArray'], [TrackingReminderNotificationAction]);
      }
      if (data.hasOwnProperty('availableUnits')) {
        obj['availableUnits'] = ApiClient.convertToType(data['availableUnits'], [Unit]);
      }
      if (data.hasOwnProperty('clientId')) {
        obj['clientId'] = ApiClient.convertToType(data['clientId'], 'String');
      }
      if (data.hasOwnProperty('combinationOperation')) {
        obj['combinationOperation'] = ApiClient.convertToType(data['combinationOperation'], 'String');
      }
      if (data.hasOwnProperty('createdAt')) {
        obj['createdAt'] = ApiClient.convertToType(data['createdAt'], 'String');
      }
      if (data.hasOwnProperty('displayName')) {
        obj['displayName'] = ApiClient.convertToType(data['displayName'], 'String');
      }
      if (data.hasOwnProperty('modifiedValue')) {
        obj['modifiedValue'] = ApiClient.convertToType(data['modifiedValue'], 'Number');
      }
      if (data.hasOwnProperty('unitAbbreviatedName')) {
        obj['unitAbbreviatedName'] = ApiClient.convertToType(data['unitAbbreviatedName'], 'String');
      }
      if (data.hasOwnProperty('unitCategoryId')) {
        obj['unitCategoryId'] = ApiClient.convertToType(data['unitCategoryId'], 'Number');
      }
      if (data.hasOwnProperty('unitCategoryName')) {
        obj['unitCategoryName'] = ApiClient.convertToType(data['unitCategoryName'], 'String');
      }
      if (data.hasOwnProperty('unitId')) {
        obj['unitId'] = ApiClient.convertToType(data['unitId'], 'Number');
      }
      if (data.hasOwnProperty('unitName')) {
        obj['unitName'] = ApiClient.convertToType(data['unitName'], 'String');
      }
      if (data.hasOwnProperty('defaultValue')) {
        obj['defaultValue'] = ApiClient.convertToType(data['defaultValue'], 'Number');
      }
      if (data.hasOwnProperty('description')) {
        obj['description'] = ApiClient.convertToType(data['description'], 'String');
      }
      if (data.hasOwnProperty('email')) {
        obj['email'] = ApiClient.convertToType(data['email'], 'Boolean');
      }
      if (data.hasOwnProperty('fillingValue')) {
        obj['fillingValue'] = ApiClient.convertToType(data['fillingValue'], 'Number');
      }
      if (data.hasOwnProperty('iconIcon')) {
        obj['iconIcon'] = ApiClient.convertToType(data['iconIcon'], 'String');
      }
      if (data.hasOwnProperty('id')) {
        obj['id'] = ApiClient.convertToType(data['id'], 'Number');
      }
      if (data.hasOwnProperty('imageUrl')) {
        obj['imageUrl'] = ApiClient.convertToType(data['imageUrl'], 'String');
      }
      if (data.hasOwnProperty('inputType')) {
        obj['inputType'] = ApiClient.convertToType(data['inputType'], 'String');
      }
      if (data.hasOwnProperty('ionIcon')) {
        obj['ionIcon'] = ApiClient.convertToType(data['ionIcon'], 'String');
      }
      if (data.hasOwnProperty('lastValue')) {
        obj['lastValue'] = ApiClient.convertToType(data['lastValue'], 'Number');
      }
      if (data.hasOwnProperty('manualTracking')) {
        obj['manualTracking'] = ApiClient.convertToType(data['manualTracking'], 'Boolean');
      }
      if (data.hasOwnProperty('maximumAllowedValue')) {
        obj['maximumAllowedValue'] = ApiClient.convertToType(data['maximumAllowedValue'], 'Number');
      }
      if (data.hasOwnProperty('minimumAllowedValue')) {
        obj['minimumAllowedValue'] = ApiClient.convertToType(data['minimumAllowedValue'], 'Number');
      }
      if (data.hasOwnProperty('mostCommonValue')) {
        obj['mostCommonValue'] = ApiClient.convertToType(data['mostCommonValue'], 'Number');
      }
      if (data.hasOwnProperty('notificationBar')) {
        obj['notificationBar'] = ApiClient.convertToType(data['notificationBar'], 'Boolean');
      }
      if (data.hasOwnProperty('notifiedAt')) {
        obj['notifiedAt'] = ApiClient.convertToType(data['notifiedAt'], 'String');
      }
      if (data.hasOwnProperty('numberOfUniqueValues')) {
        obj['numberOfUniqueValues'] = ApiClient.convertToType(data['numberOfUniqueValues'], 'Number');
      }
      if (data.hasOwnProperty('outcome')) {
        obj['outcome'] = ApiClient.convertToType(data['outcome'], 'Boolean');
      }
      if (data.hasOwnProperty('pngPath')) {
        obj['pngPath'] = ApiClient.convertToType(data['pngPath'], 'String');
      }
      if (data.hasOwnProperty('pngUrl')) {
        obj['pngUrl'] = ApiClient.convertToType(data['pngUrl'], 'String');
      }
      if (data.hasOwnProperty('popUp')) {
        obj['popUp'] = ApiClient.convertToType(data['popUp'], 'Boolean');
      }
      if (data.hasOwnProperty('productUrl')) {
        obj['productUrl'] = ApiClient.convertToType(data['productUrl'], 'String');
      }
      if (data.hasOwnProperty('question')) {
        obj['question'] = ApiClient.convertToType(data['question'], 'String');
      }
      if (data.hasOwnProperty('reminderEndTime')) {
        obj['reminderEndTime'] = ApiClient.convertToType(data['reminderEndTime'], 'String');
      }
      if (data.hasOwnProperty('reminderFrequency')) {
        obj['reminderFrequency'] = ApiClient.convertToType(data['reminderFrequency'], 'Number');
      }
      if (data.hasOwnProperty('reminderSound')) {
        obj['reminderSound'] = ApiClient.convertToType(data['reminderSound'], 'String');
      }
      if (data.hasOwnProperty('reminderStartTime')) {
        obj['reminderStartTime'] = ApiClient.convertToType(data['reminderStartTime'], 'String');
      }
      if (data.hasOwnProperty('reminderTime')) {
        obj['reminderTime'] = ApiClient.convertToType(data['reminderTime'], 'String');
      }
      if (data.hasOwnProperty('secondMostCommonValue')) {
        obj['secondMostCommonValue'] = ApiClient.convertToType(data['secondMostCommonValue'], 'Number');
      }
      if (data.hasOwnProperty('secondToLastValue')) {
        obj['secondToLastValue'] = ApiClient.convertToType(data['secondToLastValue'], 'Number');
      }
      if (data.hasOwnProperty('sms')) {
        obj['sms'] = ApiClient.convertToType(data['sms'], 'Boolean');
      }
      if (data.hasOwnProperty('svgUrl')) {
        obj['svgUrl'] = ApiClient.convertToType(data['svgUrl'], 'String');
      }
      if (data.hasOwnProperty('thirdMostCommonValue')) {
        obj['thirdMostCommonValue'] = ApiClient.convertToType(data['thirdMostCommonValue'], 'Number');
      }
      if (data.hasOwnProperty('thirdToLastValue')) {
        obj['thirdToLastValue'] = ApiClient.convertToType(data['thirdToLastValue'], 'Number');
      }
      if (data.hasOwnProperty('title')) {
        obj['title'] = ApiClient.convertToType(data['title'], 'String');
      }
      if (data.hasOwnProperty('total')) {
        obj['total'] = ApiClient.convertToType(data['total'], 'Number');
      }
      if (data.hasOwnProperty('trackAllActions')) {
        obj['trackAllActions'] = ApiClient.convertToType(data['trackAllActions'], [TrackingReminderNotificationTrackAllAction]);
      }
      if (data.hasOwnProperty('trackingReminderId')) {
        obj['trackingReminderId'] = ApiClient.convertToType(data['trackingReminderId'], 'Number');
      }
      if (data.hasOwnProperty('trackingReminderImageUrl')) {
        obj['trackingReminderImageUrl'] = ApiClient.convertToType(data['trackingReminderImageUrl'], 'String');
      }
      if (data.hasOwnProperty('trackingReminderNotificationId')) {
        obj['trackingReminderNotificationId'] = ApiClient.convertToType(data['trackingReminderNotificationId'], 'Number');
      }
      if (data.hasOwnProperty('trackingReminderNotificationTime')) {
        obj['trackingReminderNotificationTime'] = ApiClient.convertToType(data['trackingReminderNotificationTime'], 'String');
      }
      if (data.hasOwnProperty('trackingReminderNotificationTimeEpoch')) {
        obj['trackingReminderNotificationTimeEpoch'] = ApiClient.convertToType(data['trackingReminderNotificationTimeEpoch'], 'Number');
      }
      if (data.hasOwnProperty('trackingReminderNotificationTimeLocal')) {
        obj['trackingReminderNotificationTimeLocal'] = ApiClient.convertToType(data['trackingReminderNotificationTimeLocal'], 'String');
      }
      if (data.hasOwnProperty('trackingReminderNotificationTimeLocalHumanString')) {
        obj['trackingReminderNotificationTimeLocalHumanString'] = ApiClient.convertToType(data['trackingReminderNotificationTimeLocalHumanString'], 'String');
      }
      if (data.hasOwnProperty('updatedAt')) {
        obj['updatedAt'] = ApiClient.convertToType(data['updatedAt'], 'String');
      }
      if (data.hasOwnProperty('userId')) {
        obj['userId'] = ApiClient.convertToType(data['userId'], 'Number');
      }
      if (data.hasOwnProperty('userVariableUnitAbbreviatedName')) {
        obj['userVariableUnitAbbreviatedName'] = ApiClient.convertToType(data['userVariableUnitAbbreviatedName'], 'String');
      }
      if (data.hasOwnProperty('userVariableUnitCategoryId')) {
        obj['userVariableUnitCategoryId'] = ApiClient.convertToType(data['userVariableUnitCategoryId'], 'Number');
      }
      if (data.hasOwnProperty('userVariableUnitCategoryName')) {
        obj['userVariableUnitCategoryName'] = ApiClient.convertToType(data['userVariableUnitCategoryName'], 'String');
      }
      if (data.hasOwnProperty('userVariableUnitId')) {
        obj['userVariableUnitId'] = ApiClient.convertToType(data['userVariableUnitId'], 'Number');
      }
      if (data.hasOwnProperty('userVariableUnitName')) {
        obj['userVariableUnitName'] = ApiClient.convertToType(data['userVariableUnitName'], 'String');
      }
      if (data.hasOwnProperty('userVariableVariableCategoryId')) {
        obj['userVariableVariableCategoryId'] = ApiClient.convertToType(data['userVariableVariableCategoryId'], 'Number');
      }
      if (data.hasOwnProperty('userVariableVariableCategoryName')) {
        obj['userVariableVariableCategoryName'] = ApiClient.convertToType(data['userVariableVariableCategoryName'], 'String');
      }
      if (data.hasOwnProperty('valence')) {
        obj['valence'] = ApiClient.convertToType(data['valence'], 'String');
      }
      if (data.hasOwnProperty('variableCategoryId')) {
        obj['variableCategoryId'] = ApiClient.convertToType(data['variableCategoryId'], 'Number');
      }
      if (data.hasOwnProperty('variableCategoryImageUrl')) {
        obj['variableCategoryImageUrl'] = ApiClient.convertToType(data['variableCategoryImageUrl'], 'String');
      }
      if (data.hasOwnProperty('variableCategoryName')) {
        obj['variableCategoryName'] = ApiClient.convertToType(data['variableCategoryName'], 'String');
      }
      if (data.hasOwnProperty('variableId')) {
        obj['variableId'] = ApiClient.convertToType(data['variableId'], 'Number');
      }
      if (data.hasOwnProperty('variableImageUrl')) {
        obj['variableImageUrl'] = ApiClient.convertToType(data['variableImageUrl'], 'String');
      }
      if (data.hasOwnProperty('variableName')) {
        obj['variableName'] = ApiClient.convertToType(data['variableName'], 'String');
      }
    }
    return obj;
  }

  /**
   * @member {Array.<module:model/TrackingReminderNotificationAction>} actionArray
   */
  exports.prototype['actionArray'] = undefined;
  /**
   * @member {Array.<module:model/Unit>} availableUnits
   */
  exports.prototype['availableUnits'] = undefined;
  /**
   * clientId
   * @member {String} clientId
   */
  exports.prototype['clientId'] = undefined;
  /**
   * The way multiple measurements are aggregated over time
   * @member {module:model/TrackingReminderNotification.CombinationOperationEnum} combinationOperation
   */
  exports.prototype['combinationOperation'] = undefined;
  /**
   * Example: 2017-07-29 20:49:54 UTC ISO 8601 YYYY-MM-DDThh:mm:ss
   * @member {String} createdAt
   */
  exports.prototype['createdAt'] = undefined;
  /**
   * Example: Trader Joe's Bedtime Tea
   * @member {String} displayName
   */
  exports.prototype['displayName'] = undefined;
  /**
   * Is the user specified default value or falls back to the last value in user unit. Good for initializing input fields
   * @member {Number} modifiedValue
   */
  exports.prototype['modifiedValue'] = undefined;
  /**
   * Example: /5
   * @member {String} unitAbbreviatedName
   */
  exports.prototype['unitAbbreviatedName'] = undefined;
  /**
   * Example: 5
   * @member {Number} unitCategoryId
   */
  exports.prototype['unitCategoryId'] = undefined;
  /**
   * Example: Rating
   * @member {String} unitCategoryName
   */
  exports.prototype['unitCategoryName'] = undefined;
  /**
   * Example: 10
   * @member {Number} unitId
   */
  exports.prototype['unitId'] = undefined;
  /**
   * Example: 1 to 5 Rating
   * @member {String} unitName
   */
  exports.prototype['unitName'] = undefined;
  /**
   * Default value to use for the measurement when tracking
   * @member {Number} defaultValue
   */
  exports.prototype['defaultValue'] = undefined;
  /**
   * Example: positive
   * @member {String} description
   */
  exports.prototype['description'] = undefined;
  /**
   * True if the reminders should be delivered via email
   * @member {Boolean} email
   */
  exports.prototype['email'] = undefined;
  /**
   * Example: 0
   * @member {Number} fillingValue
   */
  exports.prototype['fillingValue'] = undefined;
  /**
   * Example: ion-sad-outline
   * @member {String} iconIcon
   */
  exports.prototype['iconIcon'] = undefined;
  /**
   * id for the specific PENDING tracking remidner
   * @member {Number} id
   */
  exports.prototype['id'] = undefined;
  /**
   * Example: https://rximage.nlm.nih.gov/image/images/gallery/original/55111-0129-60_RXNAVIMAGE10_B051D81E.jpg
   * @member {String} imageUrl
   */
  exports.prototype['imageUrl'] = undefined;
  /**
   * Example: happiestFaceIsFive
   * @member {String} inputType
   */
  exports.prototype['inputType'] = undefined;
  /**
   * Example: ion-happy-outline
   * @member {String} ionIcon
   */
  exports.prototype['ionIcon'] = undefined;
  /**
   * Example: 3
   * @member {Number} lastValue
   */
  exports.prototype['lastValue'] = undefined;
  /**
   * Example: 1
   * @member {Boolean} manualTracking
   */
  exports.prototype['manualTracking'] = undefined;
  /**
   * Example: 5
   * @member {Number} maximumAllowedValue
   */
  exports.prototype['maximumAllowedValue'] = undefined;
  /**
   * Example: 1
   * @member {Number} minimumAllowedValue
   */
  exports.prototype['minimumAllowedValue'] = undefined;
  /**
   * Example: 3
   * @member {Number} mostCommonValue
   */
  exports.prototype['mostCommonValue'] = undefined;
  /**
   * True if the reminders should appear in the notification bar
   * @member {Boolean} notificationBar
   */
  exports.prototype['notificationBar'] = undefined;
  /**
   * Example: UTC ISO 8601 YYYY-MM-DDThh:mm:ss
   * @member {String} notifiedAt
   */
  exports.prototype['notifiedAt'] = undefined;
  /**
   * Example: 5
   * @member {Number} numberOfUniqueValues
   */
  exports.prototype['numberOfUniqueValues'] = undefined;
  /**
   * Indicates whether or not the variable is usually an outcome of interest such as a symptom or emotion
   * @member {Boolean} outcome
   */
  exports.prototype['outcome'] = undefined;
  /**
   * Example: img/variable_categories/emotions.png
   * @member {String} pngPath
   */
  exports.prototype['pngPath'] = undefined;
  /**
   * Example: https://app.quantimo.do/ionic/Modo/www/img/variable_categories/emotions.png
   * @member {String} pngUrl
   */
  exports.prototype['pngUrl'] = undefined;
  /**
   * True if the reminders should appear as a popup notification
   * @member {Boolean} popUp
   */
  exports.prototype['popUp'] = undefined;
  /**
   * Link to associated product for purchase
   * @member {String} productUrl
   */
  exports.prototype['productUrl'] = undefined;
  /**
   * Example: How is your overall mood?
   * @member {String} question
   */
  exports.prototype['question'] = undefined;
  /**
   * Example: 01-01-2018
   * @member {String} reminderEndTime
   */
  exports.prototype['reminderEndTime'] = undefined;
  /**
   * How often user should be reminded in seconds. Example: 86400
   * @member {Number} reminderFrequency
   */
  exports.prototype['reminderFrequency'] = undefined;
  /**
   * String identifier for the sound to accompany the reminder
   * @member {String} reminderSound
   */
  exports.prototype['reminderSound'] = undefined;
  /**
   * Earliest time of day at which reminders should appear in UTC HH:MM:SS format
   * @member {String} reminderStartTime
   */
  exports.prototype['reminderStartTime'] = undefined;
  /**
   * UTC ISO 8601 YYYY-MM-DDThh:mm:ss timestamp for the specific time the variable should be tracked in UTC.  This will be used for the measurement startTime if the track endpoint is used.
   * @member {String} reminderTime
   */
  exports.prototype['reminderTime'] = undefined;
  /**
   * Example: 4
   * @member {Number} secondMostCommonValue
   */
  exports.prototype['secondMostCommonValue'] = undefined;
  /**
   * Example: 1
   * @member {Number} secondToLastValue
   */
  exports.prototype['secondToLastValue'] = undefined;
  /**
   * True if the reminders should be delivered via SMS
   * @member {Boolean} sms
   */
  exports.prototype['sms'] = undefined;
  /**
   * Example: https://app.quantimo.do/ionic/Modo/www/img/variable_categories/emotions.svg
   * @member {String} svgUrl
   */
  exports.prototype['svgUrl'] = undefined;
  /**
   * Example: 2
   * @member {Number} thirdMostCommonValue
   */
  exports.prototype['thirdMostCommonValue'] = undefined;
  /**
   * Example: 2
   * @member {Number} thirdToLastValue
   */
  exports.prototype['thirdToLastValue'] = undefined;
  /**
   * Example: Rate Overall Mood
   * @member {String} title
   */
  exports.prototype['title'] = undefined;
  /**
   * Example: 3
   * @member {Number} total
   */
  exports.prototype['total'] = undefined;
  /**
   * @member {Array.<module:model/TrackingReminderNotificationTrackAllAction>} trackAllActions
   */
  exports.prototype['trackAllActions'] = undefined;
  /**
   * id for the repeating tracking remidner
   * @member {Number} trackingReminderId
   */
  exports.prototype['trackingReminderId'] = undefined;
  /**
   * Example: https://rximage.nlm.nih.gov/image/images/gallery/original/55111-0129-60_RXNAVIMAGE10_B051D81E.jpg
   * @member {String} trackingReminderImageUrl
   */
  exports.prototype['trackingReminderImageUrl'] = undefined;
  /**
   * Example: 5072482
   * @member {Number} trackingReminderNotificationId
   */
  exports.prototype['trackingReminderNotificationId'] = undefined;
  /**
   * UTC ISO 8601 YYYY-MM-DDThh:mm:ss timestamp for the specific time the variable should be tracked in UTC.  This will be used for the measurement startTime if the track endpoint is used.
   * @member {String} trackingReminderNotificationTime
   */
  exports.prototype['trackingReminderNotificationTime'] = undefined;
  /**
   * Example: 1501534124
   * @member {Number} trackingReminderNotificationTimeEpoch
   */
  exports.prototype['trackingReminderNotificationTimeEpoch'] = undefined;
  /**
   * Example: 15:48:44
   * @member {String} trackingReminderNotificationTimeLocal
   */
  exports.prototype['trackingReminderNotificationTimeLocal'] = undefined;
  /**
   * Example: 8PM Sun, May 1
   * @member {String} trackingReminderNotificationTimeLocalHumanString
   */
  exports.prototype['trackingReminderNotificationTimeLocalHumanString'] = undefined;
  /**
   * When the record in the database was last updated. Use UTC ISO 8601 YYYY-MM-DDThh:mm:ss  datetime format. Time zone should be UTC and not local.
   * @member {String} updatedAt
   */
  exports.prototype['updatedAt'] = undefined;
  /**
   * ID of User
   * @member {Number} userId
   */
  exports.prototype['userId'] = undefined;
  /**
   * Example: /5
   * @member {String} userVariableUnitAbbreviatedName
   */
  exports.prototype['userVariableUnitAbbreviatedName'] = undefined;
  /**
   * Example: 5
   * @member {Number} userVariableUnitCategoryId
   */
  exports.prototype['userVariableUnitCategoryId'] = undefined;
  /**
   * Example: Rating
   * @member {String} userVariableUnitCategoryName
   */
  exports.prototype['userVariableUnitCategoryName'] = undefined;
  /**
   * Example: 10
   * @member {Number} userVariableUnitId
   */
  exports.prototype['userVariableUnitId'] = undefined;
  /**
   * Example: 1 to 5 Rating
   * @member {String} userVariableUnitName
   */
  exports.prototype['userVariableUnitName'] = undefined;
  /**
   * Example: 1
   * @member {Number} userVariableVariableCategoryId
   */
  exports.prototype['userVariableVariableCategoryId'] = undefined;
  /**
   * Example: Emotions
   * @member {String} userVariableVariableCategoryName
   */
  exports.prototype['userVariableVariableCategoryName'] = undefined;
  /**
   * Example: positive
   * @member {String} valence
   */
  exports.prototype['valence'] = undefined;
  /**
   * Example: 1
   * @member {Number} variableCategoryId
   */
  exports.prototype['variableCategoryId'] = undefined;
  /**
   * Example: https://maxcdn.icons8.com/Color/PNG/96/Cinema/theatre_mask-96.png
   * @member {String} variableCategoryImageUrl
   */
  exports.prototype['variableCategoryImageUrl'] = undefined;
  /**
   * Name of the variable category to be used when sending measurements
   * @member {String} variableCategoryName
   */
  exports.prototype['variableCategoryName'] = undefined;
  /**
   * Id for the variable to be tracked
   * @member {Number} variableId
   */
  exports.prototype['variableId'] = undefined;
  /**
   * Example: https://image.png
   * @member {String} variableImageUrl
   */
  exports.prototype['variableImageUrl'] = undefined;
  /**
   * Name of the variable to be used when sending measurements
   * @member {String} variableName
   */
  exports.prototype['variableName'] = undefined;


  /**
   * Allowed values for the <code>combinationOperation</code> property.
   * @enum {String}
   * @readonly
   */
  exports.CombinationOperationEnum = {
    /**
     * value: "MEAN"
     * @const
     */
    "MEAN": "MEAN",
    /**
     * value: "SUM"
     * @const
     */
    "SUM": "SUM"  };


  return exports;
}));



},{"../ApiClient":9,"./TrackingReminderNotificationAction":66,"./TrackingReminderNotificationTrackAllAction":68,"./Unit":69}],66:[function(require,module,exports){
/**
 * quantimodo
 * We make it easy to retrieve and analyze normalized user data from a wide array of devices and applications. Check out our [docs and sdk's](https://github.com/QuantiModo/docs) or [contact us](https://help.quantimo.do).
 *
 * OpenAPI spec version: 5.8.112511
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.3.1
 *
 * Do not edit the class manually.
 *
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
    if (!root.Quantimodo) {
      root.Quantimodo = {};
    }
    root.Quantimodo.TrackingReminderNotificationAction = factory(root.Quantimodo.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The TrackingReminderNotificationAction model module.
   * @module model/TrackingReminderNotificationAction
   * @version 5.8.112511
   */

  /**
   * Constructs a new <code>TrackingReminderNotificationAction</code>.
   * @alias module:model/TrackingReminderNotificationAction
   * @class
   * @param action {String} Example: track
   * @param callback {String} Example: trackThreeRatingAction
   * @param modifiedValue {Number} Example: 3
   * @param title {String} Example: 3/5
   */
  var exports = function(action, callback, modifiedValue, title) {
    var _this = this;

    _this['action'] = action;
    _this['callback'] = callback;
    _this['modifiedValue'] = modifiedValue;
    _this['title'] = title;


  };

  /**
   * Constructs a <code>TrackingReminderNotificationAction</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/TrackingReminderNotificationAction} obj Optional instance to populate.
   * @return {module:model/TrackingReminderNotificationAction} The populated <code>TrackingReminderNotificationAction</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('action')) {
        obj['action'] = ApiClient.convertToType(data['action'], 'String');
      }
      if (data.hasOwnProperty('callback')) {
        obj['callback'] = ApiClient.convertToType(data['callback'], 'String');
      }
      if (data.hasOwnProperty('modifiedValue')) {
        obj['modifiedValue'] = ApiClient.convertToType(data['modifiedValue'], 'Number');
      }
      if (data.hasOwnProperty('title')) {
        obj['title'] = ApiClient.convertToType(data['title'], 'String');
      }
      if (data.hasOwnProperty('longTitle')) {
        obj['longTitle'] = ApiClient.convertToType(data['longTitle'], 'String');
      }
      if (data.hasOwnProperty('shortTitle')) {
        obj['shortTitle'] = ApiClient.convertToType(data['shortTitle'], 'String');
      }
    }
    return obj;
  }

  /**
   * Example: track
   * @member {String} action
   */
  exports.prototype['action'] = undefined;
  /**
   * Example: trackThreeRatingAction
   * @member {String} callback
   */
  exports.prototype['callback'] = undefined;
  /**
   * Example: 3
   * @member {Number} modifiedValue
   */
  exports.prototype['modifiedValue'] = undefined;
  /**
   * Example: 3/5
   * @member {String} title
   */
  exports.prototype['title'] = undefined;
  /**
   * Example: Rate 3/5
   * @member {String} longTitle
   */
  exports.prototype['longTitle'] = undefined;
  /**
   * Example: 3
   * @member {String} shortTitle
   */
  exports.prototype['shortTitle'] = undefined;



  return exports;
}));



},{"../ApiClient":9}],67:[function(require,module,exports){
/**
 * quantimodo
 * We make it easy to retrieve and analyze normalized user data from a wide array of devices and applications. Check out our [docs and sdk's](https://github.com/QuantiModo/docs) or [contact us](https://help.quantimo.do).
 *
 * OpenAPI spec version: 5.8.112511
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.3.1
 *
 * Do not edit the class manually.
 *
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
    if (!root.Quantimodo) {
      root.Quantimodo = {};
    }
    root.Quantimodo.TrackingReminderNotificationPost = factory(root.Quantimodo.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The TrackingReminderNotificationPost model module.
   * @module model/TrackingReminderNotificationPost
   * @version 5.8.112511
   */

  /**
   * Constructs a new <code>TrackingReminderNotificationPost</code>.
   * @alias module:model/TrackingReminderNotificationPost
   * @class
   * @param action {module:model/TrackingReminderNotificationPost.ActionEnum} track records a measurement for the notification.  snooze changes the notification to 1 hour from now. skip deletes the notification.
   * @param id {Number} Id of the TrackingReminderNotification
   */
  var exports = function(action, id) {
    var _this = this;

    _this['action'] = action;
    _this['id'] = id;

  };

  /**
   * Constructs a <code>TrackingReminderNotificationPost</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/TrackingReminderNotificationPost} obj Optional instance to populate.
   * @return {module:model/TrackingReminderNotificationPost} The populated <code>TrackingReminderNotificationPost</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('action')) {
        obj['action'] = ApiClient.convertToType(data['action'], 'String');
      }
      if (data.hasOwnProperty('id')) {
        obj['id'] = ApiClient.convertToType(data['id'], 'Number');
      }
      if (data.hasOwnProperty('modifiedValue')) {
        obj['modifiedValue'] = ApiClient.convertToType(data['modifiedValue'], 'Number');
      }
    }
    return obj;
  }

  /**
   * track records a measurement for the notification.  snooze changes the notification to 1 hour from now. skip deletes the notification.
   * @member {module:model/TrackingReminderNotificationPost.ActionEnum} action
   */
  exports.prototype['action'] = undefined;
  /**
   * Id of the TrackingReminderNotification
   * @member {Number} id
   */
  exports.prototype['id'] = undefined;
  /**
   * Optional value to be recorded instead of the tracking reminder default value
   * @member {Number} modifiedValue
   */
  exports.prototype['modifiedValue'] = undefined;


  /**
   * Allowed values for the <code>action</code> property.
   * @enum {String}
   * @readonly
   */
  exports.ActionEnum = {
    /**
     * value: "skip"
     * @const
     */
    "skip": "skip",
    /**
     * value: "snooze"
     * @const
     */
    "snooze": "snooze",
    /**
     * value: "track"
     * @const
     */
    "track": "track"  };


  return exports;
}));



},{"../ApiClient":9}],68:[function(require,module,exports){
/**
 * quantimodo
 * We make it easy to retrieve and analyze normalized user data from a wide array of devices and applications. Check out our [docs and sdk's](https://github.com/QuantiModo/docs) or [contact us](https://help.quantimo.do).
 *
 * OpenAPI spec version: 5.8.112511
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.3.1
 *
 * Do not edit the class manually.
 *
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
    if (!root.Quantimodo) {
      root.Quantimodo = {};
    }
    root.Quantimodo.TrackingReminderNotificationTrackAllAction = factory(root.Quantimodo.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The TrackingReminderNotificationTrackAllAction model module.
   * @module model/TrackingReminderNotificationTrackAllAction
   * @version 5.8.112511
   */

  /**
   * Constructs a new <code>TrackingReminderNotificationTrackAllAction</code>.
   * @alias module:model/TrackingReminderNotificationTrackAllAction
   * @class
   * @param action {String} Example: trackAll
   * @param callback {String} Example: trackThreeRatingAction
   * @param modifiedValue {Number} Example: 3
   * @param title {String} Example: Rate 3/5 for all
   */
  var exports = function(action, callback, modifiedValue, title) {
    var _this = this;

    _this['action'] = action;
    _this['callback'] = callback;
    _this['modifiedValue'] = modifiedValue;
    _this['title'] = title;
  };

  /**
   * Constructs a <code>TrackingReminderNotificationTrackAllAction</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/TrackingReminderNotificationTrackAllAction} obj Optional instance to populate.
   * @return {module:model/TrackingReminderNotificationTrackAllAction} The populated <code>TrackingReminderNotificationTrackAllAction</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('action')) {
        obj['action'] = ApiClient.convertToType(data['action'], 'String');
      }
      if (data.hasOwnProperty('callback')) {
        obj['callback'] = ApiClient.convertToType(data['callback'], 'String');
      }
      if (data.hasOwnProperty('modifiedValue')) {
        obj['modifiedValue'] = ApiClient.convertToType(data['modifiedValue'], 'Number');
      }
      if (data.hasOwnProperty('title')) {
        obj['title'] = ApiClient.convertToType(data['title'], 'String');
      }
    }
    return obj;
  }

  /**
   * Example: trackAll
   * @member {String} action
   */
  exports.prototype['action'] = undefined;
  /**
   * Example: trackThreeRatingAction
   * @member {String} callback
   */
  exports.prototype['callback'] = undefined;
  /**
   * Example: 3
   * @member {Number} modifiedValue
   */
  exports.prototype['modifiedValue'] = undefined;
  /**
   * Example: Rate 3/5 for all
   * @member {String} title
   */
  exports.prototype['title'] = undefined;



  return exports;
}));



},{"../ApiClient":9}],69:[function(require,module,exports){
/**
 * quantimodo
 * We make it easy to retrieve and analyze normalized user data from a wide array of devices and applications. Check out our [docs and sdk's](https://github.com/QuantiModo/docs) or [contact us](https://help.quantimo.do).
 *
 * OpenAPI spec version: 5.8.112511
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.3.1
 *
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/ConversionStep', 'model/UnitCategory'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./ConversionStep'), require('./UnitCategory'));
  } else {
    // Browser globals (root is window)
    if (!root.Quantimodo) {
      root.Quantimodo = {};
    }
    root.Quantimodo.Unit = factory(root.Quantimodo.ApiClient, root.Quantimodo.ConversionStep, root.Quantimodo.UnitCategory);
  }
}(this, function(ApiClient, ConversionStep, UnitCategory) {
  'use strict';




  /**
   * The Unit model module.
   * @module model/Unit
   * @version 5.8.112511
   */

  /**
   * Constructs a new <code>Unit</code>.
   * @alias module:model/Unit
   * @class
   * @param abbreviatedName {String} Unit abbreviation
   * @param category {module:model/Unit.CategoryEnum} Unit category
   * @param conversionSteps {Array.<module:model/ConversionStep>} Conversion steps list
   * @param maximumValue {Number} Example: 4
   * @param name {String} Unit name
   * @param unitCategory {module:model/UnitCategory} 
   */
  var exports = function(abbreviatedName, category, conversionSteps, maximumValue, name, unitCategory) {
    var _this = this;

    _this['abbreviatedName'] = abbreviatedName;

    _this['category'] = category;


    _this['conversionSteps'] = conversionSteps;



    _this['maximumValue'] = maximumValue;


    _this['name'] = name;
    _this['unitCategory'] = unitCategory;
  };

  /**
   * Constructs a <code>Unit</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/Unit} obj Optional instance to populate.
   * @return {module:model/Unit} The populated <code>Unit</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('abbreviatedName')) {
        obj['abbreviatedName'] = ApiClient.convertToType(data['abbreviatedName'], 'String');
      }
      if (data.hasOwnProperty('advanced')) {
        obj['advanced'] = ApiClient.convertToType(data['advanced'], 'Number');
      }
      if (data.hasOwnProperty('category')) {
        obj['category'] = ApiClient.convertToType(data['category'], 'String');
      }
      if (data.hasOwnProperty('categoryId')) {
        obj['categoryId'] = ApiClient.convertToType(data['categoryId'], 'Number');
      }
      if (data.hasOwnProperty('categoryName')) {
        obj['categoryName'] = ApiClient.convertToType(data['categoryName'], 'String');
      }
      if (data.hasOwnProperty('conversionSteps')) {
        obj['conversionSteps'] = ApiClient.convertToType(data['conversionSteps'], [ConversionStep]);
      }
      if (data.hasOwnProperty('id')) {
        obj['id'] = ApiClient.convertToType(data['id'], 'Number');
      }
      if (data.hasOwnProperty('manualTracking')) {
        obj['manualTracking'] = ApiClient.convertToType(data['manualTracking'], 'Number');
      }
      if (data.hasOwnProperty('maximumAllowedValue')) {
        obj['maximumAllowedValue'] = ApiClient.convertToType(data['maximumAllowedValue'], 'Number');
      }
      if (data.hasOwnProperty('maximumValue')) {
        obj['maximumValue'] = ApiClient.convertToType(data['maximumValue'], 'Number');
      }
      if (data.hasOwnProperty('minimumAllowedValue')) {
        obj['minimumAllowedValue'] = ApiClient.convertToType(data['minimumAllowedValue'], 'Number');
      }
      if (data.hasOwnProperty('minimumValue')) {
        obj['minimumValue'] = ApiClient.convertToType(data['minimumValue'], 'Number');
      }
      if (data.hasOwnProperty('name')) {
        obj['name'] = ApiClient.convertToType(data['name'], 'String');
      }
      if (data.hasOwnProperty('unitCategory')) {
        obj['unitCategory'] = UnitCategory.constructFromObject(data['unitCategory']);
      }
    }
    return obj;
  }

  /**
   * Unit abbreviation
   * @member {String} abbreviatedName
   */
  exports.prototype['abbreviatedName'] = undefined;
  /**
   * Example: 1
   * @member {Number} advanced
   */
  exports.prototype['advanced'] = undefined;
  /**
   * Unit category
   * @member {module:model/Unit.CategoryEnum} category
   */
  exports.prototype['category'] = undefined;
  /**
   * Example: 6
   * @member {Number} categoryId
   */
  exports.prototype['categoryId'] = undefined;
  /**
   * Example: Miscellany
   * @member {String} categoryName
   */
  exports.prototype['categoryName'] = undefined;
  /**
   * Conversion steps list
   * @member {Array.<module:model/ConversionStep>} conversionSteps
   */
  exports.prototype['conversionSteps'] = undefined;
  /**
   * Example: 29
   * @member {Number} id
   */
  exports.prototype['id'] = undefined;
  /**
   * Example: 0
   * @member {Number} manualTracking
   */
  exports.prototype['manualTracking'] = undefined;
  /**
   * The maximum allowed value for measurements. While you can record a value above this maximum, it will be excluded from the correlation analysis.
   * @member {Number} maximumAllowedValue
   */
  exports.prototype['maximumAllowedValue'] = undefined;
  /**
   * Example: 4
   * @member {Number} maximumValue
   */
  exports.prototype['maximumValue'] = undefined;
  /**
   * The minimum allowed value for measurements. While you can record a value below this minimum, it will be excluded from the correlation analysis.
   * @member {Number} minimumAllowedValue
   */
  exports.prototype['minimumAllowedValue'] = undefined;
  /**
   * Example: 0
   * @member {Number} minimumValue
   */
  exports.prototype['minimumValue'] = undefined;
  /**
   * Unit name
   * @member {String} name
   */
  exports.prototype['name'] = undefined;
  /**
   * @member {module:model/UnitCategory} unitCategory
   */
  exports.prototype['unitCategory'] = undefined;


  /**
   * Allowed values for the <code>category</code> property.
   * @enum {String}
   * @readonly
   */
  exports.CategoryEnum = {
    /**
     * value: "Distance"
     * @const
     */
    "Distance": "Distance",
    /**
     * value: "Duration"
     * @const
     */
    "Duration": "Duration",
    /**
     * value: "Energy"
     * @const
     */
    "Energy": "Energy",
    /**
     * value: "Frequency"
     * @const
     */
    "Frequency": "Frequency",
    /**
     * value: "Miscellany"
     * @const
     */
    "Miscellany": "Miscellany",
    /**
     * value: "Pressure"
     * @const
     */
    "Pressure": "Pressure",
    /**
     * value: "Proportion"
     * @const
     */
    "Proportion": "Proportion",
    /**
     * value: "Rating"
     * @const
     */
    "Rating": "Rating",
    /**
     * value: "Temperature"
     * @const
     */
    "Temperature": "Temperature",
    /**
     * value: "Volume"
     * @const
     */
    "Volume": "Volume",
    /**
     * value: "Weight"
     * @const
     */
    "Weight": "Weight",
    /**
     * value: "Count"
     * @const
     */
    "Count": "Count"  };


  return exports;
}));



},{"../ApiClient":9,"./ConversionStep":29,"./UnitCategory":70}],70:[function(require,module,exports){
/**
 * quantimodo
 * We make it easy to retrieve and analyze normalized user data from a wide array of devices and applications. Check out our [docs and sdk's](https://github.com/QuantiModo/docs) or [contact us](https://help.quantimo.do).
 *
 * OpenAPI spec version: 5.8.112511
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.3.1
 *
 * Do not edit the class manually.
 *
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
    if (!root.Quantimodo) {
      root.Quantimodo = {};
    }
    root.Quantimodo.UnitCategory = factory(root.Quantimodo.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The UnitCategory model module.
   * @module model/UnitCategory
   * @version 5.8.112511
   */

  /**
   * Constructs a new <code>UnitCategory</code>.
   * @alias module:model/UnitCategory
   * @class
   * @param name {String} Category name
   */
  var exports = function(name) {
    var _this = this;


    _this['name'] = name;

  };

  /**
   * Constructs a <code>UnitCategory</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/UnitCategory} obj Optional instance to populate.
   * @return {module:model/UnitCategory} The populated <code>UnitCategory</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('id')) {
        obj['id'] = ApiClient.convertToType(data['id'], 'Number');
      }
      if (data.hasOwnProperty('name')) {
        obj['name'] = ApiClient.convertToType(data['name'], 'String');
      }
      if (data.hasOwnProperty('standardUnitAbbreviatedName')) {
        obj['standardUnitAbbreviatedName'] = ApiClient.convertToType(data['standardUnitAbbreviatedName'], 'String');
      }
    }
    return obj;
  }

  /**
   * id
   * @member {Number} id
   */
  exports.prototype['id'] = undefined;
  /**
   * Category name
   * @member {String} name
   */
  exports.prototype['name'] = undefined;
  /**
   * Base unit for in which measurements are to be converted to and stored
   * @member {String} standardUnitAbbreviatedName
   */
  exports.prototype['standardUnitAbbreviatedName'] = undefined;



  return exports;
}));



},{"../ApiClient":9}],71:[function(require,module,exports){
/**
 * quantimodo
 * We make it easy to retrieve and analyze normalized user data from a wide array of devices and applications. Check out our [docs and sdk's](https://github.com/QuantiModo/docs) or [contact us](https://help.quantimo.do).
 *
 * OpenAPI spec version: 5.8.112511
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.3.1
 *
 * Do not edit the class manually.
 *
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
    if (!root.Quantimodo) {
      root.Quantimodo = {};
    }
    root.Quantimodo.User = factory(root.Quantimodo.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The User model module.
   * @module model/User
   * @version 5.8.112511
   */

  /**
   * Constructs a new <code>User</code>.
   * @alias module:model/User
   * @class
   * @param accessToken {String} User access token
   * @param administrator {Boolean} Is user administrator
   * @param displayName {String} User display name
   * @param email {String} User email
   * @param id {Number} User id
   * @param loginName {String} User login name
   */
  var exports = function(accessToken, administrator, displayName, email, id, loginName) {
    var _this = this;

    _this['accessToken'] = accessToken;


    _this['administrator'] = administrator;






    _this['displayName'] = displayName;

    _this['email'] = email;





    _this['id'] = id;




    _this['loginName'] = loginName;




















  };

  /**
   * Constructs a <code>User</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/User} obj Optional instance to populate.
   * @return {module:model/User} The populated <code>User</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('accessToken')) {
        obj['accessToken'] = ApiClient.convertToType(data['accessToken'], 'String');
      }
      if (data.hasOwnProperty('accessTokenExpires')) {
        obj['accessTokenExpires'] = ApiClient.convertToType(data['accessTokenExpires'], 'String');
      }
      if (data.hasOwnProperty('accessTokenExpiresAtMilliseconds')) {
        obj['accessTokenExpiresAtMilliseconds'] = ApiClient.convertToType(data['accessTokenExpiresAtMilliseconds'], 'Number');
      }
      if (data.hasOwnProperty('administrator')) {
        obj['administrator'] = ApiClient.convertToType(data['administrator'], 'Boolean');
      }
      if (data.hasOwnProperty('avatar')) {
        obj['avatar'] = ApiClient.convertToType(data['avatar'], 'String');
      }
      if (data.hasOwnProperty('avatarImage')) {
        obj['avatarImage'] = ApiClient.convertToType(data['avatarImage'], 'String');
      }
      if (data.hasOwnProperty('capabilities')) {
        obj['capabilities'] = ApiClient.convertToType(data['capabilities'], 'String');
      }
      if (data.hasOwnProperty('clientId')) {
        obj['clientId'] = ApiClient.convertToType(data['clientId'], 'String');
      }
      if (data.hasOwnProperty('clientUserId')) {
        obj['clientUserId'] = ApiClient.convertToType(data['clientUserId'], 'String');
      }
      if (data.hasOwnProperty('combineNotifications')) {
        obj['combineNotifications'] = ApiClient.convertToType(data['combineNotifications'], 'Boolean');
      }
      if (data.hasOwnProperty('displayName')) {
        obj['displayName'] = ApiClient.convertToType(data['displayName'], 'String');
      }
      if (data.hasOwnProperty('earliestReminderTime')) {
        obj['earliestReminderTime'] = ApiClient.convertToType(data['earliestReminderTime'], 'String');
      }
      if (data.hasOwnProperty('email')) {
        obj['email'] = ApiClient.convertToType(data['email'], 'String');
      }
      if (data.hasOwnProperty('firstName')) {
        obj['firstName'] = ApiClient.convertToType(data['firstName'], 'String');
      }
      if (data.hasOwnProperty('getPreviewBuilds')) {
        obj['getPreviewBuilds'] = ApiClient.convertToType(data['getPreviewBuilds'], 'Boolean');
      }
      if (data.hasOwnProperty('hasAndroidApp')) {
        obj['hasAndroidApp'] = ApiClient.convertToType(data['hasAndroidApp'], 'Boolean');
      }
      if (data.hasOwnProperty('hasChromeExtension')) {
        obj['hasChromeExtension'] = ApiClient.convertToType(data['hasChromeExtension'], 'Boolean');
      }
      if (data.hasOwnProperty('hasIosApp')) {
        obj['hasIosApp'] = ApiClient.convertToType(data['hasIosApp'], 'Boolean');
      }
      if (data.hasOwnProperty('id')) {
        obj['id'] = ApiClient.convertToType(data['id'], 'Number');
      }
      if (data.hasOwnProperty('lastFour')) {
        obj['lastFour'] = ApiClient.convertToType(data['lastFour'], 'String');
      }
      if (data.hasOwnProperty('lastName')) {
        obj['lastName'] = ApiClient.convertToType(data['lastName'], 'String');
      }
      if (data.hasOwnProperty('lastSmsTrackingReminderNotificationId')) {
        obj['lastSmsTrackingReminderNotificationId'] = ApiClient.convertToType(data['lastSmsTrackingReminderNotificationId'], 'String');
      }
      if (data.hasOwnProperty('latestReminderTime')) {
        obj['latestReminderTime'] = ApiClient.convertToType(data['latestReminderTime'], 'String');
      }
      if (data.hasOwnProperty('loginName')) {
        obj['loginName'] = ApiClient.convertToType(data['loginName'], 'String');
      }
      if (data.hasOwnProperty('password')) {
        obj['password'] = ApiClient.convertToType(data['password'], 'String');
      }
      if (data.hasOwnProperty('phoneNumber')) {
        obj['phoneNumber'] = ApiClient.convertToType(data['phoneNumber'], 'String');
      }
      if (data.hasOwnProperty('phoneVerificationCode')) {
        obj['phoneVerificationCode'] = ApiClient.convertToType(data['phoneVerificationCode'], 'String');
      }
      if (data.hasOwnProperty('pushNotificationsEnabled')) {
        obj['pushNotificationsEnabled'] = ApiClient.convertToType(data['pushNotificationsEnabled'], 'Boolean');
      }
      if (data.hasOwnProperty('refreshToken')) {
        obj['refreshToken'] = ApiClient.convertToType(data['refreshToken'], 'String');
      }
      if (data.hasOwnProperty('roles')) {
        obj['roles'] = ApiClient.convertToType(data['roles'], 'String');
      }
      if (data.hasOwnProperty('sendPredictorEmails')) {
        obj['sendPredictorEmails'] = ApiClient.convertToType(data['sendPredictorEmails'], 'Boolean');
      }
      if (data.hasOwnProperty('sendReminderNotificationEmails')) {
        obj['sendReminderNotificationEmails'] = ApiClient.convertToType(data['sendReminderNotificationEmails'], 'Boolean');
      }
      if (data.hasOwnProperty('shareAllData')) {
        obj['shareAllData'] = ApiClient.convertToType(data['shareAllData'], 'Boolean');
      }
      if (data.hasOwnProperty('smsNotificationsEnabled')) {
        obj['smsNotificationsEnabled'] = ApiClient.convertToType(data['smsNotificationsEnabled'], 'Boolean');
      }
      if (data.hasOwnProperty('stripeActive')) {
        obj['stripeActive'] = ApiClient.convertToType(data['stripeActive'], 'Boolean');
      }
      if (data.hasOwnProperty('stripeId')) {
        obj['stripeId'] = ApiClient.convertToType(data['stripeId'], 'String');
      }
      if (data.hasOwnProperty('stripePlan')) {
        obj['stripePlan'] = ApiClient.convertToType(data['stripePlan'], 'String');
      }
      if (data.hasOwnProperty('stripeSubscription')) {
        obj['stripeSubscription'] = ApiClient.convertToType(data['stripeSubscription'], 'String');
      }
      if (data.hasOwnProperty('subscriptionEndsAt')) {
        obj['subscriptionEndsAt'] = ApiClient.convertToType(data['subscriptionEndsAt'], 'String');
      }
      if (data.hasOwnProperty('subscriptionProvider')) {
        obj['subscriptionProvider'] = ApiClient.convertToType(data['subscriptionProvider'], 'String');
      }
      if (data.hasOwnProperty('timeZoneOffset')) {
        obj['timeZoneOffset'] = ApiClient.convertToType(data['timeZoneOffset'], 'Number');
      }
      if (data.hasOwnProperty('trackLocation')) {
        obj['trackLocation'] = ApiClient.convertToType(data['trackLocation'], 'Boolean');
      }
      if (data.hasOwnProperty('userRegistered')) {
        obj['userRegistered'] = ApiClient.convertToType(data['userRegistered'], 'String');
      }
      if (data.hasOwnProperty('userUrl')) {
        obj['userUrl'] = ApiClient.convertToType(data['userUrl'], 'String');
      }
    }
    return obj;
  }

  /**
   * User access token
   * @member {String} accessToken
   */
  exports.prototype['accessToken'] = undefined;
  /**
   * Example: 2018-08-08 02:41:19
   * @member {String} accessTokenExpires
   */
  exports.prototype['accessTokenExpires'] = undefined;
  /**
   * Example: 1533696079000
   * @member {Number} accessTokenExpiresAtMilliseconds
   */
  exports.prototype['accessTokenExpiresAtMilliseconds'] = undefined;
  /**
   * Is user administrator
   * @member {Boolean} administrator
   */
  exports.prototype['administrator'] = undefined;
  /**
   * Example: https://lh6.googleusercontent.com/-BHr4hyUWqZU/AAAAAAAAAAI/AAAAAAAIG28/2Lv0en738II/photo.jpg?sz=50
   * @member {String} avatar
   */
  exports.prototype['avatar'] = undefined;
  /**
   * Example: https://lh6.googleusercontent.com/-BHr4hyUWqZU/AAAAAAAAAAI/AAAAAAAIG28/2Lv0en738II/photo.jpg?sz=50
   * @member {String} avatarImage
   */
  exports.prototype['avatarImage'] = undefined;
  /**
   * Example: a:1:{s:13:\"administrator\";b:1;}
   * @member {String} capabilities
   */
  exports.prototype['capabilities'] = undefined;
  /**
   * Example: quantimodo
   * @member {String} clientId
   */
  exports.prototype['clientId'] = undefined;
  /**
   * Example: 118444693184829555362
   * @member {String} clientUserId
   */
  exports.prototype['clientUserId'] = undefined;
  /**
   * Example: 1
   * @member {Boolean} combineNotifications
   */
  exports.prototype['combineNotifications'] = undefined;
  /**
   * User display name
   * @member {String} displayName
   */
  exports.prototype['displayName'] = undefined;
  /**
   * Earliest time user should get notifications. Example: 05:00:00
   * @member {String} earliestReminderTime
   */
  exports.prototype['earliestReminderTime'] = undefined;
  /**
   * User email
   * @member {String} email
   */
  exports.prototype['email'] = undefined;
  /**
   * Example: Mike
   * @member {String} firstName
   */
  exports.prototype['firstName'] = undefined;
  /**
   * Example: false
   * @member {Boolean} getPreviewBuilds
   */
  exports.prototype['getPreviewBuilds'] = undefined;
  /**
   * Example: false
   * @member {Boolean} hasAndroidApp
   */
  exports.prototype['hasAndroidApp'] = undefined;
  /**
   * Example: false
   * @member {Boolean} hasChromeExtension
   */
  exports.prototype['hasChromeExtension'] = undefined;
  /**
   * Example: false
   * @member {Boolean} hasIosApp
   */
  exports.prototype['hasIosApp'] = undefined;
  /**
   * User id
   * @member {Number} id
   */
  exports.prototype['id'] = undefined;
  /**
   * Example: 2009
   * @member {String} lastFour
   */
  exports.prototype['lastFour'] = undefined;
  /**
   * Example: Sinn
   * @member {String} lastName
   */
  exports.prototype['lastName'] = undefined;
  /**
   * Example: 1
   * @member {String} lastSmsTrackingReminderNotificationId
   */
  exports.prototype['lastSmsTrackingReminderNotificationId'] = undefined;
  /**
   * Latest time user should get notifications. Example: 23:00:00
   * @member {String} latestReminderTime
   */
  exports.prototype['latestReminderTime'] = undefined;
  /**
   * User login name
   * @member {String} loginName
   */
  exports.prototype['loginName'] = undefined;
  /**
   * Example: PASSWORD
   * @member {String} password
   */
  exports.prototype['password'] = undefined;
  /**
   * Example: 618-391-0002
   * @member {String} phoneNumber
   */
  exports.prototype['phoneNumber'] = undefined;
  /**
   * Example: 1234
   * @member {String} phoneVerificationCode
   */
  exports.prototype['phoneVerificationCode'] = undefined;
  /**
   * Example: 1
   * @member {Boolean} pushNotificationsEnabled
   */
  exports.prototype['pushNotificationsEnabled'] = undefined;
  /**
   * Example: 6e99b113d85586de1f92468433f2df1e666647cb
   * @member {String} refreshToken
   */
  exports.prototype['refreshToken'] = undefined;
  /**
   * Example: [\"admin\"]
   * @member {String} roles
   */
  exports.prototype['roles'] = undefined;
  /**
   * Example: 1
   * @member {Boolean} sendPredictorEmails
   */
  exports.prototype['sendPredictorEmails'] = undefined;
  /**
   * Example: 1
   * @member {Boolean} sendReminderNotificationEmails
   */
  exports.prototype['sendReminderNotificationEmails'] = undefined;
  /**
   * Share all studies, charts, and measurement data with all other users
   * @member {Boolean} shareAllData
   */
  exports.prototype['shareAllData'] = undefined;
  /**
   * Example: false
   * @member {Boolean} smsNotificationsEnabled
   */
  exports.prototype['smsNotificationsEnabled'] = undefined;
  /**
   * Example: 1
   * @member {Boolean} stripeActive
   */
  exports.prototype['stripeActive'] = undefined;
  /**
   * Example: cus_A8CEmcvl8jwLhV
   * @member {String} stripeId
   */
  exports.prototype['stripeId'] = undefined;
  /**
   * Example: monthly7
   * @member {String} stripePlan
   */
  exports.prototype['stripePlan'] = undefined;
  /**
   * Example: sub_ANTx3nOE7nzjQf
   * @member {String} stripeSubscription
   */
  exports.prototype['stripeSubscription'] = undefined;
  /**
   * UTC ISO 8601 YYYY-MM-DDThh:mm:ss
   * @member {String} subscriptionEndsAt
   */
  exports.prototype['subscriptionEndsAt'] = undefined;
  /**
   * Example: google
   * @member {String} subscriptionProvider
   */
  exports.prototype['subscriptionProvider'] = undefined;
  /**
   * Example: 300
   * @member {Number} timeZoneOffset
   */
  exports.prototype['timeZoneOffset'] = undefined;
  /**
   * Example: 1
   * @member {Boolean} trackLocation
   */
  exports.prototype['trackLocation'] = undefined;
  /**
   * Example: 2013-12-03 15:25:13 UTC ISO 8601 YYYY-MM-DDThh:mm:ss
   * @member {String} userRegistered
   */
  exports.prototype['userRegistered'] = undefined;
  /**
   * Example: https://plus.google.com/+MikeSinn
   * @member {String} userUrl
   */
  exports.prototype['userUrl'] = undefined;



  return exports;
}));



},{"../ApiClient":9}],72:[function(require,module,exports){
/**
 * quantimodo
 * We make it easy to retrieve and analyze normalized user data from a wide array of devices and applications. Check out our [docs and sdk's](https://github.com/QuantiModo/docs) or [contact us](https://help.quantimo.do).
 *
 * OpenAPI spec version: 5.8.112511
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.3.1
 *
 * Do not edit the class manually.
 *
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
    if (!root.Quantimodo) {
      root.Quantimodo = {};
    }
    root.Quantimodo.UserTag = factory(root.Quantimodo.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The UserTag model module.
   * @module model/UserTag
   * @version 5.8.112511
   */

  /**
   * Constructs a new <code>UserTag</code>.
   * @alias module:model/UserTag
   * @class
   * @param conversionFactor {Number} Number by which we multiply the tagged variable value to obtain the tag variable (ingredient) value
   * @param taggedVariableId {Number} This is the id of the variable being tagged with an ingredient or something.
   * @param tagVariableId {Number} This is the id of the ingredient variable whose value is determined based on the value of the tagged variable.
   */
  var exports = function(conversionFactor, taggedVariableId, tagVariableId) {
    var _this = this;

    _this['conversionFactor'] = conversionFactor;
    _this['taggedVariableId'] = taggedVariableId;
    _this['tagVariableId'] = tagVariableId;
  };

  /**
   * Constructs a <code>UserTag</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/UserTag} obj Optional instance to populate.
   * @return {module:model/UserTag} The populated <code>UserTag</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('conversionFactor')) {
        obj['conversionFactor'] = ApiClient.convertToType(data['conversionFactor'], 'Number');
      }
      if (data.hasOwnProperty('taggedVariableId')) {
        obj['taggedVariableId'] = ApiClient.convertToType(data['taggedVariableId'], 'Number');
      }
      if (data.hasOwnProperty('tagVariableId')) {
        obj['tagVariableId'] = ApiClient.convertToType(data['tagVariableId'], 'Number');
      }
    }
    return obj;
  }

  /**
   * Number by which we multiply the tagged variable value to obtain the tag variable (ingredient) value
   * @member {Number} conversionFactor
   */
  exports.prototype['conversionFactor'] = undefined;
  /**
   * This is the id of the variable being tagged with an ingredient or something.
   * @member {Number} taggedVariableId
   */
  exports.prototype['taggedVariableId'] = undefined;
  /**
   * This is the id of the ingredient variable whose value is determined based on the value of the tagged variable.
   * @member {Number} tagVariableId
   */
  exports.prototype['tagVariableId'] = undefined;



  return exports;
}));



},{"../ApiClient":9}],73:[function(require,module,exports){
/**
 * quantimodo
 * We make it easy to retrieve and analyze normalized user data from a wide array of devices and applications. Check out our [docs and sdk's](https://github.com/QuantiModo/docs) or [contact us](https://help.quantimo.do).
 *
 * OpenAPI spec version: 5.8.112511
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.3.1
 *
 * Do not edit the class manually.
 *
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
    if (!root.Quantimodo) {
      root.Quantimodo = {};
    }
    root.Quantimodo.UserVariableDelete = factory(root.Quantimodo.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The UserVariableDelete model module.
   * @module model/UserVariableDelete
   * @version 5.8.112511
   */

  /**
   * Constructs a new <code>UserVariableDelete</code>.
   * @alias module:model/UserVariableDelete
   * @class
   * @param variableId {Number} Id of the variable whose measurements should be deleted
   */
  var exports = function(variableId) {
    var _this = this;

    _this['variableId'] = variableId;
  };

  /**
   * Constructs a <code>UserVariableDelete</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/UserVariableDelete} obj Optional instance to populate.
   * @return {module:model/UserVariableDelete} The populated <code>UserVariableDelete</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('variableId')) {
        obj['variableId'] = ApiClient.convertToType(data['variableId'], 'Number');
      }
    }
    return obj;
  }

  /**
   * Id of the variable whose measurements should be deleted
   * @member {Number} variableId
   */
  exports.prototype['variableId'] = undefined;



  return exports;
}));



},{"../ApiClient":9}],74:[function(require,module,exports){
/**
 * quantimodo
 * We make it easy to retrieve and analyze normalized user data from a wide array of devices and applications. Check out our [docs and sdk's](https://github.com/QuantiModo/docs) or [contact us](https://help.quantimo.do).
 *
 * OpenAPI spec version: 5.8.112511
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.3.1
 *
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/DataSource', 'model/TrackingReminderNotificationAction', 'model/Unit', 'model/Variable', 'model/VariableCategory', 'model/VariableCharts'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./DataSource'), require('./TrackingReminderNotificationAction'), require('./Unit'), require('./Variable'), require('./VariableCategory'), require('./VariableCharts'));
  } else {
    // Browser globals (root is window)
    if (!root.Quantimodo) {
      root.Quantimodo = {};
    }
    root.Quantimodo.Variable = factory(root.Quantimodo.ApiClient, root.Quantimodo.DataSource, root.Quantimodo.TrackingReminderNotificationAction, root.Quantimodo.Unit, root.Quantimodo.Variable, root.Quantimodo.VariableCategory, root.Quantimodo.VariableCharts);
  }
}(this, function(ApiClient, DataSource, TrackingReminderNotificationAction, Unit, Variable, VariableCategory, VariableCharts) {
  'use strict';




  /**
   * The Variable model module.
   * @module model/Variable
   * @version 5.8.112511
   */

  /**
   * Constructs a new <code>Variable</code>.
   * @alias module:model/Variable
   * @class
   * @param id {Number} Example: 95614
   * @param name {String} Example: Trader Joes Bedtime Tea / Sleepytime Tea (any Brand)
   * @param userId {Number} User ID
   * @param variableId {Number} Example: 96380
   */
  var exports = function(id, name, userId, variableId) {
    var _this = this;












































    _this['id'] = id;






































    _this['name'] = name;









































    _this['userId'] = userId;

























    _this['variableId'] = variableId;



  };

  /**
   * Constructs a <code>Variable</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/Variable} obj Optional instance to populate.
   * @return {module:model/Variable} The populated <code>Variable</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('actionArray')) {
        obj['actionArray'] = ApiClient.convertToType(data['actionArray'], [TrackingReminderNotificationAction]);
      }
      if (data.hasOwnProperty('alias')) {
        obj['alias'] = ApiClient.convertToType(data['alias'], 'String');
      }
      if (data.hasOwnProperty('availableUnits')) {
        obj['availableUnits'] = ApiClient.convertToType(data['availableUnits'], [Unit]);
      }
      if (data.hasOwnProperty('causeOnly')) {
        obj['causeOnly'] = ApiClient.convertToType(data['causeOnly'], 'Boolean');
      }
      if (data.hasOwnProperty('charts')) {
        obj['charts'] = VariableCharts.constructFromObject(data['charts']);
      }
      if (data.hasOwnProperty('chartsLinkDynamic')) {
        obj['chartsLinkDynamic'] = ApiClient.convertToType(data['chartsLinkDynamic'], 'String');
      }
      if (data.hasOwnProperty('chartsLinkEmail')) {
        obj['chartsLinkEmail'] = ApiClient.convertToType(data['chartsLinkEmail'], 'String');
      }
      if (data.hasOwnProperty('chartsLinkFacebook')) {
        obj['chartsLinkFacebook'] = ApiClient.convertToType(data['chartsLinkFacebook'], 'String');
      }
      if (data.hasOwnProperty('chartsLinkGoogle')) {
        obj['chartsLinkGoogle'] = ApiClient.convertToType(data['chartsLinkGoogle'], 'String');
      }
      if (data.hasOwnProperty('chartsLinkStatic')) {
        obj['chartsLinkStatic'] = ApiClient.convertToType(data['chartsLinkStatic'], 'String');
      }
      if (data.hasOwnProperty('chartsLinkTwitter')) {
        obj['chartsLinkTwitter'] = ApiClient.convertToType(data['chartsLinkTwitter'], 'String');
      }
      if (data.hasOwnProperty('childCommonTagVariables')) {
        obj['childCommonTagVariables'] = ApiClient.convertToType(data['childCommonTagVariables'], [Variable]);
      }
      if (data.hasOwnProperty('childUserTagVariables')) {
        obj['childUserTagVariables'] = ApiClient.convertToType(data['childUserTagVariables'], [Variable]);
      }
      if (data.hasOwnProperty('clientId')) {
        obj['clientId'] = ApiClient.convertToType(data['clientId'], 'String');
      }
      if (data.hasOwnProperty('combinationOperation')) {
        obj['combinationOperation'] = ApiClient.convertToType(data['combinationOperation'], 'String');
      }
      if (data.hasOwnProperty('commonAlias')) {
        obj['commonAlias'] = ApiClient.convertToType(data['commonAlias'], 'String');
      }
      if (data.hasOwnProperty('commonTaggedVariables')) {
        obj['commonTaggedVariables'] = ApiClient.convertToType(data['commonTaggedVariables'], [Variable]);
      }
      if (data.hasOwnProperty('commonTagVariables')) {
        obj['commonTagVariables'] = ApiClient.convertToType(data['commonTagVariables'], [Variable]);
      }
      if (data.hasOwnProperty('commonVariableMostCommonConnectorId')) {
        obj['commonVariableMostCommonConnectorId'] = ApiClient.convertToType(data['commonVariableMostCommonConnectorId'], 'Number');
      }
      if (data.hasOwnProperty('commonVariableUpdatedAt')) {
        obj['commonVariableUpdatedAt'] = ApiClient.convertToType(data['commonVariableUpdatedAt'], 'String');
      }
      if (data.hasOwnProperty('createdAt')) {
        obj['createdAt'] = ApiClient.convertToType(data['createdAt'], 'String');
      }
      if (data.hasOwnProperty('unitAbbreviatedName')) {
        obj['unitAbbreviatedName'] = ApiClient.convertToType(data['unitAbbreviatedName'], 'String');
      }
      if (data.hasOwnProperty('unitCategoryId')) {
        obj['unitCategoryId'] = ApiClient.convertToType(data['unitCategoryId'], 'Number');
      }
      if (data.hasOwnProperty('unitCategoryName')) {
        obj['unitCategoryName'] = ApiClient.convertToType(data['unitCategoryName'], 'String');
      }
      if (data.hasOwnProperty('unitId')) {
        obj['unitId'] = ApiClient.convertToType(data['unitId'], 'Number');
      }
      if (data.hasOwnProperty('unitName')) {
        obj['unitName'] = ApiClient.convertToType(data['unitName'], 'String');
      }
      if (data.hasOwnProperty('description')) {
        obj['description'] = ApiClient.convertToType(data['description'], 'String');
      }
      if (data.hasOwnProperty('displayName')) {
        obj['displayName'] = ApiClient.convertToType(data['displayName'], 'String');
      }
      if (data.hasOwnProperty('durationOfAction')) {
        obj['durationOfAction'] = ApiClient.convertToType(data['durationOfAction'], 'Number');
      }
      if (data.hasOwnProperty('durationOfActionInHours')) {
        obj['durationOfActionInHours'] = ApiClient.convertToType(data['durationOfActionInHours'], 'Number');
      }
      if (data.hasOwnProperty('earliestFillingTime')) {
        obj['earliestFillingTime'] = ApiClient.convertToType(data['earliestFillingTime'], 'Number');
      }
      if (data.hasOwnProperty('earliestMeasurementTime')) {
        obj['earliestMeasurementTime'] = ApiClient.convertToType(data['earliestMeasurementTime'], 'Number');
      }
      if (data.hasOwnProperty('earliestSourceTime')) {
        obj['earliestSourceTime'] = ApiClient.convertToType(data['earliestSourceTime'], 'Number');
      }
      if (data.hasOwnProperty('errorMessage')) {
        obj['errorMessage'] = ApiClient.convertToType(data['errorMessage'], 'String');
      }
      if (data.hasOwnProperty('experimentEndTime')) {
        obj['experimentEndTime'] = ApiClient.convertToType(data['experimentEndTime'], 'String');
      }
      if (data.hasOwnProperty('experimentEndTimeSeconds')) {
        obj['experimentEndTimeSeconds'] = ApiClient.convertToType(data['experimentEndTimeSeconds'], 'Number');
      }
      if (data.hasOwnProperty('experimentEndTimeString')) {
        obj['experimentEndTimeString'] = ApiClient.convertToType(data['experimentEndTimeString'], 'String');
      }
      if (data.hasOwnProperty('experimentStartTime')) {
        obj['experimentStartTime'] = ApiClient.convertToType(data['experimentStartTime'], 'String');
      }
      if (data.hasOwnProperty('experimentStartTimeSeconds')) {
        obj['experimentStartTimeSeconds'] = ApiClient.convertToType(data['experimentStartTimeSeconds'], 'Number');
      }
      if (data.hasOwnProperty('experimentStartTimeString')) {
        obj['experimentStartTimeString'] = ApiClient.convertToType(data['experimentStartTimeString'], 'String');
      }
      if (data.hasOwnProperty('fillingType')) {
        obj['fillingType'] = ApiClient.convertToType(data['fillingType'], 'String');
      }
      if (data.hasOwnProperty('fillingValue')) {
        obj['fillingValue'] = ApiClient.convertToType(data['fillingValue'], 'Number');
      }
      if (data.hasOwnProperty('iconIcon')) {
        obj['iconIcon'] = ApiClient.convertToType(data['iconIcon'], 'String');
      }
      if (data.hasOwnProperty('id')) {
        obj['id'] = ApiClient.convertToType(data['id'], 'Number');
      }
      if (data.hasOwnProperty('imageUrl')) {
        obj['imageUrl'] = ApiClient.convertToType(data['imageUrl'], 'String');
      }
      if (data.hasOwnProperty('informationalUrl')) {
        obj['informationalUrl'] = ApiClient.convertToType(data['informationalUrl'], 'String');
      }
      if (data.hasOwnProperty('ingredientOfCommonTagVariables')) {
        obj['ingredientOfCommonTagVariables'] = ApiClient.convertToType(data['ingredientOfCommonTagVariables'], [Variable]);
      }
      if (data.hasOwnProperty('ingredientCommonTagVariables')) {
        obj['ingredientCommonTagVariables'] = ApiClient.convertToType(data['ingredientCommonTagVariables'], [Variable]);
      }
      if (data.hasOwnProperty('ingredientOfUserTagVariables')) {
        obj['ingredientOfUserTagVariables'] = ApiClient.convertToType(data['ingredientOfUserTagVariables'], [Variable]);
      }
      if (data.hasOwnProperty('ingredientUserTagVariables')) {
        obj['ingredientUserTagVariables'] = ApiClient.convertToType(data['ingredientUserTagVariables'], [Variable]);
      }
      if (data.hasOwnProperty('inputType')) {
        obj['inputType'] = ApiClient.convertToType(data['inputType'], 'String');
      }
      if (data.hasOwnProperty('ionIcon')) {
        obj['ionIcon'] = ApiClient.convertToType(data['ionIcon'], 'String');
      }
      if (data.hasOwnProperty('joinedCommonTagVariables')) {
        obj['joinedCommonTagVariables'] = ApiClient.convertToType(data['joinedCommonTagVariables'], [Variable]);
      }
      if (data.hasOwnProperty('joinedUserTagVariables')) {
        obj['joinedUserTagVariables'] = ApiClient.convertToType(data['joinedUserTagVariables'], [Variable]);
      }
      if (data.hasOwnProperty('joinWith')) {
        obj['joinWith'] = ApiClient.convertToType(data['joinWith'], 'Number');
      }
      if (data.hasOwnProperty('kurtosis')) {
        obj['kurtosis'] = ApiClient.convertToType(data['kurtosis'], 'Number');
      }
      if (data.hasOwnProperty('lastOriginalUnitId')) {
        obj['lastOriginalUnitId'] = ApiClient.convertToType(data['lastOriginalUnitId'], 'Number');
      }
      if (data.hasOwnProperty('lastOriginalValue')) {
        obj['lastOriginalValue'] = ApiClient.convertToType(data['lastOriginalValue'], 'Number');
      }
      if (data.hasOwnProperty('lastProcessedDailyValue')) {
        obj['lastProcessedDailyValue'] = ApiClient.convertToType(data['lastProcessedDailyValue'], 'Number');
      }
      if (data.hasOwnProperty('lastSuccessfulUpdateTime')) {
        obj['lastSuccessfulUpdateTime'] = ApiClient.convertToType(data['lastSuccessfulUpdateTime'], 'String');
      }
      if (data.hasOwnProperty('lastUnitId')) {
        obj['lastUnitId'] = ApiClient.convertToType(data['lastUnitId'], 'Number');
      }
      if (data.hasOwnProperty('lastValue')) {
        obj['lastValue'] = ApiClient.convertToType(data['lastValue'], 'Number');
      }
      if (data.hasOwnProperty('latestFillingTime')) {
        obj['latestFillingTime'] = ApiClient.convertToType(data['latestFillingTime'], 'Number');
      }
      if (data.hasOwnProperty('latestMeasurementTime')) {
        obj['latestMeasurementTime'] = ApiClient.convertToType(data['latestMeasurementTime'], 'Number');
      }
      if (data.hasOwnProperty('latestSourceTime')) {
        obj['latestSourceTime'] = ApiClient.convertToType(data['latestSourceTime'], 'Number');
      }
      if (data.hasOwnProperty('latestUserMeasurementTime')) {
        obj['latestUserMeasurementTime'] = ApiClient.convertToType(data['latestUserMeasurementTime'], 'Number');
      }
      if (data.hasOwnProperty('latitude')) {
        obj['latitude'] = ApiClient.convertToType(data['latitude'], 'Number');
      }
      if (data.hasOwnProperty('location')) {
        obj['location'] = ApiClient.convertToType(data['location'], 'String');
      }
      if (data.hasOwnProperty('longitude')) {
        obj['longitude'] = ApiClient.convertToType(data['longitude'], 'Number');
      }
      if (data.hasOwnProperty('manualTracking')) {
        obj['manualTracking'] = ApiClient.convertToType(data['manualTracking'], 'Boolean');
      }
      if (data.hasOwnProperty('maximumAllowedValue')) {
        obj['maximumAllowedValue'] = ApiClient.convertToType(data['maximumAllowedValue'], 'Number');
      }
      if (data.hasOwnProperty('maximumRecordedDailyValue')) {
        obj['maximumRecordedDailyValue'] = ApiClient.convertToType(data['maximumRecordedDailyValue'], 'Number');
      }
      if (data.hasOwnProperty('maximumRecordedValue')) {
        obj['maximumRecordedValue'] = ApiClient.convertToType(data['maximumRecordedValue'], 'Number');
      }
      if (data.hasOwnProperty('mean')) {
        obj['mean'] = ApiClient.convertToType(data['mean'], 'Number');
      }
      if (data.hasOwnProperty('measurementsAtLastAnalysis')) {
        obj['measurementsAtLastAnalysis'] = ApiClient.convertToType(data['measurementsAtLastAnalysis'], 'Number');
      }
      if (data.hasOwnProperty('median')) {
        obj['median'] = ApiClient.convertToType(data['median'], 'Number');
      }
      if (data.hasOwnProperty('minimumAllowedValue')) {
        obj['minimumAllowedValue'] = ApiClient.convertToType(data['minimumAllowedValue'], 'Number');
      }
      if (data.hasOwnProperty('minimumRecordedValue')) {
        obj['minimumRecordedValue'] = ApiClient.convertToType(data['minimumRecordedValue'], 'Number');
      }
      if (data.hasOwnProperty('mostCommonConnectorId')) {
        obj['mostCommonConnectorId'] = ApiClient.convertToType(data['mostCommonConnectorId'], 'Number');
      }
      if (data.hasOwnProperty('mostCommonOriginalUnitId')) {
        obj['mostCommonOriginalUnitId'] = ApiClient.convertToType(data['mostCommonOriginalUnitId'], 'Number');
      }
      if (data.hasOwnProperty('mostCommonUnitId')) {
        obj['mostCommonUnitId'] = ApiClient.convertToType(data['mostCommonUnitId'], 'Number');
      }
      if (data.hasOwnProperty('mostCommonValue')) {
        obj['mostCommonValue'] = ApiClient.convertToType(data['mostCommonValue'], 'Number');
      }
      if (data.hasOwnProperty('name')) {
        obj['name'] = ApiClient.convertToType(data['name'], 'String');
      }
      if (data.hasOwnProperty('numberOfAggregateCorrelationsAsCause')) {
        obj['numberOfAggregateCorrelationsAsCause'] = ApiClient.convertToType(data['numberOfAggregateCorrelationsAsCause'], 'Number');
      }
      if (data.hasOwnProperty('numberOfAggregateCorrelationsAsEffect')) {
        obj['numberOfAggregateCorrelationsAsEffect'] = ApiClient.convertToType(data['numberOfAggregateCorrelationsAsEffect'], 'Number');
      }
      if (data.hasOwnProperty('numberOfChanges')) {
        obj['numberOfChanges'] = ApiClient.convertToType(data['numberOfChanges'], 'Number');
      }
      if (data.hasOwnProperty('numberOfCorrelations')) {
        obj['numberOfCorrelations'] = ApiClient.convertToType(data['numberOfCorrelations'], 'Number');
      }
      if (data.hasOwnProperty('numberOfProcessedDailyMeasurements')) {
        obj['numberOfProcessedDailyMeasurements'] = ApiClient.convertToType(data['numberOfProcessedDailyMeasurements'], 'Number');
      }
      if (data.hasOwnProperty('numberOfRawMeasurements')) {
        obj['numberOfRawMeasurements'] = ApiClient.convertToType(data['numberOfRawMeasurements'], 'Number');
      }
      if (data.hasOwnProperty('numberOfTrackingReminders')) {
        obj['numberOfTrackingReminders'] = ApiClient.convertToType(data['numberOfTrackingReminders'], 'Number');
      }
      if (data.hasOwnProperty('numberOfUniqueDailyValues')) {
        obj['numberOfUniqueDailyValues'] = ApiClient.convertToType(data['numberOfUniqueDailyValues'], 'Number');
      }
      if (data.hasOwnProperty('numberOfUniqueValues')) {
        obj['numberOfUniqueValues'] = ApiClient.convertToType(data['numberOfUniqueValues'], 'Number');
      }
      if (data.hasOwnProperty('numberOfUserCorrelationsAsCause')) {
        obj['numberOfUserCorrelationsAsCause'] = ApiClient.convertToType(data['numberOfUserCorrelationsAsCause'], 'Number');
      }
      if (data.hasOwnProperty('numberOfUserCorrelationsAsEffect')) {
        obj['numberOfUserCorrelationsAsEffect'] = ApiClient.convertToType(data['numberOfUserCorrelationsAsEffect'], 'Number');
      }
      if (data.hasOwnProperty('numberOfUserVariables')) {
        obj['numberOfUserVariables'] = ApiClient.convertToType(data['numberOfUserVariables'], 'Number');
      }
      if (data.hasOwnProperty('onsetDelay')) {
        obj['onsetDelay'] = ApiClient.convertToType(data['onsetDelay'], 'Number');
      }
      if (data.hasOwnProperty('onsetDelayInHours')) {
        obj['onsetDelayInHours'] = ApiClient.convertToType(data['onsetDelayInHours'], 'Number');
      }
      if (data.hasOwnProperty('outcome')) {
        obj['outcome'] = ApiClient.convertToType(data['outcome'], 'Boolean');
      }
      if (data.hasOwnProperty('outcomeOfInterest')) {
        obj['outcomeOfInterest'] = ApiClient.convertToType(data['outcomeOfInterest'], 'Number');
      }
      if (data.hasOwnProperty('parentCommonTagVariables')) {
        obj['parentCommonTagVariables'] = ApiClient.convertToType(data['parentCommonTagVariables'], [Variable]);
      }
      if (data.hasOwnProperty('parentUserTagVariables')) {
        obj['parentUserTagVariables'] = ApiClient.convertToType(data['parentUserTagVariables'], [Variable]);
      }
      if (data.hasOwnProperty('pngPath')) {
        obj['pngPath'] = ApiClient.convertToType(data['pngPath'], 'String');
      }
      if (data.hasOwnProperty('pngUrl')) {
        obj['pngUrl'] = ApiClient.convertToType(data['pngUrl'], 'String');
      }
      if (data.hasOwnProperty('predictorOfInterest')) {
        obj['predictorOfInterest'] = ApiClient.convertToType(data['predictorOfInterest'], 'Number');
      }
      if (data.hasOwnProperty('price')) {
        obj['price'] = ApiClient.convertToType(data['price'], 'Number');
      }
      if (data.hasOwnProperty('productUrl')) {
        obj['productUrl'] = ApiClient.convertToType(data['productUrl'], 'String');
      }
      if (data.hasOwnProperty('public')) {
        obj['public'] = ApiClient.convertToType(data['public'], 'Number');
      }
      if (data.hasOwnProperty('rawMeasurementsAtLastAnalysis')) {
        obj['rawMeasurementsAtLastAnalysis'] = ApiClient.convertToType(data['rawMeasurementsAtLastAnalysis'], 'Number');
      }
      if (data.hasOwnProperty('secondMostCommonValue')) {
        obj['secondMostCommonValue'] = ApiClient.convertToType(data['secondMostCommonValue'], 'Number');
      }
      if (data.hasOwnProperty('secondToLastValue')) {
        obj['secondToLastValue'] = ApiClient.convertToType(data['secondToLastValue'], 'Number');
      }
      if (data.hasOwnProperty('shareUserMeasurements')) {
        obj['shareUserMeasurements'] = ApiClient.convertToType(data['shareUserMeasurements'], 'Boolean');
      }
      if (data.hasOwnProperty('skewness')) {
        obj['skewness'] = ApiClient.convertToType(data['skewness'], 'Number');
      }
      if (data.hasOwnProperty('sources')) {
        obj['sources'] = ApiClient.convertToType(data['sources'], 'String');
      }
      if (data.hasOwnProperty('standardDeviation')) {
        obj['standardDeviation'] = ApiClient.convertToType(data['standardDeviation'], 'Number');
      }
      if (data.hasOwnProperty('status')) {
        obj['status'] = ApiClient.convertToType(data['status'], 'String');
      }
      if (data.hasOwnProperty('subtitle')) {
        obj['subtitle'] = ApiClient.convertToType(data['subtitle'], 'String');
      }
      if (data.hasOwnProperty('svgUrl')) {
        obj['svgUrl'] = ApiClient.convertToType(data['svgUrl'], 'String');
      }
      if (data.hasOwnProperty('thirdMostCommonValue')) {
        obj['thirdMostCommonValue'] = ApiClient.convertToType(data['thirdMostCommonValue'], 'Number');
      }
      if (data.hasOwnProperty('thirdToLastValue')) {
        obj['thirdToLastValue'] = ApiClient.convertToType(data['thirdToLastValue'], 'Number');
      }
      if (data.hasOwnProperty('unit')) {
        obj['unit'] = Unit.constructFromObject(data['unit']);
      }
      if (data.hasOwnProperty('upc')) {
        obj['upc'] = ApiClient.convertToType(data['upc'], 'String');
      }
      if (data.hasOwnProperty('updated')) {
        obj['updated'] = ApiClient.convertToType(data['updated'], 'Number');
      }
      if (data.hasOwnProperty('updatedAt')) {
        obj['updatedAt'] = ApiClient.convertToType(data['updatedAt'], 'String');
      }
      if (data.hasOwnProperty('updatedTime')) {
        obj['updatedTime'] = ApiClient.convertToType(data['updatedTime'], 'String');
      }
      if (data.hasOwnProperty('userId')) {
        obj['userId'] = ApiClient.convertToType(data['userId'], 'Number');
      }
      if (data.hasOwnProperty('userTaggedVariables')) {
        obj['userTaggedVariables'] = ApiClient.convertToType(data['userTaggedVariables'], [Variable]);
      }
      if (data.hasOwnProperty('userTagVariables')) {
        obj['userTagVariables'] = ApiClient.convertToType(data['userTagVariables'], [Variable]);
      }
      if (data.hasOwnProperty('userVariableUnitAbbreviatedName')) {
        obj['userVariableUnitAbbreviatedName'] = ApiClient.convertToType(data['userVariableUnitAbbreviatedName'], 'String');
      }
      if (data.hasOwnProperty('userVariableUnitCategoryId')) {
        obj['userVariableUnitCategoryId'] = ApiClient.convertToType(data['userVariableUnitCategoryId'], 'Number');
      }
      if (data.hasOwnProperty('userVariableUnitCategoryName')) {
        obj['userVariableUnitCategoryName'] = ApiClient.convertToType(data['userVariableUnitCategoryName'], 'String');
      }
      if (data.hasOwnProperty('userVariableUnitId')) {
        obj['userVariableUnitId'] = ApiClient.convertToType(data['userVariableUnitId'], 'Number');
      }
      if (data.hasOwnProperty('userVariableUnitName')) {
        obj['userVariableUnitName'] = ApiClient.convertToType(data['userVariableUnitName'], 'String');
      }
      if (data.hasOwnProperty('userVariableFillingValue')) {
        obj['userVariableFillingValue'] = ApiClient.convertToType(data['userVariableFillingValue'], 'Number');
      }
      if (data.hasOwnProperty('userVariableMostCommonConnectorId')) {
        obj['userVariableMostCommonConnectorId'] = ApiClient.convertToType(data['userVariableMostCommonConnectorId'], 'Number');
      }
      if (data.hasOwnProperty('userVariableUpdatedAt')) {
        obj['userVariableUpdatedAt'] = ApiClient.convertToType(data['userVariableUpdatedAt'], 'String');
      }
      if (data.hasOwnProperty('userVariableValence')) {
        obj['userVariableValence'] = ApiClient.convertToType(data['userVariableValence'], 'String');
      }
      if (data.hasOwnProperty('userVariableVariableCategoryId')) {
        obj['userVariableVariableCategoryId'] = ApiClient.convertToType(data['userVariableVariableCategoryId'], 'Number');
      }
      if (data.hasOwnProperty('userVariableVariableCategoryName')) {
        obj['userVariableVariableCategoryName'] = ApiClient.convertToType(data['userVariableVariableCategoryName'], 'String');
      }
      if (data.hasOwnProperty('userVariableWikipediaTitle')) {
        obj['userVariableWikipediaTitle'] = ApiClient.convertToType(data['userVariableWikipediaTitle'], 'String');
      }
      if (data.hasOwnProperty('variableCategory')) {
        obj['variableCategory'] = VariableCategory.constructFromObject(data['variableCategory']);
      }
      if (data.hasOwnProperty('dataSource')) {
        obj['dataSource'] = DataSource.constructFromObject(data['dataSource']);
      }
      if (data.hasOwnProperty('joinedVariables')) {
        obj['joinedVariables'] = ApiClient.convertToType(data['joinedVariables'], [Variable]);
      }
      if (data.hasOwnProperty('lastSource')) {
        obj['lastSource'] = ApiClient.convertToType(data['lastSource'], 'Number');
      }
      if (data.hasOwnProperty('lastUnit')) {
        obj['lastUnit'] = ApiClient.convertToType(data['lastUnit'], 'String');
      }
      if (data.hasOwnProperty('mostCommonUnit')) {
        obj['mostCommonUnit'] = ApiClient.convertToType(data['mostCommonUnit'], 'String');
      }
      if (data.hasOwnProperty('valence')) {
        obj['valence'] = ApiClient.convertToType(data['valence'], 'String');
      }
      if (data.hasOwnProperty('variableCategoryId')) {
        obj['variableCategoryId'] = ApiClient.convertToType(data['variableCategoryId'], 'Number');
      }
      if (data.hasOwnProperty('variableCategoryImageUrl')) {
        obj['variableCategoryImageUrl'] = ApiClient.convertToType(data['variableCategoryImageUrl'], 'String');
      }
      if (data.hasOwnProperty('variableCategoryName')) {
        obj['variableCategoryName'] = ApiClient.convertToType(data['variableCategoryName'], 'String');
      }
      if (data.hasOwnProperty('variableFillingValue')) {
        obj['variableFillingValue'] = ApiClient.convertToType(data['variableFillingValue'], 'Number');
      }
      if (data.hasOwnProperty('variableId')) {
        obj['variableId'] = ApiClient.convertToType(data['variableId'], 'Number');
      }
      if (data.hasOwnProperty('variableName')) {
        obj['variableName'] = ApiClient.convertToType(data['variableName'], 'String');
      }
      if (data.hasOwnProperty('variance')) {
        obj['variance'] = ApiClient.convertToType(data['variance'], 'Number');
      }
      if (data.hasOwnProperty('wikipediaTitle')) {
        obj['wikipediaTitle'] = ApiClient.convertToType(data['wikipediaTitle'], 'String');
      }
    }
    return obj;
  }

  /**
   * @member {Array.<module:model/TrackingReminderNotificationAction>} actionArray
   */
  exports.prototype['actionArray'] = undefined;
  /**
   * Alternative name
   * @member {String} alias
   */
  exports.prototype['alias'] = undefined;
  /**
   * @member {Array.<module:model/Unit>} availableUnits
   */
  exports.prototype['availableUnits'] = undefined;
  /**
   * A value of 1 indicates that this variable is generally a cause in a causal relationship.  An example of a causeOnly variable would be a variable such as Cloud Cover which would generally not be influenced by the behaviour of the user
   * @member {Boolean} causeOnly
   */
  exports.prototype['causeOnly'] = undefined;
  /**
   * @member {module:model/VariableCharts} charts
   */
  exports.prototype['charts'] = undefined;
  /**
   * Example: https://local.quantimo.do/ionic/Modo/www/#/app/charts/Trader%20Joes%20Bedtime%20Tea%20%2F%20Sleepytime%20Tea%20%28any%20Brand%29?variableName=Trader%20Joes%20Bedtime%20Tea%20%2F%20Sleepytime%20Tea%20%28any%20Brand%29&userId=230&pngUrl=https%3A%2F%2Fapp.quantimo.do%2Fionic%2FModo%2Fwww%2Fimg%2Fvariable_categories%2Ftreatments.png
   * @member {String} chartsLinkDynamic
   */
  exports.prototype['chartsLinkDynamic'] = undefined;
  /**
   * Example: mailto:?subject=Check%20out%20my%20Trader%20Joes%20Bedtime%20Tea%20%2F%20Sleepytime%20Tea%20%28any%20Brand%29%20data%21&body=See%20my%20Trader%20Joes%20Bedtime%20Tea%20%2F%20Sleepytime%20Tea%20%28any%20Brand%29%20history%20at%20https%3A%2F%2Flocal.quantimo.do%2Fapi%2Fv2%2Fcharts%3FvariableName%3DTrader%2520Joes%2520Bedtime%2520Tea%2520%252F%2520Sleepytime%2520Tea%2520%2528any%2520Brand%2529%26userId%3D230%26pngUrl%3Dhttps%253A%252F%252Fapp.quantimo.do%252Fionic%252FModo%252Fwww%252Fimg%252Fvariable_categories%252Ftreatments.png%0A%0AHave%20a%20great%20day!
   * @member {String} chartsLinkEmail
   */
  exports.prototype['chartsLinkEmail'] = undefined;
  /**
   * Example: https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Flocal.quantimo.do%2Fapi%2Fv2%2Fcharts%3FvariableName%3DTrader%2520Joes%2520Bedtime%2520Tea%2520%252F%2520Sleepytime%2520Tea%2520%2528any%2520Brand%2529%26userId%3D230%26pngUrl%3Dhttps%253A%252F%252Fapp.quantimo.do%252Fionic%252FModo%252Fwww%252Fimg%252Fvariable_categories%252Ftreatments.png
   * @member {String} chartsLinkFacebook
   */
  exports.prototype['chartsLinkFacebook'] = undefined;
  /**
   * Example: https://plus.google.com/share?url=https%3A%2F%2Flocal.quantimo.do%2Fapi%2Fv2%2Fcharts%3FvariableName%3DTrader%2520Joes%2520Bedtime%2520Tea%2520%252F%2520Sleepytime%2520Tea%2520%2528any%2520Brand%2529%26userId%3D230%26pngUrl%3Dhttps%253A%252F%252Fapp.quantimo.do%252Fionic%252FModo%252Fwww%252Fimg%252Fvariable_categories%252Ftreatments.png
   * @member {String} chartsLinkGoogle
   */
  exports.prototype['chartsLinkGoogle'] = undefined;
  /**
   * Example: https://local.quantimo.do/api/v2/charts?variableName=Trader%20Joes%20Bedtime%20Tea%20%2F%20Sleepytime%20Tea%20%28any%20Brand%29&userId=230&pngUrl=https%3A%2F%2Fapp.quantimo.do%2Fionic%2FModo%2Fwww%2Fimg%2Fvariable_categories%2Ftreatments.png
   * @member {String} chartsLinkStatic
   */
  exports.prototype['chartsLinkStatic'] = undefined;
  /**
   * Example: https://twitter.com/home?status=Check%20out%20my%20Trader%20Joes%20Bedtime%20Tea%20%2F%20Sleepytime%20Tea%20%28any%20Brand%29%20data%21%20https%3A%2F%2Flocal.quantimo.do%2Fapi%2Fv2%2Fcharts%3FvariableName%3DTrader%2520Joes%2520Bedtime%2520Tea%2520%252F%2520Sleepytime%2520Tea%2520%2528any%2520Brand%2529%26userId%3D230%26pngUrl%3Dhttps%253A%252F%252Fapp.quantimo.do%252Fionic%252FModo%252Fwww%252Fimg%252Fvariable_categories%252Ftreatments.png%20%40quantimodo
   * @member {String} chartsLinkTwitter
   */
  exports.prototype['chartsLinkTwitter'] = undefined;
  /**
   * Commonly defined for all users. An example of a parent category variable would be Fruit when tagged with the child sub-type variables Apple.  Child variable (Apple) measurements will be included when the parent category (Fruit) is analyzed.  This allows us to see how Fruit consumption might be affecting without having to record both Fruit and Apple intake.
   * @member {Array.<module:model/Variable>} childCommonTagVariables
   */
  exports.prototype['childCommonTagVariables'] = undefined;
  /**
   * User-defined. An example of a parent category variable would be Fruit when tagged with the child sub-type variables Apple.  Child variable (Apple) measurements will be included when the parent category (Fruit) is analyzed.  This allows us to see how Fruit consumption might be affecting without having to record both Fruit and Apple intake.
   * @member {Array.<module:model/Variable>} childUserTagVariables
   */
  exports.prototype['childUserTagVariables'] = undefined;
  /**
   * clientId
   * @member {String} clientId
   */
  exports.prototype['clientId'] = undefined;
  /**
   * Example: MEAN
   * @member {String} combinationOperation
   */
  exports.prototype['combinationOperation'] = undefined;
  /**
   * Example: Anxiety / Nervousness
   * @member {String} commonAlias
   */
  exports.prototype['commonAlias'] = undefined;
  /**
   * @member {Array.<module:model/Variable>} commonTaggedVariables
   */
  exports.prototype['commonTaggedVariables'] = undefined;
  /**
   * @member {Array.<module:model/Variable>} commonTagVariables
   */
  exports.prototype['commonTagVariables'] = undefined;
  /**
   * Example: 51
   * @member {Number} commonVariableMostCommonConnectorId
   */
  exports.prototype['commonVariableMostCommonConnectorId'] = undefined;
  /**
   * Example: 2017-02-07 23:43:39 UTC ISO 8601 YYYY-MM-DDThh:mm:ss
   * @member {String} commonVariableUpdatedAt
   */
  exports.prototype['commonVariableUpdatedAt'] = undefined;
  /**
   * When the record was first created. Use UTC ISO 8601 YYYY-MM-DDThh:mm:ss  datetime format
   * @member {String} createdAt
   */
  exports.prototype['createdAt'] = undefined;
  /**
   * Example: count
   * @member {String} unitAbbreviatedName
   */
  exports.prototype['unitAbbreviatedName'] = undefined;
  /**
   * Example: 6
   * @member {Number} unitCategoryId
   */
  exports.prototype['unitCategoryId'] = undefined;
  /**
   * Example: Miscellany
   * @member {String} unitCategoryName
   */
  exports.prototype['unitCategoryName'] = undefined;
  /**
   * ID of unit to use for this variable
   * @member {Number} unitId
   */
  exports.prototype['unitId'] = undefined;
  /**
   * Example: Count
   * @member {String} unitName
   */
  exports.prototype['unitName'] = undefined;
  /**
   * Example: negative
   * @member {String} description
   */
  exports.prototype['description'] = undefined;
  /**
   * Example: Trader Joe's Bedtime Tea
   * @member {String} displayName
   */
  exports.prototype['displayName'] = undefined;
  /**
   * The amount of time over which a predictor/stimulus event can exert an observable influence on an outcome variable value. For instance, aspirin (stimulus/predictor) typically decreases headache severity for approximately four hours (duration of action) following the onset delay.
   * @member {Number} durationOfAction
   */
  exports.prototype['durationOfAction'] = undefined;
  /**
   * Example: 168
   * @member {Number} durationOfActionInHours
   */
  exports.prototype['durationOfActionInHours'] = undefined;
  /**
   * Earliest filling time
   * @member {Number} earliestFillingTime
   */
  exports.prototype['earliestFillingTime'] = undefined;
  /**
   * Earliest measurement time
   * @member {Number} earliestMeasurementTime
   */
  exports.prototype['earliestMeasurementTime'] = undefined;
  /**
   * Earliest source time
   * @member {Number} earliestSourceTime
   */
  exports.prototype['earliestSourceTime'] = undefined;
  /**
   * error_message
   * @member {String} errorMessage
   */
  exports.prototype['errorMessage'] = undefined;
  /**
   * Latest measurement start_time to be used in analysis. Use UTC ISO 8601 YYYY-MM-DDThh:mm:ss  datetime format
   * @member {String} experimentEndTime
   */
  exports.prototype['experimentEndTime'] = undefined;
  /**
   * Example: 1893477600
   * @member {Number} experimentEndTimeSeconds
   */
  exports.prototype['experimentEndTimeSeconds'] = undefined;
  /**
   * Example: 2030-01-01 06:00:00 UTC ISO 8601 YYYY-MM-DDThh:mm:ss
   * @member {String} experimentEndTimeString
   */
  exports.prototype['experimentEndTimeString'] = undefined;
  /**
   * Earliest measurement start_time to be used in analysis. Use UTC ISO 8601 YYYY-MM-DDThh:mm:ss  datetime format
   * @member {String} experimentStartTime
   */
  exports.prototype['experimentStartTime'] = undefined;
  /**
   * Example: 1269307902
   * @member {Number} experimentStartTimeSeconds
   */
  exports.prototype['experimentStartTimeSeconds'] = undefined;
  /**
   * Example: 2010-03-23 01:31:42 UTC ISO 8601 YYYY-MM-DDThh:mm:ss
   * @member {String} experimentStartTimeString
   */
  exports.prototype['experimentStartTimeString'] = undefined;
  /**
   * 0 -> No filling, 1 -> Use filling-value
   * @member {String} fillingType
   */
  exports.prototype['fillingType'] = undefined;
  /**
   * When it comes to analysis to determine the effects of this variable, knowing when it did not occur is as important as knowing when it did occur. For example, if you are tracking a medication, it is important to know when you did not take it, but you do not have to log zero values for all the days when you haven't taken it. Hence, you can specify a filling value (typically 0) to insert whenever data is missing.
   * @member {Number} fillingValue
   */
  exports.prototype['fillingValue'] = undefined;
  /**
   * Example: ion-sad-outline
   * @member {String} iconIcon
   */
  exports.prototype['iconIcon'] = undefined;
  /**
   * Example: 95614
   * @member {Number} id
   */
  exports.prototype['id'] = undefined;
  /**
   * 
   * @member {String} imageUrl
   */
  exports.prototype['imageUrl'] = undefined;
  /**
   * Example: https://google.com
   * @member {String} informationalUrl
   */
  exports.prototype['informationalUrl'] = undefined;
  /**
   * Commonly defined for all users. IngredientOf variable measurements will be included in analysis of the ingredient variable.  For instance, a ingredient of the variable Lollypop could be Sugar.  This way you only have to record Lollypop consumption and we can use this data to see how sugar might be affecting you.
   * @member {Array.<module:model/Variable>} ingredientOfCommonTagVariables
   */
  exports.prototype['ingredientOfCommonTagVariables'] = undefined;
  /**
   * Commonly defined for all users. IngredientOf variable measurements will be included in analysis of the ingredient variable.  For instance, a ingredient of the variable Lollypop could be Sugar.  This way you only have to record Lollypop consumption and we can use this data to see how sugar might be affecting you.
   * @member {Array.<module:model/Variable>} ingredientCommonTagVariables
   */
  exports.prototype['ingredientCommonTagVariables'] = undefined;
  /**
   * User-specific IngredientOf variable measurements will be included in analysis of the ingredient variable.  For instance, a ingredient of the variable Lollypop could be Sugar.  This way you only have to record Lollypop consumption and we can use this data to see how sugar might be affecting you.
   * @member {Array.<module:model/Variable>} ingredientOfUserTagVariables
   */
  exports.prototype['ingredientOfUserTagVariables'] = undefined;
  /**
   * User-specific IngredientOf variable measurements will be included in analysis of the ingredient variable.  For instance, a ingredient of the variable Lollypop could be Sugar.  This way you only have to record Lollypop consumption and we can use this data to see how sugar might be affecting you.
   * @member {Array.<module:model/Variable>} ingredientUserTagVariables
   */
  exports.prototype['ingredientUserTagVariables'] = undefined;
  /**
   * Example: value
   * @member {String} inputType
   */
  exports.prototype['inputType'] = undefined;
  /**
   * 
   * @member {String} ionIcon
   */
  exports.prototype['ionIcon'] = undefined;
  /**
   * Commonly defined for all users.  Joining can be used used to merge duplicate variables. For instance, if two variables called Apples (Red Delicious) and Red Delicious Apples are joined, when one of them is analyzed, the measurements for the other will be included as well.
   * @member {Array.<module:model/Variable>} joinedCommonTagVariables
   */
  exports.prototype['joinedCommonTagVariables'] = undefined;
  /**
   * User-defined. Joining can be used used to merge duplicate variables. For instance, if two variables called Apples (Red Delicious) and Red Delicious Apples are joined, when one of them is analyzed, the measurements for the other will be included as well.
   * @member {Array.<module:model/Variable>} joinedUserTagVariables
   */
  exports.prototype['joinedUserTagVariables'] = undefined;
  /**
   * The Variable this Variable should be joined with. If the variable is joined with some other variable then it is not shown to user in the list of variables
   * @member {Number} joinWith
   */
  exports.prototype['joinWith'] = undefined;
  /**
   * Kurtosis
   * @member {Number} kurtosis
   */
  exports.prototype['kurtosis'] = undefined;
  /**
   * ID of last original Unit
   * @member {Number} lastOriginalUnitId
   */
  exports.prototype['lastOriginalUnitId'] = undefined;
  /**
   * Last original value which is stored
   * @member {Number} lastOriginalValue
   */
  exports.prototype['lastOriginalValue'] = undefined;
  /**
   * Example: 500
   * @member {Number} lastProcessedDailyValue
   */
  exports.prototype['lastProcessedDailyValue'] = undefined;
  /**
   * When this variable or its settings were last updated UTC ISO 8601 YYYY-MM-DDThh:mm:ss
   * @member {String} lastSuccessfulUpdateTime
   */
  exports.prototype['lastSuccessfulUpdateTime'] = undefined;
  /**
   * ID of last Unit
   * @member {Number} lastUnitId
   */
  exports.prototype['lastUnitId'] = undefined;
  /**
   * Last Value
   * @member {Number} lastValue
   */
  exports.prototype['lastValue'] = undefined;
  /**
   * Latest filling time
   * @member {Number} latestFillingTime
   */
  exports.prototype['latestFillingTime'] = undefined;
  /**
   * Latest measurement time
   * @member {Number} latestMeasurementTime
   */
  exports.prototype['latestMeasurementTime'] = undefined;
  /**
   * Latest source time
   * @member {Number} latestSourceTime
   */
  exports.prototype['latestSourceTime'] = undefined;
  /**
   * Example: 1501383600
   * @member {Number} latestUserMeasurementTime
   */
  exports.prototype['latestUserMeasurementTime'] = undefined;
  /**
   * Latitude
   * @member {Number} latitude
   */
  exports.prototype['latitude'] = undefined;
  /**
   * Location
   * @member {String} location
   */
  exports.prototype['location'] = undefined;
  /**
   * Longitude
   * @member {Number} longitude
   */
  exports.prototype['longitude'] = undefined;
  /**
   * Example: 1
   * @member {Boolean} manualTracking
   */
  exports.prototype['manualTracking'] = undefined;
  /**
   * The maximum allowed value for measurements. While you can record a value above this maximum, it will be excluded from the correlation analysis.
   * @member {Number} maximumAllowedValue
   */
  exports.prototype['maximumAllowedValue'] = undefined;
  /**
   * Maximum recorded daily value of this variable
   * @member {Number} maximumRecordedDailyValue
   */
  exports.prototype['maximumRecordedDailyValue'] = undefined;
  /**
   * Example: 1
   * @member {Number} maximumRecordedValue
   */
  exports.prototype['maximumRecordedValue'] = undefined;
  /**
   * Mean
   * @member {Number} mean
   */
  exports.prototype['mean'] = undefined;
  /**
   * Number of measurements at last analysis
   * @member {Number} measurementsAtLastAnalysis
   */
  exports.prototype['measurementsAtLastAnalysis'] = undefined;
  /**
   * Median
   * @member {Number} median
   */
  exports.prototype['median'] = undefined;
  /**
   * The minimum allowed value for measurements. While you can record a value below this minimum, it will be excluded from the correlation analysis.
   * @member {Number} minimumAllowedValue
   */
  exports.prototype['minimumAllowedValue'] = undefined;
  /**
   * Minimum recorded value of this variable
   * @member {Number} minimumRecordedValue
   */
  exports.prototype['minimumRecordedValue'] = undefined;
  /**
   * Example: 51
   * @member {Number} mostCommonConnectorId
   */
  exports.prototype['mostCommonConnectorId'] = undefined;
  /**
   * Example: 23
   * @member {Number} mostCommonOriginalUnitId
   */
  exports.prototype['mostCommonOriginalUnitId'] = undefined;
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
   * Example: Trader Joes Bedtime Tea / Sleepytime Tea (any Brand)
   * @member {String} name
   */
  exports.prototype['name'] = undefined;
  /**
   * Example: 1
   * @member {Number} numberOfAggregateCorrelationsAsCause
   */
  exports.prototype['numberOfAggregateCorrelationsAsCause'] = undefined;
  /**
   * Example: 310
   * @member {Number} numberOfAggregateCorrelationsAsEffect
   */
  exports.prototype['numberOfAggregateCorrelationsAsEffect'] = undefined;
  /**
   * Number of changes
   * @member {Number} numberOfChanges
   */
  exports.prototype['numberOfChanges'] = undefined;
  /**
   * Number of correlations for this variable
   * @member {Number} numberOfCorrelations
   */
  exports.prototype['numberOfCorrelations'] = undefined;
  /**
   * Number of processed measurements
   * @member {Number} numberOfProcessedDailyMeasurements
   */
  exports.prototype['numberOfProcessedDailyMeasurements'] = undefined;
  /**
   * Example: 295
   * @member {Number} numberOfRawMeasurements
   */
  exports.prototype['numberOfRawMeasurements'] = undefined;
  /**
   * Example: 1
   * @member {Number} numberOfTrackingReminders
   */
  exports.prototype['numberOfTrackingReminders'] = undefined;
  /**
   * Number of unique daily values
   * @member {Number} numberOfUniqueDailyValues
   */
  exports.prototype['numberOfUniqueDailyValues'] = undefined;
  /**
   * Example: 2
   * @member {Number} numberOfUniqueValues
   */
  exports.prototype['numberOfUniqueValues'] = undefined;
  /**
   * Example: 115
   * @member {Number} numberOfUserCorrelationsAsCause
   */
  exports.prototype['numberOfUserCorrelationsAsCause'] = undefined;
  /**
   * Example: 29014
   * @member {Number} numberOfUserCorrelationsAsEffect
   */
  exports.prototype['numberOfUserCorrelationsAsEffect'] = undefined;
  /**
   * Example: 2
   * @member {Number} numberOfUserVariables
   */
  exports.prototype['numberOfUserVariables'] = undefined;
  /**
   * The amount of time in seconds that elapses after the predictor/stimulus event before the outcome as perceived by a self-tracker is known as the onset delay. For example, the onset delay between the time a person takes an aspirin (predictor/stimulus event) and the time a person perceives a change in their headache severity (outcome) is approximately 30 minutes.
   * @member {Number} onsetDelay
   */
  exports.prototype['onsetDelay'] = undefined;
  /**
   * Example: 0.5
   * @member {Number} onsetDelayInHours
   */
  exports.prototype['onsetDelayInHours'] = undefined;
  /**
   * Outcome variables (those with `outcome` == 1) are variables for which a human would generally want to identify the influencing factors. These include symptoms of illness, physique, mood, cognitive performance, etc.  Generally correlation calculations are only performed on outcome variables
   * @member {Boolean} outcome
   */
  exports.prototype['outcome'] = undefined;
  /**
   * Example: 1
   * @member {Number} outcomeOfInterest
   */
  exports.prototype['outcomeOfInterest'] = undefined;
  /**
   * Commonly defined for all users.  An example of a parent category variable would be Fruit when tagged with the child sub-type variables Apple.  Child variable (Apple) measurements will be included when the parent category (Fruit) is analyzed.  This allows us to see how Fruit consumption might be affecting without having to record both Fruit and Apple intake.
   * @member {Array.<module:model/Variable>} parentCommonTagVariables
   */
  exports.prototype['parentCommonTagVariables'] = undefined;
  /**
   * User-defined. An example of a parent category variable would be Fruit when tagged with the child sub-type variables Apple.  Child variable (Apple) measurements will be included when the parent category (Fruit) is analyzed.  This allows us to see how Fruit consumption might be affecting without having to record both Fruit and Apple intake.
   * @member {Array.<module:model/Variable>} parentUserTagVariables
   */
  exports.prototype['parentUserTagVariables'] = undefined;
  /**
   * Example: img/variable_categories/treatments.png
   * @member {String} pngPath
   */
  exports.prototype['pngPath'] = undefined;
  /**
   * Example: https://app.quantimo.do/ionic/Modo/www/img/variable_categories/treatments.png
   * @member {String} pngUrl
   */
  exports.prototype['pngUrl'] = undefined;
  /**
   * Example: 0
   * @member {Number} predictorOfInterest
   */
  exports.prototype['predictorOfInterest'] = undefined;
  /**
   * Example: 95.4
   * @member {Number} price
   */
  exports.prototype['price'] = undefined;
  /**
   * Link to associated product for purchase
   * @member {String} productUrl
   */
  exports.prototype['productUrl'] = undefined;
  /**
   * Is variable public
   * @member {Number} public
   */
  exports.prototype['public'] = undefined;
  /**
   * Example: 131
   * @member {Number} rawMeasurementsAtLastAnalysis
   */
  exports.prototype['rawMeasurementsAtLastAnalysis'] = undefined;
  /**
   * Example: 1
   * @member {Number} secondMostCommonValue
   */
  exports.prototype['secondMostCommonValue'] = undefined;
  /**
   * Example: 250
   * @member {Number} secondToLastValue
   */
  exports.prototype['secondToLastValue'] = undefined;
  /**
   * Example: 1
   * @member {Boolean} shareUserMeasurements
   */
  exports.prototype['shareUserMeasurements'] = undefined;
  /**
   * Skewness
   * @member {Number} skewness
   */
  exports.prototype['skewness'] = undefined;
  /**
   * Comma-separated list of source names to limit variables to those sources
   * @member {String} sources
   */
  exports.prototype['sources'] = undefined;
  /**
   * Standard deviation Example: 0.46483219855434
   * @member {Number} standardDeviation
   */
  exports.prototype['standardDeviation'] = undefined;
  /**
   * status
   * @member {String} status
   */
  exports.prototype['status'] = undefined;
  /**
   * Based on sort filter and can be shown beneath variable name on search list
   * @member {String} subtitle
   */
  exports.prototype['subtitle'] = undefined;
  /**
   * Example: https://app.quantimo.do/ionic/Modo/www/img/variable_categories/treatments.svg
   * @member {String} svgUrl
   */
  exports.prototype['svgUrl'] = undefined;
  /**
   * Example: 6
   * @member {Number} thirdMostCommonValue
   */
  exports.prototype['thirdMostCommonValue'] = undefined;
  /**
   * Example: 250
   * @member {Number} thirdToLastValue
   */
  exports.prototype['thirdToLastValue'] = undefined;
  /**
   * @member {module:model/Unit} unit
   */
  exports.prototype['unit'] = undefined;
  /**
   * Universal product code or similar
   * @member {String} upc
   */
  exports.prototype['upc'] = undefined;
  /**
   * updated
   * @member {Number} updated
   */
  exports.prototype['updated'] = undefined;
  /**
   * When the record in the database was last updated. Use UTC ISO 8601 YYYY-MM-DDThh:mm:ss datetime format
   * @member {String} updatedAt
   */
  exports.prototype['updatedAt'] = undefined;
  /**
   * Example: 2017-07-30 14:58:26
   * @member {String} updatedTime
   */
  exports.prototype['updatedTime'] = undefined;
  /**
   * User ID
   * @member {Number} userId
   */
  exports.prototype['userId'] = undefined;
  /**
   * @member {Array.<module:model/Variable>} userTaggedVariables
   */
  exports.prototype['userTaggedVariables'] = undefined;
  /**
   * @member {Array.<module:model/Variable>} userTagVariables
   */
  exports.prototype['userTagVariables'] = undefined;
  /**
   * Example: count
   * @member {String} userVariableUnitAbbreviatedName
   */
  exports.prototype['userVariableUnitAbbreviatedName'] = undefined;
  /**
   * Example: 6
   * @member {Number} userVariableUnitCategoryId
   */
  exports.prototype['userVariableUnitCategoryId'] = undefined;
  /**
   * Example: Miscellany
   * @member {String} userVariableUnitCategoryName
   */
  exports.prototype['userVariableUnitCategoryName'] = undefined;
  /**
   * Example: 23
   * @member {Number} userVariableUnitId
   */
  exports.prototype['userVariableUnitId'] = undefined;
  /**
   * Example: Count
   * @member {String} userVariableUnitName
   */
  exports.prototype['userVariableUnitName'] = undefined;
  /**
   * Example: -1
   * @member {Number} userVariableFillingValue
   */
  exports.prototype['userVariableFillingValue'] = undefined;
  /**
   * Example: 51
   * @member {Number} userVariableMostCommonConnectorId
   */
  exports.prototype['userVariableMostCommonConnectorId'] = undefined;
  /**
   * Example: 2017-07-30 14:58:26
   * @member {String} userVariableUpdatedAt
   */
  exports.prototype['userVariableUpdatedAt'] = undefined;
  /**
   * Example: positive or negative
   * @member {String} userVariableValence
   */
  exports.prototype['userVariableValence'] = undefined;
  /**
   * Example: 13
   * @member {Number} userVariableVariableCategoryId
   */
  exports.prototype['userVariableVariableCategoryId'] = undefined;
  /**
   * Example: Treatments
   * @member {String} userVariableVariableCategoryName
   */
  exports.prototype['userVariableVariableCategoryName'] = undefined;
  /**
   * Example: 
   * @member {String} userVariableWikipediaTitle
   */
  exports.prototype['userVariableWikipediaTitle'] = undefined;
  /**
   * @member {module:model/VariableCategory} variableCategory
   */
  exports.prototype['variableCategory'] = undefined;
  /**
   * @member {module:model/DataSource} dataSource
   */
  exports.prototype['dataSource'] = undefined;
  /**
   * Array of Variables that are joined with this Variable
   * @member {Array.<module:model/Variable>} joinedVariables
   */
  exports.prototype['joinedVariables'] = undefined;
  /**
   * Last source
   * @member {Number} lastSource
   */
  exports.prototype['lastSource'] = undefined;
  /**
   * Last unit
   * @member {String} lastUnit
   */
  exports.prototype['lastUnit'] = undefined;
  /**
   * Most common unit
   * @member {String} mostCommonUnit
   */
  exports.prototype['mostCommonUnit'] = undefined;
  /**
   * Example: positive
   * @member {String} valence
   */
  exports.prototype['valence'] = undefined;
  /**
   * Example: 6
   * @member {Number} variableCategoryId
   */
  exports.prototype['variableCategoryId'] = undefined;
  /**
   * Example: https://maxcdn.icons8.com/Color/PNG/96/Household/sleeping_in_bed-96.png
   * @member {String} variableCategoryImageUrl
   */
  exports.prototype['variableCategoryImageUrl'] = undefined;
  /**
   * Variable category like Mood, Sleep, Physical Activity, Treatment, Symptom, etc.
   * @member {String} variableCategoryName
   */
  exports.prototype['variableCategoryName'] = undefined;
  /**
   * Example: -1
   * @member {Number} variableFillingValue
   */
  exports.prototype['variableFillingValue'] = undefined;
  /**
   * Example: 96380
   * @member {Number} variableId
   */
  exports.prototype['variableId'] = undefined;
  /**
   * Example: Sleep Duration
   * @member {String} variableName
   */
  exports.prototype['variableName'] = undefined;
  /**
   * Example: 115947037.40816
   * @member {Number} variance
   */
  exports.prototype['variance'] = undefined;
  /**
   * Example: 
   * @member {String} wikipediaTitle
   */
  exports.prototype['wikipediaTitle'] = undefined;



  return exports;
}));



},{"../ApiClient":9,"./DataSource":31,"./TrackingReminderNotificationAction":66,"./Unit":69,"./Variable":74,"./VariableCategory":75,"./VariableCharts":76}],75:[function(require,module,exports){
/**
 * quantimodo
 * We make it easy to retrieve and analyze normalized user data from a wide array of devices and applications. Check out our [docs and sdk's](https://github.com/QuantiModo/docs) or [contact us](https://help.quantimo.do).
 *
 * OpenAPI spec version: 5.8.112511
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.3.1
 *
 * Do not edit the class manually.
 *
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
    if (!root.Quantimodo) {
      root.Quantimodo = {};
    }
    root.Quantimodo.VariableCategory = factory(root.Quantimodo.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The VariableCategory model module.
   * @module model/VariableCategory
   * @version 5.8.112511
   */

  /**
   * Constructs a new <code>VariableCategory</code>.
   * @alias module:model/VariableCategory
   * @class
   * @param name {String} Category name
   */
  var exports = function(name) {
    var _this = this;


















    _this['name'] = name;











  };

  /**
   * Constructs a <code>VariableCategory</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/VariableCategory} obj Optional instance to populate.
   * @return {module:model/VariableCategory} The populated <code>VariableCategory</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('appType')) {
        obj['appType'] = ApiClient.convertToType(data['appType'], 'String');
      }
      if (data.hasOwnProperty('causeOnly')) {
        obj['causeOnly'] = ApiClient.convertToType(data['causeOnly'], 'Boolean');
      }
      if (data.hasOwnProperty('combinationOperation')) {
        obj['combinationOperation'] = ApiClient.convertToType(data['combinationOperation'], 'String');
      }
      if (data.hasOwnProperty('createdTime')) {
        obj['createdTime'] = ApiClient.convertToType(data['createdTime'], 'String');
      }
      if (data.hasOwnProperty('unitAbbreviatedName')) {
        obj['unitAbbreviatedName'] = ApiClient.convertToType(data['unitAbbreviatedName'], 'String');
      }
      if (data.hasOwnProperty('unitId')) {
        obj['unitId'] = ApiClient.convertToType(data['unitId'], 'Number');
      }
      if (data.hasOwnProperty('durationOfAction')) {
        obj['durationOfAction'] = ApiClient.convertToType(data['durationOfAction'], 'Number');
      }
      if (data.hasOwnProperty('fillingValue')) {
        obj['fillingValue'] = ApiClient.convertToType(data['fillingValue'], 'Number');
      }
      if (data.hasOwnProperty('helpText')) {
        obj['helpText'] = ApiClient.convertToType(data['helpText'], 'String');
      }
      if (data.hasOwnProperty('id')) {
        obj['id'] = ApiClient.convertToType(data['id'], 'Number');
      }
      if (data.hasOwnProperty('imageUrl')) {
        obj['imageUrl'] = ApiClient.convertToType(data['imageUrl'], 'String');
      }
      if (data.hasOwnProperty('ionIcon')) {
        obj['ionIcon'] = ApiClient.convertToType(data['ionIcon'], 'String');
      }
      if (data.hasOwnProperty('manualTracking')) {
        obj['manualTracking'] = ApiClient.convertToType(data['manualTracking'], 'Boolean');
      }
      if (data.hasOwnProperty('maximumAllowedValue')) {
        obj['maximumAllowedValue'] = ApiClient.convertToType(data['maximumAllowedValue'], 'String');
      }
      if (data.hasOwnProperty('measurementSynonymSingularLowercase')) {
        obj['measurementSynonymSingularLowercase'] = ApiClient.convertToType(data['measurementSynonymSingularLowercase'], 'String');
      }
      if (data.hasOwnProperty('minimumAllowedValue')) {
        obj['minimumAllowedValue'] = ApiClient.convertToType(data['minimumAllowedValue'], 'String');
      }
      if (data.hasOwnProperty('moreInfo')) {
        obj['moreInfo'] = ApiClient.convertToType(data['moreInfo'], 'String');
      }
      if (data.hasOwnProperty('name')) {
        obj['name'] = ApiClient.convertToType(data['name'], 'String');
      }
      if (data.hasOwnProperty('onsetDelay')) {
        obj['onsetDelay'] = ApiClient.convertToType(data['onsetDelay'], 'Number');
      }
      if (data.hasOwnProperty('outcome')) {
        obj['outcome'] = ApiClient.convertToType(data['outcome'], 'Boolean');
      }
      if (data.hasOwnProperty('pngPath')) {
        obj['pngPath'] = ApiClient.convertToType(data['pngPath'], 'String');
      }
      if (data.hasOwnProperty('pngUrl')) {
        obj['pngUrl'] = ApiClient.convertToType(data['pngUrl'], 'String');
      }
      if (data.hasOwnProperty('public')) {
        obj['public'] = ApiClient.convertToType(data['public'], 'Boolean');
      }
      if (data.hasOwnProperty('svgPath')) {
        obj['svgPath'] = ApiClient.convertToType(data['svgPath'], 'String');
      }
      if (data.hasOwnProperty('svgUrl')) {
        obj['svgUrl'] = ApiClient.convertToType(data['svgUrl'], 'String');
      }
      if (data.hasOwnProperty('updated')) {
        obj['updated'] = ApiClient.convertToType(data['updated'], 'Number');
      }
      if (data.hasOwnProperty('updatedTime')) {
        obj['updatedTime'] = ApiClient.convertToType(data['updatedTime'], 'String');
      }
      if (data.hasOwnProperty('variableCategoryName')) {
        obj['variableCategoryName'] = ApiClient.convertToType(data['variableCategoryName'], 'String');
      }
      if (data.hasOwnProperty('variableCategoryNameSingular')) {
        obj['variableCategoryNameSingular'] = ApiClient.convertToType(data['variableCategoryNameSingular'], 'String');
      }
    }
    return obj;
  }

  /**
   * Example: mood
   * @member {String} appType
   */
  exports.prototype['appType'] = undefined;
  /**
   * Example: false
   * @member {Boolean} causeOnly
   */
  exports.prototype['causeOnly'] = undefined;
  /**
   * Example: MEAN
   * @member {String} combinationOperation
   */
  exports.prototype['combinationOperation'] = undefined;
  /**
   * UTC ISO 8601 YYYY-MM-DDThh:mm:ss
   * @member {String} createdTime
   */
  exports.prototype['createdTime'] = undefined;
  /**
   * Example: /5
   * @member {String} unitAbbreviatedName
   */
  exports.prototype['unitAbbreviatedName'] = undefined;
  /**
   * Example: 10
   * @member {Number} unitId
   */
  exports.prototype['unitId'] = undefined;
  /**
   * Example: 86400
   * @member {Number} durationOfAction
   */
  exports.prototype['durationOfAction'] = undefined;
  /**
   * Example: -1
   * @member {Number} fillingValue
   */
  exports.prototype['fillingValue'] = undefined;
  /**
   * Example: What emotion do you want to rate?
   * @member {String} helpText
   */
  exports.prototype['helpText'] = undefined;
  /**
   * Example: 1
   * @member {Number} id
   */
  exports.prototype['id'] = undefined;
  /**
   * Example: https://maxcdn.icons8.com/Color/PNG/96/Cinema/theatre_mask-96.png
   * @member {String} imageUrl
   */
  exports.prototype['imageUrl'] = undefined;
  /**
   * Example: ion-happy-outline
   * @member {String} ionIcon
   */
  exports.prototype['ionIcon'] = undefined;
  /**
   * Example: true
   * @member {Boolean} manualTracking
   */
  exports.prototype['manualTracking'] = undefined;
  /**
   * Example: 
   * @member {String} maximumAllowedValue
   */
  exports.prototype['maximumAllowedValue'] = undefined;
  /**
   * Example: rating
   * @member {String} measurementSynonymSingularLowercase
   */
  exports.prototype['measurementSynonymSingularLowercase'] = undefined;
  /**
   * Example: 
   * @member {String} minimumAllowedValue
   */
  exports.prototype['minimumAllowedValue'] = undefined;
  /**
   * Example: Do you have any emotions that fluctuate regularly?  If so, add them so I can try to determine which factors are influencing them.
   * @member {String} moreInfo
   */
  exports.prototype['moreInfo'] = undefined;
  /**
   * Category name
   * @member {String} name
   */
  exports.prototype['name'] = undefined;
  /**
   * Example: 0
   * @member {Number} onsetDelay
   */
  exports.prototype['onsetDelay'] = undefined;
  /**
   * Example: true
   * @member {Boolean} outcome
   */
  exports.prototype['outcome'] = undefined;
  /**
   * Example: img/variable_categories/emotions.png
   * @member {String} pngPath
   */
  exports.prototype['pngPath'] = undefined;
  /**
   * Example: https://app.quantimo.do/ionic/Modo/www/img/variable_categories/emotions.png
   * @member {String} pngUrl
   */
  exports.prototype['pngUrl'] = undefined;
  /**
   * Example: true
   * @member {Boolean} public
   */
  exports.prototype['public'] = undefined;
  /**
   * Example: img/variable_categories/emotions.svg
   * @member {String} svgPath
   */
  exports.prototype['svgPath'] = undefined;
  /**
   * Example: https://app.quantimo.do/ionic/Modo/www/img/variable_categories/emotions.svg
   * @member {String} svgUrl
   */
  exports.prototype['svgUrl'] = undefined;
  /**
   * Example: 1
   * @member {Number} updated
   */
  exports.prototype['updated'] = undefined;
  /**
   * UTC ISO 8601 YYYY-MM-DDThh:mm:ss
   * @member {String} updatedTime
   */
  exports.prototype['updatedTime'] = undefined;
  /**
   * Example: Emotions
   * @member {String} variableCategoryName
   */
  exports.prototype['variableCategoryName'] = undefined;
  /**
   * Example: Emotion
   * @member {String} variableCategoryNameSingular
   */
  exports.prototype['variableCategoryNameSingular'] = undefined;



  return exports;
}));



},{"../ApiClient":9}],76:[function(require,module,exports){
/**
 * quantimodo
 * We make it easy to retrieve and analyze normalized user data from a wide array of devices and applications. Check out our [docs and sdk's](https://github.com/QuantiModo/docs) or [contact us](https://help.quantimo.do).
 *
 * OpenAPI spec version: 5.8.112511
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.3.1
 *
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['ApiClient', 'model/Chart'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    module.exports = factory(require('../ApiClient'), require('./Chart'));
  } else {
    // Browser globals (root is window)
    if (!root.Quantimodo) {
      root.Quantimodo = {};
    }
    root.Quantimodo.VariableCharts = factory(root.Quantimodo.ApiClient, root.Quantimodo.Chart);
  }
}(this, function(ApiClient, Chart) {
  'use strict';




  /**
   * The VariableCharts model module.
   * @module model/VariableCharts
   * @version 5.8.112511
   */

  /**
   * Constructs a new <code>VariableCharts</code>.
   * An object with various chart properties each property contain and svg and Highcharts configuration
   * @alias module:model/VariableCharts
   * @class
   */
  var exports = function() {
    var _this = this;







  };

  /**
   * Constructs a <code>VariableCharts</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/VariableCharts} obj Optional instance to populate.
   * @return {module:model/VariableCharts} The populated <code>VariableCharts</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('hourlyColumnChart')) {
        obj['hourlyColumnChart'] = Chart.constructFromObject(data['hourlyColumnChart']);
      }
      if (data.hasOwnProperty('monthlyColumnChart')) {
        obj['monthlyColumnChart'] = Chart.constructFromObject(data['monthlyColumnChart']);
      }
      if (data.hasOwnProperty('distributionColumnChart')) {
        obj['distributionColumnChart'] = Chart.constructFromObject(data['distributionColumnChart']);
      }
      if (data.hasOwnProperty('weekdayColumnChart')) {
        obj['weekdayColumnChart'] = Chart.constructFromObject(data['weekdayColumnChart']);
      }
      if (data.hasOwnProperty('lineChartWithoutSmoothing')) {
        obj['lineChartWithoutSmoothing'] = Chart.constructFromObject(data['lineChartWithoutSmoothing']);
      }
      if (data.hasOwnProperty('lineChartWithSmoothing')) {
        obj['lineChartWithSmoothing'] = Chart.constructFromObject(data['lineChartWithSmoothing']);
      }
    }
    return obj;
  }

  /**
   * @member {module:model/Chart} hourlyColumnChart
   */
  exports.prototype['hourlyColumnChart'] = undefined;
  /**
   * @member {module:model/Chart} monthlyColumnChart
   */
  exports.prototype['monthlyColumnChart'] = undefined;
  /**
   * @member {module:model/Chart} distributionColumnChart
   */
  exports.prototype['distributionColumnChart'] = undefined;
  /**
   * @member {module:model/Chart} weekdayColumnChart
   */
  exports.prototype['weekdayColumnChart'] = undefined;
  /**
   * @member {module:model/Chart} lineChartWithoutSmoothing
   */
  exports.prototype['lineChartWithoutSmoothing'] = undefined;
  /**
   * @member {module:model/Chart} lineChartWithSmoothing
   */
  exports.prototype['lineChartWithSmoothing'] = undefined;



  return exports;
}));



},{"../ApiClient":9,"./Chart":25}],77:[function(require,module,exports){
/**
 * quantimodo
 * We make it easy to retrieve and analyze normalized user data from a wide array of devices and applications. Check out our [docs and sdk's](https://github.com/QuantiModo/docs) or [contact us](https://help.quantimo.do).
 *
 * OpenAPI spec version: 5.8.112511
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.3.1
 *
 * Do not edit the class manually.
 *
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
    if (!root.Quantimodo) {
      root.Quantimodo = {};
    }
    root.Quantimodo.Vote = factory(root.Quantimodo.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The Vote model module.
   * @module model/Vote
   * @version 5.8.112511
   */

  /**
   * Constructs a new <code>Vote</code>.
   * @alias module:model/Vote
   * @class
   * @param causeVariableId {Number} Cause variable id
   * @param clientId {String} clientId
   * @param effectVariableId {Number} Effect variable id
   * @param userId {Number} ID of User
   * @param value {Boolean} Vote: 0 (for implausible) or 1 (for plausible)
   */
  var exports = function(causeVariableId, clientId, effectVariableId, userId, value) {
    var _this = this;

    _this['causeVariableId'] = causeVariableId;
    _this['clientId'] = clientId;

    _this['effectVariableId'] = effectVariableId;


    _this['userId'] = userId;
    _this['value'] = value;
  };

  /**
   * Constructs a <code>Vote</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/Vote} obj Optional instance to populate.
   * @return {module:model/Vote} The populated <code>Vote</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('causeVariableId')) {
        obj['causeVariableId'] = ApiClient.convertToType(data['causeVariableId'], 'Number');
      }
      if (data.hasOwnProperty('clientId')) {
        obj['clientId'] = ApiClient.convertToType(data['clientId'], 'String');
      }
      if (data.hasOwnProperty('createdAt')) {
        obj['createdAt'] = ApiClient.convertToType(data['createdAt'], 'String');
      }
      if (data.hasOwnProperty('effectVariableId')) {
        obj['effectVariableId'] = ApiClient.convertToType(data['effectVariableId'], 'Number');
      }
      if (data.hasOwnProperty('id')) {
        obj['id'] = ApiClient.convertToType(data['id'], 'Number');
      }
      if (data.hasOwnProperty('updatedAt')) {
        obj['updatedAt'] = ApiClient.convertToType(data['updatedAt'], 'String');
      }
      if (data.hasOwnProperty('userId')) {
        obj['userId'] = ApiClient.convertToType(data['userId'], 'Number');
      }
      if (data.hasOwnProperty('value')) {
        obj['value'] = ApiClient.convertToType(data['value'], 'Boolean');
      }
    }
    return obj;
  }

  /**
   * Cause variable id
   * @member {Number} causeVariableId
   */
  exports.prototype['causeVariableId'] = undefined;
  /**
   * clientId
   * @member {String} clientId
   */
  exports.prototype['clientId'] = undefined;
  /**
   * When the record was first created. Use UTC ISO 8601 YYYY-MM-DDThh:mm:ss datetime format
   * @member {String} createdAt
   */
  exports.prototype['createdAt'] = undefined;
  /**
   * Effect variable id
   * @member {Number} effectVariableId
   */
  exports.prototype['effectVariableId'] = undefined;
  /**
   * id
   * @member {Number} id
   */
  exports.prototype['id'] = undefined;
  /**
   * When the record in the database was last updated. Use UTC ISO 8601 YYYY-MM-DDThh:mm:ss datetime format
   * @member {String} updatedAt
   */
  exports.prototype['updatedAt'] = undefined;
  /**
   * ID of User
   * @member {Number} userId
   */
  exports.prototype['userId'] = undefined;
  /**
   * Vote: 0 (for implausible) or 1 (for plausible)
   * @member {Boolean} value
   */
  exports.prototype['value'] = undefined;



  return exports;
}));



},{"../ApiClient":9}],78:[function(require,module,exports){
/**
 * quantimodo
 * We make it easy to retrieve and analyze normalized user data from a wide array of devices and applications. Check out our [docs and sdk's](https://github.com/QuantiModo/docs) or [contact us](https://help.quantimo.do).
 *
 * OpenAPI spec version: 5.8.112511
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 *
 * Swagger Codegen version: 2.3.1
 *
 * Do not edit the class manually.
 *
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
    if (!root.Quantimodo) {
      root.Quantimodo = {};
    }
    root.Quantimodo.VoteDelete = factory(root.Quantimodo.ApiClient);
  }
}(this, function(ApiClient) {
  'use strict';




  /**
   * The VoteDelete model module.
   * @module model/VoteDelete
   * @version 5.8.112511
   */

  /**
   * Constructs a new <code>VoteDelete</code>.
   * @alias module:model/VoteDelete
   * @class
   * @param cause {String} Cause variable name for the correlation to which the vote pertains
   * @param effect {String} Effect variable name for the correlation to which the vote pertains
   */
  var exports = function(cause, effect) {
    var _this = this;

    _this['cause'] = cause;
    _this['effect'] = effect;
  };

  /**
   * Constructs a <code>VoteDelete</code> from a plain JavaScript object, optionally creating a new instance.
   * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
   * @param {Object} data The plain JavaScript object bearing properties of interest.
   * @param {module:model/VoteDelete} obj Optional instance to populate.
   * @return {module:model/VoteDelete} The populated <code>VoteDelete</code> instance.
   */
  exports.constructFromObject = function(data, obj) {
    if (data) {
      obj = obj || new exports();

      if (data.hasOwnProperty('cause')) {
        obj['cause'] = ApiClient.convertToType(data['cause'], 'String');
      }
      if (data.hasOwnProperty('effect')) {
        obj['effect'] = ApiClient.convertToType(data['effect'], 'String');
      }
    }
    return obj;
  }

  /**
   * Cause variable name for the correlation to which the vote pertains
   * @member {String} cause
   */
  exports.prototype['cause'] = undefined;
  /**
   * Effect variable name for the correlation to which the vote pertains
   * @member {String} effect
   */
  exports.prototype['effect'] = undefined;



  return exports;
}));



},{"../ApiClient":9}],79:[function(require,module,exports){
'use strict'

exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function getLens (b64) {
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=')
  if (validLen === -1) validLen = len

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4)

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

  var curByte = 0

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen

  for (var i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)]
    arr[curByte++] = (tmp >> 16) & 0xFF
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(
      uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)
    ))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    )
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    )
  }

  return parts.join('')
}

},{}],80:[function(require,module,exports){

},{}],81:[function(require,module,exports){
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */

'use strict'

var base64 = require('base64-js')
var ieee754 = require('ieee754')

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

var K_MAX_LENGTH = 0x7fffffff
exports.kMaxLength = K_MAX_LENGTH

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Print warning and recommend using `buffer` v4.x which has an Object
 *               implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * We report that the browser does not support typed arrays if the are not subclassable
 * using __proto__. Firefox 4-29 lacks support for adding new properties to `Uint8Array`
 * (See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438). IE 10 lacks support
 * for __proto__ and has a buggy typed array implementation.
 */
Buffer.TYPED_ARRAY_SUPPORT = typedArraySupport()

if (!Buffer.TYPED_ARRAY_SUPPORT && typeof console !== 'undefined' &&
    typeof console.error === 'function') {
  console.error(
    'This browser lacks typed array (Uint8Array) support which is required by ' +
    '`buffer` v5.x. Use `buffer` v4.x if you require old browser support.'
  )
}

function typedArraySupport () {
  // Can typed array instances can be augmented?
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42
  } catch (e) {
    return false
  }
}

Object.defineProperty(Buffer.prototype, 'parent', {
  get: function () {
    if (!(this instanceof Buffer)) {
      return undefined
    }
    return this.buffer
  }
})

Object.defineProperty(Buffer.prototype, 'offset', {
  get: function () {
    if (!(this instanceof Buffer)) {
      return undefined
    }
    return this.byteOffset
  }
})

function createBuffer (length) {
  if (length > K_MAX_LENGTH) {
    throw new RangeError('Invalid typed array length')
  }
  // Return an augmented `Uint8Array` instance
  var buf = new Uint8Array(length)
  buf.__proto__ = Buffer.prototype
  return buf
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(arg)
  }
  return from(arg, encodingOrOffset, length)
}

// Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
if (typeof Symbol !== 'undefined' && Symbol.species &&
    Buffer[Symbol.species] === Buffer) {
  Object.defineProperty(Buffer, Symbol.species, {
    value: null,
    configurable: true,
    enumerable: false,
    writable: false
  })
}

Buffer.poolSize = 8192 // not used by this implementation

function from (value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (isArrayBuffer(value) || (value && isArrayBuffer(value.buffer))) {
    return fromArrayBuffer(value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(value, encodingOrOffset)
  }

  return fromObject(value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(value, encodingOrOffset, length)
}

// Note: Change prototype *after* Buffer.from is defined to workaround Chrome bug:
// https://github.com/feross/buffer/pull/148
Buffer.prototype.__proto__ = Uint8Array.prototype
Buffer.__proto__ = Uint8Array

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be of type number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(size).fill(fill, encoding)
      : createBuffer(size).fill(fill)
  }
  return createBuffer(size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(size, fill, encoding)
}

function allocUnsafe (size) {
  assertSize(size)
  return createBuffer(size < 0 ? 0 : checked(size) | 0)
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(size)
}

function fromString (string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('Unknown encoding: ' + encoding)
  }

  var length = byteLength(string, encoding) | 0
  var buf = createBuffer(length)

  var actual = buf.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    buf = buf.slice(0, actual)
  }

  return buf
}

function fromArrayLike (array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  var buf = createBuffer(length)
  for (var i = 0; i < length; i += 1) {
    buf[i] = array[i] & 255
  }
  return buf
}

function fromArrayBuffer (array, byteOffset, length) {
  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('"offset" is outside of buffer bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('"length" is outside of buffer bounds')
  }

  var buf
  if (byteOffset === undefined && length === undefined) {
    buf = new Uint8Array(array)
  } else if (length === undefined) {
    buf = new Uint8Array(array, byteOffset)
  } else {
    buf = new Uint8Array(array, byteOffset, length)
  }

  // Return an augmented `Uint8Array` instance
  buf.__proto__ = Buffer.prototype
  return buf
}

function fromObject (obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    var buf = createBuffer(len)

    if (buf.length === 0) {
      return buf
    }

    obj.copy(buf, 0, 0, len)
    return buf
  }

  if (obj) {
    if (ArrayBuffer.isView(obj) || 'length' in obj) {
      if (typeof obj.length !== 'number' || numberIsNaN(obj.length)) {
        return createBuffer(0)
      }
      return fromArrayLike(obj)
    }

    if (obj.type === 'Buffer' && Array.isArray(obj.data)) {
      return fromArrayLike(obj.data)
    }
  }

  throw new TypeError('The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object.')
}

function checked (length) {
  // Note: cannot use `length < K_MAX_LENGTH` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= K_MAX_LENGTH) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + K_MAX_LENGTH.toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return b != null && b._isBuffer === true
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!Array.isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (ArrayBuffer.isView(buf)) {
      buf = Buffer.from(buf)
    }
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (ArrayBuffer.isView(string) || isArrayBuffer(string)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// This property is used by `Buffer.isBuffer` (and the `is-buffer` npm package)
// to detect a Buffer instance. It's not possible to use `instanceof Buffer`
// reliably in a browserify context because there could be multiple different
// copies of the 'buffer' package in use. This method works even for Buffer
// instances that were created from another copy of the `buffer` package.
// See: https://github.com/feross/buffer/issues/154
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.toLocaleString = Buffer.prototype.toString

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (numberIsNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  var strLen = string.length

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (numberIsNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset >>> 0
    if (isFinite(length)) {
      length = length >>> 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + (bytes[i + 1] * 256))
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf = this.subarray(start, end)
  // Return an augmented `Uint8Array` instance
  newBuf.__proto__ = Buffer.prototype
  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  this[offset] = (value >>> 8)
  this[offset + 1] = (value & 0xff)
  return offset + 2
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  this[offset + 3] = (value >>> 24)
  this[offset + 2] = (value >>> 16)
  this[offset + 1] = (value >>> 8)
  this[offset] = (value & 0xff)
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  this[offset] = (value >>> 24)
  this[offset + 1] = (value >>> 16)
  this[offset + 2] = (value >>> 8)
  this[offset + 3] = (value & 0xff)
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    var limit = Math.pow(2, (8 * byteLength) - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    var limit = Math.pow(2, (8 * byteLength) - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  this[offset] = (value >>> 8)
  this[offset + 1] = (value & 0xff)
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  this[offset + 2] = (value >>> 16)
  this[offset + 3] = (value >>> 24)
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  this[offset] = (value >>> 24)
  this[offset + 1] = (value >>> 16)
  this[offset + 2] = (value >>> 8)
  this[offset + 3] = (value & 0xff)
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!Buffer.isBuffer(target)) throw new TypeError('argument should be a Buffer')
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('Index out of range')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start

  if (this === target && typeof Uint8Array.prototype.copyWithin === 'function') {
    // Use built-in when available, missing from IE11
    this.copyWithin(targetStart, start, end)
  } else if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (var i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, end),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if ((encoding === 'utf8' && code < 128) ||
          encoding === 'latin1') {
        // Fast path: If `val` fits into a single byte, use that numeric value.
        val = code
      }
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : new Buffer(val, encoding)
    var len = bytes.length
    if (len === 0) {
      throw new TypeError('The value "' + val +
        '" is invalid for argument "value"')
    }
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node takes equal signs as end of the Base64 encoding
  str = str.split('=')[0]
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = str.trim().replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

// ArrayBuffers from another context (i.e. an iframe) do not pass the `instanceof` check
// but they should be treated as valid. See: https://github.com/feross/buffer/issues/166
function isArrayBuffer (obj) {
  return obj instanceof ArrayBuffer ||
    (obj != null && obj.constructor != null && obj.constructor.name === 'ArrayBuffer' &&
      typeof obj.byteLength === 'number')
}

function numberIsNaN (obj) {
  return obj !== obj // eslint-disable-line no-self-compare
}

},{"base64-js":79,"ieee754":82}],82:[function(require,module,exports){
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = ((value * c) - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}

},{}],83:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

'use strict';

// If obj.hasOwnProperty has been overridden, then calling
// obj.hasOwnProperty(prop) will break.
// See: https://github.com/joyent/node/issues/1707
function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

module.exports = function(qs, sep, eq, options) {
  sep = sep || '&';
  eq = eq || '=';
  var obj = {};

  if (typeof qs !== 'string' || qs.length === 0) {
    return obj;
  }

  var regexp = /\+/g;
  qs = qs.split(sep);

  var maxKeys = 1000;
  if (options && typeof options.maxKeys === 'number') {
    maxKeys = options.maxKeys;
  }

  var len = qs.length;
  // maxKeys <= 0 means that we should not limit keys count
  if (maxKeys > 0 && len > maxKeys) {
    len = maxKeys;
  }

  for (var i = 0; i < len; ++i) {
    var x = qs[i].replace(regexp, '%20'),
        idx = x.indexOf(eq),
        kstr, vstr, k, v;

    if (idx >= 0) {
      kstr = x.substr(0, idx);
      vstr = x.substr(idx + 1);
    } else {
      kstr = x;
      vstr = '';
    }

    k = decodeURIComponent(kstr);
    v = decodeURIComponent(vstr);

    if (!hasOwnProperty(obj, k)) {
      obj[k] = v;
    } else if (isArray(obj[k])) {
      obj[k].push(v);
    } else {
      obj[k] = [obj[k], v];
    }
  }

  return obj;
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

},{}],84:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

'use strict';

var stringifyPrimitive = function(v) {
  switch (typeof v) {
    case 'string':
      return v;

    case 'boolean':
      return v ? 'true' : 'false';

    case 'number':
      return isFinite(v) ? v : '';

    default:
      return '';
  }
};

module.exports = function(obj, sep, eq, name) {
  sep = sep || '&';
  eq = eq || '=';
  if (obj === null) {
    obj = undefined;
  }

  if (typeof obj === 'object') {
    return map(objectKeys(obj), function(k) {
      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
      if (isArray(obj[k])) {
        return map(obj[k], function(v) {
          return ks + encodeURIComponent(stringifyPrimitive(v));
        }).join(sep);
      } else {
        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
      }
    }).join(sep);

  }

  if (!name) return '';
  return encodeURIComponent(stringifyPrimitive(name)) + eq +
         encodeURIComponent(stringifyPrimitive(obj));
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

function map (xs, f) {
  if (xs.map) return xs.map(f);
  var res = [];
  for (var i = 0; i < xs.length; i++) {
    res.push(f(xs[i], i));
  }
  return res;
}

var objectKeys = Object.keys || function (obj) {
  var res = [];
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) res.push(key);
  }
  return res;
};

},{}],85:[function(require,module,exports){
'use strict';

exports.decode = exports.parse = require('./decode');
exports.encode = exports.stringify = require('./encode');

},{"./decode":83,"./encode":84}]},{},[21])(21)
});
