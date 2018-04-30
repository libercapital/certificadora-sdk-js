'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bowser = require('bowser');

var _bowser2 = _interopRequireDefault(_bowser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }


var Utils = function (bowser) {
  'use strict';

  var _ = {};

  _.currentPlatform = function () {
    if (bowser.mobile) {
      return 'mobile';
    }

    if (bowser.tablet) {
      return 'tablet';
    }

    return 'computer';
  };

  _.platformDisplayName = function (platformName) {
    platformName = platformName || _.currentPlatform();

    switch (platformName) {
      case 'mobile':
        return 'Mobile';
      case 'tablet':
        return 'Tablet';
      case 'computer':
        return 'Computer';
      default:
        return 'Unknown';
    }
  };

  _.currentOS = function () {
    if (bowser.mac) {
      return 'mac';
    }

    if (bowser.windows) {
      return 'windows';
    }

    if (bowser.linux) {
      return 'linux';
    }

    return 'unknown';
  };

  _.osDisplayName = function (OSName) {
    OSName = OSName || _.currentOS();

    switch (OSName) {
      case 'windows':
        return 'Microsoft Windows';
      case 'mac':
        return 'macOS';
      case 'linux':
        return 'Linux';
      default:
        return 'Unknown';
    }
  };

  _.currentBrowser = function () {
    if (bowser.chrome) {
      return 'chrome';
    }

    if (bowser.firefox) {
      return 'firefox';
    }

    if (bowser.msedge) {
      return 'edge';
    }

    return 'unknown';
  };

  _.browserDisplayName = function (browserName) {
    browserName = browserName || _.currentBrowser();

    switch (browserName) {
      case 'chrome':
        return 'Google Chrome';
      case 'firefox':
        return 'Mozilla Firefox';
      default:
        return 'Unknown';
    }
  };

  _.extensionPage = function (browserName) {
    browserName = browserName || _.currentBrowser();

    switch (browserName) {
      case 'chrome':
        return 'chrome://extensions';
      case 'firefox':
        return 'about:addons';
      default:
        return '#';
    }
  };

  _.extensionLink = function (browserName) {
    browserName = browserName || _.currentBrowser();

    switch (browserName) {
      case 'chrome':
        return 'https://chrome.google.com/webstore/detail/liber-certificadora/jmafcfholebmbmaclbmdfidkgikmjklo';
      case 'firefox':
        return 'https://addons.mozilla.org/en-US/firefox/addon/assina-me/';
      default:
        return '#';
    }
  };

  _.nativeLink = function (OSName) {
    OSName = OSName || _.currentOS();

    switch (OSName) {
      case 'windows':
        return 'https://s3.amazonaws.com/liber-certificadora-files/assina-me.exe';
      case 'mac':
        return 'https://s3.amazonaws.com/liber-certificadora-files/assina-me.pkg';
      default:
        return '#';
    }
  };

  _.supportLink = function () {
    return 'https://certificadora.libercapital.com.br/suporte';
  };

  return _;
}(_bowser2.default); // import * as bowserjs from '../node_modules/bowser/bowser.js';
exports.default = Utils;