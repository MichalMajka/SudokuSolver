webpackJsonp(["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\n  <div class=\"col-3\">\n    <div class=\"row border\" style=\"min-width: 700px;\">\n      <div *ngFor=\"let section of sudoku; let i = index\" class=\"col-4 border\">\n        <div *ngFor=\"let row of section; let j = index\" class=\"row\">\n          <div *ngFor=\"let field of row; let k = index\" class=\"col-4 d-flex justify-content-center border\" style=\"padding: 5px\">\n            <input type=\"text\" [(ngModel)]=\"field.value\" maxlength=\"1\" style=\"width: 50px; height: 50px; text-align: center; font-size: 25px;\"/>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n<button (click)=\"Solve()\">Solve</button>\n"

/***/ }),

/***/ "./src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("./node_modules/@angular/http/esm5/http.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AppComponent = /** @class */ (function () {
    function AppComponent(_httpService) {
        this._httpService = _httpService;
        this.sudoku = [
            [[{ value: '' }, { value: '' }, { value: '' }], [{ value: '' }, { value: '' }, { value: '' }], [{ value: '' }, { value: '' }, { value: '' }]], [[{ value: '' }, { value: '' }, { value: '' }], [{ value: '' }, { value: '' }, { value: '' }], [{ value: '' }, { value: '' }, { value: '' }]], [[{ value: '' }, { value: '' }, { value: '' }], [{ value: '' }, { value: '' }, { value: '' }], [{ value: '' }, { value: '' }, { value: '' }]],
            [[{ value: '' }, { value: '' }, { value: '' }], [{ value: '' }, { value: '' }, { value: '' }], [{ value: '' }, { value: '' }, { value: '' }]], [[{ value: '' }, { value: '' }, { value: '' }], [{ value: '' }, { value: '' }, { value: '' }], [{ value: '' }, { value: '' }, { value: '' }]], [[{ value: '' }, { value: '' }, { value: '' }], [{ value: '' }, { value: '' }, { value: '' }], [{ value: '' }, { value: '' }, { value: '' }]],
            [[{ value: '' }, { value: '' }, { value: '' }], [{ value: '' }, { value: '' }, { value: '' }], [{ value: '' }, { value: '' }, { value: '' }]], [[{ value: '' }, { value: '' }, { value: '' }], [{ value: '' }, { value: '' }, { value: '' }], [{ value: '' }, { value: '' }, { value: '' }]], [[{ value: '' }, { value: '' }, { value: '' }], [{ value: '' }, { value: '' }, { value: '' }], [{ value: '' }, { value: '' }, { value: '' }]]
        ];
    }
    AppComponent.prototype.Solve = function () {
        var _this = this;
        var table = this.Translate(this.sudoku);
        var model = table;
        this._httpService.post('Sudoku/Solve', model).subscribe(function (values) {
            _this.solution = values.json();
            debugger;
            for (var i = 0; i < _this.solution.length; i++) {
                var field = _this.getFieldForViewModel(_this.solution[i].field.item1, _this.solution[i].field.item2);
                _this.sudoku[field.section][field.row][field.column].value = _this.solution[i].value;
            }
        });
    };
    AppComponent.prototype.Translate = function (viewModel) {
        var result = new Array(viewModel.length);
        for (var i = 0; i < viewModel.length; i++)
            result[i] = new Array(viewModel.length);
        for (var i = 0; i < viewModel.length; i++) {
            for (var j = 0; j < viewModel[i].length; j++) {
                for (var k = 0; k < viewModel[i][j].length; k++) {
                    var field = this.getFieldForModel(i, j, k);
                    result[field.row][field.column] = this.sudoku[i][j][k].value;
                }
            }
        }
        return result;
    };
    AppComponent.prototype.getFieldForModel = function (i, j, k) {
        return {
            row: j + 3 * Math.floor(i / 3),
            column: k + 3 * (i % 3)
        };
    };
    AppComponent.prototype.getFieldForViewModel = function (row, column) {
        return {
            section: 3 * Math.floor(row / 3) + Math.floor(column / 3),
            row: row % 3,
            column: column % 3
        };
    };
    AppComponent.prototype.ngOnInit = function () {
    };
    AppComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'app-root',
            template: __webpack_require__("./src/app/app.component.html"),
            styles: [__webpack_require__("./src/app/app.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("./node_modules/@angular/platform-browser/esm5/platform-browser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__("./node_modules/@angular/http/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_component__ = __webpack_require__("./src/app/app.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["E" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* HttpModule */]
            ],
            providers: [],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
var environment = {
    production: false
};


/***/ }),

/***/ "./src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("./node_modules/@angular/platform-browser-dynamic/esm5/platform-browser-dynamic.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("./src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("./src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_7" /* enableProdMode */])();
}
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("./src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map