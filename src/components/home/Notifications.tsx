export default function NotificationsPanel() {
  const notifications = [
    "Your August payout has been processed",
    "New feedback received for Python for Beginners",
  ];

  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Notifications</h2>
      <ul className="space-y-1 text-muted-foreground">
        {notifications.map((note, idx) => (
          <li key={idx}>• {note}</li>
        ))}
      </ul>
    </div>
  );
}
