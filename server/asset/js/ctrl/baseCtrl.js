'use strict';

var taskApp = angular.module('taskApp', ['ngStorage']);
taskApp.run(function ($rootScope) {});

taskApp.controller('baseCtrl', ['$scope', '$localStorage', '$sessionStorage', function ($scope, $localStorage, $sessionStorage, $http) {
	console.log($localStorage, $sessionStorage, $http);

	$scope.allTask = [];
	$scope.undoneTask = [];

	function checkToken() {
		console.log('Получаю токен...');
		return new Promise(function (resolve, reject) {
			if (localStorage.taskToken || sessionStorage.taskToken) {
				$http({
					method: 'POST',
					url: 'http://localhost:8080/allTasks'
				}).then(resolve, reject);
			} else {
				reject('Токен не найден');
			}
		});
	}
	checkToken().then(function (data) {
		console.log(data);
	}).catch(function (error) {
		console.log(error);
		//window.location = '/login';
	});
	// 1. Проверить наличие токена или id
	// 2. Если id есть то, получаем все taski, ajax
	// 3. Если id не то мы редиректим на страницу логина
}]);