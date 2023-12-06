"use client";

import { format } from "date-fns";

import * as React from "react";
import { Label } from "@/components/ui/label";
import { InputHint } from "@/components/input-hint";

import { DateTimePicker } from "@/components/ui/date-time-picker";

export const DurationInput = () => {
  let [startedAt, setStartedAt] = React.useState<Date | undefined>();
  let [endedAt, setEndedAt] = React.useState<Date | undefined>();

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label htmlFor="experiment-duration">Duration</Label>
        <InputHint>
          How long do you want to run the experiment? We recommend at least 2
          weeks to account for weekly fluctuations.
        </InputHint>
      </div>
      <div className="space-y-2">
        <div className="flex flex-col space-y-1">
          <Label htmlFor="experiment-started-at" className="text-xs">
            Start date
          </Label>
          <DateTimePicker
            date={startedAt}
            setDate={setStartedAt}
            id="experiment-started-at"
          />
        </div>
        <div className="flex flex-col space-y-1">
          <Label htmlFor="experiment-ended-at" className="text-xs">
            End date
          </Label>
          <DateTimePicker
            date={endedAt}
            setDate={setEndedAt}
            id="experiment-ended-at"
          />
        </div>
      </div>

      <p className="text-xs text-muted-foreground">
        {endedAt && startedAt
          ? // starts and ends at 00:00:00 and ends at 23:59:59
            `From ${format(startedAt, "Pp")} to ${format(
              endedAt,
              "Pp"
            )} (${Math.round(
              (endedAt.getTime() - startedAt.getTime()) / (1000 * 60 * 60 * 24)
            )} days)`
          : "Choose a start and end date"}
      </p>
    </div>
  );
};
