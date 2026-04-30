import {
  createContext,
  type PropsWithChildren,
  use,
} from "react";
import { useOnboardingState } from "../hooks/useOnboardingState";

interface AppContextType {
  isOnboarded: boolean;
  isOnboardingLoading: boolean;
  completeOnboarding: () => void;
  isLoading: boolean;
}

const AppContext = createContext<AppContextType>({
  isOnboarded: false,
  isOnboardingLoading: false,
  completeOnboarding: () => {},
  isLoading: false,
});

export function useSession() {
  const value = use(AppContext);
  if (!value) {
    throw new Error("useSession must be wrapped in a <SessionProvider />");
  }
  return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
  const {
    isLoading: isOnboardingLoading,
    isOnboarded,
    completeOnboarding,
  } = useOnboardingState();

  return (
    <AppContext.Provider
      value={{
        isOnboarded,
        isOnboardingLoading,
        completeOnboarding,
        isLoading: isOnboardingLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
