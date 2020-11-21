import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios'
import styles from './customer.module.css';

const Customers = (props) => {

    const [customersList, setCustomersList] = useState([])

    const getCustomers = useCallback(async () => {
        const result = await axios(
            'https://customersapi-cu.azurewebsites.net/api/customers',
        );
        console.log('her er customers: ', result.data)
        setCustomersList(result.data);
      console.log('customers: ',customersList )  
    }, [])

    useEffect(() => {
        getCustomers()
    }, [getCustomers]);

    const renderTableData = () => {
        return customersList.map((customer, index) => {
            const { id, year, numberOfOwners, type } = customer //destructuring
            return (
                <tr key={id}>
                    <td>{id}</td>
                    <td>{year}</td>
                    <td>{numberOfOwners}</td>
                    <td>{type}</td>
                </tr>
            )
        })
    }

    return (
        <>
            <h1>
                Main Contenet
            </h1>
            <table id='customersId' className={styles}>
               <tbody>
                 {renderTableData()}
               </tbody>
            </table>
        </>
    )

}

export default Customers;