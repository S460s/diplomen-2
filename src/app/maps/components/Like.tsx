import { useTransition, useOptimistic, useState } from "react";
import { likeMap, unlikeMap } from "../actions";

export function Like({ data, mapId }: { data: { likes: number, liked: boolean }, mapId: number }) {

    const [{ likes, liked }, setLikes] = useState({ likes: data.likes, liked: data.liked })

    const like = async () => {
        setLikes((prevState) => ({ liked: true, likes: prevState.likes + 1 }))
        await likeMap(mapId);
    };

    const dislike = async () => {
        setLikes((prevState) => ({ liked: false, likes: prevState.likes - 1 }))
        await unlikeMap(mapId);
    };

    console.log(data, mapId)

    return liked ?
        <button onClick={dislike} className="btn">{likes}
            <span className="icon-[prime--heart-fill] size-10 bg-primary"></span>
        </button> :
        <button onClick={like} className="btn">{likes}
            <span className="icon-[prime--heart] size-10 bg-primary"></span>
        </button>
}