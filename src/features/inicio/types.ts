export type Tone = 'primary' | 'success' | 'muted';

export type QuickActionVariant = 'primary' | 'surface';

export type IconName =
  | 'package'
  | 'scroll'
  | 'storefront'
  | 'tray'
  | 'plusCircle'
  | 'plusSimple'
  | 'sliders';

/**
 * Shape of `src/data/inicio.json`. The JSON import widens literals to `string`,
 * so the module is asserted against this contract at the import site.
 */
export type HomeData = {
  appName: string;
  greeting: {
    name: string;
    dateLabel: string;
  };
  metrics: {
    products: {
      label: string;
      icon: IconName;
      value: string;
      unit: string;
    };
    sales: {
      label: string;
      icon: IconName;
      amountWhole: string;
      amountCents: string;
      footerIcon: IconName;
      footerLabel: string;
    };
  };
  quickActions: {
    title: string;
    items: {
      id: string;
      label: string;
      icon: IconName;
      tone: Tone;
      variant: QuickActionVariant;
    }[];
  };
  activity: {
    title: string;
    linkLabel: string;
    items: {
      id: string;
      icon: IconName;
      tone: Tone;
      title: string;
      subtitle: string;
      value: string;
      time: string;
    }[];
  };
};