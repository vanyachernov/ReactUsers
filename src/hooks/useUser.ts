import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import axios from 'axios';
import {User} from "../models/User.ts";

const API_URL = 'https://jsonplaceholder.typicode.com';

const fetchUsers = async () => {
    const response = await axios.get(`${API_URL}/users`);
    
    return response.data;
};

export const useUsers = () => {
    return useQuery({
        queryKey: ['users'],
        queryFn: fetchUsers,
    });
};

export const useAddUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newUser: Omit<User, 'id'>) => axios.post(API_URL, newUser),
        onSuccess: () => queryClient.invalidateQueries(['users']),
    });
};

export const useEditUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (user: User) => axios.put(`${API_URL}/${user.id}`, user),
        onSuccess: () => queryClient.invalidateQueries(['users']),
    });
};

export const useDeleteUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: number) => axios.delete(`${API_URL}/${id}`),
        onSuccess: () => queryClient.invalidateQueries(['users']),
    });
};