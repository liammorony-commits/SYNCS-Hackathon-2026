import React, { useState, useEffect } from 'react'
import HologramCard, { HologramEvent } from './components/HologramCard'
import CommentCard, { Comment } from './components/CommentCard'
import MarkerDot, { Marker } from './components/MarkerDot'
import HistoryPanel from './components/HistoryPanel'
import ScanProgress from './components/ScanProgress'

const hologramEvents: HologramEvent[] = [
  { id: '1', year: 1886, title: 'A Wedding in the Quadrangle', description: 'A beautiful ceremony was held in the Great Hall followed by celebrations here.', details: 'Full details' },
  { id: '2', year: 1920, title: 'Graduation Day', description: 'Generations of students have celebrated their achievements here.', details: 'Full details' },
  { id: '3', year: 1854, title: 'The Foundation', description: 'Construction of the main building begins.', details: 'Full details' },
]

const historyTimeline = [
  { id: 'h1', year: 1886, label: 'A Wedding in the Quadrangle' },
  { id: 'h2', year: 1920, label: 'Graduation Day' },
  { id: 'h3', year: 1950, label: 'Post-War Celebrations' },
  { id: 'h4', year: 2000, label: 'A New Millennium' },
  { id: 'h5', year: 2026, label: 'Your Story Continues' },
]

const initialComments: Comment[] = [
  { id: 'c1', name: 'Isabella R.', text: 'I proposed here 💍', time: '18m ago', phone: '+61 4XX XXX XXX' },
  { id: 'c2', name: 'James M.', text: 'Graduated today 🎓', time: '42m ago', phone: '+61 4XX XXX XXX' },
]

const buildingMarkers: Marker[] = [
  { id: 'm1', name: 'Quadrangle – Great Hall', status: 'Scannable', description: 'Central ceremonial hall.' },
  { id: 'm2', name: 'Quadrangle – Lawn', status: 'Scannable', description: 'Open green space.' },
  { id: 'm3', name: 'Clock Tower', status: 'Nearby', description: 'Iconic landmark.' },
]

