import React, { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios'
import styles from './customer.module.css';

const Customers = (props) => {
    const [customersList, setCustomersList] = useState([])
    //const baseUrl = 'http://localhost:5000'
    const baseUrl = 'https://customersapi-cu.azurewebsites.net'
    const nameRef = useRef(null);
    const typeRef = useRef(null);
    const yearRef = useRef(null);
    const numberOfOwnersRef = useRef(null);
    const shareCapRef = useRef(null);

    const getCustomers = useCallback(async () => {
        const result = await axios(`${baseUrl}/api/customers`);
        setCustomersList(result.data);
    }, [])

    useEffect(() => {
        getCustomers()
    }, [getCustomers]);

    const removeCustomerHandler = async (id) => {
        console.log('Clicked on id: ', id)

        try {
            const respons = await axios.delete(`${baseUrl}/api/customers/${id}`)

            const newCustomerList = customersList.filter((item) => item.id !== id)
            setCustomersList(newCustomerList)
        } catch (err) {
            const error = err;
            console.log('Fanget error ', error.response.data)
        }

    }

    const addCustomerHandler = async () => {
        console.log('Added customer, name: ', nameRef.current.value)

        var newCustomer2 = {
            name: nameRef.current.value,
            type: typeRef.current.value,
            year: yearRef.current.value,
            numberOfOwners: numberOfOwnersRef.current.value,
            shareCapital: shareCapRef.current.value
        }
        var newCustomer = {
            name: 'dedede'
        }
        try {
            const respons = await axios.post(`${baseUrl}/api/customers`, newCustomer)
            console.log('Added customer new: ', respons.data)
            const newList = customersList.concat(respons.data)
            setCustomersList(newList)
        } catch (err) {
            const error = err;
            console.log('Fanget error ', error.response.data)
        }
    }

    const renderTableData = () => {
        return customersList.map((customer, index) => {
            const { id, name, year, numberOfOwners, type, shareCapital } = customer
            return (
                <tr key={id}>
                    <td>{name}</td>
                    <td>{type}</td>
                    <td>{year}</td>
                    <td>{numberOfOwners}</td>
                    <td>{shareCapital}</td>
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
            <br></br>
            <h2 >New customer</h2>
            <br></br>
            <label >Name</label>
            <input ref={nameRef} ></input>
            <br></br>
            <label >Type</label>
            <input ref={typeRef} ></input>
            <br></br>
            <label >Year</label>
            <input ref={yearRef} ></input>
            <br></br>
            <label >Owners</label>
            <input ref={numberOfOwnersRef} ></input>
            <br></br>
            <label >Share Capital</label>
            <input ref={shareCapRef} ></input>
            <br></br>
            <button onClick={() => addCustomerHandler()} >Add customer</button>
        </>
    )

}

export default Customers;