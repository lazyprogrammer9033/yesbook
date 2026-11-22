import { LegalPage } from "@/components/site/legal";
import { site } from "@/lib/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Terms of service",
  description: "The terms that apply to using the Yesbook website and services.",
  path: "/terms/",
});

// Draft terms for the marketing website. Client contracts should have their own service agreement. Have a lawyer review before launch.
export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of service"
      updated="November 22, 2026"
      intro={`These terms apply to your use of yesbook.ca, yesbook.ai and yesbookapp.com (the "Website"), operated by ${site.legalName}. By using the Website you agree to them.`}
      sections={[
        { h: "Using the Website", p: ["You may use the Website to learn about Yesbook and contact us. Please don't misuse it, for example by trying to break its security, sending spam through our forms, or copying it in bulk."] },
        {
          h: "Our services",
          p: [
            "Information on the Website describes our services in general. Features, availability and prices may change. Your use of a Yesbook booking website is covered by a separate service agreement that we sign with you, and that agreement wins if it differs from these terms.",
          ],
        },
        { h: "Prices", p: ["Prices shown are in Canadian dollars and do not include applicable taxes such as HST, unless we say otherwise. A quote is only binding once confirmed in writing."] },
        {
          h: "Intellectual property",
          p: ["The Website, the Yesbook name, logo and content belong to Yesbook or its licensors. You may not use them without our written permission, except to share links to our pages."],
        },
        { h: "Privacy", p: ["Our Privacy policy explains how we handle personal information. It forms part of these terms."] },
        {
          h: "No warranty",
          p: ["We work hard to keep the Website accurate and available, but it is provided \"as is\". To the extent the law allows, we make no promises that it will always be error-free or uninterrupted."],
        },
        {
          h: "Limitation of liability",
          p: ["To the extent the law allows, Yesbook is not liable for indirect or consequential losses arising from your use of the Website. Nothing in these terms limits rights you have under Ontario consumer protection law."],
        },
        { h: "Links to other sites", p: ["The Website may link to other websites. We are not responsible for their content or privacy practices."] },
        { h: "Governing law", p: ["These terms are governed by the laws of Ontario and the federal laws of Canada that apply there. Courts in Ontario have jurisdiction over any dispute."] },
        { h: "Contact", p: [`Questions about these terms? Email ${site.email}.`] },
      ]}
    />
  );
}
