// components/RoutesVisualizer.tsx
"use client";
import { useState, useEffect } from "react";
import { Handle, Position } from "@xyflow/react";

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
  reconnectEdge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import dagre from "@dagrejs/dagre";
import Link from "next/link";

const nodeWidth = 194;
const nodeHeight = 24;

function RouteNode({ data, id }) {
  console.log("RAN");
  return (
    <div className="rounded bg-white px-3 py-1 border shadow hover:bg-blue-100 transition">
      <Handle
        type="target"
        position={Position.Top}
        style={{ background: "#555" }}
      />
      <Link
        href={id.split("/app")[1]}
        className="text-blue-600 hover:underline"
      >
        {data.label}
      </Link>
      <Handle
        type="source"
        position={Position.Bottom}
        style={{ background: "#555" }}
      />
    </div>
  );
}

const nodeTypes = {
  linkNode: RouteNode,
};

function getLayoutedElements(nodes, edges) {
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));
  dagreGraph.setGraph({ rankdir: "TB" });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  const layoutedNodes = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    return {
      ...node,
      targetPosition: "top",
      sourcePosition: "bottom",
      // Shift from center anchor to top-left anchor.
      position: {
        x: nodeWithPosition.x - nodeWidth / 2,
        y: nodeWithPosition.y - nodeHeight / 2,
      },
    };
  });

  return { nodes: layoutedNodes, edges };
}

export default function RoutesVisualizer({
  nodes: initialNodes,
  edges: initialEdges,
}) {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  console.log(initialNodes);
  useEffect(() => {
    const withCustomType = initialNodes.map((node) => ({
      ...node,
      type:
        node.id.includes("[") || node.id.includes("edit")
          ? "default"
          : "linkNode",
    }));

    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
      withCustomType,
      initialEdges
    );

    setNodes(layoutedNodes);
    setEdges(layoutedEdges);
  }, [initialNodes, initialEdges]);

  return (
    <div className="h-screen w-full bg-gray-50">
      <header className="p-4 bg-white shadow-md">
        <h1 className="text-xl font-semibold">Next.js App Routes Visualizer</h1>
        <p className="text-sm text-gray-600">Flow of the application.</p>
      </header>
      <div className="h-[calc(100vh-100px)]">
        <ReactFlow nodeTypes={nodeTypes} nodes={nodes} edges={edges} fitView>
          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
}
