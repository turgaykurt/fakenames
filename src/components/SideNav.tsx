"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import blogPosts from "@/data/blogPosts.json";
import { usePathname } from "next/navigation";

const SideNav = () => {
    const pathname = usePathname();

    // Menü gönderilerini alfabetik olarak sırala
    const sortedPosts = blogPosts.sort((a, b) => {
        if (a.menu_adi < b.menu_adi) return -1;
        if (a.menu_adi > b.menu_adi) return 1;
        return 0;
    });

    const [isOpen, setIsOpen] = useState(false);

    const toggleSideNav = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsOpen(true); // Tablet ve PC'de açık
            } else {
                setIsOpen(false); // Mobilde kapalı
            }
        };

        handleResize(); // İlk render'da durumu kontrol et
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <nav>
            <div className="hamburger" onClick={toggleSideNav}>
                ☰
            </div>
            <div className={`sidenav ${isOpen ? "open" : ""}`}>
                <div className="closebtn" onClick={toggleSideNav}>
                    &times;
                </div>
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
                                    <Image
                                        src={`/bayraklar/${post.ulke_kodu}.svg`}
                                        alt="Blog Görseli"
                                        width={16}
                                        height={16}
                                    />
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

export default SideNav;
