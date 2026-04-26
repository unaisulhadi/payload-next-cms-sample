import type { CollectionConfig, FieldHook } from 'payload'
import { generateSlugHook } from './hooks/generate-slug-hook'
import { Article } from '@/payload-types'
import { convertLexicalToPlaintext } from '@payloadcms/richtext-lexical/plaintext'

const CONTENT_SUMMARY_MAX_LENGTH = 160

const generateContentSummaryHook: FieldHook<Article, String> = ({ value, data }) => {
    console.log(data?.content)
    if (value) return value.trim()
    if (!data?.content) return ''
    const text = convertLexicalToPlaintext({ data: data?.content }).trim()
    console.log(text)
    if (!text) return ''
    return (
        text.slice(0, CONTENT_SUMMARY_MAX_LENGTH) +
        (text.length > CONTENT_SUMMARY_MAX_LENGTH ? '...' : '')
    )
}

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
    ],
}
