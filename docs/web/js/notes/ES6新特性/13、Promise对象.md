# 13、Promise对象

## 回调地狱问题

在开发中经常使用Ajax发送请求, 可能会出现如下的情况: 

```js
$.ajax(url, success(){
       $.ajax(url2, success(){
            $.ajax(url3, success(){

            })
        })
})
```

在一个Ajax的回调中, 又去发送了另一个Ajax请求, 依次类推, 导致了多个回调函数的嵌套 导致代码不够直观并且难以维护, 这就是常说的  **回调地狱**

要解决这个**回调地狱**的问题, 就要用到**Promise对象**

## promise对象定义

> 所谓的Promise就是一个对象, 而Promise对象代表的是一个异步任务, 即需要很长时间去执行的任务.

> 通过Promise对象, 可以将异步操作以同步操作的流程表达出来, 避免层层嵌套.的回调函数问题, 即回调地狱问题. 

```js
let promise = new Promise(function(resolve, reject){
    setTimeout(() => {
        let num = Math.random();
        if(num > 0.3){
            resolve('成功了') // 通过resolve这个函数将成功后的内容返回. 
        }else{
            reject('失败了')
        }
    }, 1000);
})
```

**resolve:** 表示成功, 如果异步操作成功了 可以使用resolve来做进一步处理

**reject:** 表示失败, 如果异步操作失败了, 可以使用reject来做进一步处理

```js
promise.then(function(value){
    console.log(value);
},function(result, num){
    console.log(result);
})
```

如果Promise对象执行完毕后, 会有相应的返回的结果. then接收返回的值

第一个回调函数接收的是成功的返回值, 第二个回调函数接收失败的返回值

**使用Promise对象**

首先创建该对象, 该对象的构造函数接收一个函数作为参数

该函数有两个参数, 分别是resolve和reject, resolve表示成功, reject表示失败

## 使用Promise封装Ajax操作

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

getJson('').then(
    (result)=>{
        console.log(result)
    },
    (error)=>{
        console.log(error)
    }
)
```



## 模拟构建Promise对象

### 构建基本结构

手写一个Promise

> Promise是一个函数对象 , 需要一个回调函数 , 回调函数有两个参数

```js
function Mypromise(task) {
    // 2. 重置this的指向
    let that = this
    // 3. 指定状态, 表示Mypromise对象处理异步任务的时候, 如果成功了为Resolve状态, 否则为Reject状态, 最开始的状态为Pending
    this.status = 'Pending';
    // 4.1. 处理成功后的情况
    function resolve(){

    }
    // 4.2. 处理失败的情况
    function reject(){

    }
    // 5. 传递过来的task是一个函数, 所以要执行, 在执行的时候将resolve和reject传递到函数中
    task(resolve, reject)
}
// 1. 创建一个Promise对象
let mypromise = new Mypromise(function(resolve, reject) {

})
```



### 异常处理

> **异常处理** 就是在执行回调函数task的时候进行try...catch

```js
function Mypromise(task) {
    // 2. 重置this的指向
    let that = this
    // 3. 指定状态; 表示Mypromise对象处理异步任务的时候, 如果成功了为Resolve状态, 否则为Reject状态, 最开始的状态为Pending
    this.status = 'Pending';
    // 4.1 处理成功后的情况
    function resolve(){

    }
    // 4.2 处理失败的情况
    function reject(){
        // 8. 修改status状态
        if(that.status === 'Pending'){
            that.status = 'Rejected'
        }
    }
    
    // 5. 执行回调的时候 可能出现异常
    try {
        // 6. 传递过来的task是一个函数, 所以要执行, 在执行的时候将resolve和reject传递到函数中
        task(resolve, reject)
    } catch (error) {
        // 7. 异常就调用reject方法
        reject(error)
    }
}
Mypromise.prototype.then = function (onResolve, onReject) {

}

// 1. 创建一个Promise对象
let mypromise = new Mypromise(function(resolve, reject) {

})
```



### then方法的处理

```js
function Mypromise(task) {
    let that = this
    // 指定状态, 表示Mypromise对象处理异步任务的时候, 如果成功了为Resolve状态, 否则为Reject状态, 最开始的状态为Pending
    that.status = 'Pending';
    // 3.1 因为then可能被多次调用, 可能有多个成功和失败的回调 , 
	// 3.2 因此需要创建onResolvedCallBacks和onRejectedCallBacks 数组
    that.onResolvedCallBacks = [] // 存储所有成功的回调函数
    that.onRejectedCallBacks = [] // 存储所有失败的回到函数
    that.value = undefined; // 存储promise的结果

    // 处理成功后的情况
    function resolve(value){
        // 修改状态
        if(that.status === 'Pending'){
            that.status = 'Resolved'
            that.value = value // 存储了错误的信息
            // 将onResolvedCallBacks数组中的内容取出来并执行
            that.onResolvedCallBacks.forEach(item => {
                item(that.value)
            });
        }
    }
    // 处理失败的情况
    function reject(result){
        // 修改状态
        if(that.status === 'Pending'){
            that.status = 'Rejected'
            that.value = result // 存储了错误的信息
            // 将onRejectedCallBacks数组中的内容取出来并执行
            that.onRejectedCallBacks.forEach(item => {
                item(that.value)
            });
        }
    }
    // 执行回调的时候 可能出现异常
    // 传递过来的task是一个函数, 所以要执行, 在执行的时候将resolve和reject传递到函数中
    try {
        task(resolve, reject)
    } catch (error) {
        // 异常就调用reject方法
        reject(error)
    }
}
// 2. 为Promise对象添加then方法
Mypromise.prototype.then = function (onResolve, onReject) {
    let that = this;
    that.onResolvedCallBacks.push(onResolve) // 将成功的回调函数存储到数组中
    that.onRejectedCallBacks.push(onReject) // 将失败的回调函数存储到数组中
}

