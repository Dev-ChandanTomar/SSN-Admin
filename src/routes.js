import React, { lazy } from "react";
import Transactions from "layouts/Transaction";
import {
  BlurOn,
  DashboardCustomize,
  Diversity3,
  EventAvailable,
  Groups2,
  InsertPhoto,
  LiveTv,
  Newspaper,
  Person,
  TempleHindu,
  Videocam,
  VolunteerActivism,
} from "@mui/icons-material";
import CommentIcon from "@mui/icons-material/Comment";
import InfoIcon from "@mui/icons-material/Info";
import AllComments from "layouts/Royality";
import TempleDetails from "layouts/TempleDetails";
import EventDetails from "layouts/EventDetail";
import TempleFormData from "layouts/Temples/temple_form";
import AboutUs from "layouts/About";
import Users from "layouts/users";
import AboutFormData from "layouts/About/about_form";
import PressReliese from "layouts/PressReliese";
import PressRelieseForm from "layouts/PressReliese/press_form";
import VideoGallery from "layouts/VideoGallery";
import VideoGalleryForm from "layouts/VideoGallery/video_form";
import PressRelieseDetail from "layouts/PressrelieseDetail";
import PhotoGallery from "layouts/PhotoGallery";
import PhotoGalleryFrom from "layouts/PhotoGallery/Photo_form";
import LiveUrl from "layouts/Live";
import LiveUrlForm from "layouts/Live/live_form";
import CommitteMember from "layouts/CommitteMember";
import CommitteMemberForm from "layouts/CommitteMember/committe_form";
import SignIn from "layouts/authentication/sign-in";
import Organisation from "layouts/Organisation";
import OrganisationForm from "layouts/Organisation/organisation_form";
const Dashboard = lazy(() => import("layouts/dashboard"));
const Profile = lazy(() => import("layouts/profile"));
const Events = lazy(() => import("layouts/Events"));
const Products = lazy(() => import("layouts/Temples"));
const CreateMembers = lazy(() => import("layouts/CreateMember"));

