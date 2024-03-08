import {socket} from '../../socket/socket';
import React, {useEffect} from 'react';

export const App = () => {
    const [orders, setOrders] = React.useState([]);

useEffect(() => {
    socket.on('connect', () => {
        console.log('connected');
    });

    socket.on('new-order', (data) => {
        console.log(data);
    });


    return () => {
        socket.off('connect');
        socket.off('disconnect');
    }
}, []);


    return (
        <>
        {orders.map((order, index) => (
            <div key={index}>
                Nueva Orden
            </div>
        ))
        }
        </>
    );
};