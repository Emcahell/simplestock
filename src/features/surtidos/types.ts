export type Period = {
  id: string;
  label: string;
  count: number;
};

export type SurtidosData = {
  appName: string;
  action: {
    label: string;
    icon: 'plus';
  };
  filter: {
    navigateLabel: string;
    cancelLabel: string;
    movementsLabel: string;
    placeholder: string;
  };
  periods: Period[];
  history: {
    title: string;
    shownSuffix: string;
    emptyLabel: string;
    resultingStockLabel: string;
  };
  restocks: {
    id: string;
    periodId: string;
    dateLabel: string;
    productName: string;
    quantityLabel: string;
    referenceLabel: string;
    stockLabel: string;
  }[];
};