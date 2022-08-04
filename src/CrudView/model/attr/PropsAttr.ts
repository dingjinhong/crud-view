import type { Component } from 'vue'

export default interface PropsAttr {
  order?: number
  component?: Component
  props?: Record<string, unknown>
  label?: string
  key?: string
}
