import React from 'react';
import { ErrorMessage, Field } from 'formik';
import PropTypes from 'prop-types';

import { TextField } from 'formik-material-ui';

const FormField = ({
  component,
  name,
  label,
  type,

  ...restProps
}: any) => (
  <div key={name}>
    {type !== 'text' && <label>{label}</label>}
    <Field
      id={name}
      key={name}
      name={name}
      label={label}
      {...(component && { component })}
      {...(type && { type })}
      {...(!component && type === 'text' && { component: TextField })}
      {...restProps}
    />
    <ErrorMessage name={name} />
  </div>
);

FormField.propTypes = {
  component: PropTypes.any,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  customClassName: PropTypes.string,
};

export default FormField;
