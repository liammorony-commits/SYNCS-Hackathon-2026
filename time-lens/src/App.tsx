import { useEffect, useRef, useState } from 'react'
import type {
  ChangeEvent,
  PointerEvent as ReactPointerEvent,
} from 'react'

import './App.css'

import { getRecentComments } from './social/comments'
import { sendConnectionRequest } from './social/connections'

type Comment = {
  id: number
  name?: string
  author?: string
  username?: string
  comment?: string
  content?: string
  text?: string
  created_at?: string
  likes?: number
}

type Building = {
  id: string
  name: string
  meta: string
  lat: number
  lng: number
  history: string
}

const BUILDINGS: Building[] = [
  {
    id: 'quadrangle',
    name: 'The Quadrangle',
    meta: 'University of Sydney · Camperdown',
    lat: -33.8860547,
    lng: 151.1888052,
    history:
      'The University of Sydney Quadrangle began in the 1850s with Edmund Blacket’s East Range and Great Hall. Over generations, the sandstone complex became the symbolic heart of the University.',
  },
  {
    id: 'sit_j12',
    name: 'School of IT (J12)',
    meta: 'University of Sydney · Camperdown',
    lat: -33.888221,
    lng: 151.194049,
    history:
      'The School of Computer Science is part of the University of Sydney’s modern teaching and research precinct.',
  },
  {
    id: 'newlaw',
    name: 'New Law Building (F10)',
    meta: 'University of Sydney · Camperdown',
    lat: -33.8887,
    lng: 151.1895,
    history:
      'The New Law Building provides teaching, research and collaborative spaces for Sydney Law School.',
  },
  {
    id: 'fisher',
    name: 'Fisher Library',
    meta: 'University of Sydney · Camperdown',
    lat: -33.8864494,
    lng: 151.1905904,
    history:
      'Fisher Library is one of the main libraries at the University of Sydney and a major centre for study and collections.',
  },
  {
    id: 'carslaw',
    name: 'Carslaw Building',
    meta: 'University of Sydney · Camperdown',
    lat: -33.8882312,
    lng: 151.1907681,
    history:
      'Carslaw is a major teaching building associated with mathematics and science.',
  },
]

function getDistanceInMeters(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) {
  const earthRadius = 6371e3
  const radians = Math.PI / 180

  const dLat = (lat2 - lat1) * radians
  const dLon = (lon2 - lon1) * radians

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * radians) *
      Math.cos(lat2 * radians) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2)

  const c =
    2 *
    Math.atan2(
      Math.sqrt(a),
      Math.sqrt(1 - a)
    )

  return earthRadius * c
}

