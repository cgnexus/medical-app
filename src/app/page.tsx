import { Navbar } from "@/components/landing/navbar"
import { Hero } from "@/components/landing/hero"
import { Features } from "@/components/landing/features"
import { HowItWorks } from "@/components/landing/how-it-works"
import { InteractiveChart } from "@/components/landing/interactive-chart"
import { Security } from "@/components/landing/security"
import { Footer } from "@/components/landing/footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-white font-sans">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <InteractiveChart />
        <Security />
      </main>
      <Footer />
    </div>
  )
}
