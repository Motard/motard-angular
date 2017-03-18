/**
 * Environment variables
 */

(function (window) {
    window.__env = window.__env || {};

    // API url
    window.__env.apiUrl = 'http://domain-here/';

    window.__env.siteUrl = 'http://domain-here/';

    // API KEY
    window.__env.apiKey = 'JWT Key here';

    // Base url
    window.__env.baseUrl = '/';

    // Starting state
    window.__env.startState = '/';

    // Application name
    window.__env.appName = { short : 'ma', full : 'Motard Angular' };

    // Token Expiration in minutes
    window.__env.accessTokenLimit = 60;
    window.__env.refreshTokenLimit = 10080;

    // Whether or not to enable debug mode
    // Setting this to false will disable console output
    window.__env.enableDebug = true;
}(this));