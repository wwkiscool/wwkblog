import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
const path = require('path')
import viteCompression  from "vite-plugin-compression"

// https://vitejs.dev/config/
export default defineConfig({
  base:"./",
  plugins: [vue(),viteCompression({
    ext: ".gz",
    deleteOriginFile: false // 是否删除原始文件
  })],
  resolve:{
    alias:{
      '@':path.resolve(__dirname,"src")
    }
  },
  server:{
    proxy:{
      '/api':{
        target:'http://127.0.0.1:8888/',
        changeOrigin:true,
        rewrite:path=>{
          return path.replace(/^\/api/,'')
        }
      }
    }
  }
  
})
