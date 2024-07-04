import { Suspense } from "react";

interface Post {
    title: {
        rendered: string;
    };
}

async function fetchPostData(slug: string): Promise<Post | null> {
    const domain = "https://reactwp.jeffandony.com";
    await new Promise(resolve => setTimeout(resolve, 3000)); // Simulate a delay
    const fetchedPosts = await fetch(`${domain}/wp-json/wp/v2/posts?slug=${slug}`).then((res) => res.json());

    if (fetchedPosts.length > 0) {
        return fetchedPosts[0];
    } else {
        return null;
    }
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
    const post = await fetchPostData(params.slug);

    if (!post) {
        return <p>No post found for the given slug.</p>;
    }

    return (
        <article>
            <h1 className="text-center text-3xl p-4">{post.title.rendered}</h1>
            {/* Add more post content rendering here */}
        </article>
    );
}