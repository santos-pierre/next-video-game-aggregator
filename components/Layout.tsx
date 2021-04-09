import React, { ReactNode } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

type Props = {
    children?: ReactNode;
    title?: string;
};

const Layout = ({ children, title = 'Santos Pierre | Games' }: Props) => (
    <>
        <Head>
            <title>{title}</title>
            <meta charSet="utf-8" />
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            <link rel="icon" href="img/logo.png" />
        </Head>
        <div className="min-h-screen bg-gray-900 text-white font-semibold">
            <header className="border-b border-gray-800">
                <nav className="container mx-auto flex lg:flex-row flex-col items-center justify-between px-4 py-6">
                    <div className="flex lg:flex-row flex-col items-center">
                        {/* <!-- Logo --> */}
                        <Link href="/">
                            <a href="/" className="w-16">
                                <Image src="/img/logo.png" width="150px" height="150px" alt="logo" />
                            </a>
                        </Link>
                        {/* <!-- navlinks --> */}
                        <ul className="flex lg:ml-16 ml-0 space-x-8 my-5 lg:my-0">
                            <li>
                                <span className="text-gray-600 cursor-default">Games</span>
                            </li>
                            <li>
                                <span className="text-gray-600 cursor-default">Reviews</span>
                            </li>
                            <li>
                                <span className="text-gray-600 cursor-default">Coming Soon</span>
                            </li>
                        </ul>
                    </div>
                    <div className="flex items-center">
                        <div className="ml-6">
                            <div className="flex flex-col">
                                <div className="relative">
                                    <input
                                        type="text"
                                        className="w-64 px-3 py-1 pl-8 text-sm bg-gray-800 rounded-full focus:outline-none focus:shadow-outline"
                                        placeholder="Search ..."
                                    />
                                    <div className="absolute top-0 flex items-center h-full ml-2">
                                        <svg
                                            className="w-4 text-gray-400"
                                            fill="none"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
            <main>
                <div className="container mx-auto px-4">{children}</div>
            </main>
            <footer className="border-t border-gray-800">
                <div className="container mx-auto px-4 py-6 text-center">
                    Power By{' '}
                    <a href="https://api-docs.igdb.com/#about" className="underline hover:text-gray-400">
                        IGDB API
                    </a>{' '}
                    &middot; Made with{' '}
                    <a href="https://nextjs.org/" className="underline hover:text-gray-400">
                        Next.JS
                    </a>{' '}
                    &middot;{' '}
                    <a href="https://github.com/santos-pierre" className="underline hover:text-gray-400">
                        My Github
                    </a>
                </div>
            </footer>
        </div>
    </>
);

export default Layout;
