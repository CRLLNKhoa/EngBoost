"use client";
import CreateForm from "@/components/admin/types/create-form";
import EditForm from "@/components/admin/types/edit-form";
import ShowType from "@/components/admin/types/show";
import React, { useState } from "react";
import { AnimatePresence } from "framer-motion"

function TypesPage() {
  const [isAction, setIsAction] = useState<"edit" | "create">("create");

  return (
    <section className="grid grid-cols-2 h-full">
      <div className="overflow-y-auto scroll">
        <ShowType setIsAction={setIsAction} />
      </div>
      <div className="ml-2 border-l overflow-hidden">
      <AnimatePresence>
        {isAction === "create" && <CreateForm />}
        {isAction === "edit" && <EditForm />}
        </AnimatePresence>
      </div>
    </section>
  );
}

export default TypesPage;
