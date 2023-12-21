import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Stack } from '@mui/material';
import { useDispatch } from 'react-redux';
import styles from './styles.module.scss';

import HeartPng from '../../../assets/heart.png';
import HeartActivePng from '../../../assets/heart_active.png';
import {
  likeIdea,
  updateIdea,
  deleteIdea,
} from '../../../store/ideas/ideaActions';
import useLongPress from '../../../hooks/useLongPress';
import ResponsiveDialog from '../../../components/modal/modal';
import EditPartialEntityForm from '../../../components/Forms/EditPartialEntityForm';

const defaultIconOptions = {
  style: { width: '25px', height: '25px', padding: 2, marginRight: 2 },
};

export default function IdeaItem({ idea }) {
  const { description, likes, creator } = idea;
  const [isEditEntityModalOpen, setIsEditEntityModalOpen] = useState(false);
  const [isExpanded, setIsExpanded] = React.useState(false);

  const dispatch = useDispatch();
  const onLongPress = () => {
    setIsEditEntityModalOpen(true);
  };
  const longPressEvent = () => useLongPress(() => onLongPress());

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
  };
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
        open={isEditEntityModalOpen}
        setOpen={setIsEditEntityModalOpen}
      >
        <EditPartialEntityForm
          entityColumnNameToEdit="description"
          entity={idea}
          callback={() => setIsEditEntityModalOpen(null)}
          updateEntityAction={updateIdea}
          deleteEntityAction={deleteIdea}
        />
      </ResponsiveDialog>
      <Box
        component="img"
        alt={name}
        src={creator.avatarUrl}
        sx={{ width: 20, height: 20, borderRadius: 1.5, flexShrink: 0 }}
      />

      {/* <Box
        sx={{ minWidth: 100, flexGrow: 0, cursor: 'pointer' }}
        {...longPressEvent('iStoreLink')}
      >
        <Typography
          fontSize={14}
          sx={{ color: 'text.primary', flexGrow: 0 }}
          noWrap
        >
          {description}
        </Typography>
      </Box> */}

      <Box
        sx={{ minWidth: 100, flexGrow: 0, width: '100%', cursor: 'pointer' }}
        {...longPressEvent()}
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
          width: '100%',
        }}
      >
        <img
          {...defaultIconOptions}
          src={likes > 0 ? HeartActivePng : HeartPng}
          alt={'heart'}
          onClick={() => dispatch(likeIdea(idea))}
        />
        {likes.length}
      </div>
    </Stack>
  );
}

IdeaItem.propTypes = {
  idea: PropTypes.shape({
    id: PropTypes.number.isRequired,
    likes: PropTypes.array.isRequired,
    description: PropTypes.string.isRequired,
    isApproved: PropTypes.bool.isRequired,
    creator: PropTypes.shape({
      avatarUrl: PropTypes.string.isRequired,
    }).isRequired,
  }),
};
