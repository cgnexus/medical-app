import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { UTApi } from "uploadthing/server"

const utapi = new UTApi()

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const reportId = parseInt(id)

        if (isNaN(reportId)) {
            return NextResponse.json(
                { error: "Invalid report ID" },
                { status: 400 }
            )
        }

        // 1. Fetch the report to get the file key/url
        const report = await prisma.medicalReport.findUnique({
            where: { id: reportId },
        })

        if (!report) {
            return NextResponse.json(
                { error: "Report not found" },
                { status: 404 }
            )
        }

        // 2. Delete file from UploadThing
        // Assuming fileUrl contains the key or we can extract it. 
        // UploadThing keys are usually the last part of the URL.
        // However, utapi.deleteFiles accepts keys. 
        // Let's try to extract key from URL. 
        // Example URL: https://utfs.io/f/KEY
        const fileKey = report.fileUrl.split("/").pop()
        console.log("Deleting file with key:", fileKey, "from URL:", report.fileUrl)

        if (fileKey) {
            await utapi.deleteFiles(fileKey)
        }

        // 3. Delete record from Prisma
        await prisma.medicalReport.delete({
            where: { id: reportId },
        })

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error("Error deleting report:", error)
        return NextResponse.json(
            { error: "Failed to delete report" },
            { status: 500 }
        )
    }
}

export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const reportId = parseInt(id)
        const body = await request.json()
        const { fileName, fileUrl, fileSize, fileType } = body

        if (isNaN(reportId)) {
            return NextResponse.json(
                { error: "Invalid report ID" },
                { status: 400 }
            )
        }

        const existingReport = await prisma.medicalReport.findUnique({
            where: { id: reportId },
        })

        if (!existingReport) {
            return NextResponse.json(
                { error: "Report not found" },
                { status: 404 }
            )
        }

        // If a new file is provided, delete the old one
        if (fileUrl && fileUrl !== existingReport.fileUrl) {
            const oldFileKey = existingReport.fileUrl.split("/").pop()
            if (oldFileKey) {
                await utapi.deleteFiles(oldFileKey)
            }
        }

        const updatedReport = await prisma.medicalReport.update({
            where: { id: reportId },
            data: {
                fileName: fileName || existingReport.fileName,
                fileUrl: fileUrl || existingReport.fileUrl,
                fileSize: fileSize || existingReport.fileSize,
                fileType: fileType || existingReport.fileType,
            },
        })

        return NextResponse.json(updatedReport)
    } catch (error) {
        console.error("Error updating report:", error)
        return NextResponse.json(
            { error: "Failed to update report" },
            { status: 500 }
        )
    }
}
