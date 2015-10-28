/* 
    script for the tasks.html file 
*/

angular.module('tasks', [])
    .constant('tasksKey', 'tasks')
    .controller('taskscontroller', function($scope, tasksKey) {
        'use strict';

        // initialize tasks property on the scope to an empty array
        $scope.tasks = angular.fromJson(localStorage.getItem(tasksKey)) || [];

        // iniitialize newTaskto an empty object
        $scope.newTask = {};

        function saveTasks() {
            localStorage.setItem(tasksKey, angular.toJson($scope.tasks));
        }

        // add a function to add newTask to the array
        $scope.addTask = function() {
            // push the current value of newTask into the tasks array
            $scope.tasks.push($scope.newTask);

            // save the task to local storage
            saveTasks();

            // reset new task to empty object
            $scope.newTask = {};
        };

        // function to toggle task done state
        $scope.toggleDone = function(task) {
            task.done = !task.done;
            saveTasks();
        };
    });
