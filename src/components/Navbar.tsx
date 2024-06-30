"use client";

import React from "react";
import Link from "next/link";
import blogPosts from "@/data/blogPosts.json";
import { usePathname } from "next/navigation";

const Navbar = () => {
    const pathname = usePathname();

    // Menü gönderilerini alfabetik olarak sırala
    const sortedPosts = blogPosts.sort((a, b) => {
        if (a.menu_adi < b.menu_adi) return -1;
        if (a.menu_adi > b.menu_adi) return 1;
        return 0;
    });

    return (
        <nav className="nav">
            <div className="kapsayici">
                <div className="sutun">
                    <Link href="/" className="logo">
                        FakeNames
                    </Link>
                    <ol className="menu">
                        {sortedPosts.map((post) => (
                            <li className="kart" key={post.slug}>
                                <Link
                                    href={`/${post.slug}`}
                                    className={
                                        pathname === `/${post.slug}`
                                            ? "active"
                                            : ""
                                    }
                                >
                                    <span>🇦🇿</span>
                                    {post.menu_adi}
                                </Link>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
