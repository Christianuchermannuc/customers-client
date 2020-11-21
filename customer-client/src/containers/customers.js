import React, { useState, useEffect,useCallback } from 'react';
import axios from 'axios'
//import styles from './header.module.css';

const Customers = (props) => {

    const [customers, setCustomers] = useState({ customers: [] })

    const fetchMyAPI = useCallback(async () => {
        const result = await axios(
             'https://customersapi-cu.azurewebsites.net/api/customers',           
         );
         console.log('her er customers: ', result.data)
         setCustomers(result.data);
      }, [])

    useEffect(() => {
        fetchMyAPI()
    }, [fetchMyAPI]);

    return (
        <h1>
            Main Contenet
        </h1>
    )

}

export default Customers;