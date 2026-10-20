import React, { useMemo } from "react";
import { sceneFor, sceneSVG, type Scene } from "../lib/scenes";

interface SceneArtProps {
  label: string;
  uid: string;
  scene?: Scene;
  className?: string;
}

/** Illustrated stand-in for a site photograph, chosen from the slot's description. */
export function SceneArt({ label, uid, scene, className = "" }: SceneArtProps) {
  const svg = useMemo(() => sceneSVG(scene ?? sceneFor(label), uid, label), [label, uid, scene]);
  return <div className={`[&>svg]:block [&>svg]:h-full [&>svg]:w-full ${className}`} dangerouslySetInnerHTML={{ __html: svg }} />;
}
