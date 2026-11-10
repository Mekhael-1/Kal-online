export interface ServerStats { online: number; accounts: number; uptime: number; guilds: number }
export const mockStats: ServerStats = { online: 1248, accounts: 48392, uptime: 99.98, guilds: 312 };

export type PlayerClass = 'Knight' | 'Mage' | 'Archer' | 'Thief';
export interface Player { name: string; cls: PlayerClass; guild: string; level: number; pvp: number }

const names = [
  'Valkyr', 'Nightshade', 'Ironveil', 'Emberfall', 'Duskblade',
  'Moonreaver', 'Gravecall', 'Ashborn', 'Stormwarden', 'Hexweaver',
  'Thornhide', 'Frostbane', 'Cinderlord', 'Voidwalker', 'Sunscar',
  'Wraithkey', 'Bloodoak', 'Grimlock', 'Starfallen', 'Oathbreaker',
  'Dawnguard', 'Runecaller', 'Shadowmend', 'Kestrel', 'Blackthorn'
];

const classes: PlayerClass[] = ['Knight', 'Mage', 'Archer', 'Thief'];
const guilds = ['Iron Covenant', 'Ember Court', 'Pale Vigil', 'Nightfall'];

export const players: Player[] = names.map((name, i) => ({
  name,
  cls: classes[i % 4],
  guild: guilds[(i * 3) % 4],
  level: 99 - Math.floor(i * 1.4),
  pvp: ((i * 7919) % 997) * 4 + 300,
}));

export const classColor: Record<PlayerClass, string> = {
  Knight: '#c8963e',
  Mage: '#e0702a',
  Archer: '#8aa66a',
  Thief: '#a05a7a',
};

export interface GuildRank {
  name: string;
  leader: string;
  territory: string;
  members: number;
  score: number;
  level: number;
}

export const guildRankings: GuildRank[] = [
  { name: 'Iron Covenant', leader: 'Valkyr', territory: 'Ashen Keep', members: 48, score: 142800, level: 10 },
  { name: 'Ember Court', leader: 'Ironveil', territory: 'Ember Citadel', members: 45, score: 129500, level: 9 },
  { name: 'Pale Vigil', leader: 'Nightshade', territory: 'Sunken Throne', members: 42, score: 114200, level: 9 },
  { name: 'Nightfall', leader: 'Duskblade', territory: 'Cinder Hollow', members: 39, score: 98400, level: 8 },
  { name: 'Blood Oath', leader: 'Hexweaver', territory: 'Neutral Lands', members: 35, score: 82100, level: 7 },
  { name: 'Glacier Guard', leader: 'Frostbane', territory: 'Glacier Pass', members: 32, score: 71500, level: 7 },
  { name: 'Shadow Syndicate', leader: 'Wraithkey', territory: 'Webbed Crypt', members: 30, score: 64200, level: 6 },
  { name: 'Sunken Crown', leader: 'Sunscar', territory: 'None', members: 28, score: 53900, level: 6 },
];
