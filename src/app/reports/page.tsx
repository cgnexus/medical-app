import { columns } from "./columns"
import { DataTable } from "./data-table"
import prisma from "@/lib/prisma"

export const dynamic = 'force-dynamic'

interface ReportsPageProps {
    searchParams: {
        page?: string
        sortBy?: string
        sortOrder?: string
    }
}

export default async function ReportsPage({ searchParams }: ReportsPageProps) {
    const page = Number(searchParams.page) || 1
    const pageSize = 10
    const sortBy = searchParams.sortBy || "uploadedAt"
    const sortOrder = searchParams.sortOrder || "desc"

    // Calculate pagination
    const skip = (page - 1) * pageSize

    // Fetch reports with pagination and sorting
    const [reports, totalCount] = await Promise.all([
        prisma.medicalReport.findMany({
            skip,
            take: pageSize,
            orderBy: {
                [sortBy]: sortOrder,
            },
        }),
        prisma.medicalReport.count(),
    ])

    const pageCount = Math.ceil(totalCount / pageSize)

    return (
        <div className="container mx-auto py-10">
            <div className="mb-8">
                <h1 className="text-3xl font-bold">Medical Reports</h1>
                <p className="text-muted-foreground">
                    View all uploaded medical reports
                </p>
            </div>
            <DataTable columns={columns} data={reports} pageCount={pageCount} />
        </div>
    )
}
