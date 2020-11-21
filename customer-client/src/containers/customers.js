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
        console.log('customers: ', customersList)
    }, [])

    useEffect(() => {
        getCustomers()
    }, [getCustomers]);

    const removeCustomerHandler = (id) => {
        console.log('Trykket på id: ', id)
        const newCustomerList = customersList.filter((item) => item.id !== id)
        setCustomersList(newCustomerList)
    }

    const renderTableData = () => {
        return customersList.map((customer, index) => {
            const { id, year, numberOfOwners, type } = customer
            return (
                <tr key={id}>
                    <td>{id}</td>
                    <td>{year}</td>
                    <td>{numberOfOwners}</td>
                    <td>{type}</td>
                    <td> <button onClick={() => removeCustomerHandler(id)} >Remove customer</button></td>
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
                    <tr>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Year</th>
                    <th>Owners</th>
                    <th>Share Capital</th>
                    </tr>
                    {renderTableData()}
                </tbody>
            </table>
        </>
    )

}

export default Customers;