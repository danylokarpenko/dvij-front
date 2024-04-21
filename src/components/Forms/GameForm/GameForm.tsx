import React, { Form, FormikErrors } from 'formik';

import './styles.scss';

import { FormField } from '../../FormikFields/FormField';
import { useState } from 'react';
import { toast } from 'sonner';
import axios from 'axios';

type FormFieldProps = {
  id: string;
  name: string;
  className?: string;
  required?: boolean;
  label?: string;
  type?: string; // Make 'type' property optional
  placeholder?: string; // Make 'placeholder' property optional
  show?: boolean; // Make 'show' property optional
};

const formFields = (): FormFieldProps[] => [
  {
    id: 'iconUrl',
    name: 'iconUrl',
    required: true,
    type: 'text',
    className: 'form-control',
  },
  {
    id: 'name',
    name: 'name',
    required: true,
    type: 'text',
    label: 'Name',
    show: true,
    className: 'form-control',
  },
  {
    id: 'videoUrl',
    name: 'videoUrl',
    required: true,
    type: 'text',
    className: 'form-control',
  },
  {
    id: 'publisherName',
    name: 'publisherName',
    type: 'text',
    className: 'form-control',
  },
  {
    id: 'publisherUrl',
    name: 'publisherUrl',
    type: 'text',
    className: 'form-control',
  },
  {
    id: 'mainIdea',
    name: 'mainIdea',
    type: 'text',
    className: 'form-control',
  },
  {
    id: 'mainTask',
    name: 'mainTask',
    type: 'text',
    className: 'form-control',
  },
  {
    id: 'iStoreLink',
    name: 'iStoreLink',
    type: 'text',
    className: 'form-control',
  },
  {
    id: 'googleStoreLink',
    name: 'googleStoreLink',
    type: 'text',
    className: 'form-control',
  },
  { id: 'gitLink', name: 'gitLink', type: 'text', className: 'form-control' },
  {
    id: 'googleDriveLink',
    name: 'googleDriveLink',
    type: 'text',
    className: 'form-control',
  },
  {
    id: 'trelloLink',
    name: 'trelloLink',
    type: 'text',
    className: 'form-control',
  },

  {
    id: 'releaseDate',
    name: 'releaseDate',
    type: 'date',
    className: 'form-control',
  },
  {
    id: 'lastPatchDate',
    name: 'lastPatchDate',
    type: 'date',
    className: 'form-control',
  },

  { id: 'cpi', name: 'cpi', type: 'number', className: 'form-control' },
  { id: 'pt', name: 'pt', type: 'number', className: 'form-control' },
  { id: 'd1', name: 'd1', type: 'number', className: 'form-control' },
  { id: 'd7', name: 'd7', type: 'number', className: 'form-control' },
  {
    id: 'targetCpi',
    name: 'targetCpi',
    type: 'number',
    className: 'form-control',
  },
  {
    id: 'targetPt',
    name: 'targetPt',
    type: 'number',
    className: 'form-control',
  },
  {
    id: 'targetRetD1',
    name: 'targetRetD1',
    type: 'number',
    className: 'form-control',
  },
  {
    id: 'targetRetD7',
    name: 'targetRetD7',
    type: 'number',
    className: 'form-control',
  },
  { id: 'dau', name: 'dau', type: 'number', className: 'form-control' },
  {
    id: 'installs',
    name: 'installs',
    type: 'number',
    className: 'form-control',
  },
  {
    id: 'malesGenderPercentage',
    name: 'malesGenderPercentage',
    type: 'number',
    className: 'form-control',
  },
  { id: 'minAge', name: 'minAge', type: 'number', className: 'form-control' },
  { id: 'maxAge', name: 'maxAge', type: 'number', className: 'form-control' },
];

const renderFormField = (
  { name, label, ...fieldProps }: FormFieldProps,
  i: number
) => (
  <FormField
    key={name || i}
    name={name}
    label={label || name}
    // component={TextField}
    {...fieldProps}
  />
);

type GameFormProps = {
  dispatch?: any;
  touched?: any;
  errors?: any;
  values?: any;
  isEdit: boolean;
  loading: boolean;
  onClose?: () => void;
  setFieldValue?: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => Promise<void | FormikErrors<any>>;
};

const GameForm = ({
  isEdit,
  loading,
  onClose,
  setFieldValue,
}: GameFormProps) => {
  const [image, setImage] = useState({ preview: '', data: '' });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', image.data);
    const response = await axios('http://localhost:3030/api/v1/upload-file', {
      method: 'POST',
      data: formData,
    }).catch((error) => {
      toast.error(error.response.data.message.message);
      return error.response;
    });
    const iconUrl = response.data;
    if (iconUrl) {
      toast.success('Icon saved!');

      setFieldValue && setFieldValue('iconUrl', iconUrl);
    }
  };

  const handleFileChange = (e: any) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };
    setImage(img);
  };

  return (
    <Form className="game-form" autoComplete="off">
      <div className="App">
        {image.preview && <img src={image.preview} width="100" height="100" />}
        <hr></hr>

        <input type="file" name="file" onChange={handleFileChange}></input>
        <button type="button" onClick={handleSubmit}>
          Submit
        </button>
      </div>
      {formFields().map(renderFormField)}
      <div className="pr-form-buttons">
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {isEdit ? 'Edit' : 'Save'}
        </button>

        <button
          type="button"
          className="btn btn-inverse m-l-1"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </Form>
  );
};

export default GameForm;
