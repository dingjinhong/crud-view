# 配置驱动的增删改查组件

可以选择卡片模式和table模式基于vue3 element-plus

## 目录结构

```
.
├─public                      # 公共文件
├─src
│  ├─App.vue                  # 测试的入口vue文件
│  ├─main.ts                  # 测试的入口main文件
│  ├─CrudView                 # 组件目录
│  ├─config.ts                # 测试样例文件
│  ├─evn.d.ts                 # 环境类型声明文件
│  ├─lib.ts                   # 打包入口文件
└─types                       # 打包生成类型文件目录
```

## 设计概要

### 主要数据模型

1. CrudConfig 整个配置的model
2. Attr 每个属性对应的配置，里面可以配置表单，content,以及部分card属性
3. Card 卡片模式属性
4. Form 表单属性
5. Pagination 分页栏属性
6. Search 收索条件栏属性
7. Table 列表模式属性
8. Toolbar 工具栏属性

#### Attr 对象

```ts
export default interface Attr {
  search?: AttrSearch //配置该属性在搜索栏的ui显示属性
  content?: AttrContent // 配置该属性在卡片或者列表中显示的属性
  form?: AttrForm // 配置属性表单的公共属性
  editForm?: AttrForm //配置该属性的编辑表单属性
  addForm?: AttrForm //配置该属性的新建表单属性
  viewForm?: AttrForm //配置该属性的查看表单属性
  cardTitle?: CardAttr //独有的卡片模式下的标题属性
  cardDesc?: CardAttr //独有的卡片模式下的描述属性
  cardImg?: CardAttr //独有的卡片模式下的图片属性
}
```

#### Card 对象

```ts
export default interface Card {
    rowProps: Record<string, unknown> //卡片模式的行属性
    colProps: Record<string, unknown> //卡片模式列属性
    cardOptions: CardOptions //卡片属性
}
```

#### Form 对象

```ts
export default interface Form {
    wrapper?: FormWrapper // form出现的载体，dialog或者drawer
    props?: Record<string, unknown> // form的属性
    row?: Record<string, unknown> // form的行属性
    handle?: FormHandle //form操作按钮属性
    group?: Group // form的组属性，可以把属性分组，和下面blocks关联控制form-item显示与否
    blocks?: Block[] //控制表单属性或者组的显示隐藏条件
}
```

#### Pagination 对象

```ts
export default interface Pagination {
    show: boolean //是否显示
    right: boolean //是否靠右
    props: Record<string, unknown> //组件属性
}
```

#### Search 对象

```ts
export default interface Search {
  show: boolean //是否显示
  expandText?: string //展开按钮文本
  searchWhenChange?: boolean //是否有一个属性改变就调用搜索
  buttons?: SearchButton[] // 按钮配置
  resetButton?: SearchButton // 默认重置按钮配置
  submitButton?: SearchButton // 模式提交按钮配置
}
```


#### Table 对象

```ts
export default interface Table {
    show: boolean //是否显示
    props: Record<string, unknown> //table组件属性
    multiple: boolean //是否可多选
    rowHandle: TableHandle //操作按钮
}
```
#### Toolbar 对象

```ts
export default interface Toolbar {
  leftHandle: LeftToolbarHandle //左边操作按钮
  rightHandle: ToolbarHandle //右边操作按钮
}
```

### 测试样例

详见src下面的config.ts

### 使用方式

详见src下面的App.vue