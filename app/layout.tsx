import type { Metadata } from "next";
import { Rajdhani } from "next/font/google";
import "./globals.css";
import Header from "./home/header";
import Footer from "./home/footer";

const font = Rajdhani({ 
    subsets: ["latin"],
    weight: ['300']
});

export const metadata: Metadata = {
    title: "lightime",
    description: "a clock connected to natural light",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={font.className}>
                <Header />
                {children}
                <Footer />
            </body>
        </html>
    );
}
