import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Users from './pages/Users/Users.tsx'
import {QueryClientProvider} from "@tanstack/react-query";
import queryClient from "./config/queryClient.ts";

createRoot(document.getElementById('root')!).render(
    <QueryClientProvider client={queryClient}>
        <StrictMode>
            <Users />
        </StrictMode>
    </QueryClientProvider>
)
