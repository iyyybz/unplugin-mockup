# unplugin-mockup

[![NPM version](https://img.shields.io/npm/v/unplugin-mockup?color=a1b858&label=)](https://www.npmjs.com/package/unplugin-mockup)

## Install

```bash
npm i unplugin-mockup
```

<details>
<summary>Vite</summary><br>

```ts
// vite.config.ts
import Mock from 'unplugin-mockup/vite'

export default defineConfig({
  plugins: [
    Mock({
      /* options */
    }),
  ],
})
```

Example: [`playground/`](./playground/)

<br></details>

<details>
<summary>Rollup</summary><br>

```ts
// rollup.config.js
import Mock from 'unplugin-mockup/rollup'

export default {
  plugins: [
    Mock({
      /* options */
    }),
  ],
}
```

<br></details>

<details>
<summary>Webpack</summary><br>

```ts
// webpack.config.js
module.exports = {
  /* ... */
  plugins: [
    require('unplugin-mockup/webpack')({
      /* options */
    }),
  ],
}
```

<br></details>

<details>
<summary>Nuxt</summary><br>

```ts
// nuxt.config.js
export default {
  buildModules: [
    [
      'unplugin-mockup/nuxt',
      {
        /* options */
      },
    ],
  ],
}
```

> This module works for both Nuxt 2 and [Nuxt Vite](https://github.com/nuxt/vite)

<br></details>

<details>
<summary>Vue CLI</summary><br>

```ts
// vue.config.js
module.exports = {
  configureWebpack: {
    plugins: [
      require('unplugin-mockup/webpack')({
        /* options */
      }),
    ],
  },
}
```

<br></details>

<details>
<summary>esbuild</summary><br>

```ts
// esbuild.config.js
import { build } from 'esbuild'
import Mock from 'unplugin-mockup/esbuild'

build({
  plugins: [Mock()],
})
```

<br></details>

## Guide

To test plugin, run: `pnpm run dev`
To release a new version, run: `pnpm run release`


