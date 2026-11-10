import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageHeader from '../../components/ui/PageHeader';
import Button from '../../components/ui/Button';
import ui from '../../components/ui/ui.module.css';
import styles from './Donate.module.css';

interface DonationTier {
  id: string;
  name: string;
  price: number;
  dcAmount: number;
  bonusDc: number;
  totalDc: number;
  badge?: string;
  popular?: boolean;
  perks: string[];
}

const tiers: DonationTier[] = [
  {
    id: 'tier-1',
    name: 'Initiate Pack',
    price: 10,
    dcAmount: 100,
    bonusDc: 0,
    totalDc: 100,
    perks: ['100 DC Instant Delivery', 'Starter Town Teleport Scrolls (x10)', 'Bronze Donor Discord Role'],
  },
  {
    id: 'tier-2',
    name: 'Adventurer Pack',
    price: 25,
    dcAmount: 250,
    bonusDc: 25,
    totalDc: 275,
    badge: '+10% BONUS',
    perks: [
      '275 DC Total (250 + 25 Bonus)',
      '7-Day VIP Experience Scroll',
      'Inventory Expansion Bag (x1)',
      'Silver Donor Discord Role',
    ],
  },
  {
    id: 'tier-3',
    name: 'Champion Pack',
    price: 50,
    dcAmount: 500,
    bonusDc: 75,
    totalDc: 575,
    badge: 'MOST POPULAR',
    popular: true,
    perks: [
      '575 DC Total (500 + 75 Bonus)',
      '30-Day VIP Pass (5% EXP / Drop Rate)',
      'Exclusive Flame Weapon Aura Effect',
      'Gold Donor Discord Role',
    ],
  },
  {
    id: 'tier-4',
    name: 'Warlord Pack',
    price: 75,
    dcAmount: 750,
    bonusDc: 150,
    totalDc: 900,
    badge: '+20% BONUS',
    perks: [
      '900 DC Total (750 + 150 Bonus)',
      '60-Day VIP Pass & Custom Title',
      'Mythical Obsidian Wolf Mount (Speed +30%)',
      'Platinum Donor Discord Role',
    ],
  },
  {
    id: 'tier-5',
    name: 'Sovereign Emperor Pack',
    price: 100,
    dcAmount: 1000,
    bonusDc: 250,
    totalDc: 1250,
    badge: 'BEST VALUE (25% BONUS)',
    popular: false,
    perks: [
      '1,250 DC Total (1,000 + 250 Bonus)',
      'Permanent VIP Sovereign Crown Nameplate',
      'Exclusive Celestial Angel Wings (Cosmetic)',
      'Mythical Golden Kirin Mount',
      'Diamond VIP Lounge & Priority Support',
    ],
  },
];

const paymentMethods = [
  { id: 'paypal', name: 'PayPal', icon: '💳', fee: 'No fee' },
  { id: 'card', name: 'Credit / Debit Card', icon: '🔒', fee: 'Instant 256-bit SSL' },
  { id: 'crypto', name: 'Crypto (USDT / BTC / ETH)', icon: '⚡', fee: 'Zero confirmation delay' },
  { id: 'paysafe', name: 'Paysafecard / Local', icon: '🌍', fee: 'Global voucher gateway' },
];

const dcFeatures = [
  {
    title: 'Exclusively Through Donation Packs',
    desc: 'DC (Dragon Coins) is a premium prestige currency obtainable solely via official donation packs. It cannot be farmed from monsters or quests, protecting the in-game player trading market.',
    icon: '💎',
  },
  {
    title: 'Instant Automated Delivery',
    desc: 'Coins and bonus perks are dispatched automatically to your character within seconds. Simply open your Cash Shop Inventory (Alt + I) in-game to collect them.',
    icon: '⚡',
  },
  {
    title: 'Cosmetics & Convenience Focused',
    desc: 'Our store strictly adheres to a Zero Pay-To-Win philosophy: DC is designed for magnificent weapon glow auras, mythical dragon mounts, angel wings, and quality-of-life perks.',
    icon: '🛡️',
  },
  {
    title: 'Account Bound & Fully Secure',
    desc: 'Your DC balance is tied securely to your account. Multiple characters on the same account share access to purchased VIP status and cosmetic unlocks.',
    icon: '🔒',
  },
];

const faqs = [
  {
    q: 'How fast will my DC arrive after payment?',
    a: 'DC coins are deposited automatically within 60 seconds of transaction confirmation. Press Alt + I in-game to open your Cash Inventory and access your balance.',
  },
  {
    q: 'Can I share my DC with other characters on my account?',
    a: 'Yes! DC balance and VIP membership are account-wide. Any character created under the same login credentials can access the store and benefits.',
  },
  {
    q: 'What if I need help with my payment?',
    a: 'Open a support ticket on our official Discord server with your Transaction ID. Our Game Masters and finance staff are online 24/7 to assist you immediately.',
  },
  {
    q: 'Which payment methods are accepted?',
    a: 'We accept PayPal, all major Credit/Debit Cards (Visa, Mastercard, American Express), Cryptocurrencies (USDT TRC20, Bitcoin, Ethereum), and Paysafecard vouchers.',
  },
];

