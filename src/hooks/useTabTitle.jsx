import { useEffect } from "react";

function useTabTitle(title, options = {}) {
  const { retainOnUnmount = false } = options;
  const defaultTitle = document.title;

  useEffect(() => {
    document.title = title;

    return () => {
      if (!retainOnUnmount) {
        document.title = defaultTitle;
      }
    };
  }, [title, retainOnUnmount, defaultTitle]);
}

export default useTabTitle;
