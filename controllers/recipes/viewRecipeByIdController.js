//copy
angular.module("recipeModule")
.controller("viewRecipeByIdController", viewRecipeByIdController);

viewRecipeByIdController.$inject = ['$scope', '$timeout', '$filter', 'recipeService']; //inject three service and $timeout angular js ...

function viewRecipeByIdController($scope, $timeout, $filter, recipeService) { //inject
	// alert('test view'); //works
	$scope.recipeView = {
		name : "",
		description : ""
	};


	getRecipeById();

	function bindView(recipe) {
		$scope.recipeView.name = recipe.name;
		$scope.recipeView.description = recipe.description;
	}

	function getRecipeById() {
		recipeService.getRecipeById(recipeService.getIdFromEndPoint()).
		success(function(data) {//fetch the data

			// alert('test'+data);//works

			if (data
				&& data.recipeArr
				&& data.recipeArr.length > 0) {

				// alert('test'+data.recipeArr[0]);//works - object object
				bindView(data.recipeArr[0]);

			}
		})
	}

	$scope.currentRecipeId = 0;

	$scope.setCurrentRecipeId = function (recipe_id) {
		$scope.currentRecipeId = recipe_id;
	}

	$scope.deleteRecipe = function () {
		if($scope.currentRecipeId > 0) {
			recipeService.deleteRecipeById($scope.currentRecipeId)
			.success(function (data) {
				if(data && data.status && data.status == 'successful') {
					window.location.href="/recipes";
				}
			})
		}
	}

}
