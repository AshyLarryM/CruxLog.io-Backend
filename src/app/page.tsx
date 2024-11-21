export default function Home() {
	return (
		<div className="flex flex-col items-center px-4 py-8 space-y-6 bg-gray-50 min-h-screen text-gray-800">
			<div className="max-w-4xl w-full">
				<h1 className="text-3xl font-bold text-center text-gray-900 mb-6">
					Privacy Policy for CruxLog
				</h1>
				<p className="text-sm text-gray-600 mb-4 text-center">
					<strong>Effective Date:</strong> [11/20/2024]
				</p>
				<p>
					{`CruxLog ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and protect your information when you use our rock climbing logging application ("App") and associated services.`}
				</p>
				<p>
					By using CruxLog, you agree to the terms of this Privacy Policy. If
					you do not agree with the terms, please refrain from using the App.
				</p>

				<h2 className="text-2xl font-semibold mt-6 mb-4">1. Information We Collect</h2>
				<h3 className="text-xl font-medium mb-2">1.1. Personal Information</h3>
				<ul className="list-disc pl-6 mb-4">
					<li>
						<strong>Name:</strong> Used to personalize your account and display
						your profile.
					</li>
					<li>
						<strong>Email Address:</strong> Used for authentication and account
						management.
					</li>
					<li>
						<strong>User ID:</strong> A unique identifier tied to your account
						for App functionality.
					</li>
				</ul>
				<h3 className="text-xl font-medium mb-2">1.2. User Content</h3>
				<ul className="list-disc pl-6 mb-4">
					<li>
						<strong>Photos and Videos:</strong> Uploaded by you to log climbing
						sessions.
					</li>
					<li>
						<strong>Climbing Logs and Session Data:</strong> Includes details
						about climbs, sessions, and progress, saved to your account.
					</li>
				</ul>

				<h2 className="text-2xl font-semibold mt-6 mb-4">2. How We Use Your Information</h2>
				<ul className="list-disc pl-6 mb-4">
					<li>Provide and improve the App’s functionality.</li>
					<li>
						Allow you to log climbing sessions and view your history and stats.
					</li>
					<li>Authenticate and secure your account via Clerk.</li>
					<li>Communicate with you about account-related issues.</li>
				</ul>

				<h2 className="text-2xl font-semibold mt-6 mb-4">
					3. How We Protect Your Information
				</h2>
				<p>
					We use industry-standard security measures to protect your personal
					data, including secure data transmission via HTTPS and secured
					servers. However, no method of transmission or storage is 100%
					secure.
				</p>

				<h2 className="text-2xl font-semibold mt-6 mb-4">4. Third-Party Services</h2>
				<p>
					We may share your data with trusted third-party services, including:
				</p>
				<ul className="list-disc pl-6 mb-4">
					<li>
						<strong>Clerk (Authentication Provider):</strong> Handles user
						authentication and stores data such as email addresses and user
						IDs.
					</li>
					<li>
						<strong>Hosting Provider:</strong> Your data is securely stored on
						our backend, hosted on Next.js.
					</li>
				</ul>

				<h2 className="text-2xl font-semibold mt-6 mb-4">5. Data Retention</h2>
				<p>
					We retain your personal data for as long as you use the App or as
					necessary to fulfill the purposes outlined in this Privacy Policy. You
					may request to delete your account and associated data at any time.
				</p>

				<h2 className="text-2xl font-semibold mt-6 mb-4">6. Your Rights</h2>
				<ul className="list-disc pl-6 mb-4">
					<li>
						<strong>Access and Update:</strong> You can view and update your
						account information directly in the App.
					</li>
					<li>
						<strong>Data Deletion:</strong> You can request to delete your
						account and all associated data by contacting us, or by deleting in the profile/edit profile tab.
					</li>
				</ul>

				<h2 className="text-2xl font-semibold mt-6 mb-4">7. Children’s Privacy</h2>
				<p>
					CruxLog is not intended for children under the age of 13. We do not
					knowingly collect personal information from children. If we learn that
					we have collected such information, we will delete it promptly.
				</p>

				<h2 className="text-2xl font-semibold mt-6 mb-4">
					8. Changes to This Privacy Policy
				</h2>
				<p>
					We may update this Privacy Policy from time to time. Any changes will
					be posted on this page with a new effective date. We encourage you to
					review this policy periodically.
				</p>

				<h2 className="text-2xl font-semibold mt-6 mb-4">9. Contact Us</h2>
				<p>
					If you have questions or concerns about this Privacy Policy or our
					data practices, you can contact us at:
				</p>
				<ul className="list-none pl-0 mb-4">
					<li>Email: cruxlog.io@gmail.com</li>
				</ul>
			</div>
		</div>
	);
}
