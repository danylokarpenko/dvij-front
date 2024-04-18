import React, { Form } from 'formik';

import './styles.scss';

import { FormField } from '../../FormikFields/FormField';
type FormFieldProps = {
  id: string;
  name: string;
  label?: string;
  type?: string; // Make 'type' property optional
  placeholder?: string; // Make 'placeholder' property optional
  show?: boolean; // Make 'show' property optional
};

const formFields = (): FormFieldProps[] => [
  { id: 'name', name: 'name', type: 'string', label: 'Name', show: true },
  { id: 'videoUrl', name: 'videoUrl', type: 'string' },
  { id: 'iconUrl', name: 'iconUrl', type: 'string' },
  { id: 'publisherName', name: 'publisherName', type: 'string' },
  { id: 'publisherUrl', name: 'publisherUrl', type: 'string' },
  { id: 'mainIdea', name: 'mainIdea', type: 'string' },
  { id: 'mainTask', name: 'mainTask', type: 'string' },
  { id: 'iStoreLink', name: 'iStoreLink', type: 'string' },
  { id: 'googleStoreLink', name: 'googleStoreLink', type: 'string' },
  { id: 'gitLink', name: 'gitLink', type: 'string' },
  { id: 'googleDriveLink', name: 'googleDriveLink', type: 'string' },
  { id: 'trelloLink', name: 'trelloLink', type: 'string' },

  { id: 'releaseDate', name: 'releaseDate', type: 'date' },
  { id: 'lastPatchDate', name: 'lastPatchDate', type: 'date' },

  { id: 'cpi', name: 'cpi', type: 'number' },
  { id: 'pt', name: 'pt', type: 'number' },
  { id: 'd1', name: 'd1', type: 'number' },
  { id: 'd7', name: 'd7', type: 'number' },
  { id: 'targetCpi', name: 'targetCpi', type: 'number' },
  { id: 'targetPt', name: 'targetPt', type: 'number' },
  { id: 'targetRetD1', name: 'targetRetD1', type: 'number' },
  { id: 'targetRetD7', name: 'targetRetD7', type: 'number' },
  { id: 'dau', name: 'dau', type: 'number' },
  { id: 'installs', name: 'installs', type: 'number' },
  {
    id: 'malesGenderPercentage',
    name: 'malesGenderPercentage',
    type: 'number',
  },
  { id: 'minAge', name: 'minAge', type: 'number' },
  { id: 'maxAge', name: 'maxAge', type: 'number' },
];

const renderFormField = (
  { name, label, ...fieldProps }: FormFieldProps,
  i: number
) => (
  <FormField
    key={name || i}
    name={name}
    label={label || name}
    {...fieldProps}
  />
);

type GameFormProps = {
  dispatch?: any;
  touched?: any;
  errors: any;
  values: any;
  isEdit: boolean;
  loading: boolean;
  onClose?: () => void;
};

const GameForm = ({ isEdit, loading, onClose }: GameFormProps) => {
  return (
    <Form className="game-form" autoComplete="off">
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
