import React from "react";

const DisplayContext = React.createContext<{
  displays: Display[];
  missingDisplays: Display[];
}>({ displays: [], missingDisplays: [] });

export const DisplayProvider = DisplayContext.Provider;
export const DisplayConsumer = DisplayContext.Consumer;

export default DisplayContext;
