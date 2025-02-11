'use client';

import { dislikeMap, likeMap } from '../actions';
import { useOptimistic } from 'react';

export function Like({
    likes = 0,
    mapId,
    liked,
}: {
    likes: number;
    mapId: number;
    liked: boolean;
}) {
    const data = { likes, liked };

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
        const boundLike = likeMap.bind(null, mapId);
        setOptimisticLike(1);
        await boundLike();
    };

    const dislike = async () => {
        const boundDislike = dislikeMap.bind(null, mapId);
        setOptimisticLike(-1);
        await boundDislike();
    };

    return (
        <form className="flex justify-start content-center gap-1">
            {optimisticLike.liked ? (
                <button formAction={dislike} className="btn">
                    Like {optimisticLike.likes}
                </button>
            ) : (
                <button formAction={like} className="btn">
                    Liked {optimisticLike.likes}
                </button>
            )}
        </form>
    );
}