// 1. 创建一个Promise对象
let mypromise = new Mypromise(function(resolve, reject) {

})
```



### 基本测试

```js
function Mypromise(task) {
    let that = this
    // 指定状态, 表示Mypromise对象处理异步任务的时候, 如果成功了为Resolve状态, 否则为Reject状态, 最开始的状态为Pending
    that.status = 'Pending';
    that.onResolvedCallBacks = [] // 存储所有成功的回调函数
    that.onRejectedCallBacks = [] // 存储所有失败的回到函数
    that.value = undefined; // 存储promise的结果

    // 处理成功后的情况
    function resolve(value){
        // 修改状态
        if(that.status === 'Pending'){
            that.status = 'Resolved'
            that.value = value // 存储了错误的信息
            // 将onResolvedCallBacks数组中的内容取出来并执行
            that.onResolvedCallBacks.forEach(item => {
                item(that.value)
            });
        }
    }
    // 处理失败的情况
    function reject(result){
        // 修改状态
        if(that.status === 'Pending'){
            that.status = 'Rejected'
            that.value = result // 存储了错误的信息
            // 将onRejectedCallBacks数组中的内容取出来并执行
            that.onRejectedCallBacks.forEach(item => {
                item(that.value)
            });
        }
    }
    // 执行回调的时候 可能出现异常
    // 传递过来的task是一个函数, 所以要执行, 在执行的时候将resolve和reject传递到函数中
    try {
        task(resolve, reject)
    } catch (error) {
        // 异常就调用reject方法
        reject(error)
    }
}
// 因为then可能被多次调用, 可能有多个成功和失败的回调 , 
// 因此需要创建onResolvedCallBacks和onRejectedCallBacks 数组
Mypromise.prototype.then = function (onResolve, onReject) {
    let that = this;
    that.onResolvedCallBacks.push(onResolve) // 将成功的回调函数存储到数组中
    that.onRejectedCallBacks.push(onReject) // 将失败的回调函数存储到数组中
}

// promise是一个对象
// promise需要一个回调函数 回调函数有两个参数
let mypromise = new Mypromise(function(resolve, reject) {
    setTimeout(() => {
        let num = Math.random()
        if(num > 0.3) {
            resolve('执行成功了.....')
        }else{
            reject('执行失败')
        }

    }, 1000);
})
mypromise.then(function(value){
    console.log(value);
},function(result){
    console.log(result);
})
```



### 同步模式处理

```js
function Mypromise(task) {
    let that = this
    // 指定状态, 表示Mypromise对象处理异步任务的时候, 如果成功了为Resolve状态, 否则为Reject状态, 最开始的状态为Pending
    that.status = 'Pending';
    that.onResolvedCallBacks = [] // 存储所有成功的回调函数
    that.onRejectedCallBacks = [] // 存储所有失败的回到函数
    that.value = undefined; // 存储promise的结果

    // 处理成功后的情况
    function resolve(value){
        // 修改状态
        if(that.status === 'Pending'){
            that.status = 'Resolved'
            that.value = value // 存储了错误的信息
            // 将onResolvedCallBacks数组中的内容取出来并执行
            that.onResolvedCallBacks.forEach(item => {
                item(that.value)
            });
        }
    }
    // 处理失败的情况
    function reject(result){
        // 修改状态
        if(that.status === 'Pending'){
            that.status = 'Rejected'
            that.value = result // 存储了错误的信息
            // 将onRejectedCallBacks数组中的内容取出来并执行
            that.onRejectedCallBacks.forEach(item => {
                item(that.value)
            });
        }
    }
    // 执行回调的时候 可能出现异常
    // 传递过来的task是一个函数, 所以要执行, 在执行的时候将resolve和reject传递到函数中
    try {
        task(resolve, reject)
    } catch (error) {
        // 异常就调用reject方法
        reject(error)
    }
}
// 因为then可能被多次调用, 可能有多个成功和失败的回调 , 
// 因此需要创建onResolvedCallBacks和onRejectedCallBacks 数组
Mypromise.prototype.then = function (onResolve, onReject) {
    let that = this;
    if(that.status === 'Resolved'){
        onResolve(that.value)
    }
    if(that.status === 'Rejected'){
        onReject(that.value)
    }
    if(that.status === 'Pending'){
        that.onResolvedCallBacks.push(onResolve) // 将成功的回调函数存储到数组中
        that.onRejectedCallBacks.push(onReject) // 将失败的回调函数存储到数组中
    }
}

