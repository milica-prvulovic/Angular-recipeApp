import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs/Subject';

export class RecipeService{
    recipesChanged = new Subject<Recipe[]>();
   /*  recipesSelected = new EventEmitter<Recipe>(); */
 
   private recipes: Recipe[] =[
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
      ];

      constructor() {}

      setRecipes(recipes: Recipe[]){
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
      }

      getRecipes(){
          return this.recipes.slice();
      }

      getRecipe(index: number) {
          return this.recipes[index];
      }

      addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
      }

      updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
      }

      deleteRecipe(index: number) {
          this.recipes.splice(index, 1);
          this.recipesChanged.next(this.recipes.slice());
      }

}