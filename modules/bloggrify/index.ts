import {consola} from 'consola'
import {colors} from 'consola/utils'
import {defineNuxtModule} from '@nuxt/kit'
import fs from 'node:fs'

export default defineNuxtModule({
    meta: {
        name: 'bloggrify',
        configKey: 'bloggrify',
    },
    setup (options, nuxt) {

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


            if (!fs.existsSync(nuxt.options.rootDir + '/app/content')) {
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
