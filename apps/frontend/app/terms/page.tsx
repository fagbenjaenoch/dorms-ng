import DesktopNav from "@/components/DesktopNav";
import MobileNav from "@/components/MobileNav";
import { Button } from "@/components/ui/button";
import Footer from "@/components/ui/Footer";
import Link from "next/link";

export default function Page() {
  return (
    <div>
      <>
        <DesktopNav />
        <MobileNav />
      </>
      <div className="container leading-relaxed">
        <div className="mb-20">
          <h1 className="font-headline text-3xl md:text-5xl font-black tracking-tighter mb-10">
            <span className="text-primary">Dorms.ng</span> Terms of Service
          </h1>
          <p>Last Updated: 9th July, 2026</p>
        </div>
        <section className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Introduction and Acceptance of Terms
          </h2>
          <p>
            Welcome to Dorms.ng. These Terms of Service ("ToS" or "Terms") govern your
            access to and use of the Dorms.ng website, mobile application, and related
            services.
          </p>
          <div className="ml-4">
            <p>
              <b> Acceptance:</b> By accessing our platform, creating an account, or
              clicking "I Agree" during the registration process (clickwrap agreement),
              you confirm that you have read, understood, and explicitly agree to be bound
              by these Terms. If you do not agree to these Terms, you may not use our
              services.
            </p>
            <p>
              <b>Updates to Terms:</b> We may update these Terms periodically to reflect
              changes in our service or legal requirements. For significant changes, we
              will notify you via the email address associated with your account or
              through a prominent notice on the platform. Continued use of Dorms.ng after
              such notice constitutes your consent to the updated Terms.
            </p>
          </div>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Definitions</h2>
          <div className="mb-4">
            <p>
              To prevent misunderstandings, the following terms used throughout this
              agreement are defined as follows:
            </p>
            <ol className="list-decimal ml-8">
              <li>
                <b>"Platform"</b> refers to the Dorms.ng website, web app, and mobile
                application.
              </li>
              <li>
                <b>"Service"</b> refers to our discovery and verification layer, which
                allows users to search for and view off-campus student housing.
              </li>
              <li>
                <b>"User" (or "You")</b> refers to any individual accessing the platform,
                primarily students searching for housing.
              </li>
              <li>
                <b>"Lister"</b> refers to landlords, caretakers, or authorized agents who
                list properties on the platform
              </li>
              <li>
                <b>"Verified Badge"</b> refers to a visual indicator on a listing
                signifying that a Dorms.ng representative has physically visited the
                property to confirm its existence and stated amenities on a specific date.
              </li>
              <li>
                <b>"Inspection"</b> refers to the point-in-time physical visit conducted
                by our team to grant a Verified Badge.
              </li>
            </ol>
          </div>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Description of Services</h2>
          <p>
            Dorms.ng operates strictly as a discovery and verification layer for
            off-campus student housing in Nigeria.
          </p>
          <ol className="list-decimal ml-8">
            <li>
              <b>Core Functionality:</b> We provide a searchable database equipped with
              smart filters (price, distance, amenities) to help Users discover available
              hostels near Nigerian tertiary institutions.
            </li>
            <li>
              <b>The Verification Layer:</b> WWe conduct physical property inspections to
              confirm that the photos and amenities listed match the reality on the ground
              at the time of inspection, applying a "Verified Badge" to passing
              properties.
            </li>
            <li>
              <b>Service Limitations:</b> Dorms.ng is not a real estate agency, property
              management company, or a landlord. We do not own, lease, or manage any
              properties listed on the Platform.
            </li>
            <li>
              <b>Geographic Restrictions:</b> Our services are currently limited to
              off-campus housing surrounding recognized tertiary institutions within the
              Federal Republic of Nigeria.
            </li>
            <li>
              <b>Availability:</b> While we strive for 99% uptime, the Platform may
              occasionally be unavailable during routine maintenance windows or due to
              unforeseen technical difficulties.
            </li>
          </ol>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            User Eligibility and Responsibilities
          </h2>
          <ol className="list-decimal m-4">
            <li>
              <b>Age Requirement:</b> You must be at least 18 years old to create an
              account. If you are under 18, you may only use the Platform with the
              explicit consent and supervision of a parent or legal guardian.
            </li>

            <li>
              <b>Account Security:</b> You are responsible for maintaining the
              confidentiality of your login credentials and for all activities that occur
              under your account.
            </li>

            <li>
              <b>Accurate Information:</b> You agree to provide true, current, and
              complete information during registration and when communicating with
              Listers.
            </li>
            <li>
              <b>Acceptable Use & Prohibited Activities:</b> You agree not to:
              <ul className="list-disc ml-8">
                <li>Use the Platform to scrape, steal, or mine data.</li>
                <li>Harass, defraud, or spam other Users or Listers.</li>
                <li>
                  Attempt to bypass our security measures or tamper with the Verification
                  system.
                </li>
              </ul>
            </li>

            <li>
              <b>Intellectual Property:</b> All content, branding, logos, and verification
              mechanisms (including the Verified Badge design) are the exclusive
              intellectual property of Dorms.ng. You may not copy or reproduce them
              without written permission.
            </li>
          </ol>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Pricing, Payment, and Termination Details
          </h2>

          <ol className="list-decimal ml-8">
            <li>
              <b>Platform Access:</b> Searching for hostels on Dorms.ng is currently free
              for students. We reserve the right to introduce premium features or
              subscription tiers in the future, which will be clearly communicated before
              any charges apply.
            </li>
            <li>
              <b>
                Rent and Lease Payments: Dorms.ng does not process rent payments, agency
                fees, or legal agreement fees.
              </b>{" "}
              All financial transactions regarding the leasing of a property occur
              strictly and directly between the User and the Lister. We are not liable for
              any lost funds, disputes, or refund claims arising from these external
              transactions.
            </li>
            <li>
              <b>Account Termination:</b> You may terminate your account at any time via
              your account settings. We reserve the right to suspend or terminate your
              account immediately if you violate these Terms or engage in fraudulent
              behavior.
            </li>
            <li>
              <b>Data Retention:</b> Upon account termination, we will delete or anonymize
              your personal data within 30 days, except where retention is required for
              legal compliance or dispute resolution.
            </li>
          </ol>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Data Protection and Privacy Policy Reference
          </h2>
          <p>
            Your privacy is critical to us. Our data collection, storage, and processing
            practices are detailed comprehensively in our{" "}
            <Link href="/privacy-policy" className="text-primary underline">
              Privacy Policy
            </Link>
            .
          </p>
          <ol className="list-decimal ml-8">
            <li>
              <b>Data Collection:</b> We collect data (such as search queries and
              location) solely to provide and improve your housing discovery experience.
            </li>
            <li>
              <b>Data Sharing:</b> We only share your contact information with a Lister
              when you explicitly request to connect with them regarding a property.
            </li>
            <li>
              By agreeing to these Terms, you also acknowledge and consent to the
              practices outlined in our Privacy Policy in compliance with the Nigeria Data
              Protection Regulation (NDPR).
            </li>
          </ol>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Data Security and Breach Notification
          </h2>
          <p>
            We implement robust technical and organizational security measures (including
            encryption and access controls) to protect your data against unauthorized
            access, loss, or destruction.
          </p>
          <p>
            Breach Notification: In the unlikely event of a personal data breach that
            poses a risk to your rights and freedoms, we will notify the Nigeria Data
            Protection Commission (NDPC) within 72 hours of becoming aware of the breach,
            and we will notify you directly as required by the NDPA.
          </p>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Disclaimer and Limitation of Liability
          </h2>
          <ol className="list-decimal ml-8">
            <li>
              <b>Point-in-Time Verification Disclaimer:</b> WThe "Verified Badge" confirms
              that the property matched its description on the exact date of our physical
              inspection. Dorms.ng makes no warranties regarding the property’s condition
              after the inspection date. Properties degrade, and amenities (like running
              water or generator availability) fluctuate.
            </li>
            <li>
              <b>No Real Estate Warranty:</b> WWe do not guarantee the safety, legality,
              or habitability of any property. We do not guarantee the background or
              character of any Lister.
            </li>
            <li>
              <b>Limitation of Liability:</b> To the maximum extent permitted by law,
              Dorms.ng and its affiliates shall not be liable for any indirect,
              incidental, or consequential damages, including but not limited to financial
              loss, personal injury, or property damage arising from your use of the
              Platform or your leasing of a listed property.
            </li>
            <li>
              <b>User Indemnification:</b> You agree to indemnify and hold Dorms.ng
              harmless against any claims, damages, or legal fees arising from your breach
              of these Terms or your interactions with Listers.
            </li>
            <li>
              <b>Force Majeure:</b> These Terms are governed by the laws of the Federal
              Republic of Nigeria. Any dispute arising from these Terms or your use of the
              Platform shall first be attempted to be resolved through good-faith
              negotiation. If unresolved, the dispute shall be submitted to binding
              arbitration in Lagos, Nigeria, in accordance with the Arbitration and
              Mediation Act, 2023.
            </li>
          </ol>
        </section>
      </div>
      <Footer />
    </div>
  );
}
