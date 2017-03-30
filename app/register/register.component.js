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
var RegisterComponent = (function () {
    function RegisterComponent(userService, messageService, modalService) {
        this.userService = userService;
        this.messageService = messageService;
        this.modalService = modalService;
        this.model = {};
    }
    RegisterComponent.prototype.register = function (form) {
        var _this = this;
        this.userService.create(this.model.userName, this.model.password)
            .subscribe(function (data) {
            console.log(data);
            if (data.success == false) {
                _this.messageService.error('Error.', data.message);
            }
            else {
                _this.messageService.success('Your user registration was successful.', 'You may now log-in with the username you have chosen');
                form.onReset();
            }
        }, function (error) {
            console.log(error);
            _this.messageService.error('Error.', error);
        });
    };
    RegisterComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'register',
            templateUrl: 'register.component.html',
            providers: [index_1.MessageService, index_1.ModalService]
        }), 
        __metadata('design:paramtypes', [index_1.AuthenticationService, index_1.MessageService, index_1.ModalService])
    ], RegisterComponent);
    return RegisterComponent;
}());
exports.RegisterComponent = RegisterComponent;
//# sourceMappingURL=register.component.js.map