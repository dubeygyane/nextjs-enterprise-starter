export default function PrivacyPolicyPage() {
    return (
        <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
                <p className="text-gray-500 mb-8">
                    Last updated: {new Date().toLocaleDateString()}
                </p>

                <div className="prose dark:prose-invert max-w-none space-y-8">
                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                            1. Introduction
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                            Welcome to the Next.js Enterprise Starter ({'"we," "our," or "us"'}). We are committed
                            to protecting your personal information and your right to privacy. This Privacy Policy
                            explains how we collect, use, disclosure, and safeguard your information when you use
                            our open-source application template.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                            2. Open Source Nature
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                            This project is open-source software distributed under the MIT License. While the
                            template involves code for handling user data (such as login credentials),{" "}
                            <strong>
                                this specific demo deployment does not permanently store real user data
                            </strong>{" "}
                            beyond the demonstration session. When you deploy this yourself, you are responsible
                            for maintaining your own privacy policy regarding your users{"'"} data.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                            3. Information We Collect
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                            In this demo environment, we may collect:
                        </p>
                        <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300">
                            <li>
                                <strong>Usage Data:</strong> Information about your interaction with the application
                                for performance monitoring.
                            </li>
                            <li>
                                <strong>Cookies:</strong> We use HttpOnly cookies to maintain your authentication
                                session securely.
                            </li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                            4. Data Security
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                            We use administrative, technical, and physical security measures to help protect your
                            personal information. This includes the use of HttpOnly cookies, Edge Middleware
                            protection, and secure API transport layers as demonstrated in the source code.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                            5. Contact Us
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                            If you have questions or comments about this policy, or want to report a vulnerability
                            in the open-source code, please open an issue on our GitHub repository.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
