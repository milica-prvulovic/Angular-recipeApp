import { Recipe } from '../recipe.model';
import { Ingredient } from 'src/app/shared/ingredient.model';
import * as RecipeActions from './recipe.actions';
import * as fromApp from '../../store/app.reducers';

export interface FeaturState extends fromApp.AppState {
    recipes: State
}

export interface FeaturState {
    recepies: State
}

export interface State {
    recipes: Recipe[];
}

const initialState: State = {
    recipes: [
        new Recipe(
            'A Test Recipe', 'This is simply a test',
            'https://www.publicdomainpictures.net/pictures/10000/velka/1210-1240955754dalH.jpg#.XJDedF_ApGA.link',
            [
                new Ingredient ('Meet',1),
                new Ingredient ('French Fries', 20)
            ]),
        new Recipe(
            'A Test Recipe', 'This is simply a test',
            'https://www.publicdomainpictures.net/pictures/10000/velka/1210-1240955754dalH.jpg#.XJDedF_ApGA.link',
            [
                new Ingredient ('Buns',2),
                new Ingredient ('Meet', 12)
            ]),
        new Recipe(
            'A Test Recipe', 'This is simply a test',
            'https://www.publicdomainpictures.net/pictures/10000/velka/1210-1240955754dalH.jpg#.XJDedF_ApGA.link',
            [
                new Ingredient ('Lemon',1),
                new Ingredient ('Orange', 20)
            ])
      ]
};

export function recipeReducer(state = initialState, action: RecipeActions.RecipeActions) {
    switch (action.type) {
        case (RecipeActions.SET_RECIPES) :
            return {
                ...state,
                recipes: [...action.payload]
            };
        case (RecipeActions.ADD_RECIPE) :
            return {
                ...state,
                recipes: [...state.recipes, action.payload]
            };
        case (RecipeActions.UPDATE_RECIPE) :
            const recipe = state.recipes[action.payload.index];
            const updateRecipe = {
                ...recipe,
                ...action.payload.updateRecipe
            };
            const recipes = [...state.recipes];
            recipes[action.payload.index] = updateRecipe;
            return {
               ...state,
               recipes: recipes 
            };
        case (RecipeActions.DELETE_RECIPE):
            const oldRecipes = [...state.recipes];
            oldRecipes.splice(action.payload, 1);
            return {
                ...state,
                recipes: oldRecipes
            };
        default: 
            return state;
    }
}