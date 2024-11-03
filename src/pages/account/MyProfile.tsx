import * as React from 'react';
import {
    Card,
    CardContent,
    CardHeader,
} from '@/components/ui/card.tsx';
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import {Avatar} from '@/components/ui/avatar.tsx';
import {PencilIcon} from 'lucide-react';
import {Button} from '@/components/ui/button.tsx';
import {useState} from 'react';
import {z} from 'zod';
import {Input} from "@/components/ui/input.tsx";

export default function MyProfile() {
    const [editingField, setEditingField] = useState<string | null>(null);
    const emailSchema = z.string().email({message: '유효한 이메일 주소를 입력해주세요.'});

    const [formData, setFormData] = useState<{
        avatar: string;
        username: string;
        email: string;
        birthday: string;
        location: string;
        language: string;
        bio: string;
        externalUrl: string;
        interests: string;
    }>({
        avatar: '/path/to/profile.jpg',
        username: '이름',
        email: '이메일@example.com',
        birthday: '1990-01-01',
        location: '서울특별시',
        language: '한국어',
        bio: 'Always learning and exploring new technologies.',
        externalUrl: 'https://example.com',
        interests: '웹 개발, 프론트엔드 개발, 운동',
    });
    const [, setErrors] = useState<{ [key: string]: string }>({});

    const handleInputChange = (field: string, value: string) => {
        setFormData({...formData, [field]: value});

        // 유효성 검사
        if (field === 'email') {
            try {
                emailSchema.parse(value);
                setErrors((prev) => ({...prev, email: ''}));
            } catch (e) {
                if (e instanceof z.ZodError) {
                    setErrors((prev) => ({...prev, email: e.errors[0].message}));
                }
            }
        }
    };

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFormData({
                ...formData,
                avatar: URL.createObjectURL(e.target.files[0]),
            });
            setEditingField(null);
        }
    };

    return (
        <div className='min-h-screen px-8 py-12'>
            <Card className='w-full max-w-5xl mx-auto shadow-lg p-8 '>
                <CardHeader className='flex flex-row items-start justify-between py-6 flex-wrap'>
                    <div className='flex-1 pr-8'>
                        <h2 className='text-2xl font-bold mb-4'>자기소개</h2>
                        {editingField === 'bio' ? (
                            <Input
                                type='text'
                                value={formData.bio}
                                onChange={(e) => handleInputChange('bio', e.target.value)}
                                className='w-full border rounded-md p-3'
                            />
                        ) : (
                            <p>{formData.bio}</p>
                        )}
                        <button
                            className='p-2 rounded-full transition mt-4'
                            onClick={() => setEditingField(editingField === 'bio' ? null : 'bio')}
                        >
                            <PencilIcon className='h-6 w-6'/>
                        </button>
                    </div>
                    <div className='relative'>
                        <Avatar className='w-40 h-40 mb-6 rounded-full border-4'/>
                        <div className='absolute bottom-0 right-0 p-2 rounded-full shadow-md cursor-pointer'>
                            <label htmlFor='avatar-input'>
                                <PencilIcon className='h-6 w-6'/>
                            </label>
                            <Input
                                id='avatar-input'
                                type='file'
                                accept='image/*'
                                onChange={handleAvatarChange}
                                className='hidden'
                            />
                        </div>
                    </div>
                </CardHeader>
                <CardContent className='w-full p-8 grid grid-cols-1 md:grid-cols-2 gap-8'>
                    {[
                        {field: 'username', label: '사용자 이름', type: 'text'},
                        {field: 'email', label: '이메일', type: 'text'},
                        {field: 'birthday', label: '생일', type: 'text'},
                        {field: 'externalUrl', label: '외부 URL', type: 'text'},
                        {field: 'interests', label: '관심사', type: 'text'},
                    ].map(({field, label, type}) => (
                        <div key={field} className='flex items-center justify-between'>
                            <div className='flex-1'>
                                <h2 className='text-xl font-medium mb-2'>{label}</h2>
                                {editingField === field ? (
                                    <Input
                                        type={type}
                                        value={formData[field as keyof typeof formData]}
                                        onChange={(e) => handleInputChange(field as keyof typeof formData, e.target.value)}
                                        className='w-full border rounded-md p-3'
                                    />
                                ) : (
                                    <p>{formData[field as keyof typeof formData]}</p>
                                )}
                            </div>
                            <button
                                className='p-2 rounded-full transition'
                                onClick={() =>
                                    setEditingField(editingField === field ? null : field)
                                }
                            >
                                <PencilIcon className='h-6 w-6'/>
                            </button>
                        </div>
                    ))}
                    <div className='flex items-center justify-between'>
                        <div className='flex-1'>
                            <h2 className='text-xl font-medium mb-2'>지역</h2>
                            {editingField === 'location' ? (
                                <Select
                                    value={formData.location}
                                    onValueChange={(value) => handleInputChange('location', value)}
                                >
                                    <SelectTrigger className='w-full border rounded-md p-3'>
                                        <SelectValue placeholder="지역을 선택하세요"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        {["서울특별시", "부산광역시", "대구광역시", "인천광역시", "광주광역시", "대전광역시", "울산광역시", "세종특별자치시", "경기도", "강원도", "충청북도", "충청남도", "전라북도", "전라남도", "경상북도", "경상남도", "제주특별자치도",].map((city) => (
                                            <SelectItem key={city} value={city}>
                                                {city}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            ) : (
                                <p>{formData.location}</p>
                            )}
                        </div>
                        <button
                            className='p-2 rounded-full transition'
                            onClick={() =>
                                setEditingField(editingField === 'location' ? null : 'location')
                            }
                        >
                            <PencilIcon className='h-6 w-6 '/>
                        </button>
                    </div>
                    <div className='flex items-center justify-between'>
                        <div className='flex-1'>
                            <h2 className='text-xl font-medium mb-2'>주 언어</h2>
                            {editingField === 'language' ? (
                                <Select
                                    value={formData.language}
                                    onValueChange={(value) => handleInputChange('language', value)}
                                >
                                    <SelectTrigger className='w-full border rounded-md p-3'>
                                        <SelectValue placeholder="언어를 선택하세요"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        {['한국어', '영어', '일본어', '중국어', '스페인어', '프랑스어', '독일어', '이탈리아어', '러시아어', '아랍어', '힌디어', '포르투갈어',].map((language) => (
                                            <SelectItem key={language} value={language}>
                                                {language}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            ) : (
                                <p>{formData.language}</p>
                            )}
                        </div>
                        <button
                            className='p-2 rounded-full transition'
                            onClick={() =>
                                setEditingField(editingField === 'language' ? null : 'language')
                            }
                        >
                            <PencilIcon className='h-6 w-6'/>
                        </button>
                    </div>
                </CardContent>
                <div className='flex justify-center mt-8'>
                    <Button
                        onClick={() => setEditingField(null)}
                        className='font-semibold py-3 px-8 rounded-md transition'
                    >
                        모든 변경 사항 저장
                    </Button>
                </div>
            </Card>
        </div>
    );
}
