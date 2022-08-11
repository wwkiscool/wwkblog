/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}
  // // 对vue进行类型补充说明
  // declare module '@vue/runtime-core' {
  //   interface ComponentCustomProperties {
  //     $DateFormat: any // 这里可以用具体的类型代替any
  //   }
  // }