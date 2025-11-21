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
import { useState } from "react"

export default function ReportUploadPage() {
    const [error, setError] = useState<string | null>(null)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            if (!file.type.startsWith("image/")) {
                setError("Please upload an image file.")
                e.target.value = "" // Clear the input
            } else {
                setError(null)
            }
        }
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
                            />
                            {error && <p className="text-sm text-red-500">{error}</p>}
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-end">
                    <Button>Upload</Button>
                </CardFooter>
            </Card>
        </div>
    )
}
