"use client";

import { useParams } from "next/navigation";
import BlogPost from "@/components/BlogPost";
import blogPosts from "@/data/blogPosts.json";
import { useEffect } from "react";

const BlogPostPage = () => {
    const { slug } = useParams();
    const post = blogPosts.find((post) => post.slug === slug);

    useEffect(() => {
        if (post) {
            document.title = `${post.baslik}`;

            // Dinamik description meta etiketini ayarlama
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

    return (
        <div>
            <BlogPost post={post} />
        </div>
    );
};

export default BlogPostPage;
