import React, { useCallback, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/configg";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);
    const [previewUrl, setPreviewUrl] = useState("");

    useEffect(() => {
        if (post?.featuredImage) {
            const urlObj = appwriteService.getFilePreview(post.featuredImage);
            setPreviewUrl(urlObj.href);
        }
    }, [post]);

    const submit = async (data) => {
    try {
        let file = null;

        if (data.image && data.image[0]) {
            console.log(" Starting file upload...");
            
            file = await appwriteService.uploadFile(data.image[0]);
            
            if (!file) {
                throw new Error("File upload failed - no response from server");
            }

            console.log(" File uploaded successfully, file ID:", file.$id);

            // delete old image when updating
            if (post?.featuredImage) {
                console.log(" Deleting old image:", post.featuredImage);
                await appwriteService.deleteFile(post.featuredImage);
            }
        } else {
            console.log(" No new file selected");
        }

        const postData = {
            title: data.title,
            slug: data.slug,
            content: data.content,
            status: data.status,
            featuredImage: file ? file.$id : post?.featuredImage,
        };

        console.log(" Saving post data:", postData);

        let dbPost;
        if (post) {
            dbPost = await appwriteService.updatePost(post.$id, postData);
        } else {
            dbPost = await appwriteService.createPost({
                ...postData,
                userId: userData.$id,
            });
        }

        if (dbPost) {
            console.log(" Post saved successfully");
            navigate(`/post/${dbPost.$id}`);
        } else {
            throw new Error("Failed to save post to database");
        }
    } catch (err) {
        console.error(" Error submitting post:", err);
        alert(`Error: ${err.message}`);
    }
};

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string") {
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z0-9\s]/g, "-")
                .replace(/\s+/g, "-");
        }
        return "";
    }, []);

 // Load preview image correctly
useEffect(() => {
    const loadPreview = async () => {
        if (post?.featuredImage) {
            try {
                // First try getFileView for direct image access
                const url = appwriteService.getFileView(post.featuredImage);
                console.log(" Generated image URL:", url);
                
                if (url) {
                    setPreviewUrl(url);
                } else {
                    // Fallback to getFilePreview
                    const previewUrl = appwriteService.getFilePreview(post.featuredImage);
                    console.log(" Fallback to preview URL:", previewUrl);
                    setPreviewUrl(previewUrl);
                }
            } catch (error) {
                console.error(" Error generating image URL:", error);
                setPreviewUrl("");
            }
        } else {
            setPreviewUrl("");
        }
    };

    loadPreview();
}, [post]);

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />

                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) =>
                        setValue("slug", slugTransform(e.target.value), {
                            shouldValidate: true,
                        })
                    }
                />

                <RTE
                    label="Content :"
                    name="content"
                    control={control}
                    defaultValue={getValues("content")}
                />
            </div>

            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />

                {previewUrl && (
                    <div className="w-full mb-4">
                        <img
                            src={previewUrl}
                            alt={post?.title}
                            className="rounded-lg w-full"
                        />
                    </div>
                )}

                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />

                <Button
                    type="submit"
                    bgColor={post ? "bg-green-500" : undefined}
                    className="w-full"
                >
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}
