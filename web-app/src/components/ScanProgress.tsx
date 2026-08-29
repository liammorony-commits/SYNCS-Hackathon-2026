import React from 'react'

export default function ScanProgress({ progress }:{ progress:number }){
  return (
    <div style={{display:'flex',flexDirection:'column',alignItems:'center',margin:12}}>
      <div style={{width:120,height:120,borderRadius:60,background:'var(--surface)',border:'6px solid rgba(56,189,248,0.25)',display:'flex',alignItems:'center',justifyContent:'center'}}>
        <div style={{color:'var(--accent)',fontWeight:700,fontSize:20}}>{progress}%</div>
      </div>
      <div style={{color:'var(--muted)',marginTop:8}}>Scanning…</div>
    </div>
  )
}
