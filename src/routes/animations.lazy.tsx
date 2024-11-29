import { createLazyFileRoute } from "@tanstack/react-router";
import Image from "@/components/custom/image";
import AnimatedTabs from "@/components/custom/tabs";
import Loader from "@/components/ui/loader";

export const Route = createLazyFileRoute("/animations")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <Image src="https://picsum.photos/300" alt="img" fill isZoomed />
      <AnimatedTabs
        options={[
          { name: "Name", id: 1, content: "Content1" },
          { name: "Name2", id: 2, content: "Content2" },
          { name: "Long", id: 3, content: "Content3" },
          { name: "Long2", id: 4, content: "Content4" },
          { name: "Long3", id: 5, content: "Content5" },
          { name: "Long4", id: 6, content: "Content6" },
          { name: "Long5", id: 7, content: "Content7" },
          { name: "Long6 very long name", id: 8, content: "Content8" },
        ]}
      />
      <Loader />
    </div>
  );
}
