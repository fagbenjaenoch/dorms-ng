import { MapEventType } from "maplibre-gl";
import { useEffect } from "react";

import { useMap } from "./ui/map";

interface MapEventListenerProps {
  handleClick: (e: MapEventType & object) => void;
}

export default function MapEventListener({ handleClick }: MapEventListenerProps) {
  const { map, isLoaded } = useMap();

  //@ts-expect-error don't understand what is going on here
  useEffect(() => {
    if (!map || !isLoaded) return;

    map.on("click", handleClick);

    return () => map.off("click", handleClick);
  }, [map, isLoaded, handleClick]);

  return null;
}
