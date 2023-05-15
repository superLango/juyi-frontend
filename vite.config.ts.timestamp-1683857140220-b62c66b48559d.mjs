// vite.config.ts
import { defineConfig } from "file:///C:/Users/26449/Desktop/project/java/%E4%BC%99%E4%BC%B4%E5%8C%B9%E9%85%8D%E7%B3%BB%E7%BB%9F/juyi-frontend/node_modules/vite/dist/node/index.js";
import vue from "file:///C:/Users/26449/Desktop/project/java/%E4%BC%99%E4%BC%B4%E5%8C%B9%E9%85%8D%E7%B3%BB%E7%BB%9F/juyi-frontend/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import Components from "file:///C:/Users/26449/Desktop/project/java/%E4%BC%99%E4%BC%B4%E5%8C%B9%E9%85%8D%E7%B3%BB%E7%BB%9F/juyi-frontend/node_modules/unplugin-vue-components/dist/vite.mjs";
import { VantResolver } from "file:///C:/Users/26449/Desktop/project/java/%E4%BC%99%E4%BC%B4%E5%8C%B9%E9%85%8D%E7%B3%BB%E7%BB%9F/juyi-frontend/node_modules/unplugin-vue-components/dist/resolvers.mjs";
import dns from "dns";
dns.setDefaultResultOrder("verbatim");
var vite_config_default = defineConfig({
  plugins: [vue(), Components({
    resolvers: [VantResolver()]
  })],
  server: {
    port: 3e3
    // 端口号
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFwyNjQ0OVxcXFxEZXNrdG9wXFxcXHByb2plY3RcXFxcamF2YVxcXFxcdTRGMTlcdTRGMzRcdTUzMzlcdTkxNERcdTdDRkJcdTdFREZcXFxcanV5aS1mcm9udGVuZFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcMjY0NDlcXFxcRGVza3RvcFxcXFxwcm9qZWN0XFxcXGphdmFcXFxcXHU0RjE5XHU0RjM0XHU1MzM5XHU5MTREXHU3Q0ZCXHU3RURGXFxcXGp1eWktZnJvbnRlbmRcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzLzI2NDQ5L0Rlc2t0b3AvcHJvamVjdC9qYXZhLyVFNCVCQyU5OSVFNCVCQyVCNCVFNSU4QyVCOSVFOSU4NSU4RCVFNyVCMyVCQiVFNyVCQiU5Ri9qdXlpLWZyb250ZW5kL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHtkZWZpbmVDb25maWd9IGZyb20gJ3ZpdGUnXG5pbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSdcbmltcG9ydCBDb21wb25lbnRzIGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3ZpdGUnO1xuaW1wb3J0IHtWYW50UmVzb2x2ZXJ9IGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3Jlc29sdmVycyc7XG5pbXBvcnQgZG5zIGZyb20gJ2RucydcblxuZG5zLnNldERlZmF1bHRSZXN1bHRPcmRlcigndmVyYmF0aW0nKVxuXG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICAgIHBsdWdpbnM6IFt2dWUoKSwgQ29tcG9uZW50cyh7XG4gICAgICAgIHJlc29sdmVyczogW1ZhbnRSZXNvbHZlcigpXSxcbiAgICB9KSxdLFxuICAgIHNlcnZlcjoge1xuICAgICAgICBwb3J0OiAzMDAwLCAvLyBcdTdBRUZcdTUzRTNcdTUzRjdcbiAgICB9XG59KVxuXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQTBaLFNBQVEsb0JBQW1CO0FBQ3JiLE9BQU8sU0FBUztBQUNoQixPQUFPLGdCQUFnQjtBQUN2QixTQUFRLG9CQUFtQjtBQUMzQixPQUFPLFNBQVM7QUFFaEIsSUFBSSxzQkFBc0IsVUFBVTtBQUlwQyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUN4QixTQUFTLENBQUMsSUFBSSxHQUFHLFdBQVc7QUFBQSxJQUN4QixXQUFXLENBQUMsYUFBYSxDQUFDO0FBQUEsRUFDOUIsQ0FBQyxDQUFFO0FBQUEsRUFDSCxRQUFRO0FBQUEsSUFDSixNQUFNO0FBQUE7QUFBQSxFQUNWO0FBQ0osQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
