import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FuseConfigService } from '../../../../../core/services/config.service';
import { fuseAnimations } from '../../../../../core/animations';
import {AuthenticationService} from '../../../../../authentication/authentication.service';
import {Router} from '@angular/router';
import {tokenNotExpired , JwtHelper} from 'angular2-jwt';

@Component({
    selector   : 'fuse-login-2',
    templateUrl: './login-2.component.html',
    styleUrls  : ['./login-2.component.scss'],
    animations : fuseAnimations
})
export class FuseLogin2Component implements OnInit
{
    loginForm: FormGroup;
    loginFormErrors: any;
    error = '';
    jwtHelper: JwtHelper = new JwtHelper();

    constructor(
        private fuseConfig: FuseConfigService,
        private formBuilder: FormBuilder,
        private authenticationService: AuthenticationService,
        private router: Router
    )
    {
        if (tokenNotExpired('id_token')) {
            this.router.navigate(['home']);
        }

        this.fuseConfig.setSettings({
            layout: {
                navigation: 'none',
                toolbar   : 'none',
                footer    : 'none'
            }
        });

        this.loginFormErrors = {
            username   : {},
            password: {}
        };
    }

    ngOnInit()
    {
        this.loginForm = this.formBuilder.group({
            username   : ['', [Validators.required]],
            password: ['', Validators.required]
        });

        this.loginForm.valueChanges.subscribe(() => {
            this.onLoginFormValuesChanged();
        });
    }

    storageUser() {
        const token = localStorage.getItem('id_token');
        localStorage.setItem('current_user', JSON.stringify(this.jwtHelper.decodeToken(token)));
    }
    onLoginFormValuesChanged()
    {
        for ( const field in this.loginFormErrors )
        {
            if ( !this.loginFormErrors.hasOwnProperty(field) )
            {
                continue;
            }

            // Clear previous errors
            this.loginFormErrors[field] = {};

            // Get the control
            const control = this.loginForm.get(field);

            if ( control && control.dirty && !control.valid )
            {
                this.loginFormErrors[field] = control.errors;
            }
        }
    }
    onSubmit() {
        this.authenticationService
            .authenticate(this.loginForm.value)
            .subscribe(
                data => {
                    localStorage.setItem('id_token', data.token);
                    this.storageUser();
                    this.router.navigate(['/home']);
                    return false;
                },
                error => this.error = error.message
            );
    }
}
