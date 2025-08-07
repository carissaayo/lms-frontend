export default function RecentActivity() {
  const activities = [
    "Sarah submitted Assignment 1",
    "James enrolled in React Basics",
  ];

  return (
    <div className="flex-1 my-8">
      <h2 className="text-lg font-semibold mb-2">Recent Student Activity</h2>
      <ul className="space-y-1">
        {activities.map((activity, idx) => (
          <li key={idx} className="text-sm text-muted-foreground">
            {activity}
          </li>
        ))}
      </ul>
    </div>
  );
}