function App() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [imageUrl, setImageUrl] = useState<string | null>(null)

  const [scanning, setScanning] = useState(false)
  const [identified, setIdentified] = useState(false)
  const [exploring, setExploring] = useState(false)

  const [detectedBuilding, setDetectedBuilding] =
    useState<Building | null>(null)

  const [locationError, setLocationError] = useState('')
  const [distanceAway, setDistanceAway] =
    useState<number | null>(null)

  const [gpsAccuracy, setGpsAccuracy] =
    useState<number | null>(null)

  const [storiesOpen, setStoriesOpen] = useState(false)
  const [comments, setComments] = useState<Comment[]>([])
  const [connectedId, setConnectedId] =
    useState<number | null>(null)

  const [likedIds, setLikedIds] = useState<number[]>([])

  const [showHologramInfo, setShowHologramInfo] =
    useState(false)

  // PANORAMA

  const panoramaRef = useRef<HTMLDivElement | null>(null)

  const dragStartX = useRef(0)
  const dragStartOffset = useRef(0)

  const [panoramaOffset, setPanoramaOffset] = useState(0)
  const [panoramaDragging, setPanoramaDragging] =
    useState(false)

  // ===================================================
  // GPS
  // ===================================================

  function findNearestBuilding(
    latitude: number,
    longitude: number
  ) {
    return BUILDINGS.map((building) => ({
      building,

      distance: getDistanceInMeters(
        latitude,
        longitude,
        building.lat,
        building.lng
      ),
    })).sort((a, b) => a.distance - b.distance)[0]
  }

  function scanLocation() {
    setScanning(true)
    setIdentified(false)
    setDetectedBuilding(null)

    setLocationError('')
    setDistanceAway(null)

    if (!navigator.geolocation) {
      setScanning(false)

      setLocationError(
        'Location services are not supported by this browser.'
      )

      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude
        const longitude = position.coords.longitude
        const accuracy = position.coords.accuracy

        const nearest = findNearestBuilding(
          latitude,
          longitude
        )

        setGpsAccuracy(accuracy)

        const MAX_DISTANCE = 500

        if (!nearest || nearest.distance > MAX_DISTANCE) {
          setScanning(false)

          setLocationError(
            'No supported University of Sydney landmark was found nearby.'
          )

          return
        }

        setDetectedBuilding(nearest.building)
        setDistanceAway(nearest.distance)

        setScanning(false)
        setIdentified(true)
      },

      (error) => {
        console.error('GPS error:', error)

        setScanning(false)

        if (error.code === error.PERMISSION_DENIED) {
          setLocationError(
            'Location permission was denied. Please allow location access and try again.'
          )
        } else {
          setLocationError(
            'We could not determine your location. Please try again.'
          )
        }
      },

      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    )
  }

  // ===================================================
  // OPTIONAL PHOTO
  // ===================================================

  function handleFileChange(
    event: ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0]

    if (!file) return

    if (imageUrl) {
      URL.revokeObjectURL(imageUrl)
    }

    setSelectedFile(file)
    setImageUrl(URL.createObjectURL(file))

    scanLocation()
  }

  // ===================================================
  // PANORAMA
  // ===================================================

  function getPanoramaMax() {
    const container = panoramaRef.current

    if (!container) return 0

    return container.clientWidth * 1.2
  }

  function clampPanorama(value: number) {
    return Math.max(
      0,
      Math.min(value, getPanoramaMax())
    )
  }

  function startPanoramaDrag(
    event: ReactPointerEvent<HTMLDivElement>
  ) {
    dragStartX.current = event.clientX
    dragStartOffset.current = panoramaOffset

    setPanoramaDragging(true)

    event.currentTarget.setPointerCapture(
      event.pointerId
    )
  }

  function movePanorama(
    event: ReactPointerEvent<HTMLDivElement>
  ) {
    if (!panoramaDragging) return

    const movement =
      event.clientX - dragStartX.current

    setPanoramaOffset(
      clampPanorama(
        dragStartOffset.current - movement
      )
    )
  }

  function endPanoramaDrag(
    event: ReactPointerEvent<HTMLDivElement>
  ) {
    setPanoramaDragging(false)

    if (
      event.currentTarget.hasPointerCapture(
        event.pointerId
      )
    ) {
      event.currentTarget.releasePointerCapture(
        event.pointerId
      )
    }
  }

  useEffect(() => {
    if (!exploring) return

    function centrePanorama() {
      setPanoramaOffset(
        getPanoramaMax() / 2
      )
    }

    const timer = window.setTimeout(
      centrePanorama,
      80
    )

    window.addEventListener(
      'resize',
      centrePanorama
    )

    return () => {
      window.clearTimeout(timer)

      window.removeEventListener(
        'resize',
        centrePanorama
      )
    }
  }, [exploring])

  // ===================================================
  // OPEN PLACE
  // ===================================================

  async function openExplore() {
    if (!detectedBuilding) return

    setExploring(true)

    try {
      const recentComments =
        await getRecentComments('quadrangle')

      const commentsWithLikes =
        (recentComments as Comment[]).map(
          (comment, index) => ({
            ...comment,

            likes:
              comment.likes ??
              Math.max(2, 15 - index * 4),
          })
        )

      setComments(commentsWithLikes)
    } catch (error) {
      console.error(
        'Could not load comments:',
        error
      )
    }
  }

  // ===================================================
  // LIKES
  // ===================================================

  function likeComment(commentId: number) {
    const alreadyLiked =
      likedIds.includes(commentId)

    setComments((currentComments) =>
      currentComments.map((comment) => {
        if (comment.id !== commentId) {
          return comment
        }

        return {
          ...comment,

          likes: Math.max(
            0,
            (comment.likes ?? 0) +
              (alreadyLiked ? -1 : 1)
          ),
        }
      })
    )

    setLikedIds((current) =>
      alreadyLiked
        ? current.filter((id) => id !== commentId)
        : [...current, commentId]
    )
  }

  // ===================================================
  // CONNECTION
  // ===================================================

  async function connect(commentId: number) {
    try {
      await sendConnectionRequest(
        commentId,
        'Time Lens User'
      )

      setConnectedId(commentId)
    } catch (error) {
      console.error(
        'Could not connect:',
        error
      )
    }
  }

  // ===================================================
  // RESET
  // ===================================================

  function resetScan() {
    if (imageUrl) {
      URL.revokeObjectURL(imageUrl)
    }

    setImageUrl(null)
    setSelectedFile(null)

    setScanning(false)
    setIdentified(false)
    setDetectedBuilding(null)

    setDistanceAway(null)
    setGpsAccuracy(null)

    setLocationError('')

    setExploring(false)
    setStoriesOpen(false)

    setConnectedId(null)
    setLikedIds([])

    setPanoramaOffset(0)
  }

  const sortedComments = [...comments].sort(
    (a, b) =>
      (b.likes ?? 0) - (a.likes ?? 0)
  )

  // ===================================================
  // EXPLORE SCREEN
  // ===================================================

  if (exploring && detectedBuilding) {
    const isQuadrangle =
      detectedBuilding.id === 'quadrangle'

    return (
      <main className="page-background">
        <div className="mobile-app">

          <nav className="top-bar">

            <button
              className="back-icon"
              onClick={() =>
                setExploring(false)
              }
            >
              ←
            </button>

            <span className="brand">
              TIME LENS
            </span>

            <button
              className="stories-top-button"
              onClick={() =>
                setStoriesOpen(true)
              }
            >
              Stories

              {comments.length > 0 && (
                <span className="stories-count">
                  {comments.length}
                </span>
              )}
            </button>

          </nav>

          <header className="location-header">

            <span className="location-eyebrow">
              UNIVERSITY OF SYDNEY
            </span>

            <h1>
              {detectedBuilding.name}
            </h1>

            <p>
              {detectedBuilding.meta}
            </p>

          </header>

          {isQuadrangle ? (
            <section className="ar-scene">

              {/* PANNABLE HISTORICAL IMAGE */}

              <div
                ref={panoramaRef}
                className={`past-panorama ${
                  panoramaDragging
                    ? 'dragging'
                    : ''
                }`}
                onPointerDown={
                  startPanoramaDrag
                }
                onPointerMove={
                  movePanorama
                }
                onPointerUp={
                  endPanoramaDrag
                }
                onPointerCancel={
                  endPanoramaDrag
                }
              >
                <img
                  src="/quadrangle-past-panorama.jpg"
                  alt="Historical Quadrangle"
                  draggable={false}
                  style={{
                    transform:
                      `translateX(-${panoramaOffset}px)`,
                  }}
                />
              </div>

              <div className="scene-gradient" />

              {/* TEAMMATE MOVING HOLOGRAM */}

              <button
                className="moving-hologram"
                onClick={() =>
                  setShowHologramInfo(
                    !showHologramInfo
                  )
                }
                aria-label="Edmund Blacket hologram"
              >

                <div className="walk-cycle" />

                <img
                  className="inspect-plan-state"
                  src="/assets/holograms/edmund-blacket/inspect-plan.png"
                  alt=""
                  draggable={false}
                />

                <div className="moving-hologram-base">
                  <span />
                  <span />
                  <span />
                </div>

              </button>

              {/* INFORMATION CARD */}

              {showHologramInfo && (
                <div className="hologram-card">

                  <span className="hologram-date">
                    c. 1857
                  </span>

                  <h2>
                    Edmund Blacket
                  </h2>

                  <p>
                    Architect of the University's
                    original Great Hall and East
                    Range, imagined inspecting the
                    sandstone construction.
                  </p>

                  <div className="hologram-line" />

                </div>
              )}

              <div className="pan-hint">
                <span>←</span>

                <p>
                  Drag to explore the past
                </p>

                <span>→</span>
              </div>

            </section>
          ) : (
            <section className="generic-location-view">

              <div className="location-pin">
                ◎
              </div>

              <p>
                LOCATION CONFIRMED
              </p>

              <h2>
                {detectedBuilding.name}
              </h2>

            </section>
          )}

          <section className="history-section">

            <p className="section-eyebrow">
              ABOUT THIS PLACE
            </p>

            <h2>
              A place shaped by generations.
            </h2>

            <p className="history-copy">
              {detectedBuilding.history}
            </p>

            {isQuadrangle && (
              <>
                <div className="timeline">

                  <div className="timeline-track" />

                  <div className="timeline-point selected">
                    <span className="timeline-circle" />
                    <strong>1850s</strong>
                    <small>Construction</small>
                  </div>

                  <div className="timeline-point">
                    <span className="timeline-circle" />
                    <strong>1859</strong>
                    <small>Great Hall</small>
                  </div>

                  <div className="timeline-point">
                    <span className="timeline-circle" />
                    <strong>1881</strong>
                    <small>Women admitted</small>
                  </div>

                  <div className="timeline-point">
                    <span className="timeline-circle" />
                    <strong>Today</strong>
                    <small>Living landmark</small>
                  </div>

                </div>

                <button
                  className="view-stories-button"
                  onClick={() =>
                    setStoriesOpen(true)
                  }
                >
                  View stories from here
                </button>
              </>
            )}

          </section>

          {/* COMMENTS */}

          <div
            className={`comments-backdrop ${
              storiesOpen
                ? 'backdrop-visible'
                : ''
            }`}
            onClick={() =>
              setStoriesOpen(false)
            }
          />

          <aside
            className={`comments-sheet ${
              storiesOpen
                ? 'comments-sheet-open'
                : ''
            }`}
          >

            <div className="sheet-handle" />

            <div className="comments-header">

              <div>
                <p>
                  LAST 2 HOURS
                </p>

                <h2>
                  Stories
                </h2>
              </div>

              <button
                className="close-comments"
                onClick={() =>
                  setStoriesOpen(false)
                }
              >
                ×
              </button>

            </div>

            <p className="comments-subtitle">
              See what this place means to
              people here right now.
            </p>

            <div className="comments-list">

              {sortedComments.length === 0 ? (
                <div className="empty-state">

                  <p>
                    No recent stories yet.
                  </p>

                  <span>
                    Be the first person to
                    share a memory.
                  </span>

                </div>
              ) : (
                sortedComments.map(
                  (comment, index) => {
                    const name =
                      comment.name ||
                      comment.author ||
                      comment.username ||
                      'Anonymous'

                    const story =
                      comment.comment ||
                      comment.content ||
                      comment.text ||
                      'Shared a memory from this place.'

                    const liked =
                      likedIds.includes(
                        comment.id
                      )

                    return (
                      <article
                        className="instagram-comment"
                        key={comment.id}
                      >

                        <div className="comment-avatar">
                          {name
                            .charAt(0)
                            .toUpperCase()}
                        </div>

                        <div className="comment-main">

                          {index === 0 &&
                            (comment.likes ?? 0) >
                              0 && (
                              <span className="top-comment">
                                TOP STORY
                              </span>
                            )}

                          <p className="comment-body">

                            <strong>
                              {name}
                            </strong>{' '}

                            {story}

                          </p>

                          <div className="comment-meta">

                            <span>
                              Recently
                            </span>

                            <span>
                              {comment.likes ?? 0}{' '}
                              {(comment.likes ?? 0) === 1
                                ? 'like'
                                : 'likes'}
                            </span>

                            <button
                              onClick={() =>
                                connect(
                                  comment.id
                                )
                              }
                              disabled={
                                connectedId ===
                                comment.id
                              }
                            >
                              {connectedId ===
                              comment.id
                                ? 'Requested'
                                : 'Connect'}
                            </button>

                          </div>

                        </div>

                        <button
                          className={`heart-button ${
                            liked
                              ? 'heart-liked'
                              : ''
                          }`}
                          onClick={() =>
                            likeComment(
                              comment.id
                            )
                          }
                        >
                          {liked ? '♥' : '♡'}
                        </button>

                      </article>
                    )
                  }
                )
              )}

            </div>

          </aside>

        </div>
      </main>
    )
  }

  // ===================================================
  // HOME / GPS
  // ===================================================

  const scanStarted =
    scanning ||
    identified ||
    Boolean(locationError)

  return (
    <main className="page-background">

      <div className="mobile-app landing-container">

        {!scanStarted ? (
          <section className="landing-screen">

            <p className="brand landing-brand">
              TIME LENS
            </p>

            <h1>
              Discover the stories hidden
              around you.
            </h1>

            <p className="landing-subtitle">
              Use your location to discover
              the history and stories of the
              place around you.
            </p>

            <div className="landing-buttons">

              <button
                className="primary-button"
                onClick={scanLocation}
              >
                ◎ Scan My Location
              </button>

              <label className="secondary-button">

                Upload Photo + Locate Me

                <input
                  type="file"
                  accept="image/*"
                  onChange={
                    handleFileChange
                  }
                  hidden
                />

              </label>

            </div>

          </section>
        ) : (
          <section className="scan-screen">

            <p className="brand scan-brand">
              TIME LENS
            </p>

            {scanning && (
              <>
                <header className="scan-heading">

                  <h1>
                    Finding your location...
                  </h1>

                  <p>
                    Comparing your position
                    with nearby campus landmarks.
                  </p>

                </header>

                <div className="gps-scanner">

                  <div className="gps-ring ring-one" />
                  <div className="gps-ring ring-two" />
                  <div className="gps-ring ring-three" />

                  <div className="gps-dot">
                    ◎
                  </div>

                  <span>
                    SEARCHING
                  </span>

                </div>
              </>
            )}

            {identified &&
              detectedBuilding && (
                <>

                  <header className="scan-heading">

                    <span className="identified-text">
                      ✓ LOCATION IDENTIFIED
                    </span>

                    <h1>
                      {detectedBuilding.name}
                    </h1>

                    <p>
                      {detectedBuilding.meta}
                    </p>

                  </header>

                  {imageUrl ? (
                    <div className="scan-image-container">

                      <img
                        src={imageUrl}
                        alt={
                          selectedFile?.name ||
                          'Uploaded place'
                        }
                      />

                      <span className="landmark-label">
                        {detectedBuilding.name.toUpperCase()}
                      </span>

                    </div>
                  ) : (
                    <div className="location-result-card">

                      <div className="location-result-icon">
                        ◎
                      </div>

                      <p>
                        GPS MATCH
                      </p>

                      <h2>
                        {detectedBuilding.name}
                      </h2>

                      {distanceAway !== null && (
                        <span>
                          About{' '}
                          {Math.round(
                            distanceAway
                          )}{' '}
                          m away
                        </span>
                      )}

                      {gpsAccuracy !== null && (
                        <small>
                          GPS accuracy ±
                          {Math.round(
                            gpsAccuracy
                          )}
                          m
                        </small>
                      )}

                    </div>
                  )}

                  <button
                    className="primary-button explore-button"
                    onClick={openExplore}
                  >
                    Explore this place →
                  </button>

                </>
              )}

            {locationError && (
              <div className="location-error-card">

                <strong>
                  Location not found
                </strong>

                <p>
                  {locationError}
                </p>

                <button
                  className="primary-button"
                  onClick={scanLocation}
                >
                  Try Again
                </button>

              </div>
            )}

            <button
              className="reset-button"
              onClick={resetScan}
            >
              ← Back
            </button>

          </section>
        )}

      </div>
    </main>
  )
}

export default App