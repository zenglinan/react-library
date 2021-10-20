var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var isDone = false;
//当不赋值的时候，number就是undefined
var u;
//any指的是所有类型都可以
var notSuure = 4;
notSuure = 'haha';
notSuure = false;
//可以用|来规定多种类型
var numberOrString = 234;
numberOrString = 'abc';
//规定数组里面对象类型：
var arr = [1, 2, 3, 4];
arr.push(4);
//对数组里的每一项规定数据类型,同时还限定了数组的长度
var user = ['ss', 123];
var viking = {
    id: 111,
    name: 'dd'
};
//对函数的参数 和 返回的类型 进行类型限制：
function add(x, y, z) {
    if (x === void 0) { x = 10; }
    if (typeof z === 'number') {
        return x + y + z;
    }
    else {
        return x + y;
    }
}
//此处=>不是箭头函数，是ts中声明函数返回值类型的一种方法
var add2 = add;
//可在一些属性上加上如：private（只有自己可访问）、proteced（只有自己和子女可以访问）、readOnly（只可以读）
var Animal = /** @class */ (function () {
    function Animal(name) {
        this.name = name;
    }
    Animal.prototype.run = function () {
        return this.name + " is running ";
    };
    return Animal;
}());
var snake = new Animal('lily');
var Dog = /** @class */ (function (_super) {
    __extends(Dog, _super);
    function Dog() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Dog.prototype.bark = function () {
        return this.name + " is barking";
    };
    return Dog;
}(Animal));
var xiaobao = new Dog('dd');
console.log(xiaobao.run());
var Cat = /** @class */ (function (_super) {
    __extends(Cat, _super);
    function Cat(name) {
        var _this = _super.call(this, name) || this;
        console.log(_this.name);
        return _this;
    }
    Cat.prototype.run = function () {
        return 'miao,' + _super.prototype.run.call(this);
    };
    return Cat;
}(Animal));
var maomao = new Cat('maomao');
console.log(maomao.run());
var Car = /** @class */ (function () {
    function Car() {
    }
    Car.prototype.swichRadio = function () { };
    return Car;
}());
var Cellphone = /** @class */ (function () {
    function Cellphone() {
    }
    Cellphone.prototype.swichRadio = function () {
    };
    Cellphone.prototype.check = function () { };
    return Cellphone;
}());
//使用组合接口
var xx = /** @class */ (function () {
    function xx() {
    }
    xx.prototype.swichRadio = function () {
    };
    xx.prototype.check = function () { };
    return xx;
}());
var value = 'UP';
if (value === "UP" /* Up */) {
    console.log('go up!');
}
//范型
//这样使得参数和返回值的类型保持一致
function echo(arg) {
    return arg;
}
var str = 'str';
var result = echo(str);
function swap(tuple) {
    return [tuple[1], tuple[0]];
}
var result2 = swap(['string', 123]);
//extends表示匹配的意思，T必须包含所匹配的对象的属性
function loggingIdentity(arg) {
    console.log(arg.length);
    return arg;
}
function echoWithArr(arg) {
    console.log(arg.length);
    return arg;
}
//希望被推入的和被推出的数据类型保持一致
var Queue = /** @class */ (function () {
    function Queue() {
        this.data = [];
    }
    //传入的参数是T类型的
    Queue.prototype.push = function (item) {
        return this.data.push(item);
    };
    //返回的值是T类型的
    Queue.prototype.pop = function () {
        return this.data.shift();
    };
    return Queue;
}());
//可以在创建实例的时候对参数和返回值进行约束
var queue = new Queue();
queue.push(1);
var queuePop = queue.pop();
if (queuePop) {
    console.log(queuePop.toFixed());
}
var kp1 = { key: 123, value: 'ss' };
function plus(a, b) {
    return a + b;
}
var a = plus;
function sum(x, y) {
    return x + y;
}
var sum2 = sum;
function getName(n) {
    if (typeof n === 'string') {
        return n;
    }
    else {
        return n();
    }
}
//类型断言
function getLength(input) {
    // const str =input as String
    // if(str.length){
    //     return str.length
    // }else{
    //     const number =input as Number
    //     return number.toString().length
    // }
    if (input.length) {
        return input.length;
    }
    else {
        return input.toString().length;
    }
}
export var a1 = 1;
