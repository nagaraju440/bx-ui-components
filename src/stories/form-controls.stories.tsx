import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Checkbox } from "src/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "src/ui/form";
import { Input } from "src/ui/input";
import { Label } from "src/ui/label";
import { RadioButtonCard } from "src/ui/radioButtonCard";
import {
  RadioGroup,
  RadioGroupCheckItem,
  RadioGroupCircleItem,
  RadioGroupItem,
} from "src/ui/radio-group";
import { Switch } from "src/ui/switch";
import { Textarea } from "src/ui/textarea";

const meta: Meta = {
  title: "Common Components/Form Controls",
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj;

export const CheckboxSwitchAndLabel: Story = {
  render: () => {
    const [checked, setChecked] = useState(true);
    const [enabled, setEnabled] = useState(true);

    return (
      <div className="w-[360px] space-y-5 rounded-lg border bg-white p-5">
        <div className="flex items-center gap-3">
          <Checkbox
            id="story-checkbox"
            checked={checked}
            onCheckedChange={(value) => setChecked(Boolean(value))}
          />
          <Label htmlFor="story-checkbox">Enable participant emails</Label>
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="story-switch">Online payments</Label>
          <Switch
            id="story-switch"
            checked={enabled}
            onCheckedChange={setEnabled}
          />
        </div>
      </div>
    );
  },
};

export const TextareaStates: Story = {
  render: () => (
    <div className="w-[420px] space-y-4">
      <Textarea placeholder="Internal note" defaultValue="Bring yoga mats." />
      <Textarea error placeholder="Required note" />
    </div>
  ),
};

export const RadioGroupVariants: Story = {
  render: () => {
    const [value, setValue] = useState("regular");

    return (
      <RadioGroup value={value} onValueChange={setValue} className="w-[420px]">
        <div className="flex items-center gap-2">
          <RadioGroupItem id="radio-standard" value="regular" />
          <Label htmlFor="radio-standard">Standard radio item</Label>
        </div>
        <div className="flex items-center gap-2">
          <RadioGroupCircleItem id="radio-circle" value="circle" />
          <Label htmlFor="radio-circle">Circle radio item</Label>
        </div>
        <div className="flex items-center gap-2">
          <RadioGroupCheckItem id="radio-check" value="check" />
          <Label htmlFor="radio-check">Check radio item</Label>
        </div>
        <RadioButtonCard
          id="radio-card"
          value="card"
          label="RadioButtonCard option"
        />
      </RadioGroup>
    );
  },
};

export const ReactHookFormField: Story = {
  render: () => {
    const form = useForm({
      defaultValues: {
        email: "participant@example.com",
      },
    });

    return (
      <Form {...form}>
        <form className="w-[420px] space-y-4 rounded-lg border bg-white p-5">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" {...field} />
                </FormControl>
                <FormDescription>
                  Shared form primitives wrap react-hook-form fields.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    );
  },
};
