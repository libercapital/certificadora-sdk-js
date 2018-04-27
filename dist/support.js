'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var Support = function Support(currentBrowser, currentOS) {
  this.currentBrowser = currentBrowser;
  this.currentOS = currentOS;
};

Support.prototype.supportedOSes = function () {
  return ['windows'];
};

Support.prototype.isOSSupported = function () {
  return this.supportedOSes().indexOf(this.currentOS) != -1;
};

Support.prototype.supportedBrowsers = function () {
  return ['chrome', 'firefox'];
};

Support.prototype.isBrowserSupported = function () {
  return this.supportedBrowsers().indexOf(this.currentBrowser) != -1;
};

exports.default = Support;