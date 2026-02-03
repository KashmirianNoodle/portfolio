import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Phone } from "lucide-react";
import PageWrapper from "../components/PageWrapper";
import { personalInfo } from "../data/portfolioData";
import PageHeader from "../components/PageHeader";
import WebGLBackground from "../components/WebGLBackground";

const EMAIL_SUBJECT = encodeURIComponent("Hello — Let's Connect");
const EMAIL_BODY = encodeURIComponent(
  "Hi,\n\nI came across your portfolio and wanted to reach out.\n\nThanks!"
);
export default function Contact() {
  return (
    <PageWrapper>
        <WebGLBackground />
      <div className="max-w-3xl mx-auto space-y-12">
        {/* Header */}
        <PageHeader
        title="Contact"
        subtitle="Open to backend roles, system design discussions, or collaborating on interesting products."
      />

        {/* Contact Cards */}
        <div className="grid gap-4 sm:grid-cols-2">

          {/* Email */}
          <ContactCard
            href={`mailto:${personalInfo.email}?subject=${EMAIL_SUBJECT}&body=${EMAIL_BODY}`}
            icon={<Mail size={22} />}
            label="Email"
            value={personalInfo.email}
            hint="Send a message"
          />

          {/* Phone */}
          <ContactCard
            href="tel:+919596973984"
            icon={<Phone size={22} />}
            label="Phone"
            value="+91 95969 73984"
            hint="Call or WhatsApp"
          />

          {/* LinkedIn */}
          <ContactCard
            href={personalInfo.linkedin}
            icon={<Linkedin size={22} />}
            label="LinkedIn"
            value="linkedin.com"
            hint="Professional profile"
          />

          {/* GitHub */}
          <ContactCard
            href={personalInfo.github}
            icon={<Github size={22} />}
            label="GitHub"
            value="github.com"
            hint="Code & projects"
          />

        </div>

        {/* Footer note */}
        {/* <p className="text-sm text-white/45 text-center pt-4">
          Usually responds within a day.
        </p> */}

      </div>
    </PageWrapper>
  );
}

/* ---------------- Card Component ---------------- */

function ContactCard({ href, icon, label, value, hint }) {
  return (
    <motion.a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel="noopener noreferrer"
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      className="
        rounded-xl p-5
        bg-white/5 backdrop-blur
        border border-white/10
        hover:border-cyan-400/40
        transition
        flex flex-col gap-2
      "
    >
      <div className="flex items-center gap-3 text-primary">
        {icon}
        <span className="font-semibold">
          {label}
        </span>
      </div>

      <span className="text-sm text-white/80 break-all">
        {value}
      </span>

      <span className="text-xs text-white/45">
        {hint}
      </span>
    </motion.a>
  );
}
