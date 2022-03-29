

export default function isPlainObject(obj){
    if(typeof obj != 'object' || obj === null){
        return false;
    }
    let proto = obj;
    while(Object.getPrototypeOf(proto)){ // proto.__proto__.__proto__ = Object.prototype
        proto = Object.getPrototypeOf(proto);
    }
    // 走一步相等
    return Object.getPrototypeOf(obj) === proto;
}

/**
 * Object
 * let o = new Object()
 * o.__proto__ = Object.prototype;
 * Object.prototype 是一个纯对象
 */
// let obj = {name: 'zhang-san'}; // new Object  Object.prototype
// console.group()
// console.log(Object.getPrototypeOf(obj))
// console.log(obj.__proto__)
// console.log(Object.getPrototypeOf(obj) === obj.__proto__)
// console.groupEnd()