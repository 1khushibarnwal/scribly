import { useEffect, useState, useRef } from "react";
import { WifiOffIcon, WifiIcon } from "lucide-react";
import api from "../lib/axios";

const OfflineBanner = () => {
  const [isOnline, setIsOnline] = useState(true);
  const [showReconnected, setShowReconnected] = useState(false);
  const wasOfflineRef = useRef(false);

  useEffect(() => {
    const checkConnection = async () => {
      try {
        await api.get("/notes", { params: { search: "__healthcheck__" } });
        if (wasOfflineRef.current) {
          setShowReconnected(true);
          setTimeout(() => setShowReconnected(false), 2500);
        }
        wasOfflineRef.current = false;
        setIsOnline(true);
      } catch (error) {
        // A 401 (not logged in) still proves the server IS reachable —
        // only a total network failure (no error.response) means truly offline
        if (!error.response) {
          wasOfflineRef.current = true;
          setIsOnline(false);
        } else {
          setIsOnline(true);
        }
      }
    };

    checkConnection();
    const interval = setInterval(checkConnection, 10000); // recheck every 10s

    window.addEventListener("online", checkConnection);
    window.addEventListener("offline", () => setIsOnline(false));

    return () => {
      clearInterval(interval);
      window.removeEventListener("online", checkConnection);
    };
  }, []);

  if (!isOnline) {
    return (
      <div className="sticky top-0 z-50 animate-[slideDown_0.3s_ease-out]">
        <div className="bg-gradient-to-r from-warning/90 to-warning text-warning-content px-4 py-2.5 flex items-center justify-center gap-2.5 text-sm font-medium shadow-md">
          <span className="relative flex size-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-warning-content/60"></span>
            <span className="relative inline-flex rounded-full size-2.5 bg-warning-content"></span>
          </span>
          <WifiOffIcon className="size-4" />
          Can't reach the server. Check your connection.
        </div>
      </div>
    );
  }

  if (showReconnected) {
    return (
      <div className="sticky top-0 z-50 animate-[slideDown_0.3s_ease-out]">
        <div className="bg-gradient-to-r from-success/90 to-success text-success-content px-4 py-2.5 flex items-center justify-center gap-2.5 text-sm font-medium shadow-md">
          <WifiIcon className="size-4" />
          Back online! Everything should work now.
        </div>
      </div>
    );
  }

  return null;
};

export default OfflineBanner;
