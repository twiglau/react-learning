// let arr = [1, 2, 3];
// let it = arr[Symbol.iterator]();
// console.log(it.next());
// console.log(it.next());
// console.log(it.next());
// console.log(it.next());

const obj = {
    name: 'lau',
    age: 10,
    [Symbol.iterator](){
        let that = this;
        let values = Object.values(that);
        let index = 0;
        return {
            next(){
                return {
                    value: values[index++],
                    done: index > values.length
                }
            }
        }
    }
}
let it = obj[Symbol.iterator]();
console.log(it.next());
console.log(it.next());
console.log(it.next());

