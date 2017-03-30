import {Component} from '@angular/core'
import {AuthenticationService, ModalService} from '../_services/index';

@Component({
    moduleId: module.id,
    selector: 'app_header',
    templateUrl: 'header.component.html',
    providers: [ModalService]
})

export class HeaderComponent {

    constructor(private userService: AuthenticationService, private modalService: ModalService) {
    }

    openModal(selector: string) {
        this.modalService.open(selector);
    }

}

