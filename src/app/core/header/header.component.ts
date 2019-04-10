import { Component } from '@angular/core';
import { DataStorageService } from '../../shared/data-storage.service';
import { AuthService } from '../../auth/auth.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent {
/*    @Output() featureSelected = new EventEmitter<string>(); */

/*     onSelect(feature: string){
        this.featureSelected.emit(feature);
    } */
    constructor(private dataStoregeService: DataStorageService,
                private authService: AuthService){}

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