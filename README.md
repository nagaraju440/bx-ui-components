# bx-ui-components

Reusable BX React components for Next.js applications.

This package owns the shared UI, shared styles, and the small set of text strings used inside those shared components. Application pages can still own their own translations, auth, data loading, and business flows.

## What Is Inside

- `src/ui`: reusable UI primitives and compound components.
- `src/components`: larger shared components such as `BaseTable`.
- `src/styles/styles.css`: package CSS output source.
- `locales/<locale>/common-components-strings.json`: source of truth for shared component strings.
- `src/i18n/locales.ts`: static import map that loads the locale folder files into the package.
- `tailwind.preset.cjs`: optional Tailwind preset for consuming apps.
- `tsup.config.ts`: package build configuration.
- `.storybook`: local documentation and visual testing.

## Component Inventory

These are the shared components currently present in this package, grouped by usage area. The file reference points to the source file to check when changing behavior, props, or styles.

| Area | Components | File reference |
| --- | --- | --- |
| Core UI | `Button` | `src/ui/button.tsx` |
| Core UI | `Input` | `src/ui/input.tsx` |
| Core UI | `Textarea` | `src/ui/textarea.tsx` |
| Core UI | `Label` | `src/ui/label.tsx` |
| Core UI | `Checkbox` | `src/ui/checkbox.tsx` |
| Core UI | `Switch` | `src/ui/switch.tsx` |
| Core UI | `RadioGroup`, `RadioGroupItem`, `RadioGroupCircleItem`, `RadioGroupCheckItem` | `src/ui/radio-group.tsx` |
| Core UI | `RadioButtonCard` | `src/ui/radioButtonCard.tsx` |
| Form | `Form`, `FormField`, `FormItem`, `FormLabel`, `FormControl`, `FormDescription`, `FormMessage` | `src/ui/form.tsx` |
| Selection | `Select`, `SelectTrigger`, `SelectValue`, `SelectContent`, `SelectItem`, `SelectItems`, `SelectInput` | `src/ui/select.tsx` |
| Selection | `MVPSelect`, `MVPSelectTrigger`, `MVPSelectContent`, `MVPSelectInput`, `MVPSelectItems`, `MVPSelectItem`, `MVPSelectEmpty`, `MVPSelectLoading` | `src/ui/SelectCommand.tsx` |
| Selection | `MultiSelect` | `src/ui/multi-select.tsx` |
| Selection | `CustomSelect` | `src/ui/custom-select.tsx` |
| Selection | `Command`, `CommandDialog`, `CommandInput`, `CommandList`, `CommandEmpty`, `CommandGroup`, `CommandItem` | `src/ui/command.tsx` |
| Date | `CalendarBase` | `src/ui/calendar.tsx` |
| Date | `DateCalendar` | `src/ui/DateCalendar.tsx` |
| Date | `DateField` | `src/ui/DateField.tsx` |
| Date | `DateRangePicker` | `src/ui/DateRangePicker.tsx` |
| Date | `DateOfBirthSelector` | `src/ui/DateOfBirthSelector.tsx` |
| Date | `DobCalendar`, `YearsAndMonthsDropdown` | `src/ui/DobCalendar.tsx` |
| Layout / Overlay | `Accordion`, `AccordionItem`, `AccordionTrigger`, `AccordionContent` | `src/ui/accordion.tsx` |
| Layout / Overlay | `Alert`, `AlertTitle`, `AlertDescription` | `src/ui/alert.tsx` |
| Layout / Overlay | `AlertDialog` and related alert dialog parts | `src/ui/alert-dialog.tsx` |
| Layout / Overlay | `Dialog` and related dialog parts | `src/ui/dialog.tsx` |
| Layout / Overlay | `DropdownMenu` and related dropdown menu parts | `src/ui/dropdown-menu.tsx` |
| Layout / Overlay | `HoverCard`, `HoverCardContent`, `StandardHoverCardContent` | `src/ui/hover-card.tsx` |
| Layout / Overlay | `NavigationMenu` and related navigation menu parts | `src/ui/navigation-menu.tsx` |
| Layout / Overlay | `Popover`, `PopoverTrigger`, `PopoverContent` | `src/ui/popover.tsx` |
| Layout / Overlay | `ScrollArea`, `ScrollBar` | `src/ui/scroll-area.tsx` |
| Layout / Overlay | `Separator` | `src/ui/separator.tsx` |
| Layout / Overlay | `Sheet` and related sheet parts | `src/ui/sheet.tsx` |
| Layout / Overlay | `Sidebar` and related sidebar parts | `src/ui/sidebar.tsx` |
| Layout / Overlay | `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent` | `src/ui/tabs.tsx` |
| Layout / Overlay | `Tooltip`, `TooltipTrigger`, `TooltipContent`, `TooltipProvider` | `src/ui/tooltip.tsx` |
| Data Display | `BaseTable` | `src/components/course/findCourse/BaseTable.tsx` |
| Data Display | `Table`, `TableHeader`, `TableBody`, `TableFooter`, `TableHead`, `TableRow`, `TableCell`, `TableCaption` | `src/ui/table.tsx` |
| Data Display | `Badge` | `src/ui/badge.tsx` |
| Data Display | `Avatar`, `AvatarImage`, `AvatarFallback` | `src/ui/avatar.tsx` |
| Data Display | `Card`, `CardHeader`, `CardFooter`, `CardTitle`, `CardDescription`, `CardContent` | `src/ui/card.tsx` |
| Data Display | `Text` | `src/ui/text.tsx` |
| Data Display | `MainHeader`, `SubHeader`, `Header`, `CardLabel`, `CardValue`, `TextTag` | `src/ui/TextTags.tsx` |
| Data Display | `SortingArrows` | `src/ui/SortingArrows.tsx` |
| Data Display | `SlashIcon` | `src/ui/SlashIcon.tsx` |
| Charts / Editor | `BarChart` | `src/ui/bar-chart.tsx` |
| Charts / Editor | `VerticalBarChart` | `src/ui/vertical-bar-chart.tsx` |
| Charts / Editor | `ChartContainer`, `ChartTooltipContent`, `ChartLegendContent` | `src/ui/chart.tsx` |
| Charts / Editor | `TipTapEditor` | `src/ui/TiptapEditor.tsx` |
| Charts / Editor | `TipTapToolbar` and toolbar button/dropdown parts | `src/ui/TipTapToolbar.tsx` |
| Business Components | `DiscountCodeInput` | `src/ui/DiscountCodeInput.tsx` |
| Business Components | `CourseDiscountCodeInput` | `src/ui/CourseDiscountCodeInput.tsx` |
| Business Components | `MultiLingualSupportInputs` | `src/ui/MultiLingualInputs.tsx` |
| Business Components | `RouteChangeAlertPopUp` | `src/ui/RouteChangeAlertPopUp.tsx` |

