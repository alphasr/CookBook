function addRecipe(){
    window.location.href = '/createRecipe';
}
function cancelRecipe(){
    window.location.href = '/recipes';
}
function addMenu(){
    window.location.href = '/createMenu';
}
function cancelMenu(){
    window.location.href = '/menu';
}
function addUser(){
    window.location.href = '/users/add';
}
function cancelUser(){
    window.location.href = '/users';
}
function addIngredient(){
    window.location.href = '/stock/add';
}
function cancelIngredient(){
    window.location.href = '/stock';
}
$("#btnRight").click(function () {
  var selectedItem = $("#allRecipes option:selected");
  $("#selectedRecipes").append(selectedItem);
});

$("#btnLeft").click(function () {
  var selectedItem = $("#selectedRecipes option:selected");
  $("#allRecipes").append(selectedItem);
});
