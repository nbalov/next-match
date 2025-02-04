import React from 'react'
import ListTabs from './ListTabs'
import {fetchCurrentUserLikeIds, fetchLikedMembers} from '../actions/likeActions'

export default async function ListsPage({searchParams}: {searchParams: {type: string}}) {

  const likeIds = await fetchCurrentUserLikeIds();
  const members = await fetchLikedMembers(searchParams.type);

  return (
    <div>
      <ListTabs members={members} likeIds={likeIds} />
    </div>
  )
}
