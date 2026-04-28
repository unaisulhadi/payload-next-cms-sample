import { getPayloadClient } from '@/lib/payload/client'

export async function getArticles() {
    const payload = await getPayloadClient()
    try {
        const { docs: articles } = await payload.find({
            collection: 'articles',
            where: {
                status: {
                    equals: 'published',
                },
            },
            select: {
                id: true,
                title: true,
                slug: true,
                contentSummary: true,
                coverImage: true,
                publishedAt: true,
                author: true,
                readTimeInMins: true,
            },
            sort: 'publishedAt|desc',
        })
        return articles ?? []
    } catch (error) {
        console.error('Error fetching articles:', error)
        return []
    }
}
