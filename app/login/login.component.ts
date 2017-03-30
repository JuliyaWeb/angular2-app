import {Component} from '@angular/core';
import {AuthenticationService, MessageService, ModalService} from '../_services/index';
import {NgForm} from '@angular/forms';

@Component({
    moduleId: module.id,
    selector: 'login',
    templateUrl: 'login.component.html',
    providers: [MessageService, ModalService]
})

export class LoginComponent {
    model: any = {};
    errorMassage: boolean = true;

    constructor(private userService: AuthenticationService,
                private messageService: MessageService,
                private modalService: ModalService) {
    }

    login(form: NgForm) {
        this.userService.login(this.model.userName, this.model.password)
            .subscribe(
                data => {
                    if (data.success == false) {
                        this.messageService.error('Error.', data.message);
                    }
                    else {
                        this.errorMassage = false;
                        form.onReset();
                        this.modalService.hide();
                    }
                },
                error => {
                    this.messageService.error('Error', error);
                });
    }

}