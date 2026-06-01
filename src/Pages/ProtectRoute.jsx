import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { Outlet, useNavigate } from "react-router";
import toast from "react-hot-toast";

const ProtectedRoute = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("user_token");
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
        if (!token) {
            toast.error("Akses ditolak! Silakan login terlebih dahulu.");
            
            const timeout = setTimeout(() => {
                navigate("/auth/login", { replace: true });
            }, 3000);

            return () => clearTimeout(timeout);
        }

        const isExpired = checkExpiredToken(token);
        if (isExpired) {
            toast.error("Sesi Anda telah berakhir. Silakan login kembali.");
            localStorage.removeItem("user_token"); // Bersihkan token sampah
            
            navigate("/auth/login", { replace: true });
            return;
        }

        setIsChecking(false);

    }, [token, navigate]); 
    if (!token) {
        return (
            <section className="fixed inset-0 flex items-center justify-center bg-gray-100 p-4">
                <div className="text-center">
                    <h1 className="font-bold text-2xl text-red-600 mb-2">🛑 DOKUMEN RAHASIA!</h1>
                    <p className="text-gray-600 text-sm">Anda tidak memiliki akses. Mengalihkan ke halaman login dalam 3 detik...</p>
                </div>
            </section>
        );
    }

    if (isChecking) {
        return null; 
    }

    return <Outlet />;
};

export default ProtectedRoute;

function checkExpiredToken(token) {
    try {
        const decoded = jwtDecode(token);
        const currentTime = Math.floor(Date.now() / 1000); 
        
        console.log("Waktu sekarang (Unix):", currentTime);
        console.log("Token kedaluwarsa pada (Unix):", decoded.exp);

        return currentTime > decoded.exp;
    } catch (error) {
        console.error("Format token rusak atau corrupt");
        return true; 
    }
}
