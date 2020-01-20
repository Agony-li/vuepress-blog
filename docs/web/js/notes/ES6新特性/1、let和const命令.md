# 1、let和const命令

## let命令

### 基本用法

主要是用于**变量声明**，用法和var命令类似

```js
var username = 'xiaolixun'
let age = '18'
```

### let命令和var命令的区别

**区别：**通过let生成的变量只在其**对应的代码块**中起作用

```js
for(let i = 1; i<=3; i++) {
    console.log(i);	// 1,2,3
}
console.log('last = '+i); // 报错 Uncaught ReferenceError: i is not defined
```

**总结：** let声明的变量只在代码块中起作用， 即通过let变量声明的变量仅在**块级作用域**内有效

案例： 打印`i`的值

```js
// ES5 通过自定义一个函数，生成函数的作用域，i变量就不是全局的了。
for (var i = 0; i < 3; i++) {
    (function(i) {
        setTimeout(function() {
            console.log('i=', i);
        }, 1000)
    })(i)
}
```

```js
// ES6 实现
for (let i = 0; i < 3; i++) {
    setTimeout(function() {
        console.log('i=', i);
    }, 1000)
}
```

### 注意事项

1. **不存在变量提升** 

   相比较var命令，Let命令不会发生“变量提升”现象。因此，变量一定要在声明后使用，否则会出错。 

2. **暂时性死区** 

   所谓的“暂时性死区”指的就是：在代码块内，使用let命令声明变量之前，该变量都是不可用的。

3. **不允许重复声明** 

   let 不允许在相同的作用域内重复声明一个变量；如果使用var声明变量是没有这个限制的。

## const命令

### 基本用法

const命令用来**声明常量**；常量指的就是一旦声明，其值是不能被修改的。

```js
const PI = 3.14;
console.log(PI)
```

### 注意事项

1. **不存在变量提升** 
2. **只在声明的块级作用域内有效** 
3. **暂时性死区** 
4. **不允许重复声明** 
5. **常量声明必须赋值**