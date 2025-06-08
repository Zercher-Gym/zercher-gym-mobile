import { DependencyList, useCallback, useEffect } from "react";

const useDebounce = (
  effect: Function,
  dependencies: DependencyList,
  delay: number
) => {
  const callback = useCallback(effect, dependencies);

  useEffect(() => {
    const timeout = setTimeout(callback, delay);
    return () => clearTimeout(timeout);
  }, [callback, delay]);
};

export default useDebounce;
