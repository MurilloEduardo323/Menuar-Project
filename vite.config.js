import { defineConfig } from 'vite'
import basicSsl from '@vitejs/plugin-basic-ssl'

export default defineConfig({
  plugins: [
    basicSsl(),
    {
      name: 'usdz-mime',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url && req.url.includes('.usdz')) {
            res.setHeader('Content-Type', 'model/vnd.usdz+zip')
          }
          next()
        })
      }
    }
  ],
  server: {
    host: true, // expõe na rede local para testar pelo celular
    https: true
  }
})
