import React from 'react'
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';

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


// const onSubmit = (e) => {
//   e.preventDefault()

//   const feedbackData = {
//     user_email,
      //  traveler_email, 
      //  rating, 
      //  comment
//   }

//   dispatch(collectFeedback(feedbackData))
// }


const FeedbackModal = (props) => {

    const { user, traveler, init_rating, init_comment, isError, isSuccess, isLoading, message } = useSelector(
      (state) => state.feed
    )

    const dispatch = useDispatch()

    const [modalVisibility, setModalVisibility] = React.useState(false);
    const [rating, setRating] = React.useState(init_rating);
    const [comment, setComment] = React.useState(init_comment);
    const handleOpen = () => setModalVisibility(true);
    const handleClose = () => setModalVisibility(false);
    
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
                <Button >Send</Button>
            </Box>
    </Modal>
    </div>
  )
}

export default FeedbackModal