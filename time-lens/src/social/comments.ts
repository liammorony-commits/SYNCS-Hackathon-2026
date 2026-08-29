import { supabase } from '../services/supabase'

export type Comment = {
  id: number
  name: string
  message: string
  location: string
  created_at: string
}

export async function addComment(
  name: string,
  message: string,
  location: string
) {
  const { data, error } = await supabase
    .from('Comments')
    .insert([
      {
        name,
        message,
        location,
      },
    ])
    .select()

  if (error) {
    console.error('Error adding comment:', error)
    throw error
  }

  return data
}

export async function getRecentComments(location: string) {
  const twoHoursAgo = new Date(
    Date.now() - 2 * 60 * 60 * 1000
  ).toISOString()

  const { data, error } = await supabase
    .from('Comments')
    .select('*')
    .eq('location', location)
    .gte('created_at', twoHoursAgo)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error loading comments:', error)
    throw error
  }

  return data
}