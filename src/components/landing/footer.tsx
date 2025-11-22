"use client"

import Link from "next/link"
import { Activity, Twitter, Github, Linkedin } from "lucide-react"

export function Footer() {
    return (
        <footer className="bg-slate-50 border-t border-slate-200 py-12">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid gap-8 md:grid-cols-4 mb-8">
                    <div className="col-span-1 md:col-span-2">
                        <Link href="/" className="flex items-center gap-2 mb-4">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
                                <Activity className="h-5 w-5" />
                            </div>
                            <span className="text-xl font-bold text-slate-900">GlucoLens</span>
                        </Link>
                        <p className="text-slate-600 max-w-xs">
                            Empowering patients to understand their health data through intelligent digitization and visualization.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-semibold text-slate-900 mb-4">Product</h4>
                        <ul className="space-y-2 text-sm text-slate-600">
                            <li><Link href="#features" className="hover:text-blue-600">Features</Link></li>
                            <li><Link href="#how-it-works" className="hover:text-blue-600">How it Works</Link></li>
                            <li><Link href="/report-upload" className="hover:text-blue-600">Upload Report</Link></li>
                            <li><Link href="/reports" className="hover:text-blue-600">View Reports</Link></li>
                            <li><Link href="#security" className="hover:text-blue-600">Security</Link></li>
                            <li><Link href="/pricing" className="hover:text-blue-600">Pricing</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-slate-900 mb-4">Legal</h4>
                        <ul className="space-y-2 text-sm text-slate-600">
                            <li><Link href="/privacy" className="hover:text-blue-600">Privacy Policy</Link></li>
                            <li><Link href="/terms" className="hover:text-blue-600">Terms of Service</Link></li>
                            <li><Link href="/contact" className="hover:text-blue-600">Contact Us</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-slate-200">
                    <p className="text-sm text-slate-500 mb-4 md:mb-0">
                        &copy; {new Date().getFullYear()} GlucoLens. All rights reserved.
                    </p>
                    <div className="flex gap-4">
                        <Link href="#" className="text-slate-400 hover:text-blue-600 transition-colors">
                            <Twitter className="h-5 w-5" />
                            <span className="sr-only">Twitter</span>
                        </Link>
                        <Link href="#" className="text-slate-400 hover:text-blue-600 transition-colors">
                            <Github className="h-5 w-5" />
                            <span className="sr-only">GitHub</span>
                        </Link>
                        <Link href="#" className="text-slate-400 hover:text-blue-600 transition-colors">
                            <Linkedin className="h-5 w-5" />
                            <span className="sr-only">LinkedIn</span>
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
