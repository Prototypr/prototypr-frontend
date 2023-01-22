import React, { useEffect, useState } from 'react'
// https://github.com/pqina/react-filepond
// Import React FilePond
import { FilePond, File, registerPlugin } from 'react-filepond'

// Import FilePond styles

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
// `npm i filepond-plugin-image-preview filepond-plugin-image-exif-orientation --save`
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import FilePondPluginFilePoster from 'filepond-plugin-file-poster';


// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview, FilePondPluginFilePoster)

// Our app
function GalleryUpload({updateField, gallery}) {
  const [files, setFiles] = useState(null)

  useEffect(()=>{

    // set default images when in edit mode
    let files = []
    for(var x = 0;x<gallery?.length;x++){
      // https://pqina.nl/filepond/docs/api/plugins/file-poster/
      files.push(
        {
          // the server file reference
          source: gallery[x].id,
          // set type to local to indicate an already uploaded file
          options: {
              filePosterHeight:0,
              type: 'local',
              // optional stub file information
              file: {
                  name: gallery[x].name,
                  size: gallery[x].size,
                  type: gallery[x].size.mime,
                  id:gallery[x].id
              },

              // pass poster property
              metadata: {
                poster: gallery[x].url,
            },
          },
      },
      )
    }
    setFiles(files)

  },[gallery])


  return (
    <div className="App">
      <FilePond
        
        files={files?files:[]}
        onupdatefiles={(files)=>{
            setFiles(files)
            let fileys = files.map((fileItem) => fileItem.file)
            updateField(fileys)
            console.log(fileys)
        }}
        allowMultiple={true}
        maxFiles={5}
        // server="/api"
        name="gallery" /* sets the file input name, it's filepond by default */
        labelIdle='Drag & Drop your images or <span class="filepond--label-action">Browse</span>'
      />
    </div>
  )
}
export default GalleryUpload