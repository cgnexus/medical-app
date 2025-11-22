"use client"

import { Lock, Shield, Server } from "lucide-react"

export function Security() {
    return (
        <section id="security" className="py-20 bg-slate-900 text-white">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                        Bank-Grade Security for Your Health Data
                    </h2>
                    <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
                        We take your privacy seriously. Your data is encrypted, protected, and yours alone.
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-3">
                    <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-slate-800/50 border border-slate-700">
                        <div className="w-12 h-12 rounded-full bg-blue-900/50 flex items-center justify-center mb-4">
                            <Lock className="h-6 w-6 text-blue-400" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">End-to-End Encryption</h3>
                        <p className="text-slate-400">
                            Your data is encrypted in transit and at rest using AES-256 standards.
                        </p>
                    </div>

                    <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-slate-800/50 border border-slate-700">
                        <div className="w-12 h-12 rounded-full bg-emerald-900/50 flex items-center justify-center mb-4">
                            <Shield className="h-6 w-6 text-emerald-400" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">HIPAA Compliant</h3>
                        <p className="text-slate-400">
                            Our platform adheres to strict healthcare data privacy regulations.
                        </p>
                    </div>

                    <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-slate-800/50 border border-slate-700">
                        <div className="w-12 h-12 rounded-full bg-purple-900/50 flex items-center justify-center mb-4">
                            <Server className="h-6 w-6 text-purple-400" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">Local Processing</h3>
                        <p className="text-slate-400">
                            Sensitive OCR processing happens securely, minimizing data exposure.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
