import type { ParsedContent } from '@nuxt/content/dist/runtime/types'
import { serverQueryContent } from '#content/server'
import algoliasearch from 'algoliasearch'
import consola from 'consola'

export default defineEventHandler(async (e) => {
    const config = useAppConfig()
    const isAlgoliaEnabled = config.search?.algolia
    const hasAlgoliaCredentials = process.env.ALGOLIA_API_KEY && process.env.ALGOLIA_APPLICATION_ID

    if (!isAlgoliaEnabled || !hasAlgoliaCredentials) {
        return
    }

    if (isAlgoliaEnabled && !hasAlgoliaCredentials) {
        consola.warn(
            'Algolia is enabled but no credentials are provided. Please provide Algolia API Key and Application ID.'
        )
        return
    }

    const client = algoliasearch(process.env.ALGOLIA_APPLICATION_ID, process.env.ALGOLIA_API_KEY)
    const contentList = (await serverQueryContent(e).where({ hidden: { $ne: true }, draft: { $ne: true } }).find()) as ParsedContent[]
    const indexName = 'bloggrify'

    // clear the index in case any documents were removed
    const index = client.initIndex(indexName)
    const docs = contentList.map((c) => {

        const body = extractTextFromAst(c.body, 5000)
        return {
            objectID: c._path,
            title: c.title,
            content: body,
            date: c.date,
            image: c.cover,
            slug: c._path,
            url: c._path,
        }})
    const { objectIDs } = await index.saveObjects(docs)
    consola.success(
        `Indexed ${objectIDs.length} records in Algolia for: ${indexName}`
    )


})

/**
 * Converts markdown json AST text contents to a string
 * @param node markdown json AST
 * @param bodyLimit character limit for the body property
 * @return text content
 */
function extractTextFromAst(node: unknown, bodyLimit: number) : string {
    let text = ''

    if (text.length >= bodyLimit) {
        return text
    }

    if (node.type === 'text' && node.value) {
        text += node.value
    }
    if (node.children) {
        for (const child of node.children) {
            text += ' ' + extractTextFromAst(child, bodyLimit).trim()
            if (text.length >= bodyLimit) {
                return text.slice(0, bodyLimit)
            }
        }
    }
    return text
}

