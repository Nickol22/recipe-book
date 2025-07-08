
function saveRecipe(recipeName) {
    localStorage.setItem('selectedRecipe', recipeName);
    alert('Ви вибрали рецепт: ' + recipeName);
}


window.onload = function () {
    const savedRecipe = localStorage.getItem('selectedRecipe');
    if (savedRecipe) {
        
        console.log('Ваш збережений рецепт: ' + savedRecipe);

        
        const infoElement = document.getElementById('savedRecipeInfo');
        if (infoElement) {
            infoElement.textContent = 'Ваш збережений рецепт: ' + savedRecipe;
        }
    }
};
