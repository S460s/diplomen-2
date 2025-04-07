// components/RoutesVisualizer.tsx
"use client";
import { useState, useEffect } from "react";
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

const nodeWidth = 194;
const nodeHeight = 24;

function getLayoutedElements(nodes, edges) {
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));
  // Set graph direction "TB" means top-to-bottom.
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
      // Shift position from center anchor to top-left anchor.
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

  // Compute layout using dagre once on mount.
  useEffect(() => {
    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
      initialNodes,
      initialEdges
    );
    setNodes(layoutedNodes);
    setEdges(layoutedEdges);
  }, [initialNodes, initialEdges]);

  return (
    <div className="h-screen w-full bg-gray-50">
      <header className="p-4 bg-white shadow-md">
        <h1 className="text-xl font-semibold">Next.js App Routes Visualizer</h1>
        <p className="text-sm text-gray-600">
          Only page.tsx/page.jsx files are included. Nodes ordered using dagre.
        </p>
      </header>
      <div className="h-[calc(100vh-100px)]">
        <ReactFlow nodes={nodes} edges={edges} fitView>
          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
}
