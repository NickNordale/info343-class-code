
angular.module('ChatApp', ['firebase'])
    .constant('firebaseUrl', 'https://info343chat.firebaseio.com/messages')
    .controller('ChatController', function($scope, $firebaseArray, firebaseUrl) {
        //creat a reference to the firebase
        var ref = new Firebase(firebaseUrl);
        ref.limitToLast(1000);
        $scope.messages = $firebaseArray(ref);

        // initialize form fields
        $scope.name = null;
        $scope.body = null;

        $scope.sendMessage = function() {
            $scope.messages.$add({
                name: $scope.name,
                body: $scope.body,
                createdAt: Firebase.serverValue.TIMESTAMP
            });

            $scope.body = null;
        }; // sendMessage()
    });