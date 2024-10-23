import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

export default function SignIn() {
  return (
      <Tabs defaultValue="account" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="account">로그인</TabsTrigger>
          <TabsTrigger value="password">비밀번호 찾기</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>로그인</CardTitle>
              <CardDescription>
                아이디와 비밀번호를 입력하여 로그인 하세요.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="name">아이디</Label>
                <Input id="name" placeholder="아이디를 입력하세요." />
              </div>
              <div className="space-y-1">
                <Label htmlFor="username">비밀번호</Label>
                <Input id="username" placeholder="비밀번호를 입력하세요." />
              </div>
            </CardContent>
            <CardFooter>
              <Button>로그인</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="password">
          <Card>
            <CardHeader>
              <CardTitle>비밀번호 찾기</CardTitle>
              <CardDescription>
                비밀번호를 변경하세요.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="new">새로운 비밀번호</Label>
                <Input id="new" type="password"/>
              </div>
              <div className="space-y-1">
                <Label htmlFor="new">새로운 비밀번호 확인</Label>
                <Input id="new" type="password"/>
              </div>
            </CardContent>
            <CardFooter>
              <Button>비밀번호 저장</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
  )
}