import { CollectionConfig } from 'payload'

export const ArticleAuthors: CollectionConfig = {
    slug: 'article-authors',
    admin: {
        useAsTitle: 'name',
    },
    fields: [
        {
            name: 'name',
            type: 'text',
            required: true,
            unique: true,
        },
        {
            name: 'avatar',
            type: 'upload',
            relationTo: 'media',
            required: true,
        },
        {
            name: 'role',
            type: 'select',
            options: [
                {
                    label: 'Staff Writer',
                    value: 'staff_writer',
                },
                {
                    label: 'Contributor',
                    value: 'contributor',
                },
                {
                    label: 'Guest Writer',
                    value: 'guest_writer',
                },
                {
                    label: 'Editor',
                    value: 'editor',
                },
            ],
            defaultValue: 'staff_writer',
            required: true,
        },
    ],
}
