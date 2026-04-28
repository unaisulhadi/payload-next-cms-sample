import type { CollectionConfig } from 'payload'
import { generateBlurDataUrl, isEligibleForBlurDataUrl } from './lib/generate-blur-data-url'

export const Media: CollectionConfig = {
    slug: 'media',
    access: {
        read: () => true,
    },
    fields: [
        {
            name: 'alt',
            type: 'text',
            required: true,
        },
        {
            name: 'blurDataUrl',
            type: 'text',
            required: true,
            admin: {
                hidden: true,
            },
        },
    ],
    upload: true,
    hooks: {
        beforeChange: [
            async ({ operation, data, req }) => {
                if (operation !== 'create') return data
                // Check for eligibility
                const isEligible = isEligibleForBlurDataUrl(req.file?.mimetype)
                if (!isEligible) return data
                // If yes, generate blur hash
                const base64 = await generateBlurDataUrl(req.file?.data)
                if (!base64) return data

                // Set data to blurDataUrl
                data.blurDataUrl = base64
                return data
            },
        ],
    },
}
