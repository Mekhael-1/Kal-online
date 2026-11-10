import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageHeader from '../../components/ui/PageHeader';
import Button from '../../components/ui/Button';
import ui from '../../components/ui/ui.module.css';
import styles from './VoteRewards.module.css';

interface PlayerReview {
  id: string;
  author: string;
  email: string;
  rating: number;
  date: string;
  comment: string;
  classTag: string;
}

const initialReviews: PlayerReview[] = [
  {
    id: 'rev-1',
    author: 'VanguardKnight',
    email: 'van***@gmail.com',
    rating: 5,
    date: '2 hours ago',
    comment: 'Best Kal Online server in years! Class balance is on point, and Saturday Ashen Keep castle sieges are completely lag-free.',
    classTag: 'Knight Lv. 72',
  },
  {
    id: 'rev-2',
    author: 'ShadowThief',
    email: 'sha***@outlook.com',
    rating: 5,
    date: 'Yesterday',
    comment: 'The Thief class implementation is flawless. Fast tick-rate, responsive staff on Discord, and smooth progression.',
    classTag: 'Thief Lv. 68',
  },
  {
    id: 'rev-3',
    author: 'MysticSorceress',
    email: 'mys***@yahoo.com',
    rating: 5,
    date: '2 days ago',
    comment: 'The 12-hour vote reward box delivers directly into your inventory without any hassle. Highly recommended for classic MMORPG fans.',
    classTag: 'Mage Lv. 75',
  },
];