## Translation Flow

Common component strings do not depend on the consuming app's `getStaticProps`, `serverSideTranslations`, auth setup, or internet connection.

The flow is:

1. A component calls `useCommonComponentStrings()`.
2. The hook reads the locale from the URL path by finding the first path segment that matches a supported locale folder.
3. It looks up that locale from the bundled locale data imported by `src/i18n/locales.ts`.
4. If the exact locale is missing, it tries a broader match and then falls back to `en`.
5. The component renders plain translated text.

Examples:

```txt
/ca-fr/sample -> ca-fr
/marketing/ca-fr/sample -> ca-fr
```

This supports consuming apps that use a Next.js `basePath`, such as `/marketing`. The base path is ignored because it is not a locale folder.

Each locale folder contains only:

```txt
locales/<locale>/common-components-strings.json
```

The `locales` folder is the source of truth. Pathfinder translation tooling should create or update this file in each locale folder. Do not manually maintain a separate aggregate JSON file.

`src/i18n/locales.ts` is not the source of truth. It is only the static import map that lets React, Next.js, and tsup bundle the JSON files from `locales`. The browser cannot directly scan or load files from `node_modules/bx-ui-components/locales`, so each locale JSON file must be imported somewhere in the package. That is why `locales.ts` exists.

This keeps `bx-ui-components` independent from consuming apps:

