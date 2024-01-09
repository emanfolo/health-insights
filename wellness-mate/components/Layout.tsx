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
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta http-equiv="Content-Security-Policy" content="default-src 'self' https: http://206.189.122.226:80;" />
    </Head>
    <header className="px-4 lg:px-6 h-14 flex items-center right-0">
      <Link className="flex items-center justify-center" href="#"></Link>
      <nav className=" text-xs ml-auto flex gap-4 sm:gap-6 sm:text-base">
        <Link className="text-black hover:text-blue-700" href="/">
          Home
        </Link>
        <Link className="text-black hover:text-blue-700" href="/example">
          Example Mealplan
        </Link>

        <Link className="text-black hover:text-blue-700" href="/create">
          Generate Mealplan
        </Link>
        <Link className="text-black hover:text-blue-700" href="/explore">
          Recipes
        </Link>
      </nav>
    </header>
    {children}
  </div>
);
