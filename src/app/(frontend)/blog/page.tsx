import { ArticleCard } from './_components/article-card'
import { getArticles } from '@/collections/Articles/fetchers'
import { Media } from '@/payload-types'

function relationIsObject<T>(relation: T | number): relation is T {
    return typeof relation !== 'number'
}

export default async function BlogIndexPage() {
    const articles = await getArticles()

    if (articles.length === 0) {
        return <div>No articles found</div>
    }

    return (
        <div className="grid grid-cols-3 gap-4 w-full">
            {articles.map(
                ({
                    id,
                    slug,
                    title,
                    contentSummary,
                    coverImage,
                    publishedAt,
                    readTimeInMins,
                    author,
                }) => {
                    if (!relationIsObject(coverImage)) {
                        return null
                    }

                    if (!relationIsObject(author) || !relationIsObject(author.avatar)) {
                        return null
                    }

                    return (
                        <ArticleCard
                            key={slug}
                            href={`/blog/${slug}`}
                            title={title}
                            summary={contentSummary}
                            readTimeMins={readTimeInMins ?? 0}
                            publishedAt={new Date(publishedAt ?? new Date())}
                            //
                            coverImage={coverImage}
                            author={{
                                avatar: author.avatar,
                                name: author.name,
                                role: author.role,
                            }}
                        />
                    )
                },
            )}
        </div>
    )
}
