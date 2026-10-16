export type Status = "behind" | "on-schedule" | "complete";

export interface NavLink {
  label: string;
  href: string;
}

export interface SectionIndexItem {
  id: string;
  num: string;
  label: string;
  short: string;
}

export interface KitchenStage {
  week: string;
  name: string;
  short: string;
  note: string;
  spend: string;
  stage: number;
  alt: string;
}

export interface PromiseItem {
  key: string;
  text: string;
}

export interface LogEntry {
  id: string;
  place: string;
  title: string;
  week: string;
  stage: string;
  stageIndex: number;
  status: Status;
  statusLabel: string;
  spent: number;
  budget: number;
  note?: string;
  changeOrder?: string;
  href?: string;
  illustration?: number;
}

export interface Service {
  name: string;
  path: string;
  note?: string;
}

export interface ServiceGroup {
  label: string;
  services: Service[];
}

export interface PriceRow {
  project: string;
  low: number;
  high: number;
  unit: "project" | "sqft";
  scaleMax: number;
}

export interface FinishedJob {
  id: string;
  slug: string;
  place: string;
  built: string;
  title: string;
  stage?: number;
  alt: string;
  caption: string;
  signed: number;
  final: number;
  weeksPlanned: number;
  weeksActual: number;
  note: string;
}

export interface Credential {
  label: string;
  value: string;
  detail: string;
  verified: string;
}

export interface Region {
  label: string;
  places: string[];
}

export interface NextStep {
  title: string;
  text: string;
}
