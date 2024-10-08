"use client";
import React, { useEffect, useState } from "react";
import HeaderComponent from "../ui/header-component";
import { useForm, SubmitHandler, set } from "react-hook-form";
import { TTypeRender } from "@/types";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaPlus } from "react-icons/fa6";
import { motion } from "framer-motion";
import { createType } from "@/actions/type-actions";
import toast from "react-hot-toast";
import { useTypeStore } from "@/stores/admin/types";
function CreateForm() {
  const [isLoading, setIsLoading] = useState(false);
  const createTypeStore = useTypeStore((state) => state.createType);
  const [inputData,setInputData] = useState<TTypeRender>({
    id: "",
    name: "",
    description: "",
    slug: "",
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const id = new Date().getTime();
    const type = {
      id: String(id),
      name: inputData.name,
      slug: inputData.name,
      description: inputData.description,
    };
    const respone = await createType(type);
    if (respone.status === 200) {
      createTypeStore(type);
      setIsLoading(false);
      setInputData({ id: "", name: "", description: "", slug: "" });
      return toast.success(respone.message);
    } else {
      setIsLoading(false);
      return toast.error(respone.message);
    }
  };


  return (
    <motion.div
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 300, opacity: 0 }}
      className="flex flex-col pl-4 h-full"
    >
      <HeaderComponent
        title="Tạo loại render mới"
        subtitle="Giúp những chủ đề dễ quản lý hơn"
      />
      <form
        onSubmit={handleSubmit}
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
            value={inputData.name}
            onChange={(e) => setInputData({ ...inputData, name: e.target.value })}
            required
            min={8}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="example" className="title-3 mb-1">
            Subtitle render
          </label>
          <input
            placeholder="Nhập với subtitle"
            className="input"
            value={inputData.description}
            onChange={(e) => setInputData({ ...inputData, description: e.target.value })}
            required
            min={8}
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
          {!isLoading ? "Thêm mới" : "Đang thêm mới"}
        </button>
      </form>
    </motion.div>
  );
}

export default CreateForm;
