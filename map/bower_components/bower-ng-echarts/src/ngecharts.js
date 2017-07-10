(function() {
  'use strict';

  /**
   * Created by liekkas.zeng on 2015/1/7.
   */
  angular.module('ng-echarts', [])
    .directive('ngEcharts', ['$window', function($window) {
      return {
        link: buildLink($window),
        scope: {
          option: '=ecOption',
          config: '=ecConfig'
        },
        restrict: 'EA'
      }
    }]);

  function buildLink($window) {
    return function(scope, element, attrs, ctrl) {
      function refreshChart() {
        var theme = (scope.config && scope.config.theme) ?
          scope.config.theme : 'default';
        var chart = echarts.init(element[0], theme);
        if (scope.config && scope.config.dataLoaded === false) {
          chart.showLoading();
        }

        if (scope.config && scope.config.dataLoaded) {
          chart.setOption(scope.option);
          chart.resize();
          chart.hideLoading();
        }

        if (scope.config && scope.config.event) {
          if (angular.isArray(scope.config.event)) {
            angular.forEach(scope.config.event, function(value, key) {
              for (var e in value) {
                chart.on(e, value[e]);
              }
            });
          }
        }

        angular.element($window).bind('resize', function() {
          chart.resize();
        });
      };

      //自定义参数 - config
      // event 定义事件
      // theme 主题名称
      // dataLoaded 数据是否加载

      scope.$watch(
        function() { return scope.config; },
        function(value) { if (value) { refreshChart(); } },
        true
      );

      //图表原生option
      scope.$watch(
        function() { return scope.option; },
        function(value) { if (value) { refreshChart(); } },
        true
      );
    }
  }
})();
