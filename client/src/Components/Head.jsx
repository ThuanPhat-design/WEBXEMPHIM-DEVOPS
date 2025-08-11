import React from 'react'

function Head({title}) {
  return (
    <div className="w-full bg-deepGray lg:h-64 h-40 relative overflow-hidden rounded-md">
        <img 
        src="https://res.cloudinary.com/dwfmpiozq/image/upload/v1747806171/09760480-df72-43de-a27e-9e2ec58169c6_shxn6t.png" 
        alt="aboutus" 
        className="w-full h-full object-cover"
        />
        <div className="absolute lg:top-24 top-16 w-full flex-colo">
            <h1 className="text-2xl lg:text-h1 text-white text-center font-bold">
                {title && title}
            </h1>
        </div>
    </div>
  )
}

export default Head
