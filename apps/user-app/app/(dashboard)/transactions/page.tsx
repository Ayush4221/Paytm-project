import { OnRampTransactions } from "../../../components/OnRampTransactions";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";
import { Center } from "@repo/ui/center";
async function getOnRampTransactions() {
    const session = await getServerSession(authOptions);
    const txns = await prisma.onRampTransaction.findMany({
        where: {
            userId: Number(session?.user?.id)
        }
    });
    return txns.map(t => ({
        time: t.startTime,
        amount: t.amount,
        status: t.status,
        provider: t.provider
    }))
}

export default async function () {
    const transactions = await getOnRampTransactions();
    return <div className="flex justify-center items-center  h-full">
    <div className="flex justify-center">
    <OnRampTransactions transactions={transactions} />
    </div>
</div>
}