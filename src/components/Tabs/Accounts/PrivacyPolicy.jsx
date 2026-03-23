import { Box, Typography, Stack, Paper } from "@mui/material";
import SwipeableBottomDrawer from "../../ui/SwipeableDrawer";

const Section = ({ title, children }) => (
  <Paper
    elevation={0}
    sx={{
      p: 2.5,
      borderRadius: 3,
      bgcolor: "#fff",
      border: "1px solid #E5E7EB",
    }}
  >
    <Typography
      variant="subtitle1"
      sx={{ fontWeight: 700, mb: 1, color: "text.primary" }}
    >
      {title}
    </Typography>

    <Typography
      variant="body2"
      sx={{
        color: "text.secondary",
        lineHeight: 1.7,
        whiteSpace: "pre-line",
      }}
    >
      {children}
    </Typography>
  </Paper>
);

const PrivacyPolicySection = ({ open, onClose }) => {
  return (
    <SwipeableBottomDrawer open={open} onClose={onClose}>
      <Box
        sx={{
          minHeight: "100vh",
          px: { xs: 2, sm: 3 },
          pt: 3,
          pb: 10,
        }}
      >
        {/* Header */}
        <Stack spacing={0.5} sx={{ mb: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: 800 }}>
            Privacy Policy
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Optigo Carely
          </Typography>
          <Typography variant="caption" color="text.disabled">
            Effective Date: 19 Aug 2025
          </Typography>
        </Stack>

        <Stack spacing={2.5}>
          <Section title="1. Introduction">
            Welcome to Optigo Carely ("we," "our," or "us"). We respect your
            privacy and are committed to protecting your personal information.
            This Privacy Policy explains what data we collect, why we collect
            it, how we use it, how we protect it, and your rights regarding
            your data.
            {"\n\n"}
            By using our App, you agree to the collection and use of your data
            as described in this Privacy Policy.
          </Section>

          <Section title="2. Information We Collect">
            <strong>A. Personal Information (Provided by Users)</strong>
            {"\n"}
            First Name, Last Name, Email Address, Mobile Number, Encrypted
            Password, Address, Country, State, City, Zip Code.
            {"\n\n"}

            <strong>B. Device Information (Collected Automatically)</strong>
            {"\n"}
            Brand, Model, Manufacturer, OS Version, OS Version Code,
            Device Type (Android or iOS).
            {"\n\n"}

            <strong>C. User Identifiers</strong>
            {"\n"}
            OneSignal UID (for push notifications), Device ID.
            {"\n\n"}

            <strong>D. Usage Data & Crash Reports</strong>
            {"\n"}
            Error logs, crash reports, and app performance data collected
            via Firebase. This data is used only for app improvements and
            not for advertising.
          </Section>

          <Section title="3. How We Use Your Information">
            We use your information for:
            {"\n"}• Authentication and account security
            {"\n"}• App performance and compatibility improvements
            {"\n"}• Push notifications via OneSignal
            {"\n"}• Bug fixing and crash analysis
            {"\n"}• Order and transaction management
            {"\n"}• Legal and regulatory compliance
            {"\n\n"}
            We do not sell or share your personal data with advertisers.
          </Section>

          <Section title="4. How We Share Your Information">
            We do not sell your personal data. We may share information:
            {"\n"}• With service providers such as Firebase and OneSignal
            {"\n"}• With legal authorities if required by law
          </Section>

          <Section title="5. Data Security">
            We use appropriate security measures including:
            {"\n"}• Encrypted password storage
            {"\n"}• Secure data storage systems
            {"\n"}• Restricted access to user information
            {"\n\n"}
            While we strive to protect your data, no electronic transmission
            or storage method is 100% secure. Please keep your login
            credentials confidential.
          </Section>

          <Section title="6. Your Rights & Choices">
            You have the right to:
            {"\n"}• Request correction of inaccurate data
            {"\n"}• Request deletion of your account and data
            {"\n"}• Manage notification preferences via device settings
            {"\n\n"}
            To exercise these rights, contact us at support@orail.in.
          </Section>

          <Section title="7. Data Retention Policy">
            We retain your data until you delete your account. This includes
            personal information, device details, user identifiers, usage
            data, and order history (if applicable).
            {"\n\n"}
            Once account deletion is requested, data is permanently erased
            unless retention is required by law or for fraud prevention.
          </Section>

          <Section title="8. Third-Party Services">
            We use trusted third-party services:
            {"\n"}• OneSignal – Push notifications
            {"\n"}• Firebase – Analytics and crash reporting
            {"\n\n"}
            These services operate under their own privacy policies. We do
            not share personal data for advertising purposes.
          </Section>

          <Section title="9. Changes to This Privacy Policy">
            We may update this Privacy Policy from time to time. Users will
            be notified via in-app notifications or email where applicable.
            Continued use of the App indicates acceptance of the updated
            policy.
          </Section>

          <Section title="10. Contact Information">
            Optigo Carely
            {"\n"}
            Address: ITC D-Block, G 19-22A, International Trade Center,
            Majura Gate, Ring Road, Surat – 395002, Gujarat, India.
            {"\n"}
            Email: support@orail.in
          </Section>
        </Stack>
      </Box>
    </SwipeableBottomDrawer>
  );
};

