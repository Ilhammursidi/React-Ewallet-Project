import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router";
import { toast } from "react-hot-toast";
import { verifyResetToken } from "../../Redux/thunks/forgotPassword"; 
import { Button } from "../../Components/Atoms/Button";

export function VerifyToken() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [status, setStatus] = useState("loading"); 

    const token = searchParams.get("token");

    useEffect(() => {
        if (!token) {
            toast.error("Token tidak ditemukan dalam tautan!");
            setStatus("error");
            return;
        }

        const autoVerify = async () => {
            const result = await dispatch(verifyResetToken(token));
            if (verifyResetToken.fulfilled.match(result)) {
                toast.success("Verifikasi berhasil! Mengalihkan...");
                navigate("/auth/reset-password", { state: { token }, replace: true });
            } else {
                toast.error(result.payload || "Tautan sudah kedaluwarsa atau tidak valid.");
                setStatus("error");
            }
        };
        autoVerify();
    }, [token, dispatch, navigate]);

    return (
        <section className="min-h-screen flex items-center justify-center bg-blue-500 p-4">
            <div className="bg-white rounded-xl p-6 w-full max-w-sm shadow-lg text-center">
                {status === "loading" ? (
                    <div>
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500 mx-auto mb-4"></div>
                        <p className="text-gray-700 font-medium">Memverifikasi tautan keamanan...</p>
                        <p className="text-gray-400 text-xs mt-1">Mohon tunggu sebentar, Anda akan segera dialihkan.</p>
                    </div>
                ) : (
                    <div>
                        <p className="text-red-500 font-medium mb-3">Tautan Tidak Valid</p>
                        <p className="text-gray-600 text-sm mb-5">Tautan ini sudah digunakan atau telah melewati batas waktu 15 menit.</p>
                        <Button color="blue" className="w-full" onClick={() => navigate("/auth/forgot-password")}>
                            Minta Tautan Baru
                        </Button>
                    </div>
                )}
            </div>
        </section>
    );
}
