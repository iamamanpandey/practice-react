import React, { useContext } from "react";
import { MyContext } from "./context/NameContext";

export default function Name() {
  const context = useContext(MyContext);
  return <div>Hello {context.name}</div>;
}
