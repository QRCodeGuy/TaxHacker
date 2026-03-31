"use client"

import { Check, X, Trash2 } from "lucide-react"
import { createContext, ReactNode, useContext, useState } from "react"

type BannerType = "success" | "deleted" | "failed" | "default"

type Notification = {
  code: string
  message: string
  type?: BannerType
}

type NotificationContextType = {
  notification: Notification | null
  showNotification: (notification: Notification) => void
}

const NotificationContext = createContext<NotificationContextType>({
  notification: null,
  showNotification: () => {},
})

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notification, setNotification] = useState<Notification | null>(null)

  const showNotification = (notification: Notification) => {
    setNotification(notification)
    if (notification.code === "global.banner") {
      setTimeout(() => setNotification(null), 2000)
    }
  }

  const getBannerStyles = (type: BannerType = "default") => {
    switch (type) {
      case "success":
        return "bg-emerald-500/90 text-white backdrop-blur-sm"
      case "deleted":
        return "bg-[#121D15] text-white border border-[rgba(255,255,255,0.08)]"
      case "failed":
        return "bg-red-500/90 text-white backdrop-blur-sm"
      case "default":
        return "bg-[#172219] text-white border border-[rgba(255,255,255,0.08)]"
    }
  }

  const getBannerIcon = (type: BannerType = "default") => {
    switch (type) {
      case "success":
        return <Check className="h-10 w-10 animate-bounce" />
      case "deleted":
        return <Trash2 className="h-10 w-10 animate-bounce" />
      case "failed":
        return <X className="h-10 w-10 animate-bounce" />
      case "default":
        return null
    }
  }

  return (
    <NotificationContext.Provider value={{ notification, showNotification }}>
      {children}
      {notification?.code === "global.banner" && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className={`border rounded-lg p-8 flex flex-col items-center justify-center gap-4 shadow-lg h-[160px] w-[160px] ${getBannerStyles(notification.type)}`}
          >
            {getBannerIcon(notification.type)}
            <p className="text-xl font-medium">{notification.message}</p>
          </div>
        </div>
      )}
    </NotificationContext.Provider>
  )
}

export const useNotification = () => useContext(NotificationContext)
