import React from "react";
import { sectionIndex } from "../data/site";
import { useActiveSection } from "../hooks/useActiveSection";
import { useElementVisible } from "../hooks/useElementVisible";
import { SectionNav } from "./SectionNav";

const IDS = sectionIndex.map((s) => s.id);

export function HomeNav() {
  const active = useActiveSection(IDS);
  const heroVisible = useElementVisible("hero", true);
  return <SectionNav active={active} railVisible={!heroVisible} />;
}
