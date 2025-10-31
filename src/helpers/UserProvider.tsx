"use client";
import { useGetProfileQuery, UserType } from '@/redux/features/auth/authApi';
import React, { createContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';

interface UserContextType {
    user: UserType | null;
    setUser: React.Dispatch<React.SetStateAction<UserType | null>>;
    refetch: () => void
}

export const userContext = createContext<UserContextType | undefined>(undefined);
export const UserProvider = ({ children }: { children: React.ReactNode }) => {

    const [user, setUser] = useState<UserType | null>(null);
    const token = Cookies.get("accessToken");
    const { data: userData, isSuccess, refetch } = useGetProfileQuery(null, { skip: !token });

    useEffect(() => {
        if (isSuccess && userData) {
            setUser(userData);
        } else if (!token) {
            setUser(null);
        }
    }, [userData, token, isSuccess, refetch]);

    return (
        <userContext.Provider value={{ user, setUser, refetch }}>
            {children}
        </userContext.Provider>
    );
};

