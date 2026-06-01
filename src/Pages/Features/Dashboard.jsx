import { Button } from "../../Components/Atoms/Button";
import 'chart.js/auto';
import { Bar } from "react-chartjs-2";
import { AppHeader } from "../../Components/Organisms/AppHeader";
import { SideBar } from "../../Components/Atoms/SideBar";
import { NavLink } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { useEffect, useState } from "react";
import { getBalance } from "../../Redux/thunks/balance";
import { getHistory } from "../../Redux/thunks/history";
import { getChart } from "../../Redux/thunks/graph";

export function Dashboard() {
    const {dataChart, chartLoading, chartError} = useSelector((state) => state.users)
    const dispatch = useDispatch();
    const {dataBalance, loading, error} = useSelector((state) => state.users)
    
    useEffect(()=>{
        dispatch(getBalance())
        dispatch(getHistory())
        dispatch(getChart())
    },[dispatch])

    console.log(dataChart)
    
    const user = dataBalance?.data
    
    if (loading) return <p>Loading...</p>
    if (error) return <p>Error: {error}</p>
const DAYS_NAME = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const dynamicLabels = dataChart.map(item => {
    const date = new Date(item.Period);
    return DAYS_NAME[date.getDay()]; 
});

const dynamicIncomeData = dataChart.map(item => item.Income || 0);
const dynamicExpenseData = dataChart.map(item => item.Expense || 0);

const barData = {
    labels: dynamicLabels.length > 0 ? dynamicLabels : ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"], // fallback jika data belum masuk
    datasets: [
        {
        label : "income",
        data: dynamicIncomeData.length > 0 ? dynamicIncomeData : [0, 0, 0, 0, 0, 0, 0],
        backgroundColor: "oklch(54.6% 0.245 262.881)",
        borderColor: "oklch(54.6% 0.245 262.881)",
        borderWidth: 1,
        borderRadius: 4,
    },
    {
    label : "expense",
        data: dynamicExpenseData.length > 0 ? dynamicExpenseData : [0, 0, 0, 0, 0, 0, 0],
        backgroundColor: "oklch(58.32% 0.229 27.53)",
        borderColor: "oklch(58.32% 0.229 27.53)",
        borderWidth: 1,
        borderRadius: 4,
    }
]
};

const barOptions = {
    scales: {
        x: { display: true, grid: { display: false } },
        y: {
            beginAtZero: true,
            min: 0,
            max: 100000,
            ticks: { stepSize: 25000, autoSkip: false }
        }
    },
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
};

    return (
        <div className="min-h-screen bg-white   ">
            <AppHeader className=" md:bg-white border-b border-gray-400 sticky top-0 z-10" />

            <div className="flex">

                <aside className="hidden md:block w-1/6 shrink-0">
                    <SideBar />
                </aside>

                <main className="flex-1 min-w-0 p-4 md:p-6 space-y-4">

                    <div className="grid sm:grid-cols-2 md:grid-cols-3  gap-3">
                        <div className="bg-white sm:col-span-2 md:col-span-1 rounded-xl border border-gray-400 p-4 space-y-1">
                            <div className="flex items-center gap-2">
                                <img src="/icons/balance.svg" alt="balance" />
                                <p className="text-md font-medium text-black">Balance</p>
                            </div>
                            <p className="text-base sm:text-lg font-medium">
                                Rp <span>{user?.balance?.toLocaleString("id-ID") ?? 0}</span>
                            </p>
                            {/* <p className="text-xs text-gray-400">0%</p> */}
                        </div>
                        <div className="bg-white md:col-span-1 rounded-xl border border-gray-400 p-4 space-y-1">
                            <div className="flex gap-2 items-center">
                                <img src="/icons/income.svg" alt="income" />
                                <p className="text-md text-black ">Income</p>
                            </div>
                            <p className="text-base sm:text-lg font-medium">
                                Rp <span>{user?.income?.toLocaleString("id-ID") ?? 0}</span>
                            </p>
                            {/* <p className="text-xs text-green-700 font-medium">+11,01%</p> */}
                        </div>
                        <div className="bg-white rounded-xl md:col-span-1 border border-gray-400 p-4 space-y-1">
                            <div className="flex gap-2 items-center">
                                <img src="/icons/expense.svg" alt="expense" />
                                <p className="text-md text-black">Expense</p>
                            </div>
                            <p className="text-base sm:text-lg font-medium">
                                Rp <span>{user?.expense?.toLocaleString("id-ID") ?? 0}</span>
                            </p>
                            {/* <p className="text-xs text-red-600 font-medium">-5,06%</p> */}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:border md:border-gray-400 md:p-4 md:rounded-xl md:grid-cols-3 md:items-center gap-3">

                        <p className="hidden sm:hidden md:block font-semibold">Fast Service</p>
                        <Button color="blue">
                            <NavLink className="flex items-center justify-center gap-2" to="/topup">
                                <img src="/icons/u_money-insert.svg" alt="" className="w-4 h-4" />
                                Top Up
                            </NavLink>
                        </Button>
                        <Button color="blue">
                            <NavLink className="flex items-center justify-center gap-2" to="/transfer">
                                <img src="/icons/whiteSend.svg" alt="" className="w-4 h-4" />
                                Transfer
                            </NavLink>
                        </Button>
                    </div>

                    <div className="bg-white rounded-xl border border-gray-400 p-4">
                        <div className="flex items-center justify-between mb-4">
                            <p className="text-sm font-medium">Income Chart</p>
                            <div className="flex gap-2">
                                <select className="text-xs bg-gray-100 rounded-md px-3 py-2 border-none outline-none">
                                    <option>Income</option>
                                    <option>Expense</option>
                                </select>
                                <select className="text-xs bg-gray-100 rounded-md px-3 py-2 border-none outline-none">
                                    <option>7 Days</option>
                                    <option>30 Days</option>
                                </select>
                            </div>
                        </div>
                        <div className="h-56 sm:h-72 md:h-100">
                            <Bar data={barData} options={barOptions} />
                        </div>
                    </div>

                    <div className="md:hidden bg-white rounded-xl border border-gray-400 p-4">
                        <TransactionList user={user} />
                    </div>
                </main>


                <div className="hidden md:block w-2/8 shrink-0 border-l border-gray-400 bg-white p-4">
                    <TransactionList user={user} />
                </div>

            </div>
        </div>
    );
}

