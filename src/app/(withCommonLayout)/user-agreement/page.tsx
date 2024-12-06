"use client";
import React from "react";
import { Typography, Layout } from "antd";
import Container from "@/components/ui/Container";

const { Title, Paragraph } = Typography;

const UserAgreementPage = () => {
  return (
    <Layout
      style={{
        backgroundColor: "#080c14", // Dark background
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
            color: "#ffffff", // Pure white for the main title
          }}
        >
          User Agreement_
        </Title>
        <Paragraph style={{ color: "#d0d0d0" }}>
          Welcome to <strong>Traveleaf</strong>. By using our website, you agree
          to the following terms and conditions. Please read this User Agreement
          carefully.
        </Paragraph>

        <Title level={3} style={{ color: "#ffffff" }}>
          1. Acceptance of Terms
        </Title>
        <Paragraph style={{ color: "#d0d0d0" }}>
          By accessing and using our website, you agree to comply with and be
          bound by this User Agreement, our Privacy Policy, and all applicable
          laws.
        </Paragraph>

        <Title level={3} style={{ color: "#ffffff" }}>
          2. User Responsibilities
        </Title>
        <Paragraph style={{ color: "#d0d0d0" }}>
          As a user, you agree to:
          <ul style={{ color: "#d0d0d0" }}>
            <li>Provide accurate and up-to-date information when creating an account.</li>
            <li>Maintain the confidentiality of your account credentials.</li>
            <li>Use our website for lawful purposes only.</li>
          </ul>
        </Paragraph>

        <Title level={3} style={{ color: "#ffffff" }}>
          3. Prohibited Activities
        </Title>
        <Paragraph style={{ color: "#d0d0d0" }}>
          You are prohibited from:
          <ul style={{ color: "#d0d0d0" }}>
            <li>Posting harmful, abusive, or inappropriate content.</li>
            <li>Attempting to hack, damage, or disrupt our services.</li>
            <li>Engaging in fraudulent or deceptive activities.</li>
          </ul>
        </Paragraph>

        <Title level={3} style={{ color: "#ffffff" }}>
          4. Intellectual Property
        </Title>
        <Paragraph style={{ color: "#d0d0d0" }}>
          All content on this website, including text, images, logos, and
          software, is the property of <strong>Traveleaf</strong> and protected
          by copyright and trademark laws. Unauthorized use is strictly
          prohibited.
        </Paragraph>

        <Title level={3} style={{ color: "#ffffff" }}>
          5. Limitation of Liability
        </Title>
        <Paragraph style={{ color: "#d0d0d0" }}>
          We are not responsible for any damages or losses arising from your use
          of our website. Use our services at your own risk.
        </Paragraph>

        <Title level={3} style={{ color: "#ffffff" }}>
          6. Changes to This Agreement
        </Title>
        <Paragraph style={{ color: "#d0d0d0" }}>
          We may update this User Agreement periodically. Continued use of our
          website implies acceptance of the updated terms.
        </Paragraph>

        <Title level={3} style={{ color: "#ffffff" }}>
          7. Contact Us
        </Title>
        <Paragraph style={{ color: "#d0d0d0" }}>
          If you have questions or concerns about this User Agreement, contact
          us at: <strong style={{ color: "#ffffff" }}>support@traveleaf.com</strong>
        </Paragraph>
      </Container>
    </Layout>
  );
};

export default UserAgreementPage;
