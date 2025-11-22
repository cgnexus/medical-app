import { z } from "zod"

export const ReportExtractionSchema = z.object({
    patientName: z.string().nullable().describe("The name of the patient found in the report"),
    testDate: z.string().nullable().describe("The date of the test or report in YYYY-MM-DD format"),
    summary: z.string().describe("A brief summary of the medical report findings"),
    testResults: z.array(
        z.object({
            testName: z.string(),
            value: z.string(),
            unit: z.string().nullable(),
            referenceRange: z.string().nullable(),
            flag: z.enum(["Low", "Normal", "High", "Critical"]).nullable(),
        })
    ).nullable().describe("List of extracted test results"),
})

export type ReportExtraction = z.infer<typeof ReportExtractionSchema>

export const AgentStateDefinition = z.object({
    reportId: z.number(),
    fileUrl: z.string(),
    extraction: ReportExtractionSchema.nullable(),
    error: z.string().optional(),
})

export type AgentState = z.infer<typeof AgentStateDefinition>
