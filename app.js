/**
 * Recipe data array containing 8 recipe objects
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

// State Management
let currentFilter = 'all';
let currentSort = 'name'; // Default sort

// DOM Selection
const recipeContainer = document.querySelector('#recipe-container');
const filterButtons = document.querySelectorAll('.filter-btn');
const sortButtons = document.querySelectorAll('.sort-btn');

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
 * Filter recipes based on the selected criteria
 * Pure function: returns a new array, does not mutate original
 */
const filterRecipes = (recipes, filter) => {
    if (filter === 'all') {
        return [...recipes]; // Return shallow copy
    }
    if (filter === 'quick') {
        return recipes.filter(recipe => recipe.time < 30);
    }
    // Filter by difficulty (easy, medium, hard)
    return recipes.filter(recipe => recipe.difficulty === filter);
};

/**
 * Sort recipes based on the selected criteria
 * Pure function: returns a new array, does not mutate original
 */
const sortRecipes = (recipes, sortBy) => {
    const sorted = [...recipes]; // Create copy to avoid mutating

    if (sortBy === 'name') {
        sorted.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'time') {
        sorted.sort((a, b) => a.time - b.time);
    }

    return sorted;
};

/**
 * Central update function to combine filter and sort logic
 */
const updateDisplay = () => {
    // 1. Filter
    const filtered = filterRecipes(recipes, currentFilter);

    // 2. Sort
    const finalRecipes = sortRecipes(filtered, currentSort);

    // 3. Render
    const recipesHTML = finalRecipes
        .map(recipe => createRecipeCard(recipe))
        .join('');

    recipeContainer.innerHTML = recipesHTML;
};

// Event Listeners for Filters
filterButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        // Update active class
        filterButtons.forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');

        // Update state and display
        currentFilter = e.target.getAttribute('data-filter');
        updateDisplay();
    });
});

// Event Listeners for Sorting
sortButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        // Update active class (optional for sort buttons, but good for UX)
        sortButtons.forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');

        // Update state and display
        currentSort = e.target.getAttribute('data-sort');
        updateDisplay();
    });
});

// Initialize App
updateDisplay();
