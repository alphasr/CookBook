//copy
angular.module("recipeModule")
.controller("recipeController", recipeController);

//['$scope',, '$timeout', 'recipeService'];
recipeController.$inject = ['$scope', '$timeout', 'recipeService'];//inject service and $timeout angular js ...

function recipeController($scope, $timeout, recipeService) { //inject
	//alert('create-test');//works now

	$scope.reservedRecipe = {
		name: "",
		description: ""
	};

	$scope.message = {
		containsSuccesfulMessage: false,
		successfulMessage: ""
	};

	function clearRecipe() {
		$scope.reservedRecipe.name = "";
		$scope.reservedRecipe.description = "";
	}

	function ClearMessage() {
		$scope.message.containsSuccesfulMessage = false;
		$scope.message.successfulMessage = "";
	}

	function displayMessage() {
		$scope.message.containsSuccesfulMessage = true;
		$scope.message.successfulMessage = "A Record added successfully";
	}

	$scope.createRecipe = function(recipe) {
		//inject it here
		// alert('clicked'+recipe);

		recipeService.createRecipe(recipe)
			.success(function (data) {
				if(data.status
					&& data.status == 'successful')
					displayMessage();
				$timeout(function afterTimeOut() {
					ClearMessage();
					clearRecipe();
				}, 5000);

				window.location.href="/recipes";
			});
	}
}
