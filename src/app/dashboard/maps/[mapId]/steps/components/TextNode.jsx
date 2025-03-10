import React, { memo } from "react";
import { Handle, Position } from "@xyflow/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const InputNode = ({ data, isConnectable }) => {
  const { label } = data;
  const upper = label === "output node" || label === "default node";
  const lower = label === "input node" || label === "default node";

  const path = usePathname();
  const mapId = path.split("/")[2];

  return (
    <div className="flex gap-1">
      {upper && (
        <Handle
          type="target"
          position={Position.Top}
          isConnectable={isConnectable}
        />
      )}

      <div
        className={clsx(
          "input-group flex justify-center items-center w-48 p-2 gap-2",
          data.isCompleted && "bg-primary text-primary-content"
        )}
      >
        <Link
          href={{
            pathname: `/maps/${mapId}/preview/${data.id}`,
            query: { title: data.value },
          }}
          id={`input_${data.id}`}
        >
          {data.value}
        </Link>
        {data.isCompleted && (
          <span className="icon-[mdi--check-bold] size-4"></span>
        )}
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
