"use server";

import { db } from "@/lib/firebase";
import { removeDiacritics } from "@/lib/regex";
import { TTypeRender } from "@/types";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { tr } from "framer-motion/client";

export const getTypes = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "types"));
    const types: TTypeRender[] = [];
    querySnapshot.forEach((doc) => {
      types.push(doc.data() as TTypeRender);
    });
    return {
      status: 200,
      data: types,
    };
  } catch (error) {
    return {
      status: 500,
    };
  }
};

export const createType = async (type: TTypeRender) => {
  const timestamp = new Date().getTime();
  const date = new Date(timestamp);
  const formattedDate = date.toLocaleString();
  const diacritics = removeDiacritics(type.name);
  const slug = diacritics
    .toLowerCase() // Chuyển thành chữ thường
    .trim() // Loại bỏ khoảng trắng ở đầu và cuối
    .replace(/[^a-z0-9\s-]/g, "") // Loại bỏ ký tự không phải là chữ cái hoặc số
    .replace(/\s+/g, "-") // Thay khoảng trắng bằng dấu gạch nối
    .replace(/-+/g, "-");
  try {
    const docRef = await addDoc(collection(db, "types"), {
      ...type,
      slug,
      created_at: formattedDate,
      updated_at: formattedDate,
    });

    return {
      status: 200,
      message: "Tạo loại render thành công !",
    };
  } catch (error) {
    return {
      status: 500,
      message: "Tạo loại render thất bại !",
    };
  }
};

export const updateType = async (type: TTypeRender) => {
  const topicsRef = collection(db, "types"); // Giả sử "topics" là tên bộ sưu tập
  const q = query(topicsRef, where("id", "==", type.id));
  const timestamp = new Date().getTime();
  const date = new Date(timestamp);
  const formattedDate = date.toLocaleString();
  try {
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.log("Không tìm thấy tài liệu nào với topic ID này.");
      return {
        status: 404,
        message: "Không tìm thấy tài liệu nào với topic ID này.",
      }
    }

    querySnapshot.forEach(async (doc) => {
      // Thực hiện cập nhật tài liệu
      await updateDoc(doc.ref, {
        ...type,
        updated_at: formattedDate,
      });
      console.log(`Tài liệu với ID ${doc.id} đã được cập nhật.`);
    });
    return {
      status: 200,
      message: "Cập nhật thành công !",
    };
  } catch (error) {
    console.error("Lỗi khi cập nhật tài liệu: ", error);
    return {
      status: 400,
      message: "Gập lỗi khi cập nhật !",
    };
  }
};

export const deleteType = async (id: string) => {
  const topicsRef = collection(db, "types"); // Giả sử "topics" là tên bộ sưu tập
  const q = query(topicsRef, where("id", "==", id));

  try {
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return {
        status: 500,
        message: "Không tìm thấy tài liệu nào với topic ID này.",
      };
    }

    querySnapshot.forEach(async (doc) => {
      await deleteDoc(doc.ref);
    });

    return { status: 200, message: "Tài liệu đã được xóa thành công." };
  } catch (error: any) {
    return { status: 500, message: `Lỗi khi xóa tài liệu: ${error.message}` };
  }
};
