import React, { ReactNode } from "react";
import Link from "next/link";
import Head from "next/head";

type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({ children, title = "This is the default title" }: Props) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <header className="px-4 lg:px-6 h-14 flex items-center">
      <Link className="flex items-center justify-center" href="#"></Link>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        {/* Create a nav component
            That is not rendered on the server
            That updates based on the page we're on, this will be what holds all cta's 
          */}
        <Link href="/">Home</Link>
        <Link href="/recipes">Browse recipes</Link>
        <Link href="/about">About</Link>
      </nav>
    </header>
    {children}
    {/* <footer>
      <hr />
      <span>I'm here to stay (Footer)</span>
    </footer> */}
  </div>
);

export default Layout;
