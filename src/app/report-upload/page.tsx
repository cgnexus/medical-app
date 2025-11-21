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
import { useState } from "react"
import { useUploadThing } from "@/utils/uploadthing"

export default function ReportUploadPage() {
    const [file, setFile] = useState<File | null>(null)
    const { startUpload, isUploading } = useUploadThing("imageUploader", {
        onClientUploadComplete: () => {
            toast.success("Report uploaded successfully!")
            setFile(null)
        },
        onUploadError: (error: Error) => {
            toast.error(`Upload failed: ${error.message}`)
        },
    })

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0]
        if (selectedFile) {
            if (!selectedFile.type.startsWith("image/")) {
                toast.error("Please upload an image file.")
                e.target.value = "" // Clear the input
                setFile(null)
            } else {
                setFile(selectedFile)
            }
        } else {
            setFile(null)
        }
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
                    <form className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="report">Report Image</Label>
                            <Input
                                id="report"
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                disabled={isUploading}
                            />
                        </div>
                    </form>
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
