import {Component, OnInit, Input, Output, EventEmitter, HostListener, forwardRef} from "@angular/core";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
    selector: "rating",
    template: `
<div class="ui star rating" (mouseleave)="resetHovered()"
      [class.disabled]="disabled"
      [ngClass] = "starSize"
      [class.readonly]="readonly" aria-valuemin="0"
      [attr.aria-valuemax]="ratingRange.length" 
      [attr.aria-valuenow]="model">
        <i class="icon" *ngFor="let item of ratingRange; let index = index"
           [ngClass]="index < model ? fullIcon : emptyIcon"
           (mouseenter)="setHovered(item)" 
           (mousemove)="changeHovered($event)"
           (click)="rate(item)" 
           [title]="titles[index] || item"></i>
</div>
`,
    providers: [
        {provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => Rating), multi: true}
    ],
})
export class Rating implements OnInit, ControlValueAccessor {


    @Input() fullIcon = "icon active";
    @Input() emptyIcon = "icon";
    @Input() starSize: string = 'large';
    @Input() readonly: boolean;
    @Input() disabled: boolean;
    @Input() required: boolean;
    @Input() float: boolean;
    @Input() titles: string[] = [];

    @Input()
    set max(max: number) {
        this._max = max;
        this.buildRanges();
    }

    get max() {
        return this._max;
    }

    @Output() onHover = new EventEmitter();
    @Output() onLeave = new EventEmitter();

    model: number;
    preValue: number;
    ratingRange: number[];
    hovered: number = 0;
    hoveredPercent: number = undefined;

    private _max: number = 5;
    private onChange: (m: any) => void;
    private onTouched: (m: any) => void;


    writeValue(value: number): void {
        this.preValue = value;
        this.model = value;
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    ngOnInit() {
        this.buildRanges();
    }

    @HostListener("keydown", ["$event"])

    setHovered(hovered: number): void {
        if (!this.readonly && !this.disabled) {
            this.hovered = hovered;
            this.model = hovered;
            this.onHover.emit(hovered);
        }
    }

    changeHovered(event: MouseEvent): void {
        if (!this.float) return;
        const target = event.target as HTMLElement;
        const relativeX = event.pageX - target.offsetLeft;
        const percent = Math.round((relativeX * 100 / target.offsetWidth) / 10) * 10;
        this.hoveredPercent = percent > 50 ? 100 : 50;
    }

    resetHovered() {
        this.hovered = 0;
        this.model = this.preValue;
        this.hoveredPercent = undefined;
        this.onLeave.emit(this.model);
    }


    rate(value: number) {
        if (!this.readonly && !this.disabled && value >= 0 && value <= this.ratingRange.length) {
            const newValue = this.hoveredPercent ? (value - 1) + this.hoveredPercent / 100 : value;
            this.onChange(newValue);
            this.model = newValue;
            this.writeValue(value);
        }
    }

    private buildRanges() {
        this.ratingRange = this.range(1, this.max);
    }

    private range(start: number, end: number) {
        const foo: number[] = [];
        for (let i = start; i <= end; i++) {
            foo.push(i);
        }
        return foo;
    }
}
