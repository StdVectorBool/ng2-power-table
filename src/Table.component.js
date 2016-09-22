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
var DefaultTableState_class_1 = require("./DefaultTableState.class");
var sort_selector_class_1 = require('./Sort/sort.selector.class');
var Sort_component_1 = require('./Sort/Sort.component');
var TableComponent = (function () {
    function TableComponent(changeDetectorRef) {
        this.changeDetectorRef = changeDetectorRef;
        this.tableStateChange = new core_1.EventEmitter();
        /*
            if consumer would like to leverage aggresive minification for their
            project they can leverage this callback to select property value
            internally it will be used to sort
        */
        this.propertySelector = new core_1.EventEmitter();
        this.customPipe = null;
    }
    TableComponent.prototype.ngOnInit = function () {
        this.getTableState();
    };
    TableComponent.prototype.preventRefreshDataEvent = function () {
    };
    TableComponent.prototype.getTableState = function () {
        if (!this.tableState) {
            this.tableState = new DefaultTableState_class_1.DefaultTableState();
            this.tableStateChange.emit(this.tableState);
            this.changeDetectorRef.detectChanges();
        }
        return this.tableState;
    };
    TableComponent.prototype.doSort = function (predicate, order) {
        var state = this.getTableState();
        state.sort.predicate = predicate;
        state.sort.order = order;
        this.pipe();
    };
    TableComponent.prototype.doSearch = function (predicate, reverse) {
        // update table state
        // 
        this.pipe();
    };
    TableComponent.prototype.overridePipe = function (func) {
        this.customPipe = func;
        this.pipe();
    };
    TableComponent.prototype.getPropertyValue = function (row) {
        if (!row)
            return undefined;
        var state = this.getTableState();
        if (this.propertySelector.observers.length > 0) {
            var msg = new sort_selector_class_1.PropertyValueSelectorEvent();
            msg.row = row;
            msg.propertyName = state.sort.predicate;
            this.propertySelector.emit(msg);
            return msg.value;
        }
        return row[state.sort.predicate];
    };
    TableComponent.prototype.pipe = function () {
        var _this = this;
        if (this.customPipe) {
            this.customPipe();
            return;
        }
        if (!this.originalArray)
            return;
        var state = this.getTableState();
        // 1. filter array by possible search predicate
        // 2. sort array if predicate
        if (state.sort.predicate) {
            var newArray = new Array();
            newArray = this.originalArray.sort(function (a, b) {
                var aValue = _this.getPropertyValue(a);
                var bValue = _this.getPropertyValue(b);
                // null or undefined values should be first
                if (!aValue)
                    return 1;
                var filter = aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
                // Descending order only if items not equal, and descending selected.
                if (state.sort.order === Sort_component_1.SortOrder.Descending
                    && filter !== 0) {
                    filter = filter * -1;
                }
                ;
                return filter;
            });
            this.displayArray = newArray;
        }
        // 3. splice array by pageSize if applicable
    };
    ;
    __decorate([
        core_1.Input('pt-original'), 
        __metadata('design:type', Array)
    ], TableComponent.prototype, "originalArray", void 0);
    __decorate([
        core_1.Input('pt-table'), 
        __metadata('design:type', Array)
    ], TableComponent.prototype, "displayArray", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], TableComponent.prototype, "tableState", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], TableComponent.prototype, "tableStateChange", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], TableComponent.prototype, "propertySelector", void 0);
    TableComponent = __decorate([
        core_1.Directive({
            selector: "[pt-table]"
        }), 
        __metadata('design:paramtypes', [core_1.ChangeDetectorRef])
    ], TableComponent);
    return TableComponent;
}());
exports.TableComponent = TableComponent;
//# sourceMappingURL=Table.component.js.map