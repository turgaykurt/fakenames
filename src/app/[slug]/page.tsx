"use client";

import { useParams } from "next/navigation";
import BlogPost from "@/components/BlogPost";
import blogPosts from "@/data/blogPosts.json";
import { useEffect } from "react";

const BlogPostPage = () => {
    const { slug } = useParams();
    const post = blogPosts.find((post) => post.slug === slug) as
        | BlogPostType
        | undefined;

    useEffect(() => {
        if (post) {
            document.title = `${post.baslik}`;

            const metaDescription = document.querySelector(
                'meta[name="description"]'
            );
            if (metaDescription) {
                metaDescription.setAttribute("content", `${post.aciklama}`);
            } else {
                const description = document.createElement("meta");
                description.name = "description";
                description.content = `${post.aciklama}`;
                document.head.appendChild(description);
            }
        }
    }, [post]);

    if (!post) {
        return <div>Post not found</div>;
    }

    return (
        <div>
            <BlogPost post={post} />
        </div>
    );
};

export default BlogPostPage;
