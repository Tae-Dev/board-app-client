"use client";
import BackdropCustom from "@/components/backdrop";
import React, { createContext, ReactNode, useContext, useState } from "react";

interface BackDropProviderProps {
  children: ReactNode;
}

interface BackDropContextType {
  openLoading: (open: boolean) => void;
  openBackDrop: boolean;
}

const BackDropContext = createContext<BackDropContextType>({
  openLoading: () => {},
  openBackDrop: false,
});

const BackDropProvider: React.FC<BackDropProviderProps> = ({ children }) => {
  const [openBackDrop, setOpenBackDrop] = useState<boolean>(false);

  const openLoading = (open: boolean) => {
    if (open == false) {
      setTimeout(() => {
        setOpenBackDrop(open);
      }, 200);
    } else {
      setOpenBackDrop(open);
    }
  };

  return (
    <BackDropContext.Provider value={{ openLoading, openBackDrop }}>
      {children}
      <BackdropCustom open={openBackDrop} />
    </BackDropContext.Provider>
  );
};
export default BackDropProvider;
export const useBackDrop = () => useContext(BackDropContext);
