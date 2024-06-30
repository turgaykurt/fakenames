import "@/styles/globals.css";
import Navbar from "@/components/Navbar";
import { Inter } from "next/font/google";
import SideNav from "@/components/SideNav";
import Head from "next/head";

const inter = Inter({
    subsets: ["latin"],
    display: "swap",
});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={inter.className}>
            <Head>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <body>
                <div className="layout">
                    <SideNav />
                    {children}
                </div>
            </body>
        </html>
    );
}
