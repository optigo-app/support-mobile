import { useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { Box } from "@mui/material";
import TabSwitcher from "./components/TabSwitcher";
import useCommonStore from "./store/CommonStore";
import CallLogsFabMenu from "./components/ui/FabButton";
import DynamicIslandNav from "./components/ui/DynamicIsland";
import FormSwitcher from "./components/FormSwitcher";

const SupportMobile = () => {
  const { tabId, setTabId } = useCommonStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const lastSyncedTabId = useRef(tabId);

  // Bi-directional sync between URL "tab" parameter and Store
  useEffect(() => {
    const tabParam = searchParams.get("tab");
    const tabInUrl = tabParam !== null ? parseInt(tabParam, 10) : null;

    if (tabInUrl !== null && tabInUrl !== lastSyncedTabId.current) {
      // 1. URL changed (e.g. back button) -> Update Store
      setTabId(tabInUrl);
      lastSyncedTabId.current = tabInUrl;
    } else if (tabId !== lastSyncedTabId.current) {
      // 2. Store changed (e.g. UI click) -> Update URL
      const newParams = new URLSearchParams(searchParams);
      newParams.set("tab", tabId.toString());
      setSearchParams(newParams);
      lastSyncedTabId.current = tabId;
    } else if (tabInUrl === null) {
      // 3. Initial load or no tab in URL -> Sync Store to URL
      const newParams = new URLSearchParams(searchParams);
      newParams.set("tab", tabId.toString());
      setSearchParams(newParams, { replace: true });
      lastSyncedTabId.current = tabId;
    }
  }, [searchParams, tabId, setTabId, setSearchParams]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
      left: 0,
    });
  }, [window.location.pathname, tabId]);

  return (
    <>
      <Box
        sx={{
          minHeight: "100vh",
          maxHeight: "100vh",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          bgcolor: '#fff'
        }}
      >
        {tabId !== 5 && <CallLogsFabMenu />}
        <TabSwitcher tabId={tabId} />
        <DynamicIslandNav setTabId={setTabId} tabId={tabId} />
      </Box>
      <FormSwitcher />
    </>
  );
};

export default SupportMobile;
