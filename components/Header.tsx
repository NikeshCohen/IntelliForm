"use client";

import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import MobileSideNav from "@/app/(root)/dashboard/_components/MobileSideNav";

function Header() {
  const { user, isSignedIn } = useUser();
  const path = usePathname();

  return (
    <header className="max-w-screen-xl px-4 py-4 flex justify-between items-center mr-auto ml-auto">
      <Link href="/" className="flex items-center gap-1">
        <Image
          src="/logo.png"
          alt="logo"
          height={20}
          width={20}
          className="h-auto w-auto"
        />
        <p className="text-slate-100 text-lg">
          IntelliForm<span className="text-xs text-primary">ai</span>
        </p>
      </Link>

      {isSignedIn ? (
        <div className="flex justify-center text-text items-center gap-4">
          {!path.startsWith("/dashboard") && (
            <Link href="/dashboard">
              <Button>Dashboard</Button>
            </Link>
          )}

          {path.startsWith("/dashboard") && (
            <>
              <UserButton afterSignOutUrl="/" />
              <MobileSideNav />
            </>
          )}
        </div>
      ) : (
        <SignInButton>
          <Button>Get Started</Button>
        </SignInButton>
      )}
    </header>
  );
}

export default Header;
