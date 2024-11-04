import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate, useParams } from 'react-router-dom';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
export default function PostDetail() {
    const navigate = useNavigate();
    const { post_id } = useParams();

    // 임시 데이터
    const posts = [
        {
            id: '1',
            title: 'Ice Cream Shop Tagline Ideas',
            author: 'John Doe',
            authorAvatar: '/path/to/avatar.jpg',
            createdAt: '2024-11-01',
            content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus interdum justo vel
                      mauris placerat, non consequat dui accumsan. Nullam eget justo non metus viverra
                      commodo. Donec fermentum magna sit amet tristique varius.`,
            tags: ['Business', 'Marketing', 'Ideas'],
            likes: 10,
            dislikes: 2,
        },
        {
            id: '2',
            title: 'Best Coffee Shop Slogans',
            author: 'Jane Smith',
            authorAvatar: '/path/to/avatar2.jpg',
            createdAt: '2024-10-15',
            content: `Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar
    tempor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.`,
            tags: ['Coffee', 'Business', 'Slogans'],
            likes: 8,
            dislikes: 1,
        },
    ];

    const comments = [
        {
            id: '1',
            author: 'Alice',
            content: '정말 유용한 글이에요!',
            createdAt: '2024-11-02',
        },
        {
            id: '2',
            author: 'Bob',
            content: '몇 가지 포인트는 동의하지 않지만, 전체적으로 좋네요.',
            createdAt: '2024-11-03',
        },
    ];

    const post = posts.find((p) => p.id === post_id);

    if (!post) {
        return <div className="text-center mt-20">게시글을 찾을 수 없습니다.</div>;
    }

    return (
        <div className="min-h-screen px-8 py-12">
            <Card className="w-full max-w-4xl mx-auto shadow-lg p-8">
                <CardHeader>
                    <CardTitle className="text-3xl font-bold mb-4">{post.title}</CardTitle>
                    <div className="flex items-center mb-4">
                        <Avatar className="h-10 w-10 mr-3">
                            <AvatarImage src={post.authorAvatar} alt={post.author} />
                            <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="text-sm font-semibold">{post.author}</p>
                            <p className="text-xs text-gray-500">{post.createdAt}</p>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="prose lg:prose-xl mb-8 max-w-none">
                        {post.content}
                    </div>
                    <div className="border-t pt-8">
                        <h3 className="text-xl font-semibold mb-4">댓글</h3>
                        {comments.map((comment) => (
                            <div key={comment.id} className="mb-6">
                                <p className="text-sm font-semibold">{comment.author}</p>
                                <p className="text-xs text-gray-500">{comment.createdAt}</p>
                                <p className="mt-2">{comment.content}</p>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-end gap-4 mt-8">
                        <Button variant="outline" onClick={() => navigate('/posts')}>
                            목록으로 돌아가기
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
