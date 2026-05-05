import type { ColumnDef } from "@tanstack/react-table";
import type { Meta, StoryObj } from "@storybook/react";
import { useMemo, useState } from "react";
import { BaseTable } from "./BaseTable";

type CourseRow = {
  id: number;
  courseName: string;
  city: string;
  startDate: string;
  status: "Open" | "Full" | "Draft";
};

const sampleCourses: CourseRow[] = [
  {
    id: 1,
    courseName: "Happiness Program",
    city: "Bangalore",
    startDate: "2026-05-08",
    status: "Open",
  },
  {
    id: 2,
    courseName: "Sahaj Samadhi Meditation",
    city: "Hyderabad",
    startDate: "2026-05-15",
    status: "Draft",
  },
  {
    id: 3,
    courseName: "Art Excel",
    city: "Chennai",
    startDate: "2026-05-22",
    status: "Full",
  },
  {
    id: 4,
    courseName: "YES!+",
    city: "Mumbai",
    startDate: "2026-05-29",
    status: "Open",
  },
  {
    id: 5,
    courseName: "Intuition Process",
    city: "Delhi",
    startDate: "2026-06-05",
    status: "Draft",
  },
  {
    id: 6,
    courseName: "DSN",
    city: "Pune",
    startDate: "2026-06-12",
    status: "Open",
  },
  {
    id: 7,
    courseName: "Advance Meditation Program",
    city: "Kolkata",
    startDate: "2026-06-19",
    status: "Full",
  },
  {
    id: 8,
    courseName: "Sri Sri Yoga",
    city: "Ahmedabad",
    startDate: "2026-06-26",
    status: "Open",
  },
  {
    id: 9,
    courseName: "Art of Silence",
    city: "Mysore",
    startDate: "2026-07-03",
    status: "Draft",
  },
  {
    id: 10,
    courseName: "Sudarshan Kriya Follow-up",
    city: "Coimbatore",
    startDate: "2026-07-10",
    status: "Open",
  },
  {
    id: 11,
    courseName: "Happiness Program",
    city: "Jaipur",
    startDate: "2026-07-17",
    status: "Full",
  },
  {
    id: 12,
    courseName: "Sahaj Samadhi Meditation",
    city: "Lucknow",
    startDate: "2026-07-24",
    status: "Open",
  },
];

const meta: Meta<typeof BaseTable> = {
  title: "Components/BaseTable",
  component: BaseTable,
  parameters: {
    docs: {
      description: {
        component:
          "BaseTable renders TanStack table data with optional row selection, column selector, and controlled pagination. Its pagination labels are translated by bx-ui-components.",
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof BaseTable>;

export const WithPagination: Story = {
  render: () => {
    const [rowSelection, setRowSelection] = useState({});
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const columns = useMemo<ColumnDef<CourseRow>[]>(
      () => [
        {
          accessorKey: "courseName",
          header: "Course",
          cell: ({ row }) => row.original.courseName,
        },
        {
          accessorKey: "city",
          header: "City",
          cell: ({ row }) => row.original.city,
        },
        {
          accessorKey: "startDate",
          header: "Start Date",
          cell: ({ row }) => row.original.startDate,
        },
        {
          accessorKey: "status",
          header: "Status",
          cell: ({ row }) => row.original.status,
        },
      ],
      []
    );

    const paginatedCourses = useMemo(() => {
      const startIndex = (current - 1) * pageSize;
      return sampleCourses.slice(startIndex, startIndex + pageSize);
    }, [current, pageSize]);

    const handlePageSizeChange = (
      value: number | ((previousPageSize: number) => number)
    ) => {
      setPageSize((previousPageSize) => {
        const nextPageSize =
          typeof value === "function" ? value(previousPageSize) : value;

        setCurrent(1);
        return nextPageSize;
      });
    };

    return (
      <BaseTable
        columns={columns}
        data={paginatedCourses}
        checkboxSelection
        rowSelection={rowSelection}
        setRowSelection={setRowSelection}
        pagination
        current={current}
        setCurrent={setCurrent}
        pageCount={Math.ceil(sampleCourses.length / pageSize)}
        pageSize={pageSize}
        setPageSize={handlePageSizeChange}
        total={sampleCourses.length}
        noRecordsPlaceholder="No sample courses"
        name="storybook-sample-courses"
        tableStyles={{
          tableContainer: "rounded-lg border border-gray-200",
          tableHeader: "bg-gray-50",
        }}
      />
    );
  },
};

