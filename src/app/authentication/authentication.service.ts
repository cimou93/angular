// authentication/authentication.service.ts
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { tokenNotExpired } from 'angular2-jwt';

import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticationService {

    constructor(private http: Http) {}

    public authenticate(user: any) {
        const url     = 'http://api.agricole-wissem.com/api/login_check';
        const body     = new URLSearchParams();
        body.append('_username', user.username);
        body.append('_password', user.password);
        const headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
        const options = new RequestOptions({headers: headers});

        return this.http
            .post(url, body.toString(), options)
            .map((data: Response) => data.json());
    }

    public logout() {
        localStorage.removeItem('id_token');
    }

    public loggedIn() {
        return tokenNotExpired('id_token');
    }
}
