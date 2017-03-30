import {Component, OnInit} from '@angular/core';
import {ProductsService, AuthenticationService, MessageService, ModalService} from '../_services/index';
import {ActivatedRoute} from '@angular/router';
import {Product} from '../_models/product';
import {} from '@angular/core';

@Component({
    moduleId: module.id,
    templateUrl: 'product-detail.component.html',
    providers: [ProductsService, MessageService, ModalService],
})

export class ProductDetailComponent implements OnInit {
    product: Product;
    productId: number;
    reviews: {};
    model: any = {};
    currentRate: number = 0;
    countRate: number;


    constructor(private route: ActivatedRoute,
                private ProductsService: ProductsService,
                private userService: AuthenticationService,
                private messageService: MessageService,
                private modalService: ModalService) {
    }

    ngOnInit() {
        // Get Product
        this.productId = this.route.snapshot.params['id'];
        this.ProductsService.getAll().subscribe(
            data => {
                this.product = data.json().find((d: Product) => d.id == this.productId);
            }
        );
        // Get Reviews Product
        this.allReviews(this.productId);
    }

    allReviews(id: number) {
        this.ProductsService.getReviews(id).subscribe(
            data => {
                this.reviews = data.json();

                // Get countRate
                let sumRates: number = 0;
                for (let prop in this.reviews) {
                    if (this.reviews.hasOwnProperty(prop)) {
                        sumRates += this.reviews[prop].rate;
                    }
                }
                let x: number = sumRates / Object.keys(this.reviews).length;
                this.countRate = Math.round(+x.toFixed(1));
            }
        );
    }

// Add New Review to Product
    addReview() {
        this.ProductsService.postReview(this.productId, this.currentRate, this.model.newReview).subscribe(
            data => {
                this.allReviews(this.productId);
                this.messageService.success('Thanks for your Review.', '', true);
            },
            error => {
                this.messageService.error('Error', error, true);
            });
        this.currentRate = 0;
    };
}