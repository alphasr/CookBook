//copy
angular.module("recipeModule")
.controller("viewRecipeController", viewRecipeController);

viewRecipeController.$inject = ['$scope', '$timeout', 'recipeService']; //inject three service and $timeout angular js ...

function viewRecipeController($scope, $timeout, recipeService) { //inject
	// alert('test view'); //works
	$scope.recipeArr = [];



	getAllRecipe();

	function getAllRecipe() {
		recipeService.getAllRecipe().
		success(function(data) {//fetch the data
			if (data
				&& data.recipeArr
				&& data.recipeArr.length > 0) {

				$scope.recipeArr = data.recipeArr;//set that property

				//alert($scope.recipeArr[0].Id);
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
