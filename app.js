/**
 * Created by galkremer on 30/11/2015.
 */

var app = angular.module("myApp", []);

app.controller('MainController', ['$scope', function($scope) {
    //$scope.$on('Emmited', function(event, sentObj) {
    //    $scope.$broadcast('Emitted', sentObj);
    //})
}]);

app.controller('ListController', ['$scope','$rootScope', 'contactsService', function($scope, $rootScope, contactsService) {
    $scope.contactsService = contactsService;
    $scope.title = 'My Contact List';
    $scope.selectItem = function(selItem) {
        selItem.selected=!selItem.selected;
        $scope.contactsService.contacts.forEach(function(item) {
            if (item !== selItem) {
                item.selected = false;
            }
        });
        if (selItem.selected) {
            contactsService.currentContact = selItem;
        }
        else {
            contactsService.currentContact = null;
        }
    };
    $scope.addNewContact = function() {
        contactsService.currentContact = null;
        contactsService.contacts.forEach(function(contact) {
            contact.selected = false;
        });
        contactsService.newContact = {name:'', phoneNumber: ''};
    };
}]);

app.controller('DescController', ['$scope','contactsService', function($scope, contactsService){
    $scope.contactsService = contactsService;
    $scope.editContact = function() {
        $scope.isEditing = true;
        $scope.contactsService.editedContact=angular.copy($scope.contactsService.currentContact);
    };
    $scope.save= function() {
        angular.copy($scope.contactsService.editedContact, $scope.contactsService.currentContact);
        $scope.isEditing = false;
    };
    $scope.undo = function() {
        $scope.isEditing = false;
    };
    $scope.deleteContact = function() {
        var index = $scope.contactsService.contacts.indexOf($scope.contactsService.currentContact);
        $scope.contactsService.contacts.splice(index, 1);
    };
    $scope.isEditing = false;
    $scope.$watch('contactsService.currentContact', function(newVal, oldVal, $scope) {
        $scope.isEditing = false;
    });
}]);

app.controller('AddController', ['$scope','contactsService', function($scope, contactsService){
    $scope.contactsService = contactsService;

    $scope.add= function() {
        $scope.contactsService.contacts.push($scope.contactsService.newContact);
        $scope.contactsService.newContact = null;
    };
    $scope.discard= function() {
        $scope.contactsService.newContact = null;
    };
    $scope.$watch('contactsService.currentContact', function(newVal, oldVal, $scope) {
        if (newVal) {
            $scope.contactsService.newContact = null;
        }
    });
}]);

app.service('contactsService', function() {
    return {
        filter: '',
        currentContact: null,
        editedContact: null,
        newContact: null,
        contacts : [{name:'Gal', phoneNumber: '+972543332213', pic: 'http://lorempixel.com/100/100/people/?1'},
        {name:'David', phoneNumber: '+972541112212', pic: 'http://lorempixel.com/100/100/people/?2'},
        {name:'Ofir', phoneNumber: '+972545552213', pic: 'http://lorempixel.com/100/100/people/?3'},
        {name:'Yosi', phoneNumber: '+972543332214', pic: 'http://lorempixel.com/100/100/people/?4'},
        {name:'Hila', phoneNumber: '+972543332215', pic: 'http://lorempixel.com/100/100/people/d?5'}]
    };
});


