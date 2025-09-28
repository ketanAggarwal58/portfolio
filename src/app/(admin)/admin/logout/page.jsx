"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Logout() {
  const router = useRouter();
  useEffect(() => {
    fetch("/api/admin/logout", { method: "POST" }).finally(() => {
      router.replace("/admin/login");
    });
  }, [router]);
  return null;
}
