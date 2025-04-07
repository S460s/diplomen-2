// app/visualizer/page.js
import fs from "fs";
import path from "path";
import RoutesVisualizer from "./components/RoutesVisualizer";

/**
 * Recursively read the directory and build a tree of route objects.
 * In the Next.js App Router, a file named "page" (e.g. page.js) represents the route for that folder.
 * Files or directories starting with an underscore (_) are ignored.
 */
function getRoutesTree(dir, baseRoute = "") {
  const items = fs.readdirSync(dir, { withFileTypes: true });
  let routes = [];

  for (const item of items) {
    if (item.isFile()) {
      const ext = path.extname(item.name);
      const name = path.basename(item.name, ext);
      // Only include files named "page" with .tsx or .jsx extension.
      if ((ext === ".tsx" || ext === ".jsx") && name === "page") {
        const routePath = baseRoute || "/";
        routes.push({ route: routePath, children: [] });
      }
    } else if (item.isDirectory() && !item.name.startsWith("_")) {
      // Build the new base route for the subdirectory.
      const newBase =
        baseRoute === "" ? `/${item.name}` : `${baseRoute}/${item.name}`;
      const subDir = path.join(dir, item.name);
      const subRoutes = getRoutesTree(subDir, newBase);
      // Optionally add the folder as a route if it contains a page file.
      if (subRoutes.length > 0) {
        routes.push({ route: newBase, children: subRoutes });
      }
    }
  }

  return routes;
}

/**
 * Flatten the routes tree into nodes and edges for React Flow.
 * Here, nodes are positioned based on the nesting level (x coordinate) and order (y coordinate).
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
    const id = routeObj.route; // Use the route string as the unique id
    const x = level * 200;
    const y = index * 100;
    nodes.push({ id, data: { label: routeObj.route }, position: { x, y } });
    if (parentId) {
      edges.push({
        id: `${parentId}-${id}`,
        source: parentId,
        target: id,
        animated: true,
      });
    }
    if (routeObj.children && routeObj.children.length > 0) {
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
  // Path to your app directory (adjust if necessary)
  const appDir = path.join(process.cwd(), "./src/app");
  const routesTree = getRoutesTree(appDir);
  const { nodes, edges } = flattenRoutes(routesTree);

  return (
    <div>
      {/* Pass the extracted structure to the client component */}
      <RoutesVisualizer nodes={nodes} edges={edges} />
    </div>
  );
}
