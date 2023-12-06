"use client";

import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon, ClockIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { TimePickerInput } from "@/components/ui/time-picker/input";
import { Label } from "@/components/ui/label";

interface DateTimePickerProps {
  date: Date | undefined;
  setDate: any;
  id?: string;
}

export function DateTimePicker({ date, setDate, id }: DateTimePickerProps) {
  const minuteRef = React.useRef<HTMLInputElement>(null);
  const hourRef = React.useRef<HTMLInputElement>(null);
  const secondRef = React.useRef<HTMLInputElement>(null);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          id={id}
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal tabular-nums",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP HH:mm:ss") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(selectedDate) => {
            if (selectedDate && date) {
              selectedDate.setHours(date.getHours());
              selectedDate.setMinutes(date.getMinutes());
              selectedDate.setSeconds(date.getSeconds());
            }
            setDate(selectedDate);
          }}
        />
        <div className="border-t border-border flex justify-between">
          <div className="flex items-end gap-2 p-3">
            <div className="grid gap-1 text-center">
              <Label htmlFor="hours" className="text-xs">
                H
              </Label>
              <TimePickerInput
                picker="hours"
                date={date}
                setDate={setDate}
                ref={hourRef}
                onRightFocus={() => minuteRef.current?.focus()}
              />
            </div>
            <div className="grid gap-1 text-center">
              <Label htmlFor="minutes" className="text-xs">
                M
              </Label>
              <TimePickerInput
                picker="minutes"
                date={date}
                setDate={setDate}
                ref={minuteRef}
                onLeftFocus={() => hourRef.current?.focus()}
                onRightFocus={() => secondRef.current?.focus()}
              />
            </div>
            <div className="grid gap-1 text-center">
              <Label htmlFor="seconds" className="text-xs">
                S
              </Label>
              <TimePickerInput
                picker="seconds"
                date={date}
                setDate={setDate}
                ref={secondRef}
                onLeftFocus={() => minuteRef.current?.focus()}
              />
            </div>
          </div>
          <div className="flex items-end gap-2 p-3">
            <div className="grid gap-1 text-center">
              <Label htmlFor="seconds" className="text-xs">
                T
              </Label>
              <Button
                size="icon"
                variant="outline"
                onClick={() => {
                  let now = new Date();
                  if (date) {
                    now.setFullYear(date.getFullYear());
                    now.setMonth(date.getMonth());
                    now.setDate(date.getDate());
                  }
                  setDate(now);
                }}
                className="w-8 h-8"
              >
                <ClockIcon className="h-3 w-3" />
              </Button>
            </div>
            <div className="grid gap-1 text-center">
              <Label htmlFor="seconds" className="text-xs">
                D
              </Label>
              <Button
                size="icon"
                variant="outline"
                onClick={() => {
                  let now = new Date();
                  if (date) {
                    now.setHours(date.getHours());
                    now.setMinutes(date.getMinutes());
                    now.setSeconds(date.getSeconds());
                  }
                  setDate(now);
                }}
                className="w-8 h-8"
              >
                <CalendarIcon className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
