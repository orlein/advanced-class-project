import BlockUsersSetting from '@/pages/settings/BlockUsersSetting';
import CookieSetting from '@/pages/settings/CookieSetting';
import CustomizationSetting from '@/pages/settings/CustomizationSetting';
import NotificationSetting from '@/pages/settings/NotificationSetting';
import PrivateAccountSetting from '@/pages/settings/PrivateAccountSetting';
import ThemeSetting from '@/pages/settings/ThemeSetting';

export const settingRouter = [
  { path: 'settings/notifications', element: <NotificationSetting /> },
  { path: 'settings/appearances', element: <ThemeSetting /> },
  { path: 'settings/customization', element: <CustomizationSetting /> },
  { path: 'settings/cookie', element: <CookieSetting /> },
  { path: 'settings/block-users', element: <BlockUsersSetting /> },
  { path: 'settings/private-account', element: <PrivateAccountSetting /> },
];
