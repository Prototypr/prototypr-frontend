import { useEffect } from 'react'
import { useMonetizationCounter } from 'react-web-monetization'

const Counter2 = () =>{

    const monetization = useMonetizationCounter()

    useEffect(()=>{

        console.log(monetization)

    },[monetization.totalAmount])

    return null
}

export default Counter2