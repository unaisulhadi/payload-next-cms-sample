import { seedAdmin } from './seeders/admin.seeder'

async function main() {
    try {
        await seedAdmin()
        console.log('Admin user seeded successfully')
        process.exit(0)
    } catch (error) {
        console.error('Error seeding admin user:', error)
        process.exit(1)
    }
}

main()
