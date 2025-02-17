import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const InputNode = ({ data, isConnectable }) => {
    const { label } = data;
    const upper = label === 'output node' || label === 'default node';
    const lower = label === 'input node' || label === 'default node';

    const path = usePathname();
    console.log(path.split('/'));
    const mapId = path.split('/')[2];

    return (
        <>
            {upper && (
                <Handle
                    type="target"
                    position={Position.Top}
                    style={{ background: '#555' }}
                    onConnect={(params) => console.log('handle onConnect', params)}
                    isConnectable={isConnectable}
                />
            )}

            <Link
                href={{
                    pathname: `/learning-maps/${mapId}/preview/${data.id}`,
                    query: { title: data.value },
                }}
                id={`input_${data.id}`}
            >
                {data.value}
            </Link>

            {lower && (
                <Handle
                    type="source"
                    position={Position.Bottom}
                    id="a"
                    style={{ background: '#555' }}
                    isConnectable={isConnectable}
                />
            )}
        </>
    );
};
const InputNodeMemo = memo(InputNode);
export default InputNodeMemo;