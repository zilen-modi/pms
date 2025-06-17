import { useState, useEffect } from "react";

export type ViewType = "card" | "table";

const LOCAL_STORAGE_KEY = "products-view-preference";

export const useViewPreference = () => {
  const [viewType, setViewType] = useState<ViewType>("card");

  useEffect(() => {
    try {
      const savedPreference = localStorage.getItem(
        LOCAL_STORAGE_KEY
      ) as ViewType;
      if (
        savedPreference &&
        (savedPreference === "card" || savedPreference === "table")
      ) {
        setViewType(savedPreference);
      }
    } catch (error) {
      console.error("Failed to load view preference from localStorage:", error);
    }
  }, []);

  const updateViewType = (newViewType: ViewType) => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, newViewType);
      setViewType(newViewType);
    } catch (error) {
      console.error("Failed to save view preference to localStorage:", error);

      setViewType(newViewType);
    }
  };

  return {
    viewType,
    setViewType: updateViewType,
  };
};
