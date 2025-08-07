export function WithdrawalButton() {
  const canWithdraw = true;

  return (
    <div className="flex justify-end">
      <button
        disabled={!canWithdraw}
        className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 disabled:bg-gray-300"
      >
        Request Withdrawal
      </button>
    </div>
  );
}
