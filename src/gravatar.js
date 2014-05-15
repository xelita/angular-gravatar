/**
 * Angular Module defining a global messages bus.
 *
 */
var gravatarModule = angular.module('gravatarModule', []);

// Constants

/**
 * Constants service used in the whole module.
 */
gravatarModule.constant('gravatarConstants', {
    apiVersion: '1.0.0',
    urls: {
        http: 'http://www.gravatar.com/avatar',
        https: 'https://secure.gravatar.com/avatar'
    },
    images: {
        notfound: '404',
        mysteryman: 'mm',
        identicon: 'identicon',
        monster: 'monsterid',
        wavatar: 'wavatar',
        retro: 'retro',
        blank: 'blank'
    },
    ratings: {
        g: 'g',
        pg: 'pg',
        r: 'r',
        x: 'x'
    }
});

// Services

/**
 * Main service where happens all the magic!
 */
gravatarModule.factory('gravatarService', ['$rootScope', '$log', '$http', 'gravatarConstants', function ($rootScope, $log, $http, gravatarConstants) {


    return {
        /**
         * Return the current API version.
         */
        apiVersion: function () {
            $log.debug('IN gravatarService.apiVersion.');
            return gravatarConstants.apiVersion;
        },

        /**
         * Get the given email hash.
         * For more information: http://en.gravatar.com/site/implement/hash/
         * @param email the email to hash
         * @returns {*}
         */
        emailHash: function (email) {
            $log.debug('IN gravatarService.emailHash.');
            return md5(email.trim().toLowerCase());
        },

        /**
         * Get the Gravatar url of the user identified by the given email address.
         * The url is tweaked with config object. An example of this object is:
         *  {
         *      ssl: true,
         *      ext: 'png',
         *      size: 200,
         *      defaultImage: 'mm',
         *      forceDefaultImage: true,
         *      rating: 'g'
         *  }
         * For more information: http://en.gravatar.com/site/implement/images/
         * @param email
         * @param config
         * @returns string Gravatar url
         */
        getImageUrlFromEmail: function (email, config) {
            $log.debug('IN gravatarService.getImageFromEmail.');
            return this.getImageUrlFromEmailHash(this.emailHash(email), config);
        },

        /**
         * Get the Gravatar url of the user identified by the given hashed email address.
         * The url is tweaked with config object. An example of this object is:
         *  {
         *      ssl: true,
         *      ext: 'png',
         *      size: 200,
         *      defaultImage: 'mm',
         *      forceDefaultImage: true,
         *      rating: 'g'
         *  }
         * For more information: http://en.gravatar.com/site/implement/images/
         * @param emailHash
         * @param config
         * @returns string Gravatar url
         */
        getImageUrlFromEmailHash: function (emailHash, config) {
            $log.debug('IN gravatarService.getImageUrlFromEmailHash.');

            // Use HTTP connection by default
            var gravatarUrl = gravatarConstants.urls.http + '/' + emailHash;

            if (config) {
                $log.debug('Gravatar configuration: ' + angular.toJson(config));

                // SSL mode => Use the HTTPS connection
                if (config.ssl === true) {
                    gravatarUrl = gravatarConstants.urls.https + '/' + emailHash;
                }

                // Adding file-type extension
                if (config.ext) {
                    gravatarUrl += '.' + config.ext;
                }

                // QueryString
                gravatarUrl += '?';

                // Image size
                if (config.size) {
                    gravatarUrl += 's=' + config.size + '&';
                }

                // Default image url
                if (config.defaultImage) {
                    gravatarUrl += 'd=' + encodeURIComponent(config.defaultImage) + '&';
                }

                // Force default image url
                if (config.forceDefaultImage === true) {
                    gravatarUrl += 'f=y&';
                }

                // Image rating
                if (config.rating) {
                    gravatarUrl += 'r=' + config.rating + '&';
                }
            }

            $log.debug('Gravatar url is: ' + gravatarUrl);
            return gravatarUrl;
        }
    };
}]);

// Directives

/**
 * Directive responsible for display Gravatar image.
 */
gravatarModule.directive('gravatarImage', function ($log, gravatarService) {
    return {
        priority: 0,
        restrict: 'E',
        scope: {
            email: '@',
            emailHash: '@',
            ssl: '@',
            ext: '@',
            size: '@',
            defaultImage: '@',
            forceDefaultImage: '@',
            rating: '@'
        },
        template: "<img/>",
        replace: true,
        link: function (scope, element, attr) {

            // Function responsible for initializing the directive
            var gravatarInitFunction = function () {
                $log.debug('IN gravatarImage.gravatarInitFunction.');

                var emailHash = scope.emailHash ? scope.emailHash : gravatarService.emailHash(scope.email);
                $log.debug('email hash is: ' + emailHash);

                // Gravatar config
                var gravatarConfig = {};
                if (scope.ssl === 'true') {
                    gravatarConfig.ssl = true;
                }
                if (scope.ext) {
                    gravatarConfig.ext = scope.ext;
                }
                if (scope.size) {
                    gravatarConfig.size = scope.size;
                }
                if (scope.defaultImage) {
                    gravatarConfig.defaultImage = scope.defaultImage;
                }
                if (scope.forceDefaultImage === 'true') {
                    gravatarConfig.forceDefaultImage = true;
                }
                if (scope.rating) {
                    gravatarConfig.rating = scope.rating;
                }
                $log.debug('Gravatar configuration: ' + angular.toJson(gravatarConfig));

                // Calling Gravatar service
                var gravatarUrl = gravatarService.getImageUrlFromEmailHash(emailHash, gravatarConfig);
                element.attr('src', gravatarUrl);
            };

            // Init the timer
            scope.$watch('email', function () {
                gravatarInitFunction();
            });
            scope.$watch('emailHash', function () {
                gravatarInitFunction();
            });
            scope.$watch('ssl', function () {
                gravatarInitFunction();
            });
            scope.$watch('ext', function () {
                gravatarInitFunction();
            });
            scope.$watch('size', function () {
                gravatarInitFunction();
            });
            scope.$watch('defaultImage', function () {
                gravatarInitFunction();
            });
            scope.$watch('forceDefaultImage', function () {
                gravatarInitFunction();
            });
            scope.$watch('rating', function () {
                gravatarInitFunction();
            });
        }
    };
});