import React from "react";
import {Box, Modal, Typography} from "@mui/material";

interface NotificationProps {
    title: string,
    msg: string,
    wordOfDay?: string;
    open: boolean,
    handleClose: () => void,
    children?: React.ReactNode;
}

const boxStyle = {
    bgcolor: '#1E293B',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const Notification: React.FC<NotificationProps> = ({title, msg, open, handleClose, children, wordOfDay}) => {
    return (
        <Modal
            style={{color: '#A1A1AA'}}
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-notification-title"
            aria-describedby="modal-notification-description"
        >
            <Box sx={boxStyle}>
                <Typography id="modal-notification-title" variant="h6" component="h2">
                    <p className={"font-bold"}>{title}</p>
                </Typography>
                <Typography id="modal-notification-description" sx={{ mt: 2 }}>
                    <p className={"font-bold"}>{msg}</p>
                </Typography>
                <Typography id="modal-notification-description" sx={{ mt: 2 }}>
                    <p className={"font-bold"}>{wordOfDay}</p>
                </Typography>
                <br></br>
                {children}
            </Box>
        </Modal>
    );
};

export default Notification;
