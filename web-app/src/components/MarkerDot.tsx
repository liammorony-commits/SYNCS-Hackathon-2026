import React from 'react'

export type Marker = { id:string; name:string; status:'Scannable'|'Nearby'|'Unavailable'; description:string }

export default function MarkerDot({ style, onClick }:{ style?:React.CSSProperties; onClick?:()=>void }){
  return (
    <div className="marker-dot" style={style} onClick={onClick}><div className="inner"/></div>
  )
}
