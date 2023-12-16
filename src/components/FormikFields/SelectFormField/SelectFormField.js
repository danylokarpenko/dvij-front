import React from 'react';
import Select, { StylesConfig } from 'react-select';
import PropTypes from 'prop-types';
import chroma from 'chroma-js';
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
  // const colourStyles = {
  //   control: (styles) => ({ ...styles, backgroundColor: 'white' }),
  //   option: (styles, { data, isDisabled, isFocused, isSelected }) => {
  //     let color;
  //     if (data.color) {
  //       // color = chroma(data.color);
  //     } else {
  //       // Handle the case where data.color is undefined or null
  //       color = chroma('defaultColor'); // Replace 'defaultColor' with a fallback color
  //     }
  //     return {
  //       ...styles,
  //       backgroundColor: isDisabled
  //         ? undefined
  //         : isSelected
  //           ? data.color
  //           : isFocused
  //             ? color.alpha(0.1).css()
  //             : undefined,
  //       color: isDisabled
  //         ? '#ccc'
  //         : isSelected
  //           ? chroma.contrast(color, 'white') > 2
  //             ? 'white'
  //             : 'black'
  //           : data.color,
  //       cursor: isDisabled ? 'not-allowed' : 'default',

  //       ':active': {
  //         ...styles[':active'],
  //         backgroundColor: !isDisabled
  //           ? isSelected
  //             ? data.color
  //             : color.alpha(0.3).css()
  //           : undefined,
  //       },
  //     };
  //   },
  //   multiValue: (styles, { data }) => {
  //     let color;
  //     if (data.color) {
  //       // color = chroma(data.color);
  //     } else {
  //       // Handle the case where data.color is undefined or null
  //       color = chroma('defaultColor'); // Replace 'defaultColor' with a fallback color
  //     }
  //     return {
  //       ...styles,
  //       backgroundColor: color.alpha(0.1).css(),
  //     };
  //   },
  //   multiValueLabel: (styles, { data }) => ({
  //     ...styles,
  //     color: data.color,
  //   }),
  //   multiValueRemove: (styles, { data }) => ({
  //     ...styles,
  //     color: data.color,
  //     ':hover': {
  //       backgroundColor: data.color,
  //       color: 'white',
  //     },
  //   }),
  // };
  return (
    <Select
      cx={{
        className: () => ({ backgroundColor: 'black' }),
      }}
      styles={{
        // ...colourStyles,
        menuPortal: (base) => ({
          ...base,
          zIndex: 9999,
          background: 'black',
          backgroundColor: 'black',
          color: 'white',
        }),
      }}
      autoComplete="off"
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
