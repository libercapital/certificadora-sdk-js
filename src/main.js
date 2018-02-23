/*
 * http://jscc.info/
 * Chrome: 33-57
 * Edge: 12-14
 * Firefox 29-52
 * IE: n/a
 * iOS Safari: 8-10
 * Opera: 20-43
 * Safari: 7.1-
 */
// import Promise from '../node_modules/promise/polyfill.js';
import Utils from './utils.js';
import Support from './support.js';

var SDK = (function (Utils, Support) {
  'use strict';

  var _ = {
      STATES: {
        IDLE: -1,
        READY: 0,
        EXTENSION_MISSING: 1,
        EXTENSION_MAJOR: 2,
        EXTENSION_MINOR: 3,
        NATIVE_MISSING: 4,
        NATIVE_MAJOR: 5,
        NATIVE_MINOR: 6,
        NATIVE_ERROR: 7
      },
      Support: Support,
      Utils: Utils
    },
    status       = _.STATES.IDLE,
    hasExtension = false,
    hasNative    = false,
    isExtended   = false;

  _.status = function () {
    return status;
  };

  _.hasExtension = function () {
    return hasExtension;
  };

  _.hasNative = function () {
    return hasNative;
  };

  _.extensionCheck = function () {
    return new Promise(function (resolve, reject) {
      // check if extension's library is registered on global scope
      if (typeof window.AssinaMeExtension === 'undefined') {
        hasExtension = false;
        status = _.STATES.EXTENSION_MISSING;
        reject(new Error('Extension is missing'));

        return;
      }

      hasExtension = true;

      // check if library's major version is at least 0
      if (window.AssinaMeExtension.version.MAJOR < 0) {
        status = _.STATES.EXTENSION_MAJOR;
        reject(new Error('Extension major version is not supported'));

        return;
      }

      // check if library's minor version is at least 1
      if (window.AssinaMeExtension.version.MINOR < 1) {
        status = _.STATES.EXTENSION_MINOR;
        reject(new Error('Extension minor version is not supported'));

        return;
      }

      if (! isExtended) {
        isExtended = true;

        // add AssinaMeExtension to _ scope
        _ = Object.assign(_, window.AssinaMeExtension);
      }

      resolve(_.version.MAJOR + '.' + _.version.MINOR);
    });
  };

  _.nativeCheck = function (timeout) {
    return new Promise(function (resolve, reject) {
      if (typeof window.AssinaMeExtension === 'undefined') {
        hasExtension = false;
        status = _.STATES.EXTENSION_MISSING;
        reject(new Error('Extension is missing'));

        return;
      }

      // check if native app is installed and version requirements
      window.AssinaMeExtension.nativeVersion(timeout).then(
        function (response) {
          hasNative = true;
          // check if native's major version is at least 0
          if (response.MAJOR < 0) {
            status = _.STATES.NATIVE_MAJOR;
            reject(new Error('Native App major version is not supported'));

            return;
          }

          // check if native's minor version is at least 1
          if (response.MINOR < 1) {
            status = _.STATES.NATIVE_MINOR;
            reject(new Error('Native App minor version is not supported'));

            return;
          }

          status = _.STATES.READY;
          resolve(response.MAJOR + '.' + response.MINOR);
        },
        function () {
          hasNative = false;
          status = _.STATES.NATIVE_MISSING;
          reject(new Error('Native App is missing'));
        }
      );
    });
  };

  _.systemCheck = function (timeout) {
    return Promise.all([_.extensionCheck(), _.nativeCheck(timeout)]);
  };

  return _;
}(Utils, new Support(Utils.currentBrowser(), Utils.currentOS())));

export default SDK;
