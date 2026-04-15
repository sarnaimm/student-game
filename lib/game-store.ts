// Game data types and initial state
export interface PlayerProfile {
  name: string
  country: string
  university: string
  yearOfStudy: string
  interests: string[]
  avatar: {
    bodyColor: string
    expression: string
    accessory: string | null
    clothing: string | null
  }
}

export interface Task {
  id: string
  title: string
  description: string
  category: 'social' | 'wellness' | 'academic' | 'cultural'
  coins: number
  completed: boolean
  difficulty: 'easy' | 'medium' | 'hard'
}

export interface ShopItem {
  id: string
  name: string
  type: 'clothing' | 'furniture' | 'wallpaper' | 'accessory'
  price: number
  image: string
  owned: boolean
  equipped: boolean
}

export interface RoomItem {
  id: string
  itemId: string
  position: { x: number; y: number }
}

export interface GameState {
  profile: PlayerProfile | null
  coins: number
  tasks: Task[]
  shopItems: ShopItem[]
  roomItems: RoomItem[]
  equippedWallpaper: string
  dailyStreak: number
  lastLoginDate: string | null
}

export const defaultTasks: Task[] = [
  {
    id: '1',
    title: 'Say Hi to Someone New',
    description: 'Introduce yourself to a classmate or neighbor you haven\'t talked to before.',
    category: 'social',
    coins: 50,
    completed: false,
    difficulty: 'easy'
  },
  {
    id: '2',
    title: 'Join a Study Group',
    description: 'Find or create a study group for one of your courses.',
    category: 'academic',
    coins: 100,
    completed: false,
    difficulty: 'medium'
  },
  {
    id: '3',
    title: 'Attend a Campus Event',
    description: 'Go to a student organization meeting, cultural event, or campus activity.',
    category: 'cultural',
    coins: 150,
    completed: false,
    difficulty: 'medium'
  },
  {
    id: '4',
    title: 'Share Your Culture',
    description: 'Share something about your home country with a new friend (food, music, tradition).',
    category: 'cultural',
    coins: 200,
    completed: false,
    difficulty: 'hard'
  },
  {
    id: '5',
    title: 'Take a Mindful Walk',
    description: 'Take a 15-minute walk around campus or your neighborhood, observing your surroundings.',
    category: 'wellness',
    coins: 75,
    completed: false,
    difficulty: 'easy'
  },
  {
    id: '6',
    title: 'Video Call Home',
    description: 'Have a video call with family or friends from home.',
    category: 'wellness',
    coins: 50,
    completed: false,
    difficulty: 'easy'
  },
  {
    id: '7',
    title: 'Try Local Food',
    description: 'Try a local dish or restaurant you\'ve never been to before.',
    category: 'cultural',
    coins: 100,
    completed: false,
    difficulty: 'medium'
  },
  {
    id: '8',
    title: 'Ask for Help',
    description: 'Ask a professor, TA, or classmate for help with something you\'re struggling with.',
    category: 'academic',
    coins: 125,
    completed: false,
    difficulty: 'medium'
  },
  {
    id: '9',
    title: 'Invite Someone for Coffee',
    description: 'Invite a classmate or acquaintance for coffee or a meal.',
    category: 'social',
    coins: 175,
    completed: false,
    difficulty: 'hard'
  },
  {
    id: '10',
    title: 'Join an Online Community',
    description: 'Join a Discord, WhatsApp group, or online community related to your interests.',
    category: 'social',
    coins: 75,
    completed: false,
    difficulty: 'easy'
  }
]

export const defaultShopItems: ShopItem[] = [
  // Furniture
  { id: 'f1', name: 'Cozy Bookshelf', type: 'furniture', price: 200, image: 'bookshelf', owned: true, equipped: true },
  { id: 'f2', name: 'Warm Campfire', type: 'furniture', price: 300, image: 'campfire', owned: true, equipped: true },
  { id: 'f3', name: 'Study Desk', type: 'furniture', price: 350, image: 'desk', owned: false, equipped: false },
  { id: 'f4', name: 'Plant Friend', type: 'furniture', price: 150, image: 'plant', owned: false, equipped: false },
  { id: 'f5', name: 'Cozy Rug', type: 'furniture', price: 250, image: 'rug', owned: false, equipped: false },
  { id: 'f6', name: 'Fairy Lights', type: 'furniture', price: 175, image: 'lights', owned: false, equipped: false },
  { id: 'f7', name: 'Bean Bag', type: 'furniture', price: 225, image: 'beanbag', owned: false, equipped: false },
  
  // Wallpapers
  { id: 'w1', name: 'Forest Theme', type: 'wallpaper', price: 0, image: 'forest', owned: true, equipped: true },
  { id: 'w2', name: 'Ocean Waves', type: 'wallpaper', price: 500, image: 'ocean', owned: false, equipped: false },
  { id: 'w3', name: 'Mountain View', type: 'wallpaper', price: 500, image: 'mountain', owned: false, equipped: false },
  { id: 'w4', name: 'City Lights', type: 'wallpaper', price: 600, image: 'city', owned: false, equipped: false },
  { id: 'w5', name: 'Starry Night', type: 'wallpaper', price: 550, image: 'stars', owned: false, equipped: false },
  
  // Clothing
  { id: 'c1', name: 'Cozy Scarf', type: 'clothing', price: 100, image: 'scarf', owned: false, equipped: false },
  { id: 'c2', name: 'Winter Hat', type: 'clothing', price: 125, image: 'hat', owned: false, equipped: false },
  { id: 'c3', name: 'Cool Glasses', type: 'clothing', price: 150, image: 'glasses', owned: false, equipped: false },
  { id: 'c4', name: 'Bow Tie', type: 'clothing', price: 100, image: 'bowtie', owned: false, equipped: false },
  { id: 'c5', name: 'Crown', type: 'clothing', price: 300, image: 'crown', owned: false, equipped: false },
  
  // Accessories
  { id: 'a1', name: 'Tiny Backpack', type: 'accessory', price: 175, image: 'backpack', owned: false, equipped: false },
  { id: 'a2', name: 'Coffee Cup', type: 'accessory', price: 75, image: 'coffee', owned: false, equipped: false },
  { id: 'a3', name: 'Book', type: 'accessory', price: 100, image: 'book', owned: false, equipped: false },
  { id: 'a4', name: 'Headphones', type: 'accessory', price: 200, image: 'headphones', owned: false, equipped: false },
]

export const characterColors = [
  { id: 'blue', name: 'Ocean Blue', color: '#5DADE2' },
  { id: 'green', name: 'Forest Green', color: '#58D68D' },
  { id: 'pink', name: 'Blossom Pink', color: '#F1948A' },
  { id: 'yellow', name: 'Sunny Yellow', color: '#F7DC6F' },
  { id: 'purple', name: 'Lavender', color: '#BB8FCE' },
  { id: 'orange', name: 'Sunset Orange', color: '#F0B27A' },
]

export const characterExpressions = [
  { id: 'happy', name: 'Happy', emoji: '😊' },
  { id: 'excited', name: 'Excited', emoji: '😄' },
  { id: 'calm', name: 'Calm', emoji: '😌' },
  { id: 'sleepy', name: 'Sleepy', emoji: '😴' },
  { id: 'cool', name: 'Cool', emoji: '😎' },
]

export const interestOptions = [
  'Gaming', 'Music', 'Reading', 'Sports', 'Art', 'Cooking', 
  'Movies', 'Travel', 'Photography', 'Dancing', 'Technology', 
  'Fashion', 'Nature', 'Fitness', 'Languages', 'Anime'
]
