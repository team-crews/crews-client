import { useState, useEffect } from 'react';
import { CrewsBreakpoints } from '../styles/breakpoints';

interface UseBreakpointsParams {
  breakpoint: keyof typeof CrewsBreakpoints;
}

interface UseBreakpointsReturns {
  isSmaller: boolean;
}

/**
 * A custom hook that determines if the current screen size is smaller than a specified breakpoint.
 *
 * @param {UseBreakpointsParams} params - The parameters for the hook.
 * @param {keyof typeof CrewsBreakpoints} params.breakpoint - The breakpoint to compare the screen size against.
 * @returns {UseBreakpointsReturns} - The hook returns an object with a single property `isSmaller`, which indicates whether the screen size is smaller than the specified breakpoint.
 */
const useBreakpoints = ({
  breakpoint,
}: UseBreakpointsParams): UseBreakpointsReturns => {
  const [isSmaller, setIsSmaller] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      const breakpointValue = Number.parseInt(CrewsBreakpoints[breakpoint], 10);

      setIsSmaller(screenWidth < breakpointValue);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [breakpoint]);

  return { isSmaller };
};

export default useBreakpoints;
