import type { ActivityItem } from '@/features/inicio/types';

/**
 * Shape of `src/data/registros.json`. The JSON import widens literals to
 * `string`, so the module is asserted against this contract at the import site.
 */
export type RegistrosData = {
  appName: string;
  summaryLabel: string;
  emptyLabel: string;
  showMoreLabel: string;
  /** How many entries are revealed per tap on the "Ver más" button. */
  pageSize: number;
  items: ActivityItem[];
};