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
var router_1 = require('@angular/router');
var products_service_1 = require('../_services/products/products.service');
var ProductsComponent = (function () {
    function ProductsComponent(ProductsService, router) {
        this.ProductsService = ProductsService;
        this.router = router;
        this.products = [];
    }
    ProductsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.ProductsService.getAll().subscribe(function (data) {
            _this.products = data.json();
            _this.products.map(function (products) {
                if (products.text != '' && products.text.length >= 80) {
                    products.text = products.text.slice(0, 80);
                    var lastSpace = products.text.lastIndexOf(" ");
                    if (lastSpace > 0) {
                        console.log(products.text);
                        console.log(lastSpace);
                        products.text = products.text.substr(0, lastSpace);
                    }
                    return products.text;
                }
            });
        });
    };
    ProductsComponent.prototype.gotoDetail = function (product) {
        var link = ['/detail', product.id];
        this.router.navigate(link);
    };
    ProductsComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'list_products',
            templateUrl: 'products.component.html',
            providers: [products_service_1.ProductsService]
        }), 
        __metadata('design:paramtypes', [products_service_1.ProductsService, router_1.Router])
    ], ProductsComponent);
    return ProductsComponent;
}());
exports.ProductsComponent = ProductsComponent;
//# sourceMappingURL=products.component.js.map