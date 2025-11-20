import React from "react";
import { motion } from "framer-motion"; // eslint-disable-line no-unused-vars
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ACCENT_BLUE = "#38b6ff";
const DEEP_BLUE = "#000433";
const BACKGROUND_BLACK = "#000000";
const TEXT_WHITE = "#FFFFFF";
const LIGHT_GREY = "#bbbbbb";

const PrivacyPolicy = () => {
  return (
    <div
      style={{
        backgroundColor: BACKGROUND_BLACK,
        color: TEXT_WHITE,
        minHeight: "100vh",
      }}
    >
      <Navbar />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        // ★★★ FIX: Reduced top margin and padding for mobile ★★★
        className="max-w-5xl px-6 py-12 mx-auto mt-16 text-left sm:py-16 sm:mt-20"
      >
        <h1
          // ★★★ FIX: Responsive heading size ★★★
          className="mb-8 text-3xl font-bold sm:text-4xl"
          style={{ color: ACCENT_BLUE }}
        >
          Privacy Policy
        </h1>

        {/* ★★★ FIX: Responsive paragraph text size ★★★ */}
        <p className="mb-10 text-base text-gray-300 sm:text-lg">
          At <span style={{ color: ACCENT_BLUE }}>Ucentric</span>, we are
          committed to protecting your personal information and ensuring that
          your digital experience with us remains secure, transparent, and
          trustworthy. This Privacy Policy explains how we collect, use, and
          safeguard your data when you interact with our services, website, and
          digital platforms.
        </p>

        {/* SECTION 1 */}
        <section className="mb-10">
          {/* ★★★ FIX: Responsive section heading size ★★★ */}
          <h2
            className="mb-4 text-xl font-semibold sm:text-2xl"
            style={{ color: ACCENT_BLUE }}
          >
            1. Information We Collect
          </h2>
          {/* ★★★ FIX: Responsive text size ★★★ */}
          <p className="mb-2 text-sm text-gray-300 sm:text-base">
            We collect information that helps us deliver a better user
            experience. This may include:
          </p>
          {/* ★★★ FIX: Responsive list text size ★★★ */}
          <ul className="ml-6 space-y-2 text-sm text-gray-300 list-disc sm:text-base">
            <li>
              Personal details such as your name, email address, phone number,
              and company name when you contact us or use our services.
            </li>
            <li>
              Project-related information shared by you to help us deliver
              customized solutions.
            </li>
            <li>
              Technical details like browser type, IP address, and device data
              for analytics and security improvement.
            </li>
          </ul>
        </section>

        {/* SECTION 2 */}
        <section className="mb-10">
          <h2
            className="mb-4 text-xl font-semibold sm:text-2xl"
            style={{ color: ACCENT_BLUE }}
          >
            2. How We Use Your Information
          </h2>
          <p className="mb-2 text-sm text-gray-300 sm:text-base">
            Your data helps us create personalized, high-quality digital
            experiences. We use the information to:
          </p>
          <ul className="ml-6 space-y-2 text-sm text-gray-300 list-disc sm:text-base">
            <li>Deliver and improve our web, app, and digital services.</li>
            <li>
              Respond to your inquiries, feedback, or support requests promptly.
            </li>
            <li>
              Send project updates, promotional offers, or important
              service-related communications.
            </li>
            <li>
              Analyze traffic and user behavior to enhance website functionality
              and performance.
            </li>
          </ul>
        </section>

        {/* SECTION 3 */}
        <section className="mb-10">
          <h2
            className="mb-4 text-xl font-semibold sm:text-2xl"
            style={{ color: ACCENT_BLUE }}
          >
            3. Data Protection and Security
          </h2>
          <p className="mb-2 text-sm text-gray-300 sm:text-base">
            We take data security seriously. Ucentric implements advanced
            technical and organizational measures to protect your data from
            unauthorized access, alteration, disclosure, or destruction. These
            include:
          </p>
          <ul className="ml-6 space-y-2 text-sm text-gray-300 list-disc sm:text-base">
            <li>Secure servers and encrypted data storage.</li>
            <li>Regular audits and security updates to minimize risks.</li>
            <li>
              Restricted access to sensitive information to authorized personnel
              only.
            </li>
          </ul>
        </section>

        {/* SECTION 4 */}
        <section className="mb-10">
          <h2
            className="mb-4 text-xl font-semibold sm:text-2xl"
            style={{ color: ACCENT_BLUE }}
          >
            4. Sharing of Information
          </h2>
          <p className="mb-2 text-sm text-gray-300 sm:text-base">
            We value your privacy and do not sell, rent, or share your data with
            third parties except in the following cases:
          </p>
          <ul className="ml-6 space-y-2 text-sm text-gray-300 list-disc sm:text-base">
            <li>When required by law or legal authorities.</li>
            <li>
              With trusted service providers who help us deliver our projects
              under strict confidentiality agreements.
            </li>
            <li>
              If we undergo a merger, acquisition, or partnership, where limited
              data transfer is necessary.
            </li>
          </ul>
        </section>

        {/* SECTION 5 */}
        <section className="mb-10">
          <h2
            className="mb-4 text-xl font-semibold sm:text-2xl"
            style={{ color: ACCENT_BLUE }}
          >
            5. Your Rights and Choices
          </h2>
          <p className="mb-2 text-sm text-gray-300 sm:text-base">
            You have complete control over your personal data. You can:
          </p>
          <ul className="ml-6 space-y-2 text-sm text-gray-300 list-disc sm:text-base">
            <li>Request access or correction of your personal information.</li>
            <li>Opt out of promotional emails or newsletters anytime.</li>
            <li>Request deletion of your data from our records.</li>
          </ul>
          <p className="mt-3 text-sm text-gray-300 sm:text-base">
            To exercise these rights, contact us at{" "}
            <a
              href="mailto:Ucentric.in@gmail.com"
              className="hover:underline"
              style={{ color: ACCENT_BLUE }}
            >
              Ucentric.in@gmail.com
            </a>
            .
          </p>
        </section>

        {/* SECTION 6 */}
        <section className="mb-10">
          <h2
            className="mb-4 text-xl font-semibold sm:text-2xl"
            style={{ color: ACCENT_BLUE }}
          >
            6. Policy Updates
          </h2>
          <p className="text-sm text-gray-300 sm:text-base">
            Ucentric reserves the right to update or modify this Privacy Policy
            from time to time to reflect changes in our practices or legal
            requirements. Any updates will be posted on this page with the
            revised date.
          </p>
        </section>

        {/* SECTION 7 */}
        <section className="mb-10">
          <h2
            className="mb-4 text-xl font-semibold sm:text-2xl"
            style={{ color: ACCENT_BLUE }}
          >
            7. Contact Us
          </h2>
          <p className="text-sm text-gray-300 sm:text-base">
            If you have any questions, concerns, or suggestions regarding our
            privacy practices, feel free to reach out to us at:
            <br />
            <span style={{ color: ACCENT_BLUE }}>Email:</span>{" "}
            <a
              href="mailto:contact@ucentric.in"
              className="text-gray-300 hover:underline"
            >
              contact@ucentric.in
            </a>
            <br />
            <span style={{ color: ACCENT_BLUE }}>Phone no:</span>{" "}
            <a
              href="tel:+917406167017"
              className="text-gray-300 hover:underline"
            >
              7406167017
            </a>
          </p>
        </section>
      </motion.div>

      {/* <Footer /> */}
      {/* I see Footer is imported but not used. Uncomment this if you want the footer to show. */}
    </div>
  );
};

export default PrivacyPolicy;
