import { createSlice } from "@reduxjs/toolkit";

// Define the type of the state
interface Recipe {
    id: number;
    title: string;
    description: string;
    category: string;
    steps: string[];
}

interface RecipeState {
    recipes: Recipe[];
    category: string;
    searchResults: Recipe[];
    searchPerformed: boolean;
}

// Initial State
const initialState: RecipeState = {
    recipes: [
        { 
          id: 0, 
          title: 'Waffles', 
          description: 'Golden, crispy waffles perfect for a delightful breakfast.', 
          category: 'breakfast',
          steps: [
            'Preheat your waffle iron.',
            'In a bowl, mix flour, sugar, baking powder, and salt.',
            'In another bowl, whisk eggs, milk, melted butter, and vanilla extract.',
            'Combine the wet and dry ingredients and stir until smooth.',
            'Pour the batter into the preheated waffle iron and cook until golden brown.'
          ]
        },
        { 
          id: 1, 
          title: 'Chicken Caesar Salad', 
          description: 'A fresh and flavorful salad with tender chicken, crisp romaine, and creamy Caesar dressing.', 
          category: 'lunch',
          steps: [
            'Grill or sauté chicken breasts until fully cooked, then slice into strips.',
            'Chop romaine lettuce and place it in a large salad bowl.',
            'Add croutons and grated Parmesan cheese to the lettuce.',
            'Toss the salad with Caesar dressing until evenly coated.',
            'Top with sliced chicken and serve immediately.'
          ]
        },
        { 
          id: 2, 
          title: 'Burger', 
          description: 'Juicy, mouth-watering burgers with all your favorite toppings.', 
          category: 'dinner',
          steps: [
            'Preheat the grill or a skillet over medium-high heat.',
            'Season ground beef with salt and pepper, then form into patties.',
            'Cook the patties on the grill or skillet until desired doneness, flipping once.',
            'Toast the burger buns on the grill or in a toaster.',
            'Assemble the burgers with your favorite toppings and condiments.'
          ]
        },
        { 
          id: 3, 
          title: 'Chicken & Waffles', 
          description: 'The perfect combination of sweet and savory.', 
          category: 'breakfast',
          steps: [
            'Prepare waffle batter and cook waffles in a preheated waffle iron.',
            'Season chicken with salt, pepper, and your favorite spices.',
            'Fry or bake the chicken until crispy and fully cooked.',
            'Serve the chicken on top of the waffles.',
            'Drizzle with maple syrup or your preferred sauce.'
          ]
        },
        { 
          id: 4, 
          title: 'Pancakes', 
          description: 'Fluffy pancakes with syrup.', 
          category: 'breakfast',
          steps: [
            'In a bowl, mix flour, sugar, baking powder, and salt.',
            'In another bowl, whisk milk, eggs, and melted butter.',
            'Combine the wet and dry ingredients and stir until smooth.',
            'Heat a skillet over medium heat and grease it lightly.',
            'Pour batter onto the skillet and cook until bubbles form, then flip and cook until golden.'
          ]
        },
        { 
          id: 5, 
          title: 'Chicken Sandwich', 
          description: 'Crispy chicken sandwich.', 
          category: 'lunch',
          steps: [
            'Season chicken breasts with salt, pepper, and spices.',
            'Coat the chicken in flour, dip in beaten eggs, and then coat with breadcrumbs.',
            'Fry the chicken until golden and crispy, then drain on paper towels.',
            'Toast sandwich buns and add mayonnaise, lettuce, and tomato.',
            'Place the crispy chicken on the buns and serve.'
          ]
        },
        { 
          id: 6, 
          title: 'Spaghetti', 
          description: 'Spaghetti with marinara sauce.', 
          category: 'dinner',
          steps: [
            'Cook spaghetti according to package instructions until al dente.',
            'Heat marinara sauce in a saucepan over medium heat.',
            'Drain the cooked spaghetti and add it to the saucepan with the marinara sauce.',
            'Toss the spaghetti in the sauce until evenly coated.',
            'Serve hot with grated Parmesan cheese on top.'
          ]
        },
        { 
          id: 7, 
          title: 'Chocolate Cake', 
          description: 'Rich and moist chocolate cake.', 
          category: 'desserts',
          steps: [
            'Preheat the oven to 350°F (175°C) and grease a cake pan.',
            'In a bowl, mix flour, sugar, cocoa powder, baking powder, and salt.',
            'Add eggs, milk, oil, and vanilla extract, and beat until smooth.',
            'Pour the batter into the prepared cake pan and bake for 30-35 minutes.',
            'Let the cake cool before frosting or serving.'
          ]
        },
        { 
          id: 8, 
          title: 'Smoothie', 
          description: 'Refreshing fruit smoothie.', 
          category: 'drinks',
          steps: [
            'Add your choice of fresh or frozen fruits to a blender.',
            'Pour in juice or milk, and add yogurt or ice if desired.',
            'Blend until smooth and creamy.',
            'Taste and adjust sweetness with honey or sugar if needed.',
            'Pour into a glass and enjoy immediately.'
          ]
        },
        {
            id: 9, 
            title: 'Iced Coffee', 
            description: 'A refreshing and energizing iced coffee.', 
            category: 'drinks',
            steps: [
                'Brew a strong cup of coffee and let it cool to room temperature.',
                'Fill a glass with ice cubes.',
                'Pour the cooled coffee over the ice.',
                'Add milk, cream, or sweetener to taste.',
                'Stir well and enjoy your iced coffee.'
            ]
        }
    ],      
    category: '',
    searchResults: [],
    searchPerformed: false,
};

// Create Slice
const recipesSlice = createSlice({
    name: "recipes",
    initialState,
    reducers: {
        addRecipe: (state, action) => {
            if (state.recipes) {
                state.recipes = [...state.recipes, action.payload];
            }
        },
        removeRecipe: (state, action) => {
            if (state.recipes) {
                state.recipes = state.recipes.filter(recipe => recipe.title !== action.payload);
            }
        },
        updateRecipe: (state, action) => {
            const index = state.recipes.findIndex(recipe => recipe.id === action.payload.id);
            if (index !== -1) {
                state.recipes[index] = action.payload;
            }
        },
        resetRecipes: (state) => {
            if (state.recipes) {
                state.recipes = initialState.recipes;
            }
        },
        search: (state, action) => {
            const term = action.payload;
            state.searchResults = [];
        
            if (term === '') {
                state.searchResults = [];
                state.searchPerformed = false;
                state.recipes = state.recipes;
            } else {
                const filteredRecipes = [...state.recipes].filter(recipe => 
                    recipe.title.toLowerCase().includes(term.toLowerCase())
                    // && recipe.category.toLowerCase().includes(term.toLowerCase())
                );
                state.searchResults = filteredRecipes;
                state.searchPerformed = true;
            }

        }
    },
});

// Export Slice actions and reducer
export const { addRecipe, removeRecipe, updateRecipe, resetRecipes, search } = recipesSlice.actions;

export default recipesSlice.reducer;