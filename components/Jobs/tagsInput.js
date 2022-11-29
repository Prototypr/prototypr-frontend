
import React,{useState, useEffect} from "react";
import Tags from '@yaireo/tagify/dist/react.tagify'
import "@yaireo/tagify/dist/tagify.css" // Tagify CSS
// import Button from '~/letter-app/components/primitives/Button'

const spinnerIcon =  <svg className="animate-spin h-5 w-5 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
<circle className="opacity-25" cx="12" cy="12" r="10" stroke="#fff" strokeWidth="4"></circle>
<path className="opacity-75" fill="#fff" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
</svg>
// ================= TAGFIELD ==================

// Tagify settings object
const baseTagifySettings = {
  blacklist: [],
  backspace: "edit",
//   placeholder: "Enter keywords (e.g. tech, design, pottery)",
//   userInput: ,
editTags:false,
enforceWhitelist:true,
  dropdown: {
    enabled: 0,
    maxItems:20,
    tagTextProp:"name",
    mapValueTo:"name",
    searchKeys:["name"]
  },
  callbacks: {}
};

const TagField = ({ options,placeholder,max,id,field, updateField }) =>
{
    const [tags, setTags] = useState(false)


  const handleChange = e => {
    setTags(e.detail.tagify.value.map(item => item.value))
    updateField(e.detail.tagify.value.map(item => item.value))
  };

  useEffect(()=>{
    let tags = []
    
      setTags(tags)
  },[])

  const settings = {
    ...baseTagifySettings,
    placeholder:placeholder?placeholder:"Enter keywords (e.g. tech, design, pottery)",
    tagTextProp:'name',
    mapValueTo:"name",
    whitelist: options,
    maxTags:max,
    id:id,
    callbacks: {
      add: handleChange,
      remove: handleChange,
      blur: handleChange,
      edit: handleChange,
      invalid: handleChange,
      click: handleChange,
      focus: handleChange,
      "edit:updated": handleChange,
      "edit:start": handleChange
    }
  };


  return (
    <div className="form-group text-left w-full">
      {/* <label htmlFor={"field-input"}>Tags</label> */}
      {tags && <Tags
      id={`${id}_tagify`}
      className="rounded text-sm -mt-6 mx-auto w-full border-gray-500"
      settings={settings} 
      defaultValue={tags} />}
      <p className="text-xs mt-2 text-gray-400">(choose {max} maximum)</p>
    </div>
  );
}

// ================= APP ======================

const TagsInput = ({options,field,placeholder, updateField, max,id}) => {

  return (
    <div className="App">
      <TagField id={id} options={options} field={field} max={max} placeholder={placeholder}updateField={updateField}/>
    </div>
  );
}

export default TagsInput


