
import { useState } from "react";

export const useToggle = (initialActive = false) => {
  const [active, setActive] = useState(initialActive);

  const toggle = () => setActive(!active);
  
  return [active, toggle, setActive];
}