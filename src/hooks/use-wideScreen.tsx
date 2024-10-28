import * as React from 'react';

const WIDESCREEN_BREAKPOINT = 1280;

export function useWideScreen() {
  const [isWideScreen, setIsWideScreen] = React.useState<boolean>(
    window.innerWidth > WIDESCREEN_BREAKPOINT
  );

  React.useEffect(() => {
    const mql = window.matchMedia(
      `(min-width: ${WIDESCREEN_BREAKPOINT + 1}px)`
    );
    const onChange = () => {
      setIsWideScreen(window.innerWidth > WIDESCREEN_BREAKPOINT);
    };
    mql.addEventListener('change', onChange);
    setIsWideScreen(window.innerWidth > WIDESCREEN_BREAKPOINT);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  return !!isWideScreen;
}
