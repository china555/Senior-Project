import { useLayoutEffect, useState } from "react";

const isBrowser = () => typeof window !== "undefined";

const getInitialViewport = (): number[] =>
  isBrowser() ? [window.innerWidth, window.innerHeight] : [1440, 1024];

export const useSize = (): Record<string, number> => {
  const [size, setSize] = useState(getInitialViewport());

  useLayoutEffect(() => {
    const getSize = () => {
      if (isBrowser()) {
        setSize([window.innerWidth, window.innerHeight]);
      }
    };

    window.addEventListener("resize", getSize);

    getSize();

    return () => window.removeEventListener("resize", getSize);
  }, []);

  return { width: size[0], height: size[1] };
};

export default useSize;
