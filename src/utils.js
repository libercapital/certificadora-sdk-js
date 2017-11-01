import * as bowserjs from '../node_modules/bowser/bowser.js';

var Utils = (function (bowser) {
    'use strict';

    var _ = {};

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
                return '';
            case 'edge':
            default:
                return '#';
        }
    };

    _.nativeLink = function () {
        return 'https://certificadora.libercapital.com.br/downloads/nativeapp';
    };

    _.supportLink = function () {
        return 'https://certificadora.libercapital.com.br/suporte';
    };

    return _;
}(bowserjs.default));

export default Utils;
