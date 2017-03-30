"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
require('rxjs/add/operator/map');
var AuthenticationService = (function () {
    function AuthenticationService(http) {
        this.http = http;
        this.init();
    }
    AuthenticationService.prototype.init = function () {
        // set token if saved in local storage
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.loggedIn = !!(this.currentUser && this.currentUser.token);
    };
    AuthenticationService.prototype.jwt = function () {
        // create authorization header with jwt token
        if (this.currentUser && this.currentUser.token) {
            var headers = new http_1.Headers({ 'Authorization': 'Token ' + this.currentUser.token });
            return new http_1.RequestOptions({ headers: headers });
        }
    };
    AuthenticationService.prototype.create = function (username, password) {
        return this.http.post('http://smktesting.herokuapp.com/api/register/', {
            username: username,
            password: password
        }).map(function (resp) { return resp.json(); });
    };
    AuthenticationService.prototype.login = function (username, password) {
        var _this = this;
        return this.http.post('http://smktesting.herokuapp.com/api/login/', {
            username: username,
            password: password
        }, this.jwt())
            .map(function (response) {
            // login successful if there's a jwt token in the response
            var token = response.json() && response.json().token;
            if (token) {
                // store username and jwt token in local storage to keep user
                localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));
                _this.init();
            }
            return response.json();
        });
    };
    AuthenticationService.prototype.logout = function () {
        // clear token remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.init();
    };
    AuthenticationService.prototype.isLoggedIn = function () {
        return this.loggedIn;
    };
    AuthenticationService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], AuthenticationService);
    return AuthenticationService;
}());
exports.AuthenticationService = AuthenticationService;
//# sourceMappingURL=authentication.service.js.map