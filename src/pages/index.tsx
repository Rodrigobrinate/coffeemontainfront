import React, { useEffect } from 'react';
//import "../app/globals.css"

// import { Container } from './styles';

const Pages: React.FC = () => {

    useEffect(() => {
        window.location.href = "/home"
    }, [])


  return <div />;
}

export default Pages;