import {Component, Input} from '@angular/core';

@Component({
    selector: 'tab',
    template: `
    <div [hidden]="!active" class="ui attached segment">
      <ng-content></ng-content>
    </div>
  `
})
export class Tab {
    @Input('tabTitle') title: string;
    @Input() active = false;
}