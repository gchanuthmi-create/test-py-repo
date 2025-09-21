// Load recipes
async function loadRecipes() {
  try {
    const response = await fetch("recipes.json");
    const recipes = await response.json();
    displayRecipes(recipes);
    setupFilters(recipes);
  } catch (err) {
    console.error("Error loading recipes:", err);
  }
}

// Display recipes
function displayRecipes(recipes) {
  const container = document.getElementById("recipesContainer");
  container.innerHTML = "";

  recipes.forEach(recipe => {
    const card = document.createElement("div");
    card.className = "recipe-card";
    card.innerHTML = `
      <img src="${recipe.image}" alt="${recipe.title}">
      <h3>${recipe.title}</h3>
      <p>${recipe.description}</p>
    `;
    card.addEventListener("click", () => openModal(recipe));
    container.appendChild(card);
  });
}

// Open modal
function openModal(recipe) {
  document.getElementById("recipeModal").style.display = "flex";
  document.getElementById("modalTitle").textContent = recipe.title;
  document.getElementById("modalImage").src = recipe.image;
  document.getElementById("modalDescription").textContent = recipe.description;

  const ingredientsList = document.getElementById("modalIngredients");
  ingredientsList.innerHTML = recipe.ingredients.map(i => `<li>${i}</li>`).join("");

  const stepsList = document.getElementById("modalSteps");
  stepsList.innerHTML = recipe.steps.map(s => `<li>${s}</li>`).join("");

  const nutritionTable = document.getElementById("modalNutrition");
  nutritionTable.innerHTML = `
    <tr><th>Calories</th><td>${recipe.nutrition.calories}</td></tr>
    <tr><th>Protein</th><td>${recipe.nutrition.protein}</td></tr>
    <tr><th>Carbs</th><td>${recipe.nutrition.carbs}</td></tr>
    <tr><th>Fat</th><td>${recipe.nutrition.fat}</td></tr>
  `;
}

// Close modal
document.querySelector(".close").addEventListener("click", () => {
  document.getElementById("recipeModal").style.display = "none";
});
window.addEventListener("click", (e) => {
  if (e.target === document.getElementById("recipeModal")) {
    document.getElementById("recipeModal").style.display = "none";
  }
});

// Search + Filter
function setupFilters(recipes) {
  const searchBar = document.getElementById("searchBar");
  const filterCategory = document.getElementById("filterCategory");

  function applyFilters() {
    const searchValue = searchBar.value.toLowerCase();
    const categoryValue = filterCategory.value;

    const filtered = recipes.filter(r => {
      const matchesSearch = r.title.toLowerCase().includes(searchValue);
      const matchesCategory = categoryValue === "all" || r.category === categoryValue;
      return matchesSearch && matchesCategory;
    });
    displayRecipes(filtered);
  }

  searchBar.addEventListener("input", applyFilters);
  filterCategory.addEventListener("change", applyFilters);
}

loadRecipes();
