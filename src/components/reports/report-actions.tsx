"use client"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Pencil, Trash, Eye, Copy } from "lucide-react"
import { useState } from "react"
import { MedicalReport } from "@/app/reports/types"
import { DeleteReportDialog } from "./delete-report-dialog"
import { EditReportDialog } from "./edit-report-dialog"
import { toast } from "sonner"

interface ReportActionsProps {
    report: MedicalReport
}

export function ReportActions({ report }: ReportActionsProps) {
    const [showDeleteDialog, setShowDeleteDialog] = useState(false)
    const [showEditDialog, setShowEditDialog] = useState(false)

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem
                        onClick={() => window.open(report.fileUrl, "_blank")}
                    >
                        <Eye className="mr-2 h-4 w-4" />
                        View file
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => {
                            navigator.clipboard.writeText(report.fileUrl)
                            toast.success("File URL copied to clipboard")
                        }}
                    >
                        <Copy className="mr-2 h-4 w-4" />
                        Copy file URL
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setShowEditDialog(true)}>
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => setShowDeleteDialog(true)}
                        className="text-destructive focus:text-destructive"
                    >
                        <Trash className="mr-2 h-4 w-4" />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <DeleteReportDialog
                report={report}
                open={showDeleteDialog}
                onOpenChange={setShowDeleteDialog}
            />

            <EditReportDialog
                report={report}
                open={showEditDialog}
                onOpenChange={setShowEditDialog}
            />
        </>
    )
}
