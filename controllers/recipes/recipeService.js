//recipeService
angular.module("recipeModule")
.factory("recipeService", recipeService);

recipeService.$inject = ['$http', '$location'];//that can talk to server

function recipeService($http, $location) {
	return {
		createRecipe : function (recipe) {

			return $http.post('/api/createRecipe', //api
			{
				name: recipe.name,
				description: recipe.description,
			});

		},

		getAllRecipe : function() {
			return $http.get('/api/getAllRecipe');//api
		},

		getIdFromEndPoint: function() {
			var absoluteUrl = $location.absUrl();
			var segments = absoluteUrl.split("/");
			var recipe_id = segments[segments.length - 1];
			return recipe_id
		},

		geRecipeById: function(recipe_id) {
			//console.log(recipe_id);
			return $http.get('/api/getRecipeById/' + recipe_id);//api
		},

		updateRecipe : function(recipe, recipe_id) {
			/*console.log(recipe.Name);
			console.log(recipe.Description);

			console.log(recipe_id);*/

			return $http.post('/api/updateRecipe', //api
			{
				name: recipe.name,
				description: recipe.description,

				recipe_id: recipe_id

			});
		},

		deleteRecipeById: function(recipe_id) {
			//return $http.delete('/deleteRecipeById/' + recipe_id);

			return $http['delete']('/api/deleteRecipeById/' + recipe_id);
		}
	};//return object
}
