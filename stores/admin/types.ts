import { deleteType } from '@/actions/type-actions';
import { set } from 'react-hook-form';
import { TTypeRender } from "@/types";
import { data } from "framer-motion/client";
import { create } from "zustand";

export type TTypeRenderStore = {
  listType: TTypeRender[];
  editData: TTypeRender;

  setListType: (data: TTypeRender[]) => void;
  setEditData: (data: TTypeRender) => void;
  createType: (data: TTypeRender) => void;
  updateType: (data: TTypeRender) => void;
  deleteType: (id: string) => void;
};

export const useTypeStore = create<TTypeRenderStore>((set) => ({

  // NOTE - LIST TYPE
  listType: [],
  setListType: (data: TTypeRender[]) => set({ listType: data }),
  updateType: (data: TTypeRender) => {
    set((state: TTypeRenderStore) => ({
      listType: state.listType.map((item) => {
        if (item.id === data.id) {
          return data;
        }
        return item;
      }),
    }));
  },
  createType: (data: TTypeRender) =>
    set((state: TTypeRenderStore) => ({ listType: [...state.listType, data] })),
  deleteType: (id:string) => {
    set((state: TTypeRenderStore) => ({
      listType: state.listType.filter((item) => item.id !== id),
    }))
  },


  // NOTE - EDIT TYPE
  editData: { id: "", name: "", slug: "", description: "" },
  setEditData: (data: TTypeRender) => set({ editData: data }),

 
}));
