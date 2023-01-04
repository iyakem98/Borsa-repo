import React from 'react'
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { collectFeedback } from '../../features/feedback/feedbackSlice';
import { getSender, getSenderFull } from '../Chatting/ChatConfig/ChatLogics';
import { ChatState } from '../../context/chatProvider'

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

const divstyle = {
  padding: 50
}


// useEffect(() => {
//   if (isError) {
//     toast.error(message)
//   }

//   if (isSuccess || user) {
//     navigate('/')
//   }

//   dispatch(reset())
// }, [user, isError, isSuccess, message, navigate, dispatch])




const FeedbackModal = (props) => {

    const { user } = useSelector((state) => state.auth) // GOOD
    const { selectedChat, setSelectedChat, chats, setChats } = ChatState(); //NOT GOOD FOR NOW, FIX
    const { user_id, traveler_id, init_rating, init_comment, isError_r, isSuccess_r, isLoading_r, message_r } = useSelector(
      (state) => state.feed
    );
    const dispatch = useDispatch();
    const [modalVisibility, setModalVisibility] = React.useState(false);
    const [rating, setRating] = React.useState(init_rating);
    const [comment, setComment] = React.useState(init_comment);
    const handleOpen = () => setModalVisibility(true);
    const handleClose = () => setModalVisibility(false);

    const onSubmit = (e) => {
      e.preventDefault()
      handleClose();

      //const user_id = user.user_id;
    
      const feedbackData = {
        user,
        user, 
        rating,
        comment

      };
      
      //const feedbackData = user;
      dispatch(collectFeedback(feedbackData))
    
    }
    
  return (
    <div style={divstyle}>
        
        <Button onClick={handleOpen}> Rate the following person </Button>
        <Modal
        open={modalVisibility}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
            <Box sx={style}>

                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                How would you rate {props.traveler} ?
                </Typography>
                <Rating name="simple-controlled" value={rating}  
                onChange={(event, newValue) => {
                  setRating(newValue);
                }}
                />
                <TextField
                  id="outlined-multiline-static"
                  label="Additional Comments"
                  multiline
                  rows={4}
                  value= {comment}
                  onChange={(event, newValue) => {
                    setComment(newValue);
                  }}
                />
                <Button  type ='submit'  onClick = {onSubmit}>Send</Button>
            </Box>
    </Modal>
    </div>
  )
}

export default FeedbackModal