import React from 'react';
import { Redirect } from 'react-router-dom';

// 2. TODO: React.lazy 和 Suspense 搭配使用效果和原理
const TWDiscover = React.lazy(_ => import('@/pages/discover'))
const TWAlbum = React.lazy(_ => import('@/pages/discover/c-pages/album'))
const TWArtist = React.lazy(_ => import('@/pages/discover/c-pages/artist'))
const TWDjradio = React.lazy(_ => import('@/pages/discover/c-pages/djradio'))
const TWRanking = React.lazy(_ => import('@/pages/discover/c-pages/ranking'))
const TWRecommend = React.lazy(_ => import('@/pages/discover/c-pages/recommend'))
const TWSongs = React.lazy(_ => import('@/pages/discover/c-pages/songs'))

const TWFriends = React.lazy(_ => import('@/pages/friends')) 
const TWMine = React.lazy(_ => import('@/pages/mine')) 

const routes = [
    {
        path: '/',
        exact: true,
        render:()=>(
            <Redirect to="discover" />
        ),

    },
    {
        path:'/discover',
        exact: true,
        component:TWDiscover,
        routes:[
            {
                path: "/discover",
                exact: true,
                render: () => (
                <Redirect to={"/discover/artist"}/>
                )
            },
            {
                path: "/discover/recommend",
                component: TWRecommend
            },
            {
                path: "/discover/ranking",
                component: TWRanking
            },
            {
                path: "/discover/songs",
                component: TWSongs
            },
            {
                path: "/discover/djradio",
                exact: true,
                component: TWDjradio
            },
            {
                path: "/discover/artist",
                component: TWArtist
            },
            {
                path: "/discover/album",
                component: TWAlbum
            },
            // {
            //     path: "/discover/player",
            //     component: TWPlayer
            // }
        ]
    },
    {
        path:'/friend',
        exact: true,
        component:TWFriends
    },
    {
        path:'/mine',
        exact: true,
        component:TWMine
    },
];

export default routes;