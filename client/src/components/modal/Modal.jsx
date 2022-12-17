import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useSelector, useDispatch } from 'react-redux';
import modalSlice from '../../store/slice/modalSlice';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

const ModalCustom = () => {
    const {isOpen, modalContent} =  useSelector(state => state.modal);
    const dispatch = useDispatch();
    const handleClose = () => {
        dispatch(modalSlice.actions.toggleModal())
    }
  return (
    <Modal
    open={isOpen}
    onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <Box sx={style}>
      {modalContent}
    </Box>
  </Modal>
  )
}

export default ModalCustom
