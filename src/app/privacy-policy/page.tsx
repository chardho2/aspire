import type { Metadata } from "next";
import LegalLayout from "@/components/LegalLayout";
import { LegalSection, LegalList } from "@/components/LegalSection";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Read the Chardho Aspire Institute privacy policy to understand how we collect, use and protect your personal data.",
};

export default function PrivacyPolicyPage() {
  return (
    <LegalLayout
      icon="🔒"
      title="Privacy Policy"
      updated="February 2026"
      intro="Your trust matters to us. This policy explains what data we collect, why we collect it, and how we protect it."
    >
      <LegalSection number={1} title="Introduction">
        <p>
          Chardho Aspire Institute (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) is committed to
          protecting the privacy of our students, visitors and users of our website, mobile
          applications and learning platform (collectively, the &quot;Services&quot;). This Privacy
          Policy describes how we collect, use, disclose and safeguard your information when you
          use our Services.
        </p>
        <p>
          By accessing or using our Services, you agree to the collection and use of information
          in accordance with this policy. If you do not agree with this policy, please do not use
          our Services.
        </p>
      </LegalSection>

      <LegalSection number={2} title="Information We Collect">
        <p>We collect the following categories of information:</p>
        <LegalList
          items={[
            "Personal identification information — name, email address, phone number, date of birth, and postal address provided during registration or enrollment.",
            "Account credentials — username, encrypted password, and profile details.",
            "Payment information — billing address and transaction details (card/UPI details are processed securely by our payment partners and are never stored on our servers).",
            "Learning data — course progress, quiz scores, assignment submissions, certificates earned, attendance and video watch history.",
            "Technical data — IP address, browser type, device identifiers, operating system, and usage patterns collected via cookies and analytics tools.",
            "Communications — messages sent through our contact forms, support tickets, discussion forums and chatbot interactions.",
          ]}
        />
      </LegalSection>

      <LegalSection number={3} title="How We Use Your Information">
        <p>We use the collected information to:</p>
        <LegalList
          items={[
            "Create and manage your student, staff or admin account.",
            "Deliver course content, track progress and issue certificates.",
            "Process payments, invoices and refunds.",
            "Personalize course recommendations using our AI recommendation engine.",
            "Provide placement assistance and share your resume with hiring partners (only with your consent).",
            "Send transactional emails, SMS and push notifications about classes, assignments and offers.",
            "Improve our Services through analytics, product research and AI model training on anonymized data.",
            "Detect, prevent and address fraud, security incidents and technical issues.",
          ]}
        />
      </LegalSection>

      <LegalSection number={4} title="Cookies & Tracking Technologies">
        <p>
          We use cookies, local storage and similar tracking technologies to remember your
          preferences, keep you logged in, understand how you interact with our platform, and
          serve relevant content. You can control cookies through your browser settings; however,
          disabling cookies may limit certain features of our Services.
        </p>
      </LegalSection>

      <LegalSection number={5} title="Sharing of Information">
        <p>We do not sell your personal data. We may share information with:</p>
        <LegalList
          items={[
            "Instructors and staff, to the extent necessary to deliver courses and evaluate performance.",
            "Payment gateway providers (such as Razorpay) to process transactions securely.",
            "Cloud storage and infrastructure providers who host our data under strict confidentiality agreements.",
            "Hiring and placement partners, only when you opt in to our placement program.",
            "Law enforcement or regulatory authorities when required by applicable law.",
          ]}
        />
      </LegalSection>

      <LegalSection number={6} title="Data Security">
        <p>
          We implement industry-standard security measures including encryption in transit (TLS),
          encrypted password storage, role-based access control, rate limiting, and regular
          security audits to protect your data from unauthorized access, alteration, disclosure or
          destruction. However, no method of transmission over the internet is 100% secure, and we
          cannot guarantee absolute security.
        </p>
      </LegalSection>

      <LegalSection number={7} title="Data Retention">
        <p>
          We retain your personal data for as long as your account is active or as needed to
          provide you with our Services, comply with legal obligations, resolve disputes and
          enforce our agreements. You may request deletion of your account and associated data at
          any time, subject to statutory retention requirements (e.g., financial records).
        </p>
      </LegalSection>

      <LegalSection number={8} title="Your Rights">
        <p>Depending on your jurisdiction, you may have the right to:</p>
        <LegalList
          items={[
            "Access the personal data we hold about you.",
            "Request correction of inaccurate or incomplete data.",
            "Request deletion of your personal data (&quot;right to be forgotten&quot;).",
            "Withdraw consent for marketing communications at any time.",
            "Request a portable copy of your data.",
          ]}
        />
        <p>To exercise any of these rights, contact us at privacy@chardhoaspire.com.</p>
      </LegalSection>

      <LegalSection number={9} title="Children's Privacy">
        <p>
          Our Services are intended for users aged 13 and above. If you are under 18, you must
          have parental or guardian consent to enroll in our courses. We do not knowingly collect
          personal data from children under 13 without verified parental consent.
        </p>
      </LegalSection>

      <LegalSection number={10} title="Third-Party Links">
        <p>
          Our platform may contain links to third-party websites (e.g., Zoom, Google Meet,
          LinkedIn). We are not responsible for the privacy practices of these external sites and
          encourage you to review their privacy policies.
        </p>
      </LegalSection>

      <LegalSection number={11} title="Changes to This Policy">
        <p>
          We may update this Privacy Policy from time to time. We will notify you of material
          changes via email or an in-app notification. Continued use of our Services after changes
          take effect constitutes acceptance of the revised policy.
        </p>
      </LegalSection>

      <LegalSection number={12} title="Contact Us">
        <p>
          If you have questions or concerns about this Privacy Policy or our data practices,
          please reach out to us:
        </p>
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
