import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import React from "react";
import SideNav from "./SideNav";
import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react";

function MobileSideNav() {
  return (
    <div className="lg:hidden flex justify-center items-center">
      <Sheet>
        <SheetTrigger>
          <Menu />
        </SheetTrigger>
        <SheetContent className="border-gray-600">
          <SheetHeader>
            <Link href="/" className="flex items-center gap-1">
              <Image
                src="/logo.png"
                alt="logo"
                height={20}
                width={20}
                className="h-auto w-auto"
              />
              <p className="text-slate-100 text-lg">
                IntelliFrom<span className="text-xs text-primary">ai</span>
              </p>
            </Link>
          </SheetHeader>

          <div className="text-text pt-4">
            <SideNav isMobile={true} />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default MobileSideNav;
