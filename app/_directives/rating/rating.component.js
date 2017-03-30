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
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var Rating = (function () {
    function Rating() {
        this.fullIcon = "icon active";
        this.emptyIcon = "icon";
        this.starSize = 'large';
        this.titles = [];
        this.onHover = new core_1.EventEmitter();
        this.onLeave = new core_1.EventEmitter();
        this.hovered = 0;
        this.hoveredPercent = undefined;
        this._max = 5;
    }
    Object.defineProperty(Rating.prototype, "max", {
        get: function () {
            return this._max;
        },
        set: function (max) {
            this._max = max;
            this.buildRanges();
        },
        enumerable: true,
        configurable: true
    });
    Rating.prototype.writeValue = function (value) {
        this.preValue = value;
        this.model = value;
    };
    Rating.prototype.registerOnChange = function (fn) {
        this.onChange = fn;
    };
    Rating.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    Rating.prototype.ngOnInit = function () {
        this.buildRanges();
    };
    Rating.prototype.setHovered = function (hovered) {
        if (!this.readonly && !this.disabled) {
            this.hovered = hovered;
            this.model = hovered;
            this.onHover.emit(hovered);
        }
    };
    Rating.prototype.changeHovered = function (event) {
        if (!this.float)
            return;
        var target = event.target;
        var relativeX = event.pageX - target.offsetLeft;
        var percent = Math.round((relativeX * 100 / target.offsetWidth) / 10) * 10;
        this.hoveredPercent = percent > 50 ? 100 : 50;
    };
    Rating.prototype.resetHovered = function () {
        this.hovered = 0;
        this.model = this.preValue;
        this.hoveredPercent = undefined;
        this.onLeave.emit(this.model);
    };
    Rating.prototype.rate = function (value) {
        if (!this.readonly && !this.disabled && value >= 0 && value <= this.ratingRange.length) {
            var newValue = this.hoveredPercent ? (value - 1) + this.hoveredPercent / 100 : value;
            this.onChange(newValue);
            this.model = newValue;
            this.writeValue(value);
        }
    };
    Rating.prototype.buildRanges = function () {
        this.ratingRange = this.range(1, this.max);
    };
    Rating.prototype.range = function (start, end) {
        var foo = [];
        for (var i = start; i <= end; i++) {
            foo.push(i);
        }
        return foo;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Rating.prototype, "fullIcon", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Rating.prototype, "emptyIcon", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], Rating.prototype, "starSize", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Rating.prototype, "readonly", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Rating.prototype, "disabled", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Rating.prototype, "required", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Rating.prototype, "float", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], Rating.prototype, "titles", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number), 
        __metadata('design:paramtypes', [Number])
    ], Rating.prototype, "max", null);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], Rating.prototype, "onHover", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], Rating.prototype, "onLeave", void 0);
    __decorate([
        core_1.HostListener("keydown", ["$event"]), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Number]), 
        __metadata('design:returntype', void 0)
    ], Rating.prototype, "setHovered", null);
    Rating = __decorate([
        core_1.Component({
            selector: "rating",
            template: "\n<div class=\"ui star rating\" (mouseleave)=\"resetHovered()\"\n      [class.disabled]=\"disabled\"\n      [ngClass] = \"starSize\"\n      [class.readonly]=\"readonly\" aria-valuemin=\"0\"\n      [attr.aria-valuemax]=\"ratingRange.length\" \n      [attr.aria-valuenow]=\"model\">\n        <i class=\"icon\" *ngFor=\"let item of ratingRange; let index = index\"\n           [ngClass]=\"index < model ? fullIcon : emptyIcon\"\n           (mouseenter)=\"setHovered(item)\" \n           (mousemove)=\"changeHovered($event)\"\n           (click)=\"rate(item)\" \n           [title]=\"titles[index] || item\"></i>\n</div>\n",
            providers: [
                { provide: forms_1.NG_VALUE_ACCESSOR, useExisting: core_1.forwardRef(function () { return Rating; }), multi: true }
            ],
        }), 
        __metadata('design:paramtypes', [])
    ], Rating);
    return Rating;
}());
exports.Rating = Rating;
//# sourceMappingURL=rating.component.js.map