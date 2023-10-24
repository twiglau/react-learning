import React from 'react';
import { Redirect } from 'react-router-dom';

import Discover from '@/pages/discover';
import Friend from '@/pages/friend';
import Mine from '@/pages/mine';

import Album from '@/pages/discover/c-pages/album'
import Artist from '@/pages/discover/c-pages/artist'
import Djradio from '@/pages/discover/c-pages/djradio'
import Ranking from '@/pages/discover/c-pages/ranking'
import Recommend from '@/pages/discover/c-pages/recommend'
import Songs from '@/pages/discover/c-pages/songs'
import Player from '@/pages/discover/c-pages/player'
const routes = [
   {
    path:'/',
    exact: true,
    // TODO: 这里还可以写成render函数
    render:()=>{
      <Redirect to="/discover" />
    }
   },
   {
      path:'/discover',
      component: Discover,
      // TODO: 子路由
      routes: [
        {
          path: "/discover",
          exact: true,
          render: () => (
            <Redirect to="/discover/recommend"/>
          )
        },
        {
          path: "/discover/recommend",
          component: Recommend
        },
        {
          path: "/discover/ranking",
          component: Ranking
        },
        {
          path: "/discover/songs",
          component: Songs
        },
        {
          path: "/discover/djradio",
          exact: true,
          component: Djradio
        },
        {
          path: "/discover/artist",
          component: Artist
        },
        {
          path: "/discover/album",
          component: Album
        },
        {
          path: "/discover/player",
          component: Player
        }
      ]
   },
   {
    path:'/friend',
    component:Friend
   },
   {
    path:'/mine',
    component:Mine
   },
];

export default routes;