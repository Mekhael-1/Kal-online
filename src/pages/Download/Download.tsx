import { useState } from 'react';
import { motion } from 'framer-motion';
import { site, downloads } from '../../config/site';
import PageHeader from '../../components/ui/PageHeader';
import Button from '../../components/ui/Button';
import ui from '../../components/ui/ui.module.css';
import styles from './Download.module.css';

const steps = [
  {
    title: 'Download the client archive',
    text: 'Pick any of the mirrors below. All files are fully patched and checksum-verified.',
  },
  {
    title: 'Extract to a clean folder',
    text: 'Use 7-Zip or WinRAR to extract the archive to a dedicated folder, such as C:\\Games\\KalOnline. Ensure at least 10 GB free space.',
  },
  {
    title: 'Run Launcher.exe as Administrator',
    text: 'Right-click Launcher.exe and select "Run as administrator". The launcher will verify game files and fetch any micro-patches.',
  },
  {
    title: 'Create or sign in to your account',
    text: 'Register a free account on this website, then input your username and password into the launcher.',
  },
  {
    title: 'Pick your class and forge your legend',
    text: 'Enter the world, join your guild channel on Discord, and begin your journey.',
  },
];

const specs = [
  { label: 'Operating System', min: 'Windows 10 (64-bit)', rec: 'Windows 11 (64-bit)' },
  { label: 'Processor', min: 'Intel Core i3 / AMD Ryzen 3', rec: 'Intel Core i5 / AMD Ryzen 5' },
  { label: 'Memory (RAM)', min: '4 GB RAM', rec: '8 GB RAM or higher' },
  { label: 'Graphics Card', min: 'GTX 650 / Radeon RX 460', rec: 'GTX 1060 / RX 580 or newer' },
  { label: 'Storage', min: '10 GB free HDD', rec: '10 GB free NVMe SSD' },
  { label: 'DirectX', min: 'Version 9.0c', rec: 'Version 11' },
];

interface ProgramItem {
  name: string;
  fixTag: string;
  btnLabel: string;
  btnUrl: string;
  isPrimary?: boolean;
}

const softwareList: ProgramItem[] = [
  {
    name: 'Visual C++ 2015–2022 (x86 32-bit)',
    fixTag: 'Fixes MSVCP140.dll & 0xc000007b (Required for Game)',
    btnLabel: 'Download x86',
    btnUrl: 'https://aka.ms/vs/17/release/vc_redist.x86.exe',
    isPrimary: true,
  },
  {
    name: 'Visual C++ 2015–2022 (x64 64-bit)',
    fixTag: 'Required for 64-bit Windows OS',
    btnLabel: 'Download x64',
    btnUrl: 'https://aka.ms/vs/17/release/vc_redist.x64.exe',
    isPrimary: true,
  },
  {
    name: 'DirectX End-User Runtime (June 2010)',
    fixTag: 'Fixes d3dx9_43.dll & 3D Shaders',
    btnLabel: 'Download DirectX',
    btnUrl: 'https://www.microsoft.com/en-us/download/details.aspx?id=8109',
    isPrimary: true,
  },
  {
    name: 'Microsoft .NET Framework 4.8',
    fixTag: 'Fixes Launcher Silent Crash / Not Opening',
    btnLabel: 'Download .NET 4.8',
    btnUrl: 'https://dotnet.microsoft.com/en-us/download/dotnet-framework/net48',
  },
  {
    name: '7-Zip Archiver (Free & Open Source)',
    fixTag: 'Prevents Corrupted Files & PAK Errors',
    btnLabel: 'Download 7-Zip',
    btnUrl: 'https://www.7-zip.org/download.html',
  },
  {
    name: 'WinRAR Archiver',
    fixTag: 'Alternative Archive Extractor',
    btnLabel: 'Download WinRAR',
    btnUrl: 'https://www.win-rar.com/download.html',
  },
  {
    name: 'Windows Defender Exclusion Guide',
    fixTag: 'Fixes Launcher.exe Blocked / Deleted',
    btnLabel: 'View Guide',
    btnUrl: 'https://support.microsoft.com/en-us/windows/add-an-exclusion-to-windows-security-811816c0-4dfd-af4a-47e4-c30d76b420f2',
  },
];

