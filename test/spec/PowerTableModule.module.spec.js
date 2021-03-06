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
var testing_1 = require("@angular/core/testing");
var component_factory_1 = require("./component.factory");
var __1 = require("./../..");
var TestObject = (function () {
    function TestObject(id, name) {
        this.id = id;
        this.name = name;
    }
    return TestObject;
}());
var TestTableComponent = (function () {
    /**
     *
     */
    function TestTableComponent() {
        this.originalData = new Array();
        this.displayData = new Array();
    }
    return TestTableComponent;
}());
TestTableComponent = __decorate([
    core_1.Component({
        selector: 'my-test-component',
        template: "<div></div>"
    }),
    __metadata("design:paramtypes", [])
], TestTableComponent);
describe('PowerTableModule tests', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [TestTableComponent],
            imports: [__1.PowerTableModule]
        });
    });
    it('does create table and set displayData on consumer', testing_1.fakeAsync(function () {
        var template = '<table [ptTable]="originalData" [(tableState)]="tableState" [(ptDisplayArray)]="displayData"></table>';
        var fix = component_factory_1.createComponentFixture(template, [], TestTableComponent);
        var original = new Array();
        for (var i = 0; i < 40; i++) {
            original.push(new TestObject(i, "Name " + i));
        }
        fix.componentInstance.originalData = original;
        fix.detectChanges();
        testing_1.tick();
        expect(fix.componentInstance.displayData).toBeDefined();
        expect(fix.componentInstance.displayData.length).toBe(10);
    }));
});
//# sourceMappingURL=PowerTableModule.module.spec.js.map