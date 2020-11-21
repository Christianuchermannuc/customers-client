import React, { useState, useEffect } from 'react';
import axios from 'axios'
//import styles from './header.module.css';

const Customers = (props) => {

    const [customers, setCustomers] = useState({ customers: [] })

    useEffect(async () => {
        const result = await axios(
           // 'https://customersapi-cu.azurewebsites.net/api/customers',
           'http://localhost:5000/api/customers',
        );
        console.log('her er customers: ', result.data)
        setCustomers(result.data);
    }, []);

    return (
        <h1>
            Main Contenet
        </h1>
    )

}

export default Customers;