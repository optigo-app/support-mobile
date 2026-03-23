import { lazy, Suspense } from "react";
import Dashboard from "./Tabs/Dashboards/Dashboard";
import Loader from "./ui/Loader";
import MobileProfilePage from "./Tabs/Accounts";

const Calllog = lazy(() => import("./Tabs/Callogs/CallLog"));
const Tickets = lazy(() => import("./Tabs/Tickets/TicketList"));
const Orders = lazy(() => import("./Tabs/Orders/index"));
const Training = lazy(() => import("./Tabs/Training/index"));

const TabSwitcher = ({ tabId }) => {
  return (
    <Suspense fallback={<Loader />}>
      {tabId === 0 && <Dashboard />}
      {tabId === 1 && <Calllog />}
      {tabId === 2 && <Tickets />}
      {tabId === 3 && <Orders />}
      {tabId === 4 && <Training />}
      {tabId === 5 && <MobileProfilePage />}
    </Suspense>
  );
};

export default TabSwitcher;
