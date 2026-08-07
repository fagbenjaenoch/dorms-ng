import { useEffect } from "react";
import { useMap } from "./ui/map";
import { MapEventType } from "maplibre-gl";

interface MapEventListenerProps {
  handleClick: (e: MapEventType & Object) => void;
}

export default function MapEventListener({ handleClick }: MapEventListenerProps) {
  const { map, isLoaded } = useMap();

  //@ts-ignore don't understand what is going on here
  useEffect(() => {
    if (!map || !isLoaded) return;

    map.on("click", handleClick);

    return () => map.off("click", handleClick);
  }, [map, isLoaded, handleClick]);

  return null;
}
