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

            if (!fs.existsSync(nuxt.options.rootDir + '/layouts/themes')) {
                consola.box(
                    colors.greenBright('Bloggrify') + '\n\n' +
                    'Missing themes folder. Please add it to your project. You tried to start Bloggrify with no theme.  \n\n'
                )
                throw _createError('Starting Bloggrify with a non-existing theme.')
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
