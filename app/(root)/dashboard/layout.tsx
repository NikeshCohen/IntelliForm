import React from "react";
import SideNav from "./_components/SideNav";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-4">
      <div className="lg:w-64 lg:block hidden">
        <SideNav isMobile={false} />
      </div>

      {children}
    </div>
  );
}

export default layout;