export default function VoteRewards() {
  const [characterName, setCharacterName] = useState('');
  const [accountEmail, setAccountEmail] = useState('');
  const [hasVoted, setHasVoted] = useState(false);
  const [claimedReward, setClaimedReward] = useState<string | null>(null);

  // Review Form States
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [reviewText, setReviewText] = useState('');
  const [reviewsList, setReviewsList] = useState<PlayerReview[]>(initialReviews);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [authError, setAuthError] = useState('');

  const topKalUrl = 'https://top-kal.com/';

  const handleVoteClick = () => {
    if (!characterName.trim()) {
      setAuthError('Please enter your in-game Character Name first so your reward box can be delivered.');
      window.scrollTo({ top: 120, behavior: 'smooth' });
      return;
    }

    setAuthError('');
    // Open top-kal.com in a new tab
    window.open(topKalUrl, '_blank', 'noopener,noreferrer');

    // Simulate verified vote callback and inventory reward delivery
    setTimeout(() => {
      setHasVoted(true);
      setClaimedReward(`Congratulations! Your Vote Reward Box has been dispatched directly into your in-game inventory (${characterName})!`);
      setTimeout(() => setClaimedReward(null), 8000);
    }, 1400);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!characterName.trim() || !accountEmail.trim()) {
      setAuthError('Please enter your Character Name and Account Email to submit your rating.');
      return;
    }
    if (!reviewText.trim()) {
      setAuthError('Please write a short review or feedback about your server experience.');
      return;
    }

    setAuthError('');
    const newRev: PlayerReview = {
      id: 'rev-' + Date.now(),
      author: characterName.trim(),
      email: accountEmail.trim().replace(/(.{2})(.*)(@.*)/, '$1***$3'),
      rating: rating,
      date: 'Just now',
      comment: reviewText.trim(),
      classTag: 'Verified Player',
    };

    setReviewsList([newRev, ...reviewsList]);
    setReviewSubmitted(true);
    setReviewText('');
    setClaimedReward(`Thank you for your rating! A special Reviewer's Gift Box has been sent directly into your in-game inventory (${characterName})!`);
  };

  return (
    <div className={styles.votePage}>
      <PageHeader
        title="Vote Rewards & Rating"
        subtitle="Vote for Kal Online on Top-Kal, rate your server experience, and receive your reward box directly inside your in-game inventory."
      />

      <div className={`${ui.section} ${styles.mainSection}`}>
        <div className={ui.container}>
          {/* Step 1: Character Identification */}
          <div className={`${ui.panel} ${styles.accountAuthPanel}`}>
            <div className={styles.authHead}>
              <span className={styles.authBadge}>STEP 1</span>
              <div>
                <h3 className={styles.authTitle}>Enter Your Character & Account Details</h3>
                <p className={styles.authSubtitle}>
                  All reward boxes are automatically dispatched directly into your in-game inventory (Inventory [I]).
                </p>
              </div>
            </div>

            <div className={styles.authInputsRow}>
              <div className={styles.authInputGroup}>
                <label htmlFor="voteCharName" className={styles.inputLabel}>
                  Character Name (In-Game) *
                </label>
                <input
                  id="voteCharName"
                  type="text"
                  className={styles.authTextInput}
                  placeholder="e.g. DreadKnight or SilentThief"
                  value={characterName}
                  onChange={(e) => {
                    setCharacterName(e.target.value);
                    if (authError) setAuthError('');
                  }}
                />
                <span className={styles.inputHint}>Make sure to enter the exact name of the character receiving the reward box.</span>
              </div>

              <div className={styles.authInputGroup}>
                <label htmlFor="voteEmail" className={styles.inputLabel}>
                  Account Email Address *
                </label>
                <input
                  id="voteEmail"
                  type="email"
                  className={styles.authTextInput}
                  placeholder="warrior@example.com"
                  value={accountEmail}
                  onChange={(e) => {
                    setAccountEmail(e.target.value);
                    if (authError) setAuthError('');
                  }}
                />
                <span className={styles.inputHint}>Used to verify your rating and account authenticity.</span>
              </div>
            </div>

            {authError && <div className={styles.authAlert}>⚠️ {authError}</div>}

            {characterName.trim() && (
              <div className={styles.activePlayerPill}>
                <span className={styles.pulseDot} />
                <span>Active Character: <strong>{characterName}</strong> • Ready to vote and receive reward boxes</span>
              </div>
            )}
          </div>

          {/* Success Claim Notification Banner */}
          <AnimatePresence>
            {claimedReward && (
              <motion.div
                className={styles.claimNotification}
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
              >
                <span className={styles.claimIcon}>🎁</span>
                <span className={styles.claimText}>{claimedReward}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Step 2: Clean Top-Kal Voting Action */}
          <div className={`${ui.panel} ${styles.topKalCard}`}>
            <div className={styles.topKalTop}>
              <div className={styles.topKalBadge}>
                <span className={styles.livePulse} />
                OFFICIAL VOTE PARTNER • TOP-KAL.COM
              </div>
              <h3 className={styles.topKalTitle}>
                Vote on Top-Kal (https://top-kal.com/)
              </h3>
              <p className={styles.topKalDesc}>
                Help increase the server rank on the official Top-Kal rankings! Every vote automatically delivers a <strong>Vote Reward Box directly into your in-game inventory</strong> (Available every 12 hours).
              </p>
            </div>

            <div className={styles.topKalActionRow}>
              <div className={styles.cooldownBadge}>
                <span className={styles.clockIcon}>⏱️</span>
                <span>{hasVoted ? '✓ Vote recorded! You can vote again in 12 hours.' : 'Voting available right now (Every 12 hours)'}</span>
              </div>

              <a
                href={topKalUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  e.preventDefault();
                  handleVoteClick();
                }}
                className={`${styles.topKalVoteBtn} ${hasVoted ? styles.topKalVoteBtnDone : ''}`}
              >
                <span className={styles.voteBtnContent}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                  <span>
                    {hasVoted ? '✓ Reward Box Sent to In-Game Inventory' : 'Vote on Top-Kal.com & Claim Reward Box'}
                  </span>
                </span>
              </a>
            </div>
          </div>

          {/* Step 3: Rate the Game & Submit Review */}
          <div className={`${ui.panel} ${styles.ratingSection}`}>
            <div className={styles.ratingHead}>
              <div className={styles.ratingBadge}>RATE THE GAME</div>
              <h3 className={styles.ratingTitle}>Rate Your Server Experience</h3>
              <p className={styles.ratingSubtitle}>
                Rate your gameplay and leave a review. Submitting your rating automatically sends a <strong>Reviewer&apos;s Gift Box directly into your in-game inventory</strong>!
              </p>
            </div>

            {reviewSubmitted ? (
              <div className={styles.reviewSuccessBox}>
                <div className={styles.successCheck}>✓</div>
                <h4>Thank You for Rating Kal Online!</h4>
                <p>Your review has been published, and your <strong>Reviewer&apos;s Gift Box</strong> has been delivered directly into your in-game inventory (Inventory [I]).</p>
                <button
                  type="button"
                  className={styles.writeAnotherBtn}
                  onClick={() => setReviewSubmitted(false)}
                >
                  Write Another Review
                </button>
              </div>
            ) : (
              <form onSubmit={handleReviewSubmit} className={styles.reviewForm}>
                {/* Star Rating Selector */}
                <div className={styles.starRatingRow}>
                  <span className={styles.starPrompt}>Select Your Rating:</span>
                  <div className={styles.starsWrapper}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        className={styles.starBtn}
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        aria-label={`Rate ${star} stars`}
                      >
                        <span
                          className={styles.starGlyph}
                          style={{
                            color:
                              (hoverRating || rating) >= star ? '#f0c46a' : 'rgba(200, 150, 62, 0.25)',
                          }}
                        >
                          ★
                        </span>
                      </button>
                    ))}
                    <strong className={styles.ratingScoreLabel}>
                      {rating === 5
                        ? 'Outstanding (5/5) ★★★★★'
                        : rating === 4
                        ? 'Great (4/5) ★★★★☆'
                        : rating === 3
                        ? 'Good (3/5) ★★★☆☆'
                        : rating === 2
                        ? 'Fair (2/5) ★★☆☆☆'
                        : 'Needs Improvement (1/5)'}
                    </strong>
                  </div>
                </div>

                {/* Review Text Area */}
                <div className={styles.reviewTextGroup}>
                  <label htmlFor="reviewComments" className={styles.inputLabel}>
                    Your Review & Server Feedback:
                  </label>
                  <textarea
                    id="reviewComments"
                    rows={4}
                    className={styles.reviewTextarea}
                    placeholder="Share your thoughts on game balance, castle warfare, server performance, and community support..."
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                  />
                </div>

                <div className={styles.reviewSubmitRow}>
                  <span className={styles.rewardNote}>
                    🎁 A Reviewer&apos;s Gift Box will be delivered directly into your inventory upon submission.
                  </span>
                  <Button type="submit" className={styles.submitReviewBtn}>
                    Submit Rating & Claim Reward Box
                  </Button>
                </div>
              </form>
            )}
          </div>

          {/* Community Reviews Showcase */}
          <div className={styles.reviewsFeedSection}>
            <div className={styles.feedHead}>
              <div className={styles.overallRatingBox}>
                <span className={styles.overallBigScore}>4.9</span>
                <div>
                  <div className={styles.overallStars}>★★★★★</div>
                  <span className={styles.overallCount}>Overall rating from 940+ active players</span>
                </div>
              </div>
              <h3 className={styles.feedTitle}>Community Ratings & Reviews</h3>
            </div>

            <div className={styles.reviewsGrid}>
              {reviewsList.map((rev) => (
                <div key={rev.id} className={`${ui.panel} ${styles.reviewCard}`}>
                  <div className={styles.reviewCardTop}>
                    <div>
                      <strong className={styles.revAuthor}>{rev.author}</strong>
                      <span className={styles.revClass}>{rev.classTag}</span>
                    </div>
                    <div className={styles.revStars}>
                      {'★'.repeat(rev.rating)}
                      <span className={styles.revDate}>{rev.date}</span>
                    </div>
                  </div>
                  <p className={styles.revComment}>&ldquo;{rev.comment}&rdquo;</p>
                </div>
              ))}
            </div>
          </div>

          {/* 7-Day Vote Streak Milestone */}
          <div className={`${ui.panel} ${styles.streakPanel}`}>
            <div className={styles.streakLeft}>
              <span className={styles.streakIcon}>🔥</span>
              <div>
                <h4 className={styles.streakTitle}>Daily Vote Streak Bonus</h4>
                <p className={styles.streakDesc}>
                  Vote daily on Top-Kal for 7 consecutive days to receive a <strong>Mythic Weekly Reward Box inside your in-game inventory</strong> and an exclusive title!
                </p>
              </div>
            </div>
            <div className={styles.streakDays}>
              {['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'].map((day, i) => (
                <div
                  key={day}
                  className={`${styles.streakPill} ${i < 3 ? styles.streakPillActive : ''}`}
                >
                  <span>{day}</span>
                  <strong>{i === 6 ? 'Mythic Box' : 'Reward Box'}</strong>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
