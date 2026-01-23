export default function TermsPage() {
    return (
        <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <h1 className="text-4xl font-bold mb-8">Terms and Conditions</h1>
                <p className="text-gray-500 mb-8">
                    Last updated: {new Date().toLocaleDateString()}
                </p>

                <div className="prose dark:prose-invert max-w-none space-y-8">
                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                            1. Agreement to Terms
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                            These Terms and Conditions constitute a legally binding agreement made between you,
                            whether personally or on behalf of an entity ({'"you"'}) and Next.js Enterprise Starter
                            ({'"we," "us" or "our"'}), concerning your access to and use of our application. By
                            accessing the application, you represent that you have read, understood, and agreed
                            to be bound by all of these Terms and Conditions.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                            2. Open Source License
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                            The source code for this project is licensed under the{" "}
                            <strong>MIT License</strong>. You are free to use, copy, modify, merge, publish,
                            distribute, sublicense, and/or sell copies of the Software, subject to the conditions
                            stated in the LICENSE file in the repository.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                            3. User Representations
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                            By using the Application, you represent and warrant that:
                        </p>
                        <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300">
                            <li>
                                You have the legal capacity and you agree to comply with these Terms of Use.
                            </li>
                            <li>
                                You will not access the Application through automated or non-human means, whether
                                through a bot, script or otherwise, except as permitted by standard API usage.
                            </li>
                            <li>
                                You will not use the Application for any illegal or unauthorized purpose.
                            </li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                            4. Disclaimer
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                            THE SITE IS PROVIDED ON AN AS-IS AND AS-AVAILABLE BASIS. YOU AGREE THAT YOUR USE OF THE
                            SITE AND OUR SERVICES WILL BE AT YOUR SOLE RISK. TO THE FULLEST EXTENT PERMITTED BY LAW,
                            WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, IN CONNECTION WITH THE SITE AND YOUR
                            USE THEREOF.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
                            5. Limit of Liability
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                            IN NO EVENT WILL WE OR OUR DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE TO YOU OR ANY THIRD
                            PARTY FOR ANY DIRECT, INDIRECT, CONSEQUENTIAL, EXEMPLARY, INCIDENTAL, SPECIAL, OR
                            PUNITIVE DAMAGES, ARISING FROM YOUR USE OF THE SITE.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
