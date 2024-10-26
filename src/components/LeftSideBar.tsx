"use client"

import React from "react"
import { ChevronRight, Menu } from "lucide-react"
import { useNavigate } from "react-router-dom"

import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarProvider,
} from "@/components/ui/sidebar"
import {
  FileTextIcon,
  HomeIcon,
  MessageSquareIcon,
  SettingsIcon,
  UserIcon,
} from "lucide-react"

export default function LeftSideBar() {
  const [isExpanded, setIsExpanded] = React.useState(true)
  const [openSections, setOpenSections] = React.useState<{ [key: number]: boolean }>({})
  const navigate = useNavigate()

  const sections = [
    {
      title: "홈",
      icon: <HomeIcon />,
      url: "/",
    },
    {
      title: "프로필",
      icon: <UserIcon />,
      url: "/my-profile",
    },
    {
      title: "챌린지",
      icon: <FileTextIcon />,
      items: [
        { title: "전체 챌린지 목록", url: "/challenges" },
        { title: "새로운 챌린지 생성", url: "/challenges/new" },
        { title: "우수 챌린지 목록", url: "/challenges/top" },
        { title: "챌린지 성공한 유저 목록", url: "/challenges/success-users" },
        { title: "나의 챌린지 목록", url: "/my-challenges" },
      ],
    },
    {
      title: "나의 챌린지 이벤트",
      icon: <FileTextIcon />,
      items: [
        { title: "참여 중인 챌린지 이벤트 목록", url: "/my-events/upcoming" },
        { title: "완료한 챌린지 이벤트 목록", url: "/my-events/completed" },
        { title: "실패한 챌린지 이벤트 목록", url: "/my-events/failed" },
      ],
    },
    {
      title: "글 관리",
      icon: <FileTextIcon />,
      items: [
        { title: "글 목록", url: "/posts" },
        { title: "새 글 작성", url: "/posts/new" },
        { title: "추천 수로 정렬된 글 목록", url: "/posts/sort/likes" },
      ],
    },
    {
      title: "메시징",
      icon: <MessageSquareIcon />,
      items: [
        { title: "메시지 채널 목록", url: "/message-channels" },
        { title: "챌린지 채팅방", url: "/message-channels/challenges" },
      ],
    },
    {
      title: "설정",
      icon: <SettingsIcon />,
      items: [
        { title: "이메일 찾기", url: "/account/find-email" },
        { title: "비밀번호 재설정", url: "/account/reset-password" },
        { title: "알림 설정", url: "/settings/notifications" },
        { title: "테마 설정", url: "/settings/appearances" },
        { title: "UI 커스터마이징", url: "/settings/customization" },
        { title: "쿠키 설정", url: "/settings/cookie" },
        { title: "차단 관리", url: "/settings/block-users" },
        { title: "프로필 비공개 관리", url: "/settings/private-account" },
      ],
    },
  ]

  return (
      <SidebarProvider>
        <div className="flex h-screen">
          <Sidebar
              className={`border-r transition-all duration-300 ${
                  isExpanded ? "w-64" : "w-16"
              }`}
          >
            <SidebarHeader className="flex p-4">
              <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsExpanded(!isExpanded)}
              >
                <Menu className="h-4 w-4" />
              </Button>
            </SidebarHeader>
            <SidebarContent>
              {sections.map((section, index) => {
                const hasItems = section.items && section.items.length > 0
                const isOpen = openSections[index] || false

                if (isExpanded) {
                  if (hasItems) {
                    return (
                        <Collapsible
                            key={index}
                            className="px-2 py-1"
                            open={isOpen}
                            onOpenChange={(open) => {
                              setOpenSections((prev) => ({ ...prev, [index]: open }))
                            }}
                        >
                          <CollapsibleTrigger className="flex w-full items-center py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground">
                            {section.icon && <span className="mr-2">{section.icon}</span>}
                            {section.title}
                            {section.items && section.items.length > 0 && (
                                <ChevronRight
                                    className={`h-4 w-4 transition-transform duration-200 ${
                                        isOpen ? "rotate-90" : ""
                                    }`}
                                />
                            )}
                          </CollapsibleTrigger>
                          <CollapsibleContent>
                            <ul className="space-y-1 py-1">
                              {section.items.map((item, itemIndex) => (
                                  <li key={itemIndex}>
                                    <div
                                        className="block rounded-md px-2 py-1 text-sm hover:bg-accent hover:text-accent-foreground cursor-pointer"
                                        onClick={() => navigate(item.url)}
                                    >
                                      {item.title}
                                    </div>
                                  </li>
                              ))}
                            </ul>
                          </CollapsibleContent>
                        </Collapsible>
                    )
                  } else {
                    return (
                        <div
                            key={index}
                            className="flex items-center px-2 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground cursor-pointer"
                            onClick={() => {
                              if (section.url) {
                                navigate(section.url)
                              }
                            }}
                        >
                          {section.icon && <span className="mr-2">{section.icon}</span>}
                          {section.title}
                        </div>
                    )
                  }
                } else {
                  return (
                      <div
                          key={index}
                          className="flex items-center justify-center px-2 py-2 hover:bg-accent hover:text-accent-foreground cursor-pointer"
                          onClick={() => {
                            if (section.url) {
                              navigate(section.url)
                            }
                          }}
                      >
                        {section.icon}
                      </div>
                  )
                }
              })}
            </SidebarContent>
          </Sidebar>
        </div>
      </SidebarProvider>
  )
}
