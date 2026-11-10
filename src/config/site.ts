/** One place to edit branding, links and media. */
export const site = {
  name: 'Kal Online',
  tagline: 'Forge your legend in a realm of ash and gold.',
  description:
    'A free-to-play dark fantasy MMORPG. Gather your guild, claim the contested lands and write your name in the rankings.',

  // Replace with your own file, e.g. '/media/hero.mp4' (put it in /public/media).
  heroVideo: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
  heroPoster: '',

  discordUrl: 'https://discord.gg/your-invite', // <- replace with your invite
  serverTime: 'UTC',
  serverStatus: 'Online',
  serverVersion: 'v2.4.1',
};

export type SectionId =
  | 'home'
  | 'download'
  | 'rankings'
  | 'schedule'
  | 'wiki'
  | 'donate'
  | 'vote'
  | 'features'
  | 'classes'
  | 'news';

export interface NavLinkItem {
  to: string;
  label: string;
  id?: SectionId;
}

export const navLinks: readonly NavLinkItem[] = [
  { to: '/', label: 'Home', id: 'home' },
  { to: '/download', label: 'Download', id: 'download' },
  { to: '/rankings', label: 'Rankings', id: 'rankings' },
  { to: '/schedule', label: 'Schedule', id: 'schedule' },
  { to: '/wiki', label: 'Wiki', id: 'wiki' },
  { to: '/donate', label: 'Donate', id: 'donate' },
  { to: '/vote', label: 'Vote Rewards', id: 'vote' },
] as const;

/** Client download mirrors. Replace each url with your real link. */
export const downloads = [
  { id: 'gdrive', name: 'Google Drive', note: 'Recommended. High speed global CDN.', size: '4.2 GB', url: '#' },
  { id: 'mega', name: 'Mega Mirror', note: 'Backup cloud mirror with fast resume support.', size: '4.2 GB', url: '#' },
  { id: 'mediafire', name: 'MediaFire', note: 'Direct browser download without account required.', size: '4.2 GB', url: '#' },
  { id: 'torrent', name: 'Torrent (.torrent)', note: 'P2P high-bandwidth download for slow connections.', size: '4.2 GB', url: '#' },
] as const;
