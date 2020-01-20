# 8、Symbol和Symbol属性

**如果你想使用一个他人提供的对象,  想为该对象添加新的方法或者属性**

新方法或者新属性的名称有可能与现有对象的属性名或者方法的名称产生冲突.

**Symbol:** 保证每个属性的名字的唯一性, 从根本上防止属性名称的冲突问题

## 1、基本使用

Symbol是一种**数据类型**,  是JavaScript语言的**第七种数据类型** . 前六种分别是: undefined, null, 布尔值, 字符串, 数值和对象

**特征:**

Symbol类型的值**通过Symbol函数生成**, 其值是独一无二的, **具有唯一性**; 可以保证对象属性的唯一

```js
let s = Symbol('s');
let s1 = Symbol('s1');

console.log(s);
console.log(s1);
```

## 2、应用场景

### 1、Symbol作为属性名的应用

由于Symbol的值是唯一的, 并且能够保证对象中不会出现同名的属性

**添加属性的三种方式:**

1) 通过方括号的方式给对象添加属性;

```js
let mySymbol = Symbol();
let obj = {};
obj[mySymbol] = 'hello'
console.log(obj[mySymbol]);
```

2) 创建对象时直接添加属性;

```js
let mySymbol = Symbol();
let obj = {
    [mySymbol]: 'world'
}
console.log(obj[mySymbol]);
```

3) 通过Object.definedProperty方法添加属性

```js
let mySymbol = Symbol();
let obj = {}
Object.defineProperty(obj, mySymbol, {
    value: 'ai'
})
console.log(obj[mySymbol]);
```



## 3、属性名遍历