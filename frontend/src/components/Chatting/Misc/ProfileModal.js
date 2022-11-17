import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { register, reset } from '../../../features/auth/authSlice';

import React from 'react'

const ProfileModal = ({children}) => {

    const { user } = useSelector((state) => state.auth)

  return (
    <div>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>{user.firstName} {user.lastName}</Modal.Title>
            </Modal.Header>
            <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
                Save Changes
            </Button>
            </Modal.Footer>
      </Modal>
    </div>
  )
}

export default ProfileModal