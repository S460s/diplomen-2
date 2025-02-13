'use client'

import React, { useCallback } from 'react';
import { useReactFlow } from '@xyflow/react';

export default function ContextMenu({
    id,
    top,
    left,
    right,
    bottom,
    ...props
}) {
    const { getNode, setNodes, addNodes, setEdges } = useReactFlow();

    // this is because there is a navbar at the top of the page which pushes the whole graph 40px down
    if (top) top -= 40;
    if (bottom) bottom += 40;

    const duplicateNode = useCallback(() => {
        const node = getNode(id);
        const position = {
            x: node.position.x + 50,
            y: node.position.y + 50,
        };

        addNodes({
            ...node,
            selected: false,
            dragging: false,
            id: `${node.id}-copy`,
            position,
        });
    }, [id, getNode, addNodes]);

    const deleteNode = useCallback(() => {
        setNodes((nodes) => nodes.filter((node) => node.id !== id));
        setEdges((edges) => edges.filter((edge) => edge.source !== id));
    }, [id, setNodes, setEdges]);
    return (
        <div
            style={{ top, left, right, bottom }}
            className="context-menu absolute bg-white border shadow-lg z-10"
            {...props}
        >
            <p className="m-2 text-center">
                <small>node: {id}</small>
            </p>
            <button
                onClick={duplicateNode}
                className="block w-full px-4 py-2 text-left hover:bg-gray-100"
            >
                duplicate
            </button>
            <button
                onClick={deleteNode}
                className="block w-full px-4 py-2 text-left hover:bg-gray-100"
            >
                delete
            </button>
        </div>
    );
}