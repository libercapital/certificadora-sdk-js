/*
 * http://jscc.info/
 * Chrome: 13-57
 * Edge: 12-14
 * Firefox 4-52
 * IE: 10-11
 * iOS Safari: 7-10
 * Opera: 12-43
 * Safari: 5.1-
 */
var Liber = (function () {
    'use strict';

    var SDK = {},
        STATES = {
            IDLE: -1,
            EXTENSION_MISSING: 1,
            EXTENSION_MAJOR: 2,
            EXTENSION_MINOR: 3
        },
        status = STATES.IDLE;

    SDK.status = function () {
        return status;
    };

    SDK.checkExtension = function () {
        // check if extension's library is registered on global scope
        if (window.LiberCapitalCertificadora == null) {
            status = STATES.EXTENSION_MISSING;

            return false;
        }

        // check if library's major version is at least 0
        if (window.LiberCapitalCertificadora.Version.MAJOR < 0) {
            status = STATES.EXTENSION_MAJOR;

            return false;
        }

        // check if library's minor version is at least 1
        if (window.LiberCapitalCertificadora.Version.MINOR < 1) {
            status = STATES.EXTENSION_MINOR;

            return false;
        }

        SDK = Object.assign(SDK, window.LiberCapitalCertificadora);

        return true;
    };

    return SDK;
}());

export default Liber;
