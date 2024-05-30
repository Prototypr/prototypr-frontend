import { useEffect, useState } from "react";
import { cloneDeep } from "lodash"
import fetchJson from "@/lib/iron-session/fetchJson";
import toast from "react-hot-toast";
import ToggleComponent from "../Primitives/Toggle";
import CategoriesOption from "../v4/card/CategoriesOption";
import Button from "../Primitives/Button";
import Spinner from "../atom/Spinner/Spinner";

const TopicsSelect = ({
    next,
    user,
    allTags,
    selectedTopics,
    setSelectedTopics
}) =>{


 const [submitting, setSubmitting] = useState(false)

 useEffect(()=>{

  if(!selectedTopics){
    initSelectedTopics()
  }
 },[user,allTags])

 const initSelectedTopics = () =>{
  let selected = []
  for(var x = 0; x<user?.profile?.tags?.length;x++){
    const userAlreadyChosen = allTags?.findIndex(object =>parseInt(object.tag_id, 10) === parseInt(user?.profile?.tags[x].id, 10));
    selected.push(allTags[userAlreadyChosen])
  }  
  setSelectedTopics(selected)
 }

  const saveTopicsToUser = async(next) =>{
    setSubmitting(true)
    var tags = []
    for (var x= 0;x<selectedTopics?.length;x++){
      tags.push(selectedTopics[x].tag_id)
    }
    const body = {data:{
      tags:tags?.length?tags:false
    }};
    try{
      const result = await fetchJson('/api/account/updateProfile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      if(result.status === 200){
        setSubmitting(false)
        if(!next){
          toast.success("Successfully updated", {
            duration: 5000,
          });
        }else{
          next()
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
  const updateSelectedTopics = (option, isChosen) =>{
    let chosenTopics = cloneDeep(selectedTopics)
    if(!chosenTopics?.length && isChosen){
      chosenTopics = [option]
    }else if(chosenTopics?.length){
      const index = chosenTopics.findIndex(object => object.slug === option.slug);
      if (index === -1 && isChosen) {
        chosenTopics.push(option);
      }else{
        chosenTopics.splice(index, 1)
      }
    }
    setSelectedTopics(chosenTopics)
  }

    return(
<>
                  <div className={next?"w-[380px] max-w-full sm:w-[400px] xl:w-[585px] px-10 lg:px-0 text-left":'w-full'}>
                    {next?
                    <>
                    <div className="flex justify-center mx-auto mb-1">
                      <h2 className="text-3xl  text-black/90 font-semibold text-center">
                        Choose some topics   
                      </h2>
                    </div>
                    <h3 className="text-lg  text-gray-500 text-center mb-6">
                        Share your interests
                    </h3>
                    </>
                    :<div className="w-full py-1.5"/>}
                    <div className="md:p-1 max-h-[500px] relative border rounded-xl border-black/10 rounded-xl">
                      <div className="h-full w-full">
                        <div className="flex p-3 flex-wrap max-h-[390px] overflow-y-auto justify-center">
                          {allTags.map((topic, i) => {
                            let userAlreadyChosen
                            if(!selectedTopics){
                              userAlreadyChosen = user?.profile?.tags?.findIndex(object =>parseInt(object.id, 10) === parseInt(topic.tag_id, 10));
                            }else{
                              userAlreadyChosen = selectedTopics?.findIndex(object =>parseInt(object.tag_id, 10) === parseInt(topic.tag_id, 10));
                            }
                            return(
                            <>
                            <div className="m-2">
                              <ToggleComponent defaultChecked={userAlreadyChosen>-1?true:false} onPressChanged={(pressed)=>updateSelectedTopics(topic, pressed)}>
                                  <CategoriesOption showCount={false} withBackground={true} key={i} index={i} topic={topic}/>
                              </ToggleComponent>
                            </div>
                          {/* <CategoriesIconCard showCount={false} withBackground={true} key={i} index={i} topic={topic}/> */}
                            </>
                          )})}
                        </div>
                      </div>
                  </div>
                    
                    {next?
                    <div className="w-full text-center relative flex justify-center mt-6">
                    <button 
                      className={`w-full px-4 h-[40px] bg-blue-600 hover:bg-blue-500 text-white font-semibold w-[fit-content] rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed`}
                      onClick={()=>saveTopicsToUser(next)} 
                      disabled={submitting}>
                       {submitting?
                        <Spinner size="sm" className="mx-auto p-1 cursor-loading "/>:
                       'Continue'}
                      </button>
                    </div>
                    :  <button 
                    className={`w-full mt-4 px-4 h-[40px] bg-blue-600 hover:bg-blue-500 text-white font-semibold w-[fit-content] rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed`}
                    onClick={()=>saveTopicsToUser()} 
                    disabled={submitting}>
                     {submitting?
                      <Spinner size="sm" className="mx-auto p-1 cursor-loading "/>:
                     'Save topics'}
                    </button>
                    }
                  </div>
                </>
    )
}
export default TopicsSelect