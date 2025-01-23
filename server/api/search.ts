import { defineEventHandler } from 'h3'
import { serverQueryContent } from '#content/server'

export default defineEventHandler(async (event) => {
    // Fetch all documents
    const docs = (await serverQueryContent(event).where({$and: [
        {
            _extension: { $eq: 'md' },
        },
        {
            _partial: { $eq: false },
        },
        {
            _draft: { $ne: true },
        },
        {
            hidden: { $ne: true },
        }
    ]}).find()).filter(
        (doc) => {
            // Remove empty docs
            return doc.body?.children.length !== 0
        }
    )

    // TODO: Allow body limit customisation
    const bodyLimit = Math.min(500, 20000 / docs.length)

    const data = docs.map(
        ({ _id: id, _path: path, _dir: dir, title = '', description = '', body = undefined}) => {

            return {
                id,
                path,
                dir,
                title,
                description,
                keywords: body?.toc?.links.map(link => link?.text),
                body: extractTextFromAst(body, bodyLimit) || ''
            }
        }
    )

    // Cache search results across client instances
    setResponseHeader(event,'cache-control','max-age=300, must-revalidate')

    return data
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
