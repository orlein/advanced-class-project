import { ReactNode } from 'react';

interface NotificationSectionProps {
    title: string;
    children: ReactNode;
}

export function NotificationSection({ title, children }: NotificationSectionProps) {
    return (
        <div>
            <h3 className="mb-4 text-lg font-medium">{title}</h3>
            <div className="space-y-4">{children}</div>
        </div>
    );
}
