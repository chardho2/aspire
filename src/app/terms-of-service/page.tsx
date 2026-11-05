import type { Metadata } from "next";
import LegalLayout from "@/components/LegalLayout";
import { LegalSection, LegalList } from "@/components/LegalSection";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Read the terms and conditions governing your use of Chardho Aspire Institute's website, courses and platform.",
};

export default function TermsOfServicePage() {
  return (
    <LegalLayout
      icon="📜"
      title="Terms of Service"
      updated="February 2026"
      intro="Please read these terms carefully before using our courses, website or mobile applications."
    >
      <LegalSection number={1} title="Acceptance of Terms">
        <p>
          These Terms of Service (&quot;Terms&quot;) form a binding agreement between you and
          Chardho Aspire Institute (&quot;Institute&quot;, &quot;we&quot;, &quot;us&quot;) governing
          your access to and use of our website, mobile apps, courses, live classes, dashboards and
          related services (collectively, the &quot;Services&quot;). By registering for an account
          or using our Services, you agree to be bound by these Terms.
        </p>
      </LegalSection>

      <LegalSection number={2} title="Eligibility">
        <p>
          You must be at least 13 years old to create an account. Users between 13 and 18 years
          require consent from a parent or legal guardian. By using our Services, you represent
          that you meet these eligibility requirements and that all registration information you
          provide is accurate and complete.
        </p>
      </LegalSection>

      <LegalSection number={3} title="Account Registration & Security">
        <LegalList
          items={[
            "You are responsible for maintaining the confidentiality of your login credentials.",
            "You must notify us immediately of any unauthorized use of your account.",
            "You are responsible for all activities that occur under your account.",
            "We reserve the right to suspend or terminate accounts that violate these Terms or provide false information.",
          ]}
        />
      </LegalSection>

      <LegalSection number={4} title="Course Enrollment & Access">
        <p>
          Upon successful payment or enrollment confirmation, you will receive access to the
          purchased course for the duration specified on the course page (including any
          &quot;lifetime access&quot; offers, which are subject to the platform remaining
          operational). Access credentials, videos, notes and downloadable material are for your
          personal, non-commercial use only and may not be shared, resold, or redistributed.
        </p>
      </LegalSection>

      <LegalSection number={5} title="Payments, Pricing & Coupons">
        <LegalList
          items={[
            "All prices are listed in Indian Rupees (INR) and are inclusive of applicable taxes unless stated otherwise.",
            "We accept payments via Razorpay, UPI, credit/debit cards, net banking and EMI options.",
            "Coupons, referral discounts and promotional offers cannot be combined unless explicitly stated.",
            "We reserve the right to change course pricing at any time; changes will not affect already-completed enrollments.",
            "GST invoices are generated automatically and available for download from your dashboard.",
          ]}
        />
      </LegalSection>

      <LegalSection number={6} title="Code of Conduct">
        <p>You agree not to:</p>
        <LegalList
          items={[
            "Share your account, course materials, or certificates fraudulently.",
            "Upload or transmit malicious code, spam, or unlawful content.",
            "Harass, abuse or discriminate against instructors, staff or fellow learners in live classes or forums.",
            "Attempt to reverse-engineer, scrape or resell any part of our platform or AI tools.",
            "Use our Services for any unlawful or unauthorized purpose.",
          ]}
        />
        <p>Violation of this Code of Conduct may result in suspension or permanent termination of your account without a refund.</p>
      </LegalSection>

      <LegalSection number={7} title="Intellectual Property">
        <p>
          All course content, videos, assignments, quizzes, trademarks, logos, and platform
          software are the exclusive property of Chardho Aspire Institute or its licensors and are
          protected by applicable intellectual property laws. Certificates issued are proof of
          completion only and do not transfer any ownership rights in our content.
        </p>
      </LegalSection>

      <LegalSection number={8} title="Certificates & Placement Assistance">
        <p>
          Certificates are issued upon meeting the course completion criteria (e.g., minimum
          attendance, assignment submission, and passing quiz scores) as defined on each course
          page. Placement assistance is provided on a best-effort basis, including resume
          reviews, mock interviews and referrals; the Institute does not guarantee employment or
          any specific salary outcome.
        </p>
      </LegalSection>

      <LegalSection number={9} title="Live Classes & Third-Party Tools">
        <p>
          Live classes may be conducted via third-party platforms such as Zoom or Google Meet.
          Recordings of live sessions may be made available to enrolled students. We are not
          liable for outages or disruptions caused by third-party service providers.
        </p>
      </LegalSection>

      <LegalSection number={10} title="Termination">
        <p>
          We may suspend or terminate your access to the Services at our discretion if you breach
          these Terms, engage in fraudulent activity, or misuse the platform. You may also close
          your account at any time by contacting support; refunds, if applicable, will be governed
          by our Refund Policy.
        </p>
      </LegalSection>

      <LegalSection number={11} title="Disclaimers & Limitation of Liability">
        <p>
          Our Services are provided on an &quot;as is&quot; and &quot;as available&quot; basis
          without warranties of any kind, express or implied. To the maximum extent permitted by
          law, Chardho Aspire Institute shall not be liable for any indirect, incidental, special
          or consequential damages arising from your use of the Services, including but not
          limited to loss of data, revenue, or employment opportunities.
        </p>
      </LegalSection>

      <LegalSection number={12} title="Governing Law & Dispute Resolution">
        <p>
          These Terms shall be governed by and construed in accordance with the laws of India. Any
          disputes arising out of or relating to these Terms shall be subject to the exclusive
          jurisdiction of the courts in Hindupur, Andhra Pradesh.
        </p>
      </LegalSection>

      <LegalSection number={13} title="Changes to These Terms">
        <p>
          We may revise these Terms periodically. Material changes will be communicated via email
          or in-app notice. Your continued use of the Services after such changes constitutes
          acceptance of the revised Terms.
        </p>
      </LegalSection>

      <LegalSection number={14} title="Contact Us">
        <LegalList
          items={[
            "Email: support@chardhoaspire.com",
            "Customer Care: +91 9492620142",
            "WhatsApp: +91 9492620142",
            "Working Hours: Monday – Saturday, 9:00 AM – 7:00 PM",
            "Address: 27-6-127, Lakshminagar, Muddireddy Palli, Hindupur, Sri Sathya Sai District, Andhra Pradesh – 515201, India",
          ]}
        />
      </LegalSection>
    </LegalLayout>
  );
}
