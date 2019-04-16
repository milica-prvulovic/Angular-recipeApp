import {Injectable} from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import * as RecipeActions from '../store/recipe.actions';
import 'rxjs/add/operator/switchMap';
import { Recipe } from '../recipe.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class RecipeEffects {
    @Effect()
    recipeFetch = this.actions$
    .pipe(ofType(RecipeActions.FETCH_RECIPES))
    .switchMap((action: RecipeActions.FetchRecipes) =>{
        return this.httpClient.get<Recipe[]>('https://ng-recipe-book-2f628.firebaseio.com/recipes.json',
        { observe: 'body',
            responseType: 'json' 
        })
    })
    .pipe(map(
        (recipes) => {
            console.log(recipes);
           for (let recipe of recipes){
             if (!recipe['ingredients']) {
                 console.log(recipe);
                 recipe['ingredients'] = [];
             }
         }
         return {
             type: RecipeActions.SET_RECIPES,
            payload: recipes
         }; 
        }
     ));
  constructor(private actions$: Actions,
                private httpClient: HttpClient){}
}