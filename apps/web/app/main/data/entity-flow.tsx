'use client';

import {
  type Edge,
  type Node,
  ReactFlow,
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
  Controls,
  Position,
  Background,
  BackgroundVariant,
} from 'reactflow';
import 'reactflow/dist/style.css';
import dagre from '@dagrejs/dagre';
import { DataTree } from '@repo/utils';

import MasterViewNode from './master-view-node';

export const autoLayout = ({
  nodes,
  edges,
  direction = 'TB',
  nodeWidth = 100,
  nodeHeight = 100,
}: {
  nodes: Node[];
  edges: Edge[];
  direction?: 'TB' | 'LR';
  nodeWidth?: number;
  nodeHeight?: number;
}): { nodes: Node[]; edges: Edge[] } => {
  const isHorizontal = direction === 'LR';

  const dagreGraph = new dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));

  dagreGraph.setGraph({ rankdir: direction });

  for (const node of nodes) {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  }

  for (const edge of edges) {
    dagreGraph.setEdge(edge.source, edge.target);
  }

  dagre.layout(dagreGraph);

  const newNodes = nodes.map(node => {
    const nodeWithPosition = dagreGraph.node(node.id);
    const newNode = {
      ...node,
      targetPosition: isHorizontal ? Position.Left : Position.Top,
      sourcePosition: isHorizontal ? Position.Right : Position.Bottom,
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

const { nodes: initialNodes, edges: initialEdges } = autoLayout({
  nodes: DataTree.reactFlowNodes,
  edges: DataTree.reactFlowEdges,
  nodeWidth: 320,
  nodeHeight: 200,
  direction: 'LR',
});

const nodeTypes = {
  masterView: MasterViewNode,
};

export default function EntityFlow() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, sonarjs/sonar-no-unused-vars, sonarjs/no-dead-store
  const [nodes, setNodes, onNodesChange] = useNodesState([...initialNodes]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, sonarjs/sonar-no-unused-vars, sonarjs/no-dead-store
  const [edges, setEdges, onEdgesChange] = useEdgesState([...initialEdges]);

  return (
    <ReactFlowProvider>
      <div className="h-full w-full rounded-lg border">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          fitView
          nodeTypes={nodeTypes}
        >
          <Controls />
          <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
        </ReactFlow>
      </div>
    </ReactFlowProvider>
  );
}
