import React from 'react'

export default function HistoryPanel({ items, expanded }:{ items:{id:string;year:number;label:string}[]; expanded:boolean }){
  return (
    <div className="history-panel" style={{height: expanded?180:80,transition:'height .25s'}}>
      <div style={{display:'flex',justifyContent:'space-between',padding:12,borderBottom:'1px solid #1f2937'}}>
        <div style={{color:'#e5e7eb',fontWeight:700}}>History Timeline</div>
      </div>
      <div>
        {items.map(i=> (
          <div key={i.id} style={{display:'flex',alignItems:'center',padding:'6px 12px'}}>
            <div style={{width:60,color:'var(--accent)',fontWeight:600}}>{i.year}</div>
            <div style={{color:'#e5e7eb'}}>{i.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
