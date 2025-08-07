import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ command, mode }) => {
  // Load env file based on `mode` in the current working directory
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix
  const env = loadEnv(mode, process.cwd(), '');
  
  console.log('🔧 Vite Configuration Debug:');
  console.log('- Mode:', mode);
  console.log('- Command:', command);
  console.log('- Environment variables:', Object.keys(env).filter(key => key.startsWith('VITE_')));
  console.log('- API Base URL:', env.VITE_API_BASE_URL || 'http://localhost:5002 (fallback)');

  return {
    plugins: [react()],
    base:process.env.VITE_API_BASE_URL || "/ggu-btech-form-f",
    
    // Define global constants available during development
    define: {
      __APP_VERSION__: JSON.stringify('1.0.0'),
      // Ensure process.env is available (some libraries expect it)
      'process.env': {}
    },

    // Path resolution and aliases
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@components': path.resolve(__dirname, './src/components'),
        '@pages': path.resolve(__dirname, './src/pages'),
        '@utils': path.resolve(__dirname, './src/utils'),
        '@config': path.resolve(__dirname, './src/config')
      }
    },

    // Development server configuration
    server: {
      port: 3000,
      host: true, // Allow access from network
      open: false, // Don't automatically open browser
      cors: true,
      
      // Proxy API requests to backend during development
      proxy: {
        '/api': {
          target: env.VITE_API_BASE_URL || 'http://localhost:5002',
          changeOrigin: true,
          secure: false,
          rewrite: (path) => {
            console.log('🔄 Proxying request:', path);
            return path;
          }
        }
      }
    },

    // Build configuration
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: mode === 'development',
      minify: mode === 'production' ? 'terser' : false,
      
      // Rollup options
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'],
            router: ['react-router-dom']
          }
        }
      },
      
      // Build target
      target: 'es2015',
      
      // Asset handling
      assetsInlineLimit: 4096,
      
      // CSS code splitting
      cssCodeSplit: true
    },

    // Preview server configuration (for production builds)
    preview: {
      port: 4173,
      host: true,
      cors: true
    },

    // Environment directory
    envDir: './',
    
    // CSS configuration
    css: {
      devSourcemap: mode === 'development',
      modules: {
        localsConvention: 'camelCaseOnly'
      }
    },

    // Optimizations
    optimizeDeps: {
      include: ['react', 'react-dom', 'react-router-dom'],
      exclude: []
    }
  };
});
