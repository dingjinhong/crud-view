import { defineConfig } from 'vite'
import path, { resolve } from 'path'
import vue from '@vitejs/plugin-vue'

const project = () => {
  return defineConfig({
    plugins: [vue()],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src') // 设置 @ 指向 src
      }
    }
  })
}
const lib = () => {
  return defineConfig({
    plugins: [
      vue()
      // visualizerPlugin
    ],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src') // 设置 @ 指向 src
      }
    },
    build: {
      lib: {
        entry: path.resolve(__dirname, 'src/lib.ts'),
        name: 'CrudView',
        fileName: (format) => `crud-view.${format}.js`
      },
      rollupOptions: {
        external: ['vue'],
        output: {
          inlineDynamicImports: true,
          globals: {
            vue: 'Vue'
          }
        }
      }
      // rollupOptions: {
      //   // 确保外部化处理那些你不想打包进库的依赖
      //   external: ['vue'],
      //   output: {
      //     // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
      //     globals: {
      //       vue: 'Vue'
      //     }
      //   }
      // }
    }
  })
}
// https://vitejs.dev/config/
export default ({ mode }) => {
  switch (mode) {
    case 'lib': // 打包form库文件
      return lib()
      break
    default:
      // 开发模式、生产模式
      return project()
      break
  }
}
