import type { ServerResponse } from 'node:http'
import type { Configuration as DevServerConfiguration } from 'webpack-dev-server'
import { createUnplugin } from 'unplugin'
import type { Options } from '../types'

import { buildRoutes } from './routes'

type ServerResponseWithJsonHandler = ServerResponse & {
  json?: (params: Record<any, any>) => void
}

export default createUnplugin<Options | undefined>(options => ({
  name: 'unplugin-mockup',
  transformInclude(id) {
    return id.endsWith('main.ts')
  },
  transform(code) {
    return code.replace('__UNPLUGIN__', `Hello Unplugin! ${options}`)
  },
  vite: {
    configureServer(server) {
      const mockRoutes = buildRoutes()
      server.middlewares.use(
        (req, res: ServerResponseWithJsonHandler, next) => {
          if (!res.json) {
            res.json = function (obj) {
              res.setHeader('Content-Type', 'application/json; charset=utf-8')
              res.end(JSON.stringify(obj), 'utf8')
            }
          }
          next()
        },
      )
      mockRoutes.forEach(({ path, handler }) => {
        server.middlewares.use(`/${path}`, handler)
      })
    },
  },
  webpack(compiler) {
    const devServerOptions = compiler.options.devServer as DevServerConfiguration
    const mockRoutes = buildRoutes()

    compiler.options.devServer = Object.assign<DevServerConfiguration, DevServerConfiguration>(
      {
        setupMiddlewares: (middlewares, devServer) => {
          if (!devServer)
            throw new Error('webpack-dev-server is not defined')

          mockRoutes.forEach(({ path, handler, method }) => {
            if (devServer.app)
              devServer.app[method](`/${path}`, handler)
          })
          return middlewares
        },
      },
      devServerOptions,
    )
  },
}))