export default function Download() {
  const [copied, setCopied] = useState(false);
  const clientHash = '7a4b9c8d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b';

  const copyHash = () => {
    navigator.clipboard.writeText(clientHash);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className={styles.downloadPage}>
      <PageHeader
        title="Download Client"
        subtitle="Get the official full client archive. Clean, pre-configured, and ready for instant play."
      />

      {/* 1. Client Download Mirrors */}
      <section className={`${ui.section} ${styles.mirrorsSection}`}>
        <div className={`${ui.container} ${styles.mirrors}`}>
          {downloads.map((d, i) => (
            <motion.div
              key={d.id}
              className={`${ui.panel} ${styles.card}`}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
            >
              <div className={styles.cardTop}>
                <div>
                  <h2 className={styles.mirrorName}>{d.name}</h2>
                  <span className={styles.mirrorSub}>Official Mirror</span>
                </div>
                <span className={ui.tag}>{d.size}</span>
              </div>
              <p className={styles.note}>{d.note}</p>
              <Button href={d.url} className={styles.dlBtn}>
                Download from {d.name}
              </Button>
            </motion.div>
          ))}
        </div>

        {/* SHA-256 Checksum */}
        <div className={ui.container}>
          <motion.div
            className={`${ui.panel} ${styles.hashBox}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.5 }}
          >
            <div className={styles.hashLeft}>
              <span className={styles.hashLabel}>Client Archive SHA-256 Checksum:</span>
              <code className={styles.hashCode}>{clientHash}</code>
            </div>
            <button type="button" className={styles.copyBtn} onClick={copyHash}>
              {copied ? '✓ Checksum Copied!' : 'Copy SHA-256'}
            </button>
          </motion.div>
        </div>
      </section>

      {/* 2. Installation Steps + System Requirements */}
      <section className={`${ui.section} ${styles.infoSection}`}>
        <div className={`${ui.container} ${styles.split}`}>
          {/* Left Column: Steps */}
          <div>
            <h2 className={styles.h2}>Step-by-Step Installation</h2>
            <ol className={styles.steps}>
              {steps.map((s, i) => (
                <motion.li
                  key={s.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.45, delay: i * 0.06 }}
                >
                  <span className={styles.num}>{i + 1}</span>
                  <div>
                    <h3 className={styles.stepTitle}>{s.title}</h3>
                    <p className={styles.stepText}>{s.text}</p>
                  </div>
                </motion.li>
              ))}
            </ol>
          </div>

          {/* Right Column: Requirements Table */}
          <div className={styles.rightCol}>
            <h2 className={styles.h2}>System Requirements</h2>
            <div className={`${ui.panel} ${styles.tableWrap}`}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Component</th>
                    <th>Minimum</th>
                    <th>Recommended</th>
                  </tr>
                </thead>
                <tbody>
                  {specs.map((r) => (
                    <tr key={r.label}>
                      <th scope="row">{r.label}</th>
                      <td>{r.min}</td>
                      <td>{r.rec}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Sleek Software List: Program Name on Left, Download Button on Right */}
      <section className={`${ui.section} ${styles.toolsSection}`}>
        <div className={ui.container}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionKicker}>
              <span>⚙️ ESSENTIAL RUNTIMES</span>
            </div>
            <h2 className={styles.sectionTitle}>
              Game Won&apos;t Launch? Required Software & Fixes
            </h2>
            <p className={styles.sectionSubtitle}>
              If you experience startup errors or missing DLL notifications, download and install the official prerequisite runtimes below:
            </p>
          </div>

          <div className={`${ui.panel} ${styles.programsPanel}`}>
            <div className={styles.programsTableHead}>
              <span>Software Package</span>
              <span>Resolved Error / Issue</span>
              <span className={styles.headAction}>Download Link</span>
            </div>

            <div className={styles.programsList}>
              {softwareList.map((prog) => (
                <div key={prog.name} className={styles.programRow}>
                  <div className={styles.progNameCol}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.progIcon}>
                      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                      <line x1="12" y1="22.08" x2="12" y2="12" />
                    </svg>
                    <strong className={styles.progName}>{prog.name}</strong>
                  </div>

                  <div className={styles.progTagCol}>
                    <span className={styles.progTag}>{prog.fixTag}</span>
                  </div>

                  <div className={styles.progBtnCol}>
                    <a
                      href={prog.btnUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={prog.isPrimary ? styles.rowBtnPrimary : styles.rowBtnGhost}
                    >
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" y1="15" x2="12" y2="3" />
                      </svg>
                      <span>{prog.btnLabel}</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 4. Discord Support Banner */}
          <div className={`${ui.panel} ${styles.discordCard}`}>
            <div className={styles.discordLeft}>
              <div className={styles.discordIconBox}>
                <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.893.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                </svg>
              </div>
              <div>
                <h3 className={styles.discordTitle}>
                  Need Assistance? Connect With 24/7 Discord Support
                </h3>
                <p className={styles.discordSubtitle}>
                  Our Game Masters and technical specialists are ready around the clock to guide you step-by-step through any setup or connection problem.
                </p>
              </div>
            </div>
            <Button href={site.discordUrl} className={styles.discordBtn}>
              Join Discord Support
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
