import React from "react";
import dynamic from "next/dynamic";
const Project1 = dynamic(() => import("@/components/project1/index"), {
  ssr: false,
});
const index = () => {
  return (
    <div>
      <Project1 />
    </div>
  );
};

export default index;
