import { LegalPage } from "@/components/site/legal";
import { site } from "@/lib/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Privacy policy",
  description: "How Yesbook collects, uses and protects personal information, in line with Canada's PIPEDA.",
  path: "/privacy/",
});

// Draft written to follow PIPEDA's 10 fair information principles. Have it reviewed by a lawyer before launch.
export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy policy"
      updated="November 22, 2026"
      intro={`${site.legalName} ("Yesbook", "we", "us") respects your privacy. This policy explains what personal information we collect through yesbook.ca and our services, why we collect it, and the choices you have. We follow Canada's Personal Information Protection and Electronic Documents Act (PIPEDA).`}
      sections={[
        {
          h: "Accountability",
          p: [
            `Yesbook is responsible for personal information under its control. Our Privacy Officer oversees compliance with this policy and can be reached at ${site.email}.`,
          ],
        },
        {
          h: "Information we collect",
          p: [
            "On this website we collect only what you choose to give us, plus anonymous usage statistics:",
            [
              "Demo and contact requests: your name, business name, business type, email, phone number (optional) and your message.",
              "Anonymous analytics: pages viewed, referring website, device type and approximate country. This is collected without cookies and cannot identify you.",
              "Server logs: our web host keeps standard technical logs (such as IP address and browser type) for security, for a limited time.",
            ],
            "When a business uses a Yesbook booking website, that business decides what client information is collected (for example names, contact details and appointment history). For that information, the business is responsible and Yesbook processes it on their behalf.",
          ],
        },
        {
          h: "Why we use it",
          p: [
            "We use your information to reply to your enquiry, arrange and give demos, provide and support our services, send service messages you need (like appointment confirmations from a business's booking website), and keep our services secure. We do not sell or rent personal information.",
          ],
        },
        {
          h: "Consent",
          p: [
            "By sending us a form or email, you consent to us using your information to respond. We will ask for your consent before using it for any new purpose, such as marketing emails, and you can withdraw consent at any time by emailing us.",
          ],
        },
        {
          h: "Limiting collection, use and retention",
          p: [
            "We collect only what we need. We keep demo enquiries for up to 24 months, unless you become a client, and then delete or anonymize them. You can ask us to delete your information sooner.",
          ],
        },
        {
          h: "Cookies and analytics",
          p: [
            "This website does not use advertising or tracking cookies. Our analytics are privacy-friendly and cookie-free. We store small settings in your browser (your light or dark mode choice and that you've seen our cookie notice). These never leave your device.",
          ],
        },
        {
          h: "Sharing and service providers",
          p: [
            "We share information only with trusted service providers who help us run our business, such as web hosting, email, SMS and cloud backup providers. They may only use it to provide services to us and must protect it. Some providers may store data outside Canada, where it may be accessible to local authorities under local laws. We will tell you where your data is stored on request.",
          ],
        },
        {
          h: "Safeguards",
          p: [
            "We protect personal information with security measures that suit its sensitivity, including encrypted connections (HTTPS), encrypted backups, access controls and staff confidentiality.",
          ],
        },
        {
          h: "Accuracy, access and correction",
          p: [
            `You may ask to see the personal information we hold about you, ask us to correct it, or ask us to delete it. Email ${site.email} and we will respond within 30 days.`,
          ],
        },
        {
          h: "Breaches",
          p: [
            "If a breach of security creates a real risk of significant harm, we will notify affected people and the Office of the Privacy Commissioner of Canada as required by law.",
          ],
        },
        {
          h: "Questions and complaints",
          p: [
            `Please contact our Privacy Officer at ${site.email}. If you are not satisfied with our response, you may contact the Office of the Privacy Commissioner of Canada at priv.gc.ca.`,
          ],
        },
        {
          h: "Changes to this policy",
          p: ["We may update this policy. We will post the new version here with a new date, and tell clients about important changes."],
        },
      ]}
    />
  );
}
