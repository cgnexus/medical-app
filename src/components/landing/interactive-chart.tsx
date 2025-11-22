"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function InteractiveChart() {
    const [hoveredPoint, setHoveredPoint] = useState<number | null>(null)

    const data = [
        { month: "Jan", value: 140 },
        { month: "Feb", value: 132 },
        { month: "Mar", value: 125 },
        { month: "Apr", value: 118 },
        { month: "May", value: 110 },
        { month: "Jun", value: 98 },
    ]

    const maxVal = 160
    const minVal = 80

    const getY = (val: number) => {
        return 100 - ((val - minVal) / (maxVal - minVal)) * 100
    }

    return (
        <section className="py-20 bg-white overflow-hidden">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-6">
                            Your Health, Visualized.
                        </h2>
                        <p className="text-lg text-slate-600 mb-8">
                            Don't just store numbers. See the story they tell. GlucoLens turns static reports into dynamic insights, helping you and your doctor make better decisions.
                        </p>
                        <ul className="space-y-4">
                            {[
                                "Track progress over time",
                                "Identify patterns and triggers",
                                "Share easily with your healthcare provider",
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-slate-700">
                                    <div className="h-2 w-2 rounded-full bg-emerald-500" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="relative">
                        <div className="absolute -inset-4 bg-gradient-to-r from-blue-100 to-emerald-100 rounded-xl blur-xl opacity-50"></div>
                        <Card className="relative border-slate-200 shadow-lg">
                            <CardHeader>
                                <CardTitle className="text-slate-900">Fasting Blood Sugar (mg/dL)</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[300px] w-full relative pt-8 pb-6 px-4">
                                    {/* Grid Lines */}
                                    <div className="absolute inset-0 flex flex-col justify-between px-4 py-6 pointer-events-none">
                                        {[160, 140, 120, 100, 80].map((val) => (
                                            <div key={val} className="w-full border-t border-slate-100 flex items-center">
                                                <span className="text-xs text-slate-400 -ml-8 absolute">{val}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Chart Line */}
                                    <svg className="w-full h-full overflow-visible">
                                        <defs>
                                            <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="0%" stopColor="#2563eb" stopOpacity="0.2" />
                                                <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
                                            </linearGradient>
                                        </defs>

                                        {/* Area under curve */}
                                        <path
                                            d={`M 0 ${getY(data[0].value)} ${data.map((d, i) => `L ${(i / (data.length - 1)) * 100}% ${getY(d.value)}`).join(" ")} L 100% 100% L 0 100% Z`}
                                            fill="url(#lineGradient)"
                                            className="transition-all duration-500"
                                        />

                                        {/* Line */}
                                        <path
                                            d={`M 0 ${getY(data[0].value)} ${data.map((d, i) => `L ${(i / (data.length - 1)) * 100}% ${getY(d.value)}`).join(" ")}`}
                                            fill="none"
                                            stroke="#2563eb"
                                            strokeWidth="3"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="drop-shadow-md"
                                        />
                                    </svg>

                                    {/* Data Points */}
                                    <div className="absolute inset-0 px-4 py-6 flex justify-between items-end pointer-events-none">
                                        {data.map((d, i) => (
                                            <div
                                                key={i}
                                                className="relative flex flex-col items-center justify-end h-full group pointer-events-auto"
                                                style={{ width: "20px" }}
                                                onMouseEnter={() => setHoveredPoint(i)}
                                                onMouseLeave={() => setHoveredPoint(null)}
                                            >
                                                {/* Point */}
                                                <div
                                                    className="absolute w-4 h-4 bg-white border-4 border-blue-600 rounded-full shadow-sm transition-transform duration-200 ease-out z-10"
                                                    style={{
                                                        top: `${getY(d.value)}%`,
                                                        transform: `translateY(-50%) scale(${hoveredPoint === i ? 1.5 : 1})`
                                                    }}
                                                />

                                                {/* Tooltip */}
                                                <div
                                                    className={`absolute bottom-full mb-4 px-3 py-2 bg-slate-900 text-white text-xs rounded shadow-lg transition-all duration-200 z-20 whitespace-nowrap ${hoveredPoint === i ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                                                        }`}
                                                    style={{ top: `calc(${getY(d.value)}% - 40px)` }}
                                                >
                                                    <span className="font-bold">{d.value} mg/dL</span>
                                                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 border-4 border-transparent border-t-slate-900"></div>
                                                </div>

                                                {/* X-Axis Label */}
                                                <span className="absolute -bottom-6 text-xs font-medium text-slate-500">
                                                    {d.month}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    )
}
