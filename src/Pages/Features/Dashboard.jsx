import { Button } from "../../Components/Atoms/Button";
import 'chart.js/auto';
import { Bar } from "react-chartjs-2";
import { AppHeader } from "../../Components/Organisms/AppHeader";
import { SideBar } from "../../Components/Atoms/SideBar";
import { NavLink } from "react-router";
import { useSelector } from "react-redux";

const barData = {
    labels: ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"],
    datasets: [{
        data: [12000, 2000, 95000, 28000, 42000, 21000, 14000],
        backgroundColor: "oklch(54.6% 0.245 262.881)",
        borderColor: "oklch(54.6% 0.245 262.881)",
        borderWidth: 1,
        borderRadius: 4,
    }]
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

export function Dashboard() {
    const user = useSelector((state) => state.auth.currentUser);

    return (
        <div className="min-h-screen bg-white   ">
            <AppHeader className=" md:bg-white border-b border-gray-400 sticky top-0 z-10" />

            <div className="flex">

                <aside className="hidden md:block w-1/6 shrink-0">
                    <SideBar />
                </aside>

                <main className="flex-1 min-w-0 p-4 md:p-6 space-y-4">

                    <div className="grid sm:grid-cols-2 md:grid-cols-3  gap-3">
                        <div className="bg-white rounded-xl border border-gray-400 p-4 space-y-1">
                            <div className="flex items-center gap-2">
                            <img src="/icons/balance.svg" alt="balance" />
                            <p className="text-md font-medium text-black">Balance</p>
                            </div>
                            <p className="text-base sm:text-lg font-medium">
                                Rp <span>{user?.balance?.toLocaleString("id-ID") ?? 0}</span>
                            </p>
                            <p className="text-xs text-gray-400">0%</p>
                        </div>
                        <div className="bg-white rounded-xl border border-gray-400 p-4 space-y-1">
                            <div className="flex gap-2 items-center">
                            <img src="/icons/income.svg" alt="income" />
                            <p className="text-md text-black ">Income</p>
                            </div>
                            <p className="text-base sm:text-lg font-medium">
                                Rp <span>{user?.income?.toLocaleString("id-ID") ?? 0}</span>
                            </p>
                            <p className="text-xs text-green-700 font-medium">+11,01%</p>
                        </div>
                        <div className="bg-white rounded-xl border border-gray-400 p-4 space-y-1">
                            <div className="flex gap-2 items-center">
                            <img src="/icons/expense.svg" alt="expense" />
                            <p className="text-md text-black">Expense</p>
                            </div>
                            <p className="text-base sm:text-lg font-medium">
                                Rp <span>{user?.expense?.toLocaleString("id-ID") ?? 0}</span>
                            </p>
                            <p className="text-xs text-red-600 font-medium">-5,06%</p>
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

function TransactionList({ user }) {
    return (
        <>
            <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-medium">Transaction History</p>
                <p className="text-sm text-blue-600 cursor-pointer">See All</p>
            </div>

            {!user?.history?.length && (
                <p className="text-gray-400 text-sm text-center py-6">No transaction yet</p>
            )}

            {user?.history?.map((item) => (
                <div key={item.id} className="flex items-center gap-3 py-3 border-b border-gray-100 last:border-0">
                    <img src={user?.photoProfile} alt="user" className="w-9 h-9 rounded-full shrink-0 object-cover" />
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{item.name}</p>
                        <p className="text-xs text-gray-500">{item.type}</p>
                    </div>
                    <p className={`text-sm font-medium shrink-0 ${
                        item.type === "Top Up" || item.type === "Receive"
                            ? "text-green-600"
                            : "text-red-600"
                    }`}>
                        {item.type === "Top Up" || item.type === "Receive" ? "+" : "-"}
                        Rp{item.amount.toLocaleString("id-ID")}
                    </p>
                </div>
            ))}
        </>
    );
}