"use client";
import {
  CheckSquare,
  CheckSquareIcon,
  HashIcon,
  LineChartIcon,
  LucideIcon,
  MoreHorizontalIcon,
  TimerIcon,
} from "lucide-react";

import { AddMetric } from "./add-metric";
import { trpc } from "@/lib/trpc";
import { useParams } from "next/navigation";

export const Metrics = () => {
  let { experimentId } = useParams<{ experimentId: string }>();
  let listMetrics = trpc.listMetrics.useQuery({ experimentId });

  if (!listMetrics.data) {
    return null;
  }

  let metrics = listMetrics.data;

  return (
    <div className="w-min rounded border">
      <div className="flex px-4 py-2 items-center text-primary bg-muted">
        <div className="flex-0">
          <LineChartIcon className="w-4 h-4 font-light" />
        </div>
        <p className="flex-grow px-3 font-bold">Metrics</p>
      </div>
      <div className="flex px-4 py-2 items-center border-t text-muted-foreground">
        <div className="flex-0">
          <CheckSquareIcon className="w-4 h-4 font-light" />
        </div>
        <p className="flex-grow px-3 text-sm">impressions</p>
      </div>
      {metrics.map((metric) => (
        <Metric key={metric.id} {...metric} />
      ))}
      <AddMetric />
    </div>
  );
};

const Metric = ({ name, type }: { name: string; type: string }) => {
  let Icon: LucideIcon | undefined = undefined;

  switch (type) {
    case "conversion":
      Icon = HashIcon;
      break;
    case "duration":
      Icon = TimerIcon;
      break;
    case "call":
      Icon = CheckSquare;
      break;
  }

  if (!Icon) {
    return null;
  }
  return (
    <div className="flex px-4 py-2 items-center border-t">
      <div className="flex-0">
        <Icon className="w-4 h-4" />
      </div>
      <p className="flex-grow px-3 text-sm">{name}</p>
      <div className="flex-0">
        <MoreHorizontalIcon className="w-4 h-4" />
      </div>
    </div>
  );
};