- no `bx-fe` `getStaticProps`,
- no `bx-fe` `serverSideTranslations`,
- no runtime translation fetch,
- no copying locale files into the app `public` folder.

When a new locale folder is added, also add it to `src/i18n/locales.ts` so it is included in the built package.

Do not add app namespaces like `common.json`, `bx_v1.json`, or `course.find_course.json` back into this package. Those belong to applications, not the component library.

## Add Or Update Strings

When a component needs text:

1. Add a stable component key, for example `baseTable.prev`.
2. Add that key to every `locales/<locale>/common-components-strings.json` file through the Pathfinder translation UI/script.
3. If a new locale folder was added, add its import and map entry in `src/i18n/locales.ts`.
4. Use it from the component:

```tsx
import { useCommonComponentStrings } from "src/i18n/useCommonComponentStrings";

const t = useCommonComponentStrings();

return <button>{t("baseTable.prev")}</button>;
```

Use component-owned key names like `select.noData`, `routeChange.leavePage`, or `textEditor.heading1`. Avoid old app namespace keys like `bx_v1:cm_prev`.

## Local Development

Install dependencies:

```bash
npm install
```

Run Storybook:

```bash
npm run storybook
```

Run type checking:

```bash
npm run typecheck
```

Build the package:

```bash
npm run build
```

Create a local package tarball:

```bash
npm run pack:local
```

This creates:

```txt
bx-ui-components-0.1.0.tgz
```

## Test In bx-fe Locally

From `bx-ui-components`:

```bash
npm run build
npm run pack:local
```

From the consuming app, for example `bx-fe`:

```bash
npm install ../bx-ui-components/bx-ui-components-0.1.0.tgz
npm run dev
```

Then open a locale route such as:

```txt
http://localhost:2000/ca-fr/sample
```

If the browser still shows stale labels from an older package build, stop the dev server, remove the app's `.next` folder, restart, and hard refresh the browser.

## Use In A New Project

Install the package:

```bash
npm install bx-ui-components
```

Import CSS once in the app entry point:

```tsx
import "bx-ui-components/styles.css";
```

Use components:

```tsx
import { Button, Input } from "bx-ui-components";
import { BaseTable } from "bx-ui-components/base-table";
```

For Tailwind, include the package output in the app content list:

```js
module.exports = {
  presets: [require("bx-ui-components/tailwind-preset")],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "./node_modules/bx-ui-components/dist/**/*.{js,cjs}"
  ]
};
```

## Publish

Before publishing:

```bash
npm run typecheck
npm run build
npm run build-storybook
```

Then publish:

```bash
npm login
npm version patch
npm publish
```

Use `npm publish --access public` only if the npm package is scoped and public access is required.

## Storybook

Storybook is the main local documentation surface. It includes:

- grouped stories covering all shared UI components,
- shared component catalog,
- translation flow documentation,
- sample `BaseTable` usage with pagination,
- mocked examples for app-backed components such as discount code inputs and the rich text editor.

Run:

```bash
npm run storybook
```

Build static Storybook docs:

```bash
npm run build-storybook
```

## App Adapters

Some components still need app services because they perform business actions, for example discount code validation or rich text asset upload.

Configure those services in the consuming app before rendering those components:

```ts
import {
  configureBxUiHttpClient,
  configureBxUiStaticData,
  configureBxUiTextEditorAssetUploader
} from "bx-ui-components";

configureBxUiHttpClient(pfNestInstance);
configureBxUiStaticData({ staticData, newStaticData });
configureBxUiTextEditorAssetUploader(uploadTextEditorAssetToS3);
```

Simple display components such as `Button`, `Input`, and `BaseTable` with local data do not need auth or backend access.
