import React from "react";
import { Routes, Route } from "react-router-dom";
import App from "./App";
import Watermark from "@uiw/react-watermark";
import AccountDeleteStep from "./components/Tabs/Accounts/AccountDeleteStep";
import PrivacyPolicyPage from "./components/Tabs/Accounts/PrivacyPolicyPage";
import SupportPage from "./components/Tabs/Accounts/SupportPage";

const Entry = () => {
  return (
    <>
      {/* <Watermark content="Prototype"  fontSize={30} gapX={150} gapY={150} rotate={-30} opacity={1}> */}
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/steps-account-delete" element={<AccountDeleteStep />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/support" element={<SupportPage />} />
      </Routes>
      {/* </Watermark> */}
    </>
  );
};

export default Entry;
