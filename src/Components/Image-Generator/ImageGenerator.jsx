import React, { useRef, useState } from 'react'
import './ImageGenerator.css'
import defimg from '../../assets/default_image.svg'

function ImageGenerator() {

  const[img_url,setImg_url] = useState('/');
  let inpRef = useRef()
  const[loading,setLoading] = useState(false);

  const generateImage = async()=>{
    let prompt = inpRef.current.value;
    if(prompt===''){
      alert('Please enter a valid prompt');
      return 0;
    }
    setLoading(true);
  const response = await fetch(
    'https://clipdrop-api.co/text-to-image/v1', 
  {
  method: 'POST',
  headers: {
    'x-api-key': import.meta.env.VITE_CLIPDROP_API_KEY,
    'Content-Type': 'application/json'
    
  },
  body: JSON.stringify({ prompt:prompt }),
})

let blob = await response.blob();
let url=URL.createObjectURL(blob);
setImg_url(url)
setLoading(false);
  }

  return (
    <div className='ai-image-generator'>
      <div className="header">AI Image <span>Generator</span></div>
      <div className="img-loading">
        <div className="image"><img src={img_url==='/'?defimg:img_url} alt=''/></div>
        <div className="loading">
          <div className={loading?'loading-bar-full':'loading-bar'}>
            <div className={loading?'loading-text':'display-inactive'}>Loading</div>
          </div>
        </div>
      </div>
      <div className="input-section">
        <input type="text" ref={inpRef} placeholder='Enter your prompt here...' className='search-input'/>
        <div className='generate-btn' onClick={()=>{generateImage()}}>Generate</div>
      </div>

    </div>
  )
}

export default ImageGenerator
