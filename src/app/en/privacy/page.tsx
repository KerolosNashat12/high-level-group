export const metadata = {
  title: "Privacy Policy | High Level Finishing",
};

export default function PrivacyPage() {
  return (
    <section className="py-24">
      <div className="container-page max-w-3xl">
        <h1 className="text-3xl font-extrabold text-ink">Privacy Policy</h1>
        <div className="mt-6 space-y-4 text-sm text-ink-soft leading-relaxed">
          <p>
            At High Level Group, we take the privacy of your data seriously. The information you
            share with us through our visit request or contact forms (name, phone number, project
            details) is used solely to follow up on your request and is never shared with any
            third party for marketing purposes.
          </p>
          <p>
            We apply reasonable safeguards to protect your stored data, and you may request the
            deletion of your data at any time by contacting us directly using the contact
            information shown on our contact page.
          </p>
        </div>
      </div>
    </section>
  );
}
