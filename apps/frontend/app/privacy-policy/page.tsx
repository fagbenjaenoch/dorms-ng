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
      <h1>Dorms.ng Privacy Policy</h1>
      <p>Effective Date: [Insert Date]</p>
      <p>Last Updated: [Insert Date]</p>
      <h2>1. Introduction</h2>
      Welcome to Dorms.ng. We respect your privacy and are committed to protecting your
      personal data. This Privacy Policy explains how we collect, use, share, and protect
      your personal information when you use our website, mobile application, and
      discovery services (collectively, the "Platform"). This policy is designed to comply
      with the Nigeria Data Protection Act, 2023 (NDPA) and other applicable data privacy
      laws and regulations in the Federal Republic of Nigeria. For the purposes of the
      NDPA, Dorms.ng acts as the Data Controller of the personal data you provide to us.
      <h2>2. Information We Collect</h2>
      <p>
        To provide our discovery and verification layer, we collect the following
        categories of personal data:{" "}
      </p>
      <ul>
        <li>
          Identity & Contact Data: First name, last name, email address, phone number, and
          the name of your tertiary institution.
        </li>
        <li>
          Technical & Usage Data: Internet Protocol (IP) address, browser type, operating
          system, search queries, filters applied, and how you interact with verified
          property listings.
        </li>
        <li>
          Location Data: General geographic location (e.g., city or region) to accurately
          display off-campus housing near your specific institution.
        </li>
      </ul>
      <h2>3. Lawful Basis and Purpose of Processing</h2>
      <p>
        Under Section 25 of the NDPA, we must have a valid lawful basis to process your
        data. We process your personal data under the following bases:{" "}
      </p>
      <ul>
        <li>
          Consent: When you create an account and agree to this policy, you give us
          explicit, informed consent to process your data to provide our services. You may
          withdraw this consent at any time.
        </li>
        <li>
          Performance of a Contract: We process your data to fulfill our Terms of Service,
          such as creating your account and facilitating connections between you and
          verified Listers (landlords/agents).
        </li>
        <li>
          Legitimate Interest: We analyze technical and usage data to improve our
          platform's search algorithms, enhance user experience, and prevent fraud.
        </li>
        <li>
          Legal Obligation: We may process or disclose your data if required to comply
          with a valid court order or regulatory directive under Nigerian law.
        </li>
      </ul>
      <h2>4. Age Restrictions and Child Privacy</h2>
      <p>
        Dorms.ng is designed for university and polytechnic students. You must be at least
        18 years old to create an account. We do not knowingly collect personal data from
        children under the age of 18 without verifiable parental consent. If we discover
        that a minor has provided us with personal data without appropriate consent, we
        will delete that information immediately.
      </p>
      <h2>5. How We Share Your Information</h2>
      <p>
        We do not sell your personal data. We only share your information under strict,
        limited circumstances:
      </p>
      <ul>
        <li>
          With Property Listers: When you explicitly request to contact a verified
          landlord, caretaker, or agent regarding a hostel, we share your basic contact
          details (Name and Phone Number) so they can communicate with you.
        </li>
        <li>
          Service Providers (Data Processors): We use trusted third-party vendors (e.g.,
          cloud hosting providers, email delivery services) to operate our platform. These
          vendors are bound by strict data processing agreements and are required to
          comply with the NDPA.
        </li>
        <li>
          Legal Authorities: We will disclose your information to law enforcement or
          regulatory bodies in Nigeria if legally compelled to do so.
        </li>
      </ul>
      <h2>6. Cross-Border Data Transfers</h2>
      <p>
        Your personal data is primarily stored on secure servers located within Nigeria.
        If we need to transfer your data to a third-party service provider outside of
        Nigeria (e.g., global cloud infrastructure), we ensure that the receiving country
        has adequate data protection laws as determined by the NDPC, or that appropriate
        safeguards (like standard contractual clauses) are in place.
      </p>
      <h2>7. Data Retention</h2>
      <p>
        We retain your personal data only for as long as is necessary to fulfill the
        purposes for which it was collected, or to comply with legal, regulatory, or
        internal policy requirements. Active account data is kept as long as your account
        is open. If you delete your account, your personal data will be erased or
        anonymized within 30 days, except where retention is legally required.
      </p>
      <h2>8. Data Security and Breach Notification</h2>
      <p>
        We implement robust technical and organizational security measures (including
        encryption and access controls) to protect your data against unauthorized access,
        loss, or destruction.
      </p>
      <p>
        Breach Notification: In the unlikely event of a personal data breach that poses a
        risk to your rights and freedoms, we will notify the Nigeria Data Protection
        Commission (NDPC) within 72 hours of becoming aware of the breach, and we will
        notify you directly as required by the NDPA.
      </p>
      <h2>9. Your Rights as a Data Subject</h2>
      <p>
        Under the Nigeria Data Protection Act, 2023, you possess the following rights
        regarding your personal data:
      </p>
      <ul>
        <li>
          Right to be Informed: To know how your data is being processed (which this
          policy provides).
        </li>
        <li>
          Right of Access: To request a copy of the personal data we hold about you.
        </li>
        <li>
          Right to Rectification: To request correction of any inaccurate or incomplete
          data.
        </li>
        <li>
          Right to Erasure: To request the deletion of your personal data when there is no
          compelling reason for its continued processing.
        </li>
        <li>
          Right to Restrict Processing: To block or suppress the processing of your data
          under certain circumstances.
        </li>
        <li>
          Right to Data Portability: To receive your data in a structured, commonly used,
          and machine-readable format.
        </li>
        <li>
          Right to Object: To object to our processing of your data based on legitimate
          interests.
        </li>
        <li>
          Right to Withdraw Consent: To withdraw your consent at any time, without
          affecting the lawfulness of processing carried out prior to the withdrawal.
        </li>
      </ul>
      <h2>10. Contact Us and Data Protection Officer (DPO)</h2>
      <p>
        If you have any questions about this Privacy Policy, wish to exercise your data
        subject rights, or want to file a complaint, please contact our Data Protection
        Officer:
      </p>
      <p>Data Protection Officer: [Insert DPO Name or Title]</p>
      <p>Email: [Insert DPO Email, e.g., privacy@dorms.ng or dpo@dorms.ng]</p>
      <p>Physical Address: [Insert Registered Business Address in Nigeria]</p>
      <p>
        If you feel that your data rights have been violated and we have not adequately
        addressed your concerns, you have the right to lodge a formal complaint with the
        Nigeria Data Protection Commission (NDPC).
      </p>
      <Footer />
    </div>
  );
}
