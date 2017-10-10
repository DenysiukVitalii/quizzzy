import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {
    constructor(private http: Http) { }

    login(username: string, password: string) {
        let headers = new Headers({"Content-Type": "application/json"});
        let options = new RequestOptions({ headers: headers });

        return this.http.post('http://localhost:8081/authenticate', JSON.stringify({ username: username, password: password, role: 'teacher' }), options)
            .map((response) => {
                // login successful if there's a jwt token in the response
                console.log(response);
                let user = response.json();
                console.log(user);
               /* if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }
                */
                return user;
            });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}