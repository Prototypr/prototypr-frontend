import { Toaster } from "react-hot-toast";
import * as Portal from "@radix-ui/react-portal";

export default function AppToaster() {
    return (
      <Portal.Root>
        <Toaster
          toastOptions={{
            position: "top-rigcenterht",
            className: "toastOverride",

            success: {
              iconTheme: {
                primary: "#10B981",
                secondary: "white",
              },
            },
            error: {
              iconTheme: {
                primary: "#EF4444",
                secondary: "white",
              },
            },
          }}
        />
      </Portal.Root>
    )
  }
  