/**
 * Created by galkremer on 30/11/2015.
 */

var app = angular.module("myApp", []);

app.controller('MainController', ['$scope', function($scope) {
    //$scope.$on('Emmited', function(event, sentObj) {
    //    $scope.$broadcast('Emitted', sentObj);
    //})
}]);

app.controller('ListController', ['$scope','$rootScope', 'myService', function($scope, $rootScope, myService) {
    $scope.title = 'My list';
    $scope.selectItem = function(selItem) {
        selItem.selected=!selItem.selected;
        $scope.items.forEach(function(item) {
            if (item !== selItem) {
                item.selected = false;
            }
        });
        myService.cMsg = selItem;
       // $rootScope.$broadcast('Emitted', selItem);
    };
    $scope.items = [{name:'Ball', desc: ' This Ball is huge. it is red and hairy.', pic: 'http://lorempixel.com/200/200/people/?1'},
                    {name:'Shoe', desc: ' This shoe is huge. it is blue and fluffy.', pic: 'http://lorempixel.com/200/200/people/?2'},
                    {name:'Bottle', desc: ' This Bottle is small. it is blue and Burb.', pic: 'http://lorempixel.com/200/200/people/?3'},
                    {name:'Horn', desc: ' This Horn is medium. it is yellow and narf.', pic: 'http://lorempixel.com/200/200/people/?4'},
                    {name:'Bed', desc: ' This bed is extra large. it is black and soft.', pic: 'http://lorempixel.com/200/200/people/d?5'}]
}]);

app.controller('DescController', ['$scope','myService', function($scope, myService){
    $scope.msg = {desc: 'default'};
    /*$scope.$on('Emitted', function(event, sentObj){
        $scope.msg = sentObj;
    })*/
    $scope.myService = myService;
}]);

app.service('myService', function() {
    return {txt: 'default msg'};
});


