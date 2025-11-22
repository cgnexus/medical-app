"use client"

import {
    ColumnDef,
    SortingState,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    pageCount: number
}

export function DataTable<TData, TValue>({
    columns,
    data,
    pageCount,
}: DataTableProps<TData, TValue>) {
    const router = useRouter()
    const searchParams = useSearchParams()

    const page = Number(searchParams.get("page")) || 1
    const sortBy = searchParams.get("sortBy") || "uploadedAt"
    const sortOrder = searchParams.get("sortOrder") || "desc"

    const sorting: SortingState = [
        {
            id: sortBy,
            desc: sortOrder === "desc",
        },
    ]

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        manualPagination: true,
        manualSorting: true,
        pageCount,
        state: {
            sorting,
        },
        onSortingChange: (updater) => {
            const newSorting = typeof updater === "function" ? updater(sorting) : updater
            const params = new URLSearchParams(searchParams.toString())

            if (newSorting.length > 0) {
                params.set("sortBy", newSorting[0].id)
                params.set("sortOrder", newSorting[0].desc ? "desc" : "asc")
            }
            params.set("page", "1")

            router.push(`?${params.toString()}`)
        },
    })

    const handlePreviousPage = () => {
        const params = new URLSearchParams(searchParams.toString())
        params.set("page", String(page - 1))
        router.push(`?${params.toString()}`)
    }

    const handleNextPage = () => {
        const params = new URLSearchParams(searchParams.toString())
        params.set("page", String(page + 1))
        router.push(`?${params.toString()}`)
    }

    return (
        <div>
            <div className="overflow-hidden rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No reports found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-between space-x-2 py-4">
                <div className="text-sm text-muted-foreground">
                    Page {page} of {pageCount}
                </div>
                <div className="flex space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handlePreviousPage}
                        disabled={page <= 1}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleNextPage}
                        disabled={page >= pageCount}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    )
}
