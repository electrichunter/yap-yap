"use client";

type Expense = {
    id: string;
    date: string;
    item: string;
    amount: number;
    category: "material" | "labor" | "other";
    hasReceipt: boolean;
};

export default function CostTracker({ expenses }: { expenses: Expense[] }) {
    const total = expenses.reduce((acc, curr) => acc + curr.amount, 0);

    return (
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                    💰 Şeffaf Kasa
                </h2>
                <div className="text-right">
                    <p className="text-sm text-muted-foreground">Toplam Harcama</p>
                    <p className="text-2xl font-bold text-primary">
                        {new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY" }).format(total)}
                    </p>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="text-muted-foreground bg-muted/20 border-b border-border">
                        <tr>
                            <th className="px-4 py-3 font-medium">Tarih</th>
                            <th className="px-4 py-3 font-medium">Kalem</th>
                            <th className="px-4 py-3 font-medium">Kategori</th>
                            <th className="px-4 py-3 font-medium text-right">Tutar</th>
                            <th className="px-4 py-3 font-medium text-center">Fiş/Fatura</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {expenses.map((expense) => (
                            <tr key={expense.id} className="hover:bg-muted/10 transition-colors">
                                <td className="px-4 py-3">{expense.date}</td>
                                <td className="px-4 py-3 font-medium text-foreground">{expense.item}</td>
                                <td className="px-4 py-3 capitalize text-muted-foreground">
                                    {expense.category === "material" ? "Malzeme" : expense.category === "labor" ? "İşçilik" : "Diğer"}
                                </td>
                                <td className="px-4 py-3 text-right font-semibold">
                                    {new Intl.NumberFormat("tr-TR", { style: "decimal", minimumFractionDigits: 2 }).format(expense.amount)} ₺
                                </td>
                                <td className="px-4 py-3 text-center">
                                    {expense.hasReceipt ? (
                                        <button className="text-xs bg-primary/10 text-primary px-2 py-1 rounded hover:bg-primary/20 transition-colors">
                                            Görüntüle
                                        </button>
                                    ) : (
                                        <span className="text-muted-foreground text-xs">-</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
