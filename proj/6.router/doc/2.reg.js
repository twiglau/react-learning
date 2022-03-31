const pathToRegexp = require('path-to-regexp');
// 路径转正则的库
let paramNames = [];
let regexp = pathToRegexp('/user/:id/:name',paramNames,{end:false});
console.log(regexp);
console.log(paramNames);
/**
 * regexp  /^\/user\/([^\/]+?)\/([^\/]+?)(?:\/(?=$))?(?=\/|$)/i
 * [] 表示枚举
 * ^  放在[]里面表示取反
 * +  一个或多个
 * ?   表示懒惰匹配,取消贪婪匹配
 */

paramNames = paramNames.map(ele=>ele.name)
let str = '/user/1/twiglau';
const {url, ...values} = str.match(regexp);
let params = {};
for(let i=0;i<paramNames.length;i++){
    params[paramNames[i]] = values[i];
}
console.log(params);
//{id:1, name:'twiglau'}