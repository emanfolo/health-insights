import React, { ReactNode } from "react";
import Link from "next/link";
import Head from "next/head";

type Props = {
  children?: ReactNode;
  title?: string;
};

export const Layout = ({
  children,
  title = "This is the default title",
}: Props) => (
  <div className=" bg-slate-100 min-h-screen">
    <Head>
      <title>{title}</title>
      <link rel="icon" href="/wellnessmatelogo.png" />
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <header className="px-4 lg:px-6 h-14 flex items-center right-0">
      {/* <Link className="flex items-center justify-center" href="#"></Link> */}
      <nav className=" font-bold text-sm ml-auto flex gap-4 sm:gap-6 sm:text-base">
        <Link
          className="text-black hover:text-blue-700 hover:no-underline"
          href="/"
        >
          Home
        </Link>
        <Link
          className="text-black hover:text-blue-700 hover:no-underline"
          href="/example"
        >
          Example
        </Link>

        <Link
          className="text-black hover:text-blue-700 hover:no-underline"
          href="/create"
        >
          Create
        </Link>
        <Link
          className="text-black hover:text-blue-700 hover:no-underline"
          href="/explore"
        >
          Recipes
        </Link>
      </nav>
    </header>
    {children}
  </div>
);
