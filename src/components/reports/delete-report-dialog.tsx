"use client"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { MedicalReport } from "@/app/reports/types"

interface DeleteReportDialogProps {
    report: MedicalReport
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function DeleteReportDialog({
    report,
    open,
    onOpenChange,
}: DeleteReportDialogProps) {
    const router = useRouter()
    const [isDeleting, setIsDeleting] = useState(false)

    const handleDelete = async () => {
        setIsDeleting(true)
        try {
            const response = await fetch(`/api/reports/${report.id}`, {
                method: "DELETE",
            })

            if (!response.ok) {
                throw new Error("Failed to delete report")
            }

            toast.success("Report deleted successfully")
            onOpenChange(false)
            router.refresh()
        } catch (error) {
            toast.error("Failed to delete report")
            console.error(error)
        } finally {
            setIsDeleting(false)
        }
    }

    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the report
                        <span className="font-semibold text-foreground"> {report.fileName} </span>
                        and remove the file from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={(e) => {
                            e.preventDefault()
                            handleDelete()
                        }}
                        disabled={isDeleting}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                        {isDeleting ? "Deleting..." : "Delete"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
