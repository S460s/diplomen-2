"use client";

import React, { useCallback } from "react";
import { useReactFlow } from "@xyflow/react";
import { deleteStep } from "../actions";
import { saveStep } from "@/app/maps/[mapId]/steps/[stepId]/actions";

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
  if (top) top -= 58;
  if (bottom) bottom += 58;

  //[deprecated]
  const duplicateNode = useCallback(async () => {
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

  const deleteNode = useCallback(async () => {
    setNodes((nodes) => nodes.filter((node) => node.id !== id));
    setEdges((edges) => edges.filter((edge) => edge.source !== id));
    await deleteStep(id);
  }, [id, setNodes, setEdges]);

  // removed the duplicate functionalirty
  return (
    <div
      style={{ top, left, right, bottom }}
      className="context-menu absolute border z-10 bg-primary"
      {...props}
    >
      <p className="m-2 text-center">
        <small>node: {id}</small>
      </p>
      <div className="flex flex-col">
        <button onClick={deleteNode} className="btn m-2">
          delete
        </button>
      </div>
    </div>
  );
}