// promise是一个对象
// promise需要一个回调函数 回调函数有两个参数
let mypromise = new Mypromise(function(resolve, reject) {
    // setTimeout(() => {
    //     let num = Math.random()
    //     if(num > 0.3) {
    //         resolve('执行成功了.....')
    //     }else{
    //         reject('执行失败')
    //     }

    // }, 1000);

    // 立即执行, 没有setTimeOut, 所以没有执行then方法
    resolve('执行成功')
})
mypromise.then(function(value){
    console.log(value);
},function(result){
    console.log(result);
})
```



## Promise.prototype.then()方法

Promise	实例具有then方法, 即then方法定义在原型对象的Promise.prototype上;

>  **为Promise实例添加状态改变时的回调函数.**

**作用:** 

then方法的第一个参数是Resolved状态的回调函数, 第二个参数是Rejected状态的回调函数

then方法返回的是一个新的Promise实例;

**注意:**

返回的不是原来的Promise实例, 因此 ,可以采用链式写法, 在then方法后面再地阿偶用另一个then方法.

```js
getJson('').then(
    (result)=>{
        return result
    },
    (error)=>{
        return '出错了'+ error
    }
).then(
    (data)=>{
        // data其实就是上一个then参数中第一个参数函数的返回值
        console.log(data);
    },
    (error)=>{
        // error其实就是上一个then参数中第二个参数函数的返回值
        console.log(error);
    }
)
```



## Promise.prototype.catch()方法

应用场景: 

- 用于指定发生错误的回调函数
- 使用catch方法来处理失败或者错误

```js
// 可以把所有的异常放在catch处理, 不需要在意有多少then方法
getJson('').then(
    (result) => {
        console.log(result);
    }
).catch(function(error){
    console.log('出错了'+error)
})
```

采用catch写法的优点: 

- then方法可以进行链式变成, 可以在每个then方法中进行错误失败的处理, 但过程复杂

  使用catch方法处理, 其中任何一个Promise对象抛出的错误都会被最后一个catch捕获, 写法非常方便简单

- 类似try...catch这种同步的写法, 代码结构更加清晰, 更容易理解



## Promise.all()方法

Promise.all()方法可将多个Promise实例包装成一个新的Promise实例

该方法可接收一个数组作为参数, 数组中的成员都是Promise实例

**语法如下:**

```js
let p = Promise.all([p1,p2,p3,...])
```

**说明:**

Promise实例都成功, 则p的状态为成功状态, 且数组中所有Promise实例的返回值都组成一个数组, 给p的回调函数. 若一个实例失败, 则p的状态为失败状态; 此时第一个失败的Promise实例的返回值会传递给p的回调函数.

```js
// 第一个异步Promise
let promise1 = new Promise(function (resolve, reject) {
    setTimeout(() => {
        let num = Math.random();
        if (num > 0.3) {
            resolve('成功了')
        } else {
            reject('失败了1')
        }
    }, 2000);
})
// 第二个异步Promise
let promise2 = new Promise(function (resolve, reject) {
    setTimeout(() => {
        let num = Math.random();
        if (num > 0.3) {
            resolve('成功了')
        } else {
            reject('失败了2')
        }
    }, 2000);
})

let p = Promise.all([promise1, promise2]).then(function(data){
    // 成功:返回 ["成功了", "成功了"]
    // 失败:返回 Uncaught (in promise) 失败了1/失败了2
    console.log(data); 
})
```

**应用场景:**

同时异步请求多个数据操作时, 且多个异步操作相关, 即后续的操作步骤要依赖于这些异步操作. 

例如: 一个支付操作需要用户的账户有余额, 并且商品有库存, 才能进行下一步操作, 可使用Promise.all方法处理

```js
Promise.all([getUserBalance(), getInventory()]).then(()=>{
	// 做一些下单和支付的操作
}).catch(err => {
	alert('不能下单')
})
```



## Promise.race()方法

Promise.race()方法可将多个Promise实例包装成一个新的Promise实例. 

该方法可接受一个数组作为参数, 数组中的成员都是Promise的实例

```js
let p = Promise.race([p1,p2,p3,...])
```

**说明:**

以上Promise实例中

只要有一个成功, 则p的状态就是成功状态, 且将Promise实例中第一个成功的返回值传递给p的回调函数

只要有一个失败, 则p的状态就是失败状态, 且将Promise实例中第一个失败的返回值传递给p的回调函数

**总结:**

Promise.race([p1,p2,p3,...])里面哪个结果获得的快, 就返回哪个结果, 不论结果本身是成功状态还是失败状态