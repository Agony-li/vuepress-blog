# ES6新特性

## 1、`let命令和const命令`

> 掌握let命令基本用法

> 理解let命令和var命令的区别

> 理解块级作用域

> 掌握let命令的注意事项

> 掌握const命令的基本用法

> 掌握const命令的注意事项

### 1、`let命令基本用法`

> 声明变量

```js
let username = 'xiaolixun'
```

### 2、`let命令和var命令的区别`

> let 命令只在块级作用域内生效

```js
for(var i = 1; i<=10; i++) {
    console.log(i);
}
console.log('last = '+i);	// 11
```

```js
for(let i = 1; i<=10; i++) {
	console.log(i);
}
console.log('last = '+i); // 报错 Uncaught ReferenceError: i is not defined
```

### 3、`块作用域作用与优势 `

**定义:** 

有一段代码用`大括号包裹`起来 , 那么 , 大括号内就是一个块级作用域

```js
// i变量的作用域只在这一对大括号内有效, 超出这一对大括号则无效
for(let i = 1; i<=10; i++) {
	console.log(i);
}
console.log('last = '+i); // 报错 Uncaught ReferenceError: i is not defined
```

**为什么需要块级作用域**

ES5只有全局作用域和函数作用域,  没有块级作用域,  因此会引发以下问题: 

1. 内层变量可能会覆盖外层
2. 用来计数的循环变量成为了全局变量

```js
var temp = new Date();
function show() {
    console.log('temp = '+temp);	// temp = undefined
    if(false) {
    	var temp = 'hello world'
    }
}
show()  
```

```js
let temp = new Date();
function show() {
    console.log('temp = '+temp);// temp = Mon Dec 16 2019 11:34:55 GMT+0800 (中国标准时间)
    if(false) {
    	let temp = 'hello world'
    }
}
show()  
```

### 4、`ES6块级作用域`

> let命令实际上就是为JavaScript新增了块级作用域

**案例**

```js
function show() {
    let num = 5;
    if(true) {
    	let num = 2
    }
    console.log(num); // 5
}
show()
```

```js
if(true) {
    let b = 20;
    console.log(b)  // 20         
    if(true) {
    	let c = 10;
    }
    console.log(c)	// c is not defined
}
```

```js
// 输出三次3
for(var i= 0; i<3; i++) {
    setTimeout(() => {
    	console.log(i)
    },1000)
}
// es5解决办法(使用立即执行函数)
for(var i= 0; i<3; i++) {
    (function(i){
        setTimeout(() => {
            console.log(i)
        },1000)
    })(i)
}
// es6解决办法(使用let)
for(let i=0; i< 3;i++) {
    setTimeout(() => {
        console.log(i)
    }, 1000);
}
```



### 5、`let命令注意事项` 

1. **不存在变量提升: **相比较var命令,  let命令不会发生`变量提升`现象 . 因此, `变量一定要在声明后使用` , 否则会出错
2. **暂时性死区: ** `在代码块内, 使用let命令声明变量之前, 该变量都是不可用的`
3. **不允许重复声明变量: ** `let不允许在相同作用域重复声明一个变量`,  如果使用var声明变量没有这个限制

### 6、`const基本用法`

### 7、`const注意事项`

1. 不存在变量提升
2. 只在声明的块级作用域内有效
3. 暂时性死区
4. 不允许重复声明
5. 常量声明必须赋值
6. 如果声明的是复合类型的变量：数组或者对象，那么const指向变量所在的地址，const会保证const声明的变量的地址不变，但是不会保证地址内的数据不改变

## 2、`解构赋值`

**解构赋值:**   从数组或者对象中取出对应的值,  然后将取出的值赋给变量

> 掌握数组解构赋值的基本用法
>
> 掌握数组解构赋值的注意事项
>
> 掌握对象解构赋值的基本使用和注意事项
>
> 掌握字符串的解构赋值
>
> 掌握函数参数得解构赋值
>
> 理解解构赋值的优势

### 1、`数组解构赋值`

