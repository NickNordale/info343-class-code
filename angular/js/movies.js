
angular.module('Movies', [])
    .controller('MoviesC', function($scope, $http) {
        $http.get('data/movies-2014.min.json')
            .then(function(results) {
                // new array on scope called movies
                // this is the array of movies from the JSON file
                $scope.movies = results.data;
            });
    });