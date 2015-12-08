/**
 * Created by galkremer on 03/12/2015.
 */


app.controller('switchController', ['$rootScope', '$scope', function($rootScope, $scope) {
    $scope.api = {};
    $scope.data = {isSelected: false};
    $scope.disableSwitch = function() {
        alert('testing');
    };
}]);
app.directive('mySwitch', function() {
    return {
        restrict: 'AE',
        replace: true,
        templateUrl: 'switch.html',
        controller: function($scope, $element){
            $scope.switchClass = function() {
                return $scope.switchVal?'switch-on':'';
            }
        },
        scope: {switchVal: '=switchValue'}
    };
});




