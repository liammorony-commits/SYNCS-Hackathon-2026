import { useEffect, useState } from 'react'
import type { ChangeEvent } from 'react'
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

function App() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [imageUrl, setImageUrl] = useState<string | null>(null)

  const [scanning, setScanning] = useState(false)
  const [identified, setIdentified] = useState(false)
  const [exploring, setExploring] = useState(false)

  const [storiesOpen, setStoriesOpen] = useState(false)
  const [comments, setComments] = useState<Comment[]>([])

  const [connectedId, setConnectedId] = useState<number | null>(null)
  const [likedIds, setLikedIds] = useState<number[]>([])

  const [showHologramInfo, setShowHologramInfo] = useState(true)

  // ---------------------------------------------------
  // IMAGE UPLOAD
  // ---------------------------------------------------

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]

    if (!file) return

    if (imageUrl) {
      URL.revokeObjectURL(imageUrl)
    }

    const newImageUrl = URL.createObjectURL(file)

    setSelectedFile(file)
    setImageUrl(newImageUrl)
    setScanning(true)
    setIdentified(false)
    setExploring(false)
  }

  // ---------------------------------------------------
  // FAKE LANDMARK SCANNING DELAY
  // ---------------------------------------------------

  useEffect(() => {
    if (!scanning) return

    const timer = window.setTimeout(() => {
      setScanning(false)
      setIdentified(true)
    }, 2200)

    return () => window.clearTimeout(timer)
  }, [scanning])

  // ---------------------------------------------------
  // OPEN QUADRANGLE EXPERIENCE
  // ---------------------------------------------------

  async function openExplore() {
    setExploring(true)

    try {
      const recentComments = await getRecentComments('quadrangle')

      const commentsWithLikes = (recentComments as Comment[]).map(
        (comment, index) => ({
          ...comment,

          // Temporary demo likes.
          // Later these can come directly from Supabase.
          likes: comment.likes ?? Math.max(2, 15 - index * 4),
        })
      )

      setComments(commentsWithLikes)
    } catch (error) {
      console.error('Could not load comments:', error)
    }
  }

  // ---------------------------------------------------
  // LIKE COMMENT
  // ---------------------------------------------------

  function likeComment(commentId: number) {
    const alreadyLiked = likedIds.includes(commentId)

    setComments((currentComments) =>
      currentComments.map((comment) => {
        if (comment.id !== commentId) return comment

        return {
          ...comment,
          likes: Math.max(
            0,
            (comment.likes ?? 0) + (alreadyLiked ? -1 : 1)
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

  // ---------------------------------------------------
  // CONNECTION REQUEST
  // ---------------------------------------------------

  async function connect(commentId: number) {
    try {
      await sendConnectionRequest(commentId, 'Time Lens User')
      setConnectedId(commentId)
    } catch (error) {
      console.error('Could not connect:', error)
    }
  }

  // ---------------------------------------------------
  // RESET
  // ---------------------------------------------------

  function resetUpload() {
    if (imageUrl) {
      URL.revokeObjectURL(imageUrl)
    }

    setImageUrl(null)
    setSelectedFile(null)

    setScanning(false)
    setIdentified(false)
    setExploring(false)

    setStoriesOpen(false)
    setConnectedId(null)
    setLikedIds([])
  }

  // Highest liked comments automatically move to top.
  const sortedComments = [...comments].sort(
    (a, b) => (b.likes ?? 0) - (a.likes ?? 0)
  )

  // ===================================================
  // EXPLORE SCREEN
  // ===================================================

  if (exploring && imageUrl) {
    return (
      <main className="page-background">
        <div className="mobile-app">
          {/* TOP BAR */}

          <nav className="top-bar">
            <button
              className="back-icon"
              onClick={() => setExploring(false)}
              aria-label="Go back"
            >
              ←
            </button>

            <span className="brand">TIME LENS</span>

            <button
              className="stories-top-button"
              onClick={() => setStoriesOpen(true)}
            >
              Stories

              {comments.length > 0 && (
                <span className="stories-count">
                  {comments.length}
                </span>
              )}
            </button>
          </nav>

          {/* TITLE */}

          <header className="location-header">
            <span className="location-eyebrow">
              UNIVERSITY OF SYDNEY
            </span>

            <h1>The Quadrangle</h1>

            <p>Camperdown · Sydney</p>
          </header>

          {/* AR IMAGE */}

          <section className="ar-scene">
            <img
              className="quadrangle-image"
              src={imageUrl}
              alt="The Quadrangle"
            />

            <div className="scene-gradient" />

            {/* EDMUND BLACKET HOLOGRAM */}

            <button
              className="hologram-button"
              onClick={() =>
                setShowHologramInfo(!showHologramInfo)
              }
              aria-label="View Edmund Blacket information"
            >
              <img
                className="blacket-hologram"
                src="/edmund-blacket.png"
                alt="Edmund Thomas Blacket"
              />

              <div className="hologram-base">
                <span />
                <span />
                <span />
              </div>
            </button>

            {/* HOLOGRAM INFO */}

            {showHologramInfo && (
              <div className="hologram-card">
                <span className="hologram-date">1850s</span>

                <h2>Edmund Blacket</h2>

                <p>
                  Architect behind the University's earliest
                  permanent buildings.
                </p>

                <div className="hologram-line" />
              </div>
            )}

            <div className="tap-message">
              <span>⌃</span>
              <p>Tap the hologram to learn more</p>
            </div>
          </section>

          {/* HISTORY */}

          <section className="history-section">
            <p className="section-eyebrow">
              ABOUT THIS PLACE
            </p>

            <h2>
              A place shaped by generations.
            </h2>

            <p className="history-copy">
              The Quadrangle is one of Australia's most iconic
              university spaces. Built from the 1850s, it has
              been at the heart of learning, ceremonies and
              university life for generations.
            </p>

            {/* TIMELINE */}

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
              onClick={() => setStoriesOpen(true)}
            >
              View stories from here
            </button>
          </section>

          {/* COMMENTS BACKDROP */}

          <div
            className={`comments-backdrop ${
              storiesOpen ? 'backdrop-visible' : ''
            }`}
            onClick={() => setStoriesOpen(false)}
          />

          {/* INSTAGRAM STYLE COMMENTS */}

          <aside
            className={`comments-sheet ${
              storiesOpen ? 'comments-sheet-open' : ''
            }`}
          >
            <div className="sheet-handle" />

            <div className="comments-header">
              <div>
                <p>LAST 2 HOURS</p>
                <h2>Stories</h2>
              </div>

              <button
                className="close-comments"
                onClick={() => setStoriesOpen(false)}
                aria-label="Close comments"
              >
                ×
              </button>
            </div>

            <p className="comments-subtitle">
              See what this place means to people here right now.
            </p>

            <div className="comments-list">
              {sortedComments.length === 0 ? (
                <div className="empty-state">
                  <p>No recent stories yet.</p>
                  <span>
                    Be the first person to share a memory.
                  </span>
                </div>
              ) : (
                sortedComments.map((comment, index) => {
                  const name =
                    comment.name ||
                    comment.author ||
                    comment.username ||
                    'Anonymous'

                  const story =
                    comment.comment ||
                    comment.content ||
                    comment.text ||
                    'Shared a memory from the Quadrangle.'

                  const liked = likedIds.includes(comment.id)

                  return (
                    <article
                      className="instagram-comment"
                      key={comment.id}
                    >
                      <div className="comment-avatar">
                        {name.charAt(0).toUpperCase()}
                      </div>

                      <div className="comment-main">
                        {index === 0 &&
                          (comment.likes ?? 0) > 0 && (
                            <span className="top-comment">
                              TOP STORY
                            </span>
                          )}

                        <p className="comment-body">
                          <strong>{name}</strong>{' '}
                          {story}
                        </p>

                        <div className="comment-meta">
                          <span>Recently</span>

                          <span>
                            {comment.likes ?? 0}{' '}
                            {(comment.likes ?? 0) === 1
                              ? 'like'
                              : 'likes'}
                          </span>

                          <button
                            onClick={() =>
                              connect(comment.id)
                            }
                            disabled={
                              connectedId === comment.id
                            }
                          >
                            {connectedId === comment.id
                              ? 'Requested'
                              : 'Connect'}
                          </button>
                        </div>
                      </div>

                      <button
                        className={`heart-button ${
                          liked ? 'heart-liked' : ''
                        }`}
                        onClick={() =>
                          likeComment(comment.id)
                        }
                        aria-label="Like story"
                      >
                        {liked ? '♥' : '♡'}
                      </button>
                    </article>
                  )
                })
              )}
            </div>
          </aside>
        </div>
      </main>
    )
  }

  // ===================================================
  // LANDING / SCANNING SCREEN
  // ===================================================

  return (
    <main className="page-background">
      <div className="mobile-app landing-container">
        {!imageUrl ? (
          <section className="landing-screen">
            <p className="brand landing-brand">
              TIME LENS
            </p>

            <h1>
              Discover the stories hidden around you.
            </h1>

            <p className="landing-subtitle">
              Scan a place to uncover its history and connect
              with people experiencing it today.
            </p>

            <div className="landing-buttons">
              <button className="primary-button">
                Scan with Camera
              </button>

              <label className="secondary-button">
                Upload Photo

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
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
              <header className="scan-heading">
                <h1>Analysing landmark...</h1>

                <p>
                  Searching for stories hidden in this place.
                </p>
              </header>
            )}

            {identified && (
              <header className="scan-heading">
                <span className="identified-text">
                  ✓ LANDMARK IDENTIFIED
                </span>

                <h1>The Quadrangle</h1>

                <p>
                  University of Sydney · Camperdown
                </p>
              </header>
            )}

            <div className="scan-image-container">
              <img
                src={imageUrl}
                alt={
                  selectedFile?.name ||
                  'Uploaded landmark'
                }
              />

              {scanning && (
                <div className="scan-line" />
              )}

              <span className="corner corner-tl" />
              <span className="corner corner-tr" />
              <span className="corner corner-bl" />
              <span className="corner corner-br" />

              {identified && (
                <span className="landmark-label">
                  THE QUADRANGLE
                </span>
              )}
            </div>

            {identified && (
              <button
                className="primary-button explore-button"
                onClick={openExplore}
              >
                Explore this place →
              </button>
            )}

            <button
              className="reset-button"
              onClick={resetUpload}
            >
              ← Choose another photo
            </button>
          </section>
        )}
      </div>
    </main>
  )
}

export default App