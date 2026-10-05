export type ViewMode = 'list' | 'grid';

export type ProductosData = {
  appName: string;
  action: { label: string; icon: 'plus' };
  search: { placeholder: string };
  view: { list: string; grid: string };
  summary: { title: string; caption: string };
  empty: { title: string; description: string };
  categories: { id: string; label: string }[];
  products: {
    detailHint: string;
    editLabel: string;
    deleteLabel: string;
    stockTemplate: string;
    currency: string;
    items: {
      id: string;
      name: string;
      sku: string;
      category: string;
      price: string;
      stock: number;
    }[];
  };
};