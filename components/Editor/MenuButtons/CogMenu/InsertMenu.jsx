import {generateJSONCode} from '../../../generateHTML'

const InsertMenu = ({editor, onHide}) =>{

    const insertText=()=>{
        onHide()
        var html = editor.getHTML()

        setTimeout(()=>{
        //  editor.chain().focus().duplicateTableSection().focus().run()
            let $pos = editor.state.selection.$anchor
            for (let d = $pos.depth; d > 0; d--) {
                let node = $pos.node(d)
                if (node.type.spec.tableRole == "row") {
                    if(node.attrs.dataLetterSection){
                        
                        var html = null
                        //grab the element from the store
                        for(var z = 0 ;z<editor.storage.elements.length;z++){
                            var element = editor.storage.elements[z]
                            
                            if(element.type=='text'){
                                html = element.code
                                break;
                            }
                        }
                        if(html){
                            var json = generateJSONCode(html)
                            editor.chain().setTextSelection(0).blur().insertContentAt($pos.after(d),json.content[0].content[0]).blur().run()
                        }


                //     //create new table row and attributes
                //      var currentNode = document.createElement('tr')
                //     //add attributes to node
                //     for (const [key, value] of Object.entries(node.attrs)) {
                //         if(key=='dataLetterSection'){
                //             currentNode.setAttribute('data-letter-section', 'text')
                //         }else if(value){
                //             currentNode.setAttribute(key,value)
                //         }
                //     }
                //     var td =null 
                //     //set table cell
                //     if(node.firstChild && node.firstChild.type.name=='tableCell'){
                //         var firstChildTD = node.firstChild
                //         td = document.createElement('td')
                //         for (const [key, value] of Object.entries(firstChildTD.attrs)) {
                //             if(key=='dataLetterSection' || key=='align'){
                //                 // td.setAttribute('data-letter-section', 'text')
                //             }else if(value){
                //                 if(key.indexOf('padding')>-1 || key.indexOf('font')>-1 || key.indexOf('border')>-1){
                //                     td.style[key]=value
                //                 }else{
                //                     td.setAttribute(key,value)
                //                 }
                //             }
                //         }
                //         td.innerHTML = `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In convallis laoreet rhoncus. Integer porta mi non viverra interdum. Vivamus placerat lectus id dignissim viverra. Nulla ac nisi lectus. Ut iaculis ex non tempor feugiat. Nulla iaculis vel elit tempus feugiat. Nunc lacinia, libero in ultricies ultricies, lorem purus lacinia metus, et tempor libero arcu quis odio. Aliquam dapibus, enim quis gravida ultrices, ipsum ligula consectetur massa, at consequat massa libero tincidunt purus.</p>`
                //         currentNode.append(td)
                //     }

                //     if(!td){
                //         td = `<td><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In convallis laoreet rhoncus. Integer porta mi non viverra interdum. Vivamus placerat lectus id dignissim viverra. Nulla ac nisi lectus. Ut iaculis ex non tempor feugiat. Nulla iaculis vel elit tempus feugiat. Nunc lacinia, libero in ultricies ultricies, lorem purus lacinia metus, et tempor libero arcu quis odio. Aliquam dapibus, enim quis gravida ultrices, ipsum ligula consectetur massa, at consequat massa libero tincidunt purus.</p></td>`
                //         currentNode.innerHTML=loremIpsum
                //     }                
                // var json = generateJSONCode(currentNode.outerHTML)
                
                // editor.chain().setTextSelection(0).blur().insertContentAt($pos.after(d),json.content[0].content[0]).blur().run()

                }
            }
            }
        },50)
    }
    const insertImage=()=>{
        onHide()
        var html = editor.getHTML()
        setTimeout(()=>{
        //  editor.chain().focus().duplicateTableSection().focus().run()
            let $pos = editor.state.selection.$anchor
            for (let d = $pos.depth; d > 0; d--) {
            let node = $pos.node(d)
            if (node.type.spec.tableRole == "row") {
                if(node.attrs.dataLetterSection){

                     var html = null
                        //grab the element from the store
                        for(var z = 0 ;z<editor.storage.elements.length;z++){
                            var element = editor.storage.elements[z]

                            if(element.type=='image'){
                                html = element.code
                                break;
                            }
                        }

                        if(html){

                            var json = generateJSONCode(html, true)
                
                            editor.chain().setTextSelection(0).blur().insertContentAt($pos.after(d),json.content[0].content[0]).blur().run()
                        }

                    // //create new table row and attributes
                    //  var currentNode = document.createElement('tr')
                    // //add attributes to node
                    // for (const [key, value] of Object.entries(node.attrs)) {
                    //     if(key=='dataLetterSection'){
                    //         currentNode.setAttribute('data-letter-section', 'image')
                    //     }else if(value){
                    //         currentNode.setAttribute(key,value)
                    //     }
                    // }
                    // var td =null 
                    // //set table cell
                    // if(node.firstChild && node.firstChild.type.name=='tableCell'){
                    //     var firstChildTD = node.firstChild
                    //     td = document.createElement('td')
                        
                    //     for (const [key, value] of Object.entries(firstChildTD.attrs)) {
                    //         if(key=='dataLetterSection' || key=='align'){
                    //             // td.setAttribute('data-letter-section', 'text')
                    //         }else if(value){
                    //             if(key.indexOf('padding')>-1 || key.indexOf('font')>-1 || key.indexOf('border')>-1){
                    //                 td.style[key]=value
                    //             }else{
                    //                 td.setAttribute(key,value)
                    //             }
                    //         }
                    //     }
                    //     td.innerHTML = `<img style="max-width:504px" src="https://images.unsplash.com/photo-1612120899221-7c51fdf3da98?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mzg1fHxtb3RpdmF0aW9uYWwlMjBxdW90ZXxlbnwwfDB8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"/>`
                    //     currentNode.append(td)
                    // }

                    // if(!td){
                    //     td = `<img style="max-width:504px" src="https://images.unsplash.com/photo-1612120899221-7c51fdf3da98?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mzg1fHxtb3RpdmF0aW9uYWwlMjBxdW90ZXxlbnwwfDB8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"/>`
                    //     currentNode.innerHTML=loremIpsum
                    // }
                
               

                }
            }
            }
        },50)
    }
    const insertButton=()=>{
        onHide()
        var html = editor.getHTML()
        setTimeout(()=>{
        //  editor.chain().focus().duplicateTableSection().focus().run()
            let $pos = editor.state.selection.$anchor
            for (let d = $pos.depth; d > 0; d--) {
                
            let node = $pos.node(d)
            if (node.type.spec.tableRole == "row") {
                if(node.attrs.dataLetterSection){

                       var html = null
                        //grab the element from the store
                        for(var z = 0 ;z<editor.storage.elements.length;z++){
                            var element = editor.storage.elements[z]

                            if(element.type=='button'){
                                html = element.code
                                break;
                            }
                        }

                        if(html){

                            var json = generateJSONCode(html)
                
                            editor.chain().setTextSelection(0).blur().insertContentAt($pos.after(d),json.content[0].content[0]).blur().run()
                        
                        }


                //     var html = `<tr data-letter-section="button" class="">
                //                 <td colspan="1" rowspan="1" class="sm-px-30" style="padding-bottom: 40px; padding-left: 48px; padding-right: 48px" align="center">
                //                     <table align="center" cellspacing="0" cellpadding="0" style="margin-left: auto; margin-right: auto"><tbody><tr><th colspan="1" rowspan="1" style="padding-left: 20px; padding-right: 20px; border-radius: 4px; background-color:#000000" class="hover-bg-gray-900 selectedCell" bgcolor="#000000"><letter-a style="display: block; padding-top: 16px; padding-bottom: 16px; text-decoration: none; color: rgb(255, 255, 255); font-size: 16px" data-block-link="true" href="https://letter.so" target="_blank" class="">Check it out</letter-a></th></tr></tbody></table></td></tr>`
                
                // var json = generateJSONCode(html)
                
                // editor.chain().setTextSelection(0).blur().insertContentAt($pos.after(d),json.content[0].content[0]).blur().run()

                }
            }
            }
        },50)
    }


    return(
        <div className="p-4 py-3">
            {/* <p className="text-sm font-semibold">Insert New Row Element</p> */}
            <p className="text-xs text-gray-600">Insert on new row</p>
            {/* text section */}
            <div onClick={insertText} className="flex mt-3 text-gray-700">  
            <div>
                <svg className="w-6 h-6 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M5 5v14h14V5H5zM4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm9 7v7h-2v-7H7V8h10v2h-4z" fill="currentColor"/></svg>
            </div>
            <div className="my-auto">
                <p className="text-gray-800 text-xs">Text</p>
            </div>
            </div>
            {/* image */}
            <div onClick={insertImage} className="flex mt-3 text-gray-700">  
            <div>
                <svg className="w-6 h-6 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M20 5H4v14l9.292-9.294a1 1 0 0 1 1.414 0L20 15.01V5zM2 3.993A1 1 0 0 1 2.992 3h18.016c.548 0 .992.445.992.993v16.014a1 1 0 0 1-.992.993H2.992A.993.993 0 0 1 2 20.007V3.993zM8 11a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" fill="currentColor"/></svg>
            </div>
            <div className="my-auto">
                <p className="text-gray-800 text-xs">Image</p>
            </div>
            </div>
            {/*  */}
            {/* button */}
            <div onClick={insertButton} className="flex mt-3 text-gray-700">  
            <div>
            <svg className="w-6 h-6 mr-2" xmlns="http://www.w3.org/2000/svg" width="23" height="14" viewBox="0 0 23 14" fill="none"><path d="M7.94974 2C6.62366 2 5.35189 2.52678 4.4142 3.46447C3.47652 4.40215 2.94974 5.67392 2.94974 7C2.94974 8.32608 3.47652 9.59785 4.4142 10.5355C5.35189 11.4732 6.62366 12 7.94974 12H15.9497C17.2758 12 18.5476 11.4732 19.4853 10.5355C20.423 9.59785 20.9497 8.32608 20.9497 7C20.9497 5.67392 20.423 4.40215 19.4853 3.46447C18.5476 2.52678 17.2758 2 15.9497 2H7.94974ZM7.94974 0H15.9497C17.8063 2.76642e-08 19.5867 0.737498 20.8995 2.05025C22.2122 3.36301 22.9497 5.14348 22.9497 7C22.9497 8.85652 22.2122 10.637 20.8995 11.9497C19.5867 13.2625 17.8063 14 15.9497 14H7.94974C6.09322 14 4.31274 13.2625 2.99999 11.9497C1.68724 10.637 0.949738 8.85652 0.949738 7C0.949738 5.14348 1.68724 3.36301 2.99999 2.05025C4.31274 0.737498 6.09322 2.76642e-08 7.94974 0Z" fill="currentColor"/></svg>
                {/* <svg className="w-6 h-6 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M3.998 21A.996.996 0 0 1 3 20.007V3.993C3 3.445 3.445 3 3.993 3h16.014c.548 0 .993.447.993.999V16l-5.003 5H3.998zM5 19h10.169L19 15.171V5H5v14z" fill="currentColor"/></svg> */}
            </div>
            <div className="my-auto">
                <p className="text-gray-800 text-xs">Button</p>
            </div>
            </div>
            {/*  */}
        </div>
    )

}

export default InsertMenu