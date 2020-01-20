# 11、Iterator和for...of循环

## Iterator

### 基本使用

> Iterator, 被称为遍历器/迭代器, 它是一种接口;  任何数据结构, 只要部署了Iterator接口, 即可完成遍历操作

**Iterator遍历的过程**

1. 创建一个指针对象, 指向当前结构的起始位置, 也就是说 遍历器对象本身就是一个指针对象
2.  第一次调用指针对象的next方法, 可以将指针指向数据结构的第一个成员
3. 第二次调用指针对象的next方法, 指针就指向数据结构的第二个成员
4. 不断调用指针对象的next方法, 直到它指向数据结构的结束位置

**说明**

每一次调用next方法, 都会返回数据结构的当前成员的信息. 

具体来说, 就是返回一个包含value和done两个属性的对象.

其中, value属性是当前成员的值, done属性是一个布尔值,表示遍历是否结束

```js
function show(students){
    let index = 0
    return {
        next(){
            // 1: 当第一次调用next方法取出数组中的第一个成员的值;
            // 2: 当第二次调用next方法, 让index值加1 这时表示指向数组中的第二个成员, 并且获取第二个成员的值
            // 3: 不断重复上面的过程, 直到整个遍历结束; done:true
            let done = index === students.length -1
            let value = students[index]
            index ++
            return {
                value,
                done
            }
        }
    }
}
let it = show(['zs','ls','ww']);
let result = it.next()
console.log(result);    // {value: "zs", done: false}
let result1 = it.next()
console.log(result1);   // {value: "ls", done: false}
let result2 = it.next()
console.log(result2);   // {value: "ww", done: true}
let result3 = it.next()
console.log(result3);   // {value: undefined, done: false}
```



### 数据结构的默认Iterator接口



### 调用Iterator接口的场合



## for...of循环

### 使用范围

#### 与其他遍历语法比较