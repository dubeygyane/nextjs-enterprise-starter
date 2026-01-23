
import axiosInstance from '@/lib/axios';
import { FileTextIcon } from '@/components/ui/Icons';
import Link from 'next/link';

/**
 * Example Server Component with Static Site Generation (SSG)
 * 
 * This page fetches data at build time (or strictly cached) using the 
 * pre-configured axios instance. It demonstrates how to integrate
 * existing tools into the Next.js App Router for static content.
 */

interface Post {
    id: number;
    title: string;
    body: string;
}

export default async function PostsPage() {
    // Fetch data using the existing axios instance
    // Since we provide a full URL, it overrides the default baseURL
    // This call happens on the server
    const { data: posts } = await axiosInstance.get<Post[]>('https://jsonplaceholder.typicode.com/posts?_limit=9');

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4 flex items-center justify-center gap-3">
                        <FileTextIcon className="text-blue-600 dark:text-blue-400" />
                        Static Blog Example
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        This page is statically generated. The data below was fetched from a dummy API using Axios during the server render.
                    </p>
                    <div className="mt-6">
                        <Link
                            href="/"
                            className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
                        >
                            ← Back to Home
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post) => (
                        <article
                            key={post.id}
                            className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-100 dark:border-gray-700 flex flex-col"
                        >
                            <div className="p-6 flex-1">
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 capitalize">
                                    {post.title}
                                </h2>
                                <p className="text-gray-600 dark:text-gray-300 line-clamp-4 leading-relaxed">
                                    {post.body}
                                </p>
                            </div>
                            <div className="bg-gray-50 dark:bg-gray-900/50 px-6 py-4 border-t border-gray-100 dark:border-gray-700 mt-auto">
                                <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                                    Post #{post.id}
                                </span>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </div>
    );
}
