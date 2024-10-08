import React from "react";
import HeaderComponent from "../ui/header-component";
import Button from "@/components/ui/button";
import { IoMdAdd } from "react-icons/io";
import ListType from "./list";
import { MdEdit } from "react-icons/md";
import { TTypeRender } from "@/types";
import { useTypeStore } from "@/stores/admin/types";
import toast from "react-hot-toast";

function ShowType({
  setIsAction,
}: {
  setIsAction: React.Dispatch<React.SetStateAction<"create" | "edit">>;
}) {
  const editData = useTypeStore((state) => state.editData);

  return (
    <div className="flex flex-col gap-2 pr-4 h-full relative">
      <HeaderComponent
        title="Quản lý loại render"
        subtitle="Giúp render các chủ đề dễ dàng hơn"
      />
      <div className="flex items-center justify-between mt-2 sticky top-0 bg-white pb-4">
        <h2 className="font-semibold">Thao tác: </h2>
        <div className="flex gap-2">
          <Button
            onClick={() => setIsAction("create")}
            title="Thêm mới"
            icon={<IoMdAdd className="size-5" />}
          />
          <Button
            onClick={() => {
              if (editData.id !== "") {
                setIsAction("edit");
                return;
              }
              toast.error("Vui lòng chọn chủ đề muốn sửa!");
            }}
            title="Chỉnh sữa"
            type="outline"
            icon={<MdEdit className="size-5" />}
          />
        </div>
      </div>

      <ListType />
    </div>
  );
}

export default ShowType;
