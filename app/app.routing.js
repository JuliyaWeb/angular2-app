"use strict";
var router_1 = require('@angular/router');
var home_component_1 = require('./home/home.component');
var index_1 = require('./products/index');
var appRoutes = [
    {
        path: '',
        component: home_component_1.HomeComponent,
        pathMatch: 'full'
    },
    {
        path: 'detail/:id',
        component: index_1.ProductDetailComponent
    },
    {
        path: '**', redirectTo: ''
    }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map