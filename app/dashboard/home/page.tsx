import PostFeed from "../components/postFeed";
import { PostFeedTypeConstant } from "../constants/postFeedTypeConstant";

export default function HomePage () {
    return <PostFeed postFeedType={PostFeedTypeConstant.All}/>
}