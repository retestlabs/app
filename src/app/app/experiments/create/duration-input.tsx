"use client";

import { format } from "date-fns";

import * as React from "react";
import { Label } from "@/components/ui/label";
import { InputHint } from "@/components/input-hint";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

// TODO: use https://github.com/uncvrd/shadcn-ui-date-time-picker

export const DurationInput = () => {
  let [startedAt, setStartedAt] = React.useState(() => {
    let date = new Date();
    date.setDate(date.getDate() + 1);
    return date;
  });
  let [endedAt, setEndedAt] = React.useState(() => {
    let date = new Date();
    date.setDate(date.getDate() + 14);
    return date;
  });

  React.useEffect(() => {
    if (startedAt && endedAt && endedAt < startedAt) {
      setEndedAt(startedAt);
    }
  }, [startedAt, endedAt]);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label htmlFor="experiment-duration">Duration</Label>
        <InputHint>
          How long do you want to run the experiment? We recommend at least 2
          weeks to account for weekly fluctuations.
        </InputHint>
      </div>
      <div className="flex space-x-4">
        <div className="space-y-2">
          <Label htmlFor="experiment-started-at">Start date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                type="button"
                id="experiment-started-at"
                variant={"outline"}
                className={cn(
                  "w-[240px] pl-3 text-left font-normal",
                  !startedAt && "text-muted-foreground"
                )}
              >
                {startedAt ? (
                  format(startedAt, "PPP")
                ) : (
                  <span>Pick a date</span>
                )}
                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={startedAt}
                onSelect={setStartedAt}
                disabled={(date: Date) => {
                  let yesterday = new Date();
                  yesterday.setDate(yesterday.getDate() - 1);
                  return date < yesterday;
                }}
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className="space-y-2">
          <Label htmlFor="experiment-ended-at">End date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                type="button"
                id="experiment-ended-at"
                variant={"outline"}
                className={cn(
                  "w-[240px] pl-3 text-left font-normal",
                  !endedAt && "text-muted-foreground"
                )}
              >
                {endedAt ? format(endedAt, "PPP") : <span>Pick a date</span>}
                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={endedAt}
                onSelect={setEndedAt}
                disabled={(date: Date) => {
                  let yesterday = new Date();
                  yesterday.setDate(yesterday.getDate() - 1);
                  return date < yesterday || date < startedAt;
                }}
              />
            </PopoverContent>
          </Popover>
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
