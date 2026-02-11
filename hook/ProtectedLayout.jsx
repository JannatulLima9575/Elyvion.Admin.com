"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSidebar } from "@/context/SidebarContext";
export default function ProtectedLayout({ children }) {
  const { user, loading } = useSidebar();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="loader">loading</div>
      </div>
    ); // loader dekhabe cookie check er age
  }

  if (!user) return null; // redirect er age empty render

   return <>{children}</>; // user thakle children render
}
