import { create } from "zustand";
import { UserInfo } from "@/views/Login/types";
import { devtools, persist } from "zustand/middleware";

export interface UserState {
  userInfo: UserInfo | null;
  token: string | null;
  setUserInfo: (userInfo: UserInfo) => void;
  setToken: (token: string) => void;
  logout: () => void;
}

const useUserStore = create<UserState>()(
  devtools(
    persist(
      // 持久化存储
      (set) => ({
        userInfo: null,
        token: null,
        setUserInfo: (userInfo) => set({ userInfo }),
        setToken: (token) => set({ token }),
        logout: () => set({ userInfo: null, token: null }),
      }),
      {
        name: "user-storage",
      }
    )
  )
);

export default useUserStore;
