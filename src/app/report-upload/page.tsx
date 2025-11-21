"use client"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { useState, useRef } from "react"
import { useUploadThing } from "@/utils/uploadthing"
import { UploadCloud } from "lucide-react"

export default function ReportUploadPage() {
    const [file, setFile] = useState<File | null>(null)
    const [isDragging, setIsDragging] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const { startUpload, isUploading } = useUploadThing("imageUploader", {
        onClientUploadComplete: () => {
            toast.success("Report uploaded successfully!")
            setFile(null)
            if (fileInputRef.current) {
                fileInputRef.current.value = ""
            }
        },
        onUploadError: (error: Error) => {
            toast.error(`Upload failed: ${error.message}`)
        },
    })

    const handleFileSelect = (selectedFile: File | undefined) => {
        if (selectedFile) {
            if (!selectedFile.type.startsWith("image/")) {
                toast.error("Please upload an image file.")
                setFile(null)
            } else {
                setFile(selectedFile)
            }
        }
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0]
        handleFileSelect(selectedFile)
    }

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(true)
    }

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(false)
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(false)
        const droppedFile = e.dataTransfer.files?.[0]
        handleFileSelect(droppedFile)
    }

    const handleUpload = async () => {
        if (!file) return
        await startUpload([file])
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-50 p-4 dark:bg-black">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Upload Report</CardTitle>
                    <CardDescription>
                        Upload your medical report image here.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div
                        className={`relative flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${isDragging
                            ? "border-primary bg-primary/10"
                            : "border-zinc-300 hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
                            }`}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <UploadCloud className="w-10 h-10 mb-3 text-zinc-400" />
                            <p className="mb-2 text-sm text-zinc-500 dark:text-zinc-400">
                                <span className="font-semibold">Click to upload</span> or drag and drop
                            </p>
                            <p className="text-xs text-zinc-500 dark:text-zinc-400">
                                SVG, PNG, JPG or GIF (MAX. 4MB)
                            </p>
                        </div>
                        <Input
                            ref={fileInputRef}
                            id="report"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleFileChange}
                            disabled={isUploading}
                        />
                    </div>
                    {file && (
                        <div className="mt-4 p-2 bg-zinc-100 dark:bg-zinc-800 rounded-md flex items-center justify-between">
                            <span className="text-sm truncate max-w-[200px]">{file.name}</span>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    setFile(null)
                                    if (fileInputRef.current) fileInputRef.current.value = ""
                                }}
                            >
                                Remove
                            </Button>
                        </div>
                    )}
                </CardContent>
                <CardFooter className="flex justify-end">
                    <Button disabled={!file || isUploading} onClick={handleUpload}>
                        {isUploading ? "Uploading..." : "Upload"}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}
