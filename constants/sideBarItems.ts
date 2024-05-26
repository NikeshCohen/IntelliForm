import { LibraryBig, LineChart, MessageCircleMore, Shield } from "lucide-react";

export const sideBarItems = [
  {
    id: "42a628ba-01e7-52d9-ae86-19676a1d0762",
    name: "My Forms",
    icon: LibraryBig,
    path: "/dashboard",
  },
  {
    id: "10dca28f-3d6e-513d-9069-cc52e0cfcd2a",
    name: "Responses",
    icon: MessageCircleMore,
    path: "/dashboard/responses",
  },
  {
    id: "88656345-480a-5d5f-87f7-5414e00f9c9d",
    name: "Analytics",
    icon: LineChart,
    path: "/dashboard/analytics",
  },
  {
    id: "331c854d-2022-5057-9e26-6a7cbb886881",
    name: "Upgrade",
    icon: Shield,
    path: "/dashboard/upgrade",
  },
];
