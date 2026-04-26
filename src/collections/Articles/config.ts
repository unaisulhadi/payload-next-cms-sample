import type { CollectionConfig } from 'payload'
import { generateSlugHook } from './hooks/generate-slug-hook'
import { generateContentSummaryHook } from './hooks/generate-content-summary-hook'
import { convertLexicalToPlaintext } from '@payloadcms/richtext-lexical/plaintext'

export const Articles: CollectionConfig = {
    slug: 'articles',
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
            unique: true,
        },
        {
            name: 'slug',
            type: 'text',
            required: true,
            unique: true,
            hooks: {
                beforeValidate: [generateSlugHook],
            },
        },
        {
            name: 'content',
            type: 'richText',
            required: true,
        },
        {
            name: 'contentSummary',
            type: 'textarea',
            required: true,
            hooks: {
                beforeValidate: [generateContentSummaryHook],
            },
        },
        {
            name: 'readTimeInMins',
            type: 'number',
            defaultValue: 0,
            hooks: {
                beforeChange: [
                    ({ siblingData }) => {
                        // data is not stored in db
                        delete siblingData?.readTimeInMins
                    },
                ],
                afterRead: [
                    ({ value, siblingData, data }) => {
                        const text = convertLexicalToPlaintext({ data: data?.content })
                        const wordsPerMinute = 200
                        const words = text.split(/\s+/).length
                        return Math.ceil(words / wordsPerMinute)
                    },
                ],
            },
        },
    ],
}
