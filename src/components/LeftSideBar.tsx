import {
    Sidebar,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarMenuSub,
    SidebarMenuSubItem,
    SidebarMenuSubButton
} from "./ui/sidebar";
import {
    FileTextIcon,
    HomeIcon,
    UserIcon,
    SettingsIcon
} from "lucide-react";
import {useState} from "react";

export default function LeftSideBar() {
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [isChallengesOpen, setIsChallengesOpen] = useState(false);
    const [isMyChallengesOpen, setIsMyChallengesOpen] = useState(false);
    const [isPostsOpen, setIsPostsOpen] = useState(false);
    const [isMessagingOpen, setIsMessagingOpen] = useState(false);

    return (
        <Sidebar>
            <SidebarMenu className="mt-5">
                <SidebarMenuItem>
                    <SidebarMenuButton>
                        <HomeIcon className="mr-2"/>
                        홈
                    </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                    <SidebarMenuButton>
                        <UserIcon className="mr-2"/>
                        프로필
                    </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                    <SidebarMenuButton onClick={() => setIsSettingsOpen(!isSettingsOpen)}>
                        <SettingsIcon className="mr-2"/>
                        설정
                    </SidebarMenuButton>
                    {isSettingsOpen && (
                        <SidebarMenuSub>
                            <SidebarMenuSubItem>
                                <SidebarMenuSubButton>
                                    이메일 찾기
                                </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                            <SidebarMenuSubItem>
                                <SidebarMenuSubButton>
                                    비밀번호 재설정
                                </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                            <SidebarMenuSubItem>
                                <SidebarMenuSubButton>
                                    알림 설정
                                </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                            <SidebarMenuSubItem>
                                <SidebarMenuSubButton>
                                    테마 설정
                                </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                            <SidebarMenuSubItem>
                                <SidebarMenuSubButton>
                                    UI 커스터마이징
                                </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                            <SidebarMenuSubItem>
                                <SidebarMenuSubButton>
                                    쿠키 설정
                                </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                            <SidebarMenuSubItem>
                                <SidebarMenuSubButton>
                                    차단 관리
                                </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                            <SidebarMenuSubItem>
                                <SidebarMenuSubButton>
                                    프로필 비공개 관리
                                </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                        </SidebarMenuSub>
                    )}
                </SidebarMenuItem>

                <SidebarMenuItem>
                    <SidebarMenuButton onClick={() => setIsChallengesOpen(!isChallengesOpen)}>
                        <FileTextIcon className="mr-2"/>
                        챌린지
                    </SidebarMenuButton>
                    {isChallengesOpen && (
                        <SidebarMenuSub>
                            <SidebarMenuSubItem>
                                <SidebarMenuSubButton>
                                    전체 챌린지 목록
                                </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                            <SidebarMenuSubItem>
                                <SidebarMenuSubButton>
                                    특정 카테고리 챌린지 목록
                                </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                            <SidebarMenuSubItem>
                                <SidebarMenuSubButton>
                                    챌린지 성공한 유저 목록
                                </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                            <SidebarMenuSubItem>
                                <SidebarMenuSubButton>
                                    우수 챌린지 목록
                                </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                            <SidebarMenuSubItem>
                                <SidebarMenuSubButton>
                                    새로운 챌린지 생성
                                </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                        </SidebarMenuSub>
                    )}
                </SidebarMenuItem>

                <SidebarMenuItem>
                    <SidebarMenuButton onClick={() => setIsMyChallengesOpen(!isMyChallengesOpen)}>
                        <FileTextIcon className="mr-2"/>
                        내 챌린지
                    </SidebarMenuButton>
                    {isMyChallengesOpen && (
                        <SidebarMenuSub>
                            <SidebarMenuSubItem>
                                <SidebarMenuSubButton>
                                    내가 참여 중인 챌린지 목록
                                </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                            <SidebarMenuSubItem>
                                <SidebarMenuSubButton>
                                    내가 완료한 챌린지 목록
                                </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                        </SidebarMenuSub>
                    )}
                </SidebarMenuItem>

                <SidebarMenuItem>
                    <SidebarMenuButton onClick={() => setIsPostsOpen(!isPostsOpen)}>
                        <FileTextIcon className="mr-2"/>
                        글 관리
                    </SidebarMenuButton>
                    {isPostsOpen && (
                        <SidebarMenuSub>
                            <SidebarMenuSubItem>
                                <SidebarMenuSubButton>
                                    글 목록
                                </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                            <SidebarMenuSubItem>
                                <SidebarMenuSubButton>
                                    새 글 작성
                                </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                            <SidebarMenuSubItem>
                                <SidebarMenuSubButton>
                                    글 상세 보기
                                </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                            <SidebarMenuSubItem>
                                <SidebarMenuSubButton>
                                    글 수정
                                </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                            <SidebarMenuSubItem>
                                <SidebarMenuSubButton>
                                    추천 수로 정렬된 글 목록
                                </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                        </SidebarMenuSub>
                    )}
                </SidebarMenuItem>

                <SidebarMenuItem>
                    <SidebarMenuButton onClick={() => setIsMessagingOpen(!isMessagingOpen)}>
                        <FileTextIcon className="mr-2"/>
                        메시징
                    </SidebarMenuButton>
                    {isMessagingOpen && (
                        <SidebarMenuSub>
                            <SidebarMenuSubItem>
                                <SidebarMenuSubButton>
                                    메시지 채널 목록
                                </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                            <SidebarMenuSubItem>
                                <SidebarMenuSubButton>
                                    특정 채팅방
                                </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                            <SidebarMenuSubItem>
                                <SidebarMenuSubButton>
                                    챌린지 채팅방
                                </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                            <SidebarMenuSubItem>
                                <SidebarMenuSubButton>
                                    특정 메시지 링크
                                </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                        </SidebarMenuSub>
                    )}
                </SidebarMenuItem>

                <SidebarMenuItem>
                    <SidebarMenuButton>
                        로그인
                    </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                    <SidebarMenuButton>
                        회원가입
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        </Sidebar>
    );
}
