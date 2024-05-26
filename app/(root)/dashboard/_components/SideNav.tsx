"use client";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { sideBarItems } from "@/constants/sideBarItems";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import NewForm from "./NewForm";

function SideNav() {
  const path = usePathname();
  console.log(path);

  return (
    <nav className="min-h-[850px] shadow-md border-r pr-8 flex flex-col justify-between border-gray-400">
      <div>
        {sideBarItems.map((item) => (
          <Link
            key={item.id}
            href={item.path}
            className={`flex items-center hover:bg-primary rounded-md mb-4 p-2 gap-3 transition-colors ${
              path === item.path && "bg-primary"
            }`}
          >
            <item.icon />
            {item.name}
          </Link>
        ))}
      </div>

      <div>
        <div className="mr-8 mb-6">
          <NewForm sideBar={true} />
        </div>
        <Progress value={33} />
        <p className="pt-2 text-xs">
          <span className="font-extrabold">1</span> of{" "}
          <span className="font-extrabold">3</span> AI Form Created
        </p>
        <p className="text-xs pt-6">*Upgrade your plan for unlimited forms</p>
      </div>
    </nav>
  );
}

export default SideNav;
