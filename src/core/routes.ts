import { relative, resolve } from 'node:path'
import { readFileSync } from 'node:fs'
import globby from 'fast-glob'

const methodRegexp
  = /\.(post|get|delete|head|put|patch|trace|options|connect)\./
const replaceRegexp
  = /(\.(post|get|delete|head|put|patch|trace|options|connect))?\.(json|js)$/

export function buildRoutes<T>(src: string = 'mocks') {
  const srcDir = relative(process.cwd(), src).replace(/\\/g, '/')
  return globby
    .sync([`${srcDir}/**/*.json`, `${srcDir}/**/*.js`])
    .map(file => ({
      path: relative(src, file).replace(replaceRegexp, '').replace(/\\/g, '/'),
      method: (file.match(methodRegexp)?.pop() || 'get').toLowerCase() as any,
      handler: (req, res) => {
        if (file.endsWith('.json')) {
          try {
            res.json(JSON.parse(readFileSync(resolve(file), 'utf-8')))
          }
          catch (error) {
            res.json()
          }
        }
        else {
          const mod = import(resolve(file))
          if (typeof mod === 'function')
            res.json(mod(req))
          else
            res.json(mod)
        }
      },
    }))
}
