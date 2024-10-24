import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card.tsx';
import { Avatar } from '@/components/ui/avatar.tsx';
import { PencilIcon } from 'lucide-react';
import { Button } from '@/components/ui/button.tsx';
import React, { useState } from 'react';

export default function MyProfile() {
  const [editingField, setEditingField] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    avatar: '/path/to/profile.jpg',
    username: '이름',
    email: '이메일@example.com',
    password: '********',
    birthday: '1990-01-01',
    location: '서울, 한국',
    language: '한국어',
    nationality: '한국',
    bio: 'Always learning and exploring new technologies.',
    externalUrl: 'https://example.com',
    interests: '웹 개발, 프론트엔드 개발, 운동',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
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
    <div className='flex min-h-screen'>
      <Card className='w-full shadow-md'>
        <CardHeader className='flex flex-col items-center py-8'>
          <div className='relative'>
            <Avatar className='w-32 h-32 mb-6' />
            <div className='absolute bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2 p-2 rounded-full shadow-md cursor-pointer'>
              <label htmlFor='avatar-input'>
                <PencilIcon className='h-6 w-6' />
              </label>
              <input
                id='avatar-input'
                type='file'
                accept='image/*'
                onChange={handleAvatarChange}
                className='hidden'
              />
            </div>
          </div>
          {editingField === 'username' ? (
            <input
              type='text'
              value={formData.username}
              onChange={(e) => handleInputChange('username', e.target.value)}
              className='text-3xl font-bold mb-4'
            />
          ) : (
            <CardTitle className='text-3xl font-bold'>
              {formData.username}
            </CardTitle>
          )}
        </CardHeader>
        <CardContent className='w-full p-8'>
          <div className='mb-6 flex items-center justify-between'>
            <div>
              <h2 className='text-lg font-medium  mb-2'>사용자 이름</h2>
              {editingField === 'username' ? (
                <input
                  type='text'
                  value={formData.username}
                  onChange={(e) =>
                    handleInputChange('username', e.target.value)
                  }
                  className='w-full border rounded-md p-2'
                />
              ) : (
                <p className=''>{formData.username}</p>
              )}
            </div>
            <button
              className='p-2 rounded-full'
              onClick={() =>
                setEditingField(editingField === 'username' ? null : 'username')
              }
            >
              <PencilIcon className='h-6 w-6' />
            </button>
          </div>
          <div className='mb-6 flex items-center justify-between'>
            <div>
              <h2 className='text-lg font-medium mb-2'>이메일</h2>
              {editingField === 'email' ? (
                <input
                  type='text'
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className='w-full border rounded-md p-2'
                />
              ) : (
                <p className=''>{formData.email}</p>
              )}
            </div>
            <button
              className='p-2 rounded-full'
              onClick={() =>
                setEditingField(editingField === 'email' ? null : 'email')
              }
            >
              <PencilIcon className='h-6 w-6' />
            </button>
          </div>
          <div className='mb-6 flex items-center justify-between'>
            <div>
              <h2 className='text-lg font-medium mb-2'>비밀번호</h2>
              {editingField === 'password' ? (
                <input
                  type='text'
                  value={formData.password}
                  onChange={(e) =>
                    handleInputChange('password', e.target.value)
                  }
                  className='w-full border rounded-md p-2'
                />
              ) : (
                <p className=''>{formData.password}</p>
              )}
            </div>
            <button
              className='p-2 rounded-full'
              onClick={() =>
                setEditingField(editingField === 'password' ? null : 'password')
              }
            >
              <PencilIcon className='h-6 w-6' />
            </button>
          </div>
          <div className='mb-6 flex items-center justify-between'>
            <div>
              <h2 className='text-lg font-medium mb-2'>생일</h2>
              {editingField === 'birthday' ? (
                <input
                  type='text'
                  value={formData.birthday}
                  onChange={(e) =>
                    handleInputChange('birthday', e.target.value)
                  }
                  className='w-full border rounded-md p-2'
                />
              ) : (
                <p className=''>{formData.birthday}</p>
              )}
            </div>
            <button
              className='p-2 rounded-full'
              onClick={() =>
                setEditingField(editingField === 'birthday' ? null : 'birthday')
              }
            >
              <PencilIcon className='h-6 w-6' />
            </button>
          </div>
          <div className='mb-6 flex items-center justify-between'>
            <div>
              <h2 className='text-lg font-medium mb-2'>지역</h2>
              {editingField === 'location' ? (
                <input
                  type='text'
                  value={formData.location}
                  onChange={(e) =>
                    handleInputChange('location', e.target.value)
                  }
                  className='w-full border rounded-md p-2'
                />
              ) : (
                <p className='text'>{formData.location}</p>
              )}
            </div>
            <button
              className='p-2 rounded-full'
              onClick={() =>
                setEditingField(editingField === 'location' ? null : 'location')
              }
            >
              <PencilIcon className='h-6 w-6' />
            </button>
          </div>
          <div className='mb-6 flex items-center justify-between'>
            <div>
              <h2 className='text-lg font-medium mb-2'>주 언어</h2>
              {editingField === 'language' ? (
                <input
                  type='text'
                  value={formData.language}
                  onChange={(e) =>
                    handleInputChange('language', e.target.value)
                  }
                  className='w-full border rounded-md p-2'
                />
              ) : (
                <p className=''>{formData.language}</p>
              )}
            </div>
            <button
              className='p-2 rounded-full'
              onClick={() =>
                setEditingField(editingField === 'language' ? null : 'language')
              }
            >
              <PencilIcon className='h-6 w-6' />
            </button>
          </div>
          <div className='mb-6 flex items-center justify-between'>
            <div>
              <h2 className='text-lg font-medium mb-2'>국적</h2>
              {editingField === 'nationality' ? (
                <input
                  type='text'
                  value={formData.nationality}
                  onChange={(e) =>
                    handleInputChange('nationality', e.target.value)
                  }
                  className='w-full border rounded-md p-2'
                />
              ) : (
                <p className=''>{formData.nationality}</p>
              )}
            </div>
            <button
              className='p-2 rounded-full'
              onClick={() =>
                setEditingField(
                  editingField === 'nationality' ? null : 'nationality'
                )
              }
            >
              <PencilIcon className='h-6 w-6' />
            </button>
          </div>
          <div className='mb-6 flex items-center justify-between'>
            <div>
              <h2 className='text-lg font-medium mb-2'>자기소개</h2>
              {editingField === 'bio' ? (
                <input
                  type='text'
                  value={formData.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  className='w-full border rounded-md p-2'
                />
              ) : (
                <p className=''>{formData.bio}</p>
              )}
            </div>
            <button
              className='p-2 rounded-full'
              onClick={() =>
                setEditingField(editingField === 'bio' ? null : 'bio')
              }
            >
              <PencilIcon className='h-6 w-6' />
            </button>
          </div>
          <div className='mb-6 flex items-center justify-between'>
            <div>
              <h2 className='text-lg font-medium mb-2'>외부 URL</h2>
              {editingField === 'externalUrl' ? (
                <input
                  type='text'
                  value={formData.externalUrl}
                  onChange={(e) =>
                    handleInputChange('externalUrl', e.target.value)
                  }
                  className='w-full border rounded-md p-2'
                />
              ) : (
                <p className=''>{formData.externalUrl}</p>
              )}
            </div>
            <button
              className='p-2 rounded-full'
              onClick={() =>
                setEditingField(
                  editingField === 'externalUrl' ? null : 'externalUrl'
                )
              }
            >
              <PencilIcon className='h-6 w-6' />
            </button>
          </div>
          <div className='mb-6 flex items-center justify-between'>
            <div>
              <h2 className='text-lg font-medium mb-2'>관심사</h2>
              {editingField === 'interests' ? (
                <input
                  type='text'
                  value={formData.interests}
                  onChange={(e) =>
                    handleInputChange('interests', e.target.value)
                  }
                  className='w-full border rounded-md p-2'
                />
              ) : (
                <p className=''>{formData.interests}</p>
              )}
            </div>
            <button
              className='p-2 rounded-full'
              onClick={() =>
                setEditingField(
                  editingField === 'interests' ? null : 'interests'
                )
              }
            >
              <PencilIcon className='h-6 w-6' />
            </button>
          </div>
          <div className='flex justify-center'>
            <Button
              onClick={() => setEditingField(null)}
              className='font-semibold py-3 px-6 rounded-md'
            >
              모든 변경 사항 저장
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