function TransactionList() {
    const API_URL = import.meta.env.VITE_API_URL;
    const {dataHistory, isLoading, isError} = useSelector((state) => state.users)
    const history = dataHistory
    const defaultAvatar = "/public/icons/userone.svg"
    return (
        <>
            <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-medium text-gray-800">Transaction History</p>
                <p className="text-sm text-blue-600 cursor-pointer hover:underline">See All</p>
            </div>

            {history.length === 0 && (
                <p className="text-gray-400 text-sm text-center py-6">No transaction yet</p>
            )}

            <div className="flex flex-col gap-1">
                {history.map((item) => {
                    const isTopUp = item.type === "TOPUP";
                    const photoPath = isTopUp ? item.receiver_photo : item.receiver_photo;
                    const imageSrc = photoPath ? `${API_URL}/${photoPath}` : defaultAvatar;

                    const displayName = isTopUp 
                        ? (item.receiver_name || item.payment_method_name || "Top Up Saldo") 
                        : (item.receiver_name || "Transfer");

                    return (
                        <div 
                            key={item.transaction_id} 
                            className="flex items-center gap-3 py-3 border-b border-gray-100 last:border-0"
                        >
                            <img 
                                alt={displayName} 
                                src={imageSrc} 
                                className="w-9 h-9 rounded-full object-cover bg-gray-100"
                                onError={(e) => { e.target.src = defaultAvatar; }} 
                            />

                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate">
                                    {displayName}
                                </p>
                                <p className="text-xs text-gray-500 truncate">
                                    {item.type} • {item.payment_method_name || "E-Wallet"}
                                </p>
                            </div>

                            <p className={`text-sm font-semibold shrink-0 ${isTopUp ? "text-green-600" : "text-red-600"}`}>
                                {isTopUp ? "+" : "-"} Rp{item.amount.toLocaleString("id-ID")}
                            </p>
                        </div>
                    );
                })}
            </div>
        </>
    );
}
