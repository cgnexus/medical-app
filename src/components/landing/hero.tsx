"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, ShieldCheck } from "lucide-react"
import Link from "next/link"

export function Hero() {
    return (
        <section className="relative overflow-hidden bg-slate-50 pt-16 pb-20 lg:pt-24 lg:pb-28">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
                    <div className="flex flex-col justify-center space-y-8">
                        <div className="space-y-4">
                            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl xl:text-6xl">
                                Stop Guessing. <br />
                                <span className="text-blue-600">Start Understanding</span> <br />
                                Your Blood Sugar.
                            </h1>
                            <p className="max-w-[600px] text-lg text-slate-600 md:text-xl leading-relaxed">
                                Snap a photo of your paper lab reports. We instantly digitize your data into clear, interactive charts so you can spot trends and take control.
                            </p>
                        </div>
                        <div className="flex flex-col gap-4 sm:flex-row">
                            <Link href="/report-upload">
                                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white h-12 px-8 text-base">
                                    Analyze My First Report
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </Link>
                        </div>
                        <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
                            <ShieldCheck className="h-5 w-5 text-emerald-500" />
                            <span>HIPAA Compliant & End-to-End Encrypted</span>
                        </div>
                    </div>

                    {/* Hero Visual */}
                    <div className="relative mx-auto w-full max-w-[500px] lg:max-w-none">
                        <div className="relative aspect-square w-full max-w-[500px] mx-auto">
                            {/* Abstract Phone Shape */}
                            <div className="absolute inset-0 bg-white rounded-[3rem] shadow-2xl border-8 border-slate-900 overflow-hidden transform rotate-[-5deg] z-10">
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-6 bg-slate-900 rounded-b-2xl z-20"></div>

                                {/* Screen Content */}
                                <div className="absolute inset-0 bg-slate-50 flex flex-col p-6 pt-12">
                                    <div className="h-4 w-1/3 bg-slate-200 rounded mb-6"></div>
                                    <div className="space-y-3 mb-8">
                                        <div className="h-2 w-full bg-slate-200 rounded"></div>
                                        <div className="h-2 w-5/6 bg-slate-200 rounded"></div>
                                        <div className="h-2 w-4/6 bg-slate-200 rounded"></div>
                                    </div>

                                    {/* Scanning Effect */}
                                    <div className="absolute top-1/3 left-0 right-0 h-1 bg-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.5)] animate-scan"></div>

                                    {/* Floating Graph Card */}
                                    <div className="absolute bottom-8 left-6 right-6 bg-white p-4 rounded-xl shadow-lg border border-slate-100 transform translate-y-4 transition-transform duration-700 ease-out animate-float-up">
                                        <div className="flex justify-between items-end h-24 gap-2">
                                            <div className="w-full bg-blue-100 rounded-t-sm h-[40%]"></div>
                                            <div className="w-full bg-blue-200 rounded-t-sm h-[60%]"></div>
                                            <div className="w-full bg-blue-300 rounded-t-sm h-[30%]"></div>
                                            <div className="w-full bg-blue-400 rounded-t-sm h-[80%]"></div>
                                            <div className="w-full bg-blue-500 rounded-t-sm h-[50%]"></div>
                                            <div className="w-full bg-blue-600 rounded-t-sm h-[70%]"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Decorative Elements */}
                            <div className="absolute -top-12 -right-12 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-50"></div>
                            <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-emerald-100 rounded-full blur-3xl opacity-50"></div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx global>{`
        @keyframes scan {
          0% { top: 20%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 60%; opacity: 0; }
        }
        .animate-scan {
          animation: scan 3s linear infinite;
        }
        @keyframes float-up {
          0% { transform: translateY(20px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        .animate-float-up {
          animation: float-up 1s ease-out forwards 0.5s;
        }
      `}</style>
        </section>
    )
}
