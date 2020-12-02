# JS深拷贝

## 简单的拷贝 暂略

## 循环引用问题

```js
const target = {
    field1: 1,
    field2: undefined,
    field3: {
        child: 'child'
    },
    field4: [2, 4, 8]
};
target.target = target;
```

解决循环引用问题，我们可以额外开辟一个存储空间，来存储当前对象和拷贝对象的对应关系，当需要拷贝当前对象时，先去存储空间中找，有没有拷贝过这个对象，如果有的话直接返回，如果没有的话继续拷贝，这样就巧妙化解的循环引用的问题。



这个存储空间，需要可以存储`key-value`形式的数据，且`key`可以是一个引用类型，我们可以选择`Map`这种数据结构：

- 检查`map`中有无克隆过的对象
- 有 - 直接返回
- 没有 - 将当前对象作为`key`，克隆对象作为`value`进行存储
- 继续克隆

## 使用WeakMap进行优化

> WeakMap 对象是一组键/值对的集合，其中的键是弱引用的。其键必须是对象，而值可以是任意的。

什么是弱引用呢？

> 在计算机程序设计中，弱引用与强引用相对，是指不能确保其引用的对象不会被垃圾回收器回收的引用。 一个对象若只被弱引用所引用，则被认为是不可访问（或弱可访问）的，并因此可能在任何时刻被回收。

我们默认创建一个对象：`const obj = {}`，就默认创建了一个强引用的对象，我们只有手动将`obj = null`，它才会被垃圾回收机制进行回收，如果是弱引用对象，垃圾回收机制会自动帮我们回收。

举个例子：

如果我们使用`Map`的话，那么对象间是存在强引用关系的：

```
let obj = { name : 'ConardLi'}
const target = new Map();
target.set(obj,'code秘密花园');
obj = null;
复制代码复制代码
```

虽然我们手动将`obj`，进行释放，然是`target`依然对`obj`存在强引用关系，所以这部分内存依然无法被释放。

再来看`WeakMap`：

```
let obj = { name : 'ConardLi'}
const target = new WeakMap();
target.set(obj,'code秘密花园');
obj = null;
复制代码复制代码
```

如果是`WeakMap`的话，`target`和`obj`存在的就是弱引用关系，当下一次垃圾回收机制执行时，这块内存就会被释放掉。

设想一下，如果我们要拷贝的对象非常庞大时，使用`Map`会对内存造成非常大的额外消耗，而且我们需要手动清除`Map`的属性才能释放这块内存，而`WeakMap`会帮我们巧妙化解这个问题。



## 最后上代码

```js
function deepClone(target, hash = new WeakMap()) {
    let type = Object.prototype.toString.call(target).slice(8, -1);
    let types = ["Object", "Array"];
    let res = Array.isArray(target) ? [] : {};

    // 如果target不是对象和数组 直接阻止
    if (!types.includes(type)) return target;
    // 查看map中如果已经有了本次递归中的target，证明之前标记过，直接返回res
    if (hash.has(target)) return hash.get(target);
    // 使用map标记每次的target
    hash.set(target, res);

    for (const key in target) {
        if (target.hasOwnProperty(key)) res[key] = deepClone(target[key], hash);
    }
    return res;
}

let target = {
    field1: 1,
    field2: undefined,
    field3: {
        child: 'child'
    },
    field4: [2, 4, 8]
};
target.target = target;

let obj = deepClone(target);
obj.field1 = 14
console.log(target);
console.log(obj);
```

