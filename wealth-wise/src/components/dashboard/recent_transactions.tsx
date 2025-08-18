import Link from "next/link";
interface Transaction {
  id: string
  user_id: string
  title: string
  subTitle: string
  type: string
  amount: number
  amountColor: string
  date: string
  categoryName: string
  categoryID: string
  categoryColor: string
  accountID: string
  accountName: string
}

interface RecentTransactionsProps {
  transactions: Transaction[];
}

export function RecentTransactionsCard({ transactions }: RecentTransactionsProps) {
  return (
    <Link href='/dashboard/transactions'>
      <div className="bg-[#2a2a2a] rounded-xl p-6 border border-[#3a3a3a] h-fit">
        <h3 className="text-xl font-semibold text-white mb-6">Recent transactions</h3>
        
        <div className="space-y-4">
          {transactions.map((transaction, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-[#3a3a3a] rounded-full flex items-center justify-center">
                  <span className="text-sm">🚗</span>
                </div>
                <div>
                  <div className="text-white font-medium text-sm">{transaction.title}</div>
                  <div className="text-gray-400 text-xs">{transaction.type}</div>
                </div>
              </div>
              <div className={`font-semibold text-sm ${
                transaction.type === 'income' ? 'text-green-400' : 'text-red-400'
              }`}>
                {transaction.amount}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Link>
  );
}