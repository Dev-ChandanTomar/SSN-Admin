// context.js

import { createContext, useContext, useReducer, useMemo } from "react";
import PropTypes from "prop-types";
import FormDialog from "components/Pop";
import LoginDialog from "components/Pop/login";
import NewFormDialog from "components/NewDialog";
import Loading from "layouts/loading";
import UserTransactionModel from "Models/Transactions";
import Pages from "Models/Routes";
import UserModel from "Models/Administrator";
import TempleModel from "Models/Temples";
import EventModal from "Models/Events";
import CommentModel from "Models/Comment";
import AboutModel from "Models/About";
import PressRelieseModal from "Models/PressReliese";
import VideoGalleryModel from "Models/VideoGallery";
import PhotoGalleryModel from "Models/PhotoGallery";
import LiveUrlModel from "Models/Live";
import CommitteMemberModal from "Models/CommitteMember";
import OrganisationModel from "Models/Organisation";
const SoftUI = createContext(null);

SoftUI.displayName = "SoftUIContext";

// Next Work Dashboard React reducer
function reducer(state, action) {
  switch (action.type) {
    case "MINI_SIDENAV": {
      return { ...state, miniSidenav: action.value };
    }
    case "TRANSPARENT_SIDENAV": {
      return { ...state, transparentSidenav: action.value };
    }
    case "SIDENAV_COLOR": {
      return { ...state, sidenavColor: action.value };
    }
    case "TRANSPARENT_NAVBAR": {
      return { ...state, transparentNavbar: action.value };
    }
    case "FIXED_NAVBAR": {
      return { ...state, fixedNavbar: action.value };
    }
    case "OPEN_CONFIGURATOR": {
      return { ...state, openConfigurator: action.value };
    }
    case "DIRECTION": {
      return { ...state, direction: action.value };
    }
    case "LAYOUT": {
      return { ...state, layout: action.value };
    }
    case "USER": {
      return { ...state, loading: false, user: new UserModel().fromJson(action.value) };
    }

    case "TRANSACTIONS": {
      return {
        ...state,
        loading: false,
        transactions: new UserTransactionModel().fromArray(action.value),
      };
    }
    case "PENDINGWITHDRAW": {
      return {
        ...state,
        loading: false,
        withdrawRequest: new UserTransactionModel().fromArray(action.value),
      };
    }
    case "LOADING": {
      return { ...state, loading: action.value };
    }

    case "USERS": {
      return { ...state, loading: false, users: new UserModel().fromArray(action.value) };
    }

    case "USER_TAB": {
      return {
        ...state,
        loading: false,
        userTab: action.value,
      };
    }

    case "PRODUCTS": {
      return { ...state, loading: false, products: TempleModel.fromArray(action.value) };
    }
    case "COUNT": {
      return { ...state, loading: false, count: action.value };
    }
    case "ABOUTSSN": {
      return { ...state, loading: false, AboutSsn: AboutModel.fromArray(action.value) };
    }
    case "PRESSRELIESE": {
      return { ...state, loading: false, pressreliese: PressRelieseModal.fromArray(action.value) };
    }
    case "VIDEOGALLERY": {
      return { ...state, loading: false, videogallery: VideoGalleryModel.fromArray(action.value) };
    }
    case "PHOTOGALLERY": {
      return { ...state, loading: false, photogallery: PhotoGalleryModel.fromArray(action.value) };
    }
    case "ORGANISATION": {
      return { ...state, loading: false, organisation: OrganisationModel.fromArray(action.value) };
    }
    case "PHOTOGALLERY": {
      return { ...state, loading: false, photogallery: PhotoGalleryModel.fromArray(action.value) };
    }
    case "LIVEURL": {
      return { ...state, loading: false, liveurl: LiveUrlModel.fromArray(action.value) };
    }
    case "COMMITTEMEMBER": {
      return {
        ...state,
        loading: false,
        committemember: CommitteMemberModal.fromArray(action.value),
      };
    }
    case "EVENTS": {
      return { ...state, loading: false, events: EventModal.fromArray(action.value) };
    }
    case "COMMENT": {
      return { ...state, comments: new CommentModel().fromArray(action.value), loading: false };
    }
    case "ROUTES": {
      return { ...state, routes: new Pages().fromArray(action.value), loading: false };
    }
    case "DIALOG": {
      return { ...state, dialog: action.value, loading: false };
    }
    case "START_LOAD": {
      return { ...state, dialog: [], loading: action.value };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

// Next Work Dashboard React context provider
function NextworkControllerProvider({ children }) {
  const initialState = {
    miniSidenav: false,
    transparentSidenav: true,
    sidenavColor: "info",
    transparentNavbar: true,
    fixedNavbar: true,
    openConfigurator: false,
    direction: "ltr",
    layout: "dashboard",
    user: {},
    users: [],
    products: [],
    AboutSsn: [],
    organisation: [],
    count: [],
    pressreliese: [],
    videogallery: [],
    photogallery: [],
    liveurl: [],
    committemember: [],
    events: [],
    withdrawRequest: [],
    transactions: [],
    routes: [],
    comments: [],
    dialog: [],
    userTab: 0,
    loading: false,
  };
  const [controller, dispatch] = useReducer(reducer, initialState);

  const value = useMemo(() => [controller, dispatch], [controller, dispatch]);

  return (
    <SoftUI.Provider value={value}>
      {/* Conditionally render loader */}

      <FormDialog
        open={
          controller.dialog?.length > 0 &&
          controller.dialog?.[0]?.status !== "otp" &&
          controller.dialog?.[0]?.status !== "form"
        }
        setOpen={(v) => {
          setDialog(dispatch, []);
        }}
        data={controller.dialog[0]}
      />

      <LoginDialog
        open={controller.dialog.length > 0 && controller.dialog[0].status === "otp"}
        setOpen={(v) => {
          setDialog(dispatch, []);
        }}
        data={controller.dialog[0]}
      />
      <NewFormDialog
        open={controller.dialog.length > 0 && controller.dialog[0].status === "form"}
        setOpen={(v) => {
          setDialog(dispatch, []);
        }}
        data={controller.dialog[0]}
      />
      {children}
      {controller.loading && <Loading />}
    </SoftUI.Provider>
  );
}

// Next Work Dashboard React custom hook for using context
function useSoftUIController() {
  const context = useContext(SoftUI);

  if (!context) {
    throw new Error("useSoftUIController should be used inside the NextworkControllerProvider.");
  }

  return context;
}

NextworkControllerProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Context module functions
const setMiniSidenav = (dispatch, value) => dispatch({ type: "MINI_SIDENAV", value });
const setTransparentSidenav = (dispatch, value) => dispatch({ type: "TRANSPARENT_SIDENAV", value });
const setSidenavColor = (dispatch, value) => dispatch({ type: "SIDENAV_COLOR", value });
const setTransparentNavbar = (dispatch, value) => dispatch({ type: "TRANSPARENT_NAVBAR", value });
const setFixedNavbar = (dispatch, value) => dispatch({ type: "FIXED_NAVBAR", value });
const setOpenConfigurator = (dispatch, value) => dispatch({ type: "OPEN_CONFIGURATOR", value });
const setDirection = (dispatch, value) => dispatch({ type: "DIRECTION", value });
const setLayout = (dispatch, value) => dispatch({ type: "LAYOUT", value });
const setUser = (dispatch, value) => dispatch({ type: "USER", value });
const setProducts = (dispatch, value) => dispatch({ type: "PRODUCTS", value });
const setAboutSsn = (dispatch, value) => dispatch({ type: "ABOUTSSN", value });
const setPressReliese = (dispatch, value) => dispatch({ type: "PRESSRELIESE", value });
const setVideoGallery = (dispatch, value) => dispatch({ type: "VIDEOGALLERY", value });
const setPhotoGallery = (dispatch, value) => dispatch({ type: "PHOTOGALLERY", value });
const setLiveUrl = (dispatch, value) => dispatch({ type: "LIVEURL", value });
const setCommitteMember = (dispatch, value) => dispatch({ type: "COMMITTEMEMBER", value });
const setOrganisation = (dispatch, value) => dispatch({ type: "ORGANISATION", value });
const setEvents = (dispatch, value) => dispatch({ type: "EVENTS", value });
const setUserDetails = (dispatch, value) => dispatch({ type: "USERSDETAILS", value });
const setUsers = (dispatch, value) => dispatch({ type: "USERS", value });
const setComment = (dispatch, value) => dispatch({ type: "COMMENT", value });
const setRoutes = (dispatch, value) => dispatch({ type: "ROUTES", value });
const setTransactions = (dispatch, value) => dispatch({ type: "TRANSACTIONS", value });
const setWithdrawRequest = (dispatch, value) => dispatch({ type: "PENDINGWITHDRAW", value });
const setLoading = (dispatch, value) => dispatch({ type: "LOADING", value });
const setDialog = (dispatch, value) => dispatch({ type: "DIALOG", value });
const startLoading = (dispatch, value) => dispatch({ type: "START_LOAD", value });
const setUserTab = (dispatch, value) => dispatch({ type: "USER_TAB", value });
const setCount = (dispatch, value) => dispatch({ type: "COUNT", value });

export {
  NextworkControllerProvider,
  useSoftUIController,
  setMiniSidenav,
  setTransparentSidenav,
  setSidenavColor,
  setTransparentNavbar,
  setFixedNavbar,
  setOpenConfigurator,
  setDirection,
  setLayout,
  setUser,
  setUsers,
  setWithdrawRequest,
  setProducts,
  setAboutSsn,
  setOrganisation,
  setPressReliese,
  setVideoGallery,
  setPhotoGallery,
  setLiveUrl,
  setCommitteMember,
  setEvents,
  setTransactions,
  setUserDetails,
  setLoading,
  setRoutes,
  setDialog,
  startLoading,
  setComment,
  setUserTab,
  setCount,
};
