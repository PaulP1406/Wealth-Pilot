interface PaymentCardProps {
  name: string;
  account: string;
  amount: string;
  type: string;
}

export function UpcomingPaymentsCard({ name, account, amount, type }: PaymentCardProps) {
  return (
    <div className="bg-green-500 rounded-xl p-6 text-white h-fit">
      <div className="text-sm text-green-100 mb-4">Upcoming payments</div>
      
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
          <span className="text-green-500 font-bold text-lg">
            {name.charAt(0)}
          </span>
        </div>
        <div>
          <div className="font-semibold text-white">{name}</div>
          <div className="text-green-100 text-sm">...{account}</div>
        </div>
      </div>
      
      <div className="text-green-100 text-sm mb-2">{type}</div>
      <div className="text-4xl font-bold text-white">{amount}</div>
    </div>
  );
}