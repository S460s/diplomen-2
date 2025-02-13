import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

const InputNode = ({ data, isConnectable }) => {
    const { label, id } = data;
    const upper = label === 'output node' || label === 'default node';
    const lower = label === 'input node' || label === 'default node';
    const params = useParams();

    console.log('DATA');
    console.log(data);
    console.log(params);
    return (
        <div className="flex gap-1">
            {upper && (
                <Handle
                    type="target"
                    position={Position.Top}
                    style={{ background: '#555' }}
                    onConnect={(params) => console.log('handle onConnect', params)}
                    isConnectable={isConnectable}
                />
            )}

            <input
                type="text"
                onChange={data.onChange}
                placeholder="SPGE ne stava"
                id={`input_${id}`}
                data-step-input
                defaultValue={data.value}
            />

            <Link href={`/learning-maps/edit/${params.id}/steps/${id}`}>
                edit
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
        </div>
    );
};
const InputNodeMemo = memo(InputNode);
export default InputNodeMemo;