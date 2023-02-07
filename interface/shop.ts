export interface ShopItem {
  id: string
  title: string
  image: string
  prise: number
  description: string
  userID: string
  user: User
  good: number
  comments: Comment[]
}

export interface User {
  id: string
  name: string
  image: string
  assessment: number
  ShopItem: [ShopItem]
}

export interface Comment {
  id: string
  content: string
  userID: string
  shopItemID: string
}
