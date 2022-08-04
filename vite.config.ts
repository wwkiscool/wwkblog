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
        target:'http://39.104.22.73:8888/',
        changeOrigin:true,
        rewrite:path=>{
          console.log("path",path);
          
          return path.replace(/^\/api/,'/')
        }
      }
    }
  }
  
})
