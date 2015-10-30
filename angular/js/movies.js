
angular.module('Movies', [])
    .controller('MoviesC', function($scope, $http) {
        var ratingsMap = {
            'Not Rated': 0,
            'G': 1,
            'PG': 2,
            'PG-13': 3,
            'R': 4,
            'NC-17': 5,
            'X': 6
        };
        $http.get('data/movies-2014.min.json')
            .then(function(results) {
                // new array on scope called movies
                // this is the array of movies from the JSON file
                $scope.movies = results.data.map(function(movie) {
                    movie.ratingOrdinal = ratingsMap[movie.rating];
                    return movie;
                });

                $scope.distributors = _.uniq(_.pluck($scope.movies, 'distributor'));
            });

        $scope.setSort = function(propName) {
            if ($scope.sortCol === propName) {
                $scope.sortReverse = !$scope.sortReverse;
            } else {
                $scope.sortCol = propName;
                $scope.sortReverse = false;
            }
        }
    });