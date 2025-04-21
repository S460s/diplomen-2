import fs from "fs";
import path from "path";
import RoutesVisualizer from "./components/RoutesVisualizer";
import { cwd } from "process";
/**
 * Recursively reads a directory and builds a tree of route objects.
 * Only files named "page" with a .tsx or .jsx extension are considered routes.
 * Directories or files starting with "_" are ignored.
 * Each file node is marked as type "file". If a directory contains valid children,
 * it is marked as type "dir". (If a directory is a leaf, it will behave like a file.)
 */
function getRoutesTree(dir, baseRoute = "") {
  const items = fs.readdirSync(dir, { withFileTypes: true });
  let routes = [];

  items.forEach((item) => {
    if (item.isFile()) {
      const ext = path.extname(item.name);
      const name = path.basename(item.name, ext);
      if ((ext === ".tsx" || ext === ".jsx") && name === "page") {
        // For the root folder, baseRoute will be empty; in that case, use "/"
        const routePath = baseRoute || "/";
        routes.push({ route: routePath, children: [], type: "file" });
      }
    } else if (item.isDirectory() && !item.name.startsWith("_")) {
      const newBase =
        baseRoute === "" ? `/${item.name}` : `${baseRoute}/${item.name}`;
      const subDir = path.join(dir, item.name);
      const subRoutes = getRoutesTree(subDir, newBase);
      if (subRoutes.length > 0) {
        // If the directory has children, mark it as "dir"
        routes.push({ route: newBase, children: subRoutes, type: "dir" });
      } else {
        // If no valid children, you may choose to ignore it
        // Or, if you want to include it as a leaf, mark it as a file:
        // routes.push({ route: newBase, children: [], type: 'file' });
      }
    }
  });

  return routes;
}

/**
 * Flattens the routes tree into nodes and edges for React Flow.
 * - Nodes get a temporary position (to be recalculated by dagre).
 * - The root "/" node is always first.
 * - If a node is of type "file" (leaf), it will not have any children (and thus no outgoing edges).
 */
function flattenRoutes(
  routesTree,
  parentId = null,
  level = 0,
  indexOffset = 0
) {
  let nodes = [];
  let edges = [];
  let index = indexOffset;

  routesTree.forEach((routeObj) => {
    const id = routeObj.route; // use route string as unique id
    // Temporary position based on level and order.
    const x = level * 200;
    const y = index * 100;
    nodes.push({
      id,
      data: { label: routeObj.route },
      position: { x, y },
      type: routeObj.type, // "file" or "dir"
    });
    // Do not create an incoming edge for the root "/"
    if (parentId && parentId !== "/") {
      // Only create an edge if the parent is a directory (i.e. it can have outgoing flows)
      console.log(routeObj);
      if (routeObj.type === "dir" || routeObj.route == "/") {
        edges.push({
          id: `${parentId}-${id}`,
          source: parentId,
          target: id,
          animated: true,
        });
      }
    }
    // Only flatten children if this node is a directory and has children.
    if (routeObj.type === "dir" && routeObj.children.length > 0) {
      const childFlatten = flattenRoutes(
        routeObj.children,
        id,
        level + 1,
        index + 1
      );
      nodes = nodes.concat(childFlatten.nodes);
      edges = edges.concat(childFlatten.edges);
      index += childFlatten.nodes.length;
    } else {
      index++;
    }
  });

  return { nodes, edges };
}

export default async function VisualizerPage() {
  // Use the "app" directory as the source for route extraction.
  const appDir = path.join(process.cwd(), `./src`);
  const routesTree = getRoutesTree(appDir);

  // Ensure the root "/" is at the beginning:
  const sortedTree = routesTree.sort((a, b) => (a.route === "/" ? -1 : 1));

  const { nodes, edges } = flattenRoutes(sortedTree);

  console.log(cwd());

  return (
    <div>
      <RoutesVisualizer nodes={nodes} edges={edges} />
    </div>
  );
}
