

import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { prisma } from "@/lib/prisma"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Activity, Calendar, FileText, User, ChevronRight } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>
}) {
  const params = await searchParams
  const reports = await prisma.medicalReport.findMany({
    where: {
      analysis: { isNot: null },
    },
    orderBy: {
      uploadedAt: "desc",
    },
    include: {
      analysis: true,
    },
  })

  const selectedId = params.id ? parseInt(params.id) : reports[0]?.id
  const selectedReport = reports.find((r) => r.id === selectedId) || reports[0]
  const analysis = selectedReport?.analysis
  const extractedData = analysis?.extractedData as any

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Analysis Overview</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0 md:flex-row">
          {/* Reports List (Sidebar) */}
          <div className="w-full md:w-1/4 min-w-[250px] flex flex-col gap-2">
            <h3 className="font-semibold text-lg mb-2">Recent Reports</h3>
            <div className="flex flex-col gap-2">
              {reports.length === 0 ? (
                <div className="text-sm text-muted-foreground p-4 border border-dashed rounded-lg text-center">
                  No reports found
                </div>
              ) : (
                reports.map((report) => (
                  <Link
                    key={report.id}
                    href={`/dashboard?id=${report.id}`}
                    className={cn(
                      "flex items-center justify-between p-3 rounded-lg border transition-colors hover:bg-muted/50",
                      selectedReport?.id === report.id
                        ? "bg-muted border-primary/50"
                        : "bg-card"
                    )}
                  >
                    <div className="flex flex-col gap-1 overflow-hidden">
                      <span className="font-medium truncate">
                        {report.analysis?.patientName || "Unknown Patient"}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(report.uploadedAt).toLocaleDateString()}
                      </span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </Link>
                ))
              )}
            </div>
          </div>

          {/* Selected Report Details */}
          <div className="flex-1">
            {!analysis ? (
              <div className="flex h-full items-center justify-center rounded-xl border border-dashed shadow-sm p-8">
                <div className="flex flex-col items-center gap-1 text-center">
                  <h3 className="text-2xl font-bold tracking-tight">
                    No Analysis Selected
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Select a report from the list to view details.
                  </p>
                </div>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Patient Name
                    </CardTitle>
                    <User className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {analysis.patientName || "Unknown"}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Test Date
                    </CardTitle>
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {analysis.testDate
                        ? new Date(analysis.testDate).toLocaleDateString()
                        : "Unknown"}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Report Type
                    </CardTitle>
                    <FileText className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">Lab Report</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Tests Found
                    </CardTitle>
                    <Activity className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {extractedData?.testResults?.length || 0}
                    </div>
                  </CardContent>
                </Card>

                <Card className="col-span-4">
                  <CardHeader>
                    <CardTitle>Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {analysis.summary}
                    </p>
                  </CardContent>
                </Card>

                <Card className="col-span-4">
                  <CardHeader>
                    <CardTitle>Test Results</CardTitle>
                    <CardDescription>
                      Detailed breakdown of extracted test values.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Test Name</TableHead>
                          <TableHead>Value</TableHead>
                          <TableHead>Unit</TableHead>
                          <TableHead>Reference Range</TableHead>
                          <TableHead>Flag</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {extractedData?.testResults?.map(
                          (result: any, index: number) => (
                            <TableRow key={index}>
                              <TableCell className="font-medium">
                                {result.testName}
                              </TableCell>
                              <TableCell>{result.value}</TableCell>
                              <TableCell>{result.unit || "-"}</TableCell>
                              <TableCell>{result.referenceRange || "-"}</TableCell>
                              <TableCell>
                                {result.flag ? (
                                  <span
                                    className={cn(
                                      "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                                      (result.flag === "High" || result.flag === "Critical") && "bg-red-100 text-red-800",
                                      result.flag === "Low" && "bg-yellow-100 text-yellow-800",
                                      result.flag === "Normal" && "bg-green-100 text-green-800"
                                    )}
                                  >
                                    {result.flag}
                                  </span>
                                ) : (
                                  "-"
                                )}
                              </TableCell>
                            </TableRow>
                          )
                        )}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