1. ##### 基本使用

   >  **注意**: 解构赋值等号两侧的结构是类似的

   ###### 1、将数组中的值通过解构赋值的方式, 用于`声明变量`/`赋值给变量`

   ```js
   // 变量声明
   let arr = [1,2,3]
   let [num1, num2, num3] = arr
   console.log(num1, num2, num3) 	// 1,2,3       
   
   let arr = [{username:'zs', age:18}, [1,3], 6]
   let [{username, age}, [num1, num2], num3] = arr
   console.log(username,age,num1, num2,num3)	// zs 18 1 3 6
   
   let arr = [{username:'zs', age:18}, [1,3], 6]
   let [jsonResult, array, num] = arr
   console.log(jsonResult, array, num)	// {username: "zs", age: 18} (2) [1, 3] 6
   ```

   ```js
   // 变量赋值
   let color = ['red', 'green', 'blue'];
   firstColor = 'white';
   secondColor = 'black';
   
   [firstColor, secondColor] = color;
   
   console.log(firstColor); //red
   console.log(secondColor); //green
   ```

   ###### 2、嵌套数组的解构

   ```js
   // 多维数组的结构
   let arr = [1,[2,3],4,5]
   let [num1, num2] = arr
   console.log(num1, num2);  //1 [2, 3]
   let [,[numChild1]] = arr
   console.log(numChild1); // 2
   ```

   ###### 3、不定元素(剩余元素)

   它就是用...展开运算符把数组的多个元素一起赋值给一个变量：

   ```js
   let color = ['red', 'green', 'blue'];
   let [firstColor, ...secondColor] = color;
   console.log(firstColor); // red
   console.log(secondColor); // ['green', 'blue']
   ```

   这里需要特别注意的是不定元素变量（剩余元素变量）必须是解构的最后一个变量，其后面不能再有别的变量，否则会抛出语法错误，例如：

   ```js
   let color = ['red', 'green', 'blue'];
   let [firstColor, ...secondColor, error] = color; // Uncaught SyntaxError: Rest element must be last element
   ```

   既然剩余元素可以是数组的最后几个元素，那它当然也可以是数组的全部元素。我们可以利用这点来实现数组的copy：

   ```js
   let color = ['red', 'green', 'blue'];
   let [...copiedColor] = color;
   console.log(copiedColor);// ["red", "green", "blue"]
   console.log(color.toString() === copiedColor.toString()); // true
   console.log(color == copiedColor); // false
   console.log(color === copiedColor); // fasle
   ```

   这里也要特别注意，剩余元素变量只是把数组元素copy到另一个数组，所以它们包含的元素相等，但是这2个数组是没有关系的，是不相等的。

   ```js
   // 数组合并: 
   let a = [0,1,2]
   let b = [3,4,5]
   let c = [...a,...b]
   console.log(c);	// 0, 1, 2, 3, 4, 5
   ```

   

2. ##### 注意事项

   解析不成功的问题

   ```js
   // 如果解析不成功的话, 对应的变量值为undefined
   let [num1, num2] = [6]
   console.log(num1, num2);    // 6 undefined
   ```

   不完全解构的情况

   ```js
   // 不完全解构
   let [num1, num2] = [1,2,3]
   console.log(num1, num2);	// 1 2
   let [num] = [1,2,3]
   console.log(num);	// 1
   
   // 只想取第二个值
   let [,num,] = [1,2,3]
   console.log(num)	// 2
   // 只想取第三个值
   let [,,num] = [1,2,3]
   console.log(num)	// 3
   ```

   

### 2、`对象解构赋值`

> 解构不仅可以用于`数组`, 还可以用于`对象`

**注意: **变量的名字必须和对象的属性名称保持一致, 才能够取到正确的值

基本用法

```js
let obj = {
    username:'ls', 
    age:20
}
let {username, age} = obj
console.log(username,age);
```

注意事项

​	默认解构的问题

> 如果能够取出对应的值, 就用取出的值

> 如果取不出来, 就用默认值

```js
let obj = {
    name: 'zs'
}
let {name, age} = obj
console.log(name, age)  // zs undefined
```

```js
// 给age添加默认值
let obj = {
    name: 'zs'
}
let {name, age=18} = obj
console.log(name, age)  // zs 18
```

​	嵌套结构对象解构的问题

```js
let obj = {
    arr: ['hello', {
        msg: 'world'
    }]
}
let {arr:[str,{msg}]} = obj
console.log(str,msg)    // hello world
```

```js
let obj = {
    local: {
        start: {
            x: 20,
            y: 30
        }
    }
}

let {
    local: {
        start: {
            x,
            y
        }
    }
} = obj
console.log(x,y);	// 20 30
```



### 3、`字符串解构赋值`

>  字符串也可以进行解构赋值, 因为`字符串会被转换成一个类似数组的对象` 

### 4、`函数参数解构赋值`

### 5、`解构赋值的优势`

交换变量的值

```js
let num1 = 3;
let num2 = 6;
[num1, num2] = [num2, num1];
console.log(num1, num2);
```

函数可以返回多个值

```js
function test() {
    return [1,2,3]
}
let [a,b,c] = test()
console.log(a,b,c)   // 1 2 3
```

函数返回一个对象

```js
function test () {
    return {
        num1: 3,
        num2: 6
    }
}
let {num1, num2} = test()
console.log(num1, num2);    // 3 6
```

提起json对象中的数据

```js
let userdata = {
    id:11,
    name:'zs',
    age:20
}
let {id, name, age } = userdata
console.log(id, name, age)
```

## 4、`字符串扩展`

> 掌握字符串常用的扩展方法
>
> 重点掌握模板字符串基本的使用
>
> 理解模板字符串的原理
>
> 了解模板字符串的特性

### 1、`字符串扩展方法`

#### 1.1、`includes(value)方法`

该方法返回结果为`布尔值` , 表示`是否找到了对应的字符串` . 如果找到了返回`true`, 否则返回`false`

```js
let str = 'hello'
console.log(str.includes('e'))  // true
console.log(str.includes('a'))  // false
```

#### 1.2、`startsWith(value)方法`

该方法返回结果为`布尔值` , 表示`某个字符串是否在另一个字符串的头部`. 如果在头部返回`true`, 否则返回`false`

```js
let str = 'hello'
console.log(str.startsWith('h'))    // true
console.log(str.startsWith('e'))    // false
```

#### 1.3、`endsWith(value)方法`

该方法返回结果为`布尔值` , 表示`某个字符串是否在另一个字符串的尾部`. 如果在头部返回`true`, 否则返回`false`

```js
let str = 'hello'
console.log(str.endsWith('o'))    // true
console.log(str.endsWith('e'))    // false
```

#### 1.4、`repeat()方法`

该方法的作用是`返回一个新的字符串`,  表示将原来的字符串重复多少次

> 如果传入的是一个小数, 会被取整
>
> 如果传入的是一个数字的字符串,  首先会转换成数字, 然后取整

```js
let str = 'a'
console.log(str.repeat(3))  // aaa
console.log(str.repeat(3.8))  // aaa
console.log(str.repeat('3.8'))  // aaa
```



### 2、`模板字符串`

#### 2.1、`基本使用`

**注意:**如果在模板字符串中需要使用`反引号`, 需要用`反斜杠`进行转义

```js
let username = 'zs'
let age = 19
console.log(`大家好,我叫${username}, 我的年龄是${age}`);    // 大家好,我叫zs, 我的年龄是19
```

#### 2.2、`原理`

#### 2.3、`特性`

### 3、`标签模板`

#### 3.1、`基本使用`

模板字符串可以紧跟在一个函数名后面, 该函数被用来处理这个模板字符串, 成为"标签模板"

```js
let username  = 'zs'
let age = 10
let str = showMsg `大家好, 我叫${username}, 今年${age}岁`

function showMsg(str, username, age) {
    console.log(str);   // 存储的是模板字符串中的文本内容 是一个数组
    // 从第二个参数开始, 存储的都是模板中变量的值
    console.log(username);  
    console.log(age);
}

function showMsg(str, ...values) {
    // values 存储的是模板字符串中的变量的值
    console.log(values)
}
```

#### 3.2、`使用场景`

1. 对模板字符中的内容进行格式转换
2. 过滤危险字符

## 5、`数值扩展`

### 1、`Number对象扩展方法`

#### 1.1、`isNaN() 方法`

> 检查一个值是否为NaN;

```js
console.log(Number.isNaN(12));	// false
console.log(Number.isNaN(NaN));	// true
```

#### 1.2、`parseInt()方法和parseFloat()方法`

> 解析一个字符串, 并返回一个`整数`

> 解析一个字符串, 并返回一个`浮点数`

```js
// es5
console.log(parseInt('12.89'))  // 12
console.log(parseFloat('12.89'));   // 12.89

// es6
console.log(Number.parseInt('12.89'));   // 12
console.log(Number.parseFloat('12.89'));   // 12.89

console.log(Number.parseInt === parseInt);  // true
console.log(Number.parseFloat === parseFloat); // true
```

#### 1.3、`isInteger()方法`

> 判断一个数值是否为`整数`
>
> **注意:** ES6中的isInteger方法人为  , 68.0和68是同一个值

