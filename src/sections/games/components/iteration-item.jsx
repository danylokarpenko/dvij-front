import React from 'react';
import PropTypes from 'prop-types';
import { Box, Stack } from '@mui/material';
import { useDispatch } from 'react-redux';

import {
  deleteIteration,
  likeIteration,
  updateIteration,
} from '../../../store/iteration/iterationActions';
import HeartPng from '../../../assets/heart.png';
import HeartActivePng from '../../../assets/heart_active.png';
import styles from './styles.module.scss';
import useLongPress from '../../../hooks/useLongPress';
import ResponsiveDialog from '../../../components/modal/modal';
import EditPartialEntityForm from '../../../components/Forms/EditPartialEntityForm';

const defaultIconOptions = {
  style: { width: '25px', height: '25px', padding: 2, marginRight: 2 },
};

export default function IterationItem({ item: iteration }) {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [isOpenEditEntityModal, setIsOpenEditEntityModal] =
    React.useState(false);
  const userId = Number(localStorage.getItem('userId'));
  const handleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  const { description, likes, creator } = iteration;
  const dispatch = useDispatch();

  const onLongPress = () => {
    setIsOpenEditEntityModal(true);
  };

  const longPressEvent = () => useLongPress(() => onLongPress());

  return (
    <Stack
      paddingTop={1}
      paddingLeft={1}
      paddingRight={1}
      direction="row"
      alignItems="center"
      spacing={1}
    >
      <ResponsiveDialog
        open={isOpenEditEntityModal}
        setOpen={setIsOpenEditEntityModal}
      >
        <EditPartialEntityForm
          entityColumnNameToEdit="description"
          entity={iteration}
          callback={() => setIsOpenEditEntityModal(null)}
          updateEntityAction={updateIteration}
          deleteEntityAction={deleteIteration}
        />
      </ResponsiveDialog>
      <Box
        component="img"
        alt={name}
        src={creator.avatarUrl}
        sx={{ width: 20, height: 20, borderRadius: 1.5, flexShrink: 0 }}
      />

      <Box
        sx={{ minWidth: 100, flexGrow: 0, width: '100%' }}
        {...longPressEvent('description')}
      >
        <div
          id="textbox"
          style={{ cursor: 'pointer' }}
          className={
            isExpanded ? styles.textComponentExpanded : styles.textComponent
          }
          onClick={handleExpand}
        >
          {description}
        </div>
      </Box>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'end',
        }}
      >
        <img
          {...defaultIconOptions}
          src={likes.some((ui) => ui === userId) ? HeartActivePng : HeartPng}
          alt={'heart'}
          onClick={() => dispatch(likeIteration(iteration))}
        />
        {likes.length}
      </div>
    </Stack>
  );
}

IterationItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    likes: PropTypes.array.isRequired,
    description: PropTypes.string.isRequired,
    isApproved: PropTypes.bool.isRequired,
    creator: PropTypes.shape({
      avatarUrl: PropTypes.string.isRequired,
    }).isRequired,
  }),
};
