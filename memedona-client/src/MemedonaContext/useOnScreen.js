import React from "react";

function useOnScreen(ref) {
  const [isIntersecting, setIntersecting] = React.useState(false);

  const observer = new IntersectionObserver(([entry]) =>
    setIntersecting(entry.isIntersecting)
  );

  React.useEffect(() => {
    observer.observe(ref.current);
    return () => {
      observer.disconnect();
    };
  }, []);

  return isIntersecting;
}

export { useOnScreen };
