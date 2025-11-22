import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { graph } from "@/lib/agent/graph"

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { reportId } = body

        if (!reportId) {
            return NextResponse.json(
                { error: "Report ID is required" },
                { status: 400 }
            )
        }

        const report = await prisma.medicalReport.findUnique({
            where: { id: reportId },
        })

        if (!report) {
            return NextResponse.json(
                { error: "Report not found" },
                { status: 404 }
            )
        }

        // Invoke the agent
        const result = await graph.invoke({
            reportId: report.id,
            fileUrl: report.fileUrl,
        })

        if (result.error) {
            return NextResponse.json(
                { error: result.error },
                { status: 500 }
            )
        }

        return NextResponse.json({ success: true, extraction: result.extraction })
    } catch (error) {
        console.error("Error analyzing report:", error)
        return NextResponse.json(
            { error: "Failed to analyze report" },
            { status: 500 }
        )
    }
}
