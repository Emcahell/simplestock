import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { router } from 'expo-router';
import { Pressable, ScrollView, Text, TextInput, View, Platform, type TextStyle } from 'react-native';
import { Image } from 'expo-image';

import { AppHeader } from '@/components/app-header';
import { useThemePreference } from '@/theme/theme-provider';
import { createCategory, getProductById, listCategories, updateProduct } from '@/db/products';
import { CategorySelect } from '@/features/productos/category-select';
import { pickProductImage, requestMediaLibraryPermission } from '@/utils/image-picker';
import { findExtraDigit, priceDigitsToValue, renderPriceDigits, toPriceDigits, valueToPriceDigits } from '@/utils/price-input';
import { useKeyboardHeight } from '@/utils/use-keyboard-height';
import { ICONS } from '@/features/productos/icon-map';

const WEB_INPUT_NO_OUTLINE = { outlineStyle: 'none' } as unknown as TextStyle;

export default function ProductoEditarScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { colors } = useThemePreference();
  const keyboardHeight = useKeyboardHeight();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [priceDigits, setPriceDigits] = useState('');
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [sku, setSku] = useState('');
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
  const [catModal, setCatModal] = useState(false);
  const [catName, setCatName] = useState('');
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => { void init(); }, [id]);

  async function init() {
    await loadCategories();
    if (id) await loadProduct(id as string);
    setLoading(false);
  }
  async function loadCategories() {
    const c = await listCategories();
    setCategories(c);
  }
  async function loadProduct(pid: string) {
    const p = await getProductById(pid);
    if (p) {
      setName(p.name);
      setDescription(p.description);
      setCategoryId(p.category_id);
      setPriceDigits(valueToPriceDigits(p.price));
      setImageUri(p.image_uri);
      setSku(p.sku ?? '');
    }
  }
  function onPriceChange(t: string) {
    setPriceDigits((prev) => {
      const raw = toPriceDigits(t);
      if (raw === prev) return prev;
      if (raw.length > prev.length && raw.startsWith(prev)) return raw;
      if (raw.length < prev.length && prev.startsWith(raw)) return raw;
      if (raw.length === prev.length + 1) return prev + findExtraDigit(raw, prev);
      return raw;
    });
  }
  async function pickImage() {
    const ok = await requestMediaLibraryPermission();
    if (!ok) return;
    const uri = await pickProductImage();
    if (uri) setImageUri(uri);
  }
  async function addCategory() {
    const n = catName.trim();
    if (!n) return;
    const c = await createCategory(n);
    await loadCategories();
    setCategoryId(c.id);
    setCatName('');
    setCatModal(false);
  }
  async function save() {
    if (!id || !name.trim()) return;
    if (!description.trim()) return;
    if (!categoryId) return;
    const price = priceDigitsToValue(priceDigits);
    if (price <= 0) return;
    setSaving(true);
    try {
      await updateProduct(id as string, { name, description, category_id: categoryId, price, image_uri: imageUri, sku });
      router.back();
    } finally { setSaving(false); }
  }

  return (
<View className="flex-1 bg-surface">
      <ScrollView
        className="flex-1"
        style={keyboardHeight > 0 ? { marginBottom: keyboardHeight } : undefined}
        contentContainerStyle={{ padding: 16, paddingBottom: 32 + keyboardHeight }}
        keyboardShouldPersistTaps="handled">
        <View className="gap-4">
          <Pressable onPress={pickImage} className="items-center">
            <View className="h-40 w-40 rounded-xl bg-surface-container items-center justify-center overflow-hidden">
              {imageUri ? <Image source={{ uri: imageUri }} style={{ width: '100%', height: '100%' }} /> : 
                <ICONS.package size={40} color={colors.onSurfaceVariant} />}
            </View>
            <Text className="text-sm mt-2 text-primary font-medium">Cambiar imagen</Text>
          </Pressable>

          <View>
            <Text className="text-sm text-on-surface-variant mb-2">Nombre del producto *</Text>
            <TextInput value={name} onChangeText={setName}
              placeholderTextColor={colors.onSurfaceVariant}
              className="bg-surface-container rounded-xl px-3 py-3 text-on-surface text-base"
              style={Platform.OS==='web'?WEB_INPUT_NO_OUTLINE:undefined} />
          </View>

          <View>
            <Text className="text-sm text-on-surface-variant mb-2">Breve descripción *</Text>
            <TextInput value={description} onChangeText={setDescription}
              multiline numberOfLines={3} textAlignVertical="top"
              placeholderTextColor={colors.onSurfaceVariant}
              className="bg-surface-container rounded-xl px-3 py-3 text-on-surface text-base h-20"
              style={Platform.OS==='web'?WEB_INPUT_NO_OUTLINE:undefined} />
          </View>

          <View>
            <Text className="text-sm text-on-surface-variant mb-2">Categoría *</Text>
            <CategorySelect
              categories={categories}
              selectedId={categoryId}
              onSelect={setCategoryId}
              onCreatePress={() => setCatModal(true)}
            />
          </View>

<View>
            <Text className="text-sm text-on-surface-variant mb-2">Precio (USD) *</Text>
            <TextInput value={renderPriceDigits(priceDigits)} onChangeText={onPriceChange} keyboardType="numeric"
              placeholder="0.00"
              placeholderTextColor={colors.onSurfaceVariant}
              className="bg-surface-container rounded-xl px-3 py-3 text-on-surface text-base"
              style={Platform.OS==='web'?WEB_INPUT_NO_OUTLINE:undefined} />
          </View>

          <View>
            <Text className="text-sm text-on-surface-variant mb-2">SKU</Text>
            <TextInput value={sku} onChangeText={setSku}
              placeholderTextColor={colors.onSurfaceVariant}
              className="bg-surface-container rounded-xl px-3 py-3 text-on-surface text-base"
              style={Platform.OS==='web'?WEB_INPUT_NO_OUTLINE:undefined} />
          </View>

          <Pressable disabled={saving} onPress={save} className="bg-primary h-11 rounded-xl items-center justify-center mt-2">
            <Text className="text-base font-semibold text-on-primary">{saving?'Guardando...':'Guardar cambios'}</Text>
          </Pressable>
        </View>
      </ScrollView>

      {catModal && (
        <View className="absolute inset-0 bg-black/60 items-center justify-center p-4">
          <View className="bg-surface-container rounded-xl p-4 w-full max-w-sm">
            <Text className="text-lg font-semibold text-on-surface mb-3">Nueva categoría</Text>
            <TextInput value={catName} onChangeText={setCatName} placeholder="Nombre"
              placeholderTextColor={colors.onSurfaceVariant}
              className="bg-surface-container-high rounded-xl px-3 py-3 text-on-surface mb-3"
              style={Platform.OS==='web'?WEB_INPUT_NO_OUTLINE:undefined} autoFocus />
            <View className="flex-row gap-2">
              <Pressable onPress={()=>{setCatModal(false);setCatName('');}} className="flex-1 bg-surface-container-high py-3 rounded-xl items-center">
                <Text className="text-on-surface-variant font-medium">Cancelar</Text>
              </Pressable>
              <Pressable onPress={addCategory} className="flex-1 bg-primary py-3 rounded-xl items-center">
                <Text className="text-on-primary font-semibold">Guardar</Text>
              </Pressable>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}