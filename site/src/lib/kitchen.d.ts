export interface KitchenStageMeta { name: string; wk: string; alt: string; cap: string }
export const STAGES: KitchenStageMeta[];
export function kitchenSVG(stage: number, opts?: { uid?: string; fit?: string; alt?: string }): string;
