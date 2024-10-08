import React, { useState, useEffect } from 'react'
import { PostCard } from '../components'
import appwriteService from "../appwrite/config"
import { useSelector } from 'react-redux'
import Masonry from 'react-masonry-css'

export default function Home() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const userStatus = useSelector(state => state.auth.status)

  useEffect(() => {
    setLoading(true)
    appwriteService.getPosts([])
      .then((posts) => {
        if (posts) {
          setPosts(posts.documents)
        }
      })
      .finally(() => setLoading(false))
  }, [])

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  if (posts.length === 0 && !userStatus) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold hover:text-gray-500">
            Login to read posts
          </h1>
        </div>
      </div>
    )
  }

  return (
    <div className='w-full py-8 px-4 sm:px-6 lg:px-8'>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="flex w-auto"
        columnClassName="bg-clip-padding"
      >
        {posts.map((post) => (
          <div key={post.$id} className="mb-4 p-2">
            <PostCard {...post} />
          </div>
        ))}
      </Masonry>
    </div>
  )
}