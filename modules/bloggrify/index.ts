import {consola} from 'consola'
import {colors} from 'consola/utils'
import {defineNuxtModule} from '@nuxt/kit'
import fse from 'fs-extra'

export default defineNuxtModule({
    meta: {
        name: 'bloggrify',
        configKey: 'bloggrify',
    },
    setup (options, nuxt) {

        nuxt.hook('build:before', async () => {
            fse.pathExists(nuxt.options.rootDir + '/content', (err: any, exists: any) => {
                if (exists) return
                consola.box(
                    colors.greenBright('Bloggrify') + '\n\n' +
                    'Missing `content` folder, please add it to your project. Most of the time, this error occurs when you try to start Bloggrify without using an existing theme.  \n\n' +
                    colors.blueBright('Bloggrify is not designed to work without any content. You should follow the documentation here https://bloggrify.com/introduction/installation .')
                )
                throw _createError('Missing `content` folder.')
            })
        })

    }
})

function _createError (message: string) {
    const error = new Error(message)
    try {error.stack = ''} catch { /* runtime not supports */ }
    return error
}
