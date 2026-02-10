'use client';
import { createContext, useContext, useEffect, useState } from "react";
import localforage from "localforage";
import axiosInstance, {setUserInterceptor} from '@/utils/axios';

import toast from "react-hot-toast";
import axios from "axios";
const SidebarContext = createContext();


const getUser = async () => {
  const data = await localforage.getItem("user");
  if (!data) return null;
  if (Date.now() > data.expiryTime) {
    // Expired হলে মুছে ফেলবে
    await localforage.removeItem("user");
    return null;
  }

  return data;
};

const addUser = async (user) => {
   if(!user || !user.uid) return null;
    // expire time (7 days = 7*24*60*60*1000 ms)
   user.expiryTime = Date.now() + (7 * 24 * 60 * 60 * 1000);
  const res= await localforage.setItem('user', user);
  return res;
};


const removeUser = async () => {
  await localforage.removeItem('user');
};



export function SidebarProvider({ children }) {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // loader state

  useEffect(() => {
      (async () => {
        setLoading(true); // start loading
        const user = await getUser();
        if (user) {
          await setUserInterceptor(user); // axios interceptor update
          setUser(user);   // এখানে object wrap না করে সরাসরি দিচ্ছি
        } else {
          await setUserInterceptor(null); // axios interceptor update
          setUser(false);
        }
        setLoading(false); // cookie check complete
      })();
  }, []);

  const login = async (user) => {
    setLoading(true); // start loading
    await setUserInterceptor(user); // axios interceptor update
    const res = await addUser(user);
    if(!res){ setUser(null);setLoading(false); return};
    setUser(user);
    setLoading(false); // cookie check complete
  };

  const logout = async() => {
    setLoading(true); // start loading
    try{
     const res= await axios.post("http://localhost:4000/api/logout")
     console.log(res);
     
      toast.success(res?.response?.data?.message || '')
      await setUserInterceptor(null); // axios interceptor update
      await removeUser();
      setUser(null);
    }catch(err){
      toast.error(err?.response?.data.message || "request failed")
    }finally{
      setLoading(false); // cookie check complete
    }
  };


  return (
    <SidebarContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </SidebarContext.Provider>
  );
}

export const useSidebar = () => useContext(SidebarContext);
