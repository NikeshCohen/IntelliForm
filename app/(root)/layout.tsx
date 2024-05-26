import Footer from "@/components/Footer";
import Header from "@/components/Header";
import React, { ReactNode } from "react";

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main>
      <Header />
      <section className="flex flex-col px-4 py-4 lg:py-12 text-text">
        {children}
      </section>
      <Footer />
    </main>
  );
};

export default RootLayout;
