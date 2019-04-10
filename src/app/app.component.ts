import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  //title = 'recipeApp';
  loadedFeature = 'recipe';

  ngOnInit() {
    firebase.initializeApp({
     apiKey:"AIzaSyB3FEA28fCW_VuT3MjlChlhsPLnNGT70HQ",
     authDomain: "ng-recipe-book-2f628.firebaseapp.com"
    });
  }

  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }
}
