import { getPosts } from '$lib/utils/getPosts'
import {
    error,
    json,
    type RequestEvent,
    type RequestHandler,
} from '@sveltejs/kit'
export const prerender = true
type CustomResponse = Response & {
    json: () => Promise<
        (BlogPost & {
            relativePath: string
        })[]
    >
}

export const GET: RequestHandler = async (
    event: RequestEvent
): Promise<CustomResponse> => {
    const allPosts = await getPosts()

    if (!allPosts) {
        throw error(404, { message: 'no posts found' })
    }
    const sortedPosts = allPosts.sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime()
    })
    const filteredPosts = sortedPosts.filter((post) => post.published)

    return json(filteredPosts)
}
