import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as MainTaskSvg } from '../../../assets/mainTask.svg';
import useLongPress from '../../../hooks/useLongPress';
import ResponsiveDialog from '../../../components/modal/modal';
import EditGamePartialForm from '../../../components/Forms/EditGamePartialForm';

export default function MainTask({ game }) {
  const { mainTask } = game;
  const [isMainTaskFormModalOpen, setIsMainTaskFormModalOpen] = useState(null);

  const onLongPress = () => {
    setIsMainTaskFormModalOpen(true);
  };

  const longPressEvent = (gameColumnNameToEdit) =>
    useLongPress(() => onLongPress(gameColumnNameToEdit));

  return (
    <div>
      <ResponsiveDialog
        open={isMainTaskFormModalOpen}
        setOpen={setIsMainTaskFormModalOpen}
      >
        <EditGamePartialForm
          gameColumnNameToEdit={'mainTask'}
          game={game}
          callback={() => setIsMainTaskFormModalOpen(null)}
        />
      </ResponsiveDialog>
      <div
        style={{ display: 'flex', alignContent: 'center', padding: 5 }}
        {...longPressEvent('mainTask')}
      >
        {mainTask} <MainTaskSvg height={20} />
      </div>
    </div>
  );
}

MainTask.propTypes = {
  game: PropTypes.shape({
    id: PropTypes.number.isRequired,
    mainTask: PropTypes.string.isRequired,
  }),
};
