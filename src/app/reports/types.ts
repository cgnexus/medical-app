export type MedicalReport = {
    id: number
    fileName: string
    fileUrl: string
    fileSize: number
    fileType: string
    uploadedAt: Date
    analysis?: {
        id: number
        summary: string
        patientName: string | null
        testDate: Date | null
        extractedData: any
        createdAt: Date
        updatedAt: Date
    } | null
}
