import { useGet } from "@/hooks/useGet";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/query")({
  component: Query,
});

function Query() {
  const { data, isFetching } = useGet<{
    full_name: string;
    description: string;
    subscribers_count: number;
    stargazers_count: number;
    forks_count: number;
  }>("https://api.github.com/repos/TanStack/query");
  return (
    <div>
      <div>
        <h1>{data?.full_name}</h1>
        <p>{data?.description}</p>
        <strong>👀 {data?.subscribers_count}</strong>{" "}
        <strong>✨ {data?.stargazers_count}</strong>{" "}
        <strong>🍴 {data?.forks_count}</strong>
        <div>{isFetching ? "Updating..." : ""}</div>
      </div>
    </div>
  );
}
