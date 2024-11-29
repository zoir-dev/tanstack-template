import { useEffect, useRef, useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ClassNameValue } from "tailwind-merge";
import { cn } from "@/lib/utils";

export default function AnimatedTabs({
  options,
  value,
  setValue,
  returnValue = "id",
  header,
  listClassName,
}: TabsProps) {
  const tabRef = useRef<HTMLDivElement | null>(null);
  const [currentTab, setCurrentTab] = useState<number | string>(
    value || options?.[0]?.[returnValue]
  );
  const [indicatorStyle, setIndicatorStyle] = useState({ width: 0, left: 0 });

  const updateIndicator = () => {
    if (tabRef.current) {
      const activeTab = tabRef.current.querySelector(
        `button[data-index="${value || currentTab}"]`
      );
      if (activeTab) {
        const { width, left } = (
          activeTab as HTMLElement
        ).getBoundingClientRect();
        const parentLeft = tabRef.current.getBoundingClientRect().left;
        setIndicatorStyle({ width, left: left - parentLeft });
      }
    }
  };

  useEffect(() => {
    updateIndicator();
    const resizeObserver = new ResizeObserver(updateIndicator);
    if (tabRef.current) {
      resizeObserver.observe(tabRef.current as Element);
    }
    return () => resizeObserver.disconnect();
  }, [currentTab, options, value]);

  return (
    <Tabs
      defaultValue={options[0]?.id.toString()}
      value={value?.toString() || currentTab.toString()}
      className="relative overflow-auto"
      ref={tabRef}
      onValueChange={(value) => {
        setCurrentTab(value);
        setValue?.(Number.isNaN(+value) ? value : +value);
      }}
    >
      <div
        className={cn("flex items-center w-max overflow-auto", listClassName)}
      >
        <TabsList className="relative flex items-center justify-between overflow-hidden">
          {options.map((t, i) => (
            <TabsTrigger
              key={i}
              data-index={t?.[returnValue]}
              value={t.id.toString()}
              className="data-[state=active]:bg-transparent data-[state=active]:text-background duration-300 z-10 ease-out"
            >
              {t.name}
            </TabsTrigger>
          ))}
          <div
            className="absolute top-1 h-8 bg-primary rounded-md [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] duration-300 -ml-1"
            style={{
              width: `${indicatorStyle.width}px`,
              transform: `translateX(${indicatorStyle.left}px)`,
            }}
          />
        </TabsList>
        {header}
      </div>
      {options?.map((t) => (
        <TabsContent key={t.id} value={t.id.toString()}>
          {t.content}
        </TabsContent>
      ))}
    </Tabs>
  );
}

interface TabsProps {
  options: {
    name: string | number;
    id: string | number;
    content?: React.ReactNode;
  }[];
  value?: string | number;
  setValue?: (val: string | number) => void;
  returnValue?: "name" | "id";
  header?: React.ReactNode;
  listClassName?: ClassNameValue;
}
