/**
 * Used to load and execute javascript file. Can be used cross-domain seamlessly.
 * @param file JS file name
 * @param callback Subscribe to get notified when script file is loaded
 **/
function require(file, callback) {
  // create script element

  var script = document.createElement("script");
  script.src = file;

  // monitor script loading

  // IE < 7, does not support onload
  if (callback) {
    script.onreadystatechange = function () {
      if (script.readyState === "loaded" || script.readyState === "complete") {
        // no need to be notified again
        script.onreadystatechange = null;
        // notify user
        callback();
      }
    };

    // other browsers
    script.onload = function () {
      callback();
    };
  }

  // append and execute script
  document.documentElement.firstChild.appendChild(script);
}

/**
 * Used to load and execute javascript file. Suffers from same-domain restriction.
 * @param file JS file name
 * @param callback Subscribe to get notified when script file is loaded
 **/
function requireXhr(file, callback) {
  // object initialization
  const xhr = new XMLHttpRequest();

  // subscribe to request events
  xhr.onreadystatechange = function () {
    // readyState:
    // 0 UNSENT Client has been created. open() not called yet.
    // 1 OPENED open() has been called.
    // 2 HEADERS_RECEIVED send() has been called, and headers and status are available.
    // 3 LOADING Downloading; responseText holds partial data.
    // 4 DONE The operation is complete.

    // when not done, return
    if (xhr.readyState !== 4) {
      return;
    }

    // done, check status code
    if (xhr.status !== 200) // 200 = OK
    {
      return;
    }

    // now the file is loaded,
    // go and execute the script
    eval(xhr.responseText);

    // notify caller
    if (callback) {
      callback();
    }

  };

  // open connection to file
  xhr.open("GET", file, true);

  // send the request
  xhr.send();
}


/**
 * Used to load and execute javascript file.
 * @param file JS file name
 * @param callback Subscribe to get notified when script file is loaded
 **/
function requireAjax(file, callback) {
  jQuery.getScript(file, callback);
}