export const delay = function(ms){
    return new Promise(function(resolve, reject){
        setTimeout(function(){
            resolve('ok')
        },ms);
    })
}