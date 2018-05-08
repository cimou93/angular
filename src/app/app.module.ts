import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { Http, HttpModule, RequestOptions } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import 'hammerjs';
import { SharedModule } from './core/modules/shared.module';
import { AppComponent } from './app.component';
import { FuseFakeDbService } from './fuse-fake-db/fuse-fake-db.service';
import { FuseMainModule } from './main/main.module';
import { FuseSplashScreenService } from './core/services/splash-screen.service';
import { FuseConfigService } from './core/services/config.service';
import { FuseNavigationService } from './core/components/navigation/navigation.service';
import { TranslateModule } from '@ngx-translate/core';
import { AppStoreModule } from './store/store.module';
import {Login2Module} from './main/content/pages/authentication/login-2/login-2.module';
import {FuseLogin2Component} from './main/content/pages/authentication/login-2/login-2.component';

import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from './_guard';
import { AuthenticationService } from './authentication/authentication.service';
import {WeatherService} from './services/weather/weather.service';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
    return new AuthHttp( new AuthConfig({}), http, options);
}

const appRoutes: Routes = [
    {
        path        : 'home',
        loadChildren: './main/content/apps/apps.module#FuseAppsModule',
        canActivate: [AuthGuard]

    },
    {
        path        : 'pages',
        loadChildren: './main/content/pages/pages.module#FusePagesModule',
        canActivate: [AuthGuard]
    },
    {
        path        : 'ui',
        loadChildren: './main/content/ui/ui.module#FuseUIModule',
        canActivate: [AuthGuard]
    },
    {
        path        : 'services',
        loadChildren: './main/content/services/services.module#FuseServicesModule',
        canActivate: [AuthGuard]
    },
    {
        path        : 'components',
        loadChildren: './main/content/components/components.module#FuseComponentsModule',
        canActivate: [AuthGuard]
    },
    {
        path        : 'components-third-party',
        loadChildren: './main/content/components-third-party/components-third-party.module#FuseComponentsThirdPartyModule',
        canActivate: [AuthGuard]
    },
    {
        path     : 'login',
        component: FuseLogin2Component
    },
    {
        path      : '**',
        redirectTo: 'home'
    }
];

@NgModule({
    declarations: [
        AppComponent
    ],
    imports     : [
        BrowserModule,
        HttpClientModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(appRoutes),
        SharedModule,
        TranslateModule.forRoot(),
        InMemoryWebApiModule.forRoot(FuseFakeDbService, {
            delay             : 0,
            passThruUnknownUrl: true
        }),
        AppStoreModule,
        FuseMainModule,
        Login2Module,
        ReactiveFormsModule,
        HttpModule
    ],
    providers   : [
        {
            provide: AuthHttp,
            useFactory: authHttpServiceFactory,
            deps: [ Http, RequestOptions ]
        },
        {
            provide: LOCALE_ID,
            useValue: 'fr'
        },
        AuthGuard,
        AuthenticationService,
        FuseSplashScreenService,
        FuseConfigService,
        FuseNavigationService,
        WeatherService
    ],
    bootstrap   : [
        AppComponent
    ]
})
export class AppModule
{
}
