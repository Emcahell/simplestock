import { useEffect, useState } from 'react';
import { Keyboard, type KeyboardEvent } from 'react-native';

/**
 * Altura actual del teclado virtual (0 si está oculto). Con Android
 * edge-to-edge la ventana ya no se redimensiona, así que la única vía robusta
 * de evitar el teclado es ajustar el layout con esta altura directamente.
 */
export function useKeyboardHeight(): number {
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const show = Keyboard.addListener('keyboardDidShow', (event: KeyboardEvent) => {
      setHeight(event.endCoordinates.height);
    });
    const hide = Keyboard.addListener('keyboardDidHide', () => setHeight(0));
    return () => {
      show.remove();
      hide.remove();
    };
  }, []);

  return height;
}