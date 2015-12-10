/**
 * Created by galkremer on 30/11/2015.
 */

var app = angular.module("myApp", ['ui.router']);

app.controller('MainController', ['$scope', function($scope) {

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

app.controller('DescController', ['$scope', '$stateParams' , '$state' ,'contactsService', function($scope,  $stateParams, $state, contactsService){
    $scope.contactsService = contactsService;
    $scope.editContact = function() {
        $scope.isEditing = true;
        $scope.contactsService.editedContact = angular.copy($scope.currentContact);
    };
    $scope.save= function() {
        angular.copy($scope.contactsService.editedContact,$scope.currentContact);
        $scope.isEditing = false;
    };
    $scope.undo = function() {
        $scope.isEditing = false;
    };
    $scope.deleteContact = function() {
        $scope.currentContact.isDeleted = true;
        $state.go('contactDeleted');

    };
    contactsService.getUserById($stateParams.userId).then(function(contact) {
        $scope.currentContact = contact;
    });
}]);

app.controller('AddController', ['$scope','contactsService', function($scope, contactsService){
    $scope.contactsService = contactsService;

    $scope.add= function() {
        $scope.contactsService.addContact();
    };
}]);

app.service('contactsService', ['$state', '$http', function($state, $http) {
    var service =  {
        filter: '',
        currentContact: null,
        editedContact: null,
        newContact: null,
        contacts : [{name:'Gal', phoneNumber: '+972543332213', pic: 'http://lorempixel.com/100/100/people/?1', isFavourite: true, isDeleted: false, id: "dEm89iLo2J"},
        {name:'David', phoneNumber: '+972541112212', pic: 'http://lorempixel.com/100/100/people/?2', isFavourite: false, isDeleted: false, id: "dAm89iLo2J"},
        {name:'Ofir', phoneNumber: '+972545552213', pic: 'http://lorempixel.com/100/100/people/?3', isFavourite: true, isDeleted: false, id: "dVm89iLo2J"},
        {name:'Yosi', phoneNumber: '+972543332214', pic: 'http://lorempixel.com/100/100/people/?4', isFavourite: false, isDeleted: false, id: "ZEm89iLo2J"},
        {name:'Hila', phoneNumber: '+972543332215', pic: 'http://lorempixel.com/100/100/people/d?5', isFavourite: true, isDeleted: false, id: "aEm89iLo2J"}]
    };
    service.getUserById = function(id) {
        var promise = $http.get('http://jsonplaceholder.typicode.com/users/9');
         return promise.then(function(res) {
             return service.contacts.filter(function(contact) {
                 return (contact.id === id);
             })[0];
        });
    };
    service.generateId = function() {
        var id = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for( var i=0; i < 10; i++ )
            id += possible.charAt(Math.floor(Math.random() * possible.length));
        return id;
    };
    service.addContact = function() {
        service.newContact.id = service.generateId();
        service.newContact.isDeleted = false;
        service.contacts.push(service.newContact);
        $state.go('contact', {userId: service.newContact.id});
        service.newContact = null;
    };

    return service;
}]);

app.config(function($stateProvider, $urlRouterProvider) {
    //
    // For any unmatched url, redirect to /state1
    $urlRouterProvider.otherwise("/contacts");
    //
    // Now set up the states
    $stateProvider
        .state('contact', {
            url: "/contact/{userId}",
            templateUrl: "contact.html",
            controller: 'DescController'
        //    resolve:{
        //        curCon: service.getUserById = function(id) {
        //            var promise = $http.get('http://jsonplaceholder.typicode.com/users/9');
        //            return promise.then(function(res) {
        //                return service.contacts.filter(function(contact) {
        //                    return (contact.id === id);
        //                })[0];
        //            });
        //        };
        //    }
        })
        .state('addContact', {
            url: "/addContact",
            templateUrl: "add-contact.html",
            controller: 'AddController'
        })
        .state('contactDeleted', {
            url: "/Contacts",
            template: "Contact Deleted"
        })
        .state('contacts', {
            url: "/contacts",
            template: "Welcome to heaven"
        });
});


