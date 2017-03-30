import {Component} from '@angular/core';
import {AuthenticationService, MessageService, ModalService} from '../_services/index';
import {NgForm} from '@angular/forms';

@Component({
    moduleId: module.id,
    selector: 'register',
    templateUrl: 'register.component.html',
    providers: [MessageService, ModalService]
})

export class RegisterComponent {
    model: any = {};

    constructor(private userService: AuthenticationService, private messageService: MessageService, private modalService: ModalService) {
    }

    register(form: NgForm) {
        this.userService.create(this.model.userName, this.model.password)
            .subscribe(
                data => {
                    if (data.success == false) {
                        this.messageService.error('Error.', data.message);
                    }
                    else {
                        this.messageService.success('Your user registration was successful.', 'You may now log-in with the username you have chosen');
                        form.onReset();
                    }
                },
                error => {
                    this.messageService.error('Error.', error);
                });
    }

}