import Image from "next/image";
import React from "react";
import MenuSidebar from "./menu-sidebar";
import Link from "next/link";
import { FaChartSimple } from "react-icons/fa6";
import { MdAdminPanelSettings, MdMoreVert, MdPlayLesson, MdSupervisedUserCircle, MdTopic } from "react-icons/md";
import { IoText } from "react-icons/io5";
import { BsFillArchiveFill } from "react-icons/bs";
import { SiApplemusic } from "react-icons/si";

function SideBar() {
  return (
    <aside className="w-64 h-full bg-background shadow-lg flex flex-col rounded-xl p-2">
      <Link href="/" className="flex items-center mt-1 pl-3">
        <Image src="/logo.png" alt="Logo" width={42} height={42} />
        <h1 className="ml-2 font-semibold text-lg">EngBoost</h1>
      </Link>
      <nav className="flex-1 flex flex-col mt-8">
        <MenuSidebar
          dataRender={[
            {
              title: "Thống kê",
              icon: <FaChartSimple className="w-6 h-6" />,
              href: "/admin",
              active: ["/admin"],
            },
            {
              title: "Quản lý loại",
              icon: <BsFillArchiveFill className="w-6 h-6" />,
              href: "/admin/types",
              active: ["/admin/types"],
            },
            {
              title: "Quản lý chủ đề",
              icon: <MdTopic className="w-6 h-6" />,
              href: "/admin/topics",
              active: ["/admin/topics"],
            },
            {
              title: "Quản lý bài học",
              icon: <MdPlayLesson className="w-6 h-6" />,
              href: "/admin/lessons",
              active: ["/admin/lessons"],
            },
            {
              title: "Quản lý từ vựng",
              icon: <IoText className="w-6 h-6" />,
              href: "/admin/words",
              active: ["/admin/words"],
            },
            {
                title: "Quản lý bài nghe",
                icon: <SiApplemusic className="w-6 h-6" />,
                href: "/admin/listenings",
                active: ["/admin/listenings"],
              },
            {
                title: "Quản lý người học",
                icon: <MdSupervisedUserCircle className="w-6 h-6" />,
                href: "/admin/students",
                active: ["/admin/students"],
              },
          ]}
        />
      </nav>
      <div className="flex items-center mt-auto px-2">
      <MdAdminPanelSettings className="size-10" />
        <p className="font-semibold ml-4">Admin</p>
        <div className="ml-auto hover:bg-gray-200 size-8 flex items-center 
        rounded-lg justify-center cursor-pointer duration-300"><MdMoreVert className="w-6 h-6" /></div>
      </div>
    </aside>
  );
}

export default SideBar;
