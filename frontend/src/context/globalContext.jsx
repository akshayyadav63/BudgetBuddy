import React from "react"
import axios from 'axios'
import income from "../components/pages/income";
const Base_Url="http://localhost:5000/api/v1";
const GlobalContext=React.createContext()
export const GlobalProvider=({children})=>{
    const [Incomes,setIncomes]=useState([]);
    const [Expenses,setExpenses]=useState([]);
    const [error,seterror]=useState([]);
    
    const addIncome = async (income) => {
        try {
            const response = await axios.post(`${Base_Url}add-income`, income);
            // You can handle the response here if needed
        } catch (err) {
            seterror(err.response?.data?.message || "An error occurred");
        }
    };
    
    return(
        <GlobalContext.Provider>
            {children}
        </GlobalContext.Provider>
    )
}