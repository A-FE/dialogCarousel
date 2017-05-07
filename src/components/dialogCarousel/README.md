## 弹框轮播图组件(照片放大器)
### 属性
 1、 value(v-model) <object>

```angular2html
{
   // <Number>初始化幻灯片的索引,默认为0
   initialIndex: 0,  
   // <Boolen> 必传,是否显示弹窗
   showDialog:false, 
   // <Array> 必传,包含选中标签的id
   tags:['0001','0002'] 
}
```

2、 tags-position-type <String> 标签的布局方式,默认为'mix'
* group,标签按照图片分组,和图片为一一对应关系;
* mix,标签和图片无对应关系，切换图片，标签不变;

3、data <Array> 必传,轮播图所需的数据,格式如下
```angular2html

```

### event 事件
无

### method 方法
无

### 用法
