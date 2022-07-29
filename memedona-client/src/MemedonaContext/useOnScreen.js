import React from "react";

function useOnScreen(ref, threshold = 0.1) {
  const [isIntersecting, setIntersecting] = React.useState(false);

  const observer = new IntersectionObserver(
    ([entry]) => setIntersecting(entry.isIntersecting),
    { threshold }
  );

  React.useEffect(() => {
    observer.observe(ref.current);
    return () => {
      observer.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return isIntersecting;
}

export { useOnScreen };
