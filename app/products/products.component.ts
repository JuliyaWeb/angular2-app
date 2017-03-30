import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ProductsService} from  '../_services/products/products.service';
import {Product} from '../_models/product';

@Component({
    moduleId: module.id,
    selector: 'list_products',
    templateUrl: 'products.component.html',
    providers: [ProductsService]
})

export class ProductsComponent implements OnInit {
    products: Product[] = [];

    constructor(private ProductsService: ProductsService, private router: Router) {
    }

    ngOnInit() {
        this.ProductsService.getAll().subscribe(
            data => {
                this.products = data.json();
                this.products.map((products) => {
                    if (products.text != '' && products.text.length >= 80) {
                        products.text = products.text.slice(0, 80);
                        let lastSpace = products.text.lastIndexOf(" ");
                        if (lastSpace > 0) {
                            products.text = products.text.substr(0, lastSpace);
                        }
                        return products.text;
                    }
                });
            });
    }

    gotoDetail(product: Product) {
        let link = ['/detail', product.id];
        this.router.navigate(link);
    }

}