import React from "react";
import { AuthProvider } from "../contexts/AuthContext";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { CallLogProvider } from "../contexts/UseCallLog";
import { TicketProvider } from "../contexts/useTicket";
import { SocketProvider } from "../contexts/SocketContext";
import { DeliveryProvider } from "../contexts/DeliveryProvider";
import { TrainingProvider } from "../contexts/TrainingProvider";
import { DashboardProvider } from "../contexts/DashboardProvider";

export const AppProviders = ({ children }) => {
  return (
    <AuthProvider>
      <SocketProvider>
        <DashboardProvider>
          <CallLogProvider>
            <TicketProvider>
              <DeliveryProvider>
                <TrainingProvider>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>{children}</LocalizationProvider>
                </TrainingProvider>
              </DeliveryProvider>
            </TicketProvider>
          </CallLogProvider>
        </DashboardProvider>
      </SocketProvider>
    </AuthProvider>
  );
};
