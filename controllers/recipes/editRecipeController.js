//copy
angular.module("recipeModule")
.controller("editRecipeController", editRecipeController);

editRecipeController.$inject = ['$scope', '$timeout', '$filter', 'recipeService']; //inject three service and $timeout angular js ...

function editRecipeController($scope, $timeout, $filter, recipeService) { //inject
	// alert('edit-test');//works
	$scope.recipeEdit = {
		name : "",
		description : ""
	};

	getRecipeById();

	$scope.message = {
		containsSuccessfulMessage: false,
		successfulMessage: ""
	};

	function displayMessage() {
		$scope.message.containsSuccessfulMessage = true;
		$scope.message.successfulMessage = "A Record updated successfully";
	}

	function bindView(recipe) {
		$scope.recipeEdit.name = recipe.name;
		$scope.recipeEdit.description = recipe.description;
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

	$scope.editRecipe = function () {
		// alert('clicked on edit');//works
		//console.log('scope-'+$scope.recipeEdit.categoryName+$scope.recipeEdit.categoryDetails);//What yout type to edit: NodeServerSide - works

		recipeService.updateRecipe($scope.recipeEdit, recipeService.getIdFromEndPoint())
			.success(function (data) {
				if(data
					&& data.status
					&& data.status == 'succesful') {
					displayMessage();
				}

				window.location.href="/recipes";
			});

	}
}
