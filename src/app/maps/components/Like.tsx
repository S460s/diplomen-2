import { useOptimistic } from "react";
import { likeMap } from "../actions";

export function Like({ data, mapId }: { data: { likes: number, liked: boolean }, mapId: number }) {

    const [optimisticLike, setOptimisticLike] = useOptimistic<
        {
            liked: boolean;
            likes: number;
        },
        number
    >(data, (state, newLike) => {
        return { likes: state.likes + newLike, liked: !state.liked };
    });

    const like = async () => {
        setOptimisticLike(1);
    };

    const dislike = async () => {
        setOptimisticLike(-1);
    };

    console.log(data, mapId)

    return optimisticLike.liked ?
        <button className="btn">Dislike</button> :
        <button className="btn">Like</button>
}