import type { Edge, Node } from 'reactflow';

export interface MasterView {
  /** The name of the root view as it appears in postgres - conventially all query views have a prefix q_ - the root will not have a __<role> suffix */
  name: string;
  /** Must be unique in the tree - adding it incase views appear in multiple places in the tree */
  label?: string;
  description?: string;
  children?: MasterView[];
}

const Tree = [
  {
    name: 'q_organization',
    label: 'organization',
    description:
      "Your organization's info. This may contain sensitive internal data that only your internal staff should be able to access.",
    children: [
      {
        name: 'q_opportunity',
        label: 'opportunity',
        description:
          'This is the top level object for any loan/deal/opportunity that is in the system. If you org utilizes versioning, all versions exist within 1 opportunity.',
        children: [
          {
            name: 'q_deal',
            label: 'deal',
            description:
              'The main data object that contains all rating and pricing information for an opportunity. This can be versioned to produce multiple quotes for the same opportunity.',
            children: [
              {
                name: 'q_deal_user',
                description:
                  'The users that have been added to deal and can view its information (and by Extension the opportunity).',
                label: 'Deal Users',
              },
              {
                name: 'q_property',
                label: 'Property',
                description: 'The properties listed on the deal.',
              },
            ],
          },
        ],
      },
      {
        name: 'q_underwriter',
        label: 'underwriter',
        description:
          'The properties of any user in the system. This includes agents, borrowers, underwriters, etc.',
      },
      {
        name: 'q_organization_admin',
        label: 'Admin',
        description:
          'The properties of any user in the system. This includes agents, borrowers, underwriters, etc.',
      },
      {
        name: 'q_borrower',
        label: 'borrower',
        description:
          'The properties of any user in the system. This includes agents, borrowers, underwriters, etc.',
      },
      {
        name: 'q_agent',
        label: 'agent',
        description:
          'The properties of any user in the system. This includes agents, borrowers, underwriters, etc.',
      },
      {
        name: 'q_auditor',
        label: 'auditor',
        description:
          'The properties of any user in the system. This includes agents, borrowers, underwriters, etc.',
      },
    ],
  },
] satisfies MasterView[];

export type DataTreeShape = typeof Tree;

const position = { x: 0, y: 0 };

// Recursive function to collect all TreeTables and Edges
function collectAllTreeTablesAndEdges(tree: MasterView[]): {
  reactFlowNodes: Node[];
  reactFlowEdges: Edge[];
} {
  const result: Node[] = [];
  const edges: Edge[] = [];

  function traverse(view: MasterView, parent?: Node) {
    // Add the current node to the result
    const reactFlowNode = {
      type: 'masterView',
      data: { view, hasParent: !!parent },
      id: view.name,
      position,
    };
    result.push(reactFlowNode);

    // If there's a parent, create an edge between the parent and the current node
    if (parent) {
      edges.push({
        id: parent.id + view.name, // Unique ID for the edge
        source: parent.id, // Parent viewName
        target: view.name, // Child viewName
      });
    }

    // If the node has children, recursively process them
    if (view.children) {
      for (const child of view.children) traverse(child, reactFlowNode); // Pass the current node as the parent
    }
  }

  // Traverse each root node in the initial tree
  for (const node of tree) traverse(node);

  return { reactFlowNodes: result, reactFlowEdges: edges };
}

export default {
  tree: Tree,
  ...collectAllTreeTablesAndEdges(Tree),
};
