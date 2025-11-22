"use client"

import { Camera, ScanLine, LineChart } from "lucide-react"

export function HowItWorks() {
    return (
        <section id="how-it-works" className="py-20 bg-slate-50">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                        From Paper to Digital in Seconds
                    </h2>
                    <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
                        Our advanced OCR technology does the heavy lifting for you.
                    </p>
                </div>

                <div className="relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-200 -translate-y-1/2 z-0"></div>

                    <div className="grid gap-12 md:grid-cols-3 relative z-10">
                        {/* Step 1 */}
                        <div className="flex flex-col items-center text-center bg-slate-50 md:bg-transparent p-4">
                            <div className="w-20 h-20 rounded-full bg-white border-4 border-blue-100 flex items-center justify-center mb-6 shadow-sm">
                                <Camera className="h-10 w-10 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">1. Snap</h3>
                            <p className="text-slate-600">
                                Take a clear photo of your blood sugar or lab report using your phone.
                            </p>
                        </div>

                        {/* Step 2 */}
                        <div className="flex flex-col items-center text-center bg-slate-50 md:bg-transparent p-4">
                            <div className="w-20 h-20 rounded-full bg-white border-4 border-blue-100 flex items-center justify-center mb-6 shadow-sm">
                                <ScanLine className="h-10 w-10 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">2. Extract</h3>
                            <p className="text-slate-600">
                                Our AI instantly scans the document and extracts your health data.
                            </p>
                        </div>

                        {/* Step 3 */}
                        <div className="flex flex-col items-center text-center bg-slate-50 md:bg-transparent p-4">
                            <div className="w-20 h-20 rounded-full bg-white border-4 border-blue-100 flex items-center justify-center mb-6 shadow-sm">
                                <LineChart className="h-10 w-10 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">3. Visualize</h3>
                            <p className="text-slate-600">
                                See your data plotted on an interactive timeline to spot trends easily.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
