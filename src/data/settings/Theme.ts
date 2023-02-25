import { useCallback } from "react"
import { atom, useRecoilState, useRecoilValue } from "recoil"
import BigNumber from "bignumber.js"
import { always } from "ramda"
import themes, { Theme } from "styles/themes/themes"
import { DefaultTheme, SettingKey } from "utils/localStorage"
import { getLocalSetting, setLocalSetting } from "utils/localStorage"
import { debug } from "utils/env"
import { useAddress, useChainID, useNetworkName } from "data/wallet"
import { calcDelegationsTotal, useDelegations } from "../queries/staking"
import ToxicIcon from "styles/images/menu/ToxicLabsLogo.svg"
import valentinesImage1 from "styles/themes/Valentinesday/valentinesImage1.png"
import valentinesImage2 from "styles/themes/Valentinesday/valentinesImage2.png"
import valentinesImage3 from "styles/themes/Valentinesday/valentinesImage3.png"
import valentinesImage4 from "styles/themes/Valentinesday/valentinesImage4.png"


export const themeNameState = atom({
  key: "themeName",
  default: getLocalSetting<Theme["name"]>(SettingKey.Theme),
})

export const useFindTheme = () => {
  return (name: string) => {
    const item = themes.find((theme) => theme.name === name)
    if (!item) return DefaultTheme
    return item
  }
}

export const useTheme = () => {
  const name = useRecoilValue(themeNameState)
  const find = useFindTheme()
  return find(name)
}

export const useThemeFavicon = () => {
  const { favicon } = useTheme()
  return favicon
}

export const useThemeAnimation = () => {
  const { animation } = useTheme()
  return animation
}

export const useThemeState = () => {
  const [prevName, setThemeName] = useRecoilState(themeNameState)
  const findTheme = useFindTheme()
  const prevTheme = findTheme(prevName)
  const validate = useValidateTheme()

  

  const set = useCallback(
    (nextTheme: Theme) => {
      if (!validate(nextTheme)) set(DefaultTheme)
      if (prevTheme.name) document.body.classList.remove(prevTheme.name)
      if (nextTheme.name) document.body.classList.add(nextTheme.name)
      if(nextTheme.name == "valentines"){
        const bgImagesValentines = [
          valentinesImage1,
          valentinesImage2,
          valentinesImage3,
          valentinesImage4
        ]
        const bgImageValentines = bgImagesValentines[Math.floor(Math.random()*bgImagesValentines.length)];
          document.body.style.backgroundImage = "url("+bgImageValentines+")";
          document.body.style.backgroundSize = "100%";
      }
      /*
      if(nextTheme.name == "toxic"){
        const bgImagesToxic = [
          toxicImage1,
          toxicImage2,
          toxicImage3,
          toxicImage4,
          toxicImage5
        ]
        const bgImageToxic = bgImagesToxic[Math.floor(Math.random()*bgImagesToxic.length)];
          document.body.style.backgroundImage = "url("+bgImageToxic+")";
          document.body.style.backgroundSize = "100%";
      }
      */
      
      setFavicon(ToxicIcon)
      setThemeName(nextTheme.name)
      setLocalSetting<Theme["name"]>(SettingKey.Theme, nextTheme.name)
    },
    [prevTheme, setThemeName, validate]
  )

  return [prevTheme, set] as const
}

/* validate */
export const validateTheme = (staked: string, theme?: Theme) => {
  const item = themes.find((item) => item.name === theme?.name)
  if (!item) return false
  return new BigNumber(staked).gte(item.unlock)
}

export const useValidateTheme = () => {
  const networkName = useNetworkName()
  const chainID = useChainID()
  const address = useAddress()
  const { data: delegations } = useDelegations(chainID)
  if (debug.theme || networkName !== "mainnet") return always(true)
  if (!address || !delegations) return always(true)
  const staked = calcDelegationsTotal(delegations)
  return (theme: Theme) => validateTheme(staked, theme)
}

/* favicon */
const setFavicon = (href: string) => {
  const favicon = document.getElementById("favicon") as HTMLLinkElement
  favicon.href = href
}
