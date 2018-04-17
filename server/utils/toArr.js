function toArr(obj) {
    let arr = [],result=[];
    for(let i in obj){
        arr[i] = Object.values(obj[i]);
        result.push(arr[i]);
    }
    return result;
}
module.exports = toArr;