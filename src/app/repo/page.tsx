import React from 'react'
import { getRepoData } from '../action/action';
import RepoList from '@/components/repoUi/RepoList';

const page = async ({ searchParams }: { searchParams: { sort: string } }) => {
    //const repoData = await getRepoList()
    const { sort } = await searchParams
    const sortValue = sort || 'date_desc'
    //const sortValue = searchParams.sort || 'date_desc';
    const repoData = await getRepoData(sortValue)

    return (
        <div className='flex-Center flex-col m-4 p-2 bg-white shadow-xl'>
            <h1>Repo Page</h1>
            <div className='w-full'>
                <RepoList repoData={repoData} />
            </div>
        </div>
    )
}

export default page