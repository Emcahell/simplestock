import { router } from 'expo-router';

import { createSale } from '@/db/sales';
import { SaleForm } from '@/features/ventas/sale-form';

export default function VentaNuevaScreen() {
  return (
    <SaleForm
      submitLabel="Registrar venta"
      onSubmit={async (items) => {
        await createSale(items);
        router.back();
      }}
    />
  );
}