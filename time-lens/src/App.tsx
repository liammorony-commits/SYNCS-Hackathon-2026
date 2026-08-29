import { useState } from 'react'
import { addComment, getRecentComments } from './social/comments'

function App() {
  const [result, setResult] = useState('Not tested yet')

  async function testBackend() {
    try {
      setResult('Testing...')

      await addComment(
        'Test User',
        'This comment came from our React app!',
        'quadrangle'
      )

      const comments = await getRecentComments('quadrangle')

      console.log('Comments from Supabase:', comments)

      setResult(`Success! Found ${comments?.length ?? 0} recent comments.`)
    } catch (error) {
      console.error(error)
      setResult('Something went wrong — check the browser console.')
    }
  }

  return (
    <div style={{ padding: '40px' }}>
      <h1>Time Lens Backend Test</h1>

      <button onClick={testBackend}>
        Test Supabase
      </button>

      <p>{result}</p>
    </div>
  )
}

export default App