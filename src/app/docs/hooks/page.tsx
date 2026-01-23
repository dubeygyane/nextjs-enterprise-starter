import Link from 'next/link';

export default function HooksGuidePage() {
    return (
        <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="mb-8">
                    <Link
                        href="/docs"
                        className="text-blue-600 dark:text-blue-400 hover:underline mb-4 inline-block font-medium"
                    >
                        ← Back to Documentation
                    </Link>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
                        Custom Hooks Guide
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400">
                        Type-safe wrappers around TanStack Query for seamless API interaction.
                    </p>
                </div>

                <div className="space-y-16">
                    {/* useFetch */}
                    <section id="use-fetch" className="scroll-mt-20">
                        <div className="flex items-center gap-3 mb-6">
                            <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm font-mono font-bold">GET</span>
                            <h2 className="text-3xl font-bold">useFetch</h2>
                        </div>

                        <p className="mb-6 text-gray-600 dark:text-gray-300">
                            A wrapper around <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">useQuery</code> that handles data fetching, caching, and automatic error handling (including 401 redirects).
                        </p>

                        <div className="bg-gray-900 rounded-xl overflow-hidden shadow-lg mb-6">
                            <div className="flex items-center px-4 py-2 bg-gray-800 border-b border-gray-700">
                                <div className="flex gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-500" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                    <div className="w-3 h-3 rounded-full bg-green-500" />
                                </div>
                                <span className="ml-4 text-xs text-gray-400 font-mono">Example Usage</span>
                            </div>
                            <pre className="p-6 overflow-x-auto text-sm text-gray-300 font-mono">
                                {`// 1. Import the hook
import { useFetch } from '@/hooks/useFetch';

// 2. Define your data type
interface UserProfile {
  id: string;
  name: string;
  email: string;
}

// 3. Use in component
export function Profile() {
  const { 
    data,       // Type: UserProfile | undefined
    isLoading,  // Type: boolean
    error,      // Type: Error | null
    refetch     // Function to manually reload
  } = useFetch<UserProfile>('/api/profile');

  if (isLoading) return <Skeleton />;
  if (error) return <Error message={error.message} />;

  return <div>Welcome, {data?.name}</div>;
}`}
                            </pre>
                        </div>

                        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-100 dark:border-blue-900/50">
                            <h3 className="tex-lg font-bold text-blue-900 dark:text-blue-100 mb-2">Key Features</h3>
                            <ul className="list-disc pl-5 space-y-1 text-blue-800 dark:text-blue-200 text-sm">
                                <li><strong>Auto-Auth:</strong> Automatically attaches Bearer token from cookies.</li>
                                <li><strong>Auto-Logout:</strong> Redirects to login if API returns 401/403.</li>
                                <li><strong>Type Safety:</strong> Full TypeScript support for response data.</li>
                            </ul>
                        </div>
                    </section>

                    <div className="h-px bg-gray-200 dark:bg-gray-800" />

                    {/* useMutate */}
                    <section id="use-mutate" className="scroll-mt-20">
                        <div className="flex items-center gap-3 mb-6">
                            <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-mono font-bold">POST/PUT/DEL</span>
                            <h2 className="text-3xl font-bold">useMutate</h2>
                        </div>

                        <p className="mb-6 text-gray-600 dark:text-gray-300">
                            A wrapper around <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">useMutation</code> for modifying server state. It simplifies cache invalidation and UI updates.
                        </p>

                        <div className="bg-gray-900 rounded-xl overflow-hidden shadow-lg mb-6">
                            <div className="flex items-center px-4 py-2 bg-gray-800 border-b border-gray-700">
                                <span className="ml-4 text-xs text-gray-400 font-mono">Example Usage</span>
                            </div>
                            <pre className="p-6 overflow-x-auto text-sm text-gray-300 font-mono">
                                {`import { useMutate } from '@/hooks/useMutate';

export function CreatePost() {
  const createPost = useMutate<Post, NewPostInput>(
    '/api/posts', 
    'POST', 
    {
      // Automatically refetch the post list after success
      invalidates: ['/api/posts'],
      
      onSuccess: (data) => {
        toast.success('Post created!');
      }
    }
  );

  const handleSubmit = (data) => {
    createPost.mutate(data);
  };

  return (
    <Button 
      onClick={handleSubmit} 
      isLoading={createPost.isPending}
    >
      Create Post
    </Button>
  );
}`}
                            </pre>
                        </div>
                    </section>

                    <div className="h-px bg-gray-200 dark:bg-gray-800" />

                    {/* Authentication */}
                    <section id="auth-hooks" className="scroll-mt-20">
                        <div className="flex items-center gap-3 mb-6">
                            <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm font-mono font-bold">AUTH</span>
                            <h2 className="text-3xl font-bold">useLoginMutation</h2>
                        </div>
                        <p className="mb-6 text-gray-600 dark:text-gray-300">
                            Specialized hook for handling the login flow, including token storage and redirection.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-800">
                                <h3 className="font-bold mb-3">What it does</h3>
                                <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600 dark:text-gray-400">
                                    <li>Accepts email/password credentials</li>
                                    <li>Calls the login API endpoint</li>
                                    <li>Stores the returned token in a secure HttpOnly cookie</li>
                                    <li>Updates the global user state</li>
                                    <li>Redirects to <code className="text-xs bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">/dashboard</code> automatically</li>
                                </ul>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
