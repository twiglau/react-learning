/**
 * 1. 一个所谓的 Transaction 就是将需要执行的 method 使用 wrapper 封装起来,
 * 再通过 Transaction 提供的 perform 方法执行;
 * 2. 而在 perform 之前, 先执行所有 wrapper 中的 initialize 方法; perform 完成之后 (
 * 即 mehtod 执行后) 再执行所有的 close 方法
 * 3. 一组 initialize 及 close 方法称为一个 wrapper
 */
function setState() {
    console.log('setState');
}
class Transaction {
    constructor(wrappers) {
        this.wrappers = wrappers; // { initialize, close}
    }
    preform(anyMethod) {
        this.wrappers.forEach(wrapper=>wrapper.initialize());
        anyMethod.call();
        this.wrappers.forEach(wrapper=>wrapper.close());
    }
}

let transaction = new Transaction([{
    initialize() {
        console.log('initialize1');
    },
    close() {
        console.log('close1');
    }
},{
    initialize() {
        console.log('initialize2');
    },
    close() {
        console.log('close2');
    }
}])
transaction.preform(setState);