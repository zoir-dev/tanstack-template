import { Link, Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <div className="p-2 flex gap-2 text-lg">
        <Link
          to="/"
          activeProps={{
            className: "font-bold",
          }}
        >
          Form
        </Link>
        <Link
          to="/params"
          activeProps={{
            className: "font-bold",
          }}
        >
          Param
        </Link>
        <Link
          to="/animations"
          activeProps={{
            className: "font-bold",
          }}
        >
          Animation
        </Link>
        <Link
          to="/query"
          activeProps={{
            className: "font-bold",
          }}
        >
          Query
        </Link>
      </div>
      <hr />
      <Outlet />
      <TanStackRouterDevtools position="bottom-right" />
    </>
  );
}
