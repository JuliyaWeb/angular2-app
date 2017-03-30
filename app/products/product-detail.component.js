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
var index_1 = require('../_services/index');
var router_1 = require('@angular/router');
var ProductDetailComponent = (function () {
    function ProductDetailComponent(route, ProductsService, userService, messageService, modalService) {
        this.route = route;
        this.ProductsService = ProductsService;
        this.userService = userService;
        this.messageService = messageService;
        this.modalService = modalService;
        this.model = {};
        this.currentRate = 0;
    }
    ProductDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        // Get Product
        this.productId = this.route.snapshot.params['id'];
        this.ProductsService.getAll().subscribe(function (data) {
            _this.product = data.json().find(function (d) { return d.id == _this.productId; });
        });
        // Get Reviews Product
        this.allReviews(this.productId);
    };
    ProductDetailComponent.prototype.allReviews = function (id) {
        var _this = this;
        this.ProductsService.getReviews(id).subscribe(function (data) {
            _this.reviews = data.json();
            // Get countRate
            var sumRates = 0;
            for (var prop in _this.reviews) {
                if (_this.reviews.hasOwnProperty(prop)) {
                    sumRates += _this.reviews[prop].rate;
                }
            }
            var x = sumRates / Object.keys(_this.reviews).length;
            _this.countRate = Math.round(+x.toFixed(1));
        });
    };
    // Add New Review to Product
    ProductDetailComponent.prototype.addReview = function () {
        var _this = this;
        this.ProductsService.postReview(this.productId, this.currentRate, this.model.newReview).subscribe(function (data) {
            _this.allReviews(_this.productId);
            _this.messageService.success('Thanks for your Review.', '', true);
        }, function (error) {
            _this.messageService.error('Error', error, true);
        });
        this.currentRate = 0;
    };
    ;
    ProductDetailComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: 'product-detail.component.html',
            providers: [index_1.ProductsService, index_1.MessageService, index_1.ModalService],
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, index_1.ProductsService, index_1.AuthenticationService, index_1.MessageService, index_1.ModalService])
    ], ProductDetailComponent);
    return ProductDetailComponent;
}());
exports.ProductDetailComponent = ProductDetailComponent;
//# sourceMappingURL=product-detail.component.js.map