import { Models } from "appwrite";
import { Link } from 'react-router-dom';
import { timeAgo } from "@/lib/utils";
import { useUserContext } from "@/context/AuthContext";
import PostStats from "./PostStats";
type PostCardProps = {
    post : Models.Document
}

const PostCard = ({post} : PostCardProps) => {

    const { user } = useUserContext() 
    if(!post.creator){
        console.error("No post creator found. ");
        return;
    }

    return (
        <div className='post-card'>
            <div className='flex-between'>
                <div className='flex items-center gap-3'>
                    <Link to={`/profile/`}>
                        <img 
                            alt="post-creator"
                            className="rounded-full w-12 lg:h-12"
                            src={post?.creator?.imageUrl || '/assets/icons/profile-placeholder.svg'}
                        />
                    </Link>
                    <div className="flex flex-col">
                        <p className="base-medium lg:body-bold text-dark-1">
                            {post.creator.name}
                        </p>
                        <div className='flex-center gap-2 text-dark-3'>
                            <p className="subtle-semibold lg:small-regular">
                                {timeAgo(post.$createdAt)}
                            </p>
                            -
                            <p className='subtle-semibold lg:small-regular'>
                                {post.location}
                            </p>
                        </div>
                    </div>
                </div>
                <Link to={`/update-post/${post.$id}`}>
                    <img 
                        className={`${user.id !== post.creator.$id && "hidden"}`}
                        src="/assets/icons/edit.svg"
                        width={20}
                        height={20}
                        alt="edit"
                    />
                </Link>
            </div>
            <Link to={`/posts/${post.$id}`}>
                <div className='small-medium lg:base-medium py-5'>
                    <p>{post.caption}</p>
                    <ul className="flex gap-1 mt-2">
                            <li className="text-dark-1">
                                #{post.tags}
                            </li>
                    </ul>
                </div>

                <img 
                    src={post.imageURL || '/assets/icons/profile-placeholder.svg'}
                    className='post-card_img'
                    alt="post-image"      
                />
            </Link>

            <PostStats post={post} userId={user.id}/>
        </div>
    )
}

export default PostCard