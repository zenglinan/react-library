let isDone: boolean = false

//当不赋值的时候，number就是undefined
let u: number

//any指的是所有类型都可以
let notSuure: any = 4
notSuure = 'haha';
notSuure = false;

//可以用|来规定多种类型
let numberOrString: number | string = 234;
numberOrString = 'abc'

//规定数组里面对象类型：
let arr: number[] = [1, 2, 3, 4]
arr.push(4)

//对数组里的每一项规定数据类型,同时还限定了数组的长度
let user: [string, number] = ['ss', 123]

//对对象的每一项进行类型和长度限制
interface Person {
    //readonly表示只能在创建的时候赋值，后面不能修改
    readonly id: number;
    name: string;
    //?表示age可以写也可以不写
    age?: number;
}
let viking: Person = {
    id: 111,
    name: 'dd'
}

//对函数的参数 和 返回的类型 进行类型限制：
function add(x: number = 10, y: number, z?: number): number {
    if (typeof z === 'number') {
        return x + y + z
    } else {
        return x + y
    }
}

//此处=>不是箭头函数，是ts中声明函数返回值类型的一种方法
const add2: (x: number, y: number, z: number) => number = add

//可在一些属性上加上如：private（只有自己可访问）、proteced（只有自己和子女可以访问）、readOnly（只可以读）
class Animal {
    protected name: string;
    constructor(name: string) {
        this.name = name
    }
    run() {
        return `${this.name} is running `
    }
}
const snake = new Animal('lily')

class Dog extends Animal {
    bark() {
        return `${this.name} is barking`
    }
}

const xiaobao = new Dog('dd')
console.log(xiaobao.run())

class Cat extends Animal {

    constructor(name: string) {
        super(name)
        console.log(this.name)
    }
    run() {
        return 'miao,' + super.run()
    }
}
const maomao = new Cat('maomao')
console.log(maomao.run())

//接口
interface Radio {
    //void表示什么都不返回
    swichRadio(triggerl: boolean): void;
}
interface Battery {
    check(): any
}
//接口之间的组合
interface radioWithBattery extends Radio {
    check(): any
}
class Car implements Radio {
    swichRadio() { }
}
class Cellphone implements Radio, Battery {
    swichRadio() {

    }
    check() { }
}
//使用组合接口
class xx implements radioWithBattery {
    swichRadio() {

    }
    check() { }
}

//常量枚举
const enum Direction {
    Up = 'UP',
    Down = "DOWN",
    Left = 'LEFT',
    Right = "RIGHT",
}
const value = 'UP'
if (value === Direction.Up) {
    console.log('go up!')
}

//范型
//这样使得参数和返回值的类型保持一致
function echo<T>(arg: T): T {
    return arg
}
const str: string = 'str'
const result: string = echo(str)
function swap<T, U>(tuple: [T, U]): [U, T] {
    return [tuple[1], tuple[0]]
}
const result2 = swap(['string', 123])

interface Lengthwise {
    length: number;
}
//extends表示匹配的意思，T必须包含所匹配的对象的属性
function loggingIdentity<T extends Lengthwise>(arg: T): T {
    console.log(arg.length);
    return arg;
}

function echoWithArr<T>(arg: T[]): T[] {
    console.log(arg.length)
    return arg
}

//希望被推入的和被推出的数据类型保持一致
class Queue<T> {
    private data: T[] = [];
    //传入的参数是T类型的
    push(item: T) {
        return this.data.push(item)
    }
    //返回的值是T类型的
    pop(): T | undefined {
        return this.data.shift()
    }
}

//可以在创建实例的时候对参数和返回值进行约束
const queue = new Queue<number>()
queue.push(1)
const queuePop = queue.pop()
if (queuePop) {
    console.log(queuePop.toFixed())
}

//对key和value进行约束：
interface keyPair<T, U> {
    key: T;
    value: U;
}
let kp1: keyPair<number, string> = { key: 123, value: 'ss' }

interface IPlus<T> {
    (a: T, b: T): T
}
function plus(a: number, b: number): number {
    return a + b;
}
const a: IPlus<number> = plus

//类型别名
type PlusType = (x: number, y: number) => number
function sum(x: number, y: number): number {
    return x + y
}
const sum2: PlusType = sum

type a = () => string
type b = string | a
function getName(n: b): string {
    if (typeof n === 'string') {
        return n
    } else {
        return n()
    }
}

//类型断言
function getLength(input: string | number): number {
    // const str =input as String
    // if(str.length){
    //     return str.length
    // }else{
    //     const number =input as Number
    //     return number.toString().length
    // }
    if ((<string>input).length) {
        return (<string>input).length
    } else {
        return input.toString().length
    }
}


export const a1 = 1