"use client";

import React, { memo } from "react";
import { Handle, Position } from "@xyflow/react";
import Link from "next/link";
import { useParams } from "next/navigation";

const InputNode = ({ data, isConnectable }) => {
  const { label, id } = data;
  const upper = label === "output node" || label === "default node";
  const lower = label === "input node" || label === "default node";
  const params = useParams();

  console.log("DATA", data);

  return (
    <div className="flex gap-1">
      {upper && (
        <Handle
          type="target"
          position={Position.Top}
          onConnect={(params) => console.log("handle onConnect", params)}
          isConnectable={isConnectable}
        />
      )}

      <div className="input-group w-48">
        <span className="input-group-text"></span>
        <input
          className="input"
          type="text"
          onChange={data.onChange}
          placeholder="Title"
          id={`input_${id}`}
          data-step-input
          defaultValue={data.value}
        />
        <label className="sr-only" htmlFor={`input_${id}`}>
          Enter title
        </label>

        <span className="input-group-text">
          <Link
            href={`/maps/${params.mapId}/steps/${id}`}
            className="flex items-center justify-center"
          >
            <span className="icon-[mdi--lead-pencil] size-5"></span>
          </Link>
        </span>
      </div>

      {lower && (
        <Handle
          type="source"
          position={Position.Bottom}
          id="a"
          isConnectable={isConnectable}
        />
      )}
    </div>
  );
};
const InputNodeMemo = memo(InputNode);
export default InputNodeMemo;
