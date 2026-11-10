export type EventKind = 'boss' | 'war' | 'event';
/** day: 0 = Sunday ... 6 = Saturday. time is server time (UTC). */
export interface GameEvent { day: number; time: string; name: string; kind: EventKind; place: string }

export const events: GameEvent[] = [
  { day: 0, time: '18:00', name: 'Guild War: Ashen Keep', kind: 'war', place: 'Ashen Keep' },
  { day: 1, time: '20:00', name: 'Ashen Warden', kind: 'boss', place: 'Cinder Hollow' },
  { day: 2, time: '19:00', name: 'Double EXP Hour', kind: 'event', place: 'All zones' },
  { day: 2, time: '21:00', name: 'Hollow Queen', kind: 'boss', place: 'Webbed Crypt' },
  { day: 3, time: '20:00', name: 'Arena Open Bracket', kind: 'event', place: 'Grand Arena' },
  { day: 4, time: '20:30', name: 'Frostmaw', kind: 'boss', place: 'Glacier Pass' },
  { day: 5, time: '19:00', name: 'Drop Rate Night', kind: 'event', place: 'All zones' },
  { day: 5, time: '22:00', name: 'The Pale King', kind: 'boss', place: 'Sunken Throne' },
  { day: 6, time: '17:00', name: 'Castle Siege', kind: 'war', place: 'Ember Citadel' },
  { day: 6, time: '21:00', name: 'World Boss: Gravemaw', kind: 'boss', place: 'Open world' },
];

export const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export const features = [
  { title: 'Guild Wars', text: 'Fight for keeps and citadels. Owning guilds earn taxes and exclusive hunting grounds.' },
  { title: 'Open PvP', text: 'Flag up in contested zones for bonus rewards. Fall, and your rival takes a share.' },
  { title: 'Crafting', text: 'Gather ore, hides and relics, then forge gear at the Ember Anvil. Every item carries a maker mark.' },
  { title: 'Pet Companions', text: 'Hatch, raise and equip companions that loot, buff and fight beside you.' },
  { title: 'Dungeons', text: 'Party up for timed dungeons with scaling difficulty and weekly bonus loot.' },
  { title: 'Player Market', text: 'A server-wide auction house lets you trade gear and materials safely.' },
];

export const classes = ['Knight', 'Mage', 'Archer', 'Thief'] as const;
export type ClassId = (typeof classes)[number];

export const skills: Record<ClassId, { name: string; type: string; text: string }[]> = {
  Knight: [
    { name: 'Bulwark', type: 'Defense', text: 'Raise your shield to cut incoming damage by 40% for 8 seconds.' },
    { name: 'Crown Breaker', type: 'Attack', text: 'A heavy overhead strike that stuns the target for 2 seconds.' },
    { name: 'Rally Cry', type: 'Buff', text: 'Boosts defense for you and nearby party members.' },
    { name: 'Iron Charge', type: 'Movement', text: 'Dash through enemies, knocking them aside.' },
  ],
  Mage: [
    { name: 'Cinder Bolt', type: 'Attack', text: 'A fast fire bolt that burns the target over time.' },
    { name: 'Frost Veil', type: 'Control', text: 'Freezes a wide area, slowing all enemies inside.' },
    { name: 'Arcane Ward', type: 'Defense', text: 'Absorbs damage using your mana pool.' },
    { name: 'Meteor Fall', type: 'Ultimate', text: 'Calls a meteor after a short delay. Massive area damage.' },
  ],
  Archer: [
    { name: 'Piercing Shot', type: 'Attack', text: 'An arrow that passes through up to three enemies.' },
    { name: 'Hawk Eye', type: 'Buff', text: 'Raises critical chance and range for 12 seconds.' },
    { name: 'Snare Trap', type: 'Control', text: 'Place a trap that roots the first enemy to step on it.' },
    { name: 'Rain of Embers', type: 'Ultimate', text: 'Showers a target zone with burning arrows.' },
  ],
  Thief: [
    { name: 'Shadow Step', type: 'Movement', text: 'Teleport behind your target and gain a short stealth.' },
    { name: 'Venom Edge', type: 'Attack', text: 'Coats blades in poison that stacks up to five times.' },
    { name: 'Smoke Bomb', type: 'Defense', text: 'Drops a smoke cloud that makes you untargetable briefly.' },
    { name: 'Death Mark', type: 'Ultimate', text: 'Marks a target. Finishing blows deal triple damage.' },
  ],
};

export const bosses = [
  { name: 'Ashen Warden', level: 45, zone: 'Cinder Hollow', respawn: 'Mondays', drops: ['Warden Plate', 'Ember Core'], text: 'A burning sentinel that guards the old forge road.' },
  { name: 'Hollow Queen', level: 58, zone: 'Webbed Crypt', respawn: 'Tuesdays', drops: ['Silk Mantle', 'Queen Fang'], text: 'Spawns broods that swarm anyone who lingers.' },
  { name: 'Frostmaw', level: 66, zone: 'Glacier Pass', respawn: 'Thursdays', drops: ['Rime Greaves', 'Frost Rune'], text: 'A colossal wolf whose howl freezes the whole party.' },
  { name: 'The Pale King', level: 78, zone: 'Sunken Throne', respawn: 'Fridays', drops: ['Pale Crown', 'Throne Shard'], text: 'A drowned monarch who commands the tides.' },
  { name: 'Gravemaw', level: 90, zone: 'Open world', respawn: 'Saturdays', drops: ['Maw Relic', 'Mythic Chest'], text: 'The server-wide world boss. Every guild wants the last hit.' },
];
