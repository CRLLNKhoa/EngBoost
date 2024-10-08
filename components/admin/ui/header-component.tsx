import React from "react";

function HeaderComponent({
  title = "Tiêu đề component",
  subtitle = "Subtitle của component",
}: {
  title?: string;
  subtitle?: string;
}) {
  return (
    <div className="flex flex-col">
      <h1 className="title-1 leading-3">{title}</h1>
      <p className="leading-4 text-sm">{subtitle}</p>
    </div>
  );
}

export default HeaderComponent;
