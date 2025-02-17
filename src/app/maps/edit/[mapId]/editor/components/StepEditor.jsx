'use client';
import React, { useRef, useCallback, useState, useEffect, useContext } from 'react';
import {
    ReactFlow,
    ReactFlowProvider,
    addEdge,
    useNodesState,
    useEdgesState,
    MiniMap,
    Controls,
    Background,
    useReactFlow,
    BackgroundVariant,
    Panel,
    ConnectionLineType,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { nanoid } from 'nanoid';

import { saveMapData } from '../actions';

import 'notyf/notyf.min.css';
import 'notyf/notyf.es'


// dagre stuff (positioning) https://reactflow.dev/examples/layout/dagre
import dagre from '@dagrejs/dagre';
const dagreGraph = new dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));

const nodeWidth = 194;
const nodeHeight = 24;

const getLayoutedElements = (nodes, edges) => {
    dagreGraph.setGraph({ rankdir: 'TB' });

    nodes.forEach((node) => {
        dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
    });

    edges.forEach((edge) => {
        dagreGraph.setEdge(edge.source, edge.target);
    });

    dagre.layout(dagreGraph);

    const newNodes = nodes.map((node) => {
        const nodeWithPosition = dagreGraph.node(node.id);
        const newNode = {
            ...node,
            targetPosition: 'top',
            sourcePosition: 'bottom',
            // We are shifting the dagre node position (anchor=center center) to the top left
            // so it matches the React Flow node anchor point (top left).
            position: {
                x: nodeWithPosition.x - nodeWidth / 2,
                y: nodeWithPosition.y - nodeHeight / 2,
            },
        };

        return newNode;
    });

    return { nodes: newNodes, edges };
};


const initialId = nanoid();
const initialNodes = [
    {
        id: initialId,
        type: 'inputType',
        data: { label: 'input node', id: initialId, value: '' },
        position: { x: 0, y: 0 },
    },
];
const initialEdges = [];

// custom elements
import InputType from './InputNode';
const nodeTypes = {
    inputType: InputType,
};

import ContextMenu from './ContextMenu';
import { notyfContext } from '../../components/Notyf'
import { ThemeContext } from '@/components/ThemeContext';

const Editor = ({ mapId, steps }) => {
    let notyf = null
    try {
        // notyf = new Notyf({ duration: 1000 })
        notyf = useContext(notyfContext)
    } catch (err) {
        console.log('[ERROR] cannot render notyf')
    }
    console.log(notyf)


    const flowkey = `steps${mapId}`;
    const reactFlowWrapper = useRef(null);
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const { screenToFlowPosition, fitView } = useReactFlow();
    console.log(mapId);

    const onConnect = useCallback(
        (params) =>
            setEdges((eds) => {
                return addEdge(
                    {
                        ...params,

                        type: ConnectionLineType.SmoothStep,
                        animated: true,
                    },
                    eds
                );
            }),
        [setEdges]
    );

    // Context Menu
    const [menu, setMenu] = useState(null);
    const menuRef = useRef(null);
    const onNodeContextMenu = useCallback(
        (event, node) => {
            event.preventDefault();

            const pane = menuRef.current.getBoundingClientRect();
            setMenu({
                id: node.id,
                top: event.clientY < pane.height - 200 && event.clientY,
                left: event.clientX < pane.width - 200 && event.clientX,
                right: event.clientX >= pane.width - 200 && pane.width - event.clientX,
                bottom:
                    event.clientY >= pane.height - 200 && pane.height - event.clientY,
            });
        },
        [setMenu]
    );
    const onPaneClick = useCallback(() => setMenu(null), [setMenu]); // close menu if open on click

    // localstorage save and restore
    const [rfInstance, setRfInstance] = useState(null);
    const { setViewport } = useReactFlow();

    const contextTheme = useContext(ThemeContext)
    console.log('THEME: ', contextTheme)

    const onCacheSave = useCallback(() => {
        if (rfInstance) {
            const flow = rfInstance.toObject();
            const inputs = document.querySelectorAll('[data-step-input]'); // get the inputs as they are not controlled

            // TODO: care about good code and performance
            inputs.forEach((input) => {
                const id = input.id.slice(6);
                const currentNode = flow.nodes.find((n) => n.id === id);
                currentNode.data.value = input.value;
            });

            localStorage.setItem(flowkey, JSON.stringify(flow));
            notyf?.success('Cached!')

        }
    }, [rfInstance]);

    const onRestore = useCallback(() => {
        const restoreFlow = async () => {
            const flow = JSON.parse(localStorage.getItem(flowkey));

            if (flow) {
                const { x = 0, y = 0, zoom = 1 } = flow.viewport;
                setNodes(flow.nodes || []);
                setEdges(flow.edges || []);
                setViewport({ x, y, zoom });
            }
        };
        restoreFlow();
        fitView() // add duration if you can figure out how to go from the correct position

    }, [setNodes, setViewport]);

    useEffect(() => {
        if (steps?.data) {
            // load data from database
            setNodes(steps.data.nodes);
            setEdges(steps.data.edges);
            setViewport(steps.data.viewport);
        } else {
            // load steps from local storage
            onRestore();
        }
    }, []);

    // dragging
    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [type, setType] = useState(null);
    const onDragStart = (event, nodeType) => {
        setType(nodeType);
        event.dataTransfer.effectAllowed = 'move';
    };

    const onDrop = useCallback(
        (event) => {
            event.preventDefault();

            if (!type) {
                return;
            }

            const position = screenToFlowPosition({
                x: event.clientX,
                y: event.clientY,
            });
            const id = nanoid();
            const newNode = {
                id,
                type: 'inputType',
                position,
                data: { label: `${type} node`, id },
            };

            setNodes((nds) => [...nds, newNode]);
        },
        [screenToFlowPosition, type]
    );

    // dagre
    const onLayout = useCallback(() => {
        const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
            nodes,
            edges
        );

        setNodes([...layoutedNodes]);
        setEdges([...layoutedEdges]);
    }, [nodes, edges]);

    return (
        <div id="app" className="w-screen h-full flex flex-col md:flex-row">
            <div className="flex-grow">
                <div style={{ width: '100vw', height: '100%' }} ref={reactFlowWrapper}>
                    <ReactFlow
                        ref={menuRef}
                        onPaneClick={onPaneClick}
                        nodes={nodes}
                        edges={edges}
                        onNodesChange={onNodesChange}
                        onEdgesChange={onEdgesChange}
                        onConnect={onConnect}
                        onDrop={onDrop}
                        onDragOver={onDragOver}
                        onInit={setRfInstance}
                        colorMode={['dark', 'luxury', ''].includes(contextTheme.theme) ? 'dark' : 'light'}
                        onNodeContextMenu={onNodeContextMenu}
                        fitView
                        nodeTypes={nodeTypes}
                        defaultEdgeOptions={{ type: 'smoothstep' }}
                    >
                        <Controls />
                        <MiniMap />
                        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
                        {menu && <ContextMenu onClick={onPaneClick} {...menu} />}

                        <Panel position="top-right" className="flex gap-2">
                            <button className='btn' onClick={onCacheSave}>Cache</button>
                            <button className='btn' onClick={onRestore}>Restore</button>
                            <button className='btn' onClick={onLayout}>Order</button>
                            <form action="">
                                <button
                                    className='btn'
                                    formAction={async () => {
                                        if (rfInstance) {
                                            const flow = rfInstance.toObject();
                                            const inputs =
                                                document.querySelectorAll('[data-step-input]'); // get the inputs as they are not controlled

                                            // TODO: care about good code and performance
                                            console.log('[DEBUG] saving map data')
                                            inputs.forEach((input) => {
                                                const id = input.id.slice(6);
                                                const currentNode = flow.nodes.find((n) => n.id === id);
                                                currentNode.data.value = input.value;
                                            });

                                            notyf?.success('Saved!')
                                            await saveMapData(flow, mapId)
                                        }
                                    }}
                                >
                                    Save in DB
                                </button>
                            </form>
                        </Panel>

                        <Panel position="top-left" className="flex gap-2">
                            <button
                                className='btn'
                                onDragStart={(event) => onDragStart(event, 'input')}
                                draggable
                            >
                                Start Node
                            </button>
                            <button
                                className='btn'
                                onDragStart={(event) => onDragStart(event, 'default')}
                                draggable
                            >
                                Middle Node
                            </button>
                            <button
                                className='btn'
                                onDragStart={(event) => onDragStart(event, 'output')}
                                draggable
                            >
                                End Node
                            </button>
                        </Panel>
                    </ReactFlow>
                </div>
            </div>
        </div>
    );
};

export default function StepEditor({ mapId, steps }) {
    console.log(steps);
    return (
        <ReactFlowProvider>
            <Editor mapId={mapId} steps={steps} />
        </ReactFlowProvider>
    );
}