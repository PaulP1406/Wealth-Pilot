export default function TransactionsSummary() {
    const summaryData = [
        {
            title: "Total Income",
            amount: "$8,450.00",
            color: "green",
            icon: "📈"
        },
        {
            title: "Total Expenses",
            amount: "$3,280.50",
            color: "red",
            icon: "📉"
        },
        {
            title: "Net Flow",
            amount: "$5,169.50",
            color: "yellow",
            icon: "💰"
        },
        {
            title: "Transactions",
            amount: "127",
            color: "blue",
            icon: "📊"
        }
    ]

    const getColorClasses = (color: string) => {
        const colors = {
            green: "text-green-400 bg-green-500/20",
            red: "text-red-400 bg-red-500/20",
            yellow: "text-yellow-400 bg-yellow-500/20",
            blue: "text-blue-400 bg-blue-500/20"
        }
        return colors[color as keyof typeof colors]
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {summaryData.map((item, index) => (
                <div key={index} className="bg-[#2a2a2a] rounded-xl p-6 border border-gray-700">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-400 text-sm">{item.title}</p>
                            <p className={`text-2xl font-bold ${item.color === 'blue' ? 'text-white' : getColorClasses(item.color).split(' ')[0]}`}>
                                {item.amount}
                            </p>
                        </div>
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getColorClasses(item.color).split(' ')[1]}`}>
                            <span className={`text-xl ${getColorClasses(item.color).split(' ')[0]}`}>
                                {item.icon}
                            </span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}