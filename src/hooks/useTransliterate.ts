import { useState, useCallback, useRef, useEffect } from 'react';
import { amharicMap, reverseMap } from '../utils/amharicMap';

export interface UseTransliterateResult {
  displayValue: string;
  latinValue: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export const useTransliterate = (
  initialValue: string = '',
  onTransliteratedChange?: (value: string) => void
): UseTransliterateResult => {
  const [displayValue, setDisplayValue] = useState('');
  const [latinValue, setLatinValue] = useState(initialValue);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const lastCursorPosition = useRef<number>(0);
  const previousDisplayValue = useRef<string>('');

  // Initialize display value on mount or when initial value changes
  useEffect(() => {
    if (initialValue) {
      const initialDisplay = transliterateFullText(initialValue);
      setDisplayValue(initialDisplay);
      setLatinValue(initialValue);
      onTransliteratedChange?.(initialDisplay);
    }
  }, [initialValue, onTransliteratedChange]);

  // Full transliteration function for initial values and complete re-transliteration
  const transliterateFullText = useCallback((text: string): string => {
    let result = '';
    let i = 0;

    while (i < text.length) {
      const char = text[i].toLowerCase();

      // Check if this character is a vowel that should combine with the previous consonant
      if (result.length > 0 && isVowel(char)) {
        const lastChar = result[result.length - 1];
        const consonantKey = reverseMap[lastChar];

                        if (consonantKey && amharicMap[consonantKey]) {
                          // Special handling for 'e': check for double 'e' (ee) pattern
                          // If next character is also 'e', use regular 'e' form, otherwise use ä form
                          if (char === 'e') {
                            const nextChar = newValue[i + 1]?.toLowerCase();
                            if (nextChar === 'e' && amharicMap[consonantKey]['e']) {
                              // Double 'e' (ee) → regular e form
                              result = result.slice(0, -1) + amharicMap[consonantKey]['e'];
                              i += 2; // Skip both 'e's
                              continue;
                            } else if (amharicMap[consonantKey]['ä']) {
                              // Single 'e' → ä form (easier for users)
                              result = result.slice(0, -1) + amharicMap[consonantKey]['ä'];
                              i++;
                              continue;
                            }
                          }
                          // Regular vowel combination
                          else if (amharicMap[consonantKey][char]) {
                            result = result.slice(0, -1) + amharicMap[consonantKey][char];
                            i++;
                            continue;
                          }
                        }
      }

      // Default: add the base character
      const transliteration = amharicMap[char]?.base || char;
      result += transliteration;
      i++;
    }

    return result;
  }, []);

  // Check if a character is a vowel
  const isVowel = useCallback((char: string): boolean => {
    return ['a', 'e', 'i', 'o', 'u'].includes(char.toLowerCase());
  }, []);

  // Main transliteration logic with reverse lookup
  const handleTransliteration = useCallback((
    currentDisplayValue: string,
    newKeystroke: string,
    cursorPosition: number
  ): {
    newDisplayValue: string;
    newLatinValue: string;
    newCursorPosition: number;
  } => {
    const keystrokeLower = newKeystroke.toLowerCase();

    // If display is empty, this is the first character
    if (!currentDisplayValue) {
      const newDisplayChar = amharicMap[keystrokeLower]?.base || newKeystroke;
      return {
        newDisplayValue: newDisplayChar,
        newLatinValue: newKeystroke,
        newCursorPosition: cursorPosition + newDisplayChar.length - 1
      };
    }

    // Reverse Lookup: Check if the last character in display exists in our reverseMap as a base value
    const lastDisplayChar = currentDisplayValue[currentDisplayValue.length - 1];
    const consonantKey = reverseMap[lastDisplayChar];

    // Combination Check: If we find the parent key and the new keystroke is a vowel that exists
    if (consonantKey && amharicMap[consonantKey] && isVowel(keystrokeLower) && amharicMap[consonantKey][keystrokeLower]) {
      // Replace the last character with the new combination
      const newDisplayValue = currentDisplayValue.slice(0, -1) + amharicMap[consonantKey][keystrokeLower];

      return {
        newDisplayValue,
        newLatinValue: latinValue + newKeystroke,
        newCursorPosition: cursorPosition // Cursor position stays the same since we replaced 1 char with 1 char
      };
    }

    // If no combination found, just append the new keystroke's base value
    const newCharTransliteration = amharicMap[keystrokeLower]?.base || newKeystroke;
    const newDisplayValue = currentDisplayValue + newCharTransliteration;

    return {
      newDisplayValue,
      newLatinValue: latinValue + newKeystroke,
      newCursorPosition: cursorPosition + newCharTransliteration.length
    };
  }, [latinValue]);

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const inputElement = e.target;
    const newInputValue = inputElement.value;
    const cursorPosition = inputElement.selectionStart || newInputValue.length;

    // The input field contains the current display value (Amharic characters)
    // We need to determine what Latin keystroke was just typed
    // This is tricky because we don't have direct access to the keystroke

    // For now, let's assume the newInputValue is what the user typed in Latin
    // and we need to transliterate it incrementally

    // Calculate the difference from previous state
    const previousLatin = latinValue;
    const newLatin = newInputValue;

    // Find what was added (simple case: single character addition)
    if (newLatin.length > previousLatin.length) {
      const addedChar = newLatin[newLatin.length - 1];
      const { newDisplayValue, newLatinValue: updatedLatin, newCursorPosition } = handleTransliteration(displayValue, addedChar, cursorPosition);

      // Update the input field value to show the transliterated text
      inputElement.value = newDisplayValue;

      // Update state
      setDisplayValue(newDisplayValue);
      setLatinValue(updatedLatin);

      // Notify parent component
      onTransliteratedChange?.(newDisplayValue);

      // Set cursor position
      setTimeout(() => {
        if (inputElement && inputElement === document.activeElement) {
          inputElement.setSelectionRange(newCursorPosition, newCursorPosition);
        }
      }, 0);
    } else if (newLatin.length < previousLatin.length) {
      // Handle deletion
      const deletedLength = previousLatin.length - newLatin.length;
      const newDisplayValue = displayValue.slice(0, displayValue.length - deletedLength);
      const newCursorPosition = Math.max(0, cursorPosition);

      inputElement.value = newDisplayValue;
      setDisplayValue(newDisplayValue);
      setLatinValue(newLatin);
      onTransliteratedChange?.(newDisplayValue);

      setTimeout(() => {
        if (inputElement && inputElement === document.activeElement) {
          inputElement.setSelectionRange(newCursorPosition, newCursorPosition);
        }
      }, 0);
    }
    // Handle other cases (replacement, etc.) as needed
  }, [displayValue, latinValue, handleTransliteration, onTransliteratedChange]);

  // Handle backspace and other special keys
  const onKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    const inputElement = e.target as HTMLInputElement;

    if (e.key === 'Backspace') {
      const start = inputElement.selectionStart || 0;
      const end = inputElement.selectionEnd || 0;

      // Handle single character deletion
      if (start === end && start > 0) {
        // Find the character being deleted in the display value
        const charToDelete = displayValue[start - 1];
        const newDisplayValue = displayValue.slice(0, start - 1) + displayValue.slice(start);

        // Reconstruct latin value by removing the corresponding character
        // This is simplified - in a real implementation we'd need better tracking
        const newLatinValue = latinValue.slice(0, -1);
        const newCursorPosition = start - 1;

        setDisplayValue(newDisplayValue);
        setLatinValue(newLatinValue);
        onTransliteratedChange?.(newDisplayValue);

        // Update the input field value
        inputElement.value = newDisplayValue;

        // Prevent default backspace behavior
        e.preventDefault();

        // Set cursor position
        setTimeout(() => {
          inputElement.setSelectionRange(newCursorPosition, newCursorPosition);
        }, 0);
      }
    }
  }, [displayValue, latinValue, onTransliteratedChange]);

  return {
    displayValue,
    latinValue,
    onChange,
    onKeyDown
  };
};
