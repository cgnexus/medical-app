"use client"

import Link from "next/link"
import { Activity } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Navbar() {
    return (
        <nav className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
            <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
                <Link href="/" className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
                        <Activity className="h-5 w-5" />
                    </div>
                    <span className="text-xl font-bold text-slate-900">GlucoLens</span>
                </Link>
                <div className="hidden md:flex items-center gap-8">
                    <Link href="#features" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">
                        Features
                    </Link>
                    <Link href="#how-it-works" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">
                        How it Works
                    </Link>
                    <Link href="#security" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">
                        Security
                    </Link>
                    <Link href="/report-upload" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">
                        Upload
                    </Link>
                    <Link href="/reports" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">
                        Reports
                    </Link>
                </div>
                <div className="flex items-center gap-4">
                    <Link href="/report-upload" className="hidden sm:block text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">
                        Get Started
                    </Link>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                        Get Started
                    </Button>
                </div>
            </div>
        </nav>
    )
}
