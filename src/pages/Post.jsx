import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/configg";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const [imageUrl, setImageUrl] = useState("");
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) {
                    setPost(post);
                    console.log(" Post data:", post);
                    
                    // Load image after post is set
                    if (post.featuredImage) {
                        const url = appwriteService.getFileView(post.featuredImage);
                        console.log(" Image URL:", url);
                        setImageUrl(url);
                    }
                } else {
                    navigate("/");
                }
            });
        } else {
            navigate("/");
        }
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                // Only delete file if it exists
                if (post.featuredImage) {
                    appwriteService.deleteFile(post.featuredImage);
                }
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-8">
            <Container>
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    {imageUrl ? (
                        <img
                            src={imageUrl}
                            alt={post.title}
                            className="rounded-xl w-70"
                            onError={(e) => {
                                console.error(" Image failed to load, trying fallback...");
                                //  Fallback to preview if view fails
                                const fallbackUrl = appwriteService.getFilePreview(post.featuredImage);
                                if (fallbackUrl) {
                                    e.target.src = fallbackUrl;
                                }
                            }}
                        />
                    ) : (
                        <div className="w-full max-w-4xl h-64 bg-gray-200 rounded-xl flex items-center justify-center">
                            <span className="text-gray-500">Loading image...</span>
                        </div>
                    )}

                    {isAuthor && (
                        <div className="absolute right-6 top-6 flex gap-2">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="hover:bg-green-600">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost} className="hover:bg-red-600">
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css">
                    {parse(post.content)}
                </div>
            </Container>
        </div>
    ) : null;
}
