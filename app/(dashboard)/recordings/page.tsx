import path from "path";
import { promises as fs } from "fs";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";

async function getTasks() {
  const data = await fs.readFile(path.join(process.cwd(), "/tasks.json"));

  const tasks = JSON.parse(data.toString());

  return tasks;
}

export default async function RecordingPage() {
  const tasks = await getTasks();

  return (
    <>
      <div className="flex flex-col pb-8 items-center space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
        <p className="text-muted-foreground">
          Here&apos;s a list of all your notes!
        </p>
      </div>
      <DataTable data={tasks} columns={columns} />
    </>
  );
}
