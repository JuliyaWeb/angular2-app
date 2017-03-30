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
var http_1 = require('@angular/http');
var core_1 = require('@angular/core');
require('rxjs/add/operator/catch');
require('rxjs/add/observable/throw');
var url = 'http://smktesting.herokuapp.com';
var ProductsService = (function () {
    function ProductsService(http) {
        this.http = http;
        var productStorage = JSON.parse(localStorage.getItem('productStorage'));
    }
    ProductsService.prototype.getAll = function () {
        return this.http.get(url + '/api/products/');
    };
    ProductsService.prototype.getReviews = function (id) {
        return this.http.get(url + '/api/reviews/' + id);
    };
    ProductsService.prototype.postReview = function (id, rate, text) {
        return this.http.post(url + '/api/reviews/' + id, { rate: rate, text: text }, this.jwt());
    };
    ProductsService.prototype.jwt = function () {
        // authorization header jwt token
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            var headers = new http_1.Headers({ 'Authorization': 'Token ' + currentUser.token });
            return new http_1.RequestOptions({ headers: headers });
        }
    };
    ProductsService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], ProductsService);
    return ProductsService;
}());
exports.ProductsService = ProductsService;
//# sourceMappingURL=products.service.js.map