export type PaymentIcon = 'creditCard' | 'bank' | 'banknote';

export type FilterId = 'all' | 'month';

export type VentasData = {
  appName: string;
  action: {
    label: string;
    icon: 'plus';
  };
  filter: {
    all: { id: 'all'; label: string };
    month: { id: 'month'; label: string };
    navigateLabel: string;
    applyLabel: string;
    cancelLabel: string;
  };
  monthNames: string[];
  summary: {
    label: string;
    currency: string;
  };
  totals: {
    all: { amount: string; count: number };
    months: { month: number; amount: string; count: number }[];
  };
  sales: {
    title: string;
    noteLabel: string;
    items: {
      id: string;
      date: string;
      timeLabel: string;
      paymentMethod: string;
      paymentIcon: PaymentIcon;
      itemsSummary: string;
      amount: string;
    }[];
  };
};

/** `'all'` or a 0-based month index of the current year. */
export type PeriodSelection = 'all' | number;