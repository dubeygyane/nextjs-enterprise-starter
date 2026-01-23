import Link from 'next/link';

export default function DocsPage() {
    return (
        <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="mb-12">
                    <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                        Documentation
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400">
                        Everything you need to know to build, deploy, and contribute to this project.
                    </p>
                </div>

                <div className="space-y-12">
                    {/* Getting Started */}
                    <section id="getting-started" className="scroll-mt-20">
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 pb-2 border-b border-gray-200 dark:border-gray-800">
                            🚀 Getting Started
                        </h2>
                        <div className="space-y-4">
                            <p className="leading-relaxed">
                                Clone the repository and install dependencies to get your local development environment running.
                            </p>
                            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 font-mono text-sm border border-gray-200 dark:border-gray-800 overflow-x-auto">
                                <p className="text-gray-500 dark:text-gray-500"># Clone repository</p>
                                <p className="mb-2">git clone https://github.com/dubeygyane/nextjs-enterprise-starter.git</p>

                                <p className="text-gray-500 dark:text-gray-500 mt-4"># Install dependencies</p>
                                <p className="mb-2">npm install</p>

                                <p className="text-gray-500 dark:text-gray-500 mt-4"># Run development server</p>
                                <p>npm run dev</p>
                            </div>
                        </div>
                    </section>

                    {/* Project Structure */}
                    <section id="structure" className="scroll-mt-20">
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 pb-2 border-b border-gray-200 dark:border-gray-800">
                            📂 Project Structure
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-800">
                                <h3 className="font-semibold text-lg mb-3 text-blue-600 dark:text-blue-400">App Directory</h3>
                                <ul className="space-y-2 text-sm">
                                    <li className="flex gap-2"><span className="font-mono text-gray-500">/app/api</span> <span>Server-side API routes</span></li>
                                    <li className="flex gap-2"><span className="font-mono text-gray-500">/app/dashboard</span> <span>Protected routes</span></li>
                                    <li className="flex gap-2"><span className="font-mono text-gray-500">/app/posts</span> <span>SSG examples</span></li>
                                </ul>
                            </div>
                            <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-800">
                                <h3 className="font-semibold text-lg mb-3 text-blue-600 dark:text-blue-400">Core Logic</h3>
                                <ul className="space-y-2 text-sm">
                                    <li className="flex gap-2"><span className="font-mono text-gray-500">/components</span> <span>Reusable UI & Layouts</span></li>
                                    <li className="flex gap-2">
                                        <span className="font-mono text-gray-500">/hooks</span>
                                        <span>
                                            Custom React Hooks
                                            <Link href="/docs/hooks" className="text-blue-600 dark:text-blue-400 hover:underline ml-1">
                                                (See Guide)
                                            </Link>
                                        </span>
                                    </li>
                                    <li className="flex gap-2"><span className="font-mono text-gray-500">/lib</span> <span>Axios & Query configs</span></li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Authentication */}
                    <section id="authentication" className="scroll-mt-20">
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 pb-2 border-b border-gray-200 dark:border-gray-800">
                            🔐 Authentication
                        </h2>
                        <div className="prose dark:prose-invert max-w-none">
                            <p>
                                The project uses a secure, token-based authentication system. It leverages <strong>Edge Middleware</strong> to protect routes before they even render.
                            </p>
                            <ul className="list-disc pl-5 mt-4 space-y-2">
                                <li><strong>Middleware:</strong> Checks for auth token on protected routes (matched in <code className="text-sm bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">middleware.ts</code>).</li>
                                <li><strong>Hooks:</strong> <code className="text-sm bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">useLoginMutation</code> handles login logic and redirects.</li>
                                <li><strong>Axios Interceptor:</strong> Automatically attaches Bearer tokens to every outgoing API request.</li>
                            </ul>
                        </div>
                    </section>

                    {/* Contributing */}
                    <section id="contributing" className="scroll-mt-20">
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 pb-2 border-b border-gray-200 dark:border-gray-800">
                            🤝 Contributing
                        </h2>
                        <p className="mb-4">
                            We welcome contributions! Please follow these steps to contribute:
                        </p>
                        <ol className="list-decimal pl-5 space-y-3">
                            <li className="pl-2">Fork the repository to your own GitHub account.</li>
                            <li className="pl-2">Create a new branch for your feature or bug fix: <code className="text-sm bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">git checkout -b feature/amazing-feature</code></li>
                            <li className="pl-2">Commit your changes and push to your fork.</li>
                            <li className="pl-2">Open a Pull Request describing your changes.</li>
                        </ol>
                    </section>

                    {/* Need Help */}
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-8 border border-blue-100 dark:border-blue-900/50 text-center">
                        <h3 className="text-xl font-bold text-blue-900 dark:text-blue-100 mb-2">Need more help?</h3>
                        <p className="text-blue-700 dark:text-blue-300 mb-6">
                            Check out the detailed hooks usage guide or open an issue on GitHub.
                        </p>
                        <div className="flex gap-4 justify-center">
                            <Link
                                href="/docs/hooks"
                                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                            >
                                View Hooks Guide
                            </Link>
                            <Link
                                href="/"
                                className="px-6 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg font-medium transition-colors"
                            >
                                Back Home
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
