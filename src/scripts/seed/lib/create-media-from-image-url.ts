import { Payload } from 'payload'
import { faker } from '@faker-js/faker'

export async function createMediaFromImageUrl(payload: Payload, imageUrl: string) {
    try {
        const res = await fetch(imageUrl)
        const arrBuffer = await res.arrayBuffer()
        const buffer = Buffer.from(arrBuffer)

        const mimeType = res.headers.get('content-type') || 'image/jpeg '
        const filesize = buffer.length
        const fileName = res.url.split('/').pop()?.split('?')[0]

        if (!fileName) {
            throw new Error('Failed to extract file name from image URL')
        }

        const avatar = await payload.create({
            collection: 'media',
            draft: true,
            data: {
                alt: faker.lorem.words(3),
            },
            file: {
                name: fileName,
                data: buffer,
                mimetype: mimeType,
                size: filesize,
            },
        })
        return avatar
    } catch (error) {
        console.error('Error creating media from image URL:', error)
        return null
    }
}
