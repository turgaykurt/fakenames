"use client";

import BlogPost from "@/components/BlogPost";
import blogPosts from "@/data/blogPosts.json";
import { useEffect } from "react";

const HomePage = () => {
    const defaultSlug = "random-dummy-american-female-and-male-names";
    const post = blogPosts.find((post) => post.slug === defaultSlug);

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

export default HomePage;
