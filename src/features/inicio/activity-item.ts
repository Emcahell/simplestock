import type { Activity, ActivityType } from '@/db/activities';
import type { ActivityItem, IconName, Tone } from '@/features/inicio/types';
import { formatRelativeTime } from '@/utils/format';

type Presentation = {
  icon: IconName;
  tone: Tone;
};

const PRESENTATION: Record<ActivityType, Presentation> = {
  product_created: { icon: 'plusCircle', tone: 'primary' },
  product_updated: { icon: 'pencil', tone: 'muted' },
  sale_created: { icon: 'scroll', tone: 'primary' },
  sale_updated: { icon: 'pencil', tone: 'muted' },
  restock_created: { icon: 'tray', tone: 'success' },
  restock_updated: { icon: 'pencil', tone: 'muted' },
};

const FALLBACK: Presentation = { icon: 'sliders', tone: 'muted' };

export function toActivityItem(activity: Activity): ActivityItem {
  const presentation = PRESENTATION[activity.type] ?? FALLBACK;
  return {
    id: activity.id,
    icon: presentation.icon,
    tone: presentation.tone,
    title: activity.title,
    subtitle: activity.subtitle,
    value: activity.value,
    time: formatRelativeTime(activity.created_at),
  };
}
