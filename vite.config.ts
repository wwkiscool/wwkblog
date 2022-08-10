import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
const path = require('path')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
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
          console.log("path",path);
          
          return path.replace(/^\/api/,'')
        }
      }
    }
  }
  
})
