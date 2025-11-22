"use client"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { useState, useRef } from "react"
import { MedicalReport } from "@/app/reports/types"
import { useUploadThing } from "@/utils/uploadthing"
import { UploadCloud, X } from "lucide-react"

interface EditReportDialogProps {
    report: MedicalReport
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function EditReportDialog({
    report,
    open,
    onOpenChange,
}: EditReportDialogProps) {
    const router = useRouter()
    const [fileName, setFileName] = useState(report.fileName)
    const [file, setFile] = useState<File | null>(null)
    const [isSaving, setIsSaving] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const { startUpload, isUploading } = useUploadThing("imageUploader", {
        onClientUploadComplete: async (res) => {
            if (res && res.length > 0) {
                const uploadedFile = res[0]
                await updateReport({
                    fileUrl: uploadedFile.url,
                    fileSize: uploadedFile.size,
                    fileType: uploadedFile.type,
                })
            }
        },
        onUploadError: (error: Error) => {
            toast.error(`Upload failed: ${error.message}`)
            setIsSaving(false)
        },
    })

    const updateReport = async (fileData: Partial<MedicalReport> = {}) => {
        try {
            const response = await fetch(`/api/reports/${report.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    fileName,
                    ...fileData,
                }),
            })

            if (!response.ok) {
                throw new Error("Failed to update report")
            }

            toast.success("Report updated successfully")
            onOpenChange(false)
            router.refresh()
        } catch (error) {
            toast.error("Failed to update report")
            console.error(error)
        } finally {
            setIsSaving(false)
        }
    }

    const handleSave = async () => {
        setIsSaving(true)
        if (file) {
            // If a new file is selected, upload it first
            await startUpload([file])
        } else {
            // Just update the name
            await updateReport()
        }
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0]
        if (selectedFile) {
            if (!selectedFile.type.startsWith("image/")) {
                toast.error("Please upload an image file.")
                setFile(null)
            } else {
                setFile(selectedFile)
            }
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit Report</DialogTitle>
                    <DialogDescription>
                        Make changes to your report here. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Name
                        </Label>
                        <Input
                            id="name"
                            value={fileName}
                            onChange={(e) => setFileName(e.target.value)}
                            className="col-span-3"
                            disabled={isSaving || isUploading}
                        />
                    </div>
                    <div className="grid grid-cols-4 items-start gap-4">
                        <Label htmlFor="file" className="text-right pt-2">
                            File
                        </Label>
                        <div className="col-span-3">
                            {!file ? (
                                <div
                                    className="border-2 border-dashed rounded-md p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-muted/50 transition-colors"
                                    onClick={() => fileInputRef.current?.click()}
                                >
                                    <UploadCloud className="h-6 w-6 text-muted-foreground mb-2" />
                                    <span className="text-xs text-muted-foreground">
                                        Click to replace file (optional)
                                    </span>
                                    <Input
                                        ref={fileInputRef}
                                        id="file"
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleFileChange}
                                        disabled={isSaving || isUploading}
                                    />
                                </div>
                            ) : (
                                <div className="flex items-center justify-between p-2 border rounded-md">
                                    <span className="text-sm truncate max-w-[150px]">
                                        {file.name}
                                    </span>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-6 w-6"
                                        onClick={() => {
                                            setFile(null)
                                            if (fileInputRef.current) fileInputRef.current.value = ""
                                        }}
                                        disabled={isSaving || isUploading}
                                    >
                                        <X className="h-4 w-4" />
                                    </Button>
                                </div>
                            )}
                            <p className="text-[10px] text-muted-foreground mt-1">
                                Current file: <a href={report.fileUrl} target="_blank" rel="noreferrer" className="underline">{report.fileName}</a>
                            </p>
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit" onClick={handleSave} disabled={isSaving || isUploading}>
                        {isSaving || isUploading ? "Saving..." : "Save changes"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
