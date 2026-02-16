/**
 * Recipe data array containing 8 recipe objects
 * Following instructions: 2 easy, 2 medium, 2 hard; variety of times.
 */
const recipes = [
    {
        id: 1,
        title: "Creamy Garlic Pasta",
        time: 20,
        difficulty: "easy",
        description: "A quick and delicious pasta dish with a rich garlic cream sauce.",
        category: "pasta"
    },
    {
        id: 2,
        title: "Spicy Chickpea Curry",
        time: 35,
        difficulty: "medium",
        description: "A flavor-packed vegetarian curry with robust spices and coconut milk.",
        category: "curry"
    },
    {
        id: 3,
        title: "Traditional Beef Lasagna",
        time: 90,
        difficulty: "hard",
        description: "Layered with homemade meat sauce and creamy béchamel, baked to perfection.",
        category: "pasta"
    },
    {
        id: 4,
        title: "Zesty Greek Salad",
        time: 15,
        difficulty: "easy",
        description: "Fresh cucumbers, tomatoes, and olives topped with tangy feta cheese.",
        category: "salad"
    },
    {
        id: 5,
        title: "Classic Roast Chicken",
        time: 75,
        difficulty: "medium",
        description: "Succulent chicken roasted with herbs and lemon for a perfect family meal.",
        category: "meat"
    },
    {
        id: 6,
        title: "Chocolate Soufflé",
        time: 45,
        difficulty: "hard",
        description: "A delicate and airy dessert that requires precision and careful timing.",
        category: "dessert"
    },
    {
        id: 7,
        title: "Vegetable Stir Fry",
        time: 25,
        difficulty: "easy",
        description: "Crispy vegetables tossed in a savory soy and ginger sauce.",
        category: "vegetarian"
    },
    {
        id: 8,
        title: "Slow-Cooked Beef Stew",
        time: 180,
        difficulty: "medium",
        description: "Tender beef chunks simmered with vegetables in a rich, hearty broth.",
        category: "meat"
    }
];

// DOM Selection
const recipeContainer = document.querySelector('#recipe-container');

/**
 * Creates an HTML string for a single recipe card
 * @param {Object} recipe - The recipe object
 * @returns {string} HTML Template literal
 */
const createRecipeCard = (recipe) => {
    return `
        <div class="recipe-card" data-id="${recipe.id}">
            <h3>${recipe.title}</h3>
            <div class="recipe-meta">
                <span>⏱️ ${recipe.time} min</span>
                <span class="difficulty ${recipe.difficulty}">${recipe.difficulty}</span>
            </div>
            <p>${recipe.description}</p>
        </div>
    `;
};

/**
 * Renders an array of recipes into the recipe container
 * @param {Array} recipesToRender - Array of recipe objects
 */
const renderRecipes = (recipesToRender) => {
    // Use .map() to transform recipes and .join('') to combine into a single string
    const recipesHTML = recipesToRender.map(recipe => createRecipeCard(recipe)).join('');
    
    // Set the innerHTML of the container
    recipeContainer.innerHTML = recipesHTML;
};

// Initialize the app by rendering all recipes
renderRecipes(recipes);
