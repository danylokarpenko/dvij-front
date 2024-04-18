import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { TextField } from 'formik-material-ui';
import { Field, Form, Formik } from 'formik';
import { Box, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { fetchIteration } from '../../store/iteration/iterationActions';
import { createGame } from '../../store/game/gameActions';
import GameForm from './GameForm';

const columns = [
  { name: 'name', type: 'string' },
  { name: 'videoUrl', type: 'string' },
  { name: 'iconUrl', type: 'string' },
  { name: 'publisherName', type: 'string' },
  { name: 'publisherUrl', type: 'string' },
  { name: 'mainIdea', type: 'string' },
  { name: 'mainTask', type: 'string' },
  { name: 'iStoreLink', type: 'string' },
  { name: 'googleStoreLink', type: 'string' },
  { name: 'gitLink', type: 'string' },
  { name: 'googleDriveLink', type: 'string' },
  { name: 'trelloLink', type: 'string' },

  { name: 'releaseDate', type: 'date' },
  { name: 'lastPatchDate', type: 'date' },

  { name: 'cpi', type: 'number' },
  { name: 'pt', type: 'number' },
  { name: 'd1', type: 'number' },
  { name: 'd7', type: 'number' },
  { name: 'targetCpi', type: 'number' },
  { name: 'targetPt', type: 'number' },
  { name: 'targetRetD1', type: 'number' },
  { name: 'targetRetD7', type: 'number' },
  { name: 'dau', type: 'number' },
  { name: 'installs', type: 'number' },
  { name: 'malesGenderPercentage', type: 'number' },
  { name: 'minAge', type: 'number' },
  { name: 'maxAge', type: 'number' },
];

const renderColumn = (c) => (
  <Field
    component={TextField}
    name={c.name}
    type={c.type || c.name}
    label={c.name}
  />
);

export default function CreateGameForm({ item, callback }) {
  const dispatch = useDispatch();
  useEffect(() => {
    if (item?.id) dispatch(fetchIteration(item.id));
  }, [dispatch]);

  const handleSubmit = (form) => {
    event.preventDefault();

    const payload = {
      ...form,
    };

    dispatch(createGame({ payload, callback }));
  };

  return <GameForm handleSubmit={handleSubmit} loading={false} />;
}

CreateGameForm.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string.isRequired,
    videoUrl: PropTypes.string,
    iconUrl: PropTypes.string,
    publisherName: PropTypes.string,
    mainIdea: PropTypes.string,
    mainTask: PropTypes.string,
    iStoreLink: PropTypes.string,
    googleStoreLink: PropTypes.string,
    gitLink: PropTypes.string,
    googleDriveLink: PropTypes.string,
    trelloLink: PropTypes.string,

    releaseDate: PropTypes.Date,
    lastPatchDate: PropTypes.Date,

    cpi: PropTypes.number,
    pt: PropTypes.number,
    d1: PropTypes.number,
    d7: PropTypes.number,
    targetCpi: PropTypes.number,
    targetPt: PropTypes.number,
    targetRetD1: PropTypes.number,
    targetRetD7: PropTypes.number,
    dau: PropTypes.number,
    installs: PropTypes.number,
    malesGenderPercentage: PropTypes.number,
    minAge: PropTypes.number,
    maxAge: PropTypes.number,
  }),
  callback: PropTypes.func,
};
