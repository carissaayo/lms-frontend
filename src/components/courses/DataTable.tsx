import { columns, Payment } from "./Column";
import { DataTable } from "./CoursesTable";

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      price: 100,
      status: "pending",
      title: "m@example.com",
      students: 30,
    },
  ];
}

export default async function DemoPage() {
  const data = await getData();

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