```js
console.log(Number.isInteger(68))   // true
console.log(Number.isInteger(68.56))   // false
console.log(Number.isInteger(68.0))   // true
```



### 2、`Math对象的扩展`

#### 2.1、`Trunc()方法`

> 去除一个数的小数部分, 返回整数部分

```js
console.log(Math.trunc(5.1));   // 5
console.log(Math.trunc(5.9));   // 5
console.log(Math.trunc(-5.9));   // -5
console.log(Math.trunc(0.9));   // 0
console.log(Math.trunc(-0.9));   // -0
console.log(Math.trunc('5.9'));   // 5
console.log(Math.trunc('abc'));   // NaN
```

#### 2.2、`Sign()方法`

> 判断一个数到底是整数, 负数还是0

该方法返回值有5种情况

1. 参数为正数, 返回1
2. 参数为负数, 返回-1
3. 参数为0, 返回0
4. 参数为-0, 返回-0
5. 其他值, 返回NaN

```js
console.log(Math.sign(-6))  // -1
console.log(Math.sign(6))  // 1
console.log(Math.sign(0))  // 0
console.log(Math.sign(-0))  // -0
console.log(Math.sign('abc'))  // NaN
```

## 6、`函数的扩展`

> 掌握函数参数的默认值
>
> 掌握rest参数的使用以及注意事项
>
> 掌握扩展运算符的应用
>
> 掌握箭头函数的使用以及注意事项

### 1、`函数参数的默认值`

采用`函数参数默认值`的方式实现:

```js
function ajaxAction(url = new Error('请求的地址不能为空'), method="GET", dataType="json") {
    console.log(url);
    console.log(method);
    console.log(dataType);
}
ajaxAction('/showUser');
```

**说明:** 给ajaxActin函数的形参制定相应的默认值;  那么, 在调用函数时, 若传递了新的值,  对应的形参为传递的值; 若没有传递值, 则形参为默认值

**优点:** 

1. 方便简单
2. 有利于代码的阅读; 当看到这段代码后, 就能明白哪些参数是可以省略的, 不用查看函数体和文档

### 2、`rest参数`

#### 2.1 `rest参数的基本使用`

**形式:** `...变量名`,

**应用场景:** 用于`获取函数中的多余的参数`,  因此, 不需要使用arguments对象

**说明:** rest参数搭配的变量是一个数组

```js
function add(...values) {
    let sum = 0
    values.forEach((item)=>{
        sum += item
    })
    return sum
}
console.log(add(2,3));  // 5
```

#### 2.2 `reduce方法的使用`

**作用:** 计算与汇总, 可以把数组中的所有值计算出一个值

```js
function add(...values){
    values.reduce(function(val, item, index, origin){
        console.log('val='+val);   // 第二个参数(初始值), 会赋值给val这个参数(第二次开始执行, val参数中保存的都是函数中的返回值)
        console.log('item='+item);  // 存储的是数组中的每一项
        console.log('index='+index);    //  存储的是对应的下标
        console.log('origin='+origin);  // 原来数组的内容
    },0)
}
add(1,2,3)
```

**Reduce方法的使用:** 

​	第一个参数: 一个函数; 第二个参数: 一个初始值;

**运行时:** 第一次执行时: 第二个参数(也就是初始值) 会赋值给函数中val参数

**输出时:** val的值都是undefined;

**原因:** val参数后面保存的都是函数中返回的值, 而上述代码中, 函数中没有返回值, 所以 val参数的值为undefined

```js
// 通过reduce求和
function add(...values) {
    return values.reduce(function (val, item, index, origin) {
        console.log(val)
        return val + item
    }, 0)
}
console.log(add(1, 2, 3))    // 6

// 通过reduce求平均数
function add(...values) {
    return values.reduce(function (val, item, index, origin) {
        let sum = val + item
        if(index === origin.length-1){
            return sum/origin.length
        }else{
            return sum
        }
    }, 0)
}
console.log(add(1, 2, 3))   // 2
```

#### 2.3 `ReduceRight方法的使用`

**特征:** reduce是按照`从左到右`的顺序对数组中的数据进行计算

​		  redduceRight是`从右向左`进行计算

#### 2.4 `模拟实现reduce`

```js
Array.prototype.reduceTest = function(fn, value){
    for(let i = 0; i<this.length; i++) {
        value = fn(value, this[i])
    }
    return value
}

let arr = [1, 2, 3]
let result = arr.reduceTest(function (val, item) {
    return val + item
}, 0)
console.log(result)
```

