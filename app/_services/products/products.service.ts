import {Http, Headers, RequestOptions} from '@angular/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
const url = 'http://smktesting.herokuapp.com';

@Injectable()
export class ProductsService {
    constructor(private http: Http) {
    }

    getAll() {
        return this.http.get(url + '/api/products/');
    }

    getReviews(id: number) {
        return this.http.get(url + '/api/reviews/' + id);
    }

    postReview(id: number, rate: number, text: string) {
        return this.http.post(url + '/api/reviews/' + id, {rate: rate, text: text},this.jwt())
    }

    private jwt() {
        // authorization header jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({'Authorization': 'Token ' + currentUser.token});
            return new RequestOptions({headers: headers});
        }
    }
}