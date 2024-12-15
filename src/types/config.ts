export type Game = {
  games: {
    gameclass: string
    playerName: string
    playerLevel: string
    avatar: string
    gameName: string
    gameIcon: string
    gameUID: string
    gameServer: string
    gameActive: { value: number; label: string }[]
  }[]
}

export type Footer = {
  icp: string
  footername: string
  footerlink: string
  beian_enabled: boolean
  beian_link: string
  beian_imgSrc: string
  beian_text: string
}

export type Config = {
  playerId: number
  backgroundImg: string
}

export type Header = {
  title: string
}

export type Me = {
  name: string
  avatar: string
  introduction: string
  socialLinks: { href: string; title: string; icon: string }[]
}
