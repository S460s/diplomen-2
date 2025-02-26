import React, { memo } from "react";
import { Handle, Position } from "@xyflow/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const InputNode = ({ data, isConnectable }) => {
  const { label } = data;
  const upper = label === "output node" || label === "default node";
  const lower = label === "input node" || label === "default node";

  const path = usePathname();
  console.log(path.split("/"));
  const mapId = path.split("/")[2];

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

      <div className="input-group flex justify-center items-center w-48 p-2 ">
        <Link
          href={{
            pathname: `/maps/${mapId}/preview/${data.id}`,
            query: { title: data.value },
          }}
          id={`input_${data.id}`}
        >
          {data.value}
        </Link>
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
