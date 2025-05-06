import { useEffect } from "react";

const DisabledRightClick = () => {
  useEffect(() => {
    const handleRightClick = (e) => {
      e.preventDefault();
    };

    const handleKeyDown = (e) => {
      const key = e.key.toLowerCase();
      if (
        e.key === "F12" ||
        (e.ctrlKey && ["u", "s", "h", "a", "p", "c", "v", "x"].includes(key)) ||
        (e.ctrlKey && e.shiftKey && ["i", "j", "c"].includes(key)) ||
        (e.metaKey && ["s", "u"].includes(key))
      ) {
        e.preventDefault();
        return false;
      }
    };

    document.addEventListener("contextmenu", handleRightClick);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("contextmenu", handleRightClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return null;
};

export default DisabledRightClick;
