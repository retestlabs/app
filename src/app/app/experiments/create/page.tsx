import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { InputHint } from "@/components/input-hint";

import { SampleSizeInput } from "./sample-size-input";
import { DurationInput } from "./duration-input";

const Page = () => {
  return (
    <div className="space-y-4">
      <h1 className="font-bold text-lg">Create new experiment</h1>

      <form
        className="space-y-4 max-w-lg"
        action={async (formData) => {
          "use server";
          console.log(formData);
        }}
      >
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="experiment-name">Experiment name</Label>
            <InputHint>
              Give your experiment a descriptive name so you can easily find it
              later.
            </InputHint>
          </div>
          <Input
            id="experiment-name"
            name="experiment-name"
            placeholder='E.g. "Logo color" or "Homepage redesign"'
            required
          ></Input>
        </div>
        <Separator />
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="experiment-description">Description</Label>
            <InputHint>
              Optional: Describe what you're testing and why. This will help you
              and your team understand the experiment later.
            </InputHint>
          </div>
          <Textarea
            id="experiment-description"
            name="experiment-description"
          ></Textarea>
        </div>
        <Separator />
        <DurationInput />
        <Separator />
        <SampleSizeInput />
        <Separator />
        <div className="flex justify-end">
          <Button type="submit">Create experiment</Button>
        </div>
      </form>
    </div>
  );
};

export default Page;
