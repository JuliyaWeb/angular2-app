import {Injectable} from '@angular/core';
import {Http, Headers, Response, RequestOptions} from '@angular/http';
import {User} from '../../_models/user';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticationService {
    loggedIn: boolean;
    currentUser: User;

    constructor(private http: Http) {
        this.init();
    }

    private init() {
        // set token if saved in local storage
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.loggedIn = !!(this.currentUser && this.currentUser.token);
    }

    private jwt() {
        // create authorization header with jwt token
        if (this.currentUser && this.currentUser.token) {
            let headers = new Headers({'Authorization': 'Token ' + this.currentUser.token});
            return new RequestOptions({headers: headers});
        }
    }

    create(username: string, password: string) {
        return this.http.post('http://smktesting.herokuapp.com/api/register/', {
            username: username,
            password: password
        }).map((resp: Response) => resp.json())
    }

    login(username: string, password: string) {
        return this.http.post('http://smktesting.herokuapp.com/api/login/', {
            username: username,
            password: password
        }, this.jwt())
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let token = response.json() && response.json().token;
                if (token) {
                    // store username and jwt token in local storage to keep user
                    localStorage.setItem('currentUser', JSON.stringify({username: username, token: token}));
                    this.init();
                }
                return response.json();
            });
    }

    logout() {
        // clear token remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.init();
    }

    isLoggedIn(): boolean {
        return this.loggedIn;
    }

}


