import React from 'react'

export type HologramEvent = { id:string; year:number; title:string; description:string; details:string }

export default function HologramCard({ event, onClick }:{ event:HologramEvent; onClick?:(e:HologramEvent)=>void }){
  return (
    <div className="card" onClick={()=>onClick?.(event)}>
      <div style={{color:'var(--accent)',fontWeight:700}}>{event.year}</div>
      <div style={{color:'#e5e7eb',fontWeight:700}}>{event.title}</div>
      <div style={{color:'var(--muted)'}}>{event.description}</div>
      <div style={{marginTop:8,display:'inline-block',padding:'4px 10px',border:'1px solid var(--accent)',borderRadius:999,color:'var(--accent)',fontWeight:600}}>View Event</div>
    </div>
  )
}
