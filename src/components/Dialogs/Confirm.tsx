import {
    Dialog, DialogTitle, DialogContent, DialogActions, Button
} from '@mui/material';

interface ConfirmDialogProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    content: string;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = 
    ({
         open, 
         onClose, 
         onConfirm, 
         title, 
         content
    }) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>{content}</DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Скасувати</Button>
                <Button onClick={onConfirm} color="error">Видалити</Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmDialog;
