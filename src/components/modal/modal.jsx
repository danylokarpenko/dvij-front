import * as React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { Typography } from '@mui/material';

export default function ResponsiveDialog({
  open,
  setOpen,
  title,
  children,
  isFullScreen,
}) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
  const [canClose, setCanClose] = React.useState(false);

  React.useEffect(() => {
    if (open) {
      setCanClose(false); // Disable closing when dialog opens
      const timer = setTimeout(() => {
        setCanClose(true); // Enable closing after 1 second
      }, 600);

      return () => clearTimeout(timer);
    }
  }, [open]);

  const handleClose = () => {
    if (canClose) {
      setOpen(false);
    }
  };

  return (
    <React.Fragment>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        fullWidth={isFullScreen}
        zIndex={99999}
      >
        {title && (
          <DialogTitle id="responsive-dialog-title">
            <Typography variant="h5" align="center">
              {title}
            </Typography>
          </DialogTitle>
        )}
        <DialogContent style={canClose ? {} : { pointerEvents: 'none' }}>
          {children}
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
  isFullScreen: PropTypes.bool,
};
