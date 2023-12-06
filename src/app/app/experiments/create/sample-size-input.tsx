"use client";

import * as React from "react";

import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { InputHint } from "@/components/input-hint";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export const SampleSizeInput = () => {
  let [typeOfSampleSize, setTypeOfSampleSize] = React.useState("relative");
  let [relativeSize, setRelativeSize] = React.useState([0.25]);
  let [absoluteSize, setAbsoluteSize] = React.useState(1000);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label
          htmlFor={
            typeOfSampleSize === "relative"
              ? "experiment-sample-relative-size"
              : "experiment-sample-absolute-size"
          }
        >
          Sample size
        </Label>
        <InputHint>
          How many users do you want to include in the experiment? We recommend
          at least 1000 users per variant.
        </InputHint>
      </div>
      <RadioGroup value={typeOfSampleSize} onValueChange={setTypeOfSampleSize}>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="relative" id="relative" />
          <Label htmlFor="relative" className="text-xs">
            Relative
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="absolute" id="absolute" />
          <Label htmlFor="absolute" className="text-xs">
            Absolute
          </Label>
        </div>
      </RadioGroup>

      {typeOfSampleSize === "relative" ? (
        <div className="flex space-x-4">
          <Slider
            id="experiment-sample-relative-size"
            name="experiment-sample-relative-size"
            value={relativeSize}
            onValueChange={setRelativeSize}
            min={0}
            max={1}
            step={0.005}
          />
          <Input
            id="experiment-sample-relative-size-input"
            className="w-20 tabular-nums"
            value={(relativeSize[0] * 100).toFixed(1)}
            onChange={(e) => setRelativeSize([Number(e.target.value) / 100])}
            type="number"
            min={0}
            max={100}
            step={0.5}
          ></Input>
        </div>
      ) : (
        <Input
          id="experiment-sample-absolute-size"
          name="experiment-sample-absolute-size"
          className="w-32 tabular-nums"
          value={absoluteSize}
          onChange={(e) => setAbsoluteSize(Number(e.target.value))}
          type="number"
          min={0}
          step={1}
        ></Input>
      )}

      <p className="text-xs text-muted-foreground tabular-nums">
        Sample size{": "}
        {typeOfSampleSize === "relative"
          ? `${(relativeSize[0] * 100).toFixed(1)}% of users`
          : `${absoluteSize} users`}
      </p>
    </div>
  );
};
