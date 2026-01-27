import React from 'react'
import { getRepoList } from '../action/action';
import RepoList from '@/components/repoUi/RepoList';

const page = async () => {
    const repoData = await getRepoList()

    return (
        <div className='flex-Center flex-col m-4 p-2 bg-white shadow-xl'>
            <h1>Repo Page</h1>
            <div className='w-full'>
                <RepoList repoData={repoData}/>
            </div>
        </div>
    )
}

export default page