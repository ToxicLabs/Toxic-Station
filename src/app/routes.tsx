import { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { useNavigate, useRoutes } from "react-router-dom"

import { ReactComponent as HistoryIcon } from "styles/images/menu/History.svg"
import { ReactComponent as SwapIcon } from "styles/images/menu/Swap.svg"
import { ReactComponent as StakeIcon } from "styles/images/menu/Stake.svg"
import { ReactComponent as GovernanceIcon } from "styles/images/menu/Governance.svg"
import { ReactComponent as ContractIcon } from "styles/images/menu/Contract.svg"
import { ReactComponent as NFTIcon } from "styles/images/menu/NFT.svg"
import LaptopChromebookIcon from '@mui/icons-material/LaptopChromebook';
import AutoAwesomeMosaicIcon from '@mui/icons-material/AutoAwesomeMosaic';
/* menu */
import History from "pages/history/History"
import NFT from "pages/nft/NFT"
import Dashboard from "pages/dashboard/Dashboard"
import Stake from "pages/stake/Stake"
import Governance from "pages/gov/Governance"
import Projects from "pages/projects/Projects"
import Home from "pages/home/Home"
import Contract from "pages/contract/Contract"
import {useChainID } from "data/wallet"
/* details */
import ValidatorDetails from "pages/stake/ValidatorDetails"
import ProposalDetails from "pages/gov/ProposalDetails"
import QamarFaucet from "pages/qamar/faucet/components/Home"
/* txs */
import TransferCW721Tx from "txs/wasm/TransferCW721Tx"
import SwapTx from "txs/swap/SwapTx"
import StakeTx from "txs/stake/StakeTx"
import WithdrawRewards from "txs/stake/WithdrawRewards"
import WithdrawCommissionTx from "txs/stake/WithdrawCommissionTx"
import SubmitProposalTx from "txs/gov/SubmitProposalTx"
import DepositTx from "txs/gov/DepositTx"
import VoteTx from "txs/gov/VoteTx"
import StoreCodeTx from "txs/wasm/StoreCodeTx"
import InstantiateContractTx from "txs/wasm/InstantiateContractTx"
//import ExecuteContractTx from "txs/wasm/ExecuteContractTx"
//import MigrateContractTx from "txs/wasm/MigrateContractTx"
import UpdateAdminContractTx from "txs/wasm/UpdateAdminContractTx"
import SignMultisigTxPage from "pages/multisig/SignMultisigTxPage"
import PostMultisigTxPage from "pages/multisig/PostMultisigTxPage"


/* auth */
import Auth from "auth/modules/Auth"
//import ManageNetworksPage from "auth/networks/ManageNetworksPage"
//import AddNetworkPage from "auth/networks/AddNetworkPage"

/* settings */
import Settings from "pages/Settings"

/* labs */
import Labs from "pages/labs/Labs"

/* 404 */
import NotFound from "pages/NotFound"
import DonateAllVestingTokensTx from "txs/stake/DonateAllVestingTokensTx"

const ICON_SIZE = { width: 25, height: 25 }



export const useNav = () => {
  const { t } = useTranslation()
  const chainID = useChainID()
  let menu;
  if(chainID !== ""){
    menu = [
      {
        path: "/",
        element: <Home/>,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
        title: t("Dashboard"),
        icon: <AutoAwesomeMosaicIcon {...ICON_SIZE} />,
      },
      {
        path: "/Swap",
        element: <SwapTx />,
        title: t("Swap"),
        icon: <SwapIcon {...ICON_SIZE} />,
      },
      {
        path: "/history",
        element: <History />,
        title: t("History"),
        icon: <HistoryIcon {...ICON_SIZE} />,
      },
      {
        path: "/stake",
        element: <Stake />,
        title: t("Stake"),
        icon: <StakeIcon {...ICON_SIZE} />,
      },
      {
        path: "/gov",
        element: <Governance />,
        title: t("Governance"),
        icon: <GovernanceIcon {...ICON_SIZE} />,
      },
      {
        path: "/contract",
        element: <Contract />,
        title: t("Contract"),
        icon: <ContractIcon {...ICON_SIZE} />,
      },
      {
        path: "/nft",
        element: <NFT />,
        title: t("NFT"),
        icon: <NFTIcon {...ICON_SIZE} />,
      },
      {
        path: "/projects",
        element: <Projects/>,
        title: t("Projects"),
        icon: <LaptopChromebookIcon {...ICON_SIZE} />,
      }
    ]
  }else{
    menu = [
      {
        path: "/",
        element: <Home/>,
      },
      {
        path: "/Swap",
        element: <SwapTx />,
        title: t("Swap"),
        icon: <SwapIcon {...ICON_SIZE} />,
      },
      {
        path: "/history",
        element: <History />,
        title: t("History"),
        icon: <HistoryIcon {...ICON_SIZE} />,
      },
      {
        path: "/stake",
        element: <Stake />,
        title: t("Stake"),
        icon: <StakeIcon {...ICON_SIZE} />,
      },
      {
        path: "/gov",
        element: <Governance />,
        title: t("Governance"),
        icon: <GovernanceIcon {...ICON_SIZE} />,
      },
      {
        path: "/contract",
        element: <Contract />,
        title: t("Contract"),
        icon: <ContractIcon {...ICON_SIZE} />,
      }
    ]
  }
  

  const routes = [
    /* pages */
    ...menu,
    { path: "/validator/:address", element: <ValidatorDetails /> },
    { path: "/proposal/:chain/:id", element: <ProposalDetails /> },

    /* multisig */
    { path: "/multisig/sign", element: <SignMultisigTxPage /> },
    { path: "/multisig/post", element: <PostMultisigTxPage /> },

    /* txs */
    { path: "/nft/transfer", element: <TransferCW721Tx /> },
    { path: "/stake/:address", element: <StakeTx /> },
    { path: "/rewards", element: <WithdrawRewards /> },
    { path: "/commission", element: <WithdrawCommissionTx /> },
    { path: "/proposal/new", element: <SubmitProposalTx /> },
    { path: "/proposal/:chain/:id/deposit", element: <DepositTx /> },
    { path: "/proposal/:chain/:id/vote", element: <VoteTx /> },
    { path: "/contract/instantiate", element: <InstantiateContractTx /> },
    { path: "/contract/store", element: <StoreCodeTx /> },
    //{ path: "/contract/execute/:contract", element: <ExecuteContractTx /> },
    //{ path: "/contract/migrate/:contract", element: <MigrateContractTx /> },
    {
      path: "/contract/updateadmin/:contract",
      element: <UpdateAdminContractTx />,
    },
    { path: "/donate", element: <DonateAllVestingTokensTx /> },

    /* auth */
    { path: "/auth/*", element: <Auth /> },
    //{ path: "/networks", element: <ManageNetworksPage /> },
    //{ path: "/network/new", element: <AddNetworkPage /> },
    { path: "/settings", element: <Settings /> },
    { path: "/labs", element: <Labs /> },
    { path: "/qamarfaucet", element: <QamarFaucet/> },
    
    /* dev */

    /* 404 */
    { path: "*", element: <NotFound /> },
  ]

  return { menu, element: useRoutes(routes) }
}

/* helpers */
export const useGoBackOnError = ({ error }: QueryState) => {
  const navigate = useNavigate()
  useEffect(() => {
    if (error) navigate("..", { replace: true })
  }, [error, navigate])
}
