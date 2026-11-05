import type { Metadata } from "next";
import Link from "next/link";
import LegalLayout from "@/components/LegalLayout";
import { LegalSection, LegalList } from "@/components/LegalSection";

export const metadata: Metadata = {
  title: "Refund Policy",
  description:
    "Understand the refund and cancellation policy for courses purchased on Chardho Aspire Institute.",
};

export default function RefundPolicyPage() {
  const timeline = [
    { day: "Day 0–7", title: "Full Refund Window", desc: "100% refund if less than 20% of course content has been accessed.", color: "from-green-500 to-emerald-600", icon: "✅" },
    { day: "Day 8–14", title: "Partial Refund Window", desc: "50% refund, provided less than 40% of course content has been accessed.", color: "from-amber-500 to-orange-500", icon: "🟡" },
    { day: "Day 15+", title: "No Refund", desc: "Refunds are not applicable after 14 days from the date of enrollment.", color: "from-slate-400 to-slate-500", icon: "⛔" },
  ];

  return (
    <LegalLayout
      icon="💳"
      title="Refund Policy"
      updated="February 2026"
      intro="We want you to be confident in your learning journey. Here's exactly how our refunds and cancellations work."
    >
      <div className="mb-10 grid gap-4 sm:grid-cols-3">
        {timeline.map((t) => (
          <div key={t.day} className="rounded-2xl border border-slate-100 bg-gradient-to-br from-white to-slate-50 p-5 shadow-sm">
            <span className={`inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${t.color} text-lg text-white shadow`}>
              {t.icon}
            </span>
            <p className="mt-3 text-xs font-bold uppercase tracking-wide text-slate-400">{t.day}</p>
            <h3 className="mt-1 text-base font-black text-slate-900">{t.title}</h3>
            <p className="mt-1 text-sm text-slate-500">{t.desc}</p>
          </div>
        ))}
      </div>

      <LegalSection number={1} title="Overview">
        <p>
          At Chardho Aspire Institute, we strive to deliver high-quality learning experiences. If
          you are not satisfied with a course you have purchased, this policy explains when and how
          you may request a refund or cancellation.
        </p>
      </LegalSection>

      <LegalSection number={2} title="Eligibility for Refunds">
        <p>You may be eligible for a refund if:</p>
        <LegalList
          items={[
            "Your refund request is submitted within 14 days of the original enrollment or payment date.",
            "You have accessed less than 40% of the total course content (videos watched, assignments downloaded, or live classes attended).",
            "The course was misrepresented on the course page, or a technical fault on our end prevented you from accessing the content and our support team could not resolve it within 5 business days.",
            "A live batch or live class you enrolled in was cancelled by the Institute and no suitable alternative batch was offered.",
          ]}
        />
      </LegalSection>

      <LegalSection number={3} title="Non-Refundable Situations">
        <p>Refunds will generally not be granted in the following cases:</p>
        <LegalList
          items={[
            "More than 14 days have passed since enrollment.",
            "More than 40% of the course content has already been consumed.",
            "You have already been issued a certificate of completion for the course.",
            "The purchase was made using a coupon, scholarship, or free promotional credit.",
            "Change of mind after attending more than 2 live sessions of a cohort-based program.",
            "Corporate/bulk training packages, unless otherwise specified in a separate agreement.",
          ]}
        />
      </LegalSection>

      <LegalSection number={4} title="How to Request a Refund">
        <p>To request a refund, please follow these steps:</p>
        <ol className="list-decimal space-y-2 pl-5">
          <li>Log in to your student dashboard and go to &quot;My Payments &amp; Invoices&quot;.</li>
          <li>Select the course/order and click &quot;Request Refund&quot;, or email us at refunds@chardhoaspire.com with your order ID.</li>
          <li>Our support team will review your request and course usage within 2–3 business days.</li>
          <li>You will receive an email confirming approval or rejection of your request, along with the reason.</li>
        </ol>
      </LegalSection>

      <LegalSection number={5} title="Refund Processing Time">
        <p>
          Approved refunds are processed back to the original payment method (card, UPI, net
          banking or wallet) within 7–10 business days. Depending on your bank or payment provider,
          it may take an additional 3–5 business days for the amount to reflect in your account.
          Razorpay transaction and payment gateway fees, if any, are non-refundable.
        </p>
      </LegalSection>

      <LegalSection number={6} title="Batch Transfers & Course Switching">
        <p>
          Instead of a refund, you may request to transfer your enrollment to a different batch or
          swap to another course of equal or lesser value within 30 days of enrollment, subject to
          seat availability. Course switch requests can be made from your dashboard or by
          contacting support — no additional fee applies for the first switch.
        </p>
      </LegalSection>

      <LegalSection number={7} title="Subscription & EMI Payments">
        <p>
          For courses purchased via EMI or subscription plans, cancelling before the refund window
          closes will stop future installments and refund the amount already paid, according to
          the eligibility criteria above. Any processing fee charged by the EMI provider is
          non-refundable.
        </p>
      </LegalSection>

      <LegalSection number={8} title="Disputed & Failed Transactions">
        <p>
          If an amount was debited from your account but enrollment was not confirmed due to a
          technical error, please contact us within 7 days with your transaction reference number.
          We will verify the issue with our payment gateway partner and refund the amount in full
          if no course access was granted.
        </p>
      </LegalSection>

      <LegalSection number={9} title="Need Help?">
        <p>
          Our support team is here to help with any refund, cancellation or billing questions.
        </p>
        <LegalList
          items={[
            "Email: support@chardhoaspire.com",
            "Customer Care: +91 9492620142",
            "WhatsApp: +91 9492620142",
            "Support hours: Monday – Saturday, 9:00 AM – 7:00 PM",
          ]}
        />
        <p className="pt-2">
          You can also reach out directly through our{" "}
          <Link href="/contact" className="font-bold text-blue-600 hover:underline">
            Contact page
          </Link>
          .
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
