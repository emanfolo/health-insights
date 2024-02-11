import React, { ReactNode } from "react";
import Link from "next/link";
import Head from "next/head";
import { NavBar } from "../molecules";

type Props = {
  children?: ReactNode;
  title?: string;
};

export const Layout = ({
  children,
  title = "This is the default title",
}: Props) => (
  <div className=" min-h-screen " data-theme="cupcake">
    <Head>
      <title>{title}</title>
      <link rel="icon" href="/wellnessmatelogo.png" />
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <header className=" h-14 flex items-center right-0 ">
      <NavBar />
    </header>
    {children}
  </div>
);
