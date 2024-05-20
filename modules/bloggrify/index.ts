import {consola} from 'consola'
import {colors} from 'consola/utils'
import {defineNuxtModule} from '@nuxt/kit'
const fse = require('fs-extra')

import pkg from '../../package.json'

export default defineNuxtModule({
    meta: {
        name: 'bloggrify',
        configKey: 'bloggrify',
    },
    setup (options, nuxt) {

        // check presence of content folder
        fse.pathExists('~/content', (err: any, exists: any) => {
            consola.box(
                colors.greenBright('Bloggrify') + '\n\n' +
                        'Missing `content` folder, please add it to your project. Most of the time, this error occurs when you try to start Bloggrify without using an existing theme.  \n\n' +
                        colors.blueBright('Bloggrify is not designed to work without any content. You should follow the documentation here https://bloggrify.com/introduction/installation .')
            )
        })
    }
})