export default function App(){
  const [activeTab,setActiveTab]=useState<'PAST'|'PRESENT'>('PAST')
  const [screen,setScreen]=useState<'HOME'|'SCAN'|'SETTINGS'>('HOME')
  const [isScanning,setIsScanning]=useState(false)
  const [progress,setProgress]=useState(0)
  const [scanComplete,setScanComplete]=useState(false)
  const [historyOpen,setHistoryOpen]=useState(false)
  const [comments,setComments]=useState<Comment[]>(initialComments)
  const [modal,setModal]=useState<React.ReactNode|null>(null)

  useEffect(()=>{
    if(!isScanning) return
    setProgress(0)
    const steps=[20,40,80,100]
    let i=0
    const t=setInterval(()=>{
      setProgress(steps[i])
      i++
      if(i===steps.length){
        clearInterval(t)
        setIsScanning(false)
        setScanComplete(true)
        setScreen('SCAN')
      }
    },500)
    return ()=>clearInterval(t)
  },[isScanning])

  const addComment=(name:string,text:string,phone:string)=>{
    if(!name||!text||!phone) return
    const c:Comment={id:`c${comments.length+1}`,name,text,time:'Just now',phone}
    setComments([c,...comments])
  }

  return (
    <div className="app">
      <div className="top-tabs">
        <div className={`tab ${activeTab==='PRESENT'?'active':''}`} onClick={()=>setActiveTab('PRESENT')}>PRESENT</div>
        <div className={`tab ${activeTab==='PAST'?'active':''}`} onClick={()=>setActiveTab('PAST')}>PAST</div>
      </div>
      <div className="content">
        {screen==='HOME' && (
          <div>
            <h3 style={{color:'#e5e7eb'}}>Historical Building Markers</h3>
            <div className="marker-map">
              {buildingMarkers.map((m,i)=> (
                <MarkerDot key={m.id} style={i===0?{top:30,left:40}:{i===1?{top:80,left:120}:{top:20,right:40}}} onClick={()=>setModal(<div className="modal"><div className="panel"><h3 style={{color:'#e5e7eb'}}>{m.name}</h3><div style={{color:'var(--accent)'}}>Status: {m.status}</div><p style={{color:'var(--muted)'}}>{m.description}</p><div style={{textAlign:'right'}}><button onClick={()=>setModal(null)}>Close</button></div></div></div>)} />
              ))}
            </div>
            <p style={{color:'var(--muted)'}}>Tap a marker to view building info.</p>
            <div style={{marginTop:12}}>
              {hologramEvents.map(ev=> <HologramCard key={ev.id} event={ev} onClick={(e)=>setModal(<div className="modal"><div className="panel"><h3 style={{color:'#e5e7eb'}}>{e.title}</h3><div style={{color:'var(--accent)'}}>{e.year}</div><p style={{color:'var(--muted)'}}>{e.details}</p><div style={{textAlign:'right'}}><button onClick={()=>setModal(null)}>Close</button></div></div></div>)} />)}
            </div>
          </div>
        )}

        {screen==='SCAN' && (
          <div>
            <h3 style={{color:'#e5e7eb'}}>Scanning & Live Overlay</h3>
            <div style={{padding:12,background:'rgba(15,23,42,0.9)',border:'1px solid #1f2937',borderRadius:12}}>
              {isScanning && <div><div style={{color:'#e5e7eb',fontWeight:600}}>Scanning the Quadrangle…</div><div style={{color:'var(--muted)'}}>Progress: {progress}%</div></div>}
              {!isScanning && !scanComplete && <div style={{color:'#e5e7eb'}}>Tap Scan below to begin recognition.</div>}
              {scanComplete && <div style={{color:'#e5e7eb'}}>Location recognised — holograms and summaries will appear.</div>}
            </div>
            <div style={{height:20}} />
            <div style={{background:'var(--surface)',height:180,border:'1px solid #1f2937',borderRadius:12,display:'flex',alignItems:'center',justifyContent:'center',color:'var(--muted)'}}>Camera placeholder</div>
          </div>
        )}

        {screen==='SETTINGS' && (
          <div>
            <h3 style={{color:'#e5e7eb'}}>Settings</h3>
            <div style={{padding:12,background:'var(--surface)',border:'1px solid #1f2937',borderRadius:10,color:'var(--muted)'}}>Placeholder settings</div>
          </div>
        )}

        {activeTab==='PAST' && screen!=='SCAN' && (
          <div style={{marginTop:12}}>
            <HistoryPanel items={historyTimeline} expanded={historyOpen} />
            <div style={{marginTop:12,padding:12,background:'rgba(15,23,42,0.9)',borderRadius:12,border:'1px solid rgba(56,189,248,0.5)'}}>
              <div style={{color:'var(--accent)',fontWeight:700}}>AI Historical Summary (Placeholder)</div>
              <div style={{color:'var(--muted)'}}>Once the camera recognises the Quadrangle, Taff's AI will generate a live summary here.</div>
            </div>
          </div>
        )}

        {activeTab==='PRESENT' && screen!=='SCAN' && (
          <div>
            <div style={{marginTop:12}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <div style={{color:'#e5e7eb',fontWeight:700}}>Present Moments – Last Hour</div>
                <div style={{color:'var(--accent)',cursor:'pointer'}}>Show</div>
              </div>
              <div style={{marginTop:8}}>
                {comments.map(c=> <CommentCard key={c.id} comment={c} onClick={co=>setModal(<div className='modal'><div className='panel'><h3 style={{color:'#e5e7eb'}}>{co.name}</h3><div style={{color:'var(--muted)'}}>{co.text}</div><div style={{color:'var(--muted)'}}>Phone: {co.phone}</div><div style={{textAlign:'right'}}><button onClick={()=>setModal(null)}>Close</button></div></div></div>)} />)}
              </div>
              <div style={{marginTop:12,padding:10,background:'#020617',borderRadius:12,border:'1px solid #1f2937'}}>
                <h4 style={{color:'#e5e7eb'}}>Add New Moment</h4>
                <AddCommentForm onPost={addComment} />
              </div>
            </div>
          </div>
        )}
      </div>

      <div style={{flexShrink:0}} className="bottom-bar">
        <div style={{cursor:'pointer'}} onClick={()=>setScreen('HOME')}>Home</div>
        <div>
          <button className={`scan-btn ${scanComplete?'live':''}`} onClick={()=>{ if(!scanComplete && !isScanning) setIsScanning(true) }}>{scanComplete?'Live':isScanning?'Scanning…':'Scan'}</button>
        </div>
        <div style={{cursor:'pointer'}} onClick={()=>setScreen('SETTINGS')}>Settings</div>
      </div>

      {modal}
    </div>
  )
}

function AddCommentForm({ onPost }:{ onPost:(name:string,text:string,phone:string)=>void }){
  const [name,setName]=useState('')
  const [text,setText]=useState('')
  const [phone,setPhone]=useState('')
  return (
    <div>
      <input className="input" placeholder="Your name" value={name} onChange={e=>setName(e.target.value)} />
      <input className="input" placeholder="What happened here?" value={text} onChange={e=>setText(e.target.value)} />
      <input className="input" placeholder="Your phone" value={phone} onChange={e=>setPhone(e.target.value)} />
      <div style={{display:'flex',justifyContent:'flex-end'}}><button onClick={()=>{onPost(name,text,phone);setName('');setText('');setPhone('')}}>Post Moment</button></div>
    </div>
  )
}
