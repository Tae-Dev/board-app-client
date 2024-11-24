import PostFeed from "../components/postFeed";
import { PostFeedTypeConstant } from "../constants/postFeedTypeConstant";

export default function OurBlogPage () {
    return <PostFeed postFeedType={PostFeedTypeConstant.Self}/>
}