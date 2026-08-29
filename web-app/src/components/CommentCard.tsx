import React from 'react'

export type Comment = { id:string; name:string; text:string; time:string; phone:string }

export default function CommentCard({ comment, onClick }:{ comment:Comment; onClick?:(c:Comment)=>void }){
  return (
    <div className="card" onClick={()=>onClick?.(comment)}>
      <div style={{color:'#e5e7eb',fontWeight:600}}>{comment.name}</div>
      <div style={{color:'var(--muted)',marginTop:4}}>{comment.text}</div>
      <div style={{color:'#6b7280',fontSize:12,marginTop:6}}>{comment.time} · Phone: {comment.phone}</div>
    </div>
  )
}
