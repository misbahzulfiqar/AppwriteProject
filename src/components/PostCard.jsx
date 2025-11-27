import React from 'react'
import appwriteService from "../appwrite/configg"
import {Link} from 'react-router-dom'

function PostCard({$id, title, featuredImage}) {
    
  return (
    <Link to={`/post/${$id}`}>
        <div className='w-full bg-gray-100 rounded-xl p-4'>
            <div className='w-full justify-center mb-4'>
                <img 
                    src={appwriteService.getFileView(featuredImage)} 
                    alt={title}
                    className='rounded-xl w-full h-48 object-cover'
                    onError={(e) => {
                        console.error("Image failed to load");
                        // Optional: set a fallback image
                        e.target.src = '/fallback-image.jpg';
                    }}
                />
            </div>
            <h2 className='text-xl font-bold'>{title}</h2>
        </div>
    </Link>
  )
}

export default PostCard