import { getXataClient } from "@/lib/xata";
import { formatDistance } from "date-fns";

import { Suspense } from "react";
import { PastExperiments } from "./past-experiments";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { UpcomingExperiments } from "./upcoming-experiments";

let xata = getXataClient();

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

const Page = async () => {
  let experiments = await xata.db.experiments
    .filter({
      $all: [
        {
          startedAt: {
            $le: new Date(),
          },
        },
        {
          endedAt: {
            $ge: new Date(),
          },
        },
      ],
    })
    .sort("endedAt", "asc")
    .getAll();

  return (
    <div className="space-y-8">
      <div className="flex justify-between">
        <h1 className="font-bold">Experiments</h1>
        <Button asChild>
          <Link href="/app/experiments/create">New experiment</Link>
        </Button>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {experiments.map((experiment) => (
          <div
            className="p-4 rounded-lg border border-primary/40 bg-primary/10"
            key={experiment.id}
          >
            <p className="font-bold text-lg">{experiment.name}</p>
            <div className="grid grid-cols-3 text-sm py-4">
              <p className="tabular-nums">
                {getRandomInt(experiment.sampleSizeAbsolute || 1000)} users
              </p>
              <p className="tabular-nums">{getRandomInt(200)} signups</p>
              <p className="tabular-nums">{getRandomInt(50)} purchases</p>
            </div>
            <p className="text-xs">
              Ends{" "}
              {experiment.endedAt
                ? formatDistance(experiment.endedAt, new Date(), {
                    addSuffix: true,
                  })
                : "xd"}
            </p>
          </div>
        ))}
      </div>

      <Suspense>
        <UpcomingExperiments />
      </Suspense>

      <Suspense>
        <PastExperiments />
      </Suspense>
    </div>
  );
};

export default Page;
