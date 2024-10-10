/** @jsxImportSource @emotion/react */
import {useTheme} from '@theme/HDesignProvider';

import Flex from '../Flex/Flex';
import ClickOutsideDetector from '../ClickOutsideDetector';

import {selectStyle, optionListStyle, optionStyle} from './Select.style';
import useSelect from './useSelect';
import {SelectProps} from './Select.type';
import SelectInput from './SelectInput';

const Select = <T extends string | number | readonly string[]>({
  labelText,
  placeholder,
  defaultValue,
  options,
  onSelect,
}: SelectProps<T>) => {
  const {theme} = useTheme();
  const {selectRef, isOpen, value, handleSelect, setIsOpen} = useSelect({defaultValue, onSelect});

  return (
    <ClickOutsideDetector targetRef={selectRef} onClickOutside={() => setIsOpen(false)}>
      <fieldset css={selectStyle}>
        <SelectInput
          labelText={labelText}
          placeholder={placeholder ?? ''}
          value={value}
          readOnly
          hasFocus={isOpen}
          setHasFocus={setIsOpen}
        />
        {options.length > 0 && (
          <ul ref={selectRef} css={optionListStyle(theme, isOpen)}>
            <Flex flexDirection="column" gap="0.5rem">
              {options.map((option, index) => (
                <li key={`${option}-${index}`}>
                  <button type="button" css={optionStyle(theme)} onClick={() => handleSelect(option)}>
                    {option}
                  </button>
                </li>
              ))}
            </Flex>
          </ul>
        )}
      </fieldset>
    </ClickOutsideDetector>
  );
};

export default Select;
