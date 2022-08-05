import { h } from 'vue'

import type CrudConfig from './CrudView/model/CrudConfig'

const config: CrudConfig = {
  attrs: {
    name: {
      search: {
        label: '字典项名称',
        type: 'search',

        props: {
          placeholder: '请输入字典项名称',
          suffixIcon: 'Search',
          clearable: true
        }
      },
      content: {
        label: '字典项名称',
        order: 1
      },
      form: {
        label: '字典项名称',
        type: 'text',
        props: {
          placeholder: '请输入字典项名称'
        },
        order: 1
      },
      addForm: {},
      editForm: {}
    },
    code: {
      search: {
        label: '字典项内容',
        type: 'search',
        inHide: true,
        props: {
          placeholder: '请输入字典项内容',
          suffixIcon: 'Search',
          clearable: true
        }
      },
      content: {
        label: '字典项内容',
        order: 2,
        props: { showOverflowTooltip: true }

        //component: () => import('./tag') // () => { h => h('el-tag', 'djh') }
      },
      form: {
        label: '字典项内容',
        type: 'textarea',
        props: {
          resize: 'none',
          rows: 5
        },
        // component: defineAsyncComponent(() =>
        //   import('./components/ContentEditor/index.vue')
        // ),
        col: {
          span: 24
        }
      },
      addForm: {},
      editForm: {}
    },
    description: {
      content: {
        label: '描述',
        order: 3,
        props: { showOverflowTooltip: true }

        //component: () => import('./tag') // () => { h => h('el-tag', 'djh') }
      },
      form: {
        label: '描述',
        type: 'textarea',
        props: {
          resize: 'none',
          rows: 5
        },
        col: {
          span: 24
        }
      },
      addForm: {},
      editForm: {}
    },
    sort: {
      content: {
        label: '排列顺序',
        order: 4,
        props: {}
        //component: () => import('./tag') // () => { h => h('el-tag', 'djh') }
      },
      form: {
        label: '排列顺序',
        order: 2,
        col: {
          span: 24
        }
      },
      addForm: {
        type: 'text'
      },
      editForm: {
        component: () => h('el-tag', 'djh')
      }
    },
    updateUserName: {
      content: {
        label: '更新人',
        order: 5,
        props: {}
        //component: () => import('./tag') // () => { h => h('el-tag', 'djh') }
      }
    },
    updateDate: {
      content: {
        label: '更新时间',
        order: 6,
        props: {},
        formatter(row, col, value) {
          return value
        }
        //component: () => import('./tag') // () => { h => h('el-tag', 'djh') }
      }
    }
  },
  search: {
    show: true,
    expandText: '展开',
    resetButton: {
      label: '重置',
      disabled: false,
      show: false,
      icon: '',
      order: 0
    },
    submitButton: {
      label: '查询',
      disabled: false,
      show: true,
      icon: '',
      order: 1
    },
    searchWhenChange: true,
    buttons: []
  },
  table: {
    show: true,
    props: { height: '100%' },
    multiple: false,
    rowHandle: {
      show: true,
      atLeast: 2, // 多于多少个出现dropdown，
      props: {},
      label: '操作',
      dropdown: {
        text: '...',
        showArrow: true,
        props: {},
        button: {
          type: 'text'
        }
      },
      buttons: {
        view: {
          show: false
        },
        edit: {
          icon: ''
        },
        remove: {
          icon: ''
        }
      }
    }
  },
  // cardView: {
  //   rowProps: {
  //     gutter: 20
  //   },
  //   colProps: {
  //     span: 6
  //   },
  //   cardOptions: {
  //     titleData: {
  //       img: '111',
  //       title: 'title',
  //       desc: 'desc'
  //     },
  //     columnOptions: {
  //       splitName: 2,
  //       padding: 8
  //     },
  //     actionOptions: {
  //       show: true,
  //       atLeast: 2, // 多于多少个出现dropdown，
  //       hMargin: 12,
  //       dropdown: {
  //         text: '. . .',
  //         showArrow: false,
  //         props: {},
  //         button: {
  //           type: 'text'
  //         }
  //       },
  //       buttons: {
  //         view: {
  //           doClick: (that, a, b) => {
  //             console.log(this, that, a, b)
  //           }
  //         },
  //         custom: [{}]
  //       }
  //     }
  //   }
  // },
  form: {
    handle: {
      align: 'right',
      cancelButton: {
        label: '取消',
        disabled: false,
        show: true,
        props: {
          plain: true
        },
        icon: '',
        order: 0
      },
      confirmButton: {
        label: '确认',
        disabled: false,
        show: true,
        icon: '',
        order: 1
      },
      buttons: []
    }
  },
  addForm: {
    wrapper: {
      mode: 'dialog', // 可选drawer,
      props: {
        width: '30%',
        title: `新建字典`
      }
    },
    props: {
      labelWidth: '100px',
      labelPosition: 'right',
      rules: {
        sort: [
          {
            required: true,
            // min: 1,
            // message: '排序数字必须大于0',
            trigger: 'blur',
            validator: (rule, value, callback) => {
              if (value > 0) {
                callback()
              } else {
                callback(new Error('排序数字必须大于0'))
              }
            }
          }
        ],
        name: [
          {
            required: true,
            message: '名称不能为空',
            trigger: 'change'
          }
        ],
        code: [
          {
            required: true,
            message: '内容不能为空',
            trigger: 'change'
          }
        ]
      }
    },
    row: {
      gutter: 20
    }
  },
  editForm: {
    wrapper: {
      mode: 'dialog', // 可选drawer,
      props: {
        width: '30%',
        title: `编辑字典`
      }
    },
    props: {
      labelWidth: '100px',
      labelPosition: 'right',
      rules: {
        sort: [
          {
            required: true,
            //min: 1,
            //message: '排序数字必须大于0',
            trigger: 'blur',
            validator: (rule, value, callback) => {
              if (value > 0) {
                callback()
              } else {
                callback(new Error('排序数字必须大于0'))
              }
            }
          }
        ],
        name: [
          {
            required: true,
            message: '名称不能为空',
            trigger: 'change'
          }
        ],
        code: [
          {
            required: true,
            message: '内容不能为空',
            trigger: 'change'
          }
        ]
      }
    },
    row: {
      gutter: 20
    }
  },
  toolbar: {
    leftHandle: {
      addButton: {
        label: '添加',
        disabled: false,
        show: false,
        icon: '',
        order: 1
      },
      custom: []
    },
    rightHandle: {
      custom: []
    }
  },
  pagination: {
    show: true,
    right: true,
    props: {
      background: true,
      pageSize: 20,
      layout: 'total, sizes, prev, pager, next, jumper'
    }
  }
}
export default config
