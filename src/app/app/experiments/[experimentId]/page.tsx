import { getXataClient } from "@/lib/xata";
import {
  CheckSquare,
  CheckSquareIcon,
  HashIcon,
  LineChartIcon,
  LucideIcon,
  PlusIcon,
  TimerIcon,
} from "lucide-react";
import { notFound } from "next/navigation";
let xata = getXataClient();

const variables = [
  {
    name: "products_purchased",
    type: "number",
  },
  {
    name: "screen_time_in_landing_page",
    type: "time",
  },
  {
    name: "signups",
    type: "counter",
  },
];

const Metric = ({ name, type }: { name: string; type: string }) => {
  let Icon: LucideIcon | undefined = undefined;

  switch (type) {
    case "number":
      Icon = HashIcon;
      break;
    case "time":
      Icon = TimerIcon;
      break;
    case "counter":
      Icon = CheckSquare;
      break;
  }

  if (!Icon) {
    return null;
  }
  return (
    <div className="flex px-4 py-2 items-center border-t">
      <div className="flex-0">
        <Icon className="w-4 h-4 font-light" />
      </div>
      <p className="flex-grow px-3 text-sm">{name}</p>
      <div className="flex-0">...</div>
    </div>
  );
};

const Metrics = ({
  metrics,
}: {
  metrics: {
    name: string;
    type: string;
  }[];
}) => {
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
        <Metric key={metric.name} {...metric} />
      ))}
      <div className="flex px-4 py-2 border-t items-center text-primary">
        <div className="flex-0">
          <PlusIcon className="w-4 h-4 font-light" />
        </div>
        <p className="flex-grow px-3 text-sm">Add a metric</p>
      </div>
    </div>
  );
};

const Page = async ({ params }: { params: { experimentId: string } }) => {
  const { experimentId } = params;

  const experiment = await xata.db.experiments
    .select(["*"])
    .filter({ id: experimentId.replace("exp_", "rec_") })
    .getFirst();

  if (!experiment) {
    return notFound();
  }

  return (
    <div>
      <h1>{experiment.name}</h1>
      <Metrics metrics={variables} />
    </div>
  );
};

export default Page;
