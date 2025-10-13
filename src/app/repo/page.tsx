import React from 'react'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import MessageBubble from '@/components/repoUi/MessageBubble';
import { getRepoData } from '../action/action';
import AddRepoButton from '@/components/repoUi/AddRepoButton';

const repoTestData = [
    {
        id: 1,
        title: "名古屋リアミ 1部",
        username: "admin",
        category: 'リアミ',
        conversationId: "001",
        date: "09/27"
    },
    {
        id: 2,
        title: "名古屋リアミ 2部",
        username: "admin",
        category: 'リアミ',
        conversationId: "002",
        date: "09/27"
    },
    {
        id: 3,
        title: "名古屋リアミ 3部",
        username: "admin",
        category: "リアミ",
        conversationId: "003",
        date: "09/27",
    },
]

const page = async () => {
    const repoData = await getRepoData();

    return (
        <div className='flex-Center flex-col   m-4 p-4 bg-white shadow-xl'>
            <h1>Repo Page</h1>
            <AddRepoButton/>
            <div className='w-full'>
                <div className='grid grid-cols-3 gap-4'>
                    {repoTestData.map((repo) => (
                        <div key={repo.conversationId} className='w-full border-2 rounded-xl p-2 font-light text-sm bg-white '>
                            <div className='flex-Between text-xs'>
                                <h1 className=''>{repo.title}</h1>
                                <div>{repo.date}<StarBorderIcon fontSize='small' /></div>
                            </div>
                            <div className='flex-Between'>
                                <div>
                                    <div>{repo.username}</div>
                                    <div>#{repo.category}</div>
                                </div>
                                <Dialog>
                                    <DialogTrigger><KeyboardArrowRightIcon fontSize='large' /></DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>{repo.title}</DialogTitle>
                                            {/* レポ表示 */}
                                            <MessageBubble
                                                sender='me'
                                                text='やっほー'
                                            />
                                            <MessageBubble
                                                sender='other'
                                                text='やっほー'
                                            />
                                            <MessageBubble
                                                sender='other'
                                                text='バイバイ'
                                            />
                                            <MessageBubble
                                                sender='me'
                                                text='バイバイ'
                                            />
                                        </DialogHeader>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default page