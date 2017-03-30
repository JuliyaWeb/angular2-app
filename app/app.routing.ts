import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './home/home.component'
import {ProductDetailComponent} from './products/index';

const appRoutes: Routes = [
    {
        path: '',
        component: HomeComponent,
        pathMatch: 'full'
    },

    {
        path: 'detail/:id',
        component: ProductDetailComponent
    },

    {
        path: '**', redirectTo: ''
    }
];

export const routing = RouterModule.forRoot(appRoutes);