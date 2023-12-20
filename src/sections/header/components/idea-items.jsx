import React from 'react';
import PropTypes from 'prop-types';
import { Button, Stack } from '@mui/material';
import { useSelector } from 'react-redux';
import SportsKabaddiIcon from '@mui/icons-material/SportsKabaddi';

import Scrollbar from '../../../components/scrollbar';
import { selectIdeas } from '../../../store/ideas/ideaSelectors';
import IdeaItem from './idea-item';

export default function IdeaItems({ setIdeaFormModalOpen }) {
  const ideas = useSelector(selectIdeas);

  return (
    <>
      <Scrollbar>
        <Stack spacing={1} sx={{ p: 0, pr: 0 }}>
          {ideas.map((idea) => (
            <IdeaItem key={idea.id} idea={idea} />
          ))}
        </Stack>
      </Scrollbar>
      <Button
        onClick={() => {
          setIdeaFormModalOpen(true);
        }}
      >
        <SportsKabaddiIcon />
      </Button>
    </>
  );
}

IdeaItems.propTypes = {
  setIdeaFormModalOpen: PropTypes.func.isRequired,
};
