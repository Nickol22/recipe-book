window.onload = function () {
    const defaultRecipes = [
      {
        title: "Панкейки з бананом",
        about: "Швидкий і смачний сніданок",
        description: "Змішайте банан, яйце, молоко та борошно. Посмажте на середньому вогні до рум'яності.",
        ingredients: "1 банан, 1 яйце, 50 мл молока, 100 г муки",
        image: "pancake.jpg"
      },
      {
        title: "Лимонад з м’ятою",
        about: "Освіжаючий напій на літо",
        description: "Вичавіть сік лимона, додайте воду, цукор і м’яту. Дайте настоятись у холодильнику.",
        ingredients: "1 лимон, 1 л води, 2 ст. л. цукру, м’ята",
        image: "lemonade_.jpg"
      }
    ];

    let recipes = JSON.parse(localStorage.getItem('recipes')) || [];

    const defaultMap = {};
    defaultRecipes.forEach(r => {
      defaultMap[r.title] = r;
    });

    const existingTitles = new Set(recipes.map(r => r.title));

    defaultRecipes.forEach(def => {
      if (!existingTitles.has(def.title)) {
        recipes.unshift(def);
      }
    });

    recipes = recipes.map(r => {
      const def = defaultMap[r.title] || {};
      return {
        ...r,
        about: r.about || def.about || '',
        description: r.description || def.description || '',
        ingredients: r.ingredients || def.ingredients || '',
      };
    });

    localStorage.setItem('recipes', JSON.stringify(recipes));

    const container = document.getElementById('cardsContainer');
    container.innerHTML = '';

    if (recipes.length === 0) {
      container.innerHTML = '<p>Немає збережених рецептів.</p>';
      return;
    }

    recipes.forEach((recipe, index) => {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <img src="${recipe.image}" alt="${recipe.title}" class="card-image">
        <h3 class="card-title">${recipe.title}</h3>
        <p><strong>Інгредієнти:</strong></p>
        <ul>
          ${recipe.ingredients.split(',').map(ing => `<li>${ing.trim()}</li>`).join('')}
        </ul>
        <button class="card-button" onclick="selectRecipe('${recipe.title}')">Детальніше</button>
        <button class="delete-button" onclick="deleteRecipe(${index})">Видалити</button>
      `;
      container.appendChild(card);
    });
  };

  function selectRecipe(title) {
    localStorage.setItem('selectedRecipe', title);
    location.href = 'evelina.html';
  }

  function deleteRecipe(index) {
    let recipes = JSON.parse(localStorage.getItem('recipes')) || [];
    const removedRecipe = recipes.splice(index, 1);
    localStorage.setItem('recipes', JSON.stringify(recipes));
    alert(`Рецепт "${removedRecipe[0].title}" видалено.`);
    location.reload();
  }