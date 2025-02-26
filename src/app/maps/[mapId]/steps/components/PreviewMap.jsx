"use client";

import React, { useRef, useCallback, useEffect, useContext } from "react";
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
  ConnectionLineType,
  Panel,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

const initialNodes = [];
const initialEdges = [];

// custom elements
import TextNode from "./TextNode";
import Link from "next/link";
import { ThemeContext } from "@/components/ThemeContext";
const nodeTypes = {
  inputType: TextNode,
};

const Preview = ({ mapId, steps }) => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const contextTheme = useContext(ThemeContext);
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

  // localstorage save and restore
  const { setViewport } = useReactFlow();

  useEffect(() => {
    if (steps) {
      setNodes(steps.data.nodes);
      setEdges(steps.data.edges);
      setViewport(steps.data.viewport);
    }
  }, []);

  return (
    <div id="app" className="w-screen h-full flex flex-col md:flex-row">
      <div className="flex-grow">
        <div style={{ width: "100vw", height: "100%" }} ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            fitView
            colorMode={
              ["dark", "luxury", ""].includes(contextTheme.theme)
                ? "dark"
                : "light"
            }
            nodeTypes={nodeTypes}
            defaultEdgeOptions={{ type: "smoothstep" }}
            nodesDraggable={false}
            nodesConnectable={false}
          >
            <Panel position="top-left" className="flex gap-2">
              <Link
                href={`/maps/${mapId}`}
                className="btn bg-error text-error-content"
              >
                Back
              </Link>
            </Panel>
            <Controls />
            <MiniMap />
            <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
          </ReactFlow>
        </div>
      </div>
    </div>
  );
};

export function PreviewMap({ mapId, steps }) {
  console.log(steps);
  return (
    <ReactFlowProvider>
      <Preview mapId={mapId} steps={steps} />
    </ReactFlowProvider>
  );
}
