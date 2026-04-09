import { Button } from "../../Components/Atoms/Button";
import 'chart.js/auto'
import { Bar } from "react-chartjs-2";
import { AppHeader } from "../../Components/Organisms/AppHeader";
import { SideBar } from "../../Components/Atoms/SideBar";


export function Dashboard() {
    
    const BarChart = () => {
    const data = {
        labels: ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"],
        datasets: [{
            data: [12000, 2000, 95000, 28000, 42000, 21000, 14000],
            backgroundColor: "blue-500",
            borderColor: "blue",
            borderWidth: 1
        }]
    };

    const options = {
        scales: {
            x : {
            display : true,
            grid : {
                display : false
            }  
            },
            y: {
                beginAtZero: true,
                min : 0,
                max : 100000,
                ticks : {
                    stepSize : 25000,
                    autoSkip : false
                }
            }
        },
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
        },
    };

        return <Bar data={data} options={options}/>;
    }

    return (
        <section>
            <AppHeader className="md:bg-white"/>
            <section className="md:flex md:justify-between w-full">
            <SideBar></SideBar>

            
            {/* moneyflow */}
            <section className="md:flex md:flex-col ">
            <section className="bg-blue-600 md:bg-white h-25 pt-5">
                <section className="bg-white rounded-2xl h-30 w-90 m-auto md:w-180 md:border-none md:shadow-none sm:w-5/6 shadow ">
                    <section className="flex px-5 flex-row justify-around md:gap-2 md:justify-between items-center h-full">
                        <section className="text-sm flex flex-col gap-1 md:h-33 md:py-2 md:w-full md:gap-5 md:border md:border-gray-300 md:rounded-md md:p-8">
                            <section className="hidden md:flex md:items-center gap-2">
                                <img src="/icons/balance.svg" alt="balance" />
                            <p className="text-xs md:text-base">Balance</p>
                            </section>
                            <p className="md:text-xl md:font-normal">Rp. <b>500.000</b></p>
                            <section>
                                <p className="text-gray-50/55">0%</p>
                                <p></p>
                            </section>
                        </section>
                        <section className="text-sm flex flex-col gap-1 md:h-33 md:py-2 md:gap-5 md:border md:w-full md:border-gray-300 md:rounded-md md:p-8">
                            <section className="hidden md:flex md:items-center gap-2">
                                <img src="/icons/income.svg" alt="income" />
                            <p className="text-xs md:text-base">Income</p>
                            </section>
                            <p className="md:text-xl md:font-normal">Rp. <b>500.000</b></p>
                            <section className="flex gap-1 items-center">
                                <p className="text-green-700 text-xs">+11,01%</p>
                                <img className="w-4" src="/icons/ArrowRise-s.svg" alt="arrow rise" />
                            </section>
                        </section>
                        <section className="text-sm flex flex-col gap-1 md:h-33 md:gap-5 md:py-2 md:border md:w-full md:border-gray-300 md:rounded-md md:p-8">
                            <section className="hidden md:flex md:items-center gap-2">
                                <img src="/icons/expense.svg" alt="expense" />
                            <p className="text-xs md:text-base">Expense</p>
                            </section>
                            <p className="md:text-xl md:font-normal">Rp. <b>500.000</b></p>
                            <section className="flex gap-1 items-center">
                                <p className="text-red-700 text-xs">-5,06%</p>
                                <img className="w-4" src="/icons/Arrowdown.svg" alt="arrow fall" />
                            </section>
                        </section>
                    </section>
                    <img className="md:hidden absolute top-37 rounded-b-2xl w-90 sm:w-5/6 sm:top-27 sm:flex" src="/icons/grayBg.svg" alt="gray background" />
                </section>
            </section>
            

            <section className="flex gap-5 w-full justify-between mt-15 px-5 md:px-5 md:items-center md:border md:border-gray-300 md:rounded-md md:py-5 md:w-170 md:mx-auto">
                <p className="hidden md:flex font-semibold">Fast Service</p>
                <section className="flex flex-row justify-between w-full md:w-60 gap-5 md:flex md:gap-5">
                <Button color="blue" className="w-1/2 flex items-center gap-2 justify-center">
                    <img src="/icons/u_money-insert.svg" alt="top-up" />
                    <p>Top Up</p>
                </Button>
                <Button color="blue" className="w-1/2 flex items-center gap-2 justify-center">
                    <img src="/icons/whiteSend.svg" alt="transfer" />
                    <p>Transfer</p>
                </Button>
                </section>
            </section>
            <section className="chart-container md:border md:border-gray-300 md:px-0 md:w-170 md:mx-auto md:rounded-md md:py-0 md:mt-5">
                <section className="flex items-center justify-between gap-2 px-5 mt-10 md:mt-0 md:py-5">
                    <p className="font-medium text-sm md:text-base md:font-semibold">Income Chart</p>
                    <section className="flex gap-5 md:flex md:gap-2">
                    <select name="" id="" className="bg-gray-200 rounded-md text-sm p-2 px-5">
                        <option value="">Income</option>
                        <option value="">Expense</option>
                    </select>
                    <select name="" id="" className="bg-gray-200 rounded-md text-sm p-2 px-5">
                        <option value="">7 Days</option>
                        <option value="">30 Days</option>
                    </select>
                    </section>
                </section>
                <section className="w-90 h-80 m-auto py-5 md:w-full md:h-120 md:px-5">
                    <BarChart />
                </section>
            </section>
            </section>

            <section className="transaction px-5 md:border md:border-gray-300 md:rounded-md md:py-5 md:h-210 md:w-80 md:mx-auto mt-4">
                <section className="flex justify-between items-center">
                <p className="font-medium text-sm">Transaction History</p>
                <p className="text-blue-600 text-sm">See All</p>
                </section>
                <section className="py-4 flex gap-5 justify-between">
                <img src="/icons/floyd.svg" alt="floyd" />
                <section className="mr-auto flex flex-col justify-between">
                    <p className="font-semibold">Floyd Miles</p>
                    <p>Send</p>
                </section>
                <p className="font-semibold text-green-600">+Rp50.000</p>
                </section>                
                <section className="py-4 flex gap-5 justify-between">
                <img src="/icons/floyd.svg" alt="floyd" />
                <section className="mr-auto flex flex-col justify-between">
                    <p className="font-semibold">Floyd Miles</p>
                    <p>Transfer</p>
                </section>
                <p className="font-semibold text-red-600">-Rp50.000</p>
                </section>                
                <section className="py-4 flex gap-5 justify-between">
                <img src="/icons/floyd.svg" alt="floyd" />
                <section className="mr-auto flex flex-col justify-between">
                    <p className="font-semibold">Floyd Miles</p>
                    <p>Transfer</p>
                </section>
                <p className="font-semibold text-red-600">-Rp50.000</p>
                </section>                
                <section className="py-4 flex gap-5 justify-between">
                <img src="/icons/floyd.svg" alt="floyd" />
                <section className="mr-auto flex flex-col justify-between">
                    <p className="font-semibold">Floyd Miles</p>
                    <p>Send</p>
                </section>
                <p className="font-semibold text-green-600">+Rp50.000</p>
                </section>                
                <section className="py-4 flex gap-5 justify-between">
                <img src="/icons/floyd.svg" alt="floyd" />
                <section className="mr-auto flex flex-col justify-between">
                    <p className="font-semibold">Floyd Miles</p>
                    <p>Transfer</p>
                </section>
                <p className="font-semibold text-red-600">-Rp50.000</p>
                </section>                
                <section className="py-4 flex gap-5 justify-between">
                <img src="/icons/floyd.svg" alt="floyd" />
                <section className="mr-auto flex flex-col justify-between">
                    <p className="font-semibold">Floyd Miles</p>
                    <p>Send</p>
                </section>
                <p className="font-semibold text-green-600">+Rp50.000</p>
                </section>                
                <section className="py-4 flex gap-5 justify-between">
                <img src="/icons/floyd.svg" alt="floyd" />
                <section className="mr-auto flex flex-col justify-between">
                    <p className="font-semibold">Floyd Miles</p>
                    <p>Transfer</p>
                </section>
                <p className="font-semibold text-red-600">-Rp50.000</p>
                </section>                
                <section className="py-4 flex gap-5 justify-between">
                <img src="/icons/floyd.svg" alt="floyd" />
                <section className="mr-auto flex flex-col justify-between">
                    <p className="font-semibold">Floyd Miles</p>
                    <p>Send</p>
                </section>
                <p className="font-semibold text-green-600">+Rp50.000</p>
                </section>                
                <section className="py-4 flex gap-5 justify-between">
                <img src="/icons/floyd.svg" alt="floyd" />
                <section className="mr-auto flex flex-col justify-between">
                    <p className="font-semibold">Floyd Miles</p>
                    <p>Send</p>
                </section>
                <p className="font-semibold text-green-600">+Rp50.000</p>
                </section>                
            </section>
            </section>
        </section>
    )
}