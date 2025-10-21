import React from 'react'
import PersonIcon from '@mui/icons-material/Person';

interface MessageBubbleProps {
    sender: 'user' | 'artist';
    text: string;
}

const MessageBubble = ({ sender, text }: MessageBubbleProps) => {
    const isUser = sender === 'user';
    return (
        <div className={`flex items-center space-x-2  ${isUser ? 'justify-end' : ''}`}>
            {!isUser && <div className="flex-Center w-8 h-8 rounded-full border border-pink-400 bg-pink-400 text-white"><PersonIcon /></div>}
            <div className="bg-blue-500 text-white p-2 rounded-lg max-w-xs">
                {text}
            </div>
            {isUser && <div className="flex-Center w-8 h-8 rounded-full border border-black"><PersonIcon /></div>}
        </div>
    )
}

export default MessageBubble