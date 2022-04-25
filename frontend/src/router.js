import { createRouter, createWebHistory } from "vue-router";

import Signup from "./pages/Signup.vue";
import Login from "./pages/Login.vue";
import Home from "./pages/Home.vue";
import EditPost from "./pages/EditPost.vue";
import UserProfile from "./pages/UserProfile.vue";
import AllProfiles from "./pages/AllProfiles.vue";
import DashBord from "./pages/DashBord.vue";
import UpdateFromAdmin from "./pages/UpdateFromAdmin.vue";
import UpdateUser from "./pages/UpdateUser.vue";
const routes = [
  // Chemin vers le portail pour s'inscrire ou se connecter, avant d'entrer dans Home
  {
    name: "Home",
    component: Home,
    path: "/",
  },

  // Chemin vers la page connexion
  {
    name: "Login",
    component: Login,
    path: "/login",
  },
  // Chemin vers la page d'inscription
  {
    name: "Signup",
    component: Signup,
    path: "/signup",
  },

  // Chemin vers la page actualités(journal)
  {
    name: "EditPost",
    component: EditPost,
    path: "/posts",
  },

  // Chemin vers la page profile utilisateur
  {
    name: "UserProfile",
    component: UserProfile,
    path: "/profil",
  },

  // Chemin vers la page profile utilisateur
  {
    name: "AllProfiles",
    component: AllProfiles,
    path: "/profiles",
  },
  {
    name:"DashBord",
    component: DashBord,
    path:"/dashbord"
  },
  {
    name: "UpdateUser",
    component: UpdateUser,
    path: "/UpdateUser",
  },
  // Chemin vers la page connexion
  {
    name: "UpdateFromAdmin.",
    component: UpdateFromAdmin,
    path: "/updateUser",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;