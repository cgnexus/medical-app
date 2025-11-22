"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MedicalReport } from "./types"
import { ReportActions } from "@/components/reports/report-actions"

const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
}

const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat("en-US", {
        dateStyle: "medium",
        timeStyle: "short",
    }).format(new Date(date))
}

export const columns: ColumnDef<MedicalReport>[] = [
    {
        accessorKey: "id",
        header: "ID",
    },
    {
        accessorKey: "fileName",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    File Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "fileType",
        header: "Type",
    },
    {
        accessorKey: "fileSize",
        header: "Size",
        cell: ({ row }) => {
            return formatFileSize(row.getValue("fileSize"))
        },
    },
    {
        accessorKey: "uploadedAt",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Uploaded At
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            return formatDate(row.getValue("uploadedAt"))
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            return <ReportActions report={row.original} />
        },
    },
]
