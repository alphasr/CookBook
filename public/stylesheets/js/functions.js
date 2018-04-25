function addRecipe(){
    window.location.href = '/recipes/add';
}
function cancelRecipe(){
    window.location.href = '/recipes';
}
function addMenu(){
    window.location.href = '/menu/add';
}
function cancelMenu(){
    window.location.href = '/menu';
}
$("#btnRight").click(function () {
  var selectedItem = $("#allRecipes option:selected");
  $("#selectedRecipes").append(selectedItem);
});

$("#btnLeft").click(function () {
  var selectedItem = $("#selectedRecipes option:selected");
  $("#allRecipes").append(selectedItem);
});