export default PrivacyPolicySection;

// import { Box, Typography, Stack, Divider, Paper } from "@mui/material";
// import SwipeableBottomDrawer from "../../ui/SwipeableDrawer";

// const Section = ({ title, children }) => (
//   <Paper
//     elevation={0}
//     sx={{
//       p: 2.5,
//       borderRadius: 3,
//       bgcolor: "#fff",
//       border: "1px solid #E5E7EB",
//     }}
//   >
//     <Typography
//       variant="subtitle1"
//       sx={{ fontWeight: 700, mb: 1, color: "text.primary" }}
//     >
//       {title}
//     </Typography>

//     <Typography
//       variant="body2"
//       sx={{
//         color: "text.secondary",
//         lineHeight: 1.7,
//         whiteSpace: "pre-line",
//       }}
//     >
//       {children}
//     </Typography>
//   </Paper>
// );

// const PrivacyPolicySection = ({ open, onClose }) => {
//   return (
//     <SwipeableBottomDrawer open={open} onClose={onClose} >
//       <Box
//         sx={{
//           minHeight: "100vh",
//           px: { xs: 2, sm: 3 },
//           pt: 3,
//           pb: 10,
//         }}
//       >
//         {/* Header */}
//         <Stack spacing={0.5} sx={{ mb: 3 }}>
//           <Typography variant="h5" sx={{ fontWeight: 800 }}>
//             Privacy Policy
//           </Typography>
//           <Typography variant="body2" color="text.secondary">
//             Optigo Carely
//           </Typography>
//           <Typography variant="caption" color="text.disabled">
//             Effective Date: — {new Date().toLocaleDateString()} | Last Updated: — {new Date().toLocaleDateString()}
//           </Typography>
//         </Stack>

//         <Stack spacing={2.5}>
//           <Section title="1. Information We Collect">
//             <strong>Personal Data:</strong>{"\n"}
//             Name, email address, phone number{"\n\n"}
//             <strong>Automatically Collected Data:</strong>{"\n"}
//             Device and app usage data, IP address, location (if permitted),
//             browser and operating system information.
//           </Section>

//           <Section title="2. Why We Collect Your Data">
//             We use your information to process orders, provide support,
//             send updates and promotions (with consent), improve app
//             performance, and ensure security.
//           </Section>

//           <Section title="3. Data Sharing">
//             Your data may be shared only for legal compliance or business
//             restructuring. We never sell or rent your personal data.
//           </Section>

//           <Section title="4. Your Privacy Choices">
//             You can update or delete your account information inside the app
//             and unsubscribe from marketing communications anytime.
//           </Section>

//           <Section title="5. Data Protection">
//             We use encryption, secure servers, and safeguards to protect
//             your information. Please keep your login credentials safe.
//           </Section>

//           <Section title="6. Cookies & Tracking">
//             Cookies help improve functionality and analyze usage.
//             You can disable cookies via your browser or app settings.
//           </Section>

//           <Section title="7. Third-Party Services">
//             Trusted third-party services may be used for payments,
//             shipping, or analytics, governed by their own privacy policies.
//           </Section>

//           <Section title="8. Data Retention">
//             We retain data only as long as required for business or legal
//             purposes, after which it is deleted or anonymized.
//           </Section>

//           <Section title="9. Children’s Privacy">
//             Optigo Carely is not intended for children under 13. If such
//             data is discovered, it will be deleted immediately.
//           </Section>

//           <Section title="10. Policy Updates">
//             This policy may be updated periodically. Continued app usage
//             after changes implies acceptance.
//           </Section>

//           <Section title="11. Contact Us">
//             Email: support@orail.in{"\n"}
//             Address: ITC D-Block, G 19-22A, International Trade Center,
//             Majura Gate, Ring Road, Surat – 395002, Gujarat, India.
//           </Section>
//         </Stack>
//       </Box>
//     </SwipeableBottomDrawer>
//   );
// };

// export default PrivacyPolicySection;
