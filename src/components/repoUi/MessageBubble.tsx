import React from 'react'
import PersonIcon from '@mui/icons-material/Person';

interface MessageBubbleProps {
    sender: 'me' | 'other';
    text: string;
}

const MessageBubble = ({ sender, text }: MessageBubbleProps) => {
    const isUser = sender === 'me';
    return (
        <div className={`flex items-center space-x-2  ${isUser ? 'justify-end' : ''}`}>
            {!isUser && <div className="flex-Center w-8 h-8 rounded-full border border-black"><PersonIcon /></div>}
            <div className="bg-blue-500 text-white p-2 rounded-lg max-w-xs">
                {text}
            </div>
            {isUser && <div className="flex-Center w-8 h-8 rounded-full border border-black"><PersonIcon /></div>}
        </div>
    )
}

export default MessageBubble