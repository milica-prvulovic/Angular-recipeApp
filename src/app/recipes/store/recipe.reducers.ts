import { Recipe } from '../recipe.model';
import { Ingredient } from 'src/app/shared/ingredient.model';

export interface FeaturState {
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

export function recipeReducer(state = initialState, action) {
    return state;
}