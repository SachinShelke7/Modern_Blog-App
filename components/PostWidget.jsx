import moment from 'moment';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { getRecentPosts, getSimilarPosts } from  '../services'

const PostWidget = ({ categories, slug}) => {
    const [relatedPosts, setRelatedPosts] = useState([]);
    useEffect(() => {
        if(slug){
            getSimilarPosts(categories, slug)
            .then((result) => setRelatedPosts(result))
        } else {
            getRecentPosts()
            .then((result) => setRelatedPosts(result))
        }
    }, [slug])

    return (
        <div className='bg-white shadow-lg rounded-lg p-8 mb-8'>
            <h3 className='text-xl mb-8 font-semibold border-b pb-4'>
                {slug ? 'Realated Posts': 'Recent Post'}
            </h3>
            {relatedPosts.map((post) => (
                <div key={post.title} className='flex items-center w-full mb-mb-4'>
                    <div className='w-16 rounded-full flex-none'>
                        <img src={post.featuredImage.url} 
                        alt={post.title}
                        height="64px"
                        width="64px"
                        className='align-middle rounded-full' />
                    </div>
                    <div className='flex-grow ml-4'>
                        <p className='text-gray-500 font-xs'>{moment(post.createdAt).format('MMM DD,YYYY')}</p>
                        <Link href={`/posts/${post.slug}`} className="text-md" key={post.title}>
                            {post.title}
                        </Link>
                    </div>

                </div>
            ))}
        </div>
    )
}

export default PostWidget
