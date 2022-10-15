// Initialize the JS client
import { createClient } from '@supabase/supabase-js'

export default async function handler(req, res) {
    //only allow post requests from an article page
    // no longer in use - using wm.prototypr.io because there's loads of constant requests
        res.status(405).send({ message: 'Only POST requests allowed' })
        return

        if (req.method !== 'POST') {
        res.status(405).send({ message: 'Only POST requests allowed' })
        return
      }

    if(req.headers.origin!==process.env.NEXTAUTH_URL){
        res.status(405).send({ message: 'Origin does not match' })
        return
    }

    if(req.headers.referer.indexOf('/post/')==-1){
        res.status(405).send({ message: 'Only recording articles at the moment!' })
        return
    }


    try {

        const {formattedTotal, url, post_id, monetization} = req.body

        if(!url){
            res.status(405).send({ message: 'Url is required!' })
            return
        }
        if(!post_id){
            res.status(405).send({ message: 'Post id is required!' })
            return
        }
        if(!monetization){
            res.status(405).send({ message: 'Monetization object is required!' })
            return
        }

        if(!formattedTotal){
            res.status(200).send({ message: 'total is 0' })
            return
        }

        // res.status(200).send({ message: 'total is 0' })
        //     return

        /**
         * todo: in the future, move all this to strapi
         * check the post id is a real post etc, and attach to post
         */

        //make call to supabase
        const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SECRET)

        try{
            if(monetization.requestId){
                // const { data:record, err } = await supabase
                // .from("wm_posts")
                // .select("*")
                // .eq("wm_session", monetization.requestId)
                // .eq("post_id", post_id);

                 const { data:record, err } = await supabase
                .from("wm_posts")
                .select("*")
                .eq("post_id", post_id)
                .eq("wm_session", monetization.requestId.toString())
                ;


                if(!record || !record?.length){
                    const { data, error } = await supabase
                    .from('wm_posts')
                    .insert([
                        { slug: url, 
                            session_post:post_id+monetization.requestId,
                            post_id:post_id, 
                            formatted_total:formattedTotal, 
                            wm_session:monetization.requestId, 
                            wm_data:monetization,
                            payment_pointer:monetization.paymentPointer
                        },
                    ])
                    // console.log(data)
                    if(data){
                        res.status(200).send({ message: 'done' })
                         return
                     }else if(error){
                         console.log(error)
                         return  res.status(500).end('Some error recording the transaction')
                     }

                }else{
                    const total = ((Number(formattedTotal))+ (Number(record[0].formatted_total)))
                    const newFormattedTotal = (total).toFixed(monetization.assetScale)
                   
                    const { data, error } = await supabase
                    .from('wm_posts')
                    .update({  
                        // formatted_total:Number(formattedTotal)+Number(record[0].formatted_total), 
                        formatted_total:newFormattedTotal.toString(), 
                        wm_session:monetization.requestId, 
                        wm_data:monetization,
                        updated_at:((new Date()).toISOString()).toLocaleString()
                    })
                    .eq('id', record[0].id)
                    if(data){
                        return res.status(200).send({ message: 'done' })
                    }else if(error){
                        console.log(error)
                        return  res.status(500).end('Some error recording the transaction')
                    }
                    res.status(200).send({ message: 'done' })
                    return
                }

    
            }else{
                res.status(200).send({ message: 'done' })
                return
            }
        }catch(err){
            console.log(err)
            return  res.status(500).end('Some error recording the transaction')
        }

        // var axios = require('axios');
        // var data = JSON.stringify();

        // var config = {
        // method: 'post',
        // url: `${process.env.SUPABASE_URL}/rest/v1/wm_posts`,
        // headers: { 
        //     'apikey': process.env.SUPABASE_SECRET, 
        //     'Content-Type': 'application/json'
        // },
        // data : data
        // };

        // axios(config)
        // .then(function (response) {
        //     return res.status(200).json({done:true})
        // })
        // .catch(function (error) {
        //     console.log(error);
        //     res.status(500).send({ message: 'Some error recording the transaction' })
        //     return
        // });

    
        res.status(200).json({done:true})
        return true

   
    } catch (err) {
        console.log(err)
      // If there was an error, Next.js will continue
      // to show the last successfully generated page
      return res.status(500).send("Error checking analytics");
    }
  }
  