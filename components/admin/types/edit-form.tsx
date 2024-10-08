"use client";
import React, { useEffect, useState } from "react";
import HeaderComponent from "../ui/header-component";
import { useForm, SubmitHandler, set } from "react-hook-form";
import { TTypeRender } from "@/types";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaPlus } from "react-icons/fa6";
import { motion } from "framer-motion";
import { useTypeStore } from "@/stores/admin/types";
import { s } from "framer-motion/client";
import toast from "react-hot-toast";
import { updateType } from "@/actions/type-actions";

function EditForm() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TTypeRender>();
  const [isLoading, setIsLoading] = useState(false);
  const editData = useTypeStore((state) => state.editData);
  const setEditData = useTypeStore((state) => state.setEditData);
  const updateTypeStore = useTypeStore((state) => state.updateType);

  useEffect(() => {
    setValue("name", editData?.name);
    setValue("slug", editData?.slug);
    setValue("description", editData?.description);
    setValue("id", editData?.id);
  }, [editData]);

  const onSubmit: SubmitHandler<TTypeRender> = async (data) => {
    setIsLoading(true);
    if (data.id === "") {
      toast.error("Vui chọn chủ đề muốn sửa！");
      setIsLoading(false);
      return;
    }
    const respone = await updateType(data);
    if (respone.status === 200) {
      setIsLoading(false);
      updateTypeStore(data);
      setEditData({ id: "", name: "", slug: "", description: "" });
      toast.success("Sửa thành công !");
      return;
    } else {
      toast.error(respone.message);
      setIsLoading(false);
      return;
    }
  };

  return (
    <motion.div
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -300, opacity: 0 }}
      className="flex flex-col pl-4 h-full"
    >
      <HeaderComponent
        title="Chỉnh sửa render"
        subtitle="Giúp những chủ đề dễ quản lý hơn"
      />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col mt-4 gap-4 h-full"
      >
        {/* register your input into the hook by invoking the "register" function */}
        <div className="flex flex-col">
          <label htmlFor="example" className="title-3 mb-1">
            Tiêu đề render
          </label>
          <input
            placeholder="Nhập với tên"
            className="input"
            type="text"
            value={editData?.name}
            onChange={(e) => setEditData({ ...editData, name: e.target.value })}
            {...(register("name"), { required: true, minLength: 8 })}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="example" className="title-3 mb-1">
            Subtitle render
          </label>
          <input
            placeholder="Nhập với subtitle"
            className="input"
            type="text"
            value={editData?.description}
            onChange={(e) =>
              setEditData({ ...editData, description: e.target.value })
            }
            {...(register("description"), { required: true, minLength: 8 })}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="example" className="title-3 mb-1">
            Slug
          </label>
          <input
            readOnly
            placeholder="#explain/example"
            className="input"
            value={editData?.slug}
          />
        </div>

        <button
          disabled={isLoading}
          type="submit"
          className="btn btn-primary mt-auto h-12 
          flex items-center justify-center gap-6 uppercase disabled:bg-gray-100
          disabled:text-gray-400 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <AiOutlineLoading3Quarters className="animate-spin" />
          ) : (
            <FaPlus />
          )}
          {!isLoading ? "Chỉnh sửa" : "Đang chỉnh sửa"}
        </button>
      </form>
    </motion.div>
  );
}

export default EditForm;
