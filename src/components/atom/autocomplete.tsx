import React, { useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import Input from './input.tsx';
import { cn } from '../../lib/utils/utils.ts';

/**
 * Autocomplete component options
 * Properties:
 * - `label`: The visible text shown to users in the Autocomplete dropdown list.
 *            This text is used for display purposes only.
 * - `value`: The underlying data or identifier for the option. This value is typically
 *            used for form submission or data retrieval based on the user's selection.
 */

export interface AutocompleteOption {
  label: string;
  value: string;
}

/**
 * Autocomplete component properties
 * - `options`: Array of options to display in the dropdown.
 * - `registerReturns`: Value from `useForm`'s `register` function to connect the input
 *                      field with the parent form. See: https://react-hook-form.com/api/useform/register
 * - `onSelect`: Callback when an option is selected, receiving the selected option.
 * - `onClearInput`: Callback when the input is cleared, typically resetting the field.
 * - `isEmpty`: Boolean indicating if the input is empty, used to toggle the dropdown.
 */

interface AutocompleteProps {
  options: AutocompleteOption[];
  registerReturns: UseFormRegisterReturn;
  onSelect: (option: AutocompleteOption) => void;
  onClearInput: () => void;
  isEmpty?: boolean;
}

const Autocomplete = ({
  options,
  registerReturns,
  onSelect,
  onClearInput,
  isEmpty = false,
}: AutocompleteProps) => {
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [showOptions, setShowOptions] = useState(true);

  const handleItemClick = (option: AutocompleteOption) => {
    onSelect(option);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      setHighlightedIndex((prevIndex) => (prevIndex + 1) % options.length);
    } else if (e.key === 'ArrowUp') {
      setHighlightedIndex((prevIndex) =>
        prevIndex <= 0 ? options.length - 1 : prevIndex - 1,
      );
    } else if (e.key === 'Enter' && highlightedIndex >= 0) {
      e.preventDefault();
      onSelect(options[highlightedIndex]);
    } else if (e.key === 'Escape') {
      setShowOptions(false);
    }
  };

  const handleBlur = () => {
    setShowOptions(false);
  };

  const handleFocus = () => {
    setShowOptions(true);
  };

  return (
    <div className="relative">
      <Input
        className="mb-20 mt-12 py-2"
        placeholder="동아리명"
        registerReturns={registerReturns}
        clearInput={onClearInput}
        onKeyDown={handleKeyDown}
        onBlurCapture={handleBlur}
        onFocusCapture={handleFocus}
      />
      <ul
        className={cn(
          'absolute left-0 top-full z-10 m-0 w-full list-none rounded border border-crews-g03 bg-white p-2',
          // 입력이 없거나, blur 혹은 esc가 눌린 경우 display none
          isEmpty || !showOptions ? 'hidden' : 'block',
        )}
      >
        {options.length !== 0 ? (
          options.map((item, index) => (
            <li
              className={`cursor-pointer rounded`}
              key={index}
              onMouseDown={() => handleItemClick(item)}
              onMouseEnter={() => setHighlightedIndex(index)}
              onMouseLeave={() => setHighlightedIndex(-1)}
            >
              <div
                className={cn(
                  'flex items-center rounded px-2 py-2 text-sm font-normal text-crews-bk01',
                  highlightedIndex === index ? 'bg-crews-b02' : '',
                )}
              >
                {item.label}
              </div>
            </li>
          ))
        ) : (
          <li className={`rounded`}>
            <div className="flex items-center rounded px-2 py-2 text-sm font-normal text-crews-g06">
              검색 결과가 없습니다.
            </div>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Autocomplete;
