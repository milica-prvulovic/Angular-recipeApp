import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../../shared/data-storage.service';
import { AuthService } from '../../auth/auth.service';
// import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducers';
import * as fromAuth from '../../auth/store/auth.reducers';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
/*    @Output() featureSelected = new EventEmitter<string>(); */
/*     onSelect(feature: string){
        this.featureSelected.emit(feature);
    } */
    authState: Observable<fromAuth.State>;
    constructor(private dataStoregeService: DataStorageService,
                private authService: AuthService,
                private store: Store<fromApp.AppState>){
                }

    ngOnInit() {
        this.authState = this.store.select('auth');
    }

    onSaveData() {
        this.dataStoregeService.storeRecipes()
        .subscribe(
            (response) => {
                console.log(response);
            }
        );
    }

    onFetchData(){
        this.dataStoregeService.getRecipes();
    }

    onLogout() {
        this.authService.logout();
    }
}