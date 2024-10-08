"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { act } from "react";

function MenuSidebar({
  dataRender,
}: {
  dataRender: {
    title: string;
    icon: React.ReactNode;
    href: string;
    active: string[];
  }[];
}) {
  return (
    <div className="flex flex-col gap-1">
      {dataRender.map((item) => (
          <MenuSidebarItem
          title={item.title}
          icon={item.icon}
          href={item.href}
          active={item.active}
        />
      ))}
    </div>
  );
}

export default MenuSidebar;

type PropsMenuSidebarItem = {
  title: string;
  icon: React.ReactNode;
  href: string;
  active: string[];
};

const MenuSidebarItem = ({
  title,
  icon,
  href,
  active,
}: PropsMenuSidebarItem) => {
  const pathname = usePathname();

  return (
    <Link href={href}>
      <div
        className={cn(
          "flex items-center w-full py-2 px-4 rounded-lg hover:bg-gray-100 dark:hover:bg-[#ccc] gap-4 cursor-pointer",
          active.includes(pathname) ? "bg-gray-100 dark:bg-[#ccc]" : ""
        )}
      >
        <div className={cn("text-gray-600", active.includes(pathname) ? "text-sky-500 dark:text-white" : "")}>{icon}</div>
        <p className="text-md font-semibold leading-7">{title}</p>
      </div>
    </Link>
  );
};
