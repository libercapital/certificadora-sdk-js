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
            READY: 0,
            EXTENSION_MISSING: 1,
            EXTENSION_MAJOR: 2,
            EXTENSION_MINOR: 3,
            NATIVE_MISSING: 4,
            NATIVE_MAJOR: 5,
            NATIVE_MINOR: 6,
            NATIVE_ERROR: 7
        },
        status = STATES.IDLE;

    SDK.status = function () {
        return status;
    };

    SDK.checkExtension = function () {
        return new Promise(function (resolve, reject) {
            // check if extension's library is registered on global scope
            if (window.LiberCapitalCertificadora == null) {
                status = STATES.EXTENSION_MISSING;
                reject();

                return;
            }

            // check if library's major version is at least 0
            if (window.LiberCapitalCertificadora.Version.MAJOR < 0) {
                status = STATES.EXTENSION_MAJOR;
                reject();

                return;
            }

            // check if library's minor version is at least 1
            if (window.LiberCapitalCertificadora.Version.MINOR < 1) {
                status = STATES.EXTENSION_MINOR;
                reject();

                return;
            }

            // check if native app is installed and version requirements
            window.LiberCapitalCertificadora.nativeVersion().then(
                function (version) {
                    // check if native's major version is at least 0
                    if (version.MAJOR < 0) {
                        status = STATES.NATIVE_MAJOR;
                        reject();

                        return;
                    }

                    // check if native's minor version is at least 1
                    if (version.MINOR < 1) {
                        status = STATES.NATIVE_MINOR;
                        reject();

                        return;
                    }

                    // add LiberCapitalCertificadora to SDK scope
                    SDK = Object.assign(SDK, window.LiberCapitalCertificadora);

                    status = STATES.READY;
                    resolve();
                },
                function () {
                    status = STATES.NATIVE_MISSING;
                    reject();
                }
            );
        });
    };

    return SDK;
}());

export default Liber;
