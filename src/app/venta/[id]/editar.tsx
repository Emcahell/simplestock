import { useEffect, useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';

import { getSaleById, updateSale } from '@/db/sales';
import { SaleForm, type SaleLine } from '@/features/ventas/sale-form';

export default function VentaEditarScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [lines, setLines] = useState<SaleLine[] | null>(null);

  useEffect(() => {
    let alive = true;
    async function run() {
      if (!id) return;
      const sale = await getSaleById(id as string);
      if (alive && sale) {
        setLines(
          sale.items.map((item) => ({
            product_id: item.product_id,
            name: item.product_name,
            sku: item.sku,
            image_uri: item.image_uri,
            unit_price: item.unit_price,
            quantity: String(item.quantity),
            stock: item.stock + item.quantity,
          }))
        );
      }
    }
    void run();
    return () => {
      alive = false;
    };
  }, [id]);

  if (!lines) return null;

  return (
    <SaleForm
      initialLines={lines}
      submitLabel="Guardar cambios"
      onSubmit={async (items) => {
        if (!id) return;
        await updateSale(id as string, items);
        router.back();
      }}
    />
  );
}