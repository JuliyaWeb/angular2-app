import {Component} from '@angular/core';
import {AuthenticationService} from '../_services/user/authentication.service';
import {User} from '../_models/user';

@Component({
    moduleId: module.id,
    template: `
        <h1>Products</h1>
        <list_products></list_products>
     `

})

export class HomeComponent {
}