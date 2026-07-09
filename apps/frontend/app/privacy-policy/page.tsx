import DesktopNav from "@/components/DesktopNav";
import MobileNav from "@/components/MobileNav";
import Footer from "@/components/ui/Footer";

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
            <span className="text-primary">Dorms.ng</span> Privacy Policy
          </h1>
          <p>Last Updated: 9th July, 2026</p>
        </div>
        <section className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Introduction</h2>
          <p>
            Welcome to Dorms.ng. We respect your privacy and are committed to protecting
            your personal data. This Privacy Policy explains how we collect, use, share,
            and protect your personal information when you use our website, mobile
            application, and discovery services (collectively, the "Platform"). This
            policy is designed to comply with the Nigeria Data Protection Act, 2023 (NDPA)
            and other applicable data privacy laws and regulations in the Federal Republic
            of Nigeria. For the purposes of the NDPA, Dorms.ng acts as the Data Controller
            of the personal data you provide to us.
          </p>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Information We Collect</h2>
          <div className="mb-4">
            <p>
              To provide our discovery and verification layer, we collect the following
              categories of personal data:{" "}
            </p>
            <ol className="list-decimal ml-8">
              <li>
                <b>Identity & Contact Data:</b> First name, last name, email address,
                phone number, and the name of your tertiary institution.
              </li>
              <li>
                <b>Technical & Usage Data:</b> Internet Protocol (IP) address, browser
                type, operating system, search queries, filters applied, and how you
                interact with verified property listings.
              </li>
              <li>
                <b>Location Data:</b> General geographic location (e.g., city or region)
                to accurately display off-campus housing near your specific institution.
              </li>
            </ol>
          </div>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Lawful Basis and Purpose of Processing
          </h2>
          <p>
            Under Section 25 of the NDPA, we must have a valid lawful basis to process
            your data. We process your personal data under the following bases:{" "}
          </p>
          <ol className="list-decimal ml-8">
            <li>
              <b>Consent:</b> When you create an account and agree to this policy, you
              give us explicit, informed consent to process your data to provide our
              services. You may withdraw this consent at any time.
            </li>
            <li>
              <b>Performance of a Contract:</b> We process your data to fulfill our Terms
              of Service, such as creating your account and facilitating connections
              between you and verified Listers (landlords/agents).
            </li>
            <li>
              <b>Legitimate Interest:</b> We analyze technical and usage data to improve
              our platform's search algorithms, enhance user experience, and prevent
              fraud.
            </li>
            <li>
              <b>Legal Obligation:</b> We may process or disclose your data if required to
              comply with a valid court order or regulatory directive under Nigerian law.
            </li>
          </ol>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Age Restrictions and Child Privacy
          </h2>
          <p className="mb-8">
            Dorms.ng is designed for university and polytechnic students. You must be at
            least 18 years old to create an account. We do not knowingly collect personal
            data from children under the age of 18 without verifiable parental consent. If
            we discover that a minor has provided us with personal data without
            appropriate consent, we will delete that information immediately.
          </p>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            How We Share Your Information
          </h2>
          <p>
            We do not sell your personal data. We only share your information under
            strict, limited circumstances:
          </p>
          <ol className="list-decimal ml-8">
            <li>
              <b>With Property Listers:</b> When you explicitly request to contact a
              verified landlord, caretaker, or agent regarding a hostel, we share your
              basic contact details (Name and Phone Number) so they can communicate with
              you.
            </li>
            <li>
              <b>Service Providers (Data Processors):</b> We use trusted third-party
              vendors (e.g., cloud hosting providers, email delivery services) to operate
              our platform. These vendors are bound by strict data processing agreements
              and are required to comply with the NDPA.
            </li>
            <li>
              <b>Legal Authorities:</b> We will disclose your information to law
              enforcement or regulatory bodies in Nigeria if legally compelled to do so.
            </li>
          </ol>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-4"> Data Retention</h2>
          <p>
            We retain your personal data only for as long as is necessary to fulfill the
            purposes for which it was collected, or to comply with legal, regulatory, or
            internal policy requirements. Active account data is kept as long as your
            account is open. If you delete your account, your personal data will be erased
            or anonymized within 30 days, except where retention is legally required.
          </p>
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
            <b>Breach Notification:</b> In the unlikely event of a personal data breach
            that poses a risk to your rights and freedoms, we will notify the Nigeria Data
            Protection Commission (NDPC) within 72 hours of becoming aware of the breach,
            and we will notify you directly as required by the NDPA.
          </p>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Your Rights as a Data Subject
          </h2>
          <p>
            Under the Nigeria Data Protection Act, 2023, you possess the following rights
            regarding your personal data:
          </p>
          <ul className="list-disc ml-8">
            <li>
              <b>Right to be Informed:</b>
              To know how your data is being processed (which this policy provides).
            </li>
            <li>
              <b>Right of Access:</b>To request a copy of the personal data we hold about
              you.
            </li>
            <li>
              <b>Right to Rectification:</b> To request correction of any inaccurate or
              incomplete data.
            </li>
            <li>
              <b>Right to Erasure:</b> To request the deletion of your personal data when
              there is no compelling reason for its continued processing.
            </li>
            <li>
              <b>Right to Restrict Processing:</b> To block or suppress the processing of
              your data under certain circumstances.
            </li>
            <li>
              <b>Right to Data Portability:</b> To receive your data in a structured,
              commonly used, and machine-readable format.
            </li>
            <li>
              <b>Right to Object:</b> To object to our processing of your data based on
              legitimate interests.
            </li>
            <li>
              <b>Right to Withdraw Consent:</b> To withdraw your consent at any time,
              without affecting the lawfulness of processing carried out prior to the
              withdrawal.
            </li>
          </ul>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Contact Us and Data Protection Officer (DPO)
          </h2>
          <p>
            If you have any questions about this Privacy Policy, wish to exercise your
            data subject rights, or want to file a complaint, please contact us at:
          </p>
          <b>privacy@dorms.ng </b>{" "}
          <p>
            If you feel that your data rights have been violated and we have not
            adequately addressed your concerns, you have the right to lodge a formal
            complaint with the Nigeria Data Protection Commission (NDPC).
          </p>
        </section>
      </div>
      <Footer />
    </div>
  );
}
