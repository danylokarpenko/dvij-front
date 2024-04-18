import React from 'react';
import { connect, useDispatch } from 'react-redux';
import { Formik } from 'formik';

import getValidationSchema from './gameFormValidationSchema';
import GameForm from './GameForm';

type GameFormContainerProps = {
  initialValues: {
    id: number | undefined;
    name: string | undefined;
    apiId: string | undefined;
    brandId: number | undefined;
  };
  handleSubmit?: (form: any) => void;
  onFormSubmit?: (form: any) => void;
  onFormClose?: () => void;
  isEdit: boolean;
  loading: boolean;
};

const GameFormContainer = ({
  initialValues,
  handleSubmit,
  onFormSubmit,
  onFormClose,
  isEdit,
  loading,
}: GameFormContainerProps) => {
  const dispatch = useDispatch();
  const onSubmit = (form: any) => {
    handleSubmit && handleSubmit(form);
    onFormSubmit && onFormSubmit(form);
    onFormClose && onFormClose();
  };

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={getValidationSchema()}
      onSubmit={onSubmit}
    >
      {({ errors, touched, values }) => (
        <GameForm
          values={values}
          isEdit={isEdit}
          loading={loading}
          errors={errors}
          touched={touched}
          dispatch={dispatch}
          onClose={onFormClose}
        />
      )}
    </Formik>
  );
};

function mapStateToProps(state: any, { isEdit, desk }: any) {
  const { id, apiId, name, brandId } = desk || {};
  const current = state.GetGame?.current || {};

  const initialValues = {
    id: id || current.id || undefined,
    name: name || current.name || undefined,
    apiId: apiId || current?.apiId || undefined,
    brandId: brandId || current.brandId || undefined,
  };

  return {
    initialValues,
    isEdit,
  };
}

export default connect(mapStateToProps)(GameFormContainer);
