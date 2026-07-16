import {consola} from 'consola'
import {colors} from 'consola/utils'
import {createResolver, defineNuxtModule} from '@nuxt/kit'
import fs from 'node:fs'

export default defineNuxtModule({
    meta: {
        name: 'bloggrify',
        configKey: 'bloggrify',
    },
    setup (options, nuxt) {

        const {resolve} = createResolver(import.meta.url)

        // Propagate core's type augmentations (@nuxt/schema AppConfig, Author, etc.)
        // to consuming layers/themes. When Bloggrify is used through `extends`, the
        // core lives in node_modules and its `app/types/*.d.ts` files fall outside the
        // consumer's tsconfig include glob, so we register them explicitly here.
        nuxt.hook('prepare:types', ({references}) => {
            references.push({path: resolve('../../app/types/app-config.d.ts')})
        })

        nuxt.hook('build:before', async () => {

            if(!process.env.BASE_URL || !process.env.SITE_INDEXABLE) {
                let message = colors.greenBright('Bloggrify') + '\n\n'

                if(!process.env.BASE_URL) {
                    message += 'BASE_URL is not set. This is not a problem if you are running Bloggrify in development mode.\n' +
                        'However, it is recommended to set BASE_URL in production.\n\n'
                }

                if(!process.env.SITE_INDEXABLE) {
                    message += 'SITE_INDEXABLE is not set. It means your site will not be indexed by search engines..\n' +
                        'Set the environment variable SITE_INDEXABLE to true to enable indexing.'
                }

                consola.box(message)
            }


            if (!fs.existsSync(nuxt.options.rootDir + '/content')) {
                consola.box(
                    colors.greenBright('Bloggrify') + '\n\n' +
                    'Missing `content` folder, please add it to your project. Most of the time, this error occurs when you try to start Bloggrify without using an existing theme.  \n\n' +
                    colors.blueBright('Bloggrify is not designed to work without any content. You should follow the documentation here https://bloggrify.com/introduction/installation .')
                )
                throw _createError('Missing `content` folder.')
            }
        })
    }
})

function _createError (message: string) {
    const error = new Error(message)
    try {error.stack = ''} catch { /* runtime not supports */ }
    return error
}
