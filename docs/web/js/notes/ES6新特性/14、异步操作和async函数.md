# 异步操作和async函数

## 什么是异步编程?

**什么是异步编程?**

所谓"异步": 简单说就是一个任务分成两段, 先执行第一段, 然后转而执行其他任务, 等做好准备, 再回头执行第二段任务; 

**不连续的执行, 叫做异步. ** 相应的, 连续的执行, 就叫做同步; 



## 常见的异步编程方式

### 回调函数

**所谓的回调函数, 就是把任务的第二段代码单独写在一个函数内, 等重新执行该任务时, 就直接调用该函数**

其英文为: callback, 直译过来就是"重新调用". 

### Promise对象

回调函数的问题是: **可能会出现多个回调函数嵌套**

### Generator函数(未学)

Generator函数, 就是一个封装的异步任务, 或者说是异步任务的容器

异步操作需要暂停的地方, 都用到yield语句



## async函数应用

### 基本使用

async函数可使异步操作更加简单; async函数是promise和generator的语法糖

1. 在基本的函数名前面加上**async**关键词, 表示函数体中有异步操作
2. 在函数体中有一个重要的关键词**await** 必须出现在函数的内部, 不能单独使用, 后面紧跟一个**表达式** , 表示的含义是 **必须要等待表达式有相应的返回结果** , 再继续执行后面的代码

```js
async function test(){
    let result = await Math.random();
    console.log(result);
}
test();
```

**async:** 表示函数中有异步操作, await必须出现在async函数内部, 不能单独使用. 

**await:** 表示紧跟其后的表达式需要等待结果, 才能执行后面的代码. 一般情况下, await后面是一个耗时的操作或者一个异步操作

### 异步操作

**一般情况下await后面跟一个耗时的操作或一个异步操作. **

```js
function sleep(seconds){
    return new Promise(function(resolve, reject){
        setTimeout(() => {
            let num = Math.random();
            if(num>0.8){
                resolve('成功了')
            }else{
                reject('失败了')
            }
        }, seconds);
    })
}

async function asyncdemo(){
    let result = await sleep(2000)
    return result;
}
asyncdemo().then(function(data){
    console.log(data);
}).catch(function(err){
    console.log(err);
});
console.log('执行其他代码');
```



### 异常处理

#### 通过try...catch捕获异常;

```js
async function asyncdemo(){
    try {
        let result = await sleep(2000)
        console.log(result);
    } catch (error) {
        console.log(error);
    }
}
asyncdemo()
```

#### 将结果返回后, 通过catch方法捕获异常

> 返回的是一个Promise对象, 可以通过.catch方法 捕获异常

```js
async function asyncdemo(){
    let result = await sleep(2000)
    return result;
}
asyncdemo().then(function(data){
    console.log(data);
}).catch(function(err){
    console.log(err);
});
```

## async函数应用案例

### 封装ajax函数

```js
let getJson = function(url){
    let p = new Promise((resolve, reject)=>{
        let xhr = new XMLHttpRequest();
        xhr.open('GET',url);
        xhr.onreadystatechange = handler;
        xhr.responseType = 'json'
        xhr.setRequestHeader('Accept', 'application/json')
        xhr.send();
        function handler(){
            if(xhr.readyState === 4){
                if(xhr.status === 200){
                    resolve(this.response)
                }else{
                    reject(new Error(this.statusText))
                }
            }
        }
    })  
    return p;
}

async function getajax(){
    try {
        let result = await getJson('http://localhost:8080/....')
        console.log(result);
    } catch (error) {
        console.log(error);
    }
}
getajax()
```



### 请求依赖关系的处理

在前面的案例中, 只发送了一个请求, 但是若需要发送三个请求, 并且第三个请求依赖第二个请求返回的结果, 第二个请求依赖第一个请求的结果, 应该如何处理

```js
function sleep(second, params){
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            resolve(params);
        }, second);
    })
}
async function test(){
    let result1 = await sleep(2000, 'req01');
    let result2 = await sleep(1000, 'req02'+result1);
    let result3 = await sleep(1000, 'req03'+result2);
    console.log(result1,result2,result3);
}
test();
```

## 并行处理的问题

**常见问题:**

由于网速比较慢, 用户访问的页面可能显示不出来, 为了给用户一个友好的体验, 一般都会显示一张loading图片, 当页面展示出来后, 将loading图片隐藏掉. 

**模拟: **

假设用户访问某个页面, 该页面有三个异步请求需要发送, 且三个异步请求之间没有关联, 当是三个请求都结束后才将页面中的loading图片隐藏. 

```js
let result = getJson('....')
let result1 = getJson('....')
let result2 = getJson('....')
let p = await Promise.all([result, result1, result2])
```

