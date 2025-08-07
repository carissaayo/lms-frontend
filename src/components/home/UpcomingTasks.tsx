export default function UpcomingTasks() {
  const tasks = [
    "3 Assignments due for grading",
    "Live session scheduled tomorrow at 10 AM",
  ];

  return (
    <div className="flex-1">
      <h2 className="text-lg font-semibold mb-2">Upcoming Tasks</h2>
      <ul className="list-disc list-inside space-y-1">
        {tasks.map((task, idx) => (
          <li key={idx}>{task}</li>
        ))}
      </ul>
    </div>
  );
}
