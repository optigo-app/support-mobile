import React, { createContext, useState, useContext, useEffect, useCallback, useMemo } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { BaseAPI } from "../apis/BaseAPI";
import DeliveryAPI from "../apis/DeliveryController";
import TrainingAPI from "../apis/TrainingController";
import Loader from "./../components/ui/Loader";
import Cookie from "js-cookie";
import useCommonStore from "./../store/CommonStore";
import { CancelRounded } from "@mui/icons-material";
import { Box, Typography, Stack, Button } from "@mui/material";

const PUBLIC_ROUTES = ["/privacy-policy", "/steps-account-delete", "/support"];
const AUTH_STORAGE_KEY = "SUPPORT_AUTH_DATA";


const AuthContext = createContext(null);

const DEFAULT_SERVICES = Object.freeze({
  ticket: false,
  callLog: false,
  training: false,
  orders: false,
});

const SERVICE_CONFIG = {
  TICKET: { SERVICE_NAME: "Ticket", VERSION_NO: "_Ticketv4", SP: "14" },
  CALL_LOG: { SERVICE_NAME: "CallLog", VERSION_NO: "v4", SP: "14" },
};

export const AuthProvider = ({ children }) => {
  const [searchParams] = useSearchParams();
  const Navigate = useNavigate();
  const location = useLocation();
  const { setTabId } = useCommonStore();

  const querySv = searchParams.get("SV");
  const queryToken = searchParams.get("token");

  // --- Persistent Storage Logic ---
  const storedAuth = useMemo(() => {
    try {
      const data = localStorage.getItem(AUTH_STORAGE_KEY);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  }, []);

  const [auth, setAuth] = useState(
    storedAuth ? { user: storedAuth.user, token: storedAuth.token } : { user: null, token: null }
  );

  const [services, setServices] = useState(() => {
    if (storedAuth?.raw) {
      // Initialize services synchronously for "lightning fast" boot
      const ok = storedAuth.raw;
      try {
        BaseAPI.initialize({
          YEAR_CODE: ok?.rd[0]?.yc,
          SV: ok?.rd[0]?.sv,
          SP: SERVICE_CONFIG.TICKET.SP,
          APP_USER_ID: ok?.rd2[0]?.userid,
          VERSION_NO: SERVICE_CONFIG.TICKET.VERSION_NO,
        }, SERVICE_CONFIG.TICKET.SERVICE_NAME);

        BaseAPI.initialize({
          YEAR_CODE: ok?.rd[0]?.yc,
          SV: ok?.rd[0]?.sv,
          SP: SERVICE_CONFIG.CALL_LOG.SP,
          APP_USER_ID: ok?.rd2[0]?.userid,
          VERSION_NO: SERVICE_CONFIG.CALL_LOG.VERSION_NO,
        }, SERVICE_CONFIG.CALL_LOG.SERVICE_NAME);

        TrainingAPI.initialize(ok);
        DeliveryAPI.initialize(ok);

        return { ticket: true, callLog: true, training: true, orders: true };
      } catch {
        return DEFAULT_SERVICES;
      }
    }
    return DEFAULT_SERVICES;
  });

  const [isInitialized, setIsInitialized] = useState(!!storedAuth);
  const [loading, setLoading] = useState(!storedAuth);

  useEffect(() => {
    if (PUBLIC_ROUTES.includes(location.pathname)) return;

    // Only redirect if we have neither URL info nor stored info
    if (!auth.user && !queryToken && process.env.NODE_ENV === "development") {
      Navigate(`/?SV=0&token=QZ7KX8Z23ZT7MLQY`);
    }
  }, [auth.user, queryToken, location.pathname, Navigate]);

  const clearState = useCallback(() => {
    setAuth({ user: null, token: null });
    setServices(DEFAULT_SERVICES);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  }, []);

  const initializeService = (service, credentials) => {
    try {
      BaseAPI.initialize(
        {
          YEAR_CODE: credentials?.rd[0]?.yc,
          SV: credentials?.rd[0]?.sv,
          SP: service.SP,
          APP_USER_ID: credentials?.rd2[0]?.userid,
          VERSION_NO: service.VERSION_NO,
        },
        service.SERVICE_NAME
      );
      return true;
    } catch {
      return false;
    }
  };

  const fetchToken = async (tk, sv) => {
    try {
      const res = await BaseAPI.getToken(tk, sv);
      if (res?.rd2?.[0] && res?.rd?.[0] && res?.rd1?.[0]) {
        const user = {
          ...res?.rd2?.[0],
          fullName: `${res?.rd2?.[0].firstname} ${res?.rd2?.[0].lastname}`,
          company: res?.rd[0]?.companycode,
          companycode: res?.rd[0]?.companycode,
          ukey: res?.rd[0]?.ukey,
          metadata: [res?.rd1?.[0]],
        };
        window.__AUTH__USER = { ...user, token: res?.rd?.[0] };
        setAuth({ user, token: res?.rd?.[0] });

        // Save to Persistent Storage
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify({
          user,
          token: res?.rd?.[0], // Session token used for calls
          inputToken: tk,       // Authorization token from URL/Original source
          raw: res
        }));


        return res;
      } else {
        throw new Error("Invalid token response");
      }
      return true;
    } catch (err) {
      console.error("Token fetch failed:", err);
      return false;
    }
  };

  const HandleLogout = () => {
    clearState();
    Cookie.remove("isUserLoggedIn");
    Cookie.remove("help_support");
    sessionStorage.removeItem("userRights");
    setTabId(0);
    Navigate("/logout", {
      replace: true,
    });
  };

  const HandleDeleteAccount = async () => {
    setTabId(0);
    sessionStorage.clear();
    window.location.reload();
    window.history.pushState({}, "", "/account-delete");
  };

  useEffect(() => {
    const init = async () => {
      // If we have a token in URL, check if it's different from the token used to create the stored session
      const hasNewUrlToken = queryToken && queryToken !== storedAuth?.inputToken;

      // If we're already initialized from storage and URL doesn't have a NEW token, we're done
      if (isInitialized && auth.user && !hasNewUrlToken) {
        setLoading(false);
        return;
      }


      try {
        const activeToken = queryToken || auth.token;
        const activeSv = querySv || storedAuth?.raw?.rd[0]?.sv || "0";

        if (!activeToken) {
          clearState();
          return;
        }

        const ok = await fetchToken(activeToken, activeSv);
        if (!ok) {
          clearState();
          return;
        }

        const ticket = initializeService(SERVICE_CONFIG.TICKET, ok);
        const calllog = initializeService(SERVICE_CONFIG.CALL_LOG, ok);
        const training = TrainingAPI.initialize(ok);
        const orders = DeliveryAPI.initialize(ok);

        setServices({
          ticket,
          callLog: calllog,
          training: Boolean(training),
          orders: Boolean(orders),
        });
      } catch (e) {
        console.error("Auth init error:", e);
        if (!auth.user) clearState(); // Don't wipe session if it was just an update failure
      } finally {
        setIsInitialized(true);
        setLoading(false);
      }
    };

    init();
  }, [queryToken, querySv]);

  const value = useMemo(
    () => ({
      user: auth.user,
      token: auth.token,
      isInitialized,
      clearState,
      services,
      HandleLogout,
      HandleDeleteAccount,
    }),
    [auth, isInitialized, services, clearState]
  );

  if (!isInitialized || loading) return <Loader />;

  if (!auth.user && !PUBLIC_ROUTES?.includes(location.pathname)) {
    return <></>;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};

const UnauthorizedScreen = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#F5F5F7",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
        fontFamily: "Poppins, sans-serif !important",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 420,
          bgcolor: "#fff",
          borderRadius: 4,
          p: 4,
          textAlign: "center",
          border: "1px solid #E5E7EB",
        }}
      >
        <Stack spacing={2.5} alignItems="center">
          {/* Icon */}
          <Box
            sx={{
              width: 72,
              height: 72,
              borderRadius: "50%",
              bgcolor: "#FEF2F2",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CancelRounded sx={{ fontSize: 40, color: "#DC2626" }} />
          </Box>

          {/* Title */}
          <Typography variant="h5" sx={{ fontWeight: 800 }}>
            Unauthorized Access
          </Typography>

          {/* Description */}
          <Typography variant="body2" sx={{ color: "text.secondary", lineHeight: 1.7 }}>
            You don’t have permission to view this page. Please sign in with the correct account or return to the previous page.
          </Typography>

          {/* Actions (static UI only)
          <Stack spacing={1.2} width="100%">
            <Button
              fullWidth
              variant="contained"
              sx={{
                borderRadius: 3,
                py: 1.2,
                fontWeight: 700,
                textTransform: "none",
              }}
            >
              Go to Login
            </Button>

            <Button
              fullWidth
              variant="outlined"
              sx={{
                borderRadius: 3,
                py: 1.2,
                fontWeight: 600,
                textTransform: "none",
              }}
            >
              Back to Home
            </Button>
          </Stack> */}
        </Stack>
      </Box>
    </Box>
  );
};
