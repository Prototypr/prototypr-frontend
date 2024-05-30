import { useEffect, useState } from "react"
import CheckboxComponent from "../Primitives/Checkbox"
import { cloneDeep } from "lodash"
import fetchJson from "@/lib/iron-session/fetchJson";
import toast from "react-hot-toast";
import Spinner from "../atom/Spinner/Spinner";
import Button from "../Primitives/Button";

const options = [
    {
      name:'Publish articles',
      slug:'writer'
      },
      {
      name:'Share your projects',
      slug:'maker'
      },
      {
      name:'Earn money from writing',
      slug:'monetization'
      },
    {
    name:'Find job opportunities',
    slug:'availability'
    },
    {
    name:'Become a mentor',
    slug:'mentor'
    },
    {
    name:'Find a mentor',
    slug:'mentee'
    },
    {
    name:"Connect with people",
    slug:'networking'
    },
    {
    name:"Find collaborations",
    slug:'collaborate'
    },
    {
    name:'Read articles',
    slug:'reader'
    },
    {
    name:'Learn design',
    slug:'designer'
    },
    {
    name:'Learn code',
    slug:'coder'
    },
  ]

const InterestsSelect = ({user,next, previous, selectedOptions, setSelectedOptions}) =>{

    const [submitting, setSubmitting] = useState(false)

    useEffect(()=>{

        if(!selectedOptions){
          initSelectedOptions()
        }
       },[user, selectedOptions])

       const initSelectedOptions = () =>{
        let selected = []
        for(var x = 0; x<options.length;x++){
            if(user['profile'][options[x].slug]==true){
                selected.push(options[x])
            }
         
        }  
        setSelectedOptions(selected)
       }
      

    const saveInterestsToUser = async() =>{
        setSubmitting(true)
        var data = {}
        for(var x = 0 ;x<options.length;x++){
            const chosen = selectedOptions.findIndex(object => object.slug === options[x].slug);
            if(chosen>-1){
                data[options[x]?.slug] = true
            }else{
                data[options[x]?.slug] = false
            }
        }
        const body = {data:{
          ...data
        }};
        try{
          const result = await fetchJson('/api/account/updateProfile', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
          })
          if(result.status === 200){
            setSubmitting(false)
            if(next){
              next()
            }else{
              toast.success("Successfully updated", {
                duration: 5000,
              });
            }
          }else{
            let msg = result?.error?.message
            toast.error(msg?msg:"Error has occured.");
            setSubmitting(false)
          }
        } catch (error) {
          
          toast.error("Error has occured.");
          setSubmitting(false)
        }
      }

      const onCheckChange = (option, isChosen) =>{

        let chosenOptions = cloneDeep(selectedOptions)

        if(!chosenOptions?.length && isChosen){
            chosenOptions = [option]
          }else if(chosenOptions?.length){
            const index = chosenOptions.findIndex(object => object.slug === option.slug);
            if (index === -1 && isChosen) {
                chosenOptions.push(option);
            }else{
                chosenOptions.splice(index, 1)
            }
          }
          setSelectedOptions(chosenOptions)
      }

    return(
        <div className={"w-full px-0 md:px-10 lg:px-0"}>
            {next?
              <div className="w-full p-8 pb-3 md:pb-3 text-center">
                 <div>
                      <h2 className="text-3xl mb-2  text-black/90 font-semibold text-center">
                        What are your goals?   
                      </h2>
                    <h3 className="text-lg  text-gray-500 text-center mb-6">
                        Let us know what you're looking for
                    </h3>
                    </div>
              </div>
            :<div className="w-full py-1.5"/>}
                   <div className={`${next?'px-6':''}`}>
                    <div className={`${next?"w-[380px] mx-auto max-w-full sm:w-[400px] xl:w-[585px] px-10 text-left":'w-full'} p-3 md:p-6 border border-black/10 max-h-[400px] overflow-y-auto rounded-xl grid grid-cols-1 gap-y-6 gap-x-6 md:gap-y-6 md:gap-x-10 grid-cols-1 lg:grid-cols-2 xl:grid-cols-2`}>
                      {options.map((option,i) =>{
                        let userAlreadyChosen
                        if(!selectedOptions){
                          userAlreadyChosen = (user['profile'][option.slug]==true)?1:-1
                        }else{
                          userAlreadyChosen = selectedOptions?.findIndex(object =>object.slug === option.slug);
                        }
                        return(
                        <div className="col-span-1">
                          <CheckboxComponent onCheckChange={onCheckChange} option={option} defaultChecked={userAlreadyChosen>-1?true:false}/>
                        </div>
                        )
                      })}
                    </div>
                  </div>
                  {next?<div className={`${next?"w-[380px] mx-auto max-w-full sm:w-[400px] xl:w-[585px] px-10 lg:px-0 text-left":'w-full'} flex mt-6 mx-auto px-8 justify-between`}>
                    <button
                      aria-label="Previous"
                      onClick={() =>{previous()}}
                      className={`text-base px-3 py-2 mr-2 focus:outline-none focus:ring focus:ring-blue-400 flex justify-center rounded-md cursor-pointer 
                                hover:bg-gray-100
                                bg-white  
                                duration-200 ease-in-out 
                                transition`}
                    >
                      <div className="flex mx-auto text-blue-600 hover:text-blue-500 text-sm font-semibold my-auto leading-5">
                        <div>Previous</div>
                      </div>
                    </button>
                    <button
                      aria-label="Continue"
                      onClick={() =>{saveInterestsToUser();}}
                      className={`text-base px-3 py-2 mr-2 focus:outline-none focus:ring focus:ring-blue-400 flex justify-center !rounded-full cursor-pointer 
                                    hover:bg-blue-600
                                    bg-blue-500  
                                    duration-200 ease-in-out 
                                    transition`}
                    >
                      <div className="flex mx-auto text-white text-sm font-semibold my-auto leading-5">
                        <div>
                        {submitting?
                        <Spinner size="sm" className="mx-auto p-1 cursor-loading "/>:
                       'Next'}
                        </div>
                      </div>
                    </button>
                  </div>:
                  <button 
                  className={`w-full mt-4 px-4 h-[40px] bg-blue-600 hover:bg-blue-500 text-white font-semibold w-[fit-content] rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed`}
                  variant="confirmRounded"
                  onClick={()=>saveInterestsToUser()} 
                  disabled={submitting}>
                   {submitting?
                    <Spinner size="sm" className="mx-auto p-1 cursor-loading "/>:
                   'Save interests'}
                  </button>
                  }
                </div>
    )
}
export default InterestsSelect