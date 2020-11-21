import React from 'react';
import classes from './Layout.module.css';
import HeaderItem from '../components/header'

const layout = (props) => {
    return (
        <>
            <HeaderItem></HeaderItem>
            <main className={classes.Content}>
                {props.children}
            </main>
        </>
    )
}
export default layout;