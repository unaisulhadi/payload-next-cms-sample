import { Payload } from 'payload'
import { faker } from '@faker-js/faker'
import { createMediaFromImageUrl } from '../lib/create-media-from-image-url'

export async function seedArticleAuthor(payload: Payload) {
    try {
        const imageUrl = faker.image.personPortrait({ sex: 'male', size: 512 })
        const avatar = await createMediaFromImageUrl(payload, imageUrl)
        if (!avatar) {
            throw new Error('Failed to create avatar')
        }

        const response = await payload.create({
            collection: 'article-authors',
            data: {
                name: faker.person.fullName(),
                role: 'staff_writer',
                avatar: avatar.id,
            },
        })
    } catch (error) {
        console.error('Error seeding article author:', error)
    }
}
