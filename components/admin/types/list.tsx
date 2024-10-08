import { deleteType, getTypes } from "@/actions/type-actions";
import Button from "@/components/ui/button";
import SkeletonList from "@/components/ui/skeleton-list";
import { useTypeStore } from "@/stores/admin/types";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { MdDelete } from "react-icons/md";

function ListType() {
  const listType = useTypeStore((state) => state.listType);
  const editData = useTypeStore((state) => state.editData);
  const setEditData = useTypeStore((state) => state.setEditData);
  const setListType = useTypeStore((state) => state.setListType);
  const deleteTypeStore = useTypeStore((state) => state.deleteType);
  const [isLoadingDelete, setIsLoadingDelete] = React.useState(false);
  const { data, error, isLoading } = useQuery({
    queryKey: ["types"],
    queryFn: () => getTypes(),
  });

  useEffect(() => {
    if (data?.status === 200 && data?.data) {
      setListType(data?.data);
    }
  }, [data]);

  const handleSelect = (e: any) => {
    setEditData(JSON.parse(e.target.value));
  };

  const handleDeleteType = async (id: string) => {
    setIsLoadingDelete(true);
    const confirm = window.confirm("Bạn có chắc chắn muốn xoá?");
    if (confirm) {
      const respone = await deleteType(id);
      if (respone.status === 200) {
        deleteTypeStore(id);
        toast.success(respone.message);
        setIsLoadingDelete(false);
      } else {
        toast.error(respone.message);
        setIsLoadingDelete(false);
      }
    }
  };

  if (isLoading) {
    return <SkeletonList />;
  }

  if (error) {
    return (
      <p className="mt-8 text-red-500 text-center">Something went wrong</p>
    );
  }

  if (data) {
    return (
      <table className="w-full mt-4">
        <thead className="border">
          <tr>
            <th className="w-16 border">Chọn</th>
            <th className="w-1/2 border">Tiêu đề</th>
            <th className="border">Thao tác</th>
          </tr>
        </thead>

        {/* data */}

        <tbody>
          {listType.sort((a: any,b: any) => a.id - b.id).map((item) => (
            <tr key={item.id} className="border text-center h-12">
              <td className="w-16 border">
                <input
                  type="radio"
                  name="select"
                  value={JSON.stringify(item)}
                  onChange={handleSelect}
                  checked={editData.id === item.id}
                />
              </td>
              <td className="w-2/3 border">
                <p className="line-clamp-1">{item.name}</p>
              </td>
              <td className="border">
                <div className="flex items-center justify-center">
                  <Button disabled={isLoadingDelete} onClick={() => handleDeleteType(item.id)}
                    title="Xóa"
                    type="delete"
                    icon={<MdDelete className="size-5" />}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default ListType;
