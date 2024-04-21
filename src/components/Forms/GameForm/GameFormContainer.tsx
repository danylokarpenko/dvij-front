import React from 'react';
import { connect, useDispatch } from 'react-redux';
import { Formik } from 'formik';

import getValidationSchema from './gameFormValidationSchema';
import GameForm from './GameForm';

type GameFormContainerProps = {
  initialValues: any;
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
      {({ setFieldValue }) => (
        <GameForm
          setFieldValue={setFieldValue}
          isEdit={isEdit}
          loading={loading}
          dispatch={dispatch}
          onClose={onFormClose}
        />
      )}
    </Formik>
  );
};

function mapStateToProps(state: any, { isEdit, desk }: any) {
  const current = state.GetGame?.current || {};

  const initialValues = {
    id: current.id || undefined,
    name: current.name || undefined,
    videoUrl: current.videoUrl || undefined,
    iconUrl: current.iconUrl || undefined,
    publisherName: current.publisherName || undefined,
    publisherUrl: current.publisherUrl || undefined,
    mainIdea: current.mainIdea || undefined,
    mainTask: current.mainTask || undefined,
    iStoreLink: current.iStoreLink || undefined,
    googleStoreLink: current.googleStoreLink || undefined,
    gitLink: current.gitLink || undefined,
    googleDriveLink: current.googleDriveLink || undefined,
    trelloLink: current.trelloLink || undefined,
    releaseDate: current.releaseDate || undefined,
    lastPatchDate: current.lastPatchDate || undefined,
    cpi: current.cpi || undefined,
    pt: current.pt || undefined,
    d1: current.d1 || undefined,
    d7: current.d7 || undefined,
    targetCpi: current.targetCpi || undefined,
    targetPt: current.targetPt || undefined,
    targetRetD1: current.targetRetD1 || undefined,
    targetRetD7: current.targetRetD7 || undefined,
    dau: current.dau || undefined,
    installs: current.installs || undefined,
    malesGenderPercentage: current.malesGenderPercentage || undefined,
    minAge: current.minAge || undefined,
    maxAge: current.maxAge || undefined,
    ropTypes: current.ropTypes || undefined,
  };

  return {
    initialValues,
    isEdit,
  };
}

export default connect(mapStateToProps)(GameFormContainer);
