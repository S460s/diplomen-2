import { useTransition, useOptimistic, useState } from "react";
import { likeMap, unlikeMap } from "../actions";

export function Like({ data, mapId }: { data: { likes: number, liked: boolean }, mapId: number }) {

    const [likes, setLikes] = useState(data.likes)
    const [optimisticLike, setOptimisticLike] = useOptimistic<
        {
            liked: boolean;
            likes: number;
        },
        number
    >(data, (state, newLike) => {
        return { likes: state.likes + newLike, liked: newLike > 0 };
    });


    const [isPending, startTransition] = useTransition();

    const like = () => {
        startTransition(async () => {
            setOptimisticLike(1);
            await likeMap(mapId)
        })
    };

    const dislike = () => {
        startTransition(async () => {
            setOptimisticLike(-1);
            await unlikeMap(mapId)
        })
    };

    console.log(data, mapId)

    return optimisticLike.liked ?
        <button onClick={dislike} className="btn">Dislike</button> :
        <button onClick={like} className="btn">Like</button>
}