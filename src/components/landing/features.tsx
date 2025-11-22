"use client"

import { FileWarning, TrendingDown, SearchX } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function Features() {
    return (
        <section id="features" className="py-20 bg-white">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                        The Problem with Paper Reports
                    </h2>
                    <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
                        Managing physical health records is stressful and inefficient. GlucoLens solves these common pain points.
                    </p>
                </div>
                <div className="grid gap-8 md:grid-cols-3">
                    <Card className="border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                        <CardHeader>
                            <div className="w-12 h-12 rounded-lg bg-red-100 flex items-center justify-center mb-4">
                                <FileWarning className="h-6 w-6 text-red-600" />
                            </div>
                            <CardTitle className="text-xl font-semibold text-slate-900">Lost Paperwork</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-slate-600">
                                Physical reports get lost, damaged, or buried in drawers. You never have them when you need them most.
                            </p>
                        </CardContent>
                    </Card>
                    <Card className="border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                        <CardHeader>
                            <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center mb-4">
                                <SearchX className="h-6 w-6 text-orange-600" />
                            </div>
                            <CardTitle className="text-xl font-semibold text-slate-900">Confusing Numbers</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-slate-600">
                                Raw data on a page is hard to interpret. It's difficult to know if your levels are improving or worsening.
                            </p>
                        </CardContent>
                    </Card>
                    <Card className="border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                        <CardHeader>
                            <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center mb-4">
                                <TrendingDown className="h-6 w-6 text-slate-600" />
                            </div>
                            <CardTitle className="text-xl font-semibold text-slate-900">Missed Trends</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-slate-600">
                                Without visualization, slow changes over months go unnoticed until they become big problems.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    )
}
