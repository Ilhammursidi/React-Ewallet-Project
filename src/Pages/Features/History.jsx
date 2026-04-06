import { AppHeader } from "../../Components/Organisms/AppHeader";
import { SideBar } from "../../Components/Atoms/SideBar";
import { useState } from "react";

export const History = () => {
    const [query, setQuery] = useState("");
    const data = [
        {
            id: 1,
            name: "Ghaluh 1",
            phone: "(239) 555-0108",
            img: "/src/assets/icons/Table cell.svg",
            amount: "Rp.50.000",
        },
        {
            id: 2,
            name: "Jhon Cena",
            phone: "(239) 555-0108",
            img: "/src/assets/icons/Table cell-1.svg",
            amount: "Rp.50.000",
        },
        {
            id: 3,
            name: "Young Lex",
            phone: "(239) 555-0108",
            img: "/src/assets/icons/Table cell-2.svg",
            amount: "Rp.50.000",
        },
        {
            id: 4,
            name: "Bruno Mars",
            phone: "(239) 555-0108",
            img: "/src/assets/icons/Table cell-3.svg",
            amount: "Rp.50.000",
        },
        {
            id: 5,
            name: "Bruno Pluto",
            phone: "(239) 555-0108",
            img: "/src/assets/icons/Table cell-4.svg",
            amount: "Rp.50.000",
        },
        {
            id: 6,
            name: "Bruno Bogor",
            phone: "(239) 555-0108",
            img: "/src/assets/icons/Table cell-5.svg",
            amount: "Rp.50.000",
        },
        {
            id: 7,
            name: "Bruno G Putri",
            phone: "(239) 555-0108",
            img: "/src/assets/icons/Table cell-6.svg",
            amount: "Rp.50.000",
        }
    ];

    const filteredData = data.filter((row) => {
        return row.name.toLowerCase().includes(query.toLowerCase()) || row.phone.includes(query);
    });
    
    return (
        <section>
            <AppHeader className="md:bg-white"/>
                <section className="md:flex md:justify-between w-full">
                <SideBar></SideBar>
                
                <section className="md:flex flex-col md:w-5/6 md:px-5">
                    <section className="hidden md:flex md:h-5 md:mr-auto md:gap-2 items-center font-medium md:m-5 ">
                        <img src="/src/assets/icons/blueHistory.svg" alt="history" />
                        <p>History Transaction</p>
                    </section>

                <section className="px-5 py-3 md:border md:w-240 md:border-gray-300 md:rounded-md md:py-5">

                <section className="flex flex-col md:flex-row md:justify-between md:items-center">

                    <p className="font-semibold">Find Transaction</p>
                    <section className="flex items-center justify-between p-2 border border-gray-500 rounded mt-1 focus-within:border-blue-600">
                    <input 
                    type="text" 
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Enter Number Or Fullname" 
                    className="focus:outline-none "/>                    
                        <img src="/src/assets/icons/Search.svg" alt="search" />
                    </section>

                </section>
                    

                    <section className=" py-5">
                    <table className="w-full">
                        <tbody>

                            {filteredData.map((row) => (
                                <tr key={row.id} className="table-layout w-full text-xs">
                                    <td><img src={row.img} alt={row.name} /></td>
                                    <td>{row.name}</td>
                                    <td>{row.phone}</td>
                                    <td className="text-green-600">{row.amount}</td>
                                    <td><img src="/src/assets/icons/Trash.svg" alt="trash" /></td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </section>
                    </section>

                </section>

            </section>
        </section>
    )
}