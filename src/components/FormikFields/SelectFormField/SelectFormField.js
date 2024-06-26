import React from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';

import './index.css';

const getOptionValue = (option) => (option ? option.value : null);
const getMultiOptionValues = (options) => (options ? options : null);

const handleChange =
  (form, field, isMulti, customSetFieldValue) => (option) => {
    const fieldValue = isMulti
      ? getMultiOptionValues(option)
      : getOptionValue(option);
    form.setFieldValue(field.name, fieldValue);
    customSetFieldValue && customSetFieldValue(option);
  };

const SelectFormField = ({
  id,
  placeholder,
  field,
  form,
  options = [],
  isMulti = false,
  isLoading = false,
  onInputChange,
  isClearable = false,
  disabled = false,
  onBlur,
  filterOption,
  maxMenuHeight,
  selectedOption,
  defaultOption,
  customSetFieldValue,
}) => {
  const getValue = () => {
    if (options && options.length) {
      return isMulti && field.value
        ? field.value.map((v) => ({
            value: v.id || v.value,
            label: v.name || v.username || v.label,
          }))
        : options.find((o) => o.value === field.value) || '';
    } else {
      return isMulti ? [] : '';
    }
  };
  return (
    <Select
      cx={{
        className: () => ({ backgroundColor: 'black' }),
      }}
      styles={{
        menuPortal: (base) => ({
          ...base,
          zIndex: 9999,
          background: 'black',
          backgroundColor: 'black',
          color: 'black',
        }),
      }}
      autoComplete="nope" // or any random string
      inputId={id}
      name={field.name}
      value={selectedOption || getValue() || defaultOption}
      onChange={handleChange(form, field, isMulti, customSetFieldValue)}
      onBlur={onBlur}
      placeholder={placeholder}
      options={options}
      isMulti={isMulti}
      isLoading={isLoading}
      onInputChange={onInputChange}
      isClearable={isClearable}
      isDisabled={disabled}
      maxMenuHeight={maxMenuHeight}
      {...(filterOption ?? { filterOption })}
      menuPortalTarget={document.body}
    />
  );
};

SelectFormField.propTypes = {
  id: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
  options: PropTypes.array,
  isMulti: PropTypes.bool,
  isLoading: PropTypes.bool,
  onInputChange: PropTypes.func,
  isClearable: PropTypes.bool,
  disabled: PropTypes.bool,
  onBlur: PropTypes.func,
  filterOption: PropTypes.func,
  maxMenuHeight: PropTypes.number,
  selectedOption: PropTypes.object,
  defaultOption: PropTypes.object,
  customSetFieldValue: PropTypes.func,
};

export default SelectFormField;
