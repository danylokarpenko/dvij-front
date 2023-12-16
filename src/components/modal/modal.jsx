import * as React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

export default function ResponsiveDialog({ open, setOpen, title, children }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        {title && (
          <DialogTitle id="responsive-dialog-title">{title}</DialogTitle>
        )}
        <DialogContent>
          <DialogContentText>{children}</DialogContentText>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}

ResponsiveDialog.propTypes = {
  open: PropTypes.bool,

  setOpen: PropTypes.func,
  title: PropTypes.string,
  children: PropTypes.node,
};