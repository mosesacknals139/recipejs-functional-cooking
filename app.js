(function () {
    /**
     * Recipe data array containing 8 recipe objects
     * Enhanced with ingredients and steps (including nested steps)
     */
    const recipes = [
        {
            id: 1,
            title: "Creamy Garlic Pasta",
            time: 20,
            difficulty: "easy",
            category: "pasta",
            description: "A quick and delicious pasta dish with a rich garlic cream sauce.",
            ingredients: [
                "400g spaghetti",
                "4 cloves garlic, minced",
                "2 tbsp butter",
                "1 cup heavy cream",
                "1/2 cup parmesan cheese",
                "Salt and pepper to taste"
            ],
            steps: [
                "Boil a large pot of salted water.",
                "Cook spaghetti according to package instructions.",
                "In a separate pan, melt butter and sauté garlic until fragrant.",
                "Pour in heavy cream and simmer for 5 minutes.",
                "Stir in parmesan cheese until melted.",
                "Toss cooked pasta in the sauce and serve hot."
            ]
        },
        {
            id: 2,
            title: "Spicy Chickpea Curry",
            time: 35,
            difficulty: "medium",
            category: "curry",
            description: "A flavor-packed vegetarian curry with robust spices and coconut milk.",
            ingredients: [
                "2 cans chickpeas, drained",
                "1 onion, chopped",
                "2 tbsp curry powder",
                "1 can coconut milk",
                "1 can diced tomatoes",
                "Spinach (optional)"
            ],
            steps: [
                "Sauté onion in oil until translucent.",
                "Add curry powder and cook/stir for 1 minute.",
                "Add chickpeas and diced tomatoes.",
                "Simmer for 15 minutes.",
                {
                    name: "Finishing touches",
                    substeps: [
                        "Stir in coconut milk.",
                        "Add spinach if using.",
                        "Season with salt and lime juice."
                    ]
                },
                "Serve over rice."
            ]
        },
        {
            id: 3,
            title: "Traditional Beef Lasagna",
            time: 90,
            difficulty: "hard",
            category: "pasta",
            description: "Layered with homemade meat sauce and creamy béchamel, baked to perfection.",
            ingredients: [
                "Lasagna noodles",
                "500g ground beef",
                "1 jar marinara sauce",
                "Ricotta cheese",
                "Mozzarella cheese"
            ],
            steps: [
                "Cook lasagna noodles.",
                "Brown the beef and mix with marinara sauce.",
                {
                    name: "Assembly",
                    substeps: [
                        "Spread sauce on bottom of dish.",
                        "Layer noodles, cheese, and meat sauce.",
                        "Repeat layers until dish is full."
                    ]
                },
                "Bake at 375°F (190°C) for 45 minutes."
            ]
        },
        {
            id: 4,
            title: "Zesty Greek Salad",
            time: 15,
            difficulty: "easy",
            category: "salad",
            description: "Fresh cucumbers, tomatoes, and olives topped with tangy feta cheese.",
            ingredients: [
                "Cucumber, chopped",
                "Tomatoes, chopped",
                "Red onion, sliced",
                "Feta cheese",
                "Kalamata olives",
                "Olive oil & oregano"
            ],
            steps: [
                "Chop all vegetables into bite-sized pieces.",
                "Combine in a large bowl.",
                "Top with blocks of feta and olives.",
                "Drizzle generously with olive oil and sprinkle oregano."
            ]
        },
        {
            id: 5,
            title: "Classic Roast Chicken",
            time: 75,
            difficulty: "medium",
            category: "meat",
            description: "Succulent chicken roasted with herbs and lemon for a perfect family meal.",
            ingredients: [
                "Whole chicken",
                "Lemons",
                "Fresh herbs (rosemary, thyme)",
                "Butter",
                "Vegetables for roasting"
            ],
            steps: [
                "Preheat oven to 400°F (200°C).",
                {
                    name: "Prepare Chicken",
                    substeps: [
                        "Pat chicken dry.",
                        "Stuff cavity with lemon and herbs.",
                        "Rub skin with butter/oil."
                    ]
                },
                "Roast for 1 hour or until internal temp reaches 165°F.",
                "Let rest for 10 minutes before carving."
            ]
        },
        {
            id: 6,
            title: "Chocolate Soufflé",
            time: 45,
            difficulty: "hard",
            category: "dessert",
            description: "A delicate and airy dessert that requires precision and careful timing.",
            ingredients: [
                "Dark chocolate",
                "Butter",
                "Sugar",
                "Eggs (separated)",
                "Vanilla extract"
            ],
            steps: [
                "Melt chocolate and butter together.",
                {
                    name: "Prepare Batter",
                    substeps: [
                        "Whisk egg yolks with sugar.",
                        "Beat egg whites until stiff peaks form.",
                        "Fold chocolate mixture into yolks."
                    ]
                },
                "Gently fold in egg whites.",
                "Bake in ramekins at 375°F for 12-15 minutes.",
                "Serve immediately."
            ]
        },
        {
            id: 7,
            title: "Vegetable Stir Fry",
            time: 25,
            difficulty: "easy",
            category: "vegetarian",
            description: "Crispy vegetables tossed in a savory soy and ginger sauce.",
            ingredients: [
                "Mixed vegetables (broccoli, carrots, peppers)",
                "Soy sauce",
                "Ginger & garlic",
                "Sesame oil"
            ],
            steps: [
                "Prep all vegetables.",
                "Heat oil in a wok or large pan.",
                "Stir fry vegetables for 5-7 minutes.",
                "Add sauce and toss to coat.",
                "Serve hot."
            ]
        },
        {
            id: 8,
            title: "Slow-Cooked Beef Stew",
            time: 180,
            difficulty: "medium",
            category: "meat",
            description: "Tender beef chunks simmered with vegetables in a rich, hearty broth.",
            ingredients: [
                "Beef chuck, cubed",
                "Potatoes",
                "Carrots",
                "Beef broth",
                "Onions & garlic"
            ],
            steps: [
                "Sear beef cubes in a pot.",
                "Sauté onions and garlic.",
                "Add broth and bring to boil.",
                " Simmer on low heat for 2 hours.",
                "Add potatoes and carrots.",
                "Cook for another hour until tender."
            ]
        }
    ];

    // State Management
    let currentFilter = 'all';
    let currentSort = 'name';

    // DOM Selection
    const recipeContainer = document.querySelector('#recipe-container');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const sortButtons = document.querySelectorAll('.sort-btn');

    /**
     * Recursive function to render cooking steps
     * Handles nested steps (objects with name and substeps)
     */
    const renderSteps = (steps) => {
        let html = '<ol>';
        steps.forEach(step => {
            if (typeof step === 'string') {
                html += `<li>${step}</li>`;
            } else if (typeof step === 'object' && step.substeps) {
                html += `
                    <li>
                        <strong>${step.name}:</strong>
                        ${renderSteps(step.substeps)}
                    </li>
                `;
            }
        });
        html += '</ol>';
        return html;
    };

    /**
     * Renders ingredients list
     */
    const renderIngredients = (ingredients) => {
        return `
            <ul>
                ${ingredients.map(ing => `<li>${ing}</li>`).join('')}
            </ul>
        `;
    };

    /**
     * Creates an HTML string for a single recipe card
     * Updated to include toggle buttons and hidden details sections
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
                
                <div class="card-actions">
                    <button class="toggle-btn" data-action="ingredients">Show Ingredients</button>
                    <button class="toggle-btn" data-action="steps">Show Steps</button>
                </div>

                <div class="recipe-details ingredients-section hidden">
                    <h4>Ingredients</h4>
                    ${renderIngredients(recipe.ingredients)}
                </div>

                <div class="recipe-details steps-section hidden">
                    <h4>Instructions</h4>
                    ${renderSteps(recipe.steps)}
                </div>
            </div>
        `;
    };

    /**
     * Filter recipes based on criteria
     */
    const filterRecipes = (recipes, filter) => {
        if (filter === 'all') return [...recipes];
        if (filter === 'quick') return recipes.filter(r => r.time < 30);
        return recipes.filter(r => r.difficulty === filter);
    };

    /**
     * Sort recipes based on criteria
     */
    const sortRecipes = (recipes, sortBy) => {
        const sorted = [...recipes];
        if (sortBy === 'name') {
            sorted.sort((a, b) => a.title.localeCompare(b.title));
        } else if (sortBy === 'time') {
            sorted.sort((a, b) => a.time - b.time);
        }
        return sorted;
    };

    /**
     * Central update display function
     */
    const updateDisplay = () => {
        const filtered = filterRecipes(recipes, currentFilter);
        const finalRecipes = sortRecipes(filtered, currentSort);
        const recipesHTML = finalRecipes.map(createRecipeCard).join('');
        recipeContainer.innerHTML = recipesHTML;
    };

    // Event Listeners for Filters
    filterButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            filterButtons.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            currentFilter = e.target.getAttribute('data-filter');
            updateDisplay();
        });
    });

    // Event Listeners for Sorting
    sortButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            sortButtons.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            currentSort = e.target.getAttribute('data-sort');
            updateDisplay();
        });
    });

    // Event Delegation for Expand/Collapse
    recipeContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('toggle-btn')) {
            const btn = e.target;
            const action = btn.getAttribute('data-action');
            const card = btn.closest('.recipe-card');

            if (action === 'ingredients') {
                const section = card.querySelector('.ingredients-section');
                section.classList.toggle('hidden');
                btn.textContent = section.classList.contains('hidden') ? 'Show Ingredients' : 'Hide Ingredients';
            } else if (action === 'steps') {
                const section = card.querySelector('.steps-section');
                section.classList.toggle('hidden');
                btn.textContent = section.classList.contains('hidden') ? 'Show Steps' : 'Hide Steps';
            }
        }
    });

    // Initialize App
    updateDisplay();

})();