const routes = [
  // admin accessable routes
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    auth: "admin",
    route: "/dashboard",
    icon: <DashboardCustomize size="12px" />,
    component: <Dashboard />,
    noCollapse: true,
  },
  {
    type: "route",
    name: "Temple-Details",
    Key: "Temple-Details",
    route: "/temple-details/:title",
    auth: "admin",
    component: <TempleDetails />,
    noCollapse: false,
  },
  {
    type: "route",
    name: "Event-Details",
    Key: "Event-Details",
    route: "/event-details/:id",
    auth: "admin",
    component: <EventDetails />,
    noCollapse: false,
  },
  {
    type: "collapse",
    name: "Users",
    auth: "admin",
    key: "users",
    route: "/users",
    icon: <Groups2 size="12px" />,
    component: <Users />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Committe-Member",
    auth: "admin",
    key: "committemember",
    route: "/committemember",
    icon: <Diversity3 size="12px" />,
    component: <CommitteMember />,
    noCollapse: true,
  },
  {
    type: "route",
    name: "Add-committe",
    key: "Add-committe",
    auth: "admin",
    route: "/add-committe/:id",
    icon: <InfoIcon size="12px" />,
    component: <CommitteMemberForm />,
    noCollapse: true,
  },
  {
    type: "collapse",
    key: "donations",
    name: "Donations",
    auth: "admin",
    route: "/donations",
    icon: <VolunteerActivism size="12px" />,
    component: <Transactions />,
    noCollapse: true,
  },

  {
    type: "route",
    name: "Create Staff",
    key: "create-staff",
    auth: "admin",
    route: "/create-staff",
    icon: <Diversity3 size="12px" />,
    component: <CreateMembers />,
    noCollapse: true,
  },

  {
    type: "route",
    name: "Profile",
    key: "profile",
    route: "/profile",
    auth: "admin",
    icon: <Person size="12px" />,
    component: <Profile />,
    noCollapse: true,
  },

  {
    type: "collapse",
    name: "Live",
    key: "live",
    auth: "admin",
    route: "/live",
    icon: <LiveTv size="12px" />,
    component: <LiveUrl />,
    noCollapse: true,
  },
  {
    type: "route",
    name: "Add-live",
    key: "Add-live",
    auth: "admin",
    route: "/add-live/:id",
    icon: <InfoIcon size="12px" />,
    component: <LiveUrlForm />,
    noCollapse: true,
  },
  {
    type: "route",
    name: "SignIn",
    Key: "signin",
    auth: null,
    route: "/",
    component: <SignIn />,
    noCollapse: false,
  },
  { type: "title", title: "sanatan sewanyas", key: "sanatansewanyas" },

  {
    type: "collapse",
    name: "About",
    key: "about",
    auth: "admin",
    route: "/about",
    icon: <InfoIcon size="12px" />,
    component: <AboutUs />,
    noCollapse: true,
  },

  {
    type: "collapse",
    name: "Organisation",
    key: "organisation",
    auth: "admin",
    route: "/organisation",
    icon: <BlurOn size="12px" />,
    component: <Organisation />,
    noCollapse: true,
  },
  {
    type: "route",
    name: "Form",
    key: "form",
    auth: "admin",
    route: "/organisation-form/:id",
    icon: <EventAvailable size="12px" />,
    component: <OrganisationForm />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Temples",
    key: "temples",
    auth: "admin",
    route: "/temples",
    icon: <TempleHindu size="12px" />,
    component: <Products />,
    noCollapse: true,
  },

  {
    type: "collapse",
    name: "Events",
    key: "events",
    auth: "admin",
    route: "/events",
    icon: <EventAvailable size="12px" />,
    component: <Events />,
    noCollapse: true,
  },

  {
    type: "collapse",
    name: "Comment",
    key: "comment",
    auth: "admin",
    route: "/comment",
    icon: <CommentIcon size="12px" />,
    component: <AllComments />,
    noCollapse: true,
  },
  {
    type: "route",
    name: "Form",
    key: "form",
    auth: "admin",
    route: "/temple-form/:id",
    icon: <EventAvailable size="12px" />,
    component: <TempleFormData />,
    noCollapse: true,
  },
  {
    type: "route",
    name: "Form",
    key: "form",
    auth: "admin",
    route: "/about-form/:id",
    icon: <EventAvailable size="12px" />,
    component: <AboutFormData />,
    noCollapse: true,
  },
  { type: "title", title: "Media", key: "media" },
  {
    type: "collapse",
    name: "Press-Reliese",
    key: "pressreliese",
    auth: "admin",
    route: "/pressreliese",
    icon: <Newspaper size="12px" />,
    component: <PressReliese />,
    noCollapse: true,
  },
  {
    type: "route",
    name: "Add-Reliese",
    key: "Add-Reliese",
    auth: "admin",
    route: "/add-Reliese/:id",
    icon: <InfoIcon size="12px" />,
    component: <PressRelieseForm />,
    noCollapse: true,
  },
  {
    type: "route",
    name: "PressReliese-Details",
    Key: "PressReliese-Details",
    route: "/pressreliese-details/:title",
    auth: "admin",
    component: <PressRelieseDetail />,
    noCollapse: false,
  },
  {
    type: "collapse",
    name: "Photo-Gallery",
    key: "photogallery",
    auth: "admin",
    route: "/photogallery",
    icon: <InsertPhoto size="12px" />,
    component: <PhotoGallery />,
    noCollapse: true,
  },
  {
    type: "route",
    name: "Add-Photo",
    key: "Add-Photo",
    auth: "admin",
    route: "/add-Photo/:id",
    icon: <InfoIcon size="12px" />,
    component: <PhotoGalleryFrom />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Video-Gallery",
    key: "videogallery",
    auth: "admin",
    route: "/videogallery",
    icon: <Videocam size="12px" />,
    component: <VideoGallery />,
    noCollapse: true,
  },
  {
    type: "route",
    name: "Add-Video",
    key: "Add-Video",
    auth: "admin",
    route: "/add-Video/:id",
    icon: <InfoIcon size="12px" />,
    component: <VideoGalleryForm />,
    noCollapse: true,
  },
];
export default routes;
