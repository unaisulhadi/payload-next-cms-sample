import { convertLexicalToPlaintext } from '@payloadcms/richtext-lexical/plaintext'
import type { FieldHook } from 'payload'
import type { Article } from '@/payload-types'

const CONTENT_SUMMARY_MAX_LENGTH = 160

export const generateContentSummaryHook: FieldHook<Article, String> = ({ value, data }) => {
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
