import React, {useEffect, useState} from 'react'
import {Container, PostForm} from '../components'
import appwriteService from "../appwrite/configg";
import { useNavigate, useParams } from 'react-router-dom';

function EditPost() {
    const [post, setPost] = useState(null)
    const [loading, setLoading] = useState(true)
    const {slug} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        const fetchPost = async () => {
            if (slug) {
                try {
                    setLoading(true)
                    const postData = await appwriteService.getPost(slug)
                    console.log("EditPost - Fetched post:", postData)
                    
                    if (postData) {
                        setPost(postData)
                        console.log(" EditPost - FeaturedImage ID:", postData.featuredImage)
                    } else {
                        console.error(" Post not found")
                        navigate('/')
                    }
                } catch (error) {
                    console.error(" Error fetching post:", error)
                    navigate('/')
                } finally {
                    setLoading(false)
                }
            } else {
                navigate('/')
            }
        }

        fetchPost()
    }, [slug, navigate])

    if (loading) {
        return (
            <div className='py-8'>
                <Container>
                    <div className="text-center">Loading...</div>
                </Container>
            </div>
        )
    }

    return post ? (
        <div className='py-8'>
            <Container>
                <PostForm post={post} />
            </Container>
        </div>
    ) : null
}

export default EditPost