import { createClient } from '@supabase/supabase-js'
import { useState, useEffect } from 'react'
import DataTable from 'react-data-table-component';


const customStyles = {
    tableWrapper: {
		style: {
			borderRadius: '6px',
            border:'1px solid #eee',
            overflow:'hidden'
		},
	},
};

const columns = [
    {
        name: 'Article',
        selector: row => {
            return <div><a target="_blank" className='text-blue-800 underline' href={row.url}>{row.title}</a></div>
        },
        sortable: true,
    },
    {
        name: 'Total Micropayments',
        selector: row => row.total_payout,
        sortable: true,
    },
    {
        name: 'Currency',
        selector: row => row.currency,
        sortable: true,
    },
];

const PayoutTable = () =>{

    
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON)

    const [payouts, setPayouts]=  useState(null)

    useEffect(()=>{

        const getPayouts = async () =>{

            const { data, error } = await supabase
            .from('payouts')
            .select()

            setPayouts(data)

        }

        getPayouts()
    

    },[])
  
    console.log(payouts)


    return(
        <div className='mt-6 mb-8'>
            {payouts?.length &&
             <div>
                <DataTable
                    columns={columns}
                    data={payouts}
                    striped={true}
                    customStyles={customStyles}
                />
                </div>}
        </div>
    )

}

export default PayoutTable