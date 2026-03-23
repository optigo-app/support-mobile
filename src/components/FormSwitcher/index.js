import useCommonStore from "../../store/CommonStore";
import AddTaskForm from "../Tabs/Callogs/create";
import CreateTicketDrawer from "../Tabs/Tickets/create";

export default function FormSwitcher() {
  const openForm = useCommonStore((s) => s.openForm);
  const clearOpenForm = useCommonStore((s) => s.clearOpenForm);

  const IsTaskOpen = Boolean(openForm === "task");
  const IsTicketOpen = Boolean(openForm === "ticket");

  return (
    <>
      <AddTaskForm open={IsTaskOpen} onClose={clearOpenForm} />
      <CreateTicketDrawer open={IsTicketOpen} onClose={clearOpenForm} />
    </>
  );
}
