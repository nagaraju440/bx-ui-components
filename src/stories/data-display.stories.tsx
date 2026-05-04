import type { Meta, StoryObj } from "@storybook/react";
import { AlertCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "src/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "src/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "src/ui/avatar";
import { Badge } from "src/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "src/ui/card";
import { ScrollArea, ScrollBar } from "src/ui/scroll-area";
import { Separator } from "src/ui/separator";
import SlashIcon from "src/ui/SlashIcon";
import { SortingArrows } from "src/ui/SortingArrows";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "src/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "src/ui/tabs";
import { Text } from "src/ui/text";
import {
  CardLabel,
  CardValue,
  Header,
  MainHeader,
  SubHeader,
  TableHeader as TextTableHeader,
  Text as TextTag,
} from "src/ui/TextTags";

const meta: Meta = {
  title: "Common Components/Data Display",
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj;

export const CardsBadgesAvatarAndAlert: Story = {
  render: () => (
    <div className="w-[520px] space-y-4">
      <Card className="border">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src="https://i.pravatar.cc/96?img=12" />
              <AvatarFallback>BX</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle>Course summary</CardTitle>
              <CardDescription>Shared card, avatar and badge pieces.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex gap-2">
          <Badge>Open</Badge>
          <Badge variant="success">Confirmed</Badge>
          <Badge variant="warning">Waitlist</Badge>
        </CardContent>
        <CardFooter>
          <Text size="14">Reusable display primitives in one compact card.</Text>
        </CardFooter>
      </Card>

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Capacity warning</AlertTitle>
        <AlertDescription>
          There are only three seats left for this course.
        </AlertDescription>
      </Alert>
    </div>
  ),
};

export const TableAndSorting: Story = {
  render: () => (
    <Table className="w-[620px] rounded-lg border">
      <TableCaption>Table primitives with sorting icon states.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>
            <div className="flex items-center gap-1">
              Course <SortingArrows sortingState="asc" onSortChange={() => {}} />
            </div>
          </TableHead>
          <TableHead>City</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {[
          ["Happiness Program", "Bangalore", "Open"],
          ["Sahaj Samadhi", "Hyderabad", "Draft"],
          ["Art of Silence", "Mysore", "Full"],
        ].map(([course, city, status]) => (
          <TableRow key={course}>
            <TableCell>{course}</TableCell>
            <TableCell>{city}</TableCell>
            <TableCell>{status}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>3 rows</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  ),
};

export const TextAndTextTags: Story = {
  render: () => (
    <div className="w-[520px] space-y-4">
      <MainHeader>MainHeader</MainHeader>
      <SubHeader>SubHeader</SubHeader>
      <Header>Header</Header>
      <div className="grid grid-cols-2 gap-4 rounded-lg border p-4">
        <div>
          <CardLabel>Course ID</CardLabel>
          <CardValue>ALTABC740</CardValue>
        </div>
        <div>
          <TextTableHeader>Deposit date</TextTableHeader>
          <TextTag>01 May 2026</TextTag>
        </div>
      </div>
      <Text size="14" weight="600">
        Text component with size and weight variants.
      </Text>
      <div className="flex items-center gap-2 text-grey2">
        Home <SlashIcon /> Courses <SlashIcon /> Details
      </div>
    </div>
  ),
};

export const AccordionTabsScrollAndSeparator: Story = {
  render: () => (
    <div className="w-[560px] space-y-5">
      <Accordion type="single" collapsible defaultValue="item-1">
        <AccordionItem value="item-1" variant="secondary">
          <AccordionTrigger>Course details</AccordionTrigger>
          <AccordionContent>
            AccordionContent is useful for dense settings and summaries.
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="participants">Participants</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">Overview content</TabsContent>
        <TabsContent value="participants">Participants content</TabsContent>
      </Tabs>

      <Separator />

      <ScrollArea className="h-[120px] w-full rounded-lg border p-4">
        <div className="w-[720px] space-y-2">
          {Array.from({ length: 8 }).map((_, index) => (
            <p key={index}>Scrollable content row {index + 1}</p>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  ),
};