#### 2.5 `rest参数注意问题`

rest参数之后不能有其他的参数, 也就是说`rest参数只能是最后一个参数, 否则会报错`

### 3、`扩展运算符`

#### 3.1 `基本使用`

**表现形式:** 三个点(...) , 可以将一个`数组转换为用逗号分隔的序列`

**案例:** 将两个数组合并为一个数组;

```js
// 转换成es5的话 还是使用concat连接的
let arr1 = [1,2,3]
let arr2 = [4,5,6]
let arr3 = [...arr1, ...arr2] // 讲数组转化为用","分割的数列 1,2,3,4,5,6
console.log(arr3);
```



#### 3.2 `应用场景`

1. 代替数组中的apply方法

   > 用Math.max来计算数组中的最大值(ES5的写法): 

   ```js
   let arr = [12,23,11,56]
   console.log(Math.max.apply(null, arr));
   ```

   >使用扩展运算符实现:

   ```js
   let arr = [12,23,11,56]
   console.log(Math.max(...arr)); // Math.max(12,23,11,56)
   ```

   > **说明:** 由于JavaScript不提供求数组中最大值的函数, 只能将数组转换成一个参数的列表, 再进行相应的求值

2. 用于函数调用

   > 函数参数的案例

   ```js
   function test(num1, num2){
       console.log(num1+num2)
   }
   let arr = [20, 13]
   test(...arr)
   test(arr[0], arr[1])
   ```

   > 把一组数添加到数组中

   ```js
   // 函数参数中: ...items是rest参数形式, items是一个数组
   function test(arr, ...items){
       // ...items 是将数组中的数据转换成用逗号分隔的列表(扩展运算符)
       console.log([...arr,...items])
   }
   let arr = [23, 56]
   test(arr, 78,89,90)
   ```

### 4、`箭头函数`

#### 	4.1 `基本使用`

```js
let f = (x, y) => {
    console.log(x + y)
}
f(10, 12)

// 函数只需要一个参数, 小括号可以省略
let f = x => {
    console.log(x)
}
f(10)

// 如果不需要参数, 只需要写上一对小括号
let f = ()=> {
    console.log(9/3)
}
f()

// 如果函数体中只有一条语句 , 可以省略大括号
let f = (x, y) => x+y;
console.log(f(3,6));

// 箭头函数在实际的开发中, 经常用来简化回调函数
let arr = [1, 2, 3]
let arr1 = arr.map((x) => x)
console.log(arr1)
```



#### 	4.2 `注意事项`

1. 箭头函数中this的问题

   `箭头函数中没有this`, 若在箭头函数中使用this, 实际上使用的是外层代码块的this.

   箭头函数不会创建自己的this, 它只会从自己`作用域链的上一层继承this`

   **通俗理解:**

   ​	`找出定义箭头函数的上下文(即包含箭头函数最近的函数或者是对象), 那么上下文所处的父上下文即为this`

   ​	箭头函数的上下文,  该上下文所处的父上下文即为this

   ```js
   // this指向问题
   let person = {
       username: 'zs',
       getUserName () {
           setTimeout(function(){
               // this指向的是window
               console.log(this.username); // undefined
           },1000)
       }
   }
   person.getUserName();
   
   //es5解决办法
   let person = {
       username: 'zs',
       getUserName () {
           let that = this
           setTimeout(function(){
               // this指向的是window
               console.log(that.username); // undefined
           },1000)
       }
   }
   person.getUserName();
   
   // 使用箭头函数改造回调函数
   let person = {
       username: 'zs',
       getUserName () {
           setTimeout(() => {
               console.log(this.username); // zs
           },1000)
       }
   }
   person.getUserName();
   
   // 该箭头函数的上下文是person, person的父上下文是window
   this指向的是window
   let person = {
       username:'zs',
       getUserName: () => {
           console.log(this.username); // undefined 
       }
   }
   person.getUserName();
   
   // 改造后
   let person = {
       username:'zs111',
       getUserName(){
           return () => {
               console.log(this.username); // undefined 
           }
       }
   }
   person.getUserName()();
   ```

   

2. 关于call(), apply()和bind()方法的问题

   由于箭头函数没有自己的this, 因此, `不能使用call(), apply(), bind()等方法改变this的指向`

   ```js
   let adder = {
       base: 1,
       add: function(a) {
           let f = v => v+this.base;
           let b = {
               base:2
           }
           return f.call(b, a)
       }
   }
   console.log(adder.add(1))
   ```

   



































