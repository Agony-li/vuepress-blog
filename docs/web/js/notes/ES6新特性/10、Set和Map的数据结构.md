# 10、Set和Map的数据结构

## Set结构和WeakSet结构

> Set结构是一个类似数组的结构, 通过Array.from()转换成真正的数组
>
> Set是不重复值得集合

### 常用的操结构是作方法

add(value): 添加某个值, 返回set本身

delete(value): 删除某个值, 返回一个布尔值, 表示删除是否成功

has(value): 返回一个布尔值, 表示参数是否是Set的成员

clear(): 清除所有成员, 没有返回值

### 常用的遍历操作

keys(): 返回一个键名的遍历器

values(): 返回一个键值的遍历器

entries(): 返回一个键值对的遍历器

forEach(): 使用回调函数遍历每一个成员

> 注意:  Set结构没有键名, 只有值;  可认为键名和值都是同一个; 所以, keys方法和values方法的结果一样

### 针对Set结构其他操作

扩展运算符

```js
let s = new Set(['zs','ls','ww']);
console.log(...s);	// zs ls ww
```

数组去重

```js
let arr = [1,2,3,3,4,5]
arr = Array.from(new Set(arr))
console.log(arr);	// [1, 2, 3, 4, 5]
```

### WeakSet结构

> WeakSet结构与Set类似, 也是**不重复的值得集合**

#### WeakSet结构与Set的2大区别

1. WeakSet的**成员只能是对象**, 而不能是其他类型的值

2. WeakSet中的对象都是**弱引用**, **即垃圾回收机制不考虑WeakSet对该对象的引用**

   如果其他的对象不再使用WeakSet中的对象, 垃圾回收机制会自动回收WeakSet中对象所占用的内存,  不考虑对象是否还在WeakSet中.

#### WeakSet常用的操作方法

add(value): 向WeakSet中添加一个新成员;

delete(value): 清楚WeakSet中的制定成员;

has(value): 返回一个布尔值, 表示某个值是否在WeakSet中

**注意:** 在WeakSet中没有size属性和forEach方法;

​	因为WeakSet不能遍历, 成员都是弱引用, 随时可能消失, 遍历机制无法保证成员的存在, 可能刚刚遍历结束, 成员就无效了

## Map结构和WeakMap结构

### 基本使用

> Map类似于对象, 也是键值对的集合,  "键"的类型可以是各种类型
>
> Map适用于需要"键值对"的数据结构

```js
let m = new Map()
m.set('age', 20)
console.log(m.get('age'));	// 20

let obj  = {
    age:20
}
m.set(obj,'zhangsan')
console.log(m.get(obj)); // zhangsan
```



### 注意事项

1. 如果对同一个键多次赋值, 后面的值会覆盖前面的值; 如果读了一个未知键, 则返回undefined
2. 只有对同一个对象的引用, Map结构才认为是同一个键

### Map的属性和操作方法

**size属性:**  返回Map结构的成员总数;

**操作方法**

**set()方法:** 该方法根据对应的key设置Map结构的值, 返回整个Map结构, 可以使用链式写法;

**get()方法:** 读取key对应的值, 如果找不到对应的key, 就返回undefined

**delete()方法:** 删除某个键,  如果成功返回true, 否则返回false

**clear()方法:** 该方法清除所有成员, 没有返回值

### 常用遍历方法

keys(): 返回键名;

values(): 返回值;

entries(): 返回所有成员;

forEach(): 遍历Map的所有成员;

### WeakMap结构

WeakMap结构与Map结构类似, 唯一的区别: WeakMap只接受对象作为键名(null除外) , 不接受其他的值作为键名; 且键名所指向的对象不计入垃圾回收机制

### WeakMap和Map在API上的区别

1. 没有keys(), values()和entries()这些遍历方法, 也没有size属性
2. 不支持clear()方法, WeakMap只有4个方法  get(), set(), has(), delete()

### WeakMap结构应用场景

WeakMap结构中的键名所指向的嗯对象不计入垃圾回收机制; 即键名是对象的弱引用, 其所对应的对象可能会被自动回收; 当对象被回收后, WeakMap自动移除对应的键值

**典型应用:**

一个对应Dom元素的WeakMap结构, 当某个Dom元素被清除, 其对应的WeakMap存储的内容也会自动被移除