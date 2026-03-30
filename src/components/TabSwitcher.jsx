import { Suspense } from "react";
import Dashboard from "./Tabs/Dashboards/Dashboard";
import Loader from "./ui/Loader";
import MobileProfilePage from "./Tabs/Accounts";

// Converted to normal imports as per user request to speed up accessibility
import Calllog from "./Tabs/Callogs/CallLog";
import Tickets from "./Tabs/Tickets/TicketList";
import Orders from "./Tabs/Orders/index";
import Training from "./Tabs/Training/index";

const TabSwitcher = ({ tabId }) => {
  return (
    <>
      {/* Dashboard: Standard import, no global suspense to ensure it loads fast */}
      {tabId === 0 && <Dashboard />}

      {/* List Components: Loading states handled individually inside each component to show Header immediately */}
      {tabId === 1 && <Calllog />}
      {tabId === 2 && <Tickets />}
      {tabId === 3 && <Orders />}
      {tabId === 4 && <Training />}

      {/* Account Page: Normal import */}
      {tabId === 5 && <MobileProfilePage />}
    </>
  );
};



export default TabSwitcher;
