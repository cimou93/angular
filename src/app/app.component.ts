import { Component } from '@angular/core';
import { FuseSplashScreenService } from './core/services/splash-screen.service';
import { TranslateService } from '@ngx-translate/core';
import { FuseTranslationLoaderService } from './core/services/translation-loader.service';

import { FuseNavigationService } from './core/components/navigation/navigation.service';
import { FuseNavigationModel } from './navigation/navigation.model';
import { locale as navigationEnglish } from './navigation/i18n/en';
import { locale as navigationTurkish } from './navigation/i18n/tr';
import {AuthenticationService} from './authentication/authentication.service';
import {Router} from '@angular/router';

@Component({
    selector   : 'fuse-root',
    templateUrl: './app.component.html',
    styleUrls  : ['./app.component.scss']
})
export class AppComponent
{
    constructor(
        private fuseNavigationService: FuseNavigationService,
        private fuseSplashScreen: FuseSplashScreenService,
        private translate: TranslateService,
        private translationLoader: FuseTranslationLoaderService,
        private authenticationService: AuthenticationService,
        private router: Router
    )
    {
        // Add languages
        this.translate.addLangs(['en', 'tr']);

        // Set the default language
        this.translate.setDefaultLang('en');

        // Use a language
        this.translate.use('en');

        // Set the navigation model
        this.fuseNavigationService.setNavigationModel(new FuseNavigationModel());

        // Set the navigation translations
        this.translationLoader.loadTranslations(navigationEnglish, navigationTurkish);
    }

    // hasAuthToken() {
    //     return localStorage.getItem('id_token') !== null;
    // }
    //
    // logout() {
    //     this.authenticationService.logout();
    //     this.router.navigate(['home']);
    // }
}
