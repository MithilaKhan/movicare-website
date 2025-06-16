"use client";
import { useGetProfileQuery, UserType } from '@/redux/features/auth/authApi';
import React, { createContext, useEffect, useState } from 'react';


interface UserContextType {
    user: UserType | null;
    setUser: React.Dispatch<React.SetStateAction<UserType | null>>;
}

 export const userContext = createContext<UserContextType | undefined>(undefined);
export const UserProvider = ({ children }: { children: React.ReactNode }) => {

    const [user, setUser] = useState<UserType | null>(null);
    const { data: userData, isSuccess } = useGetProfileQuery(null);  

    useEffect(() => {
        if (isSuccess && userData) {
            setUser(userData);
        }
    }, [userData, isSuccess]);

    return (
        <userContext.Provider value={{ user, setUser }}>
            {children}
        </userContext.Provider>
    );
};

