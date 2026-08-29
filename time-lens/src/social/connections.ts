import { supabase } from '../services/supabase'

export async function sendConnectionRequest(
  commentId: number,
  requesterName: string
) {
  const { error } = await supabase
    .from('connections')
    .insert([
      {
        comment_id: commentId,
        requester_name: requesterName,
      },
    ])

  if (error) {
    console.error('Error sending connection request:', error)
    throw error
  }

  return true
}