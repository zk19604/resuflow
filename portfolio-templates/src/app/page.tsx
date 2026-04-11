import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center min-h-screen bg-gradient-to-br from-zinc-900 via-violet-950 to-zinc-900 font-sans">
      <main className="flex flex-col items-center justify-center px-8 py-20 text-center">
        <h1 className="text-5xl font-bold text-white mb-4">
          ResuFlow
        </h1>
        <p className="text-lg text-zinc-400 max-w-md mb-8">
          Dynamic portfolio templates powered by your data
        </p>
        
        <div className="flex flex-col gap-4">
          <Link
            href="/demo"
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-blue-600 px-6 text-white font-medium transition-all hover:opacity-90 md:w-auto"
          >
            View Demo Portfolio
          </Link>
        </div>

        <div className="mt-16 text-zinc-500 text-sm">
          <p>Access portfolios at <code className="bg-zinc-800 px-2 py-1 rounded">/your-username</code></p>
        </div>
      </main>
    </div>
  );
}
