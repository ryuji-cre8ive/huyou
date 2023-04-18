import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'
import { Avatar, IconButton } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import SearchIcon from '@mui/icons-material/Search'
import AccountCircle from '@mui/icons-material/AccountCircle'
import React from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'
import router from 'next/router'
import Link from 'next/link'

interface Props {
  onAccountButtonClick: () => boolean
}

const AccountButton = ({ onAccountButtonClick }: Props) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState<null | HTMLElement>(null)
  const [profImage, setProfImage] = React.useState<string>('')
  const { data: session } = useSession()
  React.useEffect(() => {
    setProfImage(String(session?.user.image))
  }, [session?.user.image])
  const isMenuOpen = Boolean(anchorEl)
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    if (onAccountButtonClick()) {
      setAnchorEl(event.currentTarget)
    }
  }

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    handleMobileMenuClose()
  }

  const handleProfileMenu = () => {
    setAnchorEl(null)
    handleMobileMenuClose()
  }

  const handleLogout = () => {
    signOut()
    setAnchorEl(null)
    handleMobileMenuClose()
  }

  const menuId = 'primary-search-account-menu'
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleProfileMenu}>
        <Link href={'/users/' + session?.user.id}>プロフィール</Link>
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <Link href={'/users/account/' + session?.user.id}>マイページ</Link>
      </MenuItem>
      <MenuItem sx={{ color: 'red' }} onClick={handleLogout}>
        ログアウト
      </MenuItem>
    </Menu>
  )

  const mobileMenuId = 'primary-search-account-menu-mobile'
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size='large'
          aria-label='account of current user'
          aria-controls='primary-search-account-menu'
          aria-haspopup='true'
          color='inherit'
        >
          <AccountCircle />
        </IconButton>
        <p>プロフィール</p>
      </MenuItem>
    </Menu>
  )

  return (
    <>
      <IconButton
        size='large'
        edge='end'
        aria-label='account of current user'
        aria-controls={menuId}
        aria-haspopup='true'
        onClick={handleProfileMenuOpen}
        color='inherit'
      >
        <Avatar src={profImage} />
      </IconButton>
      {renderMenu}
      {renderMobileMenu}
    </>
  )
}

export default AccountButton
