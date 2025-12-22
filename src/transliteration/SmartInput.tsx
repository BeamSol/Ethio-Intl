import React, { useRef, forwardRef, useState, useEffect, useCallback } from 'react';
import { useTransliterate } from '../hooks/useTransliterate';

export interface SmartInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
  /**
   * Callback fired when the input value changes
   */
  onChange?: (value: string, transliteratedValue: string) => void;
  /**
   * The current value of the input (Latin script)
   */
  value?: string;
  /**
   * Whether transliteration is enabled
   */
  transliterate?: boolean;
  /**
   * Placeholder text for the input
   */
  placeholder?: string;
  /**
   * CSS class name
   */
  className?: string;
  /**
   * Callback fired when transliterated text changes
   */
  onTransliteratedChange?: (transliteratedValue: string) => void;
}

export const SmartInput = forwardRef<HTMLInputElement, SmartInputProps>(
  (
    {
      onChange,
      value: externalValue = '',
      transliterate: shouldTransliterate = true,
      placeholder,
      className,
      onTransliteratedChange,
      ...props
    },
    ref
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [internalValue, setInternalValue] = useState(externalValue);

    // Combine refs
    React.useImperativeHandle(ref, () => inputRef.current!, []);

    // Use the transliterate hook
    const {
      displayValue,
      latinValue,
      onChange: handleTransliterateChange,
      onKeyDown: handleTransliterateKeyDown
    } = useTransliterate(internalValue, (transliterated) => {
      onTransliteratedChange?.(transliterated);
    });

    // Sync external value changes with internal state
    useEffect(() => {
      if (externalValue !== internalValue) {
        setInternalValue(externalValue);
      }
    }, [externalValue, internalValue]);

    // Handle transliteration change and notify parent
    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      if (shouldTransliterate) {
        handleTransliterateChange(e);
        // Notify parent with both Latin and transliterated values
        onChange?.(latinValue, displayValue);
      } else {
        const newValue = e.target.value;
        setInternalValue(newValue);
        // Notify parent with same value for both (no transliteration)
        onChange?.(newValue, newValue);
      }
    }, [shouldTransliterate, handleTransliterateChange, latinValue, displayValue, onChange]);

    // Handle key down events for proper cursor management
    const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
      if (shouldTransliterate && handleTransliterateKeyDown) {
        handleTransliterateKeyDown(e);
      }
    }, [shouldTransliterate, handleTransliterateKeyDown]);

    // Determine which value to display in the input
    const inputDisplayValue = shouldTransliterate ? displayValue : internalValue;

    return (
      <div className={`ethio-smart-input ${className || ''}`}>
        <input
          ref={inputRef}
          type="text"
          value={inputDisplayValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="ethio-smart-input__field"
          {...props}
        />
        {shouldTransliterate && displayValue && (
          <div className="ethio-smart-input__preview">
            Latin: {latinValue}
          </div>
        )}
      </div>
    );
  }
);

SmartInput.displayName = 'SmartInput';
