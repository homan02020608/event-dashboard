import React from 'react'
import { getRepoData } from '../action/action';
import RepoList from '@/components/repoUi/RepoList';
import { GetRepoParams } from '@/types/type';

const page = async ({ searchParams }: { searchParams: GetRepoParams }) => {
    //const repoData = await getRepoList()
    const { sort, repoType, artistName, isPublic } = await searchParams
    const sortValue = sort || 'date_desc'
    //const sortValue = searchParams.sort || 'date_desc';
    const repoData = await getRepoData({
        sort: sortValue,
        repoType: repoType,
        artistName: artistName,
        isPublic: isPublic,
    })

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