import { slugify } from 'payload/shared'
import type { FieldHook } from 'payload'
import type { Article } from '@/payload-types'

export const generateSlugHook: FieldHook<Article, String> = ({ value, data }) => {
    if (value) return slugify(value.trim()) || ''
    return slugify(data?.title?.trim() || '') || ''
}
