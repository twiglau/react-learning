export const delay = function(ms){
    console.log('this',this); // null
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            let result = Math.random();
            // if(result > .5){
            //     resolve('ok')
            // }else{
            //     reject('发生错误')
            // }
            if(result > .5){
                resolve({code:0, data: result})
            }else{
                resolve({code:1, data: '发生❎'})
            }
        },ms);
    })
}
/**
 * 模拟 node 读取文件函数
 * @param {*} filename 
 * @param {*} callback 
 */
export const readFile = function(filename, callback){
    setTimeout(()=>{
        callback(null, filename + "'s content");
    }, 1000);
}