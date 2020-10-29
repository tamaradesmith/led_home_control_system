import React from "react";

interface Display {
  name: string;
  ipaddress: string;
  led_number: number;
  id?: number;
}

const DisplayContext = React.createContext<{
  displays: Display[];
  missingDisplays: Display[];
}>({ displays: [], missingDisplays: [] });

export const DisplayProvider = DisplayContext.Provider;
export const DisplayConsumer = DisplayContext.Consumer;

export default DisplayContext;
