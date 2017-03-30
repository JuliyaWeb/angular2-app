import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms'
import {HttpModule} from '@angular/http';
import {routing} from './app.routing';
// Components
import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {HomeComponent} from './home/home.component'
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {ProductsComponent, ProductDetailComponent} from './products/index';
// Service
import {AuthenticationService} from './_services/index';
// /Directive
import {Tab, Tabs, AlertComponent, EqualValidator, Rating} from './_directives/index';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing,
    ],
    declarations: [
        AppComponent,
        HeaderComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        EqualValidator,
        ProductsComponent,
        ProductDetailComponent,
        AlertComponent,
        Tab,
        Tabs,
        Rating
    ],
    providers: [
        AuthenticationService,
    ],
    bootstrap: [
        AppComponent
    ]
})

export class AppModule {

}