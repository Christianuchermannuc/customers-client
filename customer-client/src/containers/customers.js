import React, { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios'
import styles from './customer.module.css';

const Customers = (props) => {
    const [customersList, setCustomersList] = useState([])
    const [errorMessage, setErrorMessage] = useState('')
    const selectTypeOptions = [
        {
            id: 1,
            typeName: 'Limited liability company'
        },
        {
            id: 2,
            typeName: 'Sole proprietorship'
        },
        {
            id: 3,
            typeName: 'General partnership'
        }
    ]

    const [selectedType, setSelectedType] = useState(selectTypeOptions[0].typeName)

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

        const year = parseInt(yearRef.current.value)
        let shareCapital = parseInt(shareCapRef.current.value)
        const numberOfOwners = parseInt(numberOfOwnersRef.current.value)
        if (isNaN(shareCapital)) {
            shareCapital = 0
        }

        var newCustomer = {
            name: nameRef.current.value,
            type: selectedType,
            year: year,
            numberOfOwners: numberOfOwners,
            shareCapital: shareCapital
        }

        try {
            const respons = await axios.post(`${baseUrl}/api/customers`, newCustomer)
            console.log('Added customer new: ', respons.data)
            const newList = customersList.concat(respons.data)
            setCustomersList(newList)
            nameRef.current.value = ''
            yearRef.current.value = ''
            shareCapRef.current.value = ''
            numberOfOwnersRef.current.value = ''
            setErrorMessage('')
        } catch (err) {
            const error = err;
            console.log('Fanget error ', error.response.data)
            setErrorMessage(error.response.data)
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

    let showErrorMessage = '';
    if (!errorMessage) {
        showErrorMessage = <p style={{ color: "red" }}>{errorMessage}</p>
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
            {showErrorMessage}
            <p style={{ color: "red" }}>{errorMessage}</p>
            <br></br>
            <label >Name</label>
            <input ref={nameRef} ></input>
            <br></br>
            <label >Type</label>
            <select onChange={(e) => setSelectedType(e.target.value)} >
                {selectTypeOptions.map((type) => <option key={type.id} value={type.typeName}>{type.typeName}</option>)}
            </select>
            <br></br>
            <label >Year</label>
            <input type="number" ref={yearRef} ></input>
            <br></br>
            <label >Owners</label>
            <input type="number" ref={numberOfOwnersRef} ></input>

            <br></br>
            <label >Share Capital</label>
            <input type="number" ref={shareCapRef} ></input>
            <br></br>
            <button onClick={() => addCustomerHandler()} >Add customer</button>
        </>
    )

}

export default Customers;