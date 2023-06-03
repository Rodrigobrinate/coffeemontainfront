import * as React from 'react';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function AddressModal( props: { open: boolean; }) {
  const { open } = props;
  const rootRef = React.useRef<HTMLDivElement>(null);
  const [open2, setOpen] = React.useState(open);


  return (
    
      <Modal
        disablePortal
        disableEnforceFocus
        disableAutoFocus
        onClose={() => setOpen(false)}
        open={open2}
        aria-labelledby="server-modal-title"
        aria-describedby="server-modal-description"
        sx={{
          display: 'flex',
          p: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        container={() => rootRef.current}
      >
        <Box
          sx={{
            position: 'relative',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: (theme) => theme.shadows[5],
            p: 4,
          }}
        >
          <Typography id="server-modal-title" variant="h6" component="h2">
            Server-side modal
          </Typography>
          <Typography id="server-modal-description" sx={{ pt: 2 }}>
            If you disable JavaScript, you will still see me.
          </Typography>
        </Box>
      </Modal>
  );
}