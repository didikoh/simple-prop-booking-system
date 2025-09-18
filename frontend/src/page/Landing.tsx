import "./Landing.css"
import { useEffect } from 'react'

const Landing = ({ setLogin }: any) => {
    useEffect(() => {
        if (setLogin) setLogin(true);
    }, [])

    return (
        <div></div>
    )

}

export default Landing