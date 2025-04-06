import React from 'react';
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    Button, TextField, MenuItem, Checkbox, FormControlLabel
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
    name: z.string().min(1).max(100),
    email: z.string().email(),
    phone: z.string().min(5),
    birthDate: z.string().optional(),
    role: z.enum(['Адміністратор', 'Користувач']),
    position: z.string().max(255).optional(),
    isActive: z.boolean()
});

type UserFormData = z.infer<typeof schema>;

interface Props {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: UserFormData) => void;
    defaultValues?: UserFormData;
}

const UserFormDialog: React.FC<Props> = (
    { 
        open, 
        onClose, 
        onSubmit, 
        defaultValues 
    }) => {
    
    const { register, handleSubmit, reset, formState: { errors } } = useForm<UserFormData>({
        resolver: zodResolver(schema),
        defaultValues
    });

    React.useEffect(() => {
        reset(defaultValues);
    }, [defaultValues, reset]);

    return (
        <Dialog open={open} onClose={onClose} fullWidth>
            <DialogTitle>{defaultValues ? 'Редагувати користувача' : 'Додати користувача'}</DialogTitle>
            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogContent>
                    <TextField 
                        label="ПІБ" 
                        fullWidth 
                        margin="normal" 
                        {...register('name')} 
                        error={!!errors.name} 
                        helperText={errors.name?.message} />
                    <TextField 
                        label="Email" 
                        fullWidth 
                        margin="normal" 
                        {...register('email')} 
                        error={!!errors.email} 
                        helperText={errors.email?.message} />
                    <TextField 
                        label="Телефон" 
                        fullWidth 
                        margin="normal" 
                        {...register('phone')} 
                        error={!!errors.phone} 
                        helperText={errors.phone?.message} />
                    <TextField 
                        label="Дата народження" 
                        type="date" 
                        fullWidth 
                        margin="normal" 
                        {...register('birthDate')} 
                        InputLabelProps={{ shrink: true }} />
                    <TextField 
                        select 
                        label="Роль" 
                        fullWidth 
                        margin="normal" 
                        {...register('role')} 
                        error={!!errors.role} 
                        helperText={errors.role?.message}>
                        <MenuItem value="Адміністратор">Адміністратор</MenuItem>
                        <MenuItem value="Користувач">Користувач</MenuItem>
                    </TextField>
                    <TextField 
                        label="Посада" 
                        fullWidth 
                        margin="normal" 
                        {...register('position')} />
                    <FormControlLabel 
                        control={
                            <Checkbox {...register('isActive')} defaultChecked />
                        } 
                        label="Активний" />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Скасувати</Button>
                    <Button type="submit" variant="contained">Зберегти</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default UserFormDialog;