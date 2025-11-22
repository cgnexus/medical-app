import { ChatOpenAI } from "@langchain/openai"
import { AgentState, ReportExtractionSchema } from "./schema"
import { prisma } from "@/lib/prisma"

const llm = new ChatOpenAI({
    model: "gpt-4o",
    temperature: 0,
})

export async function extractData(state: AgentState): Promise<Partial<AgentState>> {
    console.log("Extracting data from report:", state.fileUrl)

    try {
        const structuredLlm = llm.withStructuredOutput(ReportExtractionSchema)

        const response = await structuredLlm.invoke([
            {
                role: "system",
                content: "You are an expert medical data extraction AI. Your task is to analyze the provided image of a medical laboratory report and extract key information precisely for storage in a database.",
            },
            {
                role: "user",
                content: [
                    {
                        type: "text",
                        text: "Analyze this medical report image and extract the patient name, date, summary, and test results.",
                    },
                    {
                        type: "image_url",
                        image_url: {
                            url: state.fileUrl,
                        },
                    },
                ],
            },
        ])

        console.log("Extraction response:", JSON.stringify(response, null, 2))

        return { extraction: response }
    } catch (error) {
        console.error("Error extracting data:", error)
        return { error: "Failed to extract data from image" }
    }
}

export async function saveResults(state: AgentState): Promise<Partial<AgentState>> {
    console.log("Saving results for report:", state.reportId)

    if (!state.extraction) {
        return { error: "No extraction data to save" }
    }

    try {
        // Convert string date to Date object if possible, otherwise null
        const testDate = state.extraction.testDate ? new Date(state.extraction.testDate) : null

        // Validate date
        const validTestDate = testDate && !isNaN(testDate.getTime()) ? testDate : null

        console.log("Prisma keys:", Object.keys(prisma))
        console.log("Has reportAnalysis:", !!prisma.reportAnalysis)

        await prisma.reportAnalysis.upsert({
            where: { reportId: state.reportId },
            update: {
                summary: state.extraction.summary,
                patientName: state.extraction.patientName,
                testDate: validTestDate,
                extractedData: state.extraction as any, // Prisma Json type handling
            },
            create: {
                reportId: state.reportId,
                summary: state.extraction.summary,
                patientName: state.extraction.patientName,
                testDate: validTestDate,
                extractedData: state.extraction as any,
            },
        })

        return {}
    } catch (error) {
        console.error("Error saving results:", error)
        return { error: "Failed to save results to database" }
    }
}
