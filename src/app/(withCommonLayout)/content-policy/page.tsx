"use client";
import React from "react";
import { Typography, Layout } from "antd";
import Container from "@/components/ui/Container";

const { Title, Paragraph } = Typography;

const ContentPolicyPage = () => {
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
            color: "#ffffff", // Pure white for main title
          }}
        >
          Content Policy_
        </Title>
        <Paragraph style={{ color: "#d0d0d0" }}>
          At <strong>Traveleaf</strong>, we strive to maintain a respectful and
          inclusive community. Our Content Policy outlines the rules and
          guidelines for users interacting with our platform.
        </Paragraph>

        <Title level={3} style={{ color: "#ffffff" }}>
          1. Prohibited Content
        </Title>
        <Paragraph style={{ color: "#d0d0d0" }}>
          Users are prohibited from posting or sharing content that:
          <ul style={{ color: "#d0d0d0" }}>
            <li>Contains hate speech, harassment, or bullying.</li>
            <li>Promotes violence, illegal activities, or self-harm.</li>
            <li>Includes explicit or inappropriate material.</li>
            <li>Violates intellectual property rights or copyrights.</li>
          </ul>
        </Paragraph>

        <Title level={3} style={{ color: "#ffffff" }}>
          2. User Responsibilities
        </Title>
        <Paragraph style={{ color: "#d0d0d0" }}>
          Users are responsible for:
          <ul style={{ color: "#d0d0d0" }}>
            <li>Ensuring the accuracy and integrity of the content they share.</li>
            <li>Respecting the rights and opinions of others.</li>
            <li>Complying with all applicable laws and regulations.</li>
          </ul>
        </Paragraph>

        <Title level={3} style={{ color: "#ffffff" }}>
          3. Reporting Violations
        </Title>
        <Paragraph style={{ color: "#d0d0d0" }}>
          If you come across content that violates this policy, please report it
          to us immediately. We take such reports seriously and will take
          appropriate action.
        </Paragraph>

        <Title level={3} style={{ color: "#ffffff" }}>
          4. Enforcement Actions
        </Title>
        <Paragraph style={{ color: "#d0d0d0" }}>
          Violation of this policy may result in actions such as:
          <ul style={{ color: "#d0d0d0" }}>
            <li>Content removal.</li>
            <li>Account suspension or termination.</li>
            <li>Legal action, if necessary.</li>
          </ul>
        </Paragraph>

        <Title level={3} style={{ color: "#ffffff" }}>
          5. Updates to This Policy
        </Title>
        <Paragraph style={{ color: "#d0d0d0" }}>
          We may update this Content Policy from time to time to ensure it
          aligns with our community standards and legal obligations.
        </Paragraph>

        <Title level={3} style={{ color: "#ffffff" }}>
          6. Contact Us
        </Title>
        <Paragraph style={{ color: "#d0d0d0" }}>
          If you have any questions or concerns about our Content Policy,
          contact us at: <strong style={{ color: "#ffffff" }}>support@traveleaf.com</strong>
        </Paragraph>
      </Container>
    </Layout>
  );
};

export default ContentPolicyPage;