export default function Donate() {
  const [selectedTier, setSelectedTier] = useState<DonationTier>(tiers[2]); // Champion Pack by default
  const [characterName, setCharacterName] = useState('');
  const [accountEmail, setAccountEmail] = useState('');
  const [selectedPayment, setSelectedPayment] = useState(paymentMethods[0].id);
  const [inputError, setInputError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [transactionId, setTransactionId] = useState('');

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!characterName.trim()) {
      setInputError('Please enter your in-game Character Name.');
      return;
    }
    if (!accountEmail.trim() || !accountEmail.includes('@')) {
      setInputError('Please enter a valid email address to receive your payment receipt.');
      return;
    }

    setInputError('');
    setIsProcessing(true);

    // Simulate payment gateway redirection & instant delivery confirmation
    setTimeout(() => {
      const randomId = 'TX-' + Math.floor(100000 + Math.random() * 900000) + '-DC';
      setTransactionId(randomId);
      setIsProcessing(false);
      setShowModal(true);
    }, 1200);
  };

  return (
    <div className={styles.donatePage}>
      <PageHeader
        title="Donate & Recharge DC"
        subtitle="Recharge exclusive DC (Dragon Coins) to support the realm and unlock cosmetic weapon auras, celestial wings, and VIP privileges."
      />

      {/* Main Container */}
      <div className={`${ui.section} ${styles.mainSection}`}>
        <div className={ui.container}>
          {/* Notice Alert Banner */}
          <div className={styles.exclusiveBanner}>
            <div className={styles.exclusiveIcon}>💎</div>
            <div>
              <h3 className={styles.exclusiveTitle}>
                DC (Dragon Coins) — Exclusive Donation Currency
              </h3>
              <p className={styles.exclusiveDesc}>
                DC can only be acquired through the official donation packages below (ranging from 100 DC up to 1,000 DC). 
                All tiers include generous bonus DC and deliver automatically to your in-game Cash Inventory (Alt + I).
              </p>
            </div>
          </div>

          {/* Pricing Tiers Grid */}
          <div className={styles.tiersGrid}>
            {tiers.map((tier) => {
              const isSelected = selectedTier.id === tier.id;
              return (
                <motion.div
                  key={tier.id}
                  className={`${ui.panel} ${styles.tierCard} ${isSelected ? styles.tierSelected : ''} ${
                    tier.popular ? styles.tierPopular : ''
                  }`}
                  onClick={() => setSelectedTier(tier)}
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                >
                  {tier.badge && <span className={styles.tierBadge}>{tier.badge}</span>}

                  <div className={styles.tierHeader}>
                    <h4 className={styles.tierName}>{tier.name}</h4>
                    <div className={styles.priceWrap}>
                      <span className={styles.currencySymbol}>$</span>
                      <span className={styles.priceNum}>{tier.price}</span>
                      <span className={styles.pricePeriod}>USD</span>
                    </div>
                  </div>

                  <div className={styles.dcHighlight}>
                    <span className={styles.dcTotal}>{tier.totalDc.toLocaleString()} DC</span>
                    {tier.bonusDc > 0 ? (
                      <span className={styles.dcBonusLabel}>
                        ({tier.dcAmount} Base + {tier.bonusDc} Bonus DC)
                      </span>
                    ) : (
                      <span className={styles.dcStandardLabel}>Standard Package</span>
                    )}
                  </div>

                  <ul className={styles.perksList}>
                    {tier.perks.map((p, idx) => (
                      <li key={idx} className={styles.perkItem}>
                        <span className={styles.checkIcon}>✓</span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    type="button"
                    className={`${styles.selectBtn} ${isSelected ? styles.selectBtnActive : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedTier(tier);
                    }}
                  >
                    {isSelected ? '✓ Selected Pack' : 'Select this Pack'}
                  </button>
                </motion.div>
              );
            })}
          </div>

          {/* Checkout & Character Details Section */}
          <div className={`${ui.panel} ${styles.checkoutPanel}`}>
            <div className={styles.checkoutHead}>
              <div className={styles.checkoutHeadLeft}>
                <span className={styles.stepNum}>1</span>
                <div>
                  <h3 className={styles.checkoutTitle}>Confirm Character & Donation Details</h3>
                  <p className={styles.checkoutSubtitle}>
                    Selected Package: <strong>{selectedTier.name}</strong> — {selectedTier.totalDc.toLocaleString()} DC for <strong>${selectedTier.price}.00 USD</strong>
                  </p>
                </div>
              </div>
            </div>

            <form onSubmit={handleCheckout} className={styles.checkoutForm}>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="charName" className={styles.inputLabel}>
                    Character Name (In-Game) *
                  </label>
                  <input
                    id="charName"
                    type="text"
                    className={styles.textInput}
                    placeholder="e.g. DreadKnight or ShadowMage"
                    value={characterName}
                    onChange={(e) => setCharacterName(e.target.value)}
                  />
                  <span className={styles.inputHint}>Make sure to enter the exact character name receiving the DC balance.</span>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="userEmail" className={styles.inputLabel}>
                    Billing Email Address *
                  </label>
                  <input
                    id="userEmail"
                    type="email"
                    className={styles.textInput}
                    placeholder="warrior@example.com"
                    value={accountEmail}
                    onChange={(e) => setAccountEmail(e.target.value)}
                  />
                  <span className={styles.inputHint}>Your payment invoice, receipt, and delivery confirmation will be sent here.</span>
                </div>
              </div>

              {/* Payment Methods Selection */}
              <div className={styles.paymentSection}>
                <label className={styles.inputLabel}>Select Payment Gateway:</label>
                <div className={styles.paymentGrid}>
                  {paymentMethods.map((pm) => (
                    <div
                      key={pm.id}
                      className={`${styles.paymentCard} ${selectedPayment === pm.id ? styles.paymentCardActive : ''}`}
                      onClick={() => setSelectedPayment(pm.id)}
                    >
                      <span className={styles.paymentIcon}>{pm.icon}</span>
                      <div className={styles.paymentInfo}>
                        <strong className={styles.paymentName}>{pm.name}</strong>
                        <span className={styles.paymentFee}>{pm.fee}</span>
                      </div>
                      <span className={styles.radioDot}>{selectedPayment === pm.id ? '●' : '○'}</span>
                    </div>
                  ))}
                </div>
              </div>

              {inputError && <div className={styles.errorMessage}>⚠️ {inputError}</div>}

              {/* Submit Checkout Button */}
              <div className={styles.submitRow}>
                <div className={styles.orderSummary}>
                  <span>Total Amount Due:</span>
                  <strong className={styles.totalSum}>${selectedTier.price}.00 USD</strong>
                  <span className={styles.summaryDc}>for {selectedTier.totalDc.toLocaleString()} DC</span>
                </div>

                <Button type="submit" disabled={isProcessing} className={styles.checkoutBtn}>
                  {isProcessing ? 'Processing Transaction...' : `Recharge Now (${selectedTier.totalDc} DC)`}
                </Button>
              </div>
            </form>
          </div>

          {/* DC Currency Perks Showcase */}
          <div className={styles.featuresSection}>
            <div className={styles.featuresHead}>
              <h3 className={styles.featuresTitle}>Why Donate to Kal Online?</h3>
              <p className={styles.featuresSub}>
                A transparent, balanced economy ensuring 100% server longevity with zero Pay-to-Win.
              </p>
            </div>

            <div className={styles.featuresGrid}>
              {dcFeatures.map((f, i) => (
                <div key={i} className={`${ui.panel} ${styles.featureCard}`}>
                  <span className={styles.featureIcon}>{f.icon}</span>
                  <h4 className={styles.featureCardTitle}>{f.title}</h4>
                  <p className={styles.featureCardDesc}>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ Accordion Section */}
          <div className={styles.faqSection}>
            <h3 className={styles.faqTitle}>Frequently Asked Questions (Donation FAQ)</h3>
            <div className={styles.faqList}>
              {faqs.map((faq, i) => (
                <div key={i} className={`${ui.panel} ${styles.faqItem}`}>
                  <h4 className={styles.faqQ}>
                    <span className={styles.goldQ}>Q.</span> {faq.q}
                  </h4>
                  <p className={styles.faqA}>{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal Simulation */}
      <AnimatePresence>
        {showModal && (
          <div className={styles.modalBackdrop} onClick={() => setShowModal(false)}>
            <motion.div
              className={`${ui.panel} ${styles.modalContent}`}
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
            >
              <div className={styles.modalSuccessIcon}>✓</div>
              <h3 className={styles.modalTitle}>Donation Order Confirmed!</h3>
              <p className={styles.modalText}>
                Thank you for supporting Kal Online! Your order has been dispatched and <strong>{selectedTier.totalDc.toLocaleString()} DC</strong> will arrive in character <strong>{characterName}</strong>&apos;s inventory momentarily.
              </p>

              <div className={styles.txBox}>
                <span className={styles.txLabel}>Transaction Reference ID:</span>
                <code className={styles.txCode}>{transactionId}</code>
              </div>

              <div className={styles.modalInstructions}>
                <h5>How to claim your DC in-game:</h5>
                <ol>
                  <li>Launch Kal Online and log in with your character (<strong>{characterName}</strong>).</li>
                  <li>Press <code>Alt + I</code> to open your Cash Shop Inventory.</li>
                  <li>Your DC coins, VIP card, and bonus gifts will be ready to use immediately!</li>
                </ol>
              </div>

              <button
                type="button"
                className={styles.modalCloseBtn}
                onClick={() => setShowModal(false)}
              >
                Close & Return to Store
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
