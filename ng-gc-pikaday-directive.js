'use strict';

angular.module('gc.pikaday', [
]).directive('pikaday', [
  '$window',
  function pikadayDirective($window) {

    var formatDate = function formatDate(date) {
      return date.format('D MMM YYYY');
    };

    return {
      restrict: 'E',
      scope: {
        date: '=',
        isRequired: '=',
        options: '&'
      },
      replace: true,
      template: '<input type="text" ng-model="date" ng-required="isRequired">',
      link: function pikadayLink(scope, element) {
        var pikadayDefault = {
          field: element[0],
          // moment.js date formatting
          format: 'D MMM YYYY',
          // Set start day of week to monday
          firstDay: 1,
          onSelect: function onSelect() {
            var date = this.getMoment();
            if (date.isValid()) {
              scope.$apply(function(){
                scope.date = formatDate(date);
              });
            }
          }
        };

        var options = scope.options() || {};
        var pikadayOptions = angular.extend({}, pikadayDefault, options);
        var pikaday = new $window.Pikaday(pikadayOptions);

        // Get out of Angulars event loop with setTimeout
        // pikaday.setDate calls 'onSelect' which calls scope.$apply
        $window.setTimeout(function() {
          var date = $window.moment(scope.date);
          if (scope.date && date.isValid()) {
            pikaday.setDate(formatDate(date));
          }
        }, 0);

        scope.pikaday = pikaday;

        scope.$on('$destroy', function pikadayDestroy(){
          scope.pikaday.destroy();
        });
      }
    };

  }
]);
