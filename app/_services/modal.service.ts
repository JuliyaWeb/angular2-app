import {Injectable} from '@angular/core';
declare let jQuery: any;

@Injectable()
export class ModalService {

    open(selector: string) {
        jQuery('.modal.' + selector).modal({
            blurring: true,
        }).modal('setting', 'transition', 'vertical flip')
            .modal('show');
    }

    hide() {
        jQuery('.ui.modal').modal('hide');
    }
}
