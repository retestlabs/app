import { getXataClient } from "@/lib/xata";
import { formatDistance } from "date-fns";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

let xata = getXataClient();

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

export const UpcomingExperiments = async () => {
  let experiments = await xata.db.experiments
    .filter({
      $all: [
        {
          startedAt: {
            $gt: new Date(),
          },
        },
        {
          endedAt: {
            $gt: new Date(),
          },
        },
      ],
    })
    .sort("startedAt", "asc")
    .getAll();

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>Upcoming experiments</AccordionTrigger>
        <AccordionContent>
          <div className="grid grid-cols-3 gap-4">
            {experiments.map((experiment) => (
              <div
                className="p-4 rounded-lg border border-secondary/90 bg-secondary/20"
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
                  Starts{" "}
                  {experiment.startedAt
                    ? formatDistance(new Date(), experiment.startedAt, {
                        addSuffix: true,
                      })
                    : "xd"}
                </p>
              </div>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
