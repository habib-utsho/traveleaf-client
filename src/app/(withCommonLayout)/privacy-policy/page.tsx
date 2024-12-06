"use client";
import React from "react";
import { Typography, Layout } from "antd";
import Container from "@/components/ui/Container";

const { Title, Paragraph } = Typography;

const PrivacyPolicyPage = () => {
  return (
    <Layout
      style={{
        backgroundColor: "#080c14", // Updated background color
        color: "#ffffff", // Default text color
        padding: "20px",
        minHeight: "100vh",
      }}
    >
      <Container>
        <Title
          level={2}
          style={{
            textAlign: "center",
            marginBottom: "20px",
            color: "#ffffff", // Pure white for main title
          }}
        >
          Privacy Policy_
        </Title>
        <Paragraph style={{ color: "#d0d0d0" }}>
          At <strong>Traveleaf</strong>, we value your privacy and are committed
          to protecting your personal data. This Privacy Policy outlines how we
          collect, use, and safeguard your information when you use our
          website.
        </Paragraph>

        <Title level={3} style={{ color: "#ffffff" }}>1. Information We Collect</Title>
        <Paragraph style={{ color: "#d0d0d0" }}>
          We may collect personal information, including but not limited to:
          <ul style={{ color: "#d0d0d0" }}>
            <li>Name and contact details (email address, phone number).</li>
            <li>Information you provide when leaving comments or contacting us.</li>
            <li>Technical data, including IP address and browser type, for analytics.</li>
          </ul>
        </Paragraph>

        <Title level={3} style={{ color: "#ffffff" }}>2. How We Use Your Information</Title>
        <Paragraph style={{ color: "#d0d0d0" }}>
          The information we collect is used to:
          <ul style={{ color: "#d0d0d0" }}>
            <li>Improve your experience on our website.</li>
            <li>Respond to your inquiries or comments.</li>
            <li>Send updates, newsletters, or promotional content (if subscribed).</li>
          </ul>
        </Paragraph>

        <Title level={3} style={{ color: "#ffffff" }}>3. Cookies</Title>
        <Paragraph style={{ color: "#d0d0d0" }}>
          We use cookies to enhance your browsing experience. Cookies help us analyze website traffic and improve functionality. You can adjust cookie preferences in your browser settings.
        </Paragraph>

        <Title level={3} style={{ color: "#ffffff" }}>4. Data Sharing</Title>
        <Paragraph style={{ color: "#d0d0d0" }}>
          We do not sell or share your personal information with third parties, except when required by law or to provide services (e.g., analytics).
        </Paragraph>

        <Title level={3} style={{ color: "#ffffff" }}>5. Your Rights</Title>
        <Paragraph style={{ color: "#d0d0d0" }}>
          You have the right to:
          <ul style={{ color: "#d0d0d0" }}>
            <li>Access the information we hold about you.</li>
            <li>Request corrections to your personal data.</li>
            <li>Opt-out of receiving marketing emails.</li>
          </ul>
        </Paragraph>

        <Title level={3} style={{ color: "#ffffff" }}>6. Changes to This Policy</Title>
        <Paragraph style={{ color: "#d0d0d0" }}>
          We may update this Privacy Policy from time to time. We recommend checking this page periodically for updates.
        </Paragraph>

        <Title level={3} style={{ color: "#ffffff" }}>7. Contact Us</Title>
        <Paragraph style={{ color: "#d0d0d0" }}>
          If you have any questions about this Privacy Policy, feel free to contact us at: <strong style={{ color: "#ffffff" }}>support@traveleaf.com</strong>
        </Paragraph>
      </Container>
    </Layout>
  );
};

export default PrivacyPolicyPage;
