import { FC, useState } from "react";

interface Name {
    gender: string;
    name: string;
}

interface BlogPostProps {
    post: {
        id: number;
        ulke_kodu: string;
        ulke_adi: string;
        menu_adi: string;
        baslik: string;
        slug: string;
        aciklama: string;
        isimler: Name[];
    };
}

const BlogPost: FC<BlogPostProps> = ({ post }) => {
    const [filter, setFilter] = useState<"all" | "woman" | "man">("all");
    const [copiedName, setCopiedName] = useState("");

    // post ve isimler varsa filter işlemi yap, değilse boş dizi döndür
    const filteredPeople =
        post && post.isimler
            ? post.isimler.filter((person) => {
                  if (filter === "all") return true;
                  return person.gender === filter;
              })
            : [];

    const copyToClipboard = async (name: string) => {
        try {
            await navigator.clipboard.writeText(name);
            setCopiedName(name);
            setTimeout(() => setCopiedName(""), 2000);
        } catch (err) {
            console.error("Copy failed:", err);
        }
    };

    return (
        <section className="blogpost">
            {/* post varsa içeriği göster */}
            {post && (
                <>
                    <h1>{post.baslik}</h1>
                    <p>{post.aciklama}</p>

                    <div className="butonlar">
                        <button
                            className={`buton ${
                                filter === "all" ? "active" : ""
                            }`}
                            onClick={() => setFilter("all")}
                        >
                            All
                        </button>
                        <button
                            className={`buton ${
                                filter === "woman" ? "active" : ""
                            }`}
                            onClick={() => setFilter("woman")}
                        >
                            Woman
                        </button>
                        <button
                            className={`buton ${
                                filter === "man" ? "active" : ""
                            }`}
                            onClick={() => setFilter("man")}
                        >
                            Man
                        </button>
                    </div>

                    {copiedName && (
                        <div className="alarm">{copiedName} copied!</div>
                    )}

                    <ol>
                        {filteredPeople.map((isim, index) => (
                            <li
                                key={index}
                                className={isim.gender}
                                onClick={() => copyToClipboard(isim.name)}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    height="20px"
                                    viewBox="0 -960 960 960"
                                    width="20px"
                                    fill="currentColor"
                                >
                                    <path d="M362.31-260q-27.01 0-45.66-18.65Q298-297.3 298-324.31v-455.38q0-27.01 18.65-45.66Q335.3-844 362.31-844h359.38q27.01 0 45.66 18.65Q786-806.7 786-779.69v455.38q0 27.01-18.65 45.66Q748.7-260 721.69-260H362.31Zm0-52h359.38q4.62 0 8.46-3.85 3.85-3.84 3.85-8.46v-455.38q0-4.62-3.85-8.46-3.84-3.85-8.46-3.85H362.31q-4.62 0-8.46 3.85-3.85 3.84-3.85 8.46v455.38q0 4.62 3.85 8.46 3.84 3.85 8.46 3.85Zm-124 176q-27.01 0-45.66-18.65Q174-173.3 174-200.31v-507.38h52v507.38q0 4.62 3.85 8.46 3.84 3.85 8.46 3.85h411.38v52H238.31ZM350-312v-480 480Z" />
                                </svg>
                                {isim.name}
                            </li>
                        ))}
                    </ol>
                </>
            )}
        </section>
    );
};

export default BlogPost;
