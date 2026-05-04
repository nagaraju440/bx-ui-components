import type { Meta, StoryObj } from "@storybook/react";
import { MoreHorizontal, Plus } from "lucide-react";
import { useEffect } from "react";
import { Button } from "src/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "src/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "src/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "src/ui/dropdown-menu";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
  StandardHoverCardContent,
} from "src/ui/hover-card";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "src/ui/navigation-menu";
import { Popover, PopoverContent, PopoverTrigger } from "src/ui/popover";
import RouteChangeAlertPopUp from "src/ui/RouteChangeAlertPopUp";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "src/ui/sheet";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
} from "src/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipPortal,
  TooltipProvider,
  TooltipTrigger,
} from "src/ui/tooltip";
import { navigationStore } from "src/zustandStore/navigationStore";

const meta: Meta = {
  title: "Common Components/Overlay And Navigation",
};

export default meta;

type Story = StoryObj;

export const DialogAndAlertDialog: Story = {
  render: () => (
    <div className="flex gap-3">
      <Dialog>
        <DialogTrigger asChild>
          <Button>Open dialog</Button>
        </DialogTrigger>
        <DialogContent className="w-[420px]">
          <DialogHeader>
            <DialogTitle>Edit course</DialogTitle>
            <DialogDescription>
              DialogContent, DialogHeader, DialogTitle, DialogDescription and
              DialogFooter are shown together.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="secondary">Cancel</Button>
            <Button>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="secondary">Open alert</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Leave this page?</AlertDialogTitle>
            <AlertDialogDescription>
              Unsaved changes will be discarded.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  ),
};

export const SheetPopoverTooltipHoverCard: Story = {
  render: () => (
    <TooltipProvider>
      <div className="flex flex-wrap items-center gap-3">
        <Sheet>
          <SheetTrigger asChild>
            <Button>Open sheet</Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
              <SheetDescription>Sheet primitives for side panels.</SheetDescription>
            </SheetHeader>
            <SheetFooter className="mt-6">
              <Button>Apply</Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="secondary">Popover</Button>
          </PopoverTrigger>
          <PopoverContent>PopoverContent can hold compact controls.</PopoverContent>
        </Popover>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline">Tooltip</Button>
          </TooltipTrigger>
          <TooltipPortal>
            <TooltipContent>TooltipContent with TooltipPortal</TooltipContent>
          </TooltipPortal>
        </Tooltip>

        <HoverCard>
          <HoverCardTrigger asChild>
            <Button variant="plain">Hover card</Button>
          </HoverCardTrigger>
          <HoverCardContent>Dark HoverCardContent variant.</HoverCardContent>
        </HoverCard>

        <HoverCard>
          <HoverCardTrigger asChild>
            <Button variant="outline">Standard hover</Button>
          </HoverCardTrigger>
          <StandardHoverCardContent>
            StandardHoverCardContent variant.
          </StandardHoverCardContent>
        </HoverCard>
      </div>
    </TooltipProvider>
  ),
};

export const DropdownMenuComponents: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          Actions <MoreHorizontal className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Course actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            Edit
            <DropdownMenuShortcut>Ctrl E</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuCheckboxItem checked>
            Published
          </DropdownMenuCheckboxItem>
        </DropdownMenuGroup>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Export</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem>CSV</DropdownMenuItem>
            <DropdownMenuItem>PDF</DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value="email">
          <DropdownMenuRadioItem value="email">Email</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="sms">SMS</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

export const NavigationMenuComponents: Story = {
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Courses</NavigationMenuTrigger>
          <NavigationMenuContent className="w-[240px] rounded-lg border bg-white p-4 shadow">
            <NavigationMenuLink className="block rounded p-2 hover:bg-primary-light">
              Find courses
            </NavigationMenuLink>
            <NavigationMenuLink className="block rounded p-2 hover:bg-primary-light">
              Registrations
            </NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink className="px-4 py-2">Reports</NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
      <NavigationMenuIndicator />
    </NavigationMenu>
  ),
};

export const SidebarComponents: Story = {
  render: () => (
    <SidebarProvider defaultOpen>
      <div className="flex h-[420px] w-[760px] rounded-lg border bg-white">
        <Sidebar collapsible="icon" className="h-full">
          <SidebarHeader>
            <SidebarInput placeholder="Search" />
          </SidebarHeader>
          <SidebarSeparator />
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Workspace</SidebarGroupLabel>
              <SidebarGroupAction>
                <Plus className="h-4 w-4" />
              </SidebarGroupAction>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton isActive>
                      <span>Courses</span>
                    </SidebarMenuButton>
                    <SidebarMenuAction>
                      <MoreHorizontal className="h-4 w-4" />
                    </SidebarMenuAction>
                    <SidebarMenuBadge>12</SidebarMenuBadge>
                    <SidebarMenuSub>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton href="#">Drafts</SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>Footer</SidebarFooter>
          <SidebarRail />
        </Sidebar>
        <SidebarInset className="flex-1 p-6">
          <SidebarTrigger />
          <div className="mt-6 text-sm text-grey">
            SidebarInset and SidebarTrigger are rendered beside the sidebar.
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  ),
};

export const RouteChangeAlert: Story = {
  render: () => {
    const { setRouteChangeModalOpen, setUrl } = navigationStore();

    useEffect(() => {
      setUrl("/sample");
      setRouteChangeModalOpen(true);
    }, [setRouteChangeModalOpen, setUrl]);

    return <RouteChangeAlertPopUp />;
  },
};
