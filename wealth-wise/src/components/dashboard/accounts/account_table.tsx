import { useState } from "react";
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation';

interface AccountTableProps {
  balance: string;
  accounts: Array<{
    name: string;
    balance: string;
  }>;
  onDeleteAccount: (name: string) => void;
  userID: string;
  onAccountAdded?: () => void;
}

export function AccountTable({ balance, accounts, onDeleteAccount, userID, onAccountAdded }: AccountTableProps) {
  const [accountAdding, setAccountAdding] = useState(false);
  const [accountAddingName, setAccountAddingName] = useState('');
  const [accountAddingBalance, setAccountAddingBalance] = useState('');
  const [currentEditingAccount, setCurrentEditingAccount] = useState<{ name: string, index: number, balance: number } | null>(null);

  const supabase = createClient()
  const handleAddAccount = async () => {
    if (!accountAddingName || !accountAddingBalance) {
      alert('Please fill in all fields');
      return
    }
    const { error } = await supabase
        .from('accounts')
        .insert({
            user_id: userID,
            name: accountAddingName,
            balance: Number(accountAddingBalance),
        }
        )

    if (error) {
      console.error('Error adding account:', error);
      return
    }
    
    // Clear form and close adding mode
    setAccountAddingName('');
    setAccountAddingBalance('');
    setAccountAdding(false);
    
    // Trigger refresh of accounts data
    if (onAccountAdded) {
      onAccountAdded();
    }
  }

  const handleEditAccount = async (account: { name: string; balance: string }) => {
    const { error } = await supabase
      .from('accounts')
      .update({
        name: account.name,
        balance: Number(account.balance),
      })
      .eq('user_id', userID)
      .eq('name', account.name);

    if (error) {
      console.error('Error editing account:', error);
      return;
    }

    // Trigger refresh of accounts data
    if (onAccountAdded) {
      onAccountAdded();
    }
  }

  return (
    <div className="bg-[#2a2a2a] rounded-xl border border-gray-700 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-700 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-white">Your Accounts</h2>
        <button
          className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-lg transition-colors text-sm font-medium"
          onClick={() => setAccountAdding(!accountAdding)}  
        >
          {accountAdding ? 'Cancel' : 'Add Account'}
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[#1a1a1a]">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Account
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Balance
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {accounts.map((account, index) => (
              
              <tr className="hover:bg-[#3a3a3a] transition-colors" key={account.name}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-yellow-400 font-bold">M</span>
                    </div>
                    <div>
                      {currentEditingAccount?.index === index ? (
                        <input
                          type="text"
                          className="bg-transparent border-b border-gray-600 focus:outline-none focus:border-yellow-500"
                          value={currentEditingAccount.name}
                          onChange={(e) => setCurrentEditingAccount({ ...currentEditingAccount, name: e.target.value })}
                        />
                      ) : (
                        <div className="text-sm font-medium text-white">{account.name}</div>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {currentEditingAccount?.index === index ? (
                    <input
                      type="number"
                      className="bg-transparent border-b border-gray-600 focus:outline-none focus:border-yellow-500"
                      value={currentEditingAccount.balance}
                      onChange={(e) => setCurrentEditingAccount({ ...currentEditingAccount, balance: Number(e.target.value) })}
                    />
                  ) : (
                    <span className="text-sm font-medium text-white">{account.balance}</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <div className="flex space-x-2">
                    {currentEditingAccount?.index === index ? (
                    <>
                      <button
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs transition-colors"
                        onClick={async () => {
                          await handleEditAccount({
                            name: currentEditingAccount.name,
                            balance: String(currentEditingAccount.balance)
                          });
                          setCurrentEditingAccount(null); // Exit editing mode after save
                        }}
                      >
                        Save
                      </button>
                      <button
                        className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded text-xs transition-colors"
                        onClick={() => setCurrentEditingAccount(null)}
                      >
                        Cancel
                      </button>
                    </>
                    ) : (
                      <>                      
                        <button
                          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs transition-colors"
                          onClick={() => setCurrentEditingAccount({
                            name: account.name,
                            index,
                            balance: parseFloat(account.balance.replace(/[$,]/g, '')) || 0
                          })}
                        >
                          Edit
                        </button>
                        <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs transition-colors" onClick={() => onDeleteAccount(account.name)}>
                          Delete
                        </button>
                      </>
                    )}
                    
                  </div>
                </td>
              </tr>
            ))}
 
            {/* Adding Account Row */}
            {accountAdding && (
            <tr className="hover:bg-[#3a3a3a] transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center mr-3">
                      <span className="text-yellow-400 font-bold">M</span>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white">
                        <input
                          type="text"
                          className="bg-transparent border-b border-gray-600 focus:outline-none focus:border-yellow-500"
                          placeholder="Account Name"
                          onChange={(e) => setAccountAddingName(e.target.value)}
                          value={accountAddingName}
                        />
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm font-medium text-white">
                    <input
                      type="number"
                      className="bg-transparent border-b border-gray-600 focus:outline-none focus:border-yellow-500"
                      placeholder="Balance"
                      onChange={(e) => setAccountAddingBalance(e.target.value)}
                      value={accountAddingBalance}
                    />
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <div className="flex space-x-2">
                    <button className="bg-green-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs transition-colors" onClick={handleAddAccount}>
                      Confirm
                    </button>
                    <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs transition-colors" onClick={() => setAccountAdding(false)}>
                      Cancel
                    </button>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}