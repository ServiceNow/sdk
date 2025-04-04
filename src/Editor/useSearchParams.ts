import React from "react";

export function useSearchParams<ParamNames extends string[]>(
  ...parameterNames: ParamNames
): Record<ParamNames[number], string | null> {
  return React.useMemo(() => {
    // recalculate only when 'search' or arguments changed
    const searchParams = new URLSearchParams(window.location.search);
    return parameterNames.reduce(
      (accumulator, parameterName: ParamNames[number]) => {
        accumulator[parameterName] = searchParams.get(parameterName);
        return accumulator;
      },
      {} as Record<ParamNames[number], string | null>
    );
  }, [parameterNames]); // join for sake of reducing array of strings to simple, comparable string
}